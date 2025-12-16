import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
    increaseQty,
    decreaseQty,
    removeFromCart,
} from "../features/cart/cartSlice";
import React from "react";

export default function Cart() {
    const dispatch = useDispatch();

    const items = useSelector(
        (state) => state.cart?.items || []
    );

    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 px-3 sm:px-6 py-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6">

                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                    Shopping Cart 🛒
                </h2>

                {items.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        Your cart is empty
                    </p>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        <div className="space-y-6">
                            {items.map((item) => {
                                const image =
                                    item.thumbnail ||
                                    item.images?.[0] ||
                                    "https://via.placeholder.com/100";

                                return (
                                    <div
                                        key={item.id}
                                        className="
                                            flex flex-col sm:flex-row
                                            sm:items-center
                                            gap-4
                                            border-b
                                            pb-4
                                        "
                                    >
                                        {/* IMAGE */}
                                        <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
                                            <img
                                                src={image}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* INFO */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-semibold text-base sm:text-lg">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm">
                                                ₹{item.price} each
                                            </p>
                                        </div>

                                        {/* QTY CONTROLS */}
                                        <div className="flex justify-center sm:justify-start items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    dispatch(decreaseQty(item.id))
                                                }
                                                className="w-9 h-9 border rounded hover:bg-gray-100"
                                            >
                                                −
                                            </button>

                                            <span className="font-semibold text-lg">
                                                {item.qty}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    dispatch(increaseQty(item.id))
                                                }
                                                className="w-9 h-9 border rounded hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* PRICE */}
                                        <div className="text-center sm:text-right font-semibold text-lg sm:w-28">
                                            ₹{item.price * item.qty}
                                        </div>

                                        {/* REMOVE */}
                                        <button
                                            onClick={() =>
                                                dispatch(removeFromCart(item.id))
                                            }
                                            className="text-red-500 text-sm hover:underline text-center sm:text-right"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-6 flex justify-between items-center text-lg sm:text-xl font-bold border-t pt-4">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                to="/"
                                className="
                                    text-center
                                    border border-black
                                    py-3
                                    rounded-lg
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Continue Shopping
                            </Link>

                            <Link
                                to="/checkout"
                                className="
                                    text-center
                                    bg-black
                                    text-white
                                    py-3
                                    rounded-lg
                                    hover:bg-gray-800
                                    transition
                                "
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
