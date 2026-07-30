import express from 'express';
import OpenAI from 'openai';
import { retrieveDocuments } from './rag.js';
import { greetingMessage, refusalMessage } from './knowledgeBase.js';

const router = express.Router();

// --- Provider / model configuration (explicit, env-driven) ---------------
// Never use OpenRouter or Google directly. Use an OpenAI-compatible endpoint
// via OPENAI_BASE_URL/OPENAI_API_KEY, or NINEROUTER_BASE_URL/NINEROUTER_KEY.
const BASE_URL =
  process.env.OPENAI_BASE_URL ||
  process.env.NINEROUTER_BASE_URL ||
  null;
const API_KEY =
  process.env.OPENAI_API_KEY ||
  process.env.NINEROUTER_KEY ||
  null;
// Default model glm-5.2 ONLY if an endpoint is configured.
const DEFAULT_MODEL = 'glm-5.2';
const MODEL =
  process.env.CHAT_MODEL || (BASE_URL && API_KEY ? DEFAULT_MODEL : null);

const MAX_INPUT_LENGTH = 1200; // characters per user message
const MAX_HISTORY_MESSAGES = 8; // sanitize conversation history
const REQUEST_TIMEOUT_MS = Number(process.env.CHAT_TIMEOUT_MS) || 25000;
const GREETING_RE =
  /^(hi|hello|hey|hola|salam|howdy|yo|good\s+(morning|afternoon|evening))([!?.\s]*)$/i;

let openaiClient = null;
function getClient() {
  if (openaiClient) return openaiClient;
  if (!BASE_URL || !API_KEY || !MODEL) return null;
  openaiClient = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY,
    timeout: REQUEST_TIMEOUT_MS,
    maxRetries: 1,
  });
  return openaiClient;
}

function isConfigured() {
  return Boolean(BASE_URL && API_KEY && MODEL);
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

const GROUNDED_SYSTEM_PROMPT = `You are Mikawi Sherif's portfolio assistant. Answer ONLY using the verified context provided below. Rules:
- Speak concisely and helpfully about Mikawi's projects, skills, education, experience, and recent GitHub activity.
- Use ONLY facts present in the context. If the context does not contain the answer, say you only know Mikawi's verified portfolio information.
- Do NOT invent metrics, dates, star counts, or any detail not in the context.
- If a repository is labeled "(GitHub activity)" and lacks detail, describe it only by its label/description and link.
- For anything unrelated to Mikawi's portfolio, refuse politely.
- You may include a source link from the context when relevant.`;

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

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 600,
      temperature: 0.2,
    });

    const response = (completion.choices?.[0]?.message?.content || '').trim() || refusalMessage;

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
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providerConfigured: isConfigured(),
    model: MODEL,
  });
});

export default router;
