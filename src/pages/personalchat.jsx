import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { FiSend, FiUser, FiMessageCircle } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { User } from "lucide-react";

const socket = io("http://localhost:5000");

function PersonalChat() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get("sender");
  const receiver = queryParams.get("receiver");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const roomid = [sender, receiver].sort().join("-");

  useEffect(() => {
    if (!sender || !receiver) return;

    socket.emit("join", { roomid });

    axios
      .get("http://localhost:5000/chat/history", { params: { sender, receiver } })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error loading messages:", err));

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [sender, receiver]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      sender,
      receiver,
      message: input,
      roomid,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socket.emit("send-message", message);
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  if (!sender || !receiver) {
    return (
      <div className="text-center mt-10 text-red-500 text-sm sm:text-base">
        Invalid chat session. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full bg-gray-800 p-4 sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between shadow-md border-b border-gray-700">
        <a
          href="/userexplore"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide hover:text-blue-400 transition mb-4 sm:mb-0"
        >
          IdeaNest
        </a>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/userpost"
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 py-2 rounded-lg shadow transition text-sm sm:text-lg"
          >
            <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
            <span className="font-medium">Post</span>
          </a>
          <a
            href="/Dashboard"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg shadow transition text-sm sm:text-lg"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          
          </a>
          <Link
            to="/chatinbox"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg shadow transition text-sm sm:text-lg"
          >
            <FiMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Message</span>
          </Link>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-4xl min-h-[calc(100vh-120px)] bg-white shadow-2xl rounded-2xl overflow-hidden border mt-4 sm:mt-6 mx-2 sm:mx-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-indigo-600 text-white text-base sm:text-lg font-semibold">
          <div className="flex items-center gap-2">
            <FiUser className="text-lg sm:text-xl" />
            <span className="text-sm sm:text-base">{receiver}</span>
          </div>
          <span className="text-xs sm:text-sm text-indigo-200">Room: {roomid}</span>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-indigo-50 scrollbar-thin scrollbar-thumb-indigo-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === sender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 sm:space-x-3 ${
                  msg.sender === sender ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                  {msg.sender.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-2xl max-w-[70%] sm:max-w-xs break-words shadow-md ${
                      msg.sender === sender
                        ? "bg-indigo-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {msg.timestamp ||
                      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Section */}
        <div className="sticky bottom-0 p-3 sm:p-4 bg-white border-t flex items-center gap-2 sm:gap-3 z-10">
          <BsChatDots className="text-lg sm:text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white p-1 sm:p-2 rounded-full hover:bg-indigo-700 transition"
          >
            <FiSend className="text-base sm:text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalChat;