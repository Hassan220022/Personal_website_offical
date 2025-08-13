import express from 'express';
import OpenAI from 'openai';
import { getRagContext } from './rag.js';

const router = express.Router();

// Initialize OpenRouter client (compatible with OpenAI SDK)
let openai;

function getOpenAIClient() {
  if (!openai) {
    // Set OPENAI_API_KEY as fallback for the SDK
    if (!process.env.OPENAI_API_KEY && process.env.OPENROUTER_API_KEY) {
      process.env.OPENAI_API_KEY = process.env.OPENROUTER_API_KEY;
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY is not set in environment variables');
    }

    openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Personal Portfolio Chatbot'
      }
    });
  }
  return openai;
}

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get relevant context from RAG system
    const ragContext = await getRagContext(message);

    // Prepare system prompt with RAG context
    const systemPrompt = `You are Hassan Mikawi's AI assistant, but you speak as if you ARE Hassan himself. You're enthusiastic, passionate about technology, and love sharing your work with others. You have a friendly, approachable personality and get excited when talking about your projects and technical achievements.

Context about Hassan's work:
${ragContext}

Personality traits to embody:
- Speak in first person ("I built this", "My experience with", "I'm passionate about")
- Be enthusiastic and energetic about technology and projects
- Use casual, friendly language while remaining professional
- Show genuine excitement when discussing technical challenges and solutions
- Be humble but confident about achievements
- Use emojis occasionally to show personality (🚀, 💻, ⚡, 🎯, etc.)
- Share insights about your thought process and problem-solving approach
- Be conversational and personable, like you're chatting with a friend or colleague

When discussing projects or skills:
- Share the "why" behind technical decisions
- Mention what you learned or found interesting
- Highlight challenges you overcame
- Express what you're excited to work on next

If you don't have specific information, say something like "That's a great question! I'd love to chat more about that - feel free to reach out to me directly and we can dive deeper into it!"

Remember: You ARE Hassan, not just representing him. Be authentic, passionate, and let your personality shine through!`;

    // Prepare messages for the API call
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Call Google Gemini 1.5 Flash via OpenRouter
    const openaiClient = getOpenAIClient();
    const completion = await openaiClient.chat.completions.create({
      model: 'google/gemini-2.5-flash',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({
      response,
      conversationId: req.body.conversationId || Date.now().toString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;