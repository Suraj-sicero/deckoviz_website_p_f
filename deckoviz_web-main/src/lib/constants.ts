/* ─────────────────────────────────────────────────────────────────────────────
 * Deckoviz URL Configuration
 *
 * REST API  → https://deckoviz-web-f.onrender.com   (collections, auth, etc.)
 * WebSocket → wss://ckoviz-backend.onrender.com     (TV pairing, live control)
 *
 * Environment variables can override these defaults:
 *   VITE_API_URL / VITE_API_BASE_URL / VITE_BACKEND_URL  → REST base
 *   VITE_WS_URL                                          → WebSocket base
 *   VITE_RENDER_URL                                      → Image generation
 * ───────────────────────────────────────────────────────────────────────────── */

const PRODUCTION_API_URL = "https://deckoviz-web-f.onrender.com";
const PRODUCTION_WS_URL = "wss://ckoviz-backend.onrender.com";

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

const stripWsPath = (url: string): string =>
  trimSlash(url).replace(/\/ws\/(tv|browser)$/i, "");

/* ── REST API base ─────────────────────────────────────────────────────────── */
export const getApiBaseUrl = (): string => {
  const fromEnv =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BACKEND_URL;
  if (fromEnv) return trimSlash(fromEnv);
  return PRODUCTION_API_URL;
};

/* ── WebSocket base (separate server) ──────────────────────────────────────── */
export const getWsBaseUrl = (): string => {
  const fromEnv = import.meta.env.VITE_WS_URL;
  if (fromEnv) return stripWsPath(fromEnv);
  return PRODUCTION_WS_URL;
};

/* ── Exported constants ────────────────────────────────────────────────────── */
export const API_BASE_URL = getApiBaseUrl();
export const WS_BASE_URL = getWsBaseUrl();
export const WS_TV_URL = `${WS_BASE_URL}/ws/tv`;
export const WS_BROWSER_URL = `${WS_BASE_URL}/ws/browser`;
export const IMAGE_GEN_API_URL = import.meta.env.VITE_RENDER_URL || API_BASE_URL;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const API_URL = `${API_BASE_URL}/api`;
