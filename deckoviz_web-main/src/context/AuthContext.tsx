import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com";
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
  deductCredits: (amount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthModalForced, setIsAuthModalForced] = useState(false);

  useEffect(() => {
    if (token) {
      refreshProfile();
    }
  }, [token]);

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      setIsAuthModalOpen(false);
      setIsAuthModalForced(false);
    } catch (err) {
      console.error("Failed to load profile", err);
      logout();
    }
  };

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
    setIsAuthModalOpen(false);
    setIsAuthModalForced(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthModalForced(false);
  };

  const openAuthModal = (forced: boolean = false) => {
    setIsAuthModalForced(forced);
    setIsAuthModalOpen(true);
  };
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

  return (
    <AuthContext.Provider value={{ user, token, isAuthModalOpen, isAuthModalForced, openAuthModal, closeAuthModal, login, logout, refreshProfile, deductCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
