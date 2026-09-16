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

export async function sendToArtPlay(
  token: string | null | undefined,
  instanceId: string,
  payload: { artworkId?: string; url?: string; title?: string }
): Promise<ArtPlaySendResult> {
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
  if (!res.ok) {
    return {
      success: false,
      error: data.detail || data.error || `Art Play send failed (${res.status})`,
    };
  }
  return { success: true, ...data };
}

export async function getArtPlayQueue(
  token: string | null | undefined,
  instanceId: string
): Promise<ArtPlayQueueItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/artplay/${encodeURIComponent(instanceId)}`, {
    headers: authHeaders(token),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.detail || data.error || `Failed to load art play queue (${res.status})`);
  }
  const items = Array.isArray(data.items) ? data.items : [];
  return items.map((item: ArtPlayQueueItem) => ({
    ...item,
    imageUrl: item.imageUrl || item.url || item.cdn_url || "",
  }));
}
