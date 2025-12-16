import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import React from "react";
export const store = configureStore({
    reducer: {
        products: productReducer, // 👈 MUST be "products"
        cart: cartReducer,        // 👈 MUST be "cart"
        auth: authReducer,        // 👈 MUST be "auth"
    },
});
