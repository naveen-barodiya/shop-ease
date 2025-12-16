import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        pincode: "",
    });

    // 🔥 TOTAL AMOUNT FIX
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 SAVE ORDER
    const placeOrder = (paymentMethod) => {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            items: cartItems,
            total,
            paymentMethod,
            status:
                paymentMethod === "Cash on Delivery"
                    ? "Payment Pending"
                    : "Paid",
            shipping: form,
        };

        localStorage.setItem(
            "orders",
            JSON.stringify([...orders, newOrder])
        );

        navigate("/orders");
    };

    // 🔥 RAZORPAY FRONTEND-ONLY DEMO
    const handleOnlinePayment = () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        const options = {
            key: "rzp_test_xxxxxxxx", // 🔴 TEST KEY
            amount: total * 100,
            currency: "INR",
            name: "ShopEase",
            description: "Demo Payment",

            handler: function () {
                placeOrder("Online Payment");
            },

            prefill: {
                name: form.name,
                contact: form.phone,
            },

            theme: {
                color: "#0A2540",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Checkout 🧾
                </h2>

                {/* 🛒 CART ITEMS */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h3>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between text-sm mb-2"
                        >
                            <span>
                                {item.title} × {item.qty}
                            </span>
                            <span>
                                ₹{item.price * item.qty}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between mt-4 text-lg font-bold border-t pt-4">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                {/* 📦 SHIPPING DETAILS */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <input
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="border p-3 rounded"
                    />

                    <input
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        required
                        className="border p-3 rounded"
                    />

                    <input
                        name="address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        required
                        className="border p-3 rounded md:col-span-2"
                    />

                    <input
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                        required
                        className="border p-3 rounded"
                    />
                </div>

                {/* 🔥 PAY NOW */}
                <button
                    onClick={() => setShowPaymentPopup(true)}
                    disabled={total === 0}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Pay Now
                </button>
            </div>

            {/* 🔥 PAYMENT POPUP */}
            {showPaymentPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm text-center">

                        <h3 className="text-xl font-bold mb-4">
                            Select Payment Method
                        </h3>

                        <button
                            onClick={() =>
                                placeOrder("Cash on Delivery")
                            }
                            className="w-full border py-3 rounded mb-3 hover:bg-gray-100"
                        >
                            💵 Cash on Delivery
                        </button>

                        <button
                            onClick={handleOnlinePayment}
                            className="w-full bg-black text-white py-3 rounded mb-3"
                        >
                            💳 Pay Online (Razorpay)
                        </button>

                        <button
                            onClick={() =>
                                setShowPaymentPopup(false)
                            }
                            className="text-sm text-gray-500 underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
