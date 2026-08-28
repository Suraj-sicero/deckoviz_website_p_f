# Daily Curator — Mobile Build Guide (step by step)

This is a **hands-on implementation guide** for adding the Daily Curator to the
mobile app. Follow it top to bottom and it will work. Field shapes here match the
backend exactly — don't guess them.

> If you only want the raw endpoint list, see `MOBILE_DAILY_CURATOR_INTEGRATION.md`.
> This guide is the "just build it like this" version.

---

## 0. What you're building (the whole flow)

```
Website Admin Panel                 Render Backend                 Mobile App
─────────────────────               ──────────────                ──────────────
Admin picks a user and      ──►  saves item into the      ──►  App calls GET /me,
sends an artwork/collection      user's daily curation         shows the artworks
to their daily curation          (Postgres)                    & collections
```

The admin **pushes** items to a specific user. The app **pulls** them with the
logged-in user's token. There is nothing else to it — no Supabase, no sockets.
Just 3 GET/POST calls.

**The golden rule:** every call is made with the **logged-in user's own JWT**
(the token from `POST /api/auth/signin`). The backend figures out *which* user's
curation to return *from the token*. You never send a user id.

---

## 1. Prerequisites

- The user is logged in and you have their JWT (see `RENDER_AUTH_API.md`).
- Base URL:
  ```
  https://deckoviz-demo.onrender.com
  ```
  > Render free tier: the **first** request after the server is idle can take
  > 30–60s (cold start). Always show a loading spinner and don't treat a slow
  > first call as an error.

---

## 2. The 3 endpoints you will use

| # | Method | Endpoint | Use it for |
|---|---|---|---|
| 1 | GET | `/api/daily-curator/me` | Get today's full curation (render this) |
| 2 | GET | `/api/daily-curator/me/status` | Cheap check: "did anything change?" (polling) |
| 3 | POST | `/api/daily-curator/me/items/{id}/seen` | Mark one item as opened (optional) |

All require the header:
```
Authorization: Bearer <JWT>
Content-Type: application/json
```

Optional `?date=YYYY-MM-DD` on #1 and #2 to fetch a specific day (defaults to today).

---

## 3. The exact data shapes (TypeScript)

Paste these types into the app — they match the backend 1:1.

```ts
// ---- The artwork object (itemType === "artwork") ----
export interface Artwork {
  id: string;
  title: string;
  artist: string | null;        // defaults to "Unknown Artist"
  imageUrl: string;             // <-- show this image
  category: string | null;      // e.g. "Realism"
  style: string | null;
  tags: string | null;          // JSON string, e.g. '["calm","blue"]' — parse if needed
  description: string | null;
  isFeatured: boolean;
  displayOrder: number;
}

// ---- The collection object (itemType === "collection") ----
export interface CollectionData {
  id: string;
  name: string;                 // <-- show this title
  description: string | null;
  isSystem: boolean;
}

// ---- Attached music (or null) ----
export interface MusicTrack {
  id: string;
  title: string | null;
  audioUrl: string;             // <-- play this
  category: string | null;      // "classical" | "ambient"
  duration: number | null;      // seconds
}

// ---- One entry in the daily curation ----
export interface DailyItem {
  id: string;                   // the ENTRY id — use THIS for "mark seen"
  itemType: "artwork" | "collection";
  itemId: string;               // id of the underlying artwork/collection
  displayDate: string;          // "2026-06-05"
  order: number;                // ascending display order set by admin
  seenAt: string | null;        // null until opened, then ISO timestamp
  data: Artwork | CollectionData | null;  // null if source was deleted — SKIP these
  music: MusicTrack | null;
  saved: boolean;               // true if the user has Saved this (Collections tab)
  liked: boolean;               // true if the user has Liked this (heart toggle)
}

// ---- The /me response ----
export interface DailyCuration {
  displayDate: string;
  curationUpdatedAt: string | null;  // changes whenever admin edits this user's day
  artworks: DailyItem[];             // items where itemType === "artwork"
  collections: DailyItem[];          // items where itemType === "collection"
}

// ---- The /me/status response ----
export interface CurationStatus {
  displayDate: string;
  curationUpdatedAt: string | null;
  count: number;
}
```

⚠️ **Two ids, don't mix them up:**
- `item.id` → the **entry** id (use for `mark seen`).
- `item.itemId` / `item.data.id` → the **artwork/collection** id (use if you open a
  detail screen for the artwork itself).

---

## 4. Step 1 — API client

Create `src/api/dailyCurator.ts`:

