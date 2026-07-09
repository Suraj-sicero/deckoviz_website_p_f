# Backend Environment Variables

Copy `.env.example` to `.env` and fill in the values.

---

## Core

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Server port |

---

## Database

Either set `DATABASE_URL` (preferred) OR the individual `PG_*` vars.  
If neither is set, the backend falls back to SQLite (`database.sqlite`).

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | — | PostgreSQL connection string (e.g. `postgresql://user:pass@host:5432/deckoviz`) |
| `PG_HOST` | No | — | PostgreSQL host (used only if DATABASE_URL is not set) |
| `PG_PORT` | No | `5432` | PostgreSQL port |
| `PG_USER` | No | `postgres` | PostgreSQL user |
| `PG_PASSWORD` | No | — | PostgreSQL password |
| `PG_DATABASE` | No | `postgres` | PostgreSQL database name |

---

## JWT

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | **Yes** | `your_super_secret_jwt_key_here` | Secret key for signing auth tokens. Change this in production! |

---

## AI / LLM APIs

All optional — features gracefully degrade if missing.

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | No | Gemini API key (used by VGC chat, VCC, creative tools, etc.) |
| `GEMINI_API_KEY` | No | Alias for GOOGLE_API_KEY (fallback) |
| `GROQ_API_KEY` | No | Groq API key (used by agents & creative tools) |
| `REPLICATE_API_TOKEN` | No | Replicate API token (image/video generation) |
| `RUNWARE_API_KEY` | No | Runware API key (image generation) |
| `OPENAI_API_KEY` | No | OpenAI API key (package installed, not yet used in routes) |
| `ELEVENLABS_API_KEY` | No | ElevenLabs API key (TTS / voice) |
| `MURF_API_KEY` | No | Murf API key (TTS) |
| `MUSIC_API_KEY` | No | Music generation API key |
| `MARBLE_KEY` | No | Marble API key (world routes) |
| `FAL_KEY` | No | Fal.ai API key (vizzy canvas routes) |

---

## Media Storage

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CLOUDINARY_CLOUD_NAME` | No | — | Cloudinary cloud name (for uploads & artwork seeds) |
| `CLOUDINARY_API_KEY` | No | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | — | Cloudinary API secret |

If Cloudinary vars are missing, uploads fall back to local disk (`public/uploads/`).  
Files on local disk will **not persist across redeploys** on Render/Heroku.

---

## Redis

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REDIS_URL` | No | — | Redis connection URL (`redis://...`). Skipped if missing. |

---

## Payments (Stripe)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `STRIPE_SECRET_KEY` | No | Stripe test key (hardcoded fallback) | Stripe secret key for checkout sessions |

---

## Mobile / Webhooks

| Variable | Required | Description |
|----------|----------|-------------|
| `MOBILE_WEBHOOK_URL` | No | Outbound webhook URL for daily curation change notifications |
| `MOBILE_WEBHOOK_SECRET` | No | Secret header sent with webhook (`X-Webhook-Secret`) |

---

## Deployment

| Variable | Required | Description |
|----------|----------|-------------|
| `RENDER_EXTERNAL_URL` | No | Public backend URL (used for generated media links on Render) |
| `BACKEND_URL` | No | Fallback if RENDER_EXTERNAL_URL is not set |

---

## Environment-Specific Notes

### Development (local)
```bash
PORT=5000
JWT_SECRET=dev_secret_key_deckoviz_2024
# DB defaults to SQLite — no config needed
```

### Production (Render / Railway / Fly)
```bash
PORT=5000
JWT_SECRET=<generate a strong random string>
DATABASE_URL=postgresql://user:pass@host:5432/deckoviz
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
REDIS_URL=redis://...
STRIPE_SECRET_KEY=sk_live_...
RENDER_EXTERNAL_URL=https://your-app.onrender.com
```

---

## What changes when env vars are added

| Variable | Effect when set |
|----------|----------------|
| `DATABASE_URL` | Switches from SQLite to PostgreSQL. All data migrates. |
| `CLOUDINARY_*` | Uploads go to Cloudinary instead of local disk. Persistent across deploys. |
| `GOOGLE_API_KEY` | VGC chat, VCC generate, and creative tools get AI responses instead of fallback messages. |
| `REPLICATE_API_TOKEN` | Image/video generation endpoints start working. |
| `REDIS_URL` | Redis caching enabled for performance. |
| `STRIPE_SECRET_KEY` | Payment checkout sessions use your live Stripe account. |
| `MOBILE_WEBHOOK_URL` | Mobile app gets push notifications when daily curation changes. |
