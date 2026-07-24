import React from "react";

// Auth guard temporarily disabled — all routes are accessible without login.
// The login page still works; users just aren't forced to sign in.
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

