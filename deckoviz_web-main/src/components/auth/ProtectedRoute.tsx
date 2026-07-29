import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, openAuthModal, isAuthModalOpen } = useAuth();

  useEffect(() => {
    if (!token && !isAuthModalOpen) {
      openAuthModal(true);
    }
  }, [token, isAuthModalOpen, openAuthModal]);

  if (!token) {
    // Show empty screen or loading while forcing auth
    return <div className="min-h-screen bg-[#f8f9fb]" />;
  }

  return <>{children}</>;
};
