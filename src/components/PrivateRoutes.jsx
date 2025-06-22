import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = ({ children }) => {

  // Sync logout across tabs
  useEffect(() => {
    const onStorage = () => {
      if (!localStorage.getItem('authToken')) {
        window.location.href = '/login';
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // check for token in localstorage and expiry time
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('authToken');
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem('authToken');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;