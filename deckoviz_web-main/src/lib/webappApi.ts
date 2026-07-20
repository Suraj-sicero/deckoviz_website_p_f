const BASE = import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com";
const API = `${BASE}/api/webapp`;
const HOME = `${BASE}/api/home`;

function hdrs(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function get(path: string, token?: string) {
  const res = await fetch(`${API}${path}`, { headers: token ? hdrs(token) : {} });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post(path: string, body: unknown, token?: string) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: hdrs(token || ""),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function put(path: string, body: unknown, token?: string) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: hdrs(token || ""),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

async function del(path: string, token?: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE", headers: token ? hdrs(token) : {} });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}

async function homeGet(path: string, token: string) {
  const res = await fetch(`${HOME}${path}`, { headers: hdrs(token) });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function homePost(path: string, body: unknown, token: string) {
  const res = await fetch(`${HOME}${path}`, {
    method: "POST",
    headers: hdrs(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function homePut(path: string, body: unknown, token: string) {
  const res = await fetch(`${HOME}${path}`, {
    method: "PUT",
    headers: hdrs(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

async function homeDel(path: string, token: string) {
  const res = await fetch(`${HOME}${path}`, { method: "DELETE", headers: hdrs(token) });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}

export const webappApi = {
  /* Profile */
  getProfile: (token?: string) => get("/profile", token),
  updateProfile: (data: unknown, token?: string) => put("/profile", data, token),

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
  getArtwork: (id: string, token?: string) => get(`/artworks/${id}`, token),
  createArtwork: (data: unknown, token?: string) => post("/artworks", data, token),

  /* Posts / Social Feed */
  getPosts: (token?: string) => get("/posts", token),
  createPost: (data: unknown, token?: string) => post("/posts", data, token),
  likePost: (id: string, token?: string) => put(`/posts/${id}/like`, {}, token),

  /* Comments */
  getComments: (postId: string, token?: string) => get(`/posts/${postId}/comments`, token),
  createComment: (postId: string, data: unknown, token?: string) => post(`/posts/${postId}/comments`, data, token),

  /* Cart */
  getCart: (token?: string) => get("/cart", token),
  addToCart: (data: unknown, token?: string) => post("/cart", data, token),
  updateCartItem: (id: string, data: unknown, token?: string) => put(`/cart/${id}`, data, token),
  removeFromCart: (id: string, token?: string) => del(`/cart/${id}`, token),

  /* Orders */
  getOrders: (token?: string) => get("/orders", token),
  createOrder: (data: unknown, token?: string) => post("/orders", data, token),
  getOrderSummary: (token?: string) => get("/order-summary", token),

  /* Payment Methods */
  getPaymentMethods: (token?: string) => get("/payment-methods", token),
  addPaymentMethod: (data: unknown, token?: string) => post("/payment-methods", data, token),

  /* Addresses */
  getAddresses: (token?: string) => get("/addresses", token),
  addAddress: (data: unknown, token?: string) => post("/addresses", data, token),
  selectAddress: (id: string, token?: string) => put(`/addresses/${id}/select`, {}, token),

  /* Subscription Plans */
  getSubscriptionPlans: (token?: string) => get("/subscription-plans", token),

  /* Collections */
  getCollections: (token?: string) => get("/collections", token),
  createCollection: (data: unknown, token?: string) => post("/collections", data, token),
  getCollection: (id: string, token?: string) => get(`/collections/${id}`, token),
  updateCollection: (id: string, data: unknown, token?: string) => put(`/collections/${id}`, data, token),
  deleteCollection: (id: string, token?: string) => del(`/collections/${id}`, token),

  /* Collection Items (via home routes) */
  addCollectionItem: (collectionId: string, data: { itemId: string; itemType: string }, token: string) =>
    homePost(`/collections/${collectionId}/items`, data, token),
  removeCollectionItem: (collectionId: string, itemId: string, token: string) =>
    homeDel(`/collections/${collectionId}/items/${itemId}`, token),

  /* Daily Queue (via home routes) */
  getQueue: (token: string) => homeGet("/daily-queue", token),
  createQueueItem: (data: { collectionId?: string; collectionName: string; startTime: string; endTime: string; dayOfWeek?: number; active?: boolean }, token: string) =>
    homePost("/daily-queue", data, token),
  updateQueueItem: (id: string, data: unknown, token: string) =>
    homePut(`/daily-queue/${id}`, data, token),
  deleteQueueItem: (id: string, token: string) =>
    homeDel(`/daily-queue/${id}`, token),
  reorderQueue: (orderedIds: string[], token: string) =>
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
  uploadMedia: async (file: File, token: string): Promise<{ id: string; url: string; fileName: string; fileSize: number }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${BASE}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const data = await res.json();
    return { id: data.image.id, url: data.image.url, fileName: data.image.fileName, fileSize: data.image.fileSize };
  },

  /* Delete Media (via home routes) */
  deleteMedia: (id: string, token: string) => homeDel(`/media/${id}`, token),

  /* Search History */
  getSearchHistory: (token?: string) => get("/search-history", token),
  addSearchHistory: (data: unknown, token?: string) => post("/search-history", data, token),

  /* Followers */
  getFollowers: (token?: string) => get("/followers", token),
  getFollowing: (token?: string) => get("/following", token),
  follow: (userId: string, token?: string) => post("/follow", { userId }, token),
  unfollow: (userId: string, token?: string) => del(`/unfollow/${userId}`, token),

  /* AI Photo Manager */
  getMediaFolders: (token?: string) => get("/media-folders", token),
  createMediaFolder: (data: unknown, token?: string) => post("/media-folders", data, token),

  /* Storage */
  getStorage: (token?: string) => get("/storage", token),
};
