import { getDeviceId } from "./deviceStorage";

/**
 * Deckoviz WebApp API Client module
 */
import { API_BASE_URL } from "./constants";
const BASE = API_BASE_URL;
const API = `${BASE}/api/webapp`;
const HOME = `${BASE}/api/home`;
import { getUserMedia } from "./userStorage";
import { db, fetchFirebaseMedia, addFirebaseMedia, uploadFileToBackend } from "./firebaseClient";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

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

// Alias for authHeaders for backward compatibility
const hdrs = authHeaders;

async function handleResponse(res: Response, method: string, path: string) {
  if (res.status === 401) {
    window.dispatchEvent(new CustomEvent("deckoviz-auth-required"));
    throw new Error("Authentication required. Please log in.");
  }
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
  return res.json();
}

async function get(path: string, token?: string) {
  const res = await fetch(`${API}${path}`, { headers: authHeaders(token) });
  return handleResponse(res, "GET", path);
}

async function post(path: string, body?: unknown, token?: string) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res, "POST", path);
}

async function put(path: string, body?: unknown, token?: string) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res, "PUT", path);
}

async function del(path: string, token?: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers: authHeaders(token) });
  return handleResponse(res, "DELETE", path);
}

async function homeGet(path: string, token?: string) {
  const res = await fetch(`${HOME}${path}`, { headers: authHeaders(token) });
  return handleResponse(res, "GET", path);
}

async function homePost(path: string, body?: unknown, token?: string) {
  const res = await fetch(`${HOME}${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res, "POST", path);
}

async function homePut(path: string, body?: unknown, token?: string) {
  const res = await fetch(`${HOME}${path}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res, "PUT", path);
}

async function homeDel(path: string, token?: string) {
  const res = await fetch(`${HOME}${path}`, { method: "DELETE", headers: authHeaders(token) });
  return handleResponse(res, "DELETE", path);
}