```ts
import { DailyCuration, CurationStatus } from "./types";

const BASE = "https://deckoviz-demo.onrender.com";

// getToken() = however you store the logged-in user's JWT
// (secure storage / your auth slice). It MUST be the current user's token.
async function authedGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) throw new Error("UNAUTHORIZED"); // token expired -> re-login
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function getDailyCuration(token: string, date?: string) {
  const q = date ? `?date=${date}` : "";
  return authedGet<DailyCuration>(`/api/daily-curator/me${q}`, token);
}

export function getCurationStatus(token: string, date?: string) {
  const q = date ? `?date=${date}` : "";
  return authedGet<CurationStatus>(`/api/daily-curator/me/status${q}`, token);
}

export async function markItemSeen(token: string, entryId: string) {
  const res = await fetch(`${BASE}/api/daily-curator/me/items/${entryId}/seen`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

---

## 5. Step 2 — the data hook (fetch + smart refresh)

Create `src/hooks/useDailyCuration.ts`. This loads the curation and only re-fetches
the heavy payload when `curationUpdatedAt` actually changed.

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import { getDailyCuration, getCurationStatus } from "../api/dailyCurator";
import { DailyCuration } from "../api/types";

export function useDailyCuration(token: string) {
  const [data, setData] = useState<DailyCuration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastUpdatedAt = useRef<string | null>(null);

  // Full load (first paint / pull-to-refresh)
  const load = useCallback(async () => {
    try {
      setError(null);
      const fresh = await getDailyCuration(token);
      lastUpdatedAt.current = fresh.curationUpdatedAt;
      setData(fresh);
    } catch (e: any) {
      setError(e.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Cheap check; only pulls full payload if something changed
  const refreshIfChanged = useCallback(async () => {
    try {
      const status = await getCurationStatus(token);
      if (status.curationUpdatedAt !== lastUpdatedAt.current) {
        await load();
      }
    } catch {
      /* ignore poll errors; keep showing cached data */
    }
  }, [token, load]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load, refreshIfChanged };
}
```

---

## 6. Step 3 — the screen (two tabs: Artworks & Collections)

Create `src/screens/DailyCuratorScreen.tsx`. Plain React Native, no extra libs
except whatever you already use for navigation. Audio uses `expo-av` (swap for
your player if different).

```tsx
import React, { useState } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ActivityIndicator, RefreshControl, StyleSheet,
} from "react-native";
import { useDailyCuration } from "../hooks/useDailyCuration";
import { markItemSeen } from "../api/dailyCurator";
import { DailyItem, Artwork, CollectionData } from "../api/types";

export default function DailyCuratorScreen({ token }: { token: string }) {
  const { data, loading, error, reload } = useDailyCuration(token);
  const [tab, setTab] = useState<"artworks" | "collections">("artworks");

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading your daily curation…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Couldn't load. Pull to retry.</Text>
        <TouchableOpacity onPress={reload}><Text style={styles.link}>Retry</Text></TouchableOpacity>
      </View>
    );
  }

  const items = tab === "artworks" ? (data?.artworks ?? []) : (data?.collections ?? []);
  // skip entries whose source was deleted
  const visible = items.filter((i) => i.data !== null);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <Tab label="Daily Artworks" active={tab === "artworks"} onPress={() => setTab("artworks")} />
        <Tab label="Collections"    active={tab === "collections"} onPress={() => setTab("collections")} />
      </View>

      <FlatList
        data={visible}
        keyExtractor={(it) => it.id}
        refreshControl={<RefreshControl refreshing={false} onRefresh={reload} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.muted}>Nothing curated for today yet ✨</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CurationCard item={item} onOpen={() => markItemSeen(token, item.id).catch(() => {})} />
        )}
      />
    </View>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function CurationCard({ item, onOpen }: { item: DailyItem; onOpen: () => void }) {
  // Render based on type. data is guaranteed non-null here (we filtered).
  if (item.itemType === "artwork") {
    const art = item.data as Artwork;
    return (
      <TouchableOpacity style={styles.card} onPress={onOpen} activeOpacity={0.85}>
        <Image source={{ uri: art.imageUrl }} style={styles.image} />
        <View style={styles.cardBody}>
          <Text style={styles.title}>{art.title}</Text>
          <Text style={styles.muted}>{art.artist ?? "Unknown Artist"}</Text>
          {item.music && <Text style={styles.badge}>♪ {item.music.title ?? "Music"}</Text>}
          {!item.seenAt && <View style={styles.dot} />}
        </View>
      </TouchableOpacity>
    );
  }

  const col = item.data as CollectionData;
  return (
    <TouchableOpacity style={styles.card} onPress={onOpen} activeOpacity={0.85}>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{col.name}</Text>
        {!!col.description && <Text style={styles.muted}>{col.description}</Text>}
        {item.music && <Text style={styles.badge}>♪ {item.music.title ?? "Music"}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 8 },
  tabs: { flexDirection: "row", padding: 12, gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999, backgroundColor: "#16233f" },
  tabActive: { backgroundColor: "#2563EB" },
  tabText: { color: "#93b0d8" },
  tabTextActive: { color: "#fff", fontWeight: "700" },
  card: { margin: 12, borderRadius: 16, overflow: "hidden", backgroundColor: "#101c33" },
  image: { width: "100%", height: 220, backgroundColor: "#0e1830" },
  cardBody: { padding: 14, gap: 4 },
  title: { color: "#fff", fontSize: 16, fontWeight: "700" },
  muted: { color: "#93b0d8" },
  badge: { color: "#9ec1ff", marginTop: 4 },
  link: { color: "#60a5fa", fontWeight: "700" },
  dot: { position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: 5, backgroundColor: "#22c55e" },
});
```

