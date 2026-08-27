import { getDeviceId } from "./deviceStorage";

import { API_BASE_URL } from "./constants";
const BASE = API_BASE_URL;
const API = `${BASE}/api/home`;

import { db, rtdb } from "./firebaseClient";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref as rtdbRef, push, set, child, get as rtdbGet, remove, update } from "firebase/database";

function getToken(): string | null {
  const direct =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("deckoviz_token") ||
    localStorage.getItem("jwt");
  if (direct && direct !== "undefined" && direct !== "null") {
    const cleaned = direct.replace(/^["']|["']$/g, "").trim();
    return cleaned.startsWith("Bearer ") ? cleaned.substring(7).trim() : cleaned;
  }
  return null;
}

function authHeaders(overrideToken?: string): Record<string, string> {
  const token = overrideToken || getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Device-ID": getDeviceId(),
  };
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
    let items: any[] = [];
    try {
      const q = query(collection(db, "dailyqueue"));
      const snapshot = await getDocs(q);
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch {}
    
    if (items.length === 0) {
      try {
        const snap = await rtdbGet(child(rtdbRef(rtdb), "dailyqueue"));
        if (snap.exists()) {
          const val = snap.val();
          items = Object.keys(val).map(k => ({ id: k, ...val[k] }));
        }
      } catch {}
    }

    if (items.length === 0) {
      try {
        const lsStr = localStorage.getItem("deckoviz_dailyqueue");
        if (lsStr) items = JSON.parse(lsStr);
      } catch {}
    }

    if (items.length === 0) {
      try { items = await get("/dailyqueue"); } catch {
        try { items = await get("/daily-queue"); } catch {}
      }
    }
    return items;
  },
  addDailyQueueSlot: async (data: any) => {
    const payload = { ...data, createdAt: new Date().toISOString() };
    const result = { id: payload.id || `slot_${Date.now()}`, success: true, ...payload };
    
    try {
      const lsStr = localStorage.getItem("deckoviz_dailyqueue");
      const arr = lsStr ? JSON.parse(lsStr) : [];
      arr.push(result);
      localStorage.setItem("deckoviz_dailyqueue", JSON.stringify(arr));
    } catch {}

    try {
      const dbRef = rtdbRef(rtdb, "dailyqueue");
      const newRef = push(dbRef);
      result.id = newRef.key || result.id;
      await set(newRef, result);
    } catch {}

    try { await addDoc(collection(db, "dailyqueue"), result); } catch {}
    return result;
  },
  updateDailyQueueSlot: async (id: string, data: any) => {
    try {
      const lsStr = localStorage.getItem("deckoviz_dailyqueue");
      if (lsStr) {
        const arr = JSON.parse(lsStr);
        const idx = arr.findIndex((x: any) => x.id === id);
        if (idx !== -1) { arr[idx] = { ...arr[idx], ...data }; localStorage.setItem("deckoviz_dailyqueue", JSON.stringify(arr)); }
      }
    } catch {}

    try { await update(rtdbRef(rtdb, `dailyqueue/${id}`), data); } catch {}
    try { await updateDoc(doc(db, "dailyqueue", id), data); } catch {}
    return { id, success: true, ...data };
  },
  deleteDailyQueueSlot: async (id: string) => {
    try {
      const lsStr = localStorage.getItem("deckoviz_dailyqueue");
      if (lsStr) {
        const arr = JSON.parse(lsStr);
        localStorage.setItem("deckoviz_dailyqueue", JSON.stringify(arr.filter((x: any) => x.id !== id)));
      }
    } catch {}

    try { await remove(rtdbRef(rtdb, `dailyqueue/${id}`)); } catch {}
    try { await deleteDoc(doc(db, "dailyqueue", id)); } catch {}
    return { id, success: true };
  },

  getEvents: async () => {
    let items: any[] = [];
    try {
      const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch {}

    if (items.length === 0) {
      try {
        const snap = await rtdbGet(child(rtdbRef(rtdb), "events"));
        if (snap.exists()) {
          const val = snap.val();
          items = Object.keys(val).map(k => ({ id: k, ...val[k] }));
        }
      } catch {}
    }

    if (items.length === 0) {
      try {
        const lsStr = localStorage.getItem("deckoviz_events");
        if (lsStr) items = JSON.parse(lsStr);
      } catch {}
    }

    if (items.length === 0) {
      try { items = await get("/events"); } catch {}
    }
    return items;
  },
  createEvent: async (data: any) => {
    const payload = { ...data, createdAt: new Date().toISOString() };
    const result = { id: payload.id || `event_${Date.now()}`, success: true, ...payload };
    
    try {
      const lsStr = localStorage.getItem("deckoviz_events");
      const arr = lsStr ? JSON.parse(lsStr) : [];
      arr.push(result);
      localStorage.setItem("deckoviz_events", JSON.stringify(arr));
    } catch {}

    try {
      const dbRef = rtdbRef(rtdb, "events");
      const newRef = push(dbRef);
      result.id = newRef.key || result.id;
      await set(newRef, result);
    } catch {}

    try { await addDoc(collection(db, "events"), result); } catch {}
    return result;
  },
  updateEvent: async (id: string, data: any) => {
    try {
      const lsStr = localStorage.getItem("deckoviz_events");
      if (lsStr) {
        const arr = JSON.parse(lsStr);
        const idx = arr.findIndex((x: any) => x.id === id);
        if (idx !== -1) { arr[idx] = { ...arr[idx], ...data }; localStorage.setItem("deckoviz_events", JSON.stringify(arr)); }
      }
    } catch {}

    try { await update(rtdbRef(rtdb, `events/${id}`), data); } catch {}
    try { await updateDoc(doc(db, "events", id), data); } catch {}
    return { id, success: true, ...data };
  },
  deleteEvent: async (id: string) => {
    try {
      const lsStr = localStorage.getItem("deckoviz_events");
      if (lsStr) {
        const arr = JSON.parse(lsStr);
        localStorage.setItem("deckoviz_events", JSON.stringify(arr.filter((x: any) => x.id !== id)));
      }
    } catch {}

    try { await remove(rtdbRef(rtdb, `events/${id}`)); } catch {}
    try { await deleteDoc(doc(db, "events", id)); } catch {}
    return { id, success: true };
  },

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
