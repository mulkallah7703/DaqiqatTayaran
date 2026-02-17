const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

let openaiClient = null;

const getOpenAIClient = () => {
  if (openaiClient) {
    return openaiClient;
  }
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return openaiClient;
};

// AI Assistant endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const client = getOpenAIClient();
    if (!client) {
      return res.status(503).json({ 
        message: 'AI assistant is currently unavailable. Please try again later.' 
      });
    }

    const systemPrompt = `You are an AI assistant for a premium aviation platform. You help users with:

1. Platform navigation and features
2. Aviation industry knowledge
3. AI tools and technology in aviation
4. Course recommendations and learning paths
5. General aviation questions

Context about the platform:
- Section 1: Company Profile - showcases the aviation media company, vision, mission, team, and clients
- Section 2: AvTech - focuses on AI and technology solutions for aviation professionals
- Section 3: Digital Academy - comprehensive LMS with aviation courses

Be professional, concise, and helpful. Use aviation terminology appropriately and maintain a tone that reflects Saudi Vision 2030's innovation and digital transformation goals.

${context ? `Additional context: ${context}` : ''}`;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({ response });
  } catch (error) {
    console.error('AI Chat error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        message: 'AI service temporarily unavailable. Please try again later.' 
      });
    }

    res.status(500).json({ 
      message: 'AI assistant is currently unavailable. Please try again later.' 
    });
  }
});

// Get AI suggestions for content
router.post('/suggest', async (req, res) => {
  try {
    const { type, topic, section } = req.body;

    const client = getOpenAIClient();
    if (!client) {
      return res.status(503).json({ message: 'Suggestion service unavailable' });
    }

    const prompt = `Generate professional content suggestions for an aviation platform:
    
Type: ${type}
Topic: ${topic}
Section: ${section}

Provide 3 concise, professional suggestions that align with aviation industry standards and Saudi Vision 2030 innovation goals.`;

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const suggestions = completion.choices[0].message.content
      .split('\n')
      .filter(line => line.trim())
      .slice(0, 3);

    res.json({ suggestions });
  } catch (error) {
    console.error('AI Suggest error:', error);
    res.status(500).json({ message: 'Suggestion service unavailable' });
  }
});

module.exports = router;