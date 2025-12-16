// import { Link } from "react-router-dom";
// import React from "react";
// export default function ProductCard({ product }) {
//     if (!product) return null;

//     const image =
//         product.thumbnail ||
//         product.images?.[0] ||
//         "https://dummyjson.com/products";

//     return (
//         <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
//             <div className="h-48 bg-gray-100 overflow-hidden">
//                 <img
//                     src={image}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                 />
//             </div>

//             <div className="p-4">
//                 <h2 className="font-semibold truncate">{product.title}</h2>
//                 <p className="text-gray-600">₹{product.price}</p>

//                 <Link
//                     to={`/product/${product.id}`}
//                     className="block mt-3 bg-black text-white text-center py-2 rounded"
//                 >
//                     View Details
//                 </Link>
//             </div>
//         </div>
//     );
// }
import { Link } from "react-router-dom";
import React from "react";

export default function ProductCard({ product }) {
    if (!product) return null;

    const image =
        product.thumbnail ||
        product.images?.[0] ||
        "https://dummyjson.com/products";

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

            {/* IMAGE */}
            <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden">
                <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

                {/* DISCOUNT BADGE */}
                {product.discountPercentage && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {Math.round(product.discountPercentage)}% OFF
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2">

                {/* TITLE */}
                <h2 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 group-hover:text-black transition">
                    {product.title}
                </h2>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-black">
                        ₹{product.price}
                    </span>

                    {product.discountPercentage && (
                        <span className="text-sm text-gray-400 line-through">
                            ₹
                            {Math.round(
                                product.price / (1 - product.discountPercentage / 100)
                            )}
                        </span>
                    )}
                </div>

                {/* RATING */}
                {product.rating && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        ⭐ {product.rating} / 5
                    </div>
                )}

                {/* CTA */}
                <Link
                    to={`/product/${product.id}`}
                    className="mt-3 block w-full text-center bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
