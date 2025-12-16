import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user } = useSelector((state) => state.auth);

    // user not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // admin route protection
    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
}
