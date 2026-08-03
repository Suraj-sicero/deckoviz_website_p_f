import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4A_Irxqi3_L57u5_Rzav4QEne6ElX1LE",
  authDomain: "deckoviz-3ad39.firebaseapp.com",
  projectId: "deckoviz-3ad39",
  storageBucket: "deckoviz-3ad39.firebasestorage.app",
  messagingSenderId: "207225326591",
  appId: "1:207225326591:web:a49846cc75e277671675ca",
  measurementId: "G-LZ7BQQ8L0C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut
};
