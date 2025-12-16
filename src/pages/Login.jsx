import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
export default function Login({ setUser }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (matchedUser) {
            localStorage.setItem("currentUser", JSON.stringify(matchedUser));
            setUser(matchedUser); // ✅ REACT RE-RENDER
            navigate("/");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <button className="w-full bg-black text-white py-3 rounded">
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    New user?{" "}
                    <Link to="/register" className="font-semibold underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}
