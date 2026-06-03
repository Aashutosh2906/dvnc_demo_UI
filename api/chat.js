const { MASTER_SYSTEM_PROMPT, CLASSIFIER_PROMPT } = require('../lib/agents');
const { callLLM } = require('../lib/llm');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function extractJSON(raw) {
  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  let s = raw.replace(/^```(?:json)?\s*/im, '').replace(/\s*```\s*$/im, '').trim();

  // Try direct parse first (ideal case — model obeyed instructions)
  try { return JSON.parse(s); } catch (_) {}

  // Find the outermost { ... } block, handling nested braces
  const start = s.indexOf('{');
  if (start === -1) throw new Error('No JSON object found in response');
  let depth = 0, end = -1;
  for (let i = start; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error('Unbalanced JSON braces');
  return JSON.parse(s.slice(start, end + 1));
}

module.exports = async function handler(req, res) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON body' }); }
  }
  if (!body) return res.status(400).json({ error: 'Empty body' });

  const { query, history = [] } = body;
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'query is required' });
  }

  try {
    // Step 1: Classify
    const classifyText = await callLLM({
      systemPrompt: null,
      messages: [{ role: 'user', content: CLASSIFIER_PROMPT + query.trim() }],
      maxTokens: 5,
      temperature: 0
    });

    const isDeep = classifyText.trim().toLowerCase().startsWith('deep');

    if (!isDeep) {
      const simpleMessages = [...history, { role: 'user', content: query.trim() }];
      const simpleResponse = await callLLM({
        systemPrompt: `You are DVNC.AI, a scientific discovery assistant built on Leonardo da Vinci's cognitive architecture.
Respond conversationally and helpfully. Be concise — 2-5 sentences maximum unless a longer answer is clearly needed.
If the user is asking for clarification on something previously discussed, clarify it clearly and briefly.
If it is a greeting or small talk, respond warmly but in one sentence.
Do NOT use JSON. Respond in plain natural language without markdown formatting.`,
        messages: simpleMessages,
        maxTokens: 400,
        temperature: 0.7
      });
      return res.status(200).json({ type: 'simple', message: simpleResponse.trim() });
    }

    // Step 2: Deep — all 10 lenses
    const deepMessages = [...history, { role: 'user', content: query.trim() }];
    const rawResponse = await callLLM({
      systemPrompt: MASTER_SYSTEM_PROMPT,
      messages: deepMessages,
      maxTokens: 4500,
      temperature: 0.8
    });

    let parsed;
    try {
      parsed = extractJSON(rawResponse);
    } catch (parseErr) {
      console.error('JSON parse failed:', parseErr.message);
      console.error('Raw response start:', rawResponse.substring(0, 300));
      // Fallback: return the raw text as a simple response so user gets something
      return res.status(200).json({
        type: 'simple',
        message: rawResponse.replace(/```(?:json)?/g, '').replace(/```/g, '').trim()
      });
    }

    parsed.type = 'deep';
    if (!parsed.synthesis) parsed.synthesis = '';
    if (!Array.isArray(parsed.lenses)) parsed.lenses = [];
    if (!parsed.graph) parsed.graph = { nodes: [], edges: [] };
    if (!Array.isArray(parsed.experimental_outline)) parsed.experimental_outline = [];
    if (!parsed.metrics) parsed.metrics = { novelty: 80, tractability: 70, cross_domain_distance: 85, mechanistic_clarity: 80 };

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({
      type: 'simple',
      message: 'I encountered an error processing your request. Please try again.'
    });
  }
};
