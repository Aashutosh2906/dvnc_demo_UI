const Anthropic = require('@anthropic-ai/sdk');
const Groq = require('groq-sdk');

async function callLLM({ systemPrompt, messages, maxTokens = 4000, temperature = 0.7 }) {
  // Try Anthropic first
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const requestBody = {
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        messages
      };
      if (systemPrompt) requestBody.system = systemPrompt;
      const response = await client.messages.create(requestBody);
      return response.content[0].text;
    } catch (err) {
      console.error('Anthropic error:', err.message, '— falling back to Groq');
    }
  }

  // Groq fallback
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
      const groqMessages = systemPrompt
        ? [{ role: 'system', content: systemPrompt }, ...messages]
        : messages;
      const response = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        max_tokens: maxTokens,
        temperature,
        messages: groqMessages
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.error('Groq error:', err.message);
      throw err;
    }
  }

  throw new Error('No LLM provider configured. Set ANTHROPIC_API_KEY or GROQ_API_KEY.');
}

module.exports = { callLLM };
