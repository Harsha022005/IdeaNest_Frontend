import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiMessageCircle } from 'react-icons/fi';
import { User } from 'lucide-react';

function Chatinbox() {
  const email = localStorage.getItem('userEmail');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/chatinbox?email=${email}`);
        setUsers(response.data || []);
        console.log('Fetched users:', response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (email) fetchInbox();
  }, [email]);

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4 text-center">
        <p className="text-lg sm:text-xl font-semibold">Please login to view your chat inbox.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <div className="bg-gray-800 p-3 sm:p-4 sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between shadow-md border-b border-gray-700 gap-2 sm:gap-0">
        <a
          href="/userexplore"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide hover:text-blue-400 transition-colors duration-300"
        >
          IdeaNest
        </a>

        <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-0">
          <a
            href="/userpost"
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
            <span className="text-base sm:text-lg font-medium">Post</span>
          </a>
          <a
            href="/Dashboard"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            <User className="w-5 h-5" />
            <span className="text-base sm:text-lg font-medium">Dashboard</span>
          </a>
          <Link
            to="/chatinbox"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md transition duration-200"
          >
            <FiMessageCircle className="w-5 h-5" />
            <span className="text-base sm:text-lg font-medium">Message</span>
          </Link>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col items-center py-8 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-4xl font-bold mb-6 tracking-wide text-center">
          Your Conversations
        </h2>

        <div className="w-full max-w-4xl bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl space-y-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {users.length === 0 ? (
            <p className="text-gray-400 text-center">No conversations yet. Start chatting!</p>
          ) : (
            users.map((user, index) => {
              if (!user || user === email) return null; // Skip invalid or self emails
              const initials = user.split('@')[0].slice(0, 2).toUpperCase();
              return (
                <Link
                  to={`/chat?sender=${email}&receiver=${user}`}
                  key={index}
                  className="flex items-center gap-4 bg-gray-700 hover:bg-blue-600 transition-all duration-200 rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-sm cursor-pointer"
                >
                  <div className="bg-blue-500 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-base sm:text-lg font-semibold shadow-inner">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm sm:text-base font-medium">{user}</span>
                    <span className="text-xs sm:text-sm text-gray-300">Tap to open chat</span>
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