const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = `${BASE}/api/webapp`;

async function get(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return res.json();
}

async function del(path: string) {
  const res = await fetch(`${API}${path}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  return res.json();
}

export const webappApi = {
  /* Profile */
  getProfile: () => get("/profile"),
  updateProfile: (data: unknown) => put("/profile", data),

  /* Artworks / Marketplace */
  getArtworks: (params?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.category) q.set("category", params.category);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return get(`/artworks${qs ? `?${qs}` : ""}`);
  },
  getFeaturedArtworks: () => get("/artworks/featured"),
  getTopArtists: () => get("/artworks/top-artists"),
  getArtwork: (id: string) => get(`/artworks/${id}`),
  createArtwork: (data: unknown) => post("/artworks", data),

  /* Posts / Social Feed */
  getPosts: () => get("/posts"),
  createPost: (data: unknown) => post("/posts", data),
  likePost: (id: string) => put(`/posts/${id}/like`, {}),

  /* Comments */
  getComments: (postId: string) => get(`/posts/${postId}/comments`),
  createComment: (postId: string, data: unknown) => post(`/posts/${postId}/comments`, data),

  /* Cart */
  getCart: () => get("/cart"),
  addToCart: (data: unknown) => post("/cart", data),
  updateCartItem: (id: string, data: unknown) => put(`/cart/${id}`, data),
  removeFromCart: (id: string) => del(`/cart/${id}`),

  /* Orders */
  getOrders: () => get("/orders"),
  createOrder: (data: unknown) => post("/orders", data),
  getOrderSummary: () => get("/order-summary"),

  /* Payment Methods */
  getPaymentMethods: () => get("/payment-methods"),
  addPaymentMethod: (data: unknown) => post("/payment-methods", data),

  /* Addresses */
  getAddresses: () => get("/addresses"),
  addAddress: (data: unknown) => post("/addresses", data),
  selectAddress: (id: string) => put(`/addresses/${id}/select`, {}),

  /* Subscription Plans */
  getSubscriptionPlans: () => get("/subscription-plans"),

  /* Collections */
  getCollections: () => get("/collections"),
  createCollection: (data: unknown) => post("/collections", data),
  getCollection: (id: string) => get(`/collections/${id}`),
  updateCollection: (id: string, data: unknown) => put(`/collections/${id}`, data),
  deleteCollection: (id: string) => del(`/collections/${id}`),

  /* Media */
  getMedia: (params?: { type?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.type) q.set("type", params.type);
    if (params?.page) q.set("page", String(params.page));
    if (params?.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return get(`/media${qs ? `?${qs}` : ""}`);
  },

  /* Search History */
  getSearchHistory: () => get("/search-history"),
  addSearchHistory: (data: unknown) => post("/search-history", data),

  /* Followers */
  getFollowers: () => get("/followers"),
  getFollowing: () => get("/following"),
  follow: (userId: string) => post("/follow", { userId }),
  unfollow: (userId: string) => del(`/unfollow/${userId}`),

  /* AI Photo Manager */
  getMediaFolders: () => get("/media-folders"),
  createMediaFolder: (data: unknown) => post("/media-folders", data),

  /* Storage */
  getStorage: () => get("/storage"),
};
