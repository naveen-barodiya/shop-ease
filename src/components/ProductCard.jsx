import { Link } from "react-router-dom";
import React from "react";
export default function ProductCard({ product }) {
    if (!product) return null;

    const image =
        product.thumbnail ||
        product.images?.[0] ||
        "https://dummyjson.com/products";

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h2 className="font-semibold truncate">{product.title}</h2>
                <p className="text-gray-600">₹{product.price}</p>

                <Link
                    to={`/product/${product.id}`}
                    className="block mt-3 bg-black text-white text-center py-2 rounded"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
