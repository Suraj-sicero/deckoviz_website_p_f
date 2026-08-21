export function getActiveUserKey(): string {
  try {
    const userRaw = localStorage.getItem("user");
    if (userRaw) {
      const u = JSON.parse(userRaw);
      if (u?.id) return `user_${u.id}`;
      if (u?.email) return `user_${u.email.replace(/[^a-zA-Z0-9]/g, "_")}`;
    }
  } catch { /* ignore */ }
  const token = localStorage.getItem("token") || localStorage.getItem("deckoviz_token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload?.sub || payload?.id || payload?.email) {
        return `user_${payload.sub || payload.id || payload.email}`;
      }
    } catch { /* ignore */ }
  }
  return "guest_user";
}

export function getUserStorageKey(baseKey: string): string {
  const key = getActiveUserKey();
  return `${baseKey}_${key}`;
}

const DEFAULT_COLLECTIONS = [
  {
    id: "col-1",
    name: "Morning Serenity",
    title: "Morning Serenity",
    itemCount: 4,
    sharedWith: 3,
    coverUrl: "https://picsum.photos/seed/morning-serenity/600/400",
    images: [
      "https://picsum.photos/seed/morning-serenity/600/400",
      "https://picsum.photos/seed/zen-light/600/400",
      "https://picsum.photos/seed/dawn-mist/600/400",
      "https://picsum.photos/seed/forest-sun/600/400"
    ],
    items: [
      { id: "item-1", title: "Sunrise Horizon", url: "https://picsum.photos/seed/morning-serenity/600/400" },
      { id: "item-2", title: "Zen Garden Light", url: "https://picsum.photos/seed/zen-light/600/400" },
      { id: "item-3", title: "Dawn Mist", url: "https://picsum.photos/seed/dawn-mist/600/400" },
      { id: "item-4", title: "Forest Rays", url: "https://picsum.photos/seed/forest-sun/600/400" }
    ]
  },
  {
    id: "col-2",
    name: "Urban Architecture",
    title: "Urban Architecture",
    itemCount: 4,
    sharedWith: 2,
    coverUrl: "https://picsum.photos/seed/urban-arch/600/400",
    images: [
      "https://picsum.photos/seed/urban-arch/600/400",
      "https://picsum.photos/seed/city-lights/600/400",
      "https://picsum.photos/seed/glass-tower/600/400",
      "https://picsum.photos/seed/metro-lines/600/400"
    ],
    items: [
      { id: "item-5", title: "Glass & Steel", url: "https://picsum.photos/seed/urban-arch/600/400" },
      { id: "item-6", title: "City Lights", url: "https://picsum.photos/seed/city-lights/600/400" },
      { id: "item-7", title: "Glass Tower", url: "https://picsum.photos/seed/glass-tower/600/400" },
      { id: "item-8", title: "Metro Lines", url: "https://picsum.photos/seed/metro-lines/600/400" }
    ]
  },
  {
    id: "col-3",
    name: "Abstract Expressions",
    title: "Abstract Expressions",
    itemCount: 4,
    sharedWith: 5,
    coverUrl: "https://picsum.photos/seed/abstract-art/600/400",
    images: [
      "https://picsum.photos/seed/abstract-art/600/400",
      "https://picsum.photos/seed/vivid-fluid/600/400",
      "https://picsum.photos/seed/color-surge/600/400",
      "https://picsum.photos/seed/neon-flow/600/400"
    ],
    items: [
      { id: "item-9", title: "Vivid Fluidity", url: "https://picsum.photos/seed/abstract-art/600/400" },
      { id: "item-10", title: "Color Surge", url: "https://picsum.photos/seed/vivid-fluid/600/400" },
      { id: "item-11", title: "Prismatic Wave", url: "https://picsum.photos/seed/color-surge/600/400" },
      { id: "item-12", title: "Neon Flow", url: "https://picsum.photos/seed/neon-flow/600/400" }
    ]
  }
];

export function getUserCollections(): any[] {
  try {
    const userKey = getUserStorageKey("deckoviz_collections");
    const raw = localStorage.getItem(userKey) || localStorage.getItem("deckoviz_collections") || localStorage.getItem("deckoviz_backup_collections");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error loading user collections:", e);
  }
  return [];
}

