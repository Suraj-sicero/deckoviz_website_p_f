"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Code, Palette, Zap, Music, Image as ImageIcon, Target, Box, Sprout, Cloud, Type, Thermometer, Wind, Shield, Activity, BarChart3, Mountain, Star, Gem, Building2, Microscope, Flame, ArrowRight, User, LogOut, Volume2, VolumeX, SkipBack, SkipForward, ShoppingBag } from "lucide-react";

import { useAudio } from "../AudioProvider";
import { useAuth } from "../../context/AuthContext";

// Button component with proper types
interface ButtonProps {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold transition-all duration-500 rounded-full px-6 py-2.5 text-sm tracking-widest uppercase overflow-hidden relative z-10 group whitespace-nowrap";

  const variantClasses = {
    primary: "text-white transform hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98]",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (variant === "primary") {
    return (
      <button
        className={`${classes} bg-gradient-to-r from-[#182A4A] to-[#2563EB] shadow-md border border-white/20`}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <ShoppingBag size={16} strokeWidth={2.5} className="text-white/90" />
          {children}
        </span>
      </button>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// OPTIMIZATION 1: Preload Component for Images
const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // List of all images used in dropdowns
    const imagesToPreload = [
      "/images/hotelnavbar.png",
      "/images/restaurantnavbar.png",
      "/images/architectnavbar.png",
      "/images/officenavbar.png",
      "/images/realestatenavbar.png",
      "/images/therapistnavbar.png",
      "/images/schoolnavbar.png",
      "/images/retailnavbar.png",
      "/images/newenterpriselogo.png",
    ];


    // Preload all images
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Optional: Add to cache with specific loading attributes
      img.loading = "eager";
    });
  }, []);

  return null; // This component doesn't render anything
};

