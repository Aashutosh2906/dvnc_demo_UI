// DVNC.AI Chat API
// Vercel serverless function — ALL queries run through the deep lens pipeline

const { callLLM } = require('../lib/llm');
const { MASTER_SYSTEM_PROMPT } = require('../lib/agents');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Strips markdown code fences then finds JSON by brace counting
function extractJSON(raw) {
  let s = raw
    .replace(/^```(?:json)?\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim();

  try { return JSON.parse(s); } catch (_) {}

  const start = s.indexOf('{');
  const end = s.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in response');
  }

  let jsonStr = s.slice(start, end + 1);
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1'); // strip trailing commas
  return JSON.parse(jsonStr);
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, CORS_HEADERS);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (_) {
    res.writeHead(400, CORS_HEADERS);
    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    return;
  }

  const { message, query, history = [] } = body;
  const userMessage = message || query;

  if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
    res.writeHead(400, CORS_HEADERS);
    res.end(JSON.stringify({ error: 'Message is required' }));
    return;
  }

  try {
    const conversationMessages = [
      ...history,
      { role: 'user', content: userMessage.trim() },
    ];

    // ALL queries go through the deep lens pipeline — no classifier
    const rawResponse = await callLLM({
      systemPrompt: MASTER_SYSTEM_PROMPT,
      messages: conversationMessages,
      maxTokens: 4000,
      temperature: 0.8,
    });

    let parsed;
    try {
      parsed = extractJSON(rawResponse);
    } catch (parseErr) {
      console.error('JSON parse failed:', parseErr.message);
      // Even on parse failure, wrap raw text into a valid deep response shell
      // so the frontend always renders the full UI — never plain text
      res.writeHead(200, CORS_HEADERS);
      res.end(JSON.stringify({
        type: 'deep',
        synthesis: rawResponse.trim(),
        lenses: [],
        graph: { nodes: [], edges: [] },
        experimental_outline: [],
        metrics: {},
      }));
      return;
    }

    // Flatten LLM output directly — frontend reads apiData.synthesis etc.
    const responsePayload = {
      type: 'deep',
      synthesis:            parsed.synthesis            || '',
      lenses:               parsed.lenses               || [],
      graph:                parsed.graph                || { nodes: [], edges: [] },
      experimental_outline: parsed.experimental_outline || [],
      metrics:              parsed.metrics              || {},
    };

    res.writeHead(200, CORS_HEADERS);
    res.end(JSON.stringify(responsePayload));

  } catch (err) {
    console.error('Chat handler error:', err);
    res.writeHead(500, CORS_HEADERS);
    res.end(JSON.stringify({
      error: err.message || 'Internal server error',
    }));
  }
};
