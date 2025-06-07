import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../containers/loginPage";
import Signup from "../containers/signupPage";
import Majortests from "../containers/tests/majorTests";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/helper" element={<Majortests />} />
      {/* <Route path="/organization" element={<Organization />} />
      <Route path="/home" element={<GridExample />} />
      <Route path="/minor" element={<Minortests />} />
      <Route path="/minortests" element={<MinorTestMainPage />} />
      <Route path="/table" element={<Tables />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/help" element={<PatientEntry />} />
      <Route path="/h" element={<MainTestEntry />} />
      <Route path="/signupinputtest" element={<SignupInput />} />
      <Route path="/rahul" element={<Loader />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
