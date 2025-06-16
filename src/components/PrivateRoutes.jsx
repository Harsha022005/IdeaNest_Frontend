import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("PrivateRoute loaded. Token:", token); // 🪵 debug

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log("Token decoded:", decoded);

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      console.log("Token expired.");
      return <Navigate to="/login" replace />;
    }

    console.log("Token valid, rendering protected component.");
    return children;
  } catch (err) {
    console.error("Token decode failed:", err);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
