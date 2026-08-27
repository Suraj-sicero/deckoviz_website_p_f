# Vizzy Creation Canvas — Mobile Build Guide

How to wire the **Vizzy Creation Canvas** (chat with Vizzy → generate art →
edit → save to a gallery) into the mobile app. All field shapes below match the
backend exactly.

- **Base URL:** `https://deckoviz-demo.onrender.com`
- **Base path for everything here:** `/api/vizzy-canvas`
- **Auth:** the **same** Render JWT from `POST /api/auth/signin` (see
  `RENDER_AUTH_API.md`). Send `Authorization: Bearer <token>` on every call.
  Any generation costs credits, so **a valid token is required** — without one
  you get `401 { "error": "Sign in to use this feature." }`.

> Render free tier: the first request after idle can take 30–60s (cold start).
> Image/music generation also takes several seconds normally — always show a
> progress state.

---

## 0. The mental model

The Canvas is just a few independent capabilities. You do **not** need the
complex agent pipeline to ship a working canvas — call these directly:

```
   ┌─ Chat with Vizzy ──────  POST /chat            (assistant text replies)
   │
   ├─ Generate art ─────────  POST /generate        (prompt -> image URLs)   ★ core
   │
   ├─ Edit an image ────────  POST /inpaint          (prompt-based edit)
   │                          POST /style-transfer   (apply an art style)
   │
   ├─ Gallery ──────────────  GET /images, PATCH /images/:id/favorite,
   │                          DELETE /images/:id
   │
   └─ Extras (optional) ────  POST /music/generate, /video/generate, /narrate
```

Every generated image is auto-saved to the user's gallery (`GET /images`), so the
canvas + gallery stay in sync with no extra work.

---

## 1. Credit costs (deducted automatically)

Each paid call deducts credits from the user and returns `creditsRemaining` in the
response. If the balance is too low you get `402 { "error": "Not enough credits…",
"required": N, "balance": M }`.

| Action | Endpoint | Cost (credits) |
|---|---|---|
| Generate image | `POST /generate` | **1 × number of images** |
| Edit (inpaint) | `POST /inpaint` | 2 |
| Style transfer | `POST /style-transfer` | 2 |
| Generate music | `POST /music/generate` | 5 |
| Generate video | `POST /video/generate` | 10 |
| Chat / analyze / narrate | `/chat`, `/analyze-image`, `/narrate` | free |

Show `creditsRemaining` in the UI after each generation. Handle `402` by prompting
the user to top up.

---

## 2. ★ Generate art — `POST /api/vizzy-canvas/generate`

The heart of the canvas.

**Request body**
```json
{
  "prompt": "a serene mountain lake at golden hour, oil painting",
  "num_results": 1,          // optional, 1–4 (default 1). cost = 1 × this
  "aspect_ratio": "1:1"      // optional, default "1:1"
}
```
Supported `aspect_ratio`: `"1:1"`, `"16:9"`, `"9:16"`, `"3:2"`, `"2:3"`, `"4:3"`.

**Response `200`**
```json
{
  "images": [{ "url": "https://.../generated1.png" }],
  "prompt": "a serene mountain lake at golden hour, oil painting",
  "aspect_ratio": "1:1",
  "creditsRemaining": 44
}
```

Render `images[].url`. They're already saved to the gallery — no extra save call.

---

## 3. Gallery — list / favorite / delete

### `GET /api/vizzy-canvas/images`
Returns the user's generated images, newest first.
```json
{
  "images": [
    {
      "id": "uuid",
      "userId": "uuid",
      "imageUrl": "https://.../img.png",
      "prompt": "a serene mountain lake…",
      "isFavorited": false,
      "createdAt": "2026-06-05T10:00:00.000Z",
      "updatedAt": "2026-06-05T10:00:00.000Z"
    }
  ]
}
```

### `PATCH /api/vizzy-canvas/images/{id}/favorite`
Toggles the heart. Returns `{ "image": { …updated… } }`.

### `DELETE /api/vizzy-canvas/images/{id}`
Soft-deletes the image. Returns `{ "success": true }`.

---

## 4. Edit an image

### `POST /api/vizzy-canvas/inpaint` — prompt-based edit (img2img)
```json
{ "imageUrl": "https://.../source.png", "prompt": "make it snow, winter mood" }
```
**Response `200`**
```json
{ "editedImage": { "url": "https://.../edited.png" }, "prompt": "make it snow…", "creditsRemaining": 42 }
```
> It transforms the whole image (not a masked region). The result is saved to the
> gallery too.

### `POST /api/vizzy-canvas/style-transfer` — apply a famous art style
```json
{ "imageUrl": "https://.../source.png", "style": "Van Gogh (Impressionism)" }
```
**Response `200`**
```json
{ "transferredImage": { "url": "https://.../styled.png" }, "style": "Van Gogh (Impressionism)", "creditsRemaining": 40 }
```

