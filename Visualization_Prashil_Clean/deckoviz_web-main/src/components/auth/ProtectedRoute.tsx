import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "./AuthModal";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, openAuthModal, isAuthModalOpen } = useAuth();

  useEffect(() => {
    if (!token && !isAuthModalOpen) {
      openAuthModal(true);
    }
  }, [token, isAuthModalOpen, openAuthModal]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#182a4a] via-[#1e3a5f] to-[#2563EB] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl mb-4 shadow-2xl animate-bounce">
          ✨
        </div>
        <h2 className="text-2xl font-bold font-serif mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Welcome to Deckoviz
        </h2>
        <p className="text-sm text-blue-200/80 max-w-sm mb-6">
          Please sign in to access your personalized collections, AI generative tools, and webapp dashboard.
        </p>
        <button
          onClick={() => openAuthModal(true)}
          className="px-6 py-3 rounded-xl bg-white text-[#182a4a] font-bold text-sm shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300"
        >
          Sign In / Create Account
        </button>
        {isAuthModalOpen && <AuthModal />}
      </div>
    );
  }

  return <>{children}</>;
};
