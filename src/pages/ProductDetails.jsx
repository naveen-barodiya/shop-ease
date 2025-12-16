import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";
import React from "react";
export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const product = useSelector((state) =>
        state.products.items.find((p) => p.id === Number(id))
    );

    const cartItem = useSelector((state) =>
        state.cart.items.find((item) => item.id === Number(id))
    );

    if (!product) {
        return <p className="p-6 text-center">Loading product details...</p>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    // 🔥 BUY NOW
    const handleBuyNow = () => {
        dispatch(addToCart(product)); // ensure added
        navigate("/checkout");
    };

    return (
        <>
            {/* POPUP */}
            <div
                className={`fixed top-6 right-6 z-50 transition-all duration-500 ${showPopup
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="bg-black text-white px-5 py-3 rounded-xl shadow-lg text-sm">
                    ✅ Added to cart (Qty: {cartItem?.qty || 1})
                </div>
            </div>

            {/* PAGE */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow p-6 sm:p-8">

                    {/* IMAGE */}
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.thumbnail || product.images?.[0]}
                            alt={product.title}
                            className="w-full h-[320px] sm:h-[400px] object-contain"
                        />
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                            SALE
                        </span>
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>⭐ {product.rating || "4.5"} Rating</span>
                            <span className="text-green-600">In Stock</span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-bold">₹{product.price}</span>
                            <span className="line-through text-gray-400">
                                ₹{Math.round(product.price * 1.2)}
                            </span>
                            <span className="text-green-600 font-semibold">20% OFF</span>
                        </div>

                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {cartItem && (
                            <p className="mb-3 text-sm text-blue-600">
                                🛒 Already in cart (Qty: {cartItem.qty})
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="mt-6 text-sm text-gray-500 space-y-1">
                            <p>🚚 Free delivery in 3–5 days</p>
                            <p>🔄 7 days replacement</p>
                            <p>🔒 Secure payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
