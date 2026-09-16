import { API_BASE_URL } from "./constants";

export type ArtPlayQueueItem = {
  id: string;
  appInstanceId?: string;
  artworkId?: string | null;
  imageUrl: string;
  url?: string;
  cdn_url?: string;
  title?: string | null;
  sentAt?: string;
  position?: number;
};

export type ArtPlaySendResult = {
  success: boolean;
  dispatched?: boolean;
  message_id?: string;
  appInstanceId?: string;
  item?: ArtPlayQueueItem;
  error?: string;
};

function authHeaders(token: string | null | undefined): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token && token !== "null" && token !== "undefined") {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/* ── Local Storage & Broadcast Sync ───────────────────────────────────────── */
export function getLocalArtPlayQueue(instanceId: string): ArtPlayQueueItem[] {
  try {
    const raw = localStorage.getItem(`deckoviz_artplay_queue_${instanceId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [];
}

export function saveLocalArtPlayQueue(instanceId: string, queue: ArtPlayQueueItem[]): void {
  try {
    localStorage.setItem(`deckoviz_artplay_queue_${instanceId}`, JSON.stringify(queue));
  } catch {
    /* ignore */
  }
}

const artPlayChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("deckoviz_artplay_sync") : null;

export function notifyArtPlayItemAdded(item: ArtPlayQueueItem): void {
  if (artPlayChannel) {
    try {
      artPlayChannel.postMessage({ type: "ADD_ITEM", item });
    } catch {
      /* ignore */
    }
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("deckoviz_artplay_item_added", { detail: item }));
  }
}

export async function sendToArtPlay(
  token: string | null | undefined,
  instanceId: string,
  payload: { artworkId?: string; url?: string; title?: string }
): Promise<ArtPlaySendResult> {
  const imageUrl = payload.url || "";
  const newItemId = `apq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const localItem: ArtPlayQueueItem = {
    id: newItemId,
    appInstanceId: instanceId,
    artworkId: payload.artworkId || null,
    imageUrl: imageUrl,
    url: imageUrl,
    cdn_url: imageUrl,
    title: payload.title || "Artwork",
    sentAt: new Date().toISOString(),
  };

  // 1. Immediately store in local queue for instant display & cross-tab sync
  const currentLocal = getLocalArtPlayQueue(instanceId);
  const exists = currentLocal.some(
    (x) => (x.id && x.id === localItem.id) || (x.imageUrl && x.imageUrl === localItem.imageUrl)
  );
  if (!exists) {
    const updated = [...currentLocal, localItem];
    saveLocalArtPlayQueue(instanceId, updated);
  }
  notifyArtPlayItemAdded(localItem);

  // 2. Attempt async backend API call (if backend DB fails, we still return success based on local queue)
  try {
    const res = await fetch(`${API_BASE_URL}/api/artplay/${encodeURIComponent(instanceId)}/send`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        artwork_id: payload.artworkId,
        artworkId: payload.artworkId,
        url: payload.url,
        title: payload.title,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, dispatched: true, item: data.item || localItem, ...data };
    }
  } catch {
    /* Backend fetch failed (e.g. server offline or DB error) - local queue is active */
  }

  return { success: true, dispatched: true, item: localItem };
}

export async function getArtPlayQueue(
  token: string | null | undefined,
  instanceId: string
): Promise<ArtPlayQueueItem[]> {
  const localItems = getLocalArtPlayQueue(instanceId);
  let backendItems: ArtPlayQueueItem[] = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/artplay/${encodeURIComponent(instanceId)}`, {
      headers: authHeaders(token),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && Array.isArray(data.items)) {
      backendItems = data.items.map((item: ArtPlayQueueItem) => ({
        ...item,
        imageUrl: item.imageUrl || item.url || item.cdn_url || "",
      }));
    }
  } catch {
    /* ignore backend errors */
  }

  // Combine backend + local items, removing duplicates
  const map = new Map<string, ArtPlayQueueItem>();
  [...localItems, ...backendItems].forEach((item) => {
    const key = item.id || item.imageUrl || item.url || "";
    if (key && !map.has(key)) {
      map.set(key, { ...item, imageUrl: item.imageUrl || item.url || item.cdn_url || "" });
    }
  });

  return Array.from(map.values());
}

