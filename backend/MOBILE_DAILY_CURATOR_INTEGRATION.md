# Daily Curator — Mobile Integration Guide

This guide tells the mobile team how to fetch a user's **Daily Curation**
(artworks + collections an admin pushes from the web admin panel) and how to
keep it in sync when the admin changes it.

---

## 1. Base URL & Auth

**Base URL (production):**

```
https://deckoviz-demo.onrender.com
```

> Note: the backend is on Render's free tier — the **first** request after idle
> can take ~30–60s (cold start). Handle this with a loading state / retry.

**Auth:** every endpoint below requires the user's JWT (same token issued by
`POST /api/auth/login` and `POST /api/auth/signup`). Send it as a Bearer header:

```
Authorization: Bearer <JWT>
Content-Type: application/json
```

A missing/invalid token returns `401 { "error": "Unauthorized" }`.

---

## 2. The two endpoints you need

### 2a. Full curation — `GET /api/daily-curator/me`

Returns today's curation for the logged-in user, fully hydrated (artwork /
collection details + any attached music). Optional `?date=YYYY-MM-DD` to fetch a
specific day (defaults to today, server time).

```
GET /api/daily-curator/me
GET /api/daily-curator/me?date=2026-05-30
```

**Response 200:**

```json
{
  "displayDate": "2026-05-30",
  "curationUpdatedAt": "2026-05-30T08:15:42.000Z",
  "artworks": [
    {
      "id": "9f1c...",                
      "itemType": "artwork",
      "itemId": "3a2b...",            
      "displayDate": "2026-05-30",
      "order": 0,
      "seenAt": null,                 
      "data": {
        "id": "3a2b...",
        "title": "Mona Lisa Reimagined",
        "artist": "Leonardo AI",
        "imageUrl": "https://.../image.jpg",
        "category": "Realism",
        "style": "Portrait",
        "description": "..."
      },
      "music": {
        "id": "c4d5...",
        "title": "Clair de Lune",
        "audioUrl": "https://.../audio.mp3",
        "category": "classical",
        "duration": 320
      }
    }
  ],
  "collections": [
    {
      "id": "7e8f...",
      "itemType": "collection",
      "itemId": "5b6c...",
      "displayDate": "2026-05-30",
      "order": 0,
      "seenAt": null,
      "data": {
        "id": "5b6c...",
        "name": "Calm Mornings",
        "description": "A set for slow starts"
      },
      "music": { "...": "same shape as above, or null" }
    }
  ]
}
```

Field reference (each item in `artworks` / `collections`):

| Field | Meaning |
|---|---|
| `id` | The curation-entry id. **Use this** for "mark as seen". |
| `itemType` | `"artwork"` or `"collection"`. |
| `itemId` | Id of the underlying artwork/collection (same as `data.id`). |
| `order` | Display order set by the admin (ascending). |
| `seenAt` | `null` until the user opens it, then an ISO timestamp. |
| `data` | The artwork or collection object to render (see shapes above). `null` if the source was deleted — skip rendering those. |
| `music` | Attached track (`audioUrl` to play), or `null` if none. |

> Artworks and collections map to the two tabs in the mobile screen
> ("Daily Artworks" and "Collections").

---

### 2b. Lightweight status (for polling) — `GET /api/daily-curator/me/status`

A cheap call to decide **whether** to re-fetch the full curation. Use this for
polling / on-resume checks instead of pulling the whole `/me` payload every time.

```
GET /api/daily-curator/me/status
```

**Response 200:**

```json
{
  "displayDate": "2026-05-30",
  "curationUpdatedAt": "2026-05-30T08:15:42.000Z",
  "count": 4
}
```

- `curationUpdatedAt` changes **every time** the admin adds, reorders, or
  removes an item for this user (also covers deletions).
- `count` = number of items for that day.

---

## 3. Recommended sync flow

The admin pushes curations from the web panel; there is **no silent server
push to the device by default** — the app stays current by checking
`curationUpdatedAt`. This is reliable and battery-friendly.

```
On app open / screen focus / pull-to-refresh:
  1. GET /api/daily-curator/me/status
  2. Compare curationUpdatedAt to the last value you stored locally.
  3. If it changed (or you have no data yet):
        GET /api/daily-curator/me   → render artworks + collections
        store the new curationUpdatedAt locally
  4. If unchanged: do nothing (keep showing cached data).
```

Optional: while the Daily Curator screen is in the foreground, poll
`/me/status` every ~30–60s to pick up changes the admin makes in near real time.

### Minimal example (fetch + JS)

```js
const BASE = "https://deckoviz-demo.onrender.com";

async function api(path, token) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

let lastUpdatedAt = null; // persist this (AsyncStorage) per user

async function refreshDailyCuration(token) {
  const status = await api("/api/daily-curator/me/status", token);
  if (status.curationUpdatedAt !== lastUpdatedAt) {
    const data = await api("/api/daily-curator/me", token);
    lastUpdatedAt = status.curationUpdatedAt;
    return data; // { displayDate, artworks, collections }
  }
  return null; // nothing changed
}
```

---

## 4. Mark an item as seen (optional)

When the user opens an artwork/collection, you can record it. Use the entry
`id` (not `itemId`).

```
POST /api/daily-curator/me/items/{id}/seen
```

**Response 200:** `{ "success": true, "item": { ...with seenAt set... } }`

---

## 5. Attached music (optional)

If an item has a non-null `music` object, play `music.audioUrl` (standard
MP3/audio URL). `category` is `"classical"` or `"ambient"`; `duration` is in
seconds. No extra call needed — it's embedded in the `/me` response.

---

## 6. Real-time push (optional, future)

If you later want a true device push the moment the admin saves (instead of
polling), the backend can fire an outbound webhook to a push relay you provide
(e.g. an Expo push service). That's a server-config addition (`MOBILE_WEBHOOK_URL`)
— tell the backend team the relay URL and they'll enable it. The payload is:

```json
{
  "event": "daily_curation.updated",
  "userId": "<recipient user id>",
  "updatedAt": "2026-05-30T08:15:42.000Z",
  "action": "added | updated | reordered | removed",
  "displayDate": "2026-05-30",
  "itemType": "artwork | collection",
  "itemId": "<id>"
}
```

For launch, **polling `/me/status` (Section 3) is enough** — push can be added
later without any app-side change to the fetch logic.

---

## 7. Quick reference

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/api/daily-curator/me` | Full daily curation (artworks + collections + music) | Bearer |
| GET | `/api/daily-curator/me?date=YYYY-MM-DD` | Curation for a specific day | Bearer |
| GET | `/api/daily-curator/me/status` | `{ curationUpdatedAt, count }` — poll to detect changes | Bearer |
| POST | `/api/daily-curator/me/items/{id}/seen` | Mark one item seen | Bearer |

**Errors:** `401` (missing/invalid token), `404` (item not found, for `/seen`),
`500` (server). All errors return `{ "error": "<message>" }`.
