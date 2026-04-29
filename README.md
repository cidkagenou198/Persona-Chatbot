# Persona-Based AI Chatbot

A simple full-stack chatbot that lets users talk to three Scaler personalities:

- Anshuman Singh
- Abhimanyu Saxena
- Kshitij Mishra

The frontend is designed for `Vercel` and the backend is designed for `Railway`.

## Project Structure

```text
PersonaChatbot/
  frontend/   -> React + Vite UI
  backend/    -> Node + Express API
  prompts.md
  reflection.md
```

## Features

- Persona switcher for all three personalities
- Conversation resets when persona changes
- Suggestion chips for quick-start prompts
- Typing indicator while waiting for the AI response
- Mobile-friendly chat UI
- Backend-controlled persona system prompts
- API error handling with user-friendly messages

## Local Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd PersonaChatbot
```

### 2. Setup backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` using `.env.example`.

Example:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

### 3. Setup frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` using `.env.example`.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

## Deployment

## Frontend on Vercel

- Import the GitHub repo into Vercel
- Set the project root to `frontend`
- Add environment variable:
  - `VITE_API_BASE_URL` = your Railway backend URL

## Backend on Railway

- Import the GitHub repo into Railway
- Set the project root to `backend`
- Add environment variables:
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL`
  - `FRONTEND_URL` = your Vercel frontend URL

## Deliverables

- GitHub Repo: add your repo link here
- Live Frontend URL: add your Vercel URL here
- Live Backend URL: add your Railway URL here

## Screenshots

Add screenshots of:

- Desktop chat view
- Mobile responsive view
- Persona switching

## Notes

- API keys are stored in environment variables and are never hardcoded.
- Persona prompts are stored on the backend so they are not exposed in the browser code.
