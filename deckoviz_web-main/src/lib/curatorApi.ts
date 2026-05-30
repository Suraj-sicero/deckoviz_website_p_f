// curatorApi.ts — client for the Music Curation + Daily Curator endpoints.
// Self-contained: resolves the API base from VITE_API_URL and the auth token
// from localStorage (falls back to scanning for a JWT-shaped value so it works
// regardless of which key AuthContext uses).

const API_BASE =
  (import.meta.env.VITE_API_URL as string) ||
  "https://deckoviz-demo.onrender.com";

export function getAuthToken(): string | null {
  const direct =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken");
  if (direct) return direct;
  // Fallback: find any JWT-looking value already in localStorage.
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    const v = localStorage.getItem(k) || "";
    if (/^eyJ[\w-]+\.[\w-]+\.[\w-]+$/.test(v)) return v;
  }
  return null;
}

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((json as any)?.error || `Request failed (${res.status})`);
  }
  return json as T;
}

// ---------- Types ----------
export interface MusicTrack {
  id: string;
  title: string;
  audioUrl: string;
  category: string; // "classical" | "ambient"
  duration?: number;
  isFavorited?: boolean;
}

export type MusicTargetType = "collection" | "artwork" | "curation";

export interface Curation {
  id: string;
  title: string;
  artist?: string;
  imageUrl: string;
  category?: string;
  style?: string;
  description?: string;
}

export interface CollectionRow {
  id: string;
  name: string;
  description?: string;
}

export type DailyItemType = "artwork" | "collection";

export interface DailyItem {
  id: string;
  userId: string;
  itemType: DailyItemType;
  itemId: string;
  displayDate: string;
  order: number;
  seenAt: string | null;
  data: Curation | CollectionRow | null;
  music: MusicTrack | null;
}

export interface AdminUser {
  id: string;
  email: string;
  tier?: string;
  isAdmin?: boolean;
}

// ---------- Music (Feature 1) ----------
export const getSystemMusic = () =>
  req<{ tracks: MusicTrack[] }>("/api/vizzy-canvas/music/system");

export const getMusicForItem = (
  targetType: MusicTargetType,
  targetId: string
) =>
  req<{ attachment: any; track: MusicTrack | null }>(
    `/api/vizzy-canvas/music/attach?targetType=${targetType}&targetId=${encodeURIComponent(
      targetId
    )}`
  );

export const attachMusic = (
  targetType: MusicTargetType,
  targetId: string,
  musicTrackId: string
) =>
  req<{ success: boolean; track: MusicTrack }>(
    "/api/vizzy-canvas/music/attach",
    {
      method: "POST",
      body: JSON.stringify({ targetType, targetId, musicTrackId }),
    }
  );

export const detachMusic = (targetType: MusicTargetType, targetId: string) =>
  req<{ success: boolean; removed: number }>(
    `/api/vizzy-canvas/music/attach?targetType=${targetType}&targetId=${encodeURIComponent(
      targetId
    )}`,
    { method: "DELETE" }
  );

export const getMyMusicAttachments = () =>
  req<{ attachments: any[] }>("/api/vizzy-canvas/music/attachments");

// ---------- Daily Curator (Feature 2) — user ----------
export const getMyDailyCuration = (date?: string) =>
  req<{ displayDate: string; artworks: DailyItem[]; collections: DailyItem[] }>(
    `/api/daily-curator/me${date ? `?date=${date}` : ""}`
  );

export const markItemSeen = (itemId: string) =>
  req<{ success: boolean }>(`/api/daily-curator/me/items/${itemId}/seen`, {
    method: "POST",
  });

// ---------- Daily Curator (Feature 2) — admin ----------
export const adminListUsers = (search?: string) =>
  req<{ users: AdminUser[] }>(
    `/api/daily-curator/admin/users${
      search ? `?search=${encodeURIComponent(search)}` : ""
    }`
  );

export const adminGetLibrary = () =>
  req<{ artworks: Curation[]; collections: CollectionRow[] }>(
    "/api/daily-curator/admin/library"
  );

export const adminGetUserItems = (userId: string, date?: string) =>
  req<{ displayDate: string; items: DailyItem[] }>(
    `/api/daily-curator/admin/users/${userId}/items${date ? `?date=${date}` : ""}`
  );

export const adminAddItem = (payload: {
  userId: string;
  itemType: DailyItemType;
  itemId: string;
  displayDate?: string;
  order?: number;
}) =>
  req<{ success: boolean; created: boolean; item: DailyItem }>(
    "/api/daily-curator/admin/items",
    { method: "POST", body: JSON.stringify(payload) }
  );

export const adminRemoveItem = (id: string) =>
  req<{ success: boolean; removed: number }>(
    `/api/daily-curator/admin/items/${id}`,
    { method: "DELETE" }
  );
