// LLM abstraction: Groq primary (fast), Anthropic fallback
// API keys loaded from environment variables (never hardcoded)

async function callLLM({ systemPrompt, messages, maxTokens = 3000, temperature = 0.7 }) {
  // Try Groq first — much faster, fits Vercel's 10s free-tier limit
  if (process.env.GROQ_API_KEY) {
    try {
      const Groq = require('groq-sdk');
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      const groqMessages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];

      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: maxTokens,
        temperature: temperature,
        messages: groqMessages,
      });

      return response.choices[0].message.content;
    } catch (err) {
      console.error('Groq error:', err.message, '— falling back to Anthropic');
    }
  }

  // Anthropic fallback
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const Anthropic = require('@anthropic-ai/sdk');
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt,
        messages: messages,
      });

      return response.content[0].text;
    } catch (err) {
      console.error('Anthropic error:', err.message);
      throw err;
    }
  }

  throw new Error('No LLM provider configured. Set GROQ_API_KEY or ANTHROPIC_API_KEY environment variables.');
}

module.exports = { callLLM };
