import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInAnonymously,
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy 
} from "firebase/firestore";
import { 
  getDatabase, 
  ref as rtdbRef, 
  get, 
  child, 
  push, 
  set,
  remove as rtdbRemove
} from "firebase/database";
import { API_BASE_URL } from "./constants";

const firebaseConfig = {
  apiKey: "AIzaSyA4A_Irxqi3_L57u5_Rzav4QEne6ElX1LE",
  authDomain: "deckoviz-3ad39.firebaseapp.com",
  databaseURL: "https://deckoviz-3ad39-default-rtdb.firebaseio.com",
  projectId: "deckoviz-3ad39",
  storageBucket: "deckoviz-3ad39.firebasestorage.app",
  messagingSenderId: "207225326591",
  appId: "1:207225326591:web:a49846cc75e277671675ca",
  measurementId: "G-LZ7BQQ8L0C"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

/** Ensure Firebase Auth is active (anonymous sign-in if needed) */
export async function ensureFirebaseAuth(): Promise<void> {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.warn("Anonymous auth sign-in notice:", e);
    }
  }
}

// ── Realtime Database & Firestore Direct Fetching Helpers ──

/** Fetch all registered users from Firebase Realtime DB & Firestore */
export async function fetchFirebaseUsers() {
  const usersList: any[] = [];

  try {
    const [rtdbSnapResult, firestoreSnapResult] = await Promise.allSettled([
      get(child(rtdbRef(rtdb), "users")),
      getDocs(collection(db, "users"))
    ]);

    if (rtdbSnapResult.status === "fulfilled" && rtdbSnapResult.value.exists()) {
      const val = rtdbSnapResult.value.val();
      Object.keys(val).forEach((k) => {
        usersList.push({ id: k, ...val[k], source: "Firebase Realtime DB" });
      });
    }

    if (firestoreSnapResult.status === "fulfilled") {
      firestoreSnapResult.value.docs.forEach((docSnap) => {
        if (!usersList.some((u) => u.id === docSnap.id)) {
          usersList.push({ id: docSnap.id, ...docSnap.data(), source: "Firebase Firestore" });
        }
      });
    }
  } catch (err) {
    console.warn("User query notice:", err);
  }

  return usersList;
}