Built-in style presets (use these exact strings, or pass any custom style text):
`Van Gogh (Impressionism)`, `Picasso (Cubism)`, `Claude Monet (Impressionism)`,
`Salvador Dali (Surrealism)`, `Andy Warhol (Pop Art)`, `Katsushika Hokusai (Ukiyo-e)`,
`Edvard Munch (Expressionism)`, `Jackson Pollock (Abstract Expressionism)`,
`Gustav Klimt (Art Nouveau)`, `Henri Matisse (Fauvism)`, `Michelangelo (Renaissance)`,
`Jean-Michel Basquiat (Neo-Expressionism)`, `Piet Mondrian (De Stijl)`,
`Roy Lichtenstein (Comic Book)`, `William Morris (Arts & Crafts)`,
`Yayoi Kusama (Polka Dots)`, `Keith Haring (Street Art)`,
`Georgia O'Keeffe (Modernist Flower)`, `Wassily Kandinsky (Abstract)`,
`M.C. Escher (Surreal Mathematical)`.

### `POST /api/vizzy-canvas/analyze-image` — describe an image (free)
```json
{ "imageUrl": "https://.../img.png", "prompt": "optional: what the user asked for" }
```
**Response `200`** `{ "analysis": "A calm lake reflecting golden light… try adding mist for mood." }`
Use this to let Vizzy comment on a result and suggest a next tweak.

---

## 5. Chat with Vizzy — `POST /api/vizzy-canvas/chat`

A normal assistant chat (text in, text out). You pass the **full message history**;
the backend persists the session.

**Request body**
```json
{
  "messages": [
    { "role": "user", "content": "Give me 3 ideas for a calming bedroom artwork." }
  ],
  "chatId": null            // optional; omit/null to start a new session
}
```
> `messages` is the OpenAI-style array (`role` = `"user" | "assistant" | "system"`).
> Keep appending to it and resend the whole array each turn.

**Response `200`**
```json
{ "content": "Here are three ideas…", "chatId": "uuid-of-session" }
```
Save `chatId` and send it back on the next `/chat` call to continue the same
conversation.

### Chat sessions (history)
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/vizzy-canvas/chats` | List the user's chat sessions (newest first; `messages` parsed to an array) |
| POST | `/api/vizzy-canvas/chats` | Create an empty session → `{ chat }` (gives you a `chatId`) |
| GET | `/api/vizzy-canvas/chats/{id}` | Resume one session → `{ chat }` with parsed `messages` |
| DELETE | `/api/vizzy-canvas/chats/{id}` | Delete a session → `{ success: true }` |

A chat object: `{ id, userId, title, messages, activeAgent, mode, isFavorited, createdAt, updatedAt }`.

---

## 6. Extras (optional)

### Music — `POST /api/vizzy-canvas/music/generate`
```json
{ "prompt": "calm ambient piano, rain" }
```
**Synchronous** (the server polls for you; can take up to ~60s). Response:
```json
{ "generationId": "id", "status": "completed", "audioUrl": "https://.../track.mp3", "creditsRemaining": 39 }
```

### Video — `POST /api/vizzy-canvas/video/generate` (async — you poll)
```json
{ "prompt": "subtle ambient motion", "imageUrl": "https://.../optional-source.png" }
```
Returns immediately:
```json
{ "requestId": "models/veo-.../operations/abc", "status": "in_queue", "creditsRemaining": 30 }
```
Then poll **`GET /api/vizzy-canvas/video/status?op=<requestId>`** every few seconds:
```json
{ "status": "in_progress" }
// …later…
{ "status": "completed", "videoUrl": "https://.../video.mp4" }
```
> `requestId` contains slashes — pass it via the `?op=` query param (URL-encode it).

### Narration / TTS — `POST /api/vizzy-canvas/narrate`
```json
{ "text": "Welcome to your gallery.", "provider": "elevenlabs", "voiceId": "optional" }
```
Returns `{ "audioUrl": "https://.../speech.mp3" }`.

### Preset content (free)
- `GET /api/vizzy-canvas/curations` — curated artworks library.
- `GET /api/vizzy-canvas/music/system` — preset music tracks (classical/ambient).

---

## 7. Minimal client (TypeScript)

```ts
const BASE = "https://deckoviz-demo.onrender.com/api/vizzy-canvas";

async function call<T>(path: string, token: string, method = "GET", body?: any): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any)?.error || `HTTP ${res.status}`);
  return json as T;
}

export const generate = (token: string, prompt: string, opts?: { num_results?: number; aspect_ratio?: string }) =>
  call<{ images: { url: string }[]; creditsRemaining: number }>("/generate", token, "POST", { prompt, ...opts });

export const listImages   = (token: string) => call<{ images: any[] }>("/images", token);
export const favoriteImage= (token: string, id: string) => call(`/images/${id}/favorite`, token, "PATCH");
export const deleteImage  = (token: string, id: string) => call(`/images/${id}`, token, "DELETE");

export const inpaint       = (token: string, imageUrl: string, prompt: string) =>
  call<{ editedImage: { url: string } }>("/inpaint", token, "POST", { imageUrl, prompt });
