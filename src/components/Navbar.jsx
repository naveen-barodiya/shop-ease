import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import React from "react";

export default function Navbar({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart?.items || []);
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const categories = [
        { key: "beauty", label: "Beauty", icon: "💄" },
        { key: "fragrances", label: "Fragrances", icon: "🌸" },
        { key: "furniture", label: "Furniture", icon: "🛋️" },
        { key: "groceries", label: "Groceries", icon: "🛒" },
    ];

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");

    // 🔥 Scroll to category
    const handleScroll = (category) => {
        setMenuOpen(false);

        if (location.pathname === "/") {
            const section = document.getElementById(`category-${category}`);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/", { state: { scrollTo: category } });
        }
    };

    // 🔥 Detect active category on scroll
    useEffect(() => {
        const handleScrollSpy = () => {
            categories.forEach((cat) => {
                const section = document.getElementById(`category-${cat.key}`);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 140 && rect.bottom >= 140) {
                        setActiveCategory(cat.key);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScrollSpy);
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, []);

    return (
        <nav className="
            sticky top-0 z-50
            bg-gradient-to-r from-[#0f172a] to-[#020617]
            shadow-lg
        ">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* LOGO */}
                <Link
                    to="/"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="text-2xl font-extrabold text-white tracking-wide"
                >
                    ShopEase
                </Link>

                {/* DESKTOP CATEGORIES */}
                <div className="hidden md:flex gap-8 relative cursor-pointer">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => handleScroll(cat.key)}
                            className="
                                relative flex items-center gap-1
                                text-sm font-medium capitalize
                                text-gray-300 hover:text-white
                                transition cursor-pointer
                            "
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>

                            {/* 🔥 SLIDING UNDERLINE */}
                            <span
                                className={`
                                    absolute left-0 -bottom-1 h-[2px] w-full
                                    bg-blue-400 rounded-full
                                    transition-all duration-300
                                    ${activeCategory === cat.key
                                        ? "opacity-100 scale-x-100"
                                        : "opacity-0 scale-x-0"}
                                `}
                                style={{ transformOrigin: "left" }}
                            />
                        </button>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4 text-white">

                    {/* CART */}
                    <Link to="/cart" className="relative font-medium">
                        Cart
                        {cartCount > 0 && (
                            <span className="
                                absolute -top-2 -right-3
                                bg-red-500 text-white text-xs
                                w-5 h-5 flex items-center justify-center
                                rounded-full
                            ">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* PROFILE / LOGIN */}
                    {user ? (
                        <Link to="/profile">
                            <div className="
                                w-10 h-10 rounded-full bg-white text-[#020617]
                                flex items-center justify-center font-bold
                                ring-2 ring-blue-400 overflow-hidden
                            ">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.name.charAt(0).toUpperCase()
                                )}
                            </div>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold"
                        >
                            Login
                        </Link>
                    )}

                    {/* HAMBURGER */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* 🔥 MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-[#020617] px-6 py-4 space-y-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => handleScroll(cat.key)}
                            className={`
                                flex items-center gap-2 w-full text-left
                                py-2 capitalize
                                ${activeCategory === cat.key
                                    ? "text-white underline underline-offset-4 decoration-blue-400"
                                    : "text-gray-300 hover:text-white"}
                            `}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
