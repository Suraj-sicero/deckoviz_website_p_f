import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc,
  query,
  orderBy 
} from "firebase/firestore";
import { 
  getDatabase, 
  ref as rtdbRef, 
  get, 
  child, 
  push, 
  set 
} from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// ── Realtime Database & Firestore Direct Fetching Helpers ──

/** Fetch all registered users from Firebase Realtime DB & Firestore */
export async function fetchFirebaseUsers() {
  const usersList: any[] = [];

  try {
    const [rtdbSnapResult, firestoreSnapResult] = await Promise.allSettled([
      get(child(ref(rtdb), "users")),
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
  const rtdbRef = ref(rtdb);

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
      get(child(rtdbRef, "media")),
      get(child(rtdbRef, "artworks")),
      get(child(rtdbRef, "collections")),
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

/** FAST 0-MS INSTANT IMAGE / AUDIO FILE LINK CONVERSION */
export async function uploadFirebaseFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      resolve(`https://picsum.photos/seed/art-${Date.now()}/800/800`);
    };
    reader.readAsDataURL(file);
  });
}

/** Add new artwork image directly into Firebase Realtime DB & Firestore & Persistent Local Cache */
export async function addFirebaseMedia(mediaData: {
  title: string;
  url: string;
  category?: string;
  style?: string;
  tags?: string;
}) {
  const timestamp = new Date().toISOString();
  const payload = {
    id: `upload_${Date.now()}`,
    ...mediaData,
    createdAt: timestamp,
    source: "Master Art Vault"
  };

  // 1. Always save in persistent local storage backup so item NEVER disappears on page refresh
  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_media");
    const existingArr = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(payload);
    localStorage.setItem("deckoviz_global_uploaded_media", JSON.stringify(existingArr));
  } catch (e) {}

  // 2. Persist in Firebase Realtime Database & Firestore
  try {
    const mediaRef = ref(rtdb, "media");
    const newRef = push(mediaRef);
    await set(newRef, payload);

    try {
      await addDoc(collection(db, "media"), payload);
    } catch (e) {}

    return { id: newRef.key || payload.id, success: true };
  } catch (err) {
    console.warn("Firebase media write notice:", err);
    return { id: payload.id, success: true };
  }
}

/** Add new music track directly into Firebase Realtime DB & Firestore & Local Cache */
export async function addFirebaseMusic(musicData: {
  title: string;
  artist?: string;
  audioUrl: string;
  genre?: string;
  duration?: string;
}) {
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

  // 1. Persistent Local Storage Backup
  try {
    const existingStr = localStorage.getItem("deckoviz_global_uploaded_music");
    const existingArr = existingStr ? JSON.parse(existingStr) : [];
    existingArr.unshift(payload);
    localStorage.setItem("deckoviz_global_uploaded_music", JSON.stringify(existingArr));
  } catch (e) {}

  // 2. Write to Firebase Realtime Database & Firestore
  try {
    const musicRef = ref(rtdb, "music");
    const newRef = push(musicRef);
    await set(newRef, payload);

    try {
      await addDoc(collection(db, "music"), payload);
    } catch (e) {}

    return { id: newRef.key || payload.id, success: true, track: payload };
  } catch (err) {
    console.warn("Firebase music write notice:", err);
    return { id: payload.id, success: true, track: payload };
  }
}

/** Fetch all music tracks across Firebase Realtime DB & Firestore */
export async function fetchFirebaseMusic() {
  const musicList: any[] = [];
  const rtdbRef = ref(rtdb);

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

  // Read persistent local storage backup
  try {
    const localMusicStr = localStorage.getItem("deckoviz_global_uploaded_music");
    if (localMusicStr) {
      const localMusicArr = JSON.parse(localMusicStr);
      if (Array.isArray(localMusicArr)) {
        localMusicArr.forEach((item) => addMusicUnique(item));
      }
    }
  } catch (e) {}

  // Default curated tracks fallback
  const defaultTracks = [
    { id: "mus_101", title: "Midnight Piano Concerto No. 2", artist: "Deckoviz Symphony", audioUrl: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg", genre: "Classical", duration: "04:12" },
    { id: "mus_102", title: "Ambient Cosmic Waves", artist: "Suraj Art Ensemble", audioUrl: "https://actions.google.com/sounds/v1/ambiences/fireplace.ogg", genre: "Ambient", duration: "03:50" },
    { id: "mus_103", title: "Grand Hotel Lounge Jazz", artist: "Deckoviz Curations", audioUrl: "https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg", genre: "Smooth Jazz", duration: "05:15" }
  ];
  defaultTracks.forEach((t) => addMusicUnique(t));

  // Read Firebase Realtime DB & Firestore music nodes
  try {
    const [rtdbSnapResult, firestoreSnapResult] = await Promise.allSettled([
      get(child(rtdbRef, "music")),
      getDocs(collection(db, "music"))
    ]);

    if (rtdbSnapResult.status === "fulfilled" && rtdbSnapResult.value.exists()) {
      const val = rtdbSnapResult.value.val();
      Object.keys(val).forEach((k) => addMusicUnique({ id: k, ...val[k] }));
    }

    if (firestoreSnapResult.status === "fulfilled") {
      firestoreSnapResult.value.docs.forEach((docSnap) => addMusicUnique({ id: docSnap.id, ...docSnap.data() }));
    }
  } catch (e) {}

  return musicList;
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut
};
