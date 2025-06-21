import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { User } from "lucide-react";

function Chatinbox() {
  const email = localStorage.getItem('userEmail');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chatinbox?email=${email}`);
        setUsers(response.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    if (email) fetchInbox();
  }, [email]);

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <p className="text-xl font-semibold">Please login to view your chat inbox.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <div className="bg-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-md border-b border-gray-700">
        <a href="/userexplore" className="text-3xl font-extrabold text-white tracking-wide hover:text-blue-400 transition-colors duration-300">
          IdeaNest
        </a>

        <div className="flex items-center gap-4">
          <a href="/userpost" className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-200">
            <IoIosAddCircleOutline className="text-2xl" />
            <span className="text-lg font-medium">Post</span>
          </a>
          <a href="/Dashboard" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200">
            <User className="w-5 h-5" />
            <span className="text-lg font-medium">Dashboard</span>
          </a>
          <Link to="/chatinbox" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200">
            <FiMessageCircle className="w-5 h-5" />
            <span className="text-lg font-medium">Message</span>
          </Link>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col items-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-6 tracking-wide text-center">Your Conversations</h2>

        <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-xl space-y-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {users.length === 0 ? (
            <p className="text-gray-400 text-center">No conversations yet. Start chatting!</p>
          ) : (
            users
              .filter(user => user && user !== email)
              .map((user, index) => {
                const initials = user.split('@')[0].slice(0, 2).toUpperCase();
                return (
                  <Link
                    to={`/chat?sender=${email}&receiver=${user}`}
                    key={index}
                    className="flex items-center gap-4 bg-gray-700 hover:bg-blue-600 transition-all duration-200 rounded-lg px-6 py-4 shadow-sm cursor-pointer"
                  >
                    <div className="bg-blue-500 w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold shadow-inner">
                      {initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{user}</span>
                      <span className="text-sm text-gray-300">Tap to open chat</span>
                    </div>
                  </Link>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatinbox;
