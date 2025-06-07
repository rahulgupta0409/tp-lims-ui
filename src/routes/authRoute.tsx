// src/routes/AuthRouter.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouterProps {
  children: React.ReactNode;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>; // ✅ Must return valid JSX
};

export default AuthRouter;
