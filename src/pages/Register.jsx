import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function Register({ setUser }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((u) => u.email === form.email)) {
            alert("User already exists");
            return;
        }

        const newUser = {
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            password: form.password,
            avatar: null,
        };

        const updatedUsers = [...users, newUser];

        // 🔥 SAVE DATA
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        // 🔥 VERY IMPORTANT
        setUser(newUser);

        // 🔥 DIRECT LOGIN AFTER REGISTER
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Create Account 🚀
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <input
                        name="mobile"
                        type="tel"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded"
                    />

                    <button className="w-full bg-black text-white py-3 rounded">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