export const webappApi = {
  /* Profile */
  getProfile: (token?: string) => get("/profile", token),
  updateProfile: (data?: unknown, token?: string) => put("/profile", data, token),

  /* Artworks / Marketplace */
  getArtworks: (params?: { search?: string; category?: string; page?: number; limit?: number }, token?: string) => {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.category) q.set("category", params.category);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return get(`/artworks${qs ? `?${qs}` : ""}`, token);
  },
  getFeaturedArtworks: (token?: string) => get("/artworks/featured", token),
  getTopArtists: (token?: string) => get("/artworks/top-artists", token),
  getArtwork: (id: string | number, token?: string) => get(`/artworks/${id}`, token),
  createArtwork: (data?: unknown, token?: string) => post("/artworks", data, token),

  /* Posts / Social Feed */
  getPosts: (token?: string) => get("/posts", token),
  createPost: (data?: unknown, token?: string) => post("/posts", data, token),
  likePost: (id: string | number, token?: string) => put(`/posts/${id}/like`, {}, token),

  /* Comments */
  getComments: (postId: string | number, token?: string) => get(`/posts/${postId}/comments`, token),
  createComment: (postId: string | number, data?: unknown, token?: string) => post(`/posts/${postId}/comments`, data, token),

  /* Cart */
  getCart: (token?: string) => get("/cart", token),
  addToCart: (data?: unknown, token?: string) => post("/cart", data, token),
  updateCartItem: (id: string | number, data?: unknown, token?: string) => put(`/cart/${id}`, data, token),
  removeFromCart: (id: string | number, token?: string) => del(`/cart/${id}`, token),

  /* Orders */
  getOrders: (token?: string) => get("/orders", token),
  createOrder: (data?: unknown, token?: string) => post("/orders", data, token),
  getOrderSummary: (token?: string) => get("/order-summary", token),

  /* Payment Methods */
  getPaymentMethods: (token?: string) => get("/payment-methods", token),
  addPaymentMethod: (data?: unknown, token?: string) => post("/payment-methods", data, token),

  /* Addresses */
  getAddresses: (token?: string) => get("/addresses", token),
  addAddress: (data?: unknown, token?: string) => post("/addresses", data, token),
  selectAddress: (id: string | number, token?: string) => put(`/addresses/${id}/select`, {}, token),

  /* Subscription Plans */
  getSubscriptionPlans: (token?: string) => get("/subscription-plans", token),

  /* Collections */
  getCollections: async (token?: string) => {
    try {
      const q = query(collection(db, "collections"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const cols = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (cols.length > 0) return cols;
      return await homeGet("/collections", token);
    } catch {
      return await get("/collections", token);
    }
  },
  createCollection: async (data: any, token?: string) => {
    try {
      const colRef = collection(db, "collections");
      const docRef = await addDoc(colRef, {
        ...data,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, success: true, ...data };
    } catch {
      return await post("/collections", data, token);
    }
  },
  getCollection: (id: string | number, token?: string) => homeGet(`/collections/${id}`, token),
  updateCollection: (id: string | number, data?: unknown, token?: string) => homePut(`/collections/${id}`, data, token),
  deleteCollection: (id: string | number, token?: string) => homeDel(`/collections/${id}`, token),

  /* Collection Items (via home routes) */
  addCollectionItem: (collectionId: string | number, data: { itemId: string | number; itemType?: string }, token?: string) =>
    homePost(`/collections/${collectionId}/items`, data, token),
  removeCollectionItem: (collectionId: string | number, itemId: string | number, token?: string) =>
    homeDel(`/collections/${collectionId}/items/${itemId}`, token),

  /* Daily Queue (via home routes) */
  getQueue: async (token?: string) => {
    try {
      return await homeGet("/dailyqueue", token);
    } catch {
      return await homeGet("/daily-queue", token);
    }
  },
  createQueueItem: (data: { collectionId?: string; collectionName?: string; startTime?: string; endTime?: string; dayOfWeek?: number; active?: boolean }, token?: string) =>
    homePost("/dailyqueue", data, token),
  updateQueueItem: (id: string | number, data?: unknown, token?: string) =>
    homePut(`/dailyqueue/${id}`, data, token),
  deleteQueueItem: (id: string | number, token?: string) =>
    homeDel(`/dailyqueue/${id}`, token),
  reorderQueue: (orderedIds: (string | number)[], token?: string) =>
    homePut("/dailyqueue/reorder", { orderedIds }, token),

  /* Media */
  getMedia: async (params?: { type?: string; page?: number; limit?: number }, token?: string) => {
    const q = new URLSearchParams();
    if (params?.type) q.set("type", params.type);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    const queryStr = qs ? `?${qs}` : "";
    try {
      const fbMedia = await fetchFirebaseMedia();
      if (fbMedia && fbMedia.length > 0) return fbMedia;
      return await homeGet(`/media${queryStr}`, token);
    } catch {
      return await get(`/media${queryStr}`, token);
    }
  },
  getMediaCounts: async (token?: string) => {
    try {
      return await homeGet("/media/counts", token);
    } catch {
      return await get("/media/counts", token);
    }
  },

  /* Upload Media — uploads file to backend server, stores link in Firebase */
  uploadMedia: async (file: File, token?: string): Promise<{ id: string; url: string; fileName: string; fileSize: number }> => {
    // Step 1: Upload file to backend server (Cloudinary/disk) for persistent hosting
    let publicUrl: string;
    try {
      publicUrl = await uploadFileToBackend(file);
    } catch (backendErr) {
      // Fallback: try backend endpoints with auth headers
      console.warn("uploadFileToBackend failed, trying with auth headers:", backendErr);
      const formData = new FormData();
      formData.append("file", file);
      const headers = authHeaders(token);
      delete headers["Content-Type"]; // Let browser set boundary
      let res = await fetch(`${HOME}/media`, {
        method: "POST",
        headers,
        body: formData,
      });
      if (!res.ok) {
        res = await fetch(`${BASE}/api/upload`, {
          method: "POST",
          headers,
          body: formData,
        });
      }
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const data = await res.json();
      const imgData = data.media || data.image || data;
      publicUrl = imgData.url || imgData.imageUrl || imgData.mediaUrl || "";
      if (!publicUrl) throw new Error("Backend returned no URL");
    }

    // Step 2: Store the URL link in Firebase RTDB + Firestore
    const metadata = {
      title: file.name,
      fileName: file.name,
      url: publicUrl,
      mediaUrl: publicUrl,
      fileSize: file.size,
      type: file.type,
    };
    const fbResult = await addFirebaseMedia(metadata);

    return {
      id: fbResult.id,
      url: publicUrl,
      fileName: file.name,
      fileSize: file.size,
    };
  },

  /* Delete Media (via home routes) */
  deleteMedia: (id: string | number, token?: string) => homeDel(`/media/${id}`, token),

  /* Search History */
  getSearchHistory: (token?: string) => get("/search-history", token),
  addSearchHistory: (data?: unknown, token?: string) => post("/search-history", data, token),

  /* Followers */
  getFollowers: (token?: string) => get("/followers", token),
  getFollowing: (token?: string) => get("/following", token),
  follow: (userId: string | number, token?: string) => post("/follow", { userId }, token),
  unfollow: (userId: string | number, token?: string) => del(`/unfollow/${userId}`, token),

  /* AI Photo Manager */
  getMediaFolders: (token?: string) => get("/media-folders", token),
  createMediaFolder: (data?: unknown, token?: string) => post("/media-folders", data, token),

  /* Storage */
  getStorage: (token?: string) => get("/storage", token),
};

/* ─────────────────────────────────────────────────────────────────────────────
 * Vizzy Canvas API — chat history, images, and media sync
 * These wrap the /api/vizzy-canvas endpoints for persistence.
 * ───────────────────────────────────────────────────────────────────────────── */
async function vizzyGet(path: string, token?: string) {
  const res = await fetch(`${BASE}/api/vizzy-canvas${path}`, { headers: authHeaders(token) });
  return handleResponse(res, "GET", path);
}

async function vizzyPost(path: string, body?: unknown, token?: string) {
  const res = await fetch(`${BASE}/api/vizzy-canvas${path}`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(body ?? {}),
  });
  return handleResponse(res, "POST", path);
}

async function vizzyDel(path: string, token?: string) {
  const res = await fetch(`${BASE}/api/vizzy-canvas${path}`, { method: "DELETE", headers: authHeaders(token) });
  return handleResponse(res, "DELETE", path);
}

export const vizzyApi = {
  /* Chat Sessions */
  getChats: (token?: string) => vizzyGet("/chats", token),
  getChat: (id: string, token?: string) => vizzyGet(`/chats/${id}`, token),
  deleteChat: (id: string, token?: string) => vizzyDel(`/chats/${id}`, token),

  /* Generated Images */
  getImages: (token?: string) => vizzyGet("/images", token),
  deleteImage: (id: string, token?: string) => vizzyDel(`/images/${id}`, token),

  /* Curations */
  getCurations: (token?: string) => vizzyGet("/curations", token),
};

/**
 * Saves a Vizzy-generated or uploaded image to the user's Home Webapp media library.
 * Converts an image URL to a Blob and uploads via FormData to /api/home/media.
 * This makes images appear in the Home Webapp Media view and Enterprise Library.
 */
export async function saveImageToMediaLibrary(
  imageUrl: string,
  metadata: { prompt?: string; source?: string; fileName?: string },
  token?: string,
): Promise<void> {
  try {
    // Save directly to Firebase Database via addFirebaseMedia
    const fileName = metadata.fileName || `vizzy-${Date.now()}.jpg`;
    await addFirebaseMedia({
      title: metadata.prompt || "Vizzy Artwork",
      url: imageUrl,
      category: "Generated",
      style: "Generative Art",
      tags: metadata.source || "vizzy_chat",
      ...metadata
    });
    console.log("[VizzySync] Image saved to Firebase Media Library:", fileName);
  } catch (err) {
    console.warn("[VizzySync] Failed to sync image to media library:", err);
  }
}

/**
 * Unified helper function to gather all Vizzy Generative Chat images.
 * Fetches from backend vizzyApi, webappApi, local chat message history, and persistent media.
 */
export async function getVizzyGenerativeImages(token?: string): Promise<{ id: string; url: string; prompt: string; createdAt: string }[]> {
  const imagesMap = new Map<string, { id: string; url: string; prompt: string; createdAt: string }>();

  // 1. Fetch from backend vizzyApi.getImages()
  try {
    const res = await vizzyApi.getImages(token);
    const list = Array.isArray(res) ? res : (res?.images || res?.items || res?.rows || res?.data || []);
    list.forEach((img: any) => {
      const u = img.url || img.imageUrl || img.mediaUrl;
      if (u) {
        imagesMap.set(u, {
          id: img.id || `vimg-${Date.now()}-${Math.random()}`,
          url: u,
          prompt: img.prompt || img.title || "Vizzy Generated Artwork",
          createdAt: img.createdAt || new Date().toISOString(),
        });
      }
    });
  } catch (e) {
    console.warn("[VizzyImages] vizzyApi.getImages fallback:", e);
  }

  // 2. Fetch from backend webappApi.getMedia()
  try {
    const res = await webappApi.getMedia({ limit: 100 }, token);
    const list = Array.isArray(res) ? res : (res?.items || res?.rows || res?.media || res?.data || []);
    list.forEach((m: any) => {
      const u = m.mediaUrl || m.url || m.imageUrl;
      if (u) {
        imagesMap.set(u, {
          id: m.id || String(Date.now()),
          url: u,
          prompt: m.fileName || m.name || m.prompt || "Generated Media",
          createdAt: m.createdAt || new Date().toISOString(),
        });
      }
    });
  } catch (e) {
    console.warn("[VizzyImages] webappApi.getMedia fallback:", e);
  }

  // 3. Extract from Local Storage Vizzy Chat Sessions (vizzy_chat_sessions & vizzy_chat_msgs_*)
  try {
    const cachedSessions = localStorage.getItem("vizzy_chat_sessions");
    if (cachedSessions) {
      const sessions = JSON.parse(cachedSessions);
      sessions.forEach((s: any) => {
        if (!s?.id) return;
        const rawMsgs = localStorage.getItem(`vizzy_chat_msgs_${s.id}`);
        if (!rawMsgs) return;
        const msgs = JSON.parse(rawMsgs);
        msgs.forEach((m: any) => {
          if (m.images && Array.isArray(m.images)) {
            m.images.forEach((img: any) => {
              const u = typeof img === "string" ? img : img.url;
              if (u) {
                const promptText = typeof img === "object" ? (img.prompt || m.content || "Vizzy Artwork") : (m.content || "Vizzy Artwork");
                imagesMap.set(u, {
                  id: `chat-img-${Date.now()}-${Math.random()}`,
                  url: u,
                  prompt: promptText,
                  createdAt: m.timestamp ? new Date(m.timestamp).toISOString() : new Date().toISOString(),
                });
              }
            });
          }
        });
      });
    }
  } catch (e) {
    console.warn("[VizzyImages] Local chat sessions parse fallback:", e);
  }

  // 4. Extract from persistent media storage
  try {
    const persistentItems = getUserMedia();
    persistentItems.forEach((m: any) => {
      const u = m.url || m.mediaUrl;
      if (u) {
        const promptText = m.fileName || m.name || "Media Item";
        imagesMap.set(u, {
          id: m.id || String(Date.now()),
          url: u,
          prompt: promptText,
          createdAt: m.createdAt || new Date().toISOString(),
        });
      }
    });
  } catch (e) {
    console.warn("[VizzyImages] Persistent media parse fallback:", e);
  }

  return Array.from(imagesMap.values());
}

// Export hdrs helper for compatibility
export { authHeaders, hdrs };

