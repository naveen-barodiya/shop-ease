import { Link } from "react-router-dom";
import React from "react";
export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">
                        ShopEase
                    </h2>
                    <p className="text-sm">
                        Your one-stop shop for groceries, fashion, beauty & more.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                        <li><Link to="/login" className="hover:text-white">Login</Link></li>
                        <li><Link to="/register" className="hover:text-white">Register</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Categories
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li>Groceries</li>
                        <li>Fashion</li>
                        <li>Beauty</li>
                        <li>Electronics</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                        Contact Us
                    </h3>
                    <p className="text-sm">📧 support@shopease.com</p>
                    <p className="text-sm">📞 +91 98765 43210</p>
                    <p className="text-sm">📍 India</p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 text-center py-4 text-sm">
                © {new Date().getFullYear()} ShopEase. All rights reserved.
            </div>
        </footer>
    );
}