/** HIGH-SPEED PARALLEL FETCH for ALL media & artwork images across Firebase RTDB & Firestore */
export async function fetchFirebaseMedia() {
  const mediaList: any[] = [];
  const rtdbRefInstance = rtdbRef(rtdb);

  const addMediaUnique = (item: any) => {
    const url = item.url || item.mediaUrl || item.imageUrl || item.coverUrl;
    if (!url) return;
    const title = item.title || item.name || "Untitled Artwork";
    const id = item.id || `img_${Math.random().toString(36).substr(2, 9)}`;

    if (!mediaList.some((m) => m.url === url || m.id === id)) {
      mediaList.push({
        id,
        title,
        url,
        category: item.category || item.collectionName || "Collection Artwork",
        style: item.style || "Fine Art",
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags.join(", ") : item.tags) : "collection, firebase",
        uploadedAt: item.createdAt || item.uploadedAt || new Date().toISOString().split("T")[0],
        source: item.source || "Master Art Vault"
      });
    }
  };

  // 1. Read persistent localStorage backup first so uploaded media NEVER disappears on refresh!
  try {
    const localMediaStr = localStorage.getItem("deckoviz_global_uploaded_media");
    if (localMediaStr) {
      const localMediaArr = JSON.parse(localMediaStr);
      if (Array.isArray(localMediaArr)) {
        localMediaArr.forEach((item) => addMediaUnique(item));
      }
    }
  } catch (e) {}

  // 2. Run all 7 Firestore & RTDB queries simultaneously in PARALLEL via Promise.allSettled
  try {
    const results = await Promise.allSettled([
      get(child(rtdbRefInstance, "media")),
      get(child(rtdbRefInstance, "artworks")),
      get(child(rtdbRefInstance, "collections")),
      getDocs(collection(db, "media")),
      getDocs(collection(db, "artworks")),
      getDocs(collection(db, "collections")),
      getDocs(collection(db, "curations"))
    ]);

    // RTDB Media
    if (results[0].status === "fulfilled" && results[0].value.exists()) {
      const val = results[0].value.val();
      Object.keys(val).forEach((k) => addMediaUnique({ id: k, ...val[k], source: "Master Art Vault" }));
    }

    // RTDB Artworks
    if (results[1].status === "fulfilled" && results[1].value.exists()) {
      const val = results[1].value.val();
      Object.keys(val).forEach((k) => addMediaUnique({ id: k, ...val[k], source: "Master Art Vault" }));
    }

    // RTDB Collections
    if (results[2].status === "fulfilled" && results[2].value.exists()) {
      const val = results[2].value.val();
      Object.keys(val).forEach((ck) => {
        const colData = val[ck];
        const colName = colData.name || colData.title || "User Collection";
        const items = colData.items || colData.images || colData.artworks || [];
        if (Array.isArray(items)) {
          items.forEach((it: any) => addMediaUnique({ ...it, collectionName: colName, source: "Master Art Vault" }));
        }
      });
    }

    // Firestore Media
    if (results[3].status === "fulfilled") {
      results[3].value.docs.forEach((docSnap) => addMediaUnique({ id: docSnap.id, ...docSnap.data(), source: "Master Art Vault" }));
    }

    // Firestore Artworks
    if (results[4].status === "fulfilled") {
      results[4].value.docs.forEach((docSnap) => addMediaUnique({ id: docSnap.id, ...docSnap.data(), source: "Master Art Vault" }));
    }

    // Firestore Collections
    if (results[5].status === "fulfilled") {
      results[5].value.docs.forEach((docSnap) => {
        const cData = docSnap.data();
        const colName = cData.name || cData.title || "Firestore Collection";
        const items = cData.items || cData.images || cData.artworks || [];

        if (cData.coverUrl) {
          addMediaUnique({ id: `col_cover_${docSnap.id}`, title: `${colName} Cover`, url: cData.coverUrl, collectionName: colName, source: "Master Art Vault" });
        }

        if (Array.isArray(items)) {
          items.forEach((it: any, idx: number) => {
            if (typeof it === "string") {
              addMediaUnique({ id: `col_img_${docSnap.id}_${idx}`, title: `${colName} #${idx + 1}`, url: it, collectionName: colName, source: "Master Art Vault" });
            } else if (it && typeof it === "object") {
              addMediaUnique({ ...it, collectionName: colName, source: "Master Art Vault" });
            }
          });
        }
      });
    }

    // Firestore Curations
    if (results[6].status === "fulfilled") {
      results[6].value.docs.forEach((docSnap) => addMediaUnique({ id: docSnap.id, ...docSnap.data(), source: "Master Art Vault" }));
    }
  } catch (err) {
    console.warn("Parallel media query notice:", err);
  }

  // Quick localStorage scan for client fallback
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("collection") || key.includes("artwork"))) {
        const val = localStorage.getItem(key);
        if (val) {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
              parsed.forEach((it) => {
                if (it && typeof it === "object") {
                  if (it.images && Array.isArray(it.images)) {
                    it.images.forEach((imgUrl: string, idx: number) => addMediaUnique({ id: `local_${key}_${idx}`, title: `${it.title || 'Collection'} #${idx + 1}`, url: imgUrl, category: "Local Collection" }));
                  }
                  if (it.items && Array.isArray(it.items)) {
                    it.items.forEach((itemObj: any) => addMediaUnique({ ...itemObj, category: "Local Collection" }));
                  }
                  if (it.url || it.mediaUrl) {
                    addMediaUnique(it);
                  }
                }
              });
            }
          } catch (e) {}
        }
      }
    }
  } catch (e) {}

  return mediaList;
}

/** Helper: race a promise against a timeout */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    )
  ]);
}

