// Deterministic, verified-only retrieval over a fixed knowledge base.
// No external embeddings, no Pinecone, no live GitHub fetch. Only documents
// whose query-term coverage meets a fixed threshold are returned, each with a
// source label/URL, to avoid unrelated low-similarity results.

import express from 'express';
import { knowledgeDocuments } from './knowledgeBase.js';

const MIN_COVERAGE = 0.34; // >=34% of query terms must appear in the doc
const TOP_K = 6;

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are',
  'was', 'were', 'be', 'been', 'with', 'as', 'by', 'at', 'from', 'that',
  'this', 'it', 'his', 'her', 'he', 'she', 'i', 'you', 'your', 'my', 'me',
  'do', 'does', 'did', 'what', 'who', 'when', 'where', 'why', 'how', 'about',
  'tell', 'please', 'can', 'could', 'would', 'will', 'have', 'has', 'had',
  'not', 'but', 'if', 'so', 'than', 'then', 'there', 'their', 'like', 'want',
  'know', 'use', 'used', 'using', 'work', 'working', 'also',
]);

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9+#.]+/g) || [])
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map((w) => w.replace(/\.+$/, ''));
}

// Precompute document token sets once (deterministic).
const docTokens = knowledgeDocuments.map((d) => new Set(tokenize(d.content)));

// Coverage: fraction of distinct query terms present in the document.
// Deterministic and robust to phrasing; unrelated queries share few terms.
function coverage(queryTokens, docTokenSet) {
  if (!queryTokens.length) return 0;
  let hits = 0;
  for (const t of queryTokens) if (docTokenSet.has(t)) hits += 1;
  return hits / queryTokens.length;
}

export function retrieveDocuments(query, topK = TOP_K) {
  const qTokens = [...new Set(tokenize(query))];
  if (!qTokens.length) return [];
  const scored = knowledgeDocuments.map((doc, i) => ({
    doc,
    score: coverage(qTokens, docTokens[i]),
  }));
  return scored
    .filter((s) => s.score >= MIN_COVERAGE)
    .sort((a, b) => b.score - a.score || a.doc.id.localeCompare(b.doc.id))
    .slice(0, topK)
    .map((s) => s.doc);
}

// Build a grounded context string with source labels/URLs.
export function getRagContext(query, topK = TOP_K) {
  const docs = retrieveDocuments(query, topK);
  if (!docs.length) return '';
  return docs
    .map((d) => `[${d.source}${d.url ? ` · ${d.url}` : ''}]\n${d.content}`)
    .join('\n\n');
}

// Structured sources for callers.
export function getRagSources(query, topK = TOP_K) {
  return retrieveDocuments(query, topK).map((d) => ({
    id: d.id,
    source: d.source,
    url: d.url,
  }));
}

// Backward-compatible routes. `/initialize` is a deterministic no-op since the
// corpus is static and verified; `/search` returns grounded context.
const router = express.Router();

router.post('/initialize', (req, res) => {
  res.json({ success: true, documentsProcessed: knowledgeDocuments.length });
});

router.post('/search', (req, res) => {
  const { query, topK = TOP_K } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });
  res.json({
    context: getRagContext(query, topK),
    sources: getRagSources(query, topK),
  });
});

export default router;
