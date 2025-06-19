import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const PrivateRoutes = ({ children }) => {
  const [tokenValid, setTokenValid] = useState(true); 
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        setTokenValid(false); 
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setTokenValid(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setTokenValid(false); 
      }
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  if (!tokenValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
