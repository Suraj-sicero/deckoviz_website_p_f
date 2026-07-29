/**
 * Deckoviz WebApp API Client module
 */
const BASE = import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com";
const API = `${BASE}/api/webapp`;
const HOME = `${BASE}/api/home`;

function getToken(): string | null {
  return localStorage.getItem("token");
}

function authHeaders(overrideToken?: string): Record<string, string> {
  const token = overrideToken || getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
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
  getCollections: (token?: string) => get("/collections", token),
  createCollection: (data?: unknown, token?: string) => post("/collections", data, token),
  getCollection: (id: string | number, token?: string) => get(`/collections/${id}`, token),
  updateCollection: (id: string | number, data?: unknown, token?: string) => put(`/collections/${id}`, data, token),
  deleteCollection: (id: string | number, token?: string) => del(`/collections/${id}`, token),

  /* Collection Items (via home routes) */
  addCollectionItem: (collectionId: string | number, data: { itemId: string | number; itemType: string }, token?: string) =>
    homePost(`/collections/${collectionId}/items`, data, token),
  removeCollectionItem: (collectionId: string | number, itemId: string | number, token?: string) =>
    homeDel(`/collections/${collectionId}/items/${itemId}`, token),

  /* Daily Queue (via home routes) */
  getQueue: (token?: string) => homeGet("/daily-queue", token),
  createQueueItem: (data: { collectionId?: string; collectionName?: string; startTime?: string; endTime?: string; dayOfWeek?: number; active?: boolean }, token?: string) =>
    homePost("/daily-queue", data, token),
  updateQueueItem: (id: string | number, data?: unknown, token?: string) =>
    homePut(`/daily-queue/${id}`, data, token),
  deleteQueueItem: (id: string | number, token?: string) =>
    homeDel(`/daily-queue/${id}`, token),
  reorderQueue: (orderedIds: (string | number)[], token?: string) =>
    homePut("/daily-queue/reorder", { orderedIds }, token),

  /* Media */
  getMedia: (params?: { type?: string; page?: number; limit?: number }, token?: string) => {
    const q = new URLSearchParams();
    if (params?.type) q.set("type", params.type);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return get(`/media${qs ? `?${qs}` : ""}`, token);
  },

  /* Upload Media (multipart to /api/upload) */
  uploadMedia: async (file: File, token?: string): Promise<{ id: string; url: string; fileName: string; fileSize: number }> => {
    const formData = new FormData();
    formData.append("file", file);
    const headers = authHeaders(token);
    delete headers["Content-Type"]; // Let browser set boundary
    const res = await fetch(`${BASE}/api/upload`, {
      method: "POST",
      headers,
      body: formData,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const data = await res.json();
    return { id: data.image.id, url: data.image.url, fileName: data.image.fileName, fileSize: data.image.fileSize };
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
    const tkn = token || getToken();
    if (!tkn) return; // No auth, skip

    // Fetch image as blob
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) return;
    const blob = await imgRes.blob();

    // Determine file name
    const ext = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
    const fileName = metadata.fileName || `vizzy-${Date.now()}.${ext}`;

    // Build FormData
    const formData = new FormData();
    formData.append("file", blob, fileName);
    if (metadata.prompt) formData.append("prompt", metadata.prompt);
    if (metadata.source) formData.append("source", metadata.source);

    // Upload to home media
    const headers: Record<string, string> = {};
    headers["Authorization"] = `Bearer ${tkn}`;
    // Do NOT set Content-Type — let browser set boundary

    await fetch(`${HOME}/media`, {
      method: "POST",
      headers,
      body: formData,
    });

    console.log("[VizzySync] Image saved to media library:", fileName);
  } catch (err) {
    console.warn("[VizzySync] Failed to sync image to media library:", err);
  }
}

// Export hdrs helper for compatibility
export { authHeaders, hdrs };

