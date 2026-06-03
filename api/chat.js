const { MASTER_SYSTEM_PROMPT, CLASSIFIER_PROMPT } = require('../lib/agents');
const { callLLM } = require('../lib/llm');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

module.exports = async function handler(req, res) {
  // Set CORS on every response
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;

  // Handle cases where body isn't auto-parsed
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  if (!body) return res.status(400).json({ error: 'Empty body' });

  const { query, history = [] } = body;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'query is required' });
  }

  try {
    // Step 1: Classify — is this a deep question or a simple/conversational one?
    const classifyText = await callLLM({
      systemPrompt: null,
      messages: [{ role: 'user', content: CLASSIFIER_PROMPT + query.trim() }],
      maxTokens: 5,
      temperature: 0
    });

    const isDeep = classifyText.trim().toLowerCase().startsWith('deep');

    if (!isDeep) {
      // Simple conversational response — no lenses, just answer naturally
      const simpleMessages = [
        ...history,
        { role: 'user', content: query.trim() }
      ];
      const simpleResponse = await callLLM({
        systemPrompt: `You are DVNC.AI, a scientific discovery assistant built on Leonardo da Vinci's cognitive architecture. 
Respond conversationally and helpfully to this message. Be concise. 
If the user is asking for clarification on something you previously said, clarify it clearly.
If it's a greeting or small talk, respond warmly but briefly.
Do NOT use JSON. Just respond in plain natural language.`,
        messages: simpleMessages,
        maxTokens: 600,
        temperature: 0.7
      });
      return res.status(200).json({
        type: 'simple',
        message: simpleResponse.trim()
      });
    }

    // Step 2: Deep — run all 10 cognitive lenses
    const deepMessages = [
      ...history,
      { role: 'user', content: query.trim() }
    ];

    const rawResponse = await callLLM({
      systemPrompt: MASTER_SYSTEM_PROMPT,
      messages: deepMessages,
      maxTokens: 4500,
      temperature: 0.8
    });

    // Extract JSON from response (Claude sometimes wraps it in ```json blocks)
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', rawResponse.substring(0, 200));
      throw new Error('Model did not return valid JSON');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    parsed.type = 'deep';

    // Validate required fields, provide defaults if missing
    if (!parsed.synthesis) parsed.synthesis = rawResponse;
    if (!Array.isArray(parsed.lenses)) parsed.lenses = [];
    if (!parsed.graph) parsed.graph = { nodes: [], edges: [] };
    if (!Array.isArray(parsed.experimental_outline)) parsed.experimental_outline = [];
    if (!parsed.metrics) parsed.metrics = { novelty: 80, tractability: 70, cross_domain_distance: 85, mechanistic_clarity: 80 };

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({
      type: 'simple',
      message: 'I encountered an error processing your request. Please try again — if the problem persists, the API key may need checking.'
    });
  }
};
