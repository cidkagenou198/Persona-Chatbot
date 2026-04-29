import { useMemo, useState } from 'react';
import { sendChatMessage } from './api';
import { PERSONAS } from './personas';

const personaList = Object.values(PERSONAS);

function App() {
  const [activePersonaId, setActivePersonaId] = useState(
    personaList[0]?.id || ''
  );
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const activePersona = useMemo(() => {
    return (
      personaList.find((persona) => persona.id === activePersonaId) ||
      personaList[0]
    );
  }, [activePersonaId]);

  const sendMessage = async (content) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(activePersonaId, nextMessages);
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: data.reply }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handlePersonaSwitch = (personaId) => {
    setActivePersonaId(personaId);
    setMessages([]);
    setInput('');
    setError('');
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <header className="app-header">
          <div>
            <p className="eyebrow">Assignment 01</p>
            <h1>Persona-Based AI Chatbot</h1>
            <p className="subtitle">
              Chat with Scaler personalities using distinct system prompts.
            </p>
          </div>
          <div className="active-persona">
            <span>Active Persona</span>
            <strong>{activePersona?.name || '—'}</strong>
          </div>
        </header>

        <section className="persona-switcher">
          {personaList.map((persona) => (
            <button
              key={persona.id}
              type="button"
              className={persona.id === activePersonaId ? 'tab active' : 'tab'}
              onClick={() => handlePersonaSwitch(persona.id)}
            >
              <span>{persona.name}</span>
              <small>{persona.role}</small>
            </button>
          ))}
        </section>

        <section className="suggestions">
          {(activePersona?.suggestions || []).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="chip"
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </section>

        <section className="chat-panel">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h2>{activePersona?.name || 'Choose a persona'}</h2>
              <p>{activePersona?.role || ''}</p>
              <p>Pick a suggestion or start the conversation below.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`message ${message.role}`}
              >
                <span className="message-role">
                  {message.role === 'user' ? 'You' : activePersona?.name || 'Bot'}
                </span>
                <p>{message.content}</p>
              </article>
            ))
          )}

          {isLoading && (
            <div className="typing-indicator">
              <span />
              <span />
              <span />
            </div>
          )}

          {error && <p className="error-banner">{error}</p>}
        </section>

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Ask ${activePersona?.name || 'the bot'} something...`}
            rows="4"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
