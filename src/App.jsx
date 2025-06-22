import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './dashboards/Home.jsx';
import Signup from "./authorisation/Signup.jsx";
import Login from "./authorisation/Login.jsx";
import Explore from './pages/Explore.jsx';
import PrivateRoute from "./components/PrivateRoutes.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Posts from "./pages/posts.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import PersonalChat from './pages/personalchat.jsx';
import Chat from './pages/Chatinbox.jsx'


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
              element={<PrivateRoute><Explore/></PrivateRoute>}
            />
            <Route
              path="/userpost"
              element={<PrivateRoute><Posts /></PrivateRoute>}
            />
            <Route path="/dashboard"
            element={<PrivateRoute><Dashboard/></PrivateRoute>}
            />
            <Route path="/chat" element={<PersonalChat />} />
              <Route path="/chatinbox" element={<PrivateRoute><Chat /></PrivateRoute>} />

          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
