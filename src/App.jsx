import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoutes from "./components/PrivateRoutes.jsx";
import Home from "./dashboards/Home.jsx";
import Signup from "./authorisation/Signup.jsx";
import Login from "./authorisation/Login.jsx";
import Explore from "./pages/Explore.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Posts from "./pages/posts.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PersonalChat from "./pages/personalchat.jsx";
import Chat from "./pages/Chatinbox.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && location.pathname === "/") {
      navigate("/userexplore", { replace: true });
    }
  }, [navigate, location]);

  return null;
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <RedirectHandler />

        <div className="min-h-screen bg-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<VerifyEmail />} />

            <Route
              path="/userexplore"
              element={<PrivateRoute><Explore /></PrivateRoute>}
            />
            <Route
              path="/userpost"
              element={<PrivateRoute><Posts /></PrivateRoute>}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route
              path="/chat"
              element={<PrivateRoute><PersonalChat /></PrivateRoute>}
            />
            <Route
              path="/chatinbox"
              element={<PrivateRoute><Chat /></PrivateRoute>}
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
