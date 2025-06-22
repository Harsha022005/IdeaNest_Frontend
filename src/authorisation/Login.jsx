import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        email,
        password,
        role,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userEmail", response.data.email || email);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setSuccess("Login success");
        setTimeout(() => {
          navigate("/userexplore");
        }, 100);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Try again.";
      setError(errorMsg);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-6">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Recruiter</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await axios.post("http://localhost:5000/api/auth/google", {
                  credential: credentialResponse.credential,
                });
                localStorage.setItem("authToken", res.data.token);
                localStorage.setItem("userEmail", res.data.email);
                navigate("/userexplore");
              } catch {
                setError("Google login failed. Please try again.");
              }
            }}
            onError={() => {
              setError("Google login failed. Please try again.");
            }}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
