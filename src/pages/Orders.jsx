import React, { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    // 🗑️ Cancel Order
    const confirmCancelOrder = () => {
        const updatedOrders = orders.filter(
            (order) => order.id !== selectedOrder.id
        );

        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        setShowModal(false);
        setSelectedOrder(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">

                {/* PAGE HEADER */}
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight">
                        My Orders
                    </h2>
                    <p className="text-gray-500 mt-2">
                        View order details, payment method & delivery status
                    </p>
                </div>

                {/* EMPTY STATE */}
                {orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-md text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-600 text-lg">
                            You haven’t placed any orders yet
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
                            >
                                {/* HEADER */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-4">
                                    <div>
                                        <p className="text-lg font-bold">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Placed on {order.date}
                                        </p>
                                    </div>

                                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold w-fit">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        {order.status}
                                    </span>
                                </div>

                                {/* ITEMS */}
                                <div className="mt-6 space-y-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.qty}
                                                </p>
                                            </div>

                                            <p className="font-semibold text-gray-800">
                                                ₹{item.price * item.qty}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* PROGRESS */}
                                <div className="mt-6">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Order Placed</span>
                                        <span>Delivered</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t pt-4">
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>
                                            Payment Method:{" "}
                                            <span className="font-semibold text-gray-800">
                                                {order.paymentMethod}
                                            </span>
                                        </p>
                                        <p className="text-orange-600 font-semibold">
                                            Cash on Delivery
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-xl font-extrabold">
                                            ₹{order.total}
                                        </div>

                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setShowModal(true);
                                            }}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm cursor-pointer"
                                        >
                                            Cancel Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 🔥 CONFIRMATION MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold mb-2">
                            Cancel Order?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to cancel this order?
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmCancelOrder}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
