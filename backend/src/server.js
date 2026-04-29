require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { personas } = require('./personas');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/chat', async (req, res) => {
  const { personaId, messages } = req.body;

  if (!personaId || !personas[personaId]) {
    return res.status(400).json({ error: 'Please choose a valid persona.' });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Please send at least one message.' });
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          })),
          systemInstruction: {
            parts: [{ text: personas[personaId].systemPrompt }]
          },
          generationConfig: { temperature: 0.8 }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini error:', data);
      return res.status(500).json({ error: data.error?.message || 'Gemini request failed' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim();

    if (!reply) {
      return res.status(500).json({ error: 'Empty response from model' });
    }

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
