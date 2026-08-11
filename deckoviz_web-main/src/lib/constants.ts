export const getApiBaseUrl = (): string => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:8000";
  }
  return "https://deckoviz-website-p-f.onrender.com";
};

export const API_BASE_URL = getApiBaseUrl();
export const IMAGE_GEN_API_URL = import.meta.env.VITE_RENDER_URL || API_BASE_URL;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const API_URL = `${API_BASE_URL}/api`;
