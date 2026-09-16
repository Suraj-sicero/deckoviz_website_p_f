const STORAGE_KEY = "deckoviz_artplay_app_instance_id";

function createUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Shared browser-session id for Art Play Page + Add to Live Stream (same origin localStorage). */
export function getOrCreateArtPlayInstanceId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing && existing.trim().length > 8) {
      return existing.trim();
    }
  } catch {
    /* ignore */
  }
  const id = createUuid();
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
  return id;
}
