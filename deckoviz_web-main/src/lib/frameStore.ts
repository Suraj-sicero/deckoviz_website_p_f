/**
 * frameStore.ts
 * Lightweight cross-route store for the "Send to Virtual Frame" feature.
 * Uses localStorage so the /webframe page can pick up the image even across
 * browser tabs, and falls back gracefully when localStorage is unavailable.
 */

const FRAME_IMAGE_KEY = "deckoviz_virtual_frame_image";
const FRAME_SENT_AT_KEY = "deckoviz_virtual_frame_sent_at";

/** Write the selected image (URL or data-URL) to localStorage */
export function setFrameImage(imageUrl: string): void {
  try {
    localStorage.setItem(FRAME_IMAGE_KEY, imageUrl);
    localStorage.setItem(FRAME_SENT_AT_KEY, Date.now().toString());
  } catch {
    // quota exceeded or private browsing — fail silently
  }
}

/** Read the current frame image from localStorage */
export function getFrameImage(): string | null {
  try {
    return localStorage.getItem(FRAME_IMAGE_KEY);
  } catch {
    return null;
  }
}

/** Read the timestamp when the image was last sent */
export function getFrameSentAt(): number | null {
  try {
    const raw = localStorage.getItem(FRAME_SENT_AT_KEY);
    return raw ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

/** Clear the frame image (restore to default) */
export function clearFrameImage(): void {
  try {
    localStorage.removeItem(FRAME_IMAGE_KEY);
    localStorage.removeItem(FRAME_SENT_AT_KEY);
  } catch {
    // ignore
  }
}
