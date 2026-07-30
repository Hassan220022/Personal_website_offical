import express from 'express';
import OpenAI from 'openai';
import { retrieveDocuments } from './rag.js';
import { greetingMessage, refusalMessage } from './knowledgeBase.js';

const router = express.Router();

// Lazy env reads: ESM hoists imports before server.js can call dotenv.config().
// Never use OpenRouter or Google directly. Use an OpenAI-compatible endpoint
// via OPENAI_BASE_URL/OPENAI_API_KEY, or NINEROUTER_BASE_URL/NINEROUTER_KEY.
const DEFAULT_MODEL = 'gpt-5.4-mini';
const MAX_INPUT_LENGTH = 1200; // characters per user message
const MAX_HISTORY_MESSAGES = 8; // sanitize conversation history
const GREETING_RE =
  /^(hi|hello|hey|hola|salam|howdy|yo|good\s+(morning|afternoon|evening))([!?.\s]*)$/i;

function providerConfig() {
  const baseURL =
    process.env.OPENAI_BASE_URL ||
    process.env.NINEROUTER_BASE_URL ||
    null;
  const apiKey =
    process.env.OPENAI_API_KEY ||
    process.env.NINEROUTER_KEY ||
    null;
  const model =
    process.env.CHAT_MODEL || (baseURL && apiKey ? DEFAULT_MODEL : null);
  const timeoutMs = Number(process.env.CHAT_TIMEOUT_MS) || 25000;
  return { baseURL, apiKey, model, timeoutMs };
}

let openaiClient = null;
let openaiClientKey = '';
function getClient() {
  const { baseURL, apiKey, model, timeoutMs } = providerConfig();
  if (!baseURL || !apiKey || !model) return null;
  const key = `${baseURL}|${apiKey}|${model}|${timeoutMs}`;
  if (openaiClient && openaiClientKey === key) return openaiClient;
  openaiClient = new OpenAI({
    baseURL,
    apiKey,
    timeout: timeoutMs,
    maxRetries: 1,
  });
  openaiClientKey = key;
  return openaiClient;
}

function isConfigured() {
  const { baseURL, apiKey, model } = providerConfig();
  return Boolean(baseURL && apiKey && model);
}

function sanitizeModelOutput(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/```[\w-]*\n?([\s\S]*?)```/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function isGreeting(message) {
  return GREETING_RE.test(String(message || '').trim());
}

// Prefer verified profile/project docs over sparse GitHub activity labels.
export function formatDeterministicAnswer(docs) {
  const primary = docs.filter((d) => !String(d.id).startsWith('activity-'));
  const activity = docs.filter((d) => String(d.id).startsWith('activity-'));
  const ordered = (primary.length ? primary : activity).slice(0, 2);
  return ordered
    .map((d) => {
      let text = String(d.content || '')
        .replace(/\s*\(GitHub activity\)\s*$/i, '')
        .trim();
      if (d.url) text += `\n${d.url}`;
      return text;
    })
    .filter(Boolean)
    .join('\n\n');
}

// Sanitize incoming conversation history: limit length, valid roles only,
// string content only. Drops anything malformed.
function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  const validRoles = new Set(['user', 'assistant']);
  const cleaned = history
    .filter(
      (m) =>
        m &&
        validRoles.has(m.role) &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_INPUT_LENGTH
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_LENGTH) }));
  // Keep only the most recent turns to bound prompt size.
  return cleaned.slice(-MAX_HISTORY_MESSAGES);
}

const GROUNDED_SYSTEM_PROMPT = `You are Mikawi Sherif's portfolio assistant. Answer ONLY using the verified context provided below.

Content rules:
- Speak concisely about Mikawi's projects, skills, education, experience, and recent GitHub activity.
- Use ONLY facts present in the context. If the context lacks the answer, say you only know Mikawi's verified portfolio information.
- Do NOT invent metrics, dates, star counts, or any detail not in the context.
- If a repository is labeled "(GitHub activity)" and lacks detail, describe it only by its label/description and link.
- For anything unrelated to Mikawi's portfolio, refuse politely.

Output format (strict):
- Use clean Markdown only.
- Structure answers as short paragraphs and/or bullet lists.
- Allowed Markdown: paragraphs, blank-line separation, "- " bullets, **bold labels**, and plain https links.
- Prefer this project shape when relevant:
  One short intro sentence.

  - **Name:** ...
  - **What it does:** ...
  - **Built with:** ...
  - **Source:** https://...
- Do NOT use headings (#), tables, code fences, HTML, numbered lists, or nested bullets.
- Do NOT wrap the whole answer in quotes.
- Keep answers under 120 words unless the user asks for more detail.`;

// Chat endpoint (public shape preserved: { response, conversationId }).
router.post('/chat', async (req, res) => {
  try {
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    if (message.length > MAX_INPUT_LENGTH) {
      return res.status(400).json({
        error: `Message too long (max ${MAX_INPUT_LENGTH} characters).`,
      });
    }

    const conversationId = req.body.conversationId || Date.now().toString();
    if (isGreeting(message)) {
      return res.json({ response: greetingMessage, conversationId });
    }

    const history = sanitizeHistory(req.body.conversationHistory);

    // Deterministic, verified-only retrieval.
    const docs = retrieveDocuments(message);

    // No relevant verified context => concise refusal. Do not call any model.
    if (docs.length === 0) {
      return res.json({
        response: refusalMessage,
        conversationId,
      });
    }

    const ragContext = docs
      .map((d) => `[${d.source}${d.url ? ` · ${d.url}` : ''}]\n${d.content}`)
      .join('\n\n');

    // If no provider is configured, return a clean verified answer instead of
    // dumping raw multi-document retrieval blobs into the chat UI.
    const client = getClient();
    if (!client) {
      return res.json({
        response: formatDeterministicAnswer(docs) || refusalMessage,
        conversationId,
      });
    }

    const messages = [
      { role: 'system', content: `${GROUNDED_SYSTEM_PROMPT}\n\nVerified context:\n${ragContext}` },
      ...history,
      { role: 'user', content: message },
    ];

    const { model } = providerConfig();
    const completion = await client.chat.completions.create({
      model,
      messages,
      max_tokens: 600,
      temperature: 0.2,
    });

    const response =
      sanitizeModelOutput(completion.choices?.[0]?.message?.content || '') ||
      refusalMessage;

    res.json({
      response,
      conversationId,
    });
  } catch (error) {
    console.error('Chat error:', error?.message || error);
    const status = error?.status || 500;
    res.status(status).json({
      error: 'Failed to process chat message',
      details:
        process.env.NODE_ENV === 'development'
          ? error?.message || String(error)
          : undefined,
    });
  }
});

// Health check endpoint.
router.get('/health', (req, res) => {
  const { model } = providerConfig();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providerConfigured: isConfigured(),
    model,
  });
});

export default router;