That's a working screen. Pass it the logged-in user's token.

---

## 7. Step 4 — keep it fresh (so admin pushes appear)

When the admin adds an artwork from the website, the app needs to pick it up. Use
the cheap `/me/status` check — call `refreshIfChanged()` (from the hook):

```ts
// In DailyCuratorScreen, using react-navigation:
import { useFocusEffect } from "@react-navigation/native";

useFocusEffect(
  React.useCallback(() => {
    refreshIfChanged();                         // check on screen focus
    const id = setInterval(refreshIfChanged, 45000); // and every 45s while open
    return () => clearInterval(id);
  }, [refreshIfChanged])
);
```

This is battery-friendly: `/me/status` is tiny, and the full `/me` payload is only
re-fetched when `curationUpdatedAt` actually changed.

---

## 8. Step 5 — play attached music (optional)

If `item.music` is not null, play `item.music.audioUrl`:

```ts
import { Audio } from "expo-av";

async function playTrack(url: string) {
  const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
  return sound; // remember to sound.unloadAsync() when leaving the screen
}
```

---

## 9. Save & Like — the "View" screen actions

When the user taps **View** on an artwork, open a detail screen with the big image,
title, description, and an action bar: **Like (♥)**, **Save (★)**, and Add music.

- **Save** = the artwork is kept **permanently in the Collections tab** until the
  user removes it. (On the website it shows in "Collections" next to admin-pushed
  collections — do the same on mobile.)
- **Like** = a lightweight heart toggle, tracked **independently** of Save (a liked
  artwork is NOT auto-added to Collections).

Each item from `/me` and `/me/saved` already tells you the current state via the
`saved` and `liked` booleans — use them to paint the buttons filled/empty.

### Endpoints

| Method | Endpoint | Body | Purpose |
|---|---|---|---|
| GET | `/api/daily-curator/me/saved` | — | List the user's saved items (for the Collections tab) |
| POST | `/api/daily-curator/me/saved` | `{ "itemType": "artwork", "itemId": "<id>" }` | Save an item |
| DELETE | `/api/daily-curator/me/saved/{itemId}?itemType=artwork` | — | Remove a saved item |
| POST | `/api/daily-curator/me/like` | `{ "itemType": "artwork", "itemId": "<id>" }` | **Toggle** like on/off |

> `itemType` defaults to `"artwork"` if you omit it. Use `item.itemId` (the
> artwork id), **not** the entry `id`, in these calls.

**`GET /api/daily-curator/me/saved` → `200`**
```json
{
  "items": [
    {
      "id": "save-row-id",
      "itemType": "artwork",
      "itemId": "3a2b...",
      "saved": true,
      "liked": false,
      "data": { "id": "3a2b...", "title": "The Silent Watcher", "imageUrl": "https://...", "artist": "Elena Rostova", "description": "..." },
      "music": null
    }
  ]
}
```
This list is **persistent** (not per-day) — show it in the Collections tab.

**`POST /api/daily-curator/me/saved` → `200`** `{ "success": true, "saved": true, "liked": false }`
**`DELETE …/me/saved/{itemId}` → `200`** `{ "success": true, "saved": false }`
**`POST /api/daily-curator/me/like` → `200`** `{ "success": true, "liked": true }` (the new state — just paint the heart from this)

### Client helpers

```ts
export const getSaved   = (token: string) =>
  authedGet<{ items: DailyItem[] }>("/api/daily-curator/me/saved", token);

export const saveItem   = (token: string, itemId: string, itemType = "artwork") =>
  authedPost("/api/daily-curator/me/saved", token, { itemType, itemId });

export const unsaveItem = (token: string, itemId: string, itemType = "artwork") =>
  authedDelete(`/api/daily-curator/me/saved/${itemId}?itemType=${itemType}`, token);

export const toggleLike = (token: string, itemId: string, itemType = "artwork") =>
  authedPost("/api/daily-curator/me/like", token, { itemType, itemId });
// (authedPost/authedDelete = same fetch wrapper as authedGet, with method + JSON body)
```

