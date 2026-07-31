const BASE = import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com";
const API = `${BASE}/api/home`;

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

function authHeaders(overrideToken?: string): Record<string, string> {
  const token = overrideToken || getToken();
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
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, "POST", path);
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse(res, "PUT", path);
}

async function del(path: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers: authHeaders() });
  return handleResponse(res, "DELETE", path);
}

export const homeApi = {
  getDailyQueue: async () => {
    try {
      return await get("/dailyqueue");
    } catch {
      return await get("/daily-queue");
    }
  },
  addDailyQueueSlot: async (data: unknown) => {
    try {
      return await post("/dailyqueue", data);
    } catch {
      return await post("/daily-queue", data);
    }
  },
  updateDailyQueueSlot: async (id: string, data: unknown) => {
    try {
      return await put(`/dailyqueue/${id}`, data);
    } catch {
      return await put(`/daily-queue/${id}`, data);
    }
  },
  deleteDailyQueueSlot: async (id: string) => {
    try {
      return await del(`/dailyqueue/${id}`);
    } catch {
      return await del(`/daily-queue/${id}`);
    }
  },

  getEvents: () => get("/events"),
  createEvent: (data: unknown) => post("/events", data),
  updateEvent: (id: string, data: unknown) => put(`/events/${id}`, data),
  deleteEvent: (id: string) => del(`/events/${id}`),

  getMembers: () => get("/members"),
  createMember: (data: unknown) => post("/members", data),
  updateMember: (id: string, data: unknown) => put(`/members/${id}`, data),
  deleteMember: (id: string) => del(`/members/${id}`),

  getSettings: () => get("/settings"),
  updateSettings: (data: { section: string; settings: Record<string, unknown> }) => put("/settings", data),

  getCurations: (type?: string) => get(`/curations${type ? `?type=${type}` : ""}`),
  getLibrary: () => get("/library"),
  getMusic: () => get("/music"),

  /* Collections API */
  getCollections: () => get("/collections"),
  createCollection: (data: unknown) => post("/collections", data),
  updateCollection: (id: string, data: unknown) => put(`/collections/${id}`, data),
  deleteCollection: (id: string) => del(`/collections/${id}`),

  /* Media API */
  getMedia: () => get("/media"),
  getMediaCounts: () => get("/media/counts"),
  uploadMedia: async (formData: FormData) => {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    // Do not set Content-Type, let the browser set it for FormData
    const res = await fetch(`${API}/media`, {
      method: "POST",
      headers,
      body: formData,
    });
    return handleResponse(res, "POST", "/media");
  },
  deleteMedia: (id: number | string) => del(`/media/${id}`),
};
