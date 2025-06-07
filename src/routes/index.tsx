import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../containers/loginPage";
import Signup from "../containers/signupPage";
import Majortests from "../containers/tests/majorTests";
// import Organization from "../containers/organization";
import AuthRouter from "./authRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes wrapped with AuthRouter */}
      <Route
        path="/*"
        element={
          <AuthRouter>
            <Routes>
              <Route path="helper" element={<Majortests />} />
              {/* <Route path="organization" element={<Organization />} /> */}
              {/* Add more protected routes here */}
              <Route path="*" element={<Navigate to="/helper" />} />
            </Routes>
          </AuthRouter>
        }
      />

      {/* Fallback for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
