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

export function getUserCollections(): any[] {
  return [];
}

export function saveUserCollections(cols: any[]) {
  window.dispatchEvent(new CustomEvent("deckoviz-collections-updated"));
}

export function getUserMedia(): any[] {
  return [];
}

export function saveUserMedia(media: any[]) {}

export function getUserProfile(): any {
  return null;
}

export function saveUserProfile(profile: any) {
  window.dispatchEvent(new CustomEvent("deckoviz-profile-updated", { detail: profile }));
}

export function getUserAvatar(): string | null {
  return null;
}

export function saveUserAvatar(avatarUrl: string) {
  window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
}

export function getUserBanner(): string | null {
  return null;
}

export function saveUserBanner(bannerUrl: string) {}

export function getUserDailyQueue(): any[] {
  return [];
}

export function saveUserDailyQueue(queue: any[]) {
  window.dispatchEvent(new CustomEvent("deckoviz-queue-updated"));
}

export function getUserFavouriteArtworks(): any[] {
  return [];
}

export function saveUserFavouriteArtworks(artworks: any[]) {
  window.dispatchEvent(new CustomEvent("deckoviz-favourites-updated"));
}

export function getUserFavouriteCollections(): any[] {
  return [];
}

export function saveUserFavouriteCollections(cols: any[]) {
  window.dispatchEvent(new CustomEvent("deckoviz-favourites-updated"));
}
