import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import React from "react";

/* 🔥 SKELETON */
const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
        <div className="h-36 sm:h-40 bg-gray-200 rounded mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
);

export default function Home() {
    const dispatch = useDispatch();
    const location = useLocation();
    const loadMoreRef = useRef(null);

    const { items, loading } = useSelector((state) => state.products);

    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);

    /* 🔥 HERO SLIDES */
    const heroSlides = [
        {
            title: "Big Grocery Sale 🛒",
            subtitle: "Up to 50% off on daily essentials",
            badge: "LIMITED TIME",
            perks: ["Free Delivery", "COD", "Easy Returns"],
            image:
                "https://marketplace.canva.com/EAGESJOBOHY/1/0/1600w/canva-beige-and-orange-illustrative-food-market-presentation-mDfix_fCpos.jpg",
        },
        {
            title: "Fashion Fiesta 👕",
            subtitle: "Flat 40% off on latest trends",
            badge: "TRENDING",
            perks: ["New Arrivals", "Top Brands"],
            image:
                "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
        },
        {
            title: "Beauty & Makeup 💄",
            subtitle: "Buy 1 Get 1 Free",
            badge: "HOT DEAL",
            perks: ["Original Products", "Best Sellers"],
            image:
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        },
        {
            title: "Electronics Deals ⚡",
            subtitle: "Best prices on gadgets",
            badge: "MEGA SALE",
            perks: ["No Cost EMI", "1 Year Warranty", "Top Rated"],
            image:
                "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
        {
            title: "Mega Coupon 🎟️",
            subtitle: "Use SAVE20 & get extra 20% off",
            badge: "EXCLUSIVE",
            perks: ["Limited Users", "Stackable Offers", "Instant Savings"],
            image:
                "https://www.hostgator.com/blog/wp-content/uploads/2021/12/create-coupon-strategy-for-ecommerce-store.jpeg",
        },
    ];

    /* FETCH */
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    /* AUTO SLIDER */
    useEffect(() => {
        const id = setInterval(() => {
            setCurrentSlide((p) =>
                p === heroSlides.length - 1 ? 0 : p + 1
            );
        }, 3500);
        return () => clearInterval(id);
    }, []);

    /* NAV SCROLL FIX */
    useEffect(() => {
        if (location.state?.scrollTo && items.length > 0) {
            const el = document.getElementById(
                `category-${location.state.scrollTo}`
            );
            el && el.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.state, items]);

    /* SEARCH */
    const filteredItems = items.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    /* GROUP */
    const groupedProducts = filteredItems.reduce((acc, p) => {
        acc[p.category] = acc[p.category] || [];
        acc[p.category].push(p);
        return acc;
    }, {});

    /* VIEW */
    const handleViewMore = (cat) =>
        setVisibleCount((p) => ({
            ...p,
            [cat]: (p[cat] || 4) + 4,
        }));

    const handleViewLess = (cat) =>
        setVisibleCount((p) => ({ ...p, [cat]: 4 }));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO SECTION */}


            <section className="relative">
                <div
                    className="h-[220px] sm:h-[300px] md:h-[420px] flex items-center justify-center bg-cover bg-center text-white"
                    style={{
                        backgroundImage: `
            linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),
            url(${heroSlides[currentSlide].image})
          `,
                    }}
                >
                    <div className="text-center px-4 max-w-3xl">
                        <span className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-semibold mb-3">
                            {heroSlides[currentSlide].badge}
                        </span>

                        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-2">
                            {heroSlides[currentSlide].title}
                        </h1>

                        <p className="text-sm sm:text-lg mb-4">
                            {heroSlides[currentSlide].subtitle}
                        </p>

                        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                            {heroSlides[currentSlide].perks.map((p, i) => (
                                <span
                                    key={i}
                                    className="bg-white/10 px-3 py-1 rounded-full"
                                >
                                    ✅ {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DOTS */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === i ? "bg-white" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </section>
            {/* 🔍 SEARCH */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full md:w-1/2 p-3 rounded-lg border focus:ring-2 focus:ring-black"
                />
            </div>

            {/* 🛍 PRODUCTS */}
            <div className="max-w-7xl mx-auto px-4 pb-20">

                {/* ✅ SKELETON GRID (FIXED) */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* ✅ PRODUCTS GRID (FIXED) */}
                {!loading &&
                    Object.keys(groupedProducts).map((cat) => {
                        const visible = visibleCount[cat] || 4;
                        const total = groupedProducts[cat].length;

                        return (
                            <section
                                key={cat}
                                id={`category-${cat}`}
                                className="mb-14"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl sm:text-2xl font-bold capitalize">
                                        {cat.replace("-", " ")}
                                    </h2>

                                    <div className="flex gap-4 text-sm">
                                        {visible < total && (
                                            <button
                                                onClick={() => handleViewMore(cat)}
                                                className="hover:underline"
                                            >
                                                View More →
                                            </button>
                                        )}
                                        {visible > 4 && (
                                            <button
                                                onClick={() => handleViewLess(cat)}
                                                className="text-gray-500 hover:underline"
                                            >
                                                View Less
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {groupedProducts[cat]
                                        .slice(0, visible)
                                        .map((p) => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                </div>
                            </section>
                        );
                    })}
            </div>
        </div>
    );
}









