Awesome 🚀 Let’s prepare your **Architecture.md**.
This document is simple, clear, and recruiter-friendly. You’ll export it to **PDF** and attach it with your submission.

---

# 📄 Architecture.md (Ready-to-Paste)

```markdown
# 🧠 STAN Bot – Architecture Document

This document explains how **Nova**, my chatbot, is designed to handle
context, memory, tone adaptation, scalability, and safety for the
**STAN Internship Challenge**.

---

## 1. System Overview

**Architecture Diagram (textual)**
```

User (Browser)
⬇️
Frontend (index.html, fetch → /chat API)
⬇️
Backend (Express.js server, Node.js)
⬇️
Memory Layer (SQLite DB + summaries)
⬇️
LLM Layer (Google Gemini 2.5 Flash API)
⬇️
Response → sent back to frontend

```

- **Frontend**: Minimal HTML/JS chat interface for demo.
- **Backend**: Express.js API with `/chat` endpoint.
- **Memory Layer**: SQLite database storing user facts, messages, and summaries.
- **LLM Layer**: Gemini API for generating natural and adaptive responses.

---

## 2. Context Handling

- **Recent Chat History**: Last ~8 user/assistant messages are sent with every request.
- **Rolling Summary**: Every 6 user messages, the bot summarizes conversations into a compact note, stored in the database.
- **Facts**: Extracted from user messages (e.g., name, likes, location) and stored separately for recall.

This combination ensures **short-term context + long-term memory**.

---

## 3. Memory Strategy

**Tables in SQLite:**
- `users`: profile info (user_id, name, tone preference).
- `messages`: all chat logs (role, text, timestamp).
- `memories`: extracted facts (likes, location, favorites).
- `summaries`: rolling conversation summary.

**Example Fact Extraction:**
- Input: *“my name is Alice”*
- Extracted: `user_name=Alice` → stored in `users` + `memories`.

This allows the bot to say later:
*“Hi Alice! Still thinking about anime?”*

---

## 4. Tone & Emotional Adaptation

- **Tone Detection**: Simple keyword-based rules.
  - *Sad words* → empathetic tone.
  - *Roast/playful words* → playful roast tone.
  - *Formal words* → formal tone.
  - Otherwise → friendly default tone.

- **Prompt Injection**: Tone value is inserted into the system prompt to instruct Gemini how to respond.

---

## 5. Identity & Safety

- Fixed persona: `BOT_NAME` from `.env` (Nova).
- System prompt enforces:
  - Never reveal it’s an AI.
  - Keep consistent identity across sessions.
  - No hallucinated memories/events.
  - Safe, grounded answers when information is unknowable.

Example:
*“Did you see me yesterday?” → “I don’t have memories like that, but I’m glad to chat with you now!”*

---

## 6. Scalability

- **Stateless API**: Each request to `/chat` can run independently.
- **Stateful Store**: User context is saved in SQLite (can be swapped with Postgres/Redis).
- **Vector DB ready**: Could be extended with FAISS or Pinecone for semantic memory (RAG).
- **Deployment**: Can run locally or on cloud providers (Render, Vercel, HuggingFace Spaces).

---

## 7. Cost-Efficiency

- Lightweight fact extraction (regex, no extra API calls).
- Summaries instead of storing unlimited raw history.
- Gemini **2.5 Flash** model: cheaper & faster than larger models.
- `.env` keeps API key secure (never in repo).

---

## 8. Bonus Features Implemented

- Context-aware tone shifting.
- Emotional callbacks (*“You mentioned anime earlier”*).
- Memory recall across sessions.
- Personality consistency under probing.

---

## 9. Validation

All **7 challenge test cases** are covered:

1. Long-Term Memory Recall → remembers name/interests.
2. Context-Aware Tone Adaptation → empathetic vs roast tone.
3. Personalization Over Time → recommendations aligned with user likes.
4. Response Naturalness & Diversity → varied greetings.
5. Identity Consistency → stays Nova, never breaks.
6. Hallucination Resistance → refuses impossible tasks.
7. Memory Stability → recalls stable facts consistently.

---

## 10. Tools & Models Used

- **Node.js + Express.js** → backend.
- **SQLite (better-sqlite3)** → database.
- **Gemini 2.5 Flash API** → LLM responses.
- **dotenv** → secret management.
- **Plain HTML/JS frontend** → demo UI.

---

## 11. Conclusion

Nova demonstrates **human-like conversation, memory, empathy, and safety** while being lightweight and deployable.
The design can easily scale to larger user bases by swapping SQLite with a cloud database and deploying on modern hosting platforms.
```

---

## 📌 What to Do Next

1. Save this as `Architecture.md` in your project.
2. Open it in VS Code → use **“Export as PDF”** (or copy into Word/Google Docs and export as PDF).
3. Attach it along with your **GitHub link + demo video** in the submission email.

---

👉 Do you want me to also create a **GitHub commit checklist** (like what files to push and what not to push), so you don’t accidentally upload your `.env` or local database?
