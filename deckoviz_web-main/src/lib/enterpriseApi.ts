const BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://deckoviz-website-p-f.onrender.com";
const API = `${BASE}/api`;

export interface EnterpriseEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  collectionName?: string;
  recurring?: boolean;
  frequency?: string;
  description?: string;
  userId?: string;
}

function getToken(): string | null {
  const direct =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("deckoviz_token") ||
    localStorage.getItem("jwt");
  if (direct) {
    const cleaned = direct.replace(/^["']|["']$/g, "").trim();
    return cleaned.startsWith("Bearer ") ? cleaned.substring(7).trim() : cleaned;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    const v = (localStorage.getItem(k) || "").replace(/^["']|["']$/g, "").trim();
    const tokenVal = v.startsWith("Bearer ") ? v.substring(7).trim() : v;
    if (/^eyJ[\w-]+\.[\w-]+\.[\w-]+$/.test(tokenVal)) return tokenVal;
  }
  return null;
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function handleResponse(res: Response, method: string, path: string) {
  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent("deckoviz-auth-required"));
    throw new Error("Authentication required. Please log in.");
  }
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${API}${path}`, { headers: authHeaders() });
  return handleResponse(res, "GET", path);
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST", headers: authHeaders(), body: JSON.stringify(body),
  });
  return handleResponse(res, "POST", path);
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT", headers: authHeaders(), body: JSON.stringify(body),
  });
  return handleResponse(res, "PUT", path);
}

async function del(path: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers: authHeaders() });
  return handleResponse(res, "DELETE", path);
}

export const enterpriseApi = {
  getProfile: () => get("/enterprise/profile"),
  updateProfile: (data: unknown) => put("/enterprise/profile", data),

  getDashboard: () => get("/enterprise/dashboard"),

  getUnits: () => get("/enterprise/units"),
  createUnit: (data: unknown) => post("/enterprise/units", data),
  updateUnit: (id: string, data: unknown) => put(`/enterprise/units/${id}`, data),
  deleteUnit: (id: string) => del(`/enterprise/units/${id}`),

  getEvents: () => get("/enterprise/events"),
  createEvent: (data: unknown) => post("/enterprise/events", data),
  updateEvent: (id: string, data: unknown) => put(`/enterprise/events/${id}`, data),
  deleteEvent: (id: string) => del(`/enterprise/events/${id}`),

  getDailyQueue: () => get("/enterprise/daily-queue"),
  createDailyQueue: (data: unknown) => post("/enterprise/daily-queue", data),
  updateDailyQueue: (id: string, data: unknown) => put(`/enterprise/daily-queue/${id}`, data),
  deleteDailyQueue: (id: string) => del(`/enterprise/daily-queue/${id}`),

  getGuests: () => get("/enterprise/guests"),
  createGuest: (data: unknown) => post("/enterprise/guests", data),
  updateGuest: (id: string, data: unknown) => put(`/enterprise/guests/${id}`, data),
  deleteGuest: (id: string) => del(`/enterprise/guests/${id}`),

  getTemplates: () => get("/enterprise/templates"),
  createTemplate: (data: unknown) => post("/enterprise/templates", data),
  updateTemplate: (id: string, data: unknown) => put(`/enterprise/templates/${id}`, data),
  deleteTemplate: (id: string) => del(`/enterprise/templates/${id}`),

  getMusic: () => get("/enterprise/music"),
  getNarrations: () => get("/enterprise/narrations"),
  getLibrary: () => get("/enterprise/library"),
  getCurations: () => get("/enterprise/curations"),
  createCuration: (data: unknown) => post("/enterprise/curations", data),

  getCollections: () => get("/enterprise/collections"),
  createCollection: (data: unknown) => post("/enterprise/collections", data),
  updateCollection: (id: string, data: unknown) => put(`/enterprise/collections/${id}`, data),
  deleteCollection: (id: string) => del(`/enterprise/collections/${id}`),
  addCollectionItem: (colId: string, data: unknown) => post(`/enterprise/collections/${colId}/items`, data),

  getMedia: () => get("/enterprise/media"),
  saveMedia: (data: unknown) => post("/enterprise/media", data),

  getFavorites: () => get("/enterprise/favorites"),
  saveFavorites: (data: unknown) => post("/enterprise/favorites", data),
};