/** Upload file to FastAPI private S3 storage and return a presigned https URL. */
export async function uploadFileToBackend(file: File): Promise<string> {
  const tokenKeys = ["token", "authToken", "accessToken", "deckoviz_token", "jwt"];
  let authToken: string | null = null;
  for (const k of tokenKeys) {
    const v = localStorage.getItem(k);
    if (v && v !== "undefined" && v !== "null") {
      authToken = v.replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "").trim();
      break;
    }
  }

  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {};
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  const endpoints = [`${API_BASE_URL}/api/upload`, `${API_BASE_URL}/api/home/media`];
  const errors: string[] = [];

  for (const endpoint of endpoints) {
    try {
      const res = await withTimeout(
        fetch(endpoint, { method: "POST", headers, body: formData }),
        20000,
        `Upload to ${endpoint}`
      );

      if (res.ok) {
        const data = await res.json();
        const url = data?.image?.url || data?.media?.url || data?.url || data?.mediaUrl || data?.imageUrl;
        if (url && (url.startsWith("https://") || url.startsWith("http://"))) {
          return url;
        }
        errors.push(`${endpoint}: returned OK but no valid URL in response`);
      } else {
        const errText = await res.text().catch(() => "");
        errors.push(`${endpoint}: ${res.status} ${res.statusText} ${errText.substring(0, 100)}`);
      }
    } catch (e: any) {
      errors.push(`${endpoint}: ${e.message || e}`);
    }
  }

  throw new Error(`Upload failed. Tried all endpoints:\n${errors.join("\n")}`);
}

/** @deprecated Use uploadFileToBackend — Firebase Storage is no longer used. */
export async function uploadFirebaseFile(file: File): Promise<string> {
  return uploadFileToBackend(file);
}

async function backendAuthHeaders(): Promise<Record<string, string>> {
  const tokenKeys = ["token", "authToken", "accessToken", "deckoviz_token", "jwt"];
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  for (const k of tokenKeys) {
    const v = localStorage.getItem(k);
    if (v && v !== "undefined" && v !== "null") {
      const cleaned = v.replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "").trim();
      if (cleaned) {
        headers["Authorization"] = `Bearer ${cleaned}`;
        break;
      }
    }
  }
  return headers;
}

/** Register media metadata via FastAPI (PostgreSQL). File bytes must already be in S3. */
export async function addFirebaseMedia(mediaData: {
  title: string;
  url: string;
  category?: string;
  style?: string;
  tags?: string;
}) {
  if (!mediaData.url) {
    throw new Error("No URL provided for media item.");
  }

  const timestamp = new Date().toISOString();
  const payload = {
    id: `upload_${Date.now()}`,
    ...mediaData,
    fileName: mediaData.title,
    mediaUrl: mediaData.url,
    createdAt: timestamp,
    source: "Master Art Vault"
  };

  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_media");
    const existingArr = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(payload);
    localStorage.setItem("deckoviz_global_uploaded_media", JSON.stringify(existingArr));
  } catch (e) {
    console.warn("localStorage media backup failed:", e);
  }

  const headers = await backendAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/api/enterprise/media`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url: mediaData.url,
      mediaUrl: mediaData.url,
      fileName: mediaData.title,
      title: mediaData.title,
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to register media metadata: ${res.status}`);
  }
  const saved = await res.json();
  return { id: saved.id || payload.id, success: true };
}

/** Persist music track metadata via FastAPI (PostgreSQL). Audio file must already be in S3. */
export async function addFirebaseMusic(musicData: {
  title: string;
  artist?: string;
  audioUrl: string;
  genre?: string;
  duration?: string;
}) {
  if (!musicData.audioUrl) {
    throw new Error("No audio URL provided.");
  }

  const timestamp = new Date().toISOString();
  const payload = {
    id: `music_${Date.now()}`,
    title: musicData.title || "Deckoviz Ambient Soundtrack",
    artist: musicData.artist || "Deckoviz Soundscapes",
    audioUrl: musicData.audioUrl,
    genre: musicData.genre || "Classical Ambient",
    duration: musicData.duration || "03:45",
    createdAt: timestamp,
    source: "Deckoviz Music Vault"
  };

  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_music");
    const existingArr = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(payload);
    localStorage.setItem("deckoviz_global_uploaded_music", JSON.stringify(existingArr));
  } catch (e) {
    console.warn("localStorage music backup notice:", e);
  }

  const headers = await backendAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/api/home/music`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to save music metadata: ${res.status}`);
  }
  const saved = await res.json();
  const track = { ...payload, ...(saved || {}) };
  return { id: track.id || payload.id, success: true, track };
}

