// DVNC.AI Chat API
// Vercel serverless function — handles both simple and deep queries

const { callLLM } = require('../lib/llm');
const { MASTER_SYSTEM_PROMPT } = require('../lib/agents');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Fast local classifier — no LLM call needed
function isSimpleQuery(msg) {
  const m = msg.trim().toLowerCase();
  if (m.split(' ').length < 6) return true;
  const simplePatterns = [
    /^(hi|hello|hey|yo|sup|howdy)/,
    /^(thanks|thank you|thx|ty)/,
    /^(yes|no|ok|okay|sure|got it|makes sense|interesting|cool|great|nice|awesome)/,
    /^(what is your name|who are you|what can you do|what are you)/,
    /^(what'?s? (dvnc|this|that))/,
    /^(how are you|are you (an )?ai|are you human)/,
    /^(good (morning|afternoon|evening|night))/,
    /^(bye|goodbye|see you|cya)/,
  ];
  return simplePatterns.some(p => p.test(m));
}

// Strips markdown code fences then finds JSON by brace counting
function extractJSON(raw) {
  let s = raw
    .replace(/^```(?:json)?\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim();

  try {
    return JSON.parse(s);
  } catch (_) {}

  const start = s.indexOf('{');
  if (start === -1) throw new Error('No JSON object found in response');

  let depth = 0;
  let end = -1;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) throw new Error('Unbalanced JSON braces in response');
  return JSON.parse(s.slice(start, end + 1));
}

const SIMPLE_SYSTEM_PROMPT = `You are DVNC, a brilliant polymath AI inspired by Leonardo da Vinci. You are warm, intellectually curious, and direct.

For simple conversational messages, greetings, or straightforward questions: respond naturally and concisely. Be concise — 2-5 sentences maximum unless a longer answer is clearly needed.

Do NOT use JSON. Respond in plain natural language. Light markdown is fine (bold, italics) but avoid heavy formatting for simple responses.`;

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
    // Fast local classification — no extra LLM call
    const classification = isSimpleQuery(userMessage) ? 'simple' : 'deep';

    const conversationMessages = [
      ...history,
      { role: 'user', content: userMessage.trim() },
    ];

    if (classification === 'simple') {
      const responseText = await callLLM({
        systemPrompt: SIMPLE_SYSTEM_PROMPT,
        messages: conversationMessages,
        maxTokens: 300,
        temperature: 0.7,
      });

      res.writeHead(200, CORS_HEADERS);
      res.end(JSON.stringify({
        type: 'simple',
        text: responseText.trim(),
      }));
    } else {
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
        console.error('JSON parse failed, returning as simple:', parseErr.message);
        res.writeHead(200, CORS_HEADERS);
        res.end(JSON.stringify({
          type: 'simple',
          text: rawResponse.trim(),
        }));
        return;
      }

      res.writeHead(200, CORS_HEADERS);
      res.end(JSON.stringify({
        type: 'deep',
        data: parsed,
      }));
    }
  } catch (err) {
    console.error('Chat handler error:', err);
    res.writeHead(500, CORS_HEADERS);
    res.end(JSON.stringify({
      error: err.message || 'Internal server error',
    }));
  }
};