// OPTIMIZATION 2: Optimized Image Component with Fallback
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  fallbackColor = "bg-gradient-to-br from-violet-100 to-indigo-200",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Fallback/Loading state */}
      {(!imageLoaded || imageError) && (
        <div
          className={`absolute inset-0 ${fallbackColor} rounded-lg flex items-center justify-center`}
        >
          {imageError ? (
            // Error state - show first letter of alt text
            <span className="text-white font-semibold text-xs">
              {alt.charAt(0)}
            </span>
          ) : (
            // Loading state - simple animation
            <div className="w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
          )}
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="eager" // Load immediately, don't wait for viewport
        decoding="async" // Non-blocking decode
      />
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] =
    useState<boolean>(false);

  const [isWallLeaderDropdownOpen, setIsWallLeaderDropdownOpen] =
    useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const { isPlaying, toggle, next, prev } = useAudio();
  const { user, logout, openAuthModal } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // NEW: Auto-hide Navbar logic for Developer Specs
  useEffect(() => {
    if (!currentPath.startsWith("/developer-specs/")) {
      setIsNavbarVisible(true);
      return;
    }

    let hideTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if mouse is in the top 100px or moving
      if (e.clientY < 100) {
        setIsNavbarVisible(true);
        clearTimeout(hideTimeout);
      } else {
        // If mouse is in the "space" (below 100px), set a timer to hide it
        setIsNavbarVisible(true); // Keep visible while moving
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          setIsNavbarVisible(false);
        }, 2000); // Hide after 2 seconds of inactivity in the "space"
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimeout);
    };
  }, [currentPath]);

  const handleBuyNow = (): void => {
    window.location.href = "/place-order";
    console.log("Order Now clicked");
  };

  const handleBusinessNavigation = (route: string): void => {
    window.location.href = route;
    setIsBusinessDropdownOpen(false);
    setIsOpen(false);
  };

  // OPTIMIZATION 3: Move business categories to top level to avoid recreation
  const businessCategories = [
    {
      title: "Hotels & Resorts",
      description: "Elevate guest experiences",
      image: "/images/hotelnavbar.png",
      gradient: "from-blue-500 to-cyan-500",
      route: "/deckoviz-for-hotels",
      fallbackColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
    },
    {
      title: "Restaurants & Cafés",
      description: "Create dining ambiance",
      image: "/images/restaurantnavbar.png",
      gradient: "from-orange-500 to-red-500",
      route: "/deckoviz-for-restaurants",
      fallbackColor: "bg-gradient-to-br from-orange-100 to-red-100",
    },

    {
      title: "Architects & Designers",
      description: "Design living spaces",
      image: "/images/architectnavbar.png",
      gradient: "from-blue-500 to-indigo-500",
      route: "/deckoviz-for-architects",
      fallbackColor: "bg-gradient-to-br from-blue-100 to-indigo-100",
    },
    {
      title: "Offices & Workspaces",
      description: "Inspire productivity",
      image: "/images/officenavbar.png",
      gradient: "from-green-500 to-emerald-500",
      route: "/deckoviz-for-enterprises",/*deckoviz-for-offices*/
      fallbackColor: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
    {
      title: "Real Estate",
      description: "Showcase properties",
      image: "/images/realestatenavbar.png",
      gradient: "from-indigo-500 to-blue-500",
      route: "/deckoviz-for-realestate",
      fallbackColor: "bg-gradient-to-br from-indigo-100 to-blue-100",
    },
    {
      title: "Wellness & Therapy",
      description: "Healing environments",
      image: "/images/therapistnavbar.png",
      gradient: "from-teal-500 to-cyan-500",
      route: "/deckoviz-for-enterprises",/*deckoviz-for-therapists*/
      fallbackColor: "bg-gradient-to-br from-teal-100 to-cyan-100",
    },
    {
      title: "Schools & Learning",
      description: "Educational spaces",
      image: "/images/schoolnavbar.png",
      gradient: "from-yellow-500 to-orange-500",
      route: "/deckoviz-for-enterprises",/*deckoviz-for-schools*/
      fallbackColor: "bg-gradient-to-br from-yellow-100 to-orange-100",
    },
    {
      title: "Retail & Showrooms",
      description: "Shopping experiences",
      image: "/images/retailnavbar.png",
      gradient: "from-pink-500 to-rose-500",
      route: "/deckoviz-for-retailstores",
      fallbackColor: "bg-gradient-to-br from-pink-100 to-rose-100",
    },
    {
      title: "Enterprises",
      description: "Crafting exquisite spaces",
      image: "/images/newenterpriselogo.png",
      gradient: "from-pink-500 to-rose-500",
      route: "/deckoviz-for-enterprises",
      fallbackColor: "bg-gradient-to-br from-pink-100 to-rose-100",
    },
  ];

  // Separate Enterprise from other categories for custom layout
  const enterpriseCategory = businessCategories.find(
    (cat) => cat.title === "Enterprises",
  );
  const otherCategories = businessCategories.filter(
    (cat) => cat.title !== "Enterprises",
  );



  return (
    <>
      {/* OPTIMIZATION 1: Add Image Preloader */}
      <ImagePreloader />

      <nav
        className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-700 pointer-events-none ${!isNavbarVisible ? "-translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"} print:hidden`}
      >
        <div 
          className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl h-14 rounded-full px-2 md:px-4 transition-all duration-700 ${
            isScrolled 
              ? "bg-white/40 backdrop-blur-2xl backdrop-saturate-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" 
              : "bg-white/20 hover:bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
          }`}
        >
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6 flex-1">
            {/* Wall/Leader Hamburger Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsWallLeaderDropdownOpen(true)}
              onMouseLeave={() => setIsWallLeaderDropdownOpen(false)}
            >
              <button
                className="text-gray-600 hover:text-[#2563EB] transition-all duration-300 p-2 rounded-xl border border-white/30 hover:bg-white/40 hover:border-white/50 shadow-sm flex items-center justify-center bg-white/20 backdrop-blur-sm"
              >
                <Menu size={18} />
              </button>

              {/* Wall Of Love & Leaderboard Dropdown */}
              <div
                className={`absolute top-full left-0 mt-4 transition-all duration-500 ease-out z-[60] ${isWallLeaderDropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-4"
                  }`}
              >
              <div className="w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#8345EE]/10 via-[#7239D3]/5 to-[#6B2FD6]/10 px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Community
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Connect with our community
                  </p>
                </div>

                {/* Menu Items */}
                <div className="p-3 space-y-1">
                  <a
                    href="/Wall-Of-Love"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-pink-50 hover:to-indigo-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">
                        Wall Of Love
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        Customer testimonials
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>

                  <a
                    href="/Leaderboard"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 9h1.5a2.5 2.5 0 0 0 0-5H14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 9v12l6-3 6 3V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">
                        Leaderboard
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        Top performers
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>

                  <a
                    href="/contact"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <polyline
                          points="22,6 12,13 2,6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300">
                        Contact Us
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        Get in touch
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            </div>

            {/* Main Links */}
            <div className="flex items-center space-x-1 lg:space-x-6">
              <div
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <button className={`transition-colors duration-300 font-semibold text-sm relative group flex items-center space-x-1 px-2 py-2 ${currentPath.includes('deckoviz-for') ? 'text-[#2563EB]' : 'text-gray-500 hover:text-[#2563EB]'}`}>
                  <span>Deckoviz For Businesses</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isBusinessDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Beautiful Dropdown with Optimized Images */}
                <div
                  className={`absolute top-full left-0 mt-2 transition-all duration-500 ease-out ${isBusinessDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-4"
                    }`}
                >
                  <div className="w-[660px] backdrop-blur-2xl rounded-3xl shadow-[0_32px_80px_rgba(24,42,74,0.22)] border border-white/60 overflow-hidden flex flex-col"
                    style={{ background: "rgba(255,255,255,0.97)" }}
                  >
                    {/* Premium Header */}
                    <div className="relative px-6 py-5 overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #182A4A 0%, #1e3a6e 40%, #2563EB 100%)" }}
                    >
                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />
                      <div className="absolute top-0 right-0 w-48 h-48 opacity-10" style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }} />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Deckoviz For Business</p>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">Choose Your Industry</h3>
                        <p className="text-sm text-blue-200/80 mt-1">Discover how Deckoviz transforms your space</p>
                      </div>
                    </div>

                    {/* Scrollable content area */}
                    <div className="overflow-y-auto max-h-[62vh]">
                      <div className="p-5">
                        {/* Featured Enterprise Card */}
                        {enterpriseCategory && (
                          <button
                            key="enterprises"
                            onClick={() => handleBusinessNavigation(enterpriseCategory.route)}
                            className="group relative w-full mb-4 p-4 rounded-2xl text-left overflow-hidden transition-all duration-400 hover:scale-[1.015] hover:-translate-y-0.5"
                            style={{
                              background: "linear-gradient(135deg, rgba(24,42,74,0.06) 0%, rgba(37,99,235,0.08) 100%)",
                              border: "1.5px solid rgba(37,99,235,0.18)",
                              boxShadow: "0 4px 20px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.8)"
                            }}
                          >
                            {/* Hover glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                              style={{ background: "linear-gradient(135deg, rgba(24,42,74,0.10) 0%, rgba(37,99,235,0.13) 100%)" }} />
                            {/* Left accent bar */}
                            <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-indigo-600 to-blue-500" />
                            <div className="relative z-10 flex items-center gap-4 pl-3">
                              <div className="w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden shadow-md transform group-hover:scale-105 transition-transform duration-300"
                                style={{ background: "linear-gradient(135deg, #182A4A, #2563EB)" }}
                              >
                                <OptimizedImage
                                  src={enterpriseCategory.image}
                                  alt={enterpriseCategory.title}
                                  className="w-12 h-12"
                                  fallbackColor={enterpriseCategory.fallbackColor}
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-[#182A4A] text-base group-hover:text-blue-700 transition-colors duration-300">{enterpriseCategory.title}</h4>
                                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-2 py-0.5 rounded-full">Featured</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors">{enterpriseCategory.description}</p>
                              </div>
                              <ArrowRight size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                            </div>
                          </button>
                        )}

                        {/* Grid of industry cards */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {otherCategories.map((category, index) => (
                            <button
                              key={index}
                              onClick={() => handleBusinessNavigation(category.route)}
                              className="group relative p-3.5 rounded-xl text-left overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                              style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.95) 100%)",
                                border: "1px solid rgba(226,232,240,0.8)",
                                boxShadow: "0 2px 8px rgba(31,38,135,0.05), inset 0 1px 0 rgba(255,255,255,1)"
                              }}
                            >
                              {/* Hover gradient wash */}
                              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${category.gradient}`} style={{ opacity: 0 }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.07')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                              />
                              {/* Color accent left bar */}
                              <div className={`absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-r-full bg-gradient-to-b ${category.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
                              <div className="relative z-10 flex items-center gap-3 pl-2">
                                <div className="w-9 h-9 flex-shrink-0 rounded-lg overflow-hidden transform group-hover:scale-110 transition-transform duration-300"
                                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                                >
                                  <OptimizedImage
                                    src={category.image}
                                    alt={category.title}
                                    className="w-9 h-9"
                                    fallbackColor={category.fallbackColor}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300 leading-tight truncate">{category.title}</h4>
                                  <p className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-600 transition-colors duration-300 truncate">{category.description}</p>
                                </div>
                                <ArrowRight size={13} className="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3.5 border-t border-gray-100/80"
                      style={{ background: "linear-gradient(to right, rgba(238,242,255,0.8), rgba(255,255,255,0.9))" }}
                    >
                      <p className="text-xs text-gray-400 text-center">
                        Can't find your industry?{" "}
                        <a href="/contact" className="font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent hover:from-indigo-800 hover:to-blue-700 transition-all duration-300">Contact Us</a>{" "}
                        for custom solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/pricing"
                className={`transition-colors duration-300 font-semibold text-sm relative group whitespace-nowrap px-2 py-2 ${currentPath.startsWith('/pricing') ? 'text-[#2563EB]' : 'text-gray-500 hover:text-[#2563EB]'}`}
              >
                Pricing
              </a>
              <a
                href="/blog"
                className={`transition-colors duration-300 font-semibold text-sm relative group whitespace-nowrap px-2 py-2 ${currentPath.startsWith('/blog') ? 'text-[#2563EB]' : 'text-gray-500 hover:text-[#2563EB]'}`}
              >
                Blog
              </a>
            </div>
          </div>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex justify-center items-center z-50">
              <a href="/" className="flex items-center">
                <img
                  src="/images/deckovizlogo.png"
                  alt="Deckoviz Symbol"
                  className="h-10 sm:h-12 md:h-12 w-auto object-contain"
                />
                <img
                  src="/images/bg_removed_logo.png"
                  alt="Deckoviz Space Labs Logo"
                  className="h-10 sm:h-12 md:h-12 w-auto object-contain -ml-2"
                />
              </a>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1 justify-end">

              {/* User Profile / Login */}
              <div className="relative mx-2">
                {user ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsUserDropdownOpen(true)}
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-2 p-1.5 rounded-full bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center text-white shadow-sm">
                        <User size={16} />
                      </div>
                      <ChevronDown size={14} className={`text-[#182A4A] transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown */}
                    <div className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 ${isUserDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                          <p className="text-xs text-[#2563EB] font-bold mt-1">🪙 {user.credits} Credits</p>
                        </div>
                        <div className="p-2">
                          <button 
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => openAuthModal()}
                    className="transition-colors duration-300 font-semibold text-sm relative group whitespace-nowrap px-2 py-2 text-gray-500 hover:text-[#2563EB]"
                  >
                    Login
                  </button>
                )}
              </div>

              <Button variant="primary" onClick={handleBuyNow}>
                Order Now
              </Button>

              <div className="flex items-center gap-1 z-50 pl-3 ml-2 border-l border-gray-200/30">
                {/* Previous */}
                <button
                  onClick={prev}
                  className="p-1.5 rounded-full text-[#2563EB]/70 hover:text-[#2563EB] hover:bg-white/60 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
                  title="Previous Track"
                >
                  <SkipBack size={15} strokeWidth={2.5} />
                </button>

                {/* Play / Pause */}
                <button
                  onClick={toggle}
                  className="p-1.5 rounded-full bg-gradient-to-br from-[#182A4A] to-[#2563EB] text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
                  title={isPlaying ? "Pause Music" : "Play Music"}
                >
                  {isPlaying ? (
                    <Volume2 size={16} strokeWidth={2.5} className="animate-pulse" />
                  ) : (
                    <VolumeX size={16} strokeWidth={2.5} />
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={next}
                  className="p-1.5 rounded-full text-[#2563EB]/70 hover:text-[#2563EB] hover:bg-white/60 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
                  title="Next Track"
                >
                  <SkipForward size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Mobile controls row: audio + hamburger */}
            <div className="md:hidden flex items-center gap-1">
              {/* Mini audio controls */}
              <div className="flex items-center gap-0.5">
                <button onClick={prev} className="p-1.5 rounded-full text-[#2563EB]/70 hover:text-[#2563EB] hover:bg-white/60 transition-all duration-300 flex items-center justify-center" title="Previous">
                  <SkipBack size={13} strokeWidth={2.5} />
                </button>
                <button onClick={toggle} className="p-1.5 rounded-full bg-gradient-to-br from-[#182A4A] to-[#2563EB] text-white shadow-md shadow-blue-500/20 transition-all duration-300 flex items-center justify-center" title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Volume2 size={13} strokeWidth={2.5} className="animate-pulse" /> : <VolumeX size={13} strokeWidth={2.5} />}
                </button>
                <button onClick={next} className="p-1.5 rounded-full text-[#2563EB]/70 hover:text-[#2563EB] hover:bg-white/60 transition-all duration-300 flex items-center justify-center" title="Next">
                  <SkipForward size={13} strokeWidth={2.5} />
                </button>
              </div>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#2563EB] transition-all duration-300 p-2 rounded-full hover:bg-white/50 border border-white/30 bg-white/20 backdrop-blur-sm"
              >
                <div className="relative w-5 h-5">
                  <Menu size={20} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X size={20} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'}`} />
                </div>
              </button>
            </div>
        </div>

        {/* Mobile Navigation - Premium Glassmorphic Drawer */}
        <div
          className={`md:hidden fixed left-3 right-3 z-40 transition-all duration-500 ease-out ${
            isOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
          style={{ top: '4.5rem' }}
        >
          <div
            className="rounded-3xl overflow-hidden shadow-2xl border border-white/30"
            style={{
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: '0 20px 60px rgba(31,38,135,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            {/* Header strip */}
            <div className="px-5 py-4 border-b border-white/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/images/deckovizlogo.png" alt="Deckoviz" className="h-7 w-auto" />
                <img src="/images/bg_removed_logo.png" alt="Deckoviz" className="h-7 w-auto -ml-1" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/60 border border-white/40 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">

              {/* Business Dropdown */}
              <div>
                <button
                  onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-gray-700 font-semibold text-sm hover:bg-white/60 transition-all duration-200"
                >
                  <span>Deckoviz For Business</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isBusinessDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isBusinessDropdownOpen ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-2 gap-2 px-2 pb-2">
                    {businessCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleBusinessNavigation(category.route)}
                        className="flex items-center gap-2 p-3 rounded-xl bg-white/50 border border-white/60 hover:bg-white/80 transition-all duration-200 text-left"
                      >
                        <div className="w-6 h-6 flex-shrink-0">
                          <OptimizedImage src={category.image} alt={category.title} className="w-6 h-6" fallbackColor={category.fallbackColor} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-gray-800 leading-tight truncate">{category.title}</div>
                          <p className="text-[10px] text-gray-500 truncate">{category.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nav links */}
              {[
                { href: '/Wall-Of-Love', label: '❤️ Wall Of Love' },
                { href: '/Leaderboard', label: '🏆 Leaderboard' },
                { href: '/pricing', label: '💎 Pricing' },
                { href: '/blog', label: '📝 Blog' },
                { href: '/contact', label: '✉️ Contact Us' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 rounded-2xl text-gray-700 font-semibold text-sm hover:bg-white/60 hover:text-[#2563EB] transition-all duration-200"
                >
                  {label}
                </a>
              ))}

              {/* Divider */}
              <div className="h-px bg-white/40 mx-2 my-2" />

              {/* User / Login + Buy Now */}
              <div className="space-y-2 pt-1 pb-2">
                {user ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border border-blue-100/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center text-white shadow-sm">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                        <p className="text-xs text-[#2563EB] font-bold">🪙 {user.credits} Credits</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-red-600 font-bold bg-white/80 border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { openAuthModal(); setIsOpen(false); }}
                    className="w-full py-3 rounded-2xl border-2 border-blue-100 text-[#2563EB] font-bold text-sm hover:bg-blue-50/50 transition-all bg-white/40"
                  >
                    Login / Sign Up
                  </button>
                )}

                <button
                  onClick={() => { handleBuyNow(); setIsOpen(false); }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} strokeWidth={2.5} />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
