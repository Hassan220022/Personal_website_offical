import express from 'express';
import OpenAI from 'openai';
import { getRagContext, retrieveDocuments } from './rag.js';
import { refusalMessage } from './knowledgeBase.js';

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

    const history = sanitizeHistory(req.body.conversationHistory);

    // Deterministic, verified-only retrieval.
    const docs = retrieveDocuments(message);

    // No relevant verified context => concise refusal. Do not call any model.
    if (docs.length === 0) {
      return res.json({
        response: refusalMessage,
        conversationId: req.body.conversationId || Date.now().toString(),
      });
    }

    const ragContext = docs
      .map((d) => `[${d.source}${d.url ? ` · ${d.url}` : ''}]\n${d.content}`)
      .join('\n\n');

    // If no provider is configured, return the grounded context directly so the
    // bot still answers from verified data instead of erroring.
    const client = getClient();
    if (!client) {
      const summary = docs.map((d) => d.content).join('\n\n');
      return res.json({
        response: summary,
        conversationId: req.body.conversationId || Date.now().toString(),
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
      conversationId: req.body.conversationId || Date.now().toString(),
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
