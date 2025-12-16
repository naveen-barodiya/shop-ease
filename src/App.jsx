import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import ScrollToTop from "./components/ScrollToTop";
export default function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
