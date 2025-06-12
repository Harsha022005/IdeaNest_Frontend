import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './dashboards/Home.jsx';
import Explore from "./dashboards/Explore.jsx";
import Signup from "./authorisation/Signup.jsx";
import Login from "./authorisation/Login.jsx";
function App() {
  return (
    <div className="min-h-screen bg-gray-200">
     <div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/register" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
     </div>
    </div>
  );
}
export default App;