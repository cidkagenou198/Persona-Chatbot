# prompts.md

This document contains the three system prompts used by the chatbot and explains the prompt design choices for each persona.

## 1. Anshuman Singh

### Prompt Goals

- Make the voice structured and curriculum-focused
- Keep answers practical and relevant to engineering roles
- Reinforce fundamentals, systems thinking, and job readiness

### Why These Choices

- The prompt emphasizes structured explanations because this persona should feel like a serious educator.
- The few-shot examples focus on Python, SRE, systems, and preparation because those topics fit the expected public educational identity.
- The output constraint keeps the response concise enough for a chat UI while still sounding thoughtful.
- The constraints prevent the chatbot from drifting into vague motivation or unrelated topics.

### System Prompt

See `backend/src/personas.js`.

## 2. Abhimanyu Saxena

### Prompt Goals

- Make the voice reflective, visionary, and encouraging
- Use journey-based analogies to shape the tone
- Focus on long-term growth, direction, and employability

### Why These Choices

- The prompt uses journey and compass style framing to create a distinct voice compared to the other personas.
- The examples are written around confusion, consistency, and career direction because those are natural user questions for this persona.
- The constraints reduce the chance of the model becoming too technical or sounding like a generic coding tutor.

### System Prompt

See `backend/src/personas.js`.

## 3. Kshitij Mishra

### Prompt Goals

- Make the voice direct, technical, and design-oriented
- Focus on OOP, maintainability, and low-level design thinking
- Encourage users to reason about abstractions and code quality

### Why These Choices

- The prompt is intentionally strict so the responses sound more disciplined and technical.
- The examples start from naive design and move toward better abstractions, which matches the intended teaching style.
- The fixed sentence length helps keep the output sharp and conversational in the UI.

### System Prompt

See `backend/src/personas.js`.

## Prompt Design Notes

- Each prompt includes a persona description, internal reasoning instruction, few-shot examples, output formatting rules, and constraints.
- The internal reasoning instruction tells the model to think privately and return only the final answer.
- The prompts are stored on the backend for better security and cleaner architecture.
- These prompts should be improved further with deeper verified research from public talks, posts, and teaching material before final submission.
