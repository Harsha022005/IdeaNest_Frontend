import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './dashboards/Home.jsx';
import Explore from "./dashboards/Explore.jsx";
import Signup from "./authorisation/Signup.jsx";
import Login from "./authorisation/Login.jsx";
import UserExplore from "./pages/explore.jsx";
import PrivateRoute from "./components/PrivateRoutes.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Posts from "./pages/posts.jsx";

function App() {
  return (
<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <div className="min-h-screen bg-gray-200">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/userexplore"
              element={<PrivateRoute><UserExplore /></PrivateRoute>}
            />
            <Route
              path="/userpost"
              element={<PrivateRoute><Posts /></PrivateRoute>}
            />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
