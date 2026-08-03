import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getUserCollections, saveUserCollections } from "../lib/userStorage";

const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
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
    const savedToken = localStorage.getItem("token");
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
  // When any API call returns 401, it dispatches this event to auto-open the login modal
  useEffect(() => {
    const handleAuthRequired = () => {
      console.warn("[Auth] 401 received — opening login modal");
      setIsAuthModalForced(true);
      setIsAuthModalOpen(true);
    };
    window.addEventListener("deckoviz-auth-required", handleAuthRequired);
    return () => window.removeEventListener("deckoviz-auth-required", handleAuthRequired);
  }, []);

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
      console.error("Failed to load profile", err);
      const status = err?.response?.status;
      if (status === 401 || status === 404) {
        logout();
      }
    }
  };

  const login = async (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setIsAuthModalOpen(false);
    setIsAuthModalForced(false);

    window.dispatchEvent(new CustomEvent("deckoviz-user-changed", { detail: newUser }));
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthModalForced(false);
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
    <AuthContext.Provider value={{ user, token, isAuthModalOpen, isAuthModalForced, openAuthModal, closeAuthModal, login, logout, refreshProfile, updateUser, deductCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
