const PRODUCTION_API_URL = "https://ckoviz-backend.onrender.com";

const trimSlash = (url: string): string => url.replace(/\/+$/, "");

const stripWsPath = (url: string): string =>
  trimSlash(url).replace(/\/ws\/(tv|browser)$/i, "");

export const getApiBaseUrl = (): string => {
  const fromEnv =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BACKEND_URL;
  if (fromEnv) return trimSlash(fromEnv);
  return PRODUCTION_API_URL;
};

export const getWsBaseUrl = (): string => {
  const fromEnv = import.meta.env.VITE_WS_URL;
  if (fromEnv) return stripWsPath(fromEnv);
  return stripWsPath(getApiBaseUrl().replace(/^http/i, "ws"));
};

export const API_BASE_URL = getApiBaseUrl();
export const WS_BASE_URL = getWsBaseUrl();
export const WS_TV_URL = `${WS_BASE_URL}/ws/tv`;
export const WS_BROWSER_URL = `${WS_BASE_URL}/ws/browser`;
export const IMAGE_GEN_API_URL = import.meta.env.VITE_RENDER_URL || API_BASE_URL;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const API_URL = `${API_BASE_URL}/api`;
