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
            const response = await axios.post('http://localhost:5000/login', {
                username,
                email,
                password,
                role
            });

            if (response.status === 200) {
             localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userEmail', response.data.email || email); 
                setUsername("");
                setEmail("");
                setPassword("");
                setRole("");
                setSuccess('Login success')
                setTimeout(() => {
                    navigate('/userexplore');
                }, 100);
            }
        } catch (err) {
            console.error("Login error:", err);
            const errorMsg = err.response?.data?.message || "An error occurred during login. Please try again.";
            setError(errorMsg);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                {success && <div className="mb-4 text-green-600">{success}</div>}
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="text-lg border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="text-lg border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="text-lg border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Password"
                    />
                </div>
                <div className="mb-6">
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="text-lg border border-gray-300 rounded-md p-2 w-full"
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Recruiter</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
                >
                    Login
                </button>

                <div className="mt-4 flex justify-center">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            navigate('/userexplore');
                            // Send credentialResponse.credential to your backend
                        }}
                        onError={() => {
                            console.log("Google login failed");
                            setError("Google login failed. Please try again.");
                        }}
                    />
                </div>
            </form>
            <div className="mt-6 text-center">
                <p className="mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
