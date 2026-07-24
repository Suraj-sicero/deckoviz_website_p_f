import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, openAuthModal, isAuthModalOpen } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !isAuthModalOpen) {
      openAuthModal(true);
    }
  }, [token, isAuthModalOpen, openAuthModal]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};