export function saveUserCollections(cols: any[]) {
  try {
    const userKey = getUserStorageKey("deckoviz_collections");
    const jsonStr = JSON.stringify(cols);
    localStorage.setItem(userKey, jsonStr);
    localStorage.setItem("deckoviz_collections", jsonStr);
    localStorage.setItem("deckoviz_backup_collections", jsonStr);
  } catch (e) {
    console.warn("Error saving user collections:", e);
  }
  window.dispatchEvent(new CustomEvent("deckoviz-collections-updated", { detail: cols }));
}

export function getUserMedia(): any[] {
  try {
    const userKey = getUserStorageKey("deckoviz_media");
    const raw = localStorage.getItem(userKey) || localStorage.getItem("deckoviz_media");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error loading user media:", e);
  }
  return [];
}

export function saveUserMedia(media: any[]) {
  try {
    const userKey = getUserStorageKey("deckoviz_media");
    const jsonStr = JSON.stringify(media);
    localStorage.setItem(userKey, jsonStr);
    localStorage.setItem("deckoviz_media", jsonStr);
  } catch (e) {
    console.warn("Error saving user media:", e);
  }
  window.dispatchEvent(new CustomEvent("deckoviz-media-updated", { detail: media }));
}

export function getUserProfile(): any {
  try {
    const raw = localStorage.getItem("user");
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveUserProfile(profile: any) {
  try {
    localStorage.setItem("user", JSON.stringify(profile));
  } catch {}
  window.dispatchEvent(new CustomEvent("deckoviz-profile-updated", { detail: profile }));
}

export function getUserAvatar(): string | null {
  return localStorage.getItem("deckoviz_user_avatar");
}

export function saveUserAvatar(avatarUrl: string) {
  localStorage.setItem("deckoviz_user_avatar", avatarUrl);
  window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
}

export function getUserBanner(): string | null {
  return localStorage.getItem("deckoviz_user_banner");
}

export function saveUserBanner(bannerUrl: string) {
  localStorage.setItem("deckoviz_user_banner", bannerUrl);
}

export function getUserDailyQueue(): any[] {
  try {
    const userKey = getUserStorageKey("deckoviz_queue");
    const raw = localStorage.getItem(userKey) || localStorage.getItem("deckoviz_queue");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveUserDailyQueue(queue: any[]) {
  try {
    const userKey = getUserStorageKey("deckoviz_queue");
    const jsonStr = JSON.stringify(queue);
    localStorage.setItem(userKey, jsonStr);
    localStorage.setItem("deckoviz_queue", jsonStr);
  } catch {}
  window.dispatchEvent(new CustomEvent("deckoviz-queue-updated", { detail: queue }));
}

export function getUserFavouriteArtworks(): any[] {
  try {
    const userKey = getUserStorageKey("deckoviz_fav_artworks");
    const raw = localStorage.getItem(userKey) || localStorage.getItem("deckoviz_fav_artworks");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveUserFavouriteArtworks(artworks: any[]) {
  try {
    const userKey = getUserStorageKey("deckoviz_fav_artworks");
    const jsonStr = JSON.stringify(artworks);
    localStorage.setItem(userKey, jsonStr);
    localStorage.setItem("deckoviz_fav_artworks", jsonStr);
  } catch {}
  window.dispatchEvent(new CustomEvent("deckoviz-favourites-updated", { detail: artworks }));
}

export function getUserFavouriteCollections(): any[] {
  try {
    const userKey = getUserStorageKey("deckoviz_fav_collections");
    const raw = localStorage.getItem(userKey) || localStorage.getItem("deckoviz_fav_collections");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveUserFavouriteCollections(cols: any[]) {
  try {
    const userKey = getUserStorageKey("deckoviz_fav_collections");
    const jsonStr = JSON.stringify(cols);
    localStorage.setItem(userKey, jsonStr);
    localStorage.setItem("deckoviz_fav_collections", jsonStr);
  } catch {}
  window.dispatchEvent(new CustomEvent("deckoviz-favourites-updated", { detail: cols }));
}