export const styleTransfer = (token: string, imageUrl: string, style: string) =>
  call<{ transferredImage: { url: string } }>("/style-transfer", token, "POST", { imageUrl, style });

export const chat = (token: string, messages: any[], chatId?: string) =>
  call<{ content: string; chatId: string }>("/chat", token, "POST", { messages, chatId: chatId ?? null });
```

### Simplest canvas flow

```ts
// 1. user types a prompt -> generate
const { images, creditsRemaining } = await generate(token, prompt, { aspect_ratio: "9:16" });
showImage(images[0].url);
updateCredits(creditsRemaining);

// 2. user taps "edit" with a follow-up instruction
const { editedImage } = await inpaint(token, images[0].url, "warmer colors, sunrise");
showImage(editedImage.url);

// 3. gallery tab
const { images: gallery } = await listImages(token);
```

---

## 8. Advanced (optional): the unified agent — `POST /api/vizzy-canvas/agent`

There's a single "smart" endpoint that classifies intent and routes to the right
pipeline (chat vs image vs video vs music) on the server:

```json
{ "messages": [ { "role": "user", "content": "paint me a foggy forest" } ], "chatId": null, "mode": "home" }
```
It returns **either** a normal chat reply, **or** a delegation signal telling you to
call a media pipeline:
```json
{ "delegateToMedia": true, "intent": "image", "...": "..." }
```
**Recommendation:** for a first working version, skip `/agent` and wire the direct
endpoints (Sections 2–6). Add `/agent` later if you want one-box natural-language
control. When `delegateToMedia` is `true` with `intent: "image"`, just call
`/generate` with the user's prompt.

---

## 9. Onboarding (optional, first run)

If the app wants Vizzy's get-to-know-you flow before the canvas:
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/vizzy-canvas/onboarding/status` | `{ completed, hasPersona, persona }` — check on launch |
| POST | `/api/vizzy-canvas/onboarding/start` | Creates an onboarding chat → `{ chat }` |
| POST | `/api/vizzy-canvas/onboarding/complete` | Body `{ persona: {…} }` → saves the persona |

Skippable for a basic canvas — go straight to `/generate`.

---

## 10. Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `401 "Sign in to use this feature."` | No/expired token on a paid call | Send `Authorization: Bearer <token>`; re-login on 401 |
| `402 Not enough credits` | Balance < cost | Read `required`/`balance` from the body; prompt top-up |
| Generated image never saved to gallery | Reading from the wrong endpoint | Gallery is `GET /images`; images auto-save on generate |
| Video URL 403/empty | Veo URLs need the API key appended | The backend already appends it in `/video/status`; use the returned `videoUrl` as-is |
| Video status call 404 | `requestId` has slashes and was put in the path | Pass it as `?op=<urlEncoded requestId>` |
| First call very slow | Render cold start + model latency | Show a spinner; don't time out under ~60s |
| Chat forgets context | Not resending history / not reusing `chatId` | Resend the full `messages` array and pass the returned `chatId` |

---

## 11. Quick reference

| Method | Endpoint | Body | Returns |
|---|---|---|---|
| POST | `/api/vizzy-canvas/generate` | `{ prompt, num_results?, aspect_ratio? }` | `{ images[], creditsRemaining }` |
| GET | `/api/vizzy-canvas/images` | — | `{ images[] }` |
| PATCH | `/api/vizzy-canvas/images/{id}/favorite` | — | `{ image }` |
| DELETE | `/api/vizzy-canvas/images/{id}` | — | `{ success }` |
| POST | `/api/vizzy-canvas/inpaint` | `{ imageUrl, prompt }` | `{ editedImage:{url}, creditsRemaining }` |
| POST | `/api/vizzy-canvas/style-transfer` | `{ imageUrl, style }` | `{ transferredImage:{url}, creditsRemaining }` |
| POST | `/api/vizzy-canvas/analyze-image` | `{ imageUrl, prompt? }` | `{ analysis }` |
| POST | `/api/vizzy-canvas/chat` | `{ messages, chatId? }` | `{ content, chatId }` |
| GET/POST | `/api/vizzy-canvas/chats` | — | list / create sessions |
| GET/DELETE | `/api/vizzy-canvas/chats/{id}` | — | resume / delete a session |
| POST | `/api/vizzy-canvas/music/generate` | `{ prompt }` | `{ audioUrl, creditsRemaining }` |
| POST | `/api/vizzy-canvas/video/generate` | `{ prompt?, imageUrl? }` | `{ requestId, status }` |
| GET | `/api/vizzy-canvas/video/status?op=…` | — | `{ status, videoUrl? }` |
| POST | `/api/vizzy-canvas/narrate` | `{ text, provider?, voiceId? }` | `{ audioUrl }` |

All Bearer-authed. Errors come back as `{ "error": "<message>" }` with a 4xx/5xx
status.

**Bottom line:** `POST /generate` with the user's token to make art, list it from
`GET /images`, edit with `/inpaint` or `/style-transfer`, and (optionally) chat via
`/chat`. That's a complete Vizzy Creation Canvas.
