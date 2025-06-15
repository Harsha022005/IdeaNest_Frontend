import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username || !email || !password || !confirmPassword || !role) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            console.log("Submitting signup form with:", { username, email, password, role });
            const response = await axios.post('api/signup', { username, email, password, role });
            
            if (response.status !== 201) {
                setError("Signup failed. Please try again.");
                return;
            }

            setSuccess("Signup successful! You can now log in.");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setRole("");
            navigate('/userexplore');
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-black">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
                <div className="mb-4">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="text-lg border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Confirm Password"
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
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
                >
                    Sign Up
                </button>
            </div>
            <div className="mt-6 text-center">
                <p className="mt-4 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;