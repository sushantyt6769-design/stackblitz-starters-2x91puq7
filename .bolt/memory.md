# Project memory

## Product intent & audience

- Node.js starter project extended with backend services
- Includes an AI chat feature powered by an OpenAI-compatible AI provider

## Brand personality & voice

- Technical, developer-focused project; no distinct brand identity established yet

## Visual design & UX direction

- No frontend/UI context inferred yet; focus appears backend-first

## Decisions, constraints & rationale

- **Supabase** used as a backend/data layer (URL + anon key stored in `.env`)
- **Firebase Admin SDK** integrated for auth/verification; requires `FIREBASE_SERVICE_ACCOUNT` JSON — server throws on startup if missing
- **AI integration** expects OpenAI-compatible API via env vars: `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`
- `OWNER_UID` env var used to identify a privileged/owner user
- Environment variables managed through a `.env` file
- Entry point is `server.js`

## Open questions & assumptions

- Firebase service account JSON not yet provided — server cannot fully start
- AI provider not yet configured (URL, key, model all unset)
- It is assumed the AI provider is OpenAI-compatible based on generic env var names
- No clarity yet on what Supabase is used for vs. Firebase (overlap possible)