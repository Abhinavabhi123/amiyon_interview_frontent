/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("amiyonTkn");

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