### Collections tab = admin collections + saved artworks

Build the Collections tab from **two** sources:
1. `collections` from `GET /me` (what the admin pushed for the day), **plus**
2. `items` from `GET /me/saved` (the user's own saved artworks, persistent).

Give each saved card a **Remove** button that calls `unsaveItem(...)` and drops it
from the list. After a successful Save, optimistically add the artwork to this tab
so it appears immediately.

---

## 10. Testing checklist (do this end to end)

1. Log in on the app as a test user → confirm you have that user's token.
2. On the **website admin panel**, pick that same user and send them an artwork.
3. In the app, open the Daily Curator screen (or pull to refresh) → the artwork
   appears in **Daily Artworks**.
4. Add a **collection** from admin → it appears in the **Collections** tab.
5. Remove the item from admin → after the next refresh it's gone.
6. Tap an item → it's marked seen (the green dot disappears; `seenAt` is set).
7. Tap **View** → **Save** on an artwork → it appears in the **Collections** tab
   (and `saved` becomes `true`). Re-open the app → it's still there (persistent).
8. In Collections, **Remove** the saved artwork → it disappears.
9. Tap **Like** → the heart fills; tap again → it empties (`liked` toggles).

If steps 2–3 don't line up, 99% of the time it's the **wrong user**: the app token
must belong to the *same* user the admin sent the item to (same email).

---

## 11. Common mistakes (read this if it "doesn't work")

| Symptom | Cause | Fix |
|---|---|---|
| `/me` returns empty arrays | App user ≠ the user the admin curated for | Use the logged-in user's own token; confirm same email |
| `401 Unauthorized` | No/expired token | Send `Authorization: Bearer <token>`; re-login on 401 (no refresh token, 7-day expiry) |
| Shows the wrong user's items / same name for everyone | Token or profile cached from a previous session (the "ayush798" bug) | Always use the **current** user's token; clear it on logout; never hard-code a user |
| Images don't load | Using `itemId` instead of `data.imageUrl` | Render `item.data.imageUrl` |
| "Mark seen" 404s | Sent `itemId` instead of the entry `id` | Use `item.id` for `/items/{id}/seen` |
| New admin item doesn't show | Not re-fetching | Call `/me/status` on focus/poll and re-pull `/me` when `curationUpdatedAt` changes |
| First call hangs ~30–60s | Render cold start | Normal on free tier; keep the spinner, don't error out |
| Empty after midnight | `displayDate` rolls to a new day | Curation is per-day; admin curates each day (or pass `?date=` to view a past day) |
| Saved artwork vanishes after restart | Reading `saved` from `/me` only (per-day) instead of `/me/saved` | Build the Collections tab from `/me/saved` (persistent), not just `/me` |
| Save/Like hits the wrong artwork | Sent the entry `id` instead of `itemId` | Save/Like use **`item.itemId`** (the artwork id) |
| Like also saved it (or vice-versa) | Treating them as one action | They're independent: `/me/like` toggles `liked`; `/me/saved` controls `saved` |

---

## 12. Quick reference

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/daily-curator/me` | `{ displayDate, curationUpdatedAt, artworks[], collections[] }` (each item has `saved`/`liked`) |
| GET | `/api/daily-curator/me?date=YYYY-MM-DD` | Same, for a specific day |
| GET | `/api/daily-curator/me/status` | `{ displayDate, curationUpdatedAt, count }` |
| POST | `/api/daily-curator/me/items/{id}/seen` | `{ success: true, item }` |
| GET | `/api/daily-curator/me/saved` | `{ items: [...] }` — persistent saved list (Collections tab) |
| POST | `/api/daily-curator/me/saved` | `{ success, saved: true }` — body `{ itemType?, itemId }` |
| DELETE | `/api/daily-curator/me/saved/{itemId}?itemType=artwork` | `{ success, saved: false }` |
| POST | `/api/daily-curator/me/like` | `{ success, liked }` — body `{ itemType?, itemId }` (toggles) |

All Bearer-authed. Errors: `{ "error": "<message>" }` with a 4xx/5xx status.

**Bottom line:** call `/me` with the user's token, render `artworks` + `collections`,
poll `/me/status` to stay fresh, and use `/me/saved` + `/me/like` for the View
screen's Save and Like actions. That's the whole feature.
