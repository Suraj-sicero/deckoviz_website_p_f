import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, openAuthModal, isAuthModalOpen, isAuthModalForced } = useAuth();

  useEffect(() => {
    if (!user) {
      if (!isAuthModalOpen || !isAuthModalForced) {
        openAuthModal(true); // Force it
      }
    }
  }, [user, isAuthModalOpen, isAuthModalForced, openAuthModal]);

  if (!user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-400">Please sign in to access this creative tool.</p>
          <button 
            onClick={() => openAuthModal(true)}
            className="mt-6 px-6 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
