require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { personas } = require('./personas');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/chat', async (req, res) => {
  const { personaId, messages } = req.body || {};

  if (!personaId || !personas[personaId]) {
    return res.status(400).json({
      error: 'Please choose a valid persona.'
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Please send at least one message.'
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'Server API key is missing. Add it in the backend environment settings.'
    });
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: messages.map((message) => ({
            role: message.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: message.content }]
          })),
          systemInstruction: {
            parts: [{ text: personas[personaId].systemPrompt }]
          },
          generationConfig: {
            temperature: 0.8
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      throw new Error(data.error?.message || 'Gemini request failed');
    }

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join('')
        .trim() || '';

    if (!reply) {
      throw new Error('Empty response from model');
    }

    return res.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'The chatbot could not respond right now. Please try again in a moment.'
    });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
