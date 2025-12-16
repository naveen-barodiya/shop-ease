import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;   // 🔥 THIS LINE IS IMPORTANT
