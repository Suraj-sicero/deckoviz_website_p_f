import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getUserCollections, saveUserCollections } from "../lib/userStorage";
import { auth, firebaseSignOut, googleProvider, signInWithPopup } from "../lib/firebaseClient";

import { API_BASE_URL } from "../lib/constants";

const BASE_URL = API_BASE_URL;
const API_URL = `${BASE_URL}/api/auth`;

interface User {
  id: string;
  email: string;
  credits: number;
  tier?: "starter" | "creator" | "studio";
  emailVerified?: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthModalOpen: boolean;
  isAuthModalForced: boolean;
  openAuthModal: (forced?: boolean) => void;
  closeAuthModal: () => void;
  login: (token: string, user: User) => void;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateUser: (updatedFields: Partial<User>) => void;
  deductCredits: (amount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved && saved !== "undefined" && saved !== "null") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Invalid user object in localStorage:", e);
      localStorage.removeItem("user");
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const savedToken =
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("deckoviz_token") ||
      localStorage.getItem("jwt");
    if (savedToken && savedToken !== "undefined" && savedToken !== "null") {
      return savedToken;
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalForced, setIsAuthModalForced] = useState(false);

  useEffect(() => {
    if (token) {
      refreshProfile();
    }
  }, [token]);

  // Listen for 401 events from API clients (webappApi, enterpriseApi)
  // When an API call returns 401, only prompt if user is NOT already logged in
  useEffect(() => {
    const handleAuthRequired = () => {
      const existingToken =
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("deckoviz_token") ||
        localStorage.getItem("jwt");

      if (!token && !existingToken) {
        console.warn("[Auth] 401 received and no token present — opening login modal");
        setIsAuthModalForced(false);
        setIsAuthModalOpen(true);
      } else {
        console.warn("[Auth] 401 received on background request — keeping existing active session");
      }
    };
    window.addEventListener("deckoviz-auth-required", handleAuthRequired);
    return () => window.removeEventListener("deckoviz-auth-required", handleAuthRequired);
  }, [token]);

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = res.data?.user || (res.data?.email ? res.data : null);
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setIsAuthModalOpen(false);
      setIsAuthModalForced(false);
    } catch (err: any) {
      console.warn("[AuthContext] Profile sync notice:", err?.message || err);
      setIsAuthModalOpen(false);
      setIsAuthModalForced(false);
    }
  };

  const login = async (newToken: string, newUser?: User | any) => {
    const activeUser = newUser && typeof newUser === "object" ? newUser : {
      id: "user_active",
      email: "creator@deckoviz.com",
      name: "Creator",
      displayName: "Creator",
      credits: 50,
      role: "creator"
    };

    localStorage.setItem("token", newToken);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(activeUser));
    setToken(newToken);
    setUser(activeUser);
    setIsAuthModalOpen(false);
    setIsAuthModalForced(false);

    window.dispatchEvent(new CustomEvent("deckoviz-user-changed", { detail: activeUser }));
    window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));

    // Restore collections on login from backend API & persistent backup
    try {
      const backupColsRaw = localStorage.getItem("deckoviz_backup_collections");
      const backupCols = backupColsRaw ? JSON.parse(backupColsRaw) : [];

      const res = await axios.get(`${BASE_URL}/api/home/collections`, {
        headers: { Authorization: `Bearer ${newToken}` }
      }).catch(() => null);

      const backendList = res?.data ? (Array.isArray(res.data) ? res.data : res.data.collections || res.data.items || []) : [];

      const mergedMap = new Map();
      [...backupCols, ...backendList].forEach((c: any) => {
        const k = c.id || c.name || c.title;
        if (k) mergedMap.set(k, c);
      });

      const mergedCols = Array.from(mergedMap.values());
      if (mergedCols.length > 0) {
        saveUserCollections(mergedCols);
      }
    } catch (err) {
      console.warn("[AuthContext] Collection restoration on login fallback:", err);
    }
  };

  /**
   * Firebase proves the Google identity; FastAPI then exchanges that proof for
   * the Deckoviz JWT used by every authenticated API request.
   */
  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    const firebaseUser = credential.user;
    const idToken = await firebaseUser.getIdToken();

    try {
      const response = await axios.post(
        `${API_URL}/signin`,
        { id_token: idToken },
        { timeout: 8000 }
      );
      const backendToken = response.data?.token;
      const backendUser = response.data?.user;
      if (!backendToken || !backendUser) {
        throw new Error("The authentication service did not return a session.");
      }
      await login(backendToken, backendUser);
    } catch (error) {
      // Do not leave Firebase authenticated when the app session was not made.
      await firebaseSignOut(auth).catch(() => undefined);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("jwt");
    localStorage.removeItem("deckoviz_token");
    localStorage.removeItem("deckoviz_user_avatar");
    localStorage.removeItem("deckoviz_user_banner");
    setToken(null);
    setUser(null);
    setIsAuthModalForced(false);
    void firebaseSignOut(auth).catch(() => undefined);
    window.dispatchEvent(new CustomEvent("deckoviz-user-changed", { detail: null }));
    window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
  };

  const openAuthModal = useCallback((forced: boolean = false) => {
    setIsAuthModalForced(forced);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = () => {
    if (isAuthModalForced) return; // Prevent closing if forced
    setIsAuthModalOpen(false);
  };

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!token) {
      openAuthModal();
      return false;
    }
    try {
      const res = await axios.post(`${API_URL}/deduct-credits`, { amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(prev => prev ? { ...prev, credits: res.data.remainingCredits } : null);
      return true;
    } catch (err) {
      console.error("Failed to deduct credits:", err);
      alert("Insufficient credits. Please top up!");
      return false;
    }
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prev) => {
      const next = prev ? { ...prev, ...updatedFields } : ({ id: "user-1", email: "suraj@deckoviz.com", credits: 50, ...updatedFields } as User);
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthModalOpen, isAuthModalForced, openAuthModal, closeAuthModal, login, signInWithGoogle, logout, refreshProfile, updateUser, deductCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
