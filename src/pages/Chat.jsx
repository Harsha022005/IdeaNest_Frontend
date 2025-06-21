import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:5000");

function Chat({ sender, reciver }) {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sender = queryParams.get("sender");
  const receiver = queryParams.get("receiver");

  const [messages, setMessages] = useState([]); // should be plural
  const [input, setInput] = useState("");

  const roomid = [sender, reciver].sort().join("-");

  useEffect(() => {
    socket.emit("join", { sender, reciver });

    // Fetch chat history from backend
    axios
      .get(`http://localhost:5000/chat/history`, {
        params: { sender, reciver },
      })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Receive new message via socket
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [sender, reciver]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const message = { sender, reciver, content: input };
    socket.emit("send-message", message);
    setInput("");
  };

  return (
    <div>
      <div className="Chatwindow">
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