/** Delete media item from Firebase RTDB, Firestore, and local cache */
export async function deleteFirebaseMedia(itemId: string): Promise<{ success: boolean }> {
  // 1. Remove from local storage cache
  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_media");
    if (existingStr) {
      const arr = JSON.parse(existingStr);
      const filtered = arr.filter((item: any) => item.id !== itemId);
      localStorage.setItem("deckoviz_global_uploaded_media", JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn("localStorage media delete failed:", e);
  }

  // 2. Remove from Firebase RTDB (try as direct key)
  try {
    await rtdbRemove(rtdbRef(rtdb, `media/${itemId}`));
  } catch (e) {
    console.warn("RTDB media delete failed:", e);
  }

  // 3. Remove from Firestore
  try {
    await deleteDoc(doc(db, "media", itemId));
  } catch (e) {
    console.warn("Firestore media delete failed:", e);
  }

  return { success: true };
}

/** Delete music track from Firebase RTDB, Firestore, and local cache */
export async function deleteFirebaseMusic(trackId: string): Promise<{ success: boolean }> {
  // 1. Remove from local storage cache
  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_music");
    if (existingStr) {
      const arr = JSON.parse(existingStr);
      const filtered = arr.filter((item: any) => item.id !== trackId);
      localStorage.setItem("deckoviz_global_uploaded_music", JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn("localStorage music delete failed:", e);
  }

  // 2. Remove from Firebase RTDB
  try {
    await rtdbRemove(rtdbRef(rtdb, `music/${trackId}`));
  } catch (e) {
    console.warn("RTDB music delete failed:", e);
  }

  // 3. Remove from Firestore
  try {
    await deleteDoc(doc(db, "music", trackId));
  } catch (e) {
    console.warn("Firestore music delete failed:", e);
  }

  return { success: true };
}

/** Fetch music tracks from FastAPI (PostgreSQL), with local cache fallback. */
export async function fetchFirebaseMusic() {
  const musicList: any[] = [];

  const addMusicUnique = (track: any) => {
    const url = track.audioUrl || track.url || track.soundUrl;
    if (!url) return;
    const id = track.id || `track_${Math.random().toString(36).substr(2, 9)}`;

    if (!musicList.some((m) => m.audioUrl === url || m.id === id)) {
      musicList.push({
        id,
        title: track.title || track.name || "Ambient Music Curation",
        artist: track.artist || "Deckoviz Soundscapes",
        audioUrl: url,
        genre: track.genre || "Classical / Ambient",
        duration: track.duration || "03:30",
        uploadedAt: track.createdAt || new Date().toISOString().split("T")[0],
        source: track.source || "Deckoviz Music Vault"
      });
    }
  };

  try {
    const localMusicStr = localStorage.getItem("deckoviz_global_uploaded_music");
    if (localMusicStr) {
      const localMusicArr = JSON.parse(localMusicStr);
      if (Array.isArray(localMusicArr)) {
        localMusicArr.forEach((item) => addMusicUnique(item));
      }
    }
  } catch (e) {}

  try {
    const headers = await backendAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/api/home/music`, { headers });
    if (res.ok) {
      const tracks = await res.json();
      if (Array.isArray(tracks)) {
        tracks.forEach((track) => addMusicUnique(track));
      }
    }
  } catch (e) {
    console.warn("Music fetch notice:", e);
  }

  return musicList;
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut
};
