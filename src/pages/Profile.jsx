import { useNavigate } from "react-router-dom";
import React from "react";
export default function Profile({ user, setUser }) {
    const navigate = useNavigate();

    if (!user) {
        return <p className="p-6">Please login</p>;
    }

    // 🔥 Logout
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        navigate("/login");
    };

    // 🔥 Profile image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const updatedUser = {
                ...user,
                avatar: reader.result,
            };

            // update current user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(updatedUser)
            );
            setUser(updatedUser);

            // update users list also
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((u) =>
                u.email === updatedUser.email ? updatedUser : u
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

                {/* PROFILE HEADER */}
                <div className="flex flex-col items-center mb-6">

                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            user.name.charAt(0).toUpperCase()
                        )}
                    </div>

                    {/* Edit photo */}
                    <label className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
                        Edit Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>

                    <h2 className="text-xl font-bold mt-3">
                        {user.name}
                    </h2>
                </div>

                {/* DETAILS */}
                <div className="space-y-3 text-gray-700 mb-6">
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Mobile:</b> {user.mobile}</p>
                </div>

                {/* LOGOUT */}
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
