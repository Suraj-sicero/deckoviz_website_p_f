const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${BASE}/api/enterprise`;

async function get(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

async function del(path: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}

export const enterpriseApi = {
  getProfile: () => get("/profile"),
  updateProfile: (data: unknown) => put("/profile", data),

  getDashboard: () => get("/dashboard"),

  getUnits: () => get("/units"),
  createUnit: (data: unknown) => post("/units", data),
  updateUnit: (id: string, data: unknown) => put(`/units/${id}`, data),
  deleteUnit: (id: string) => del(`/units/${id}`),

  getEvents: () => get("/events"),
  createEvent: (data: unknown) => post("/events", data),
  updateEvent: (id: string, data: unknown) => put(`/events/${id}`, data),
  deleteEvent: (id: string) => del(`/events/${id}`),

  getDailyQueue: () => get("/daily-queue"),
  createDailyQueue: (data: unknown) => post("/daily-queue", data),
  updateDailyQueue: (id: string, data: unknown) => put(`/daily-queue/${id}`, data),
  deleteDailyQueue: (id: string) => del(`/daily-queue/${id}`),

  getGuests: () => get("/guests"),
  createGuest: (data: unknown) => post("/guests", data),
  updateGuest: (id: string, data: unknown) => put(`/guests/${id}`, data),
  deleteGuest: (id: string) => del(`/guests/${id}`),

  getTemplates: () => get("/templates"),
  createTemplate: (data: unknown) => post("/templates", data),
  updateTemplate: (id: string, data: unknown) => put(`/templates/${id}`, data),
  deleteTemplate: (id: string) => del(`/templates/${id}`),

  getMusic: () => get("/music"),
  getNarrations: () => get("/narrations"),
  getLibrary: () => get("/library"),
  getCurations: () => get("/curations"),
};
