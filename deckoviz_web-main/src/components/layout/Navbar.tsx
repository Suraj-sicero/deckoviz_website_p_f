"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Code, Palette, Zap, Music, Image as ImageIcon, Target, Box, Sprout, Cloud, Type, Thermometer, Wind, Shield, Activity, BarChart3, Mountain, Star, Gem, Building2, Microscope, Flame, ArrowRight, User, LogOut, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";

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
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg px-8 py-2.5 text-sm tracking-wide relative z-10";

  const variantClasses = {
    primary: "text-white transform hover:scale-[1.05] hover:-translate-y-1",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (variant === "primary") {
    return (
      <div className="relative inline-block">
        {/* Animated Border Glow - Colors flow around perimeter */}
        <div
          className="absolute -inset-[1px] rounded-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, 
              #3B82F6, #8B5CF6, #3B82F6, #8B5CF6)`,
            backgroundSize: "300% 100%",
            filter: "blur(6px)",
            zIndex: -1,
            animation: "flowColors 4s linear infinite",
          }}
        />

        <button
          className={`${classes} group`}
          style={{
            background: `linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)`,
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(29, 78, 216, 0.4)
            `,
            textShadow: `0 1px 2px rgba(0, 0, 0, 0.2)`,
            border: "1px solid rgba(30, 58, 138, 0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1),
              0 6px 16px rgba(37, 99, 235, 0.6)
            `;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1),
              0 4px 12px rgba(29, 78, 216, 0.4)
            `;
          }}
          {...props}
        >
          {children}
        </button>

        {/* Keyframes for color flow */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes flowColors {
              0% { background-position: 0% 0%; }
              100% { background-position: 100% 0%; }
            }
          `,
          }}
        />
      </div>
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
  fallbackColor = "bg-gradient-to-br from-purple-100 to-purple-200",
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
    console.log("Buy Now clicked");
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
        className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"} ${!isNavbarVisible ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"} print:hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Desktop Left Corner - Wall/Leader Hamburger Menu - Extreme Left */}
          <div className="hidden md:block fixed left-4 top-3.5 z-50">
            <button
              onMouseEnter={() => setIsWallLeaderDropdownOpen(true)}
              onMouseLeave={() => setIsWallLeaderDropdownOpen(false)}
              className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 p-2 rounded-lg hover:bg-purple-50 transform hover:scale-110 bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100"
            >
              <Menu size={20} />
            </button>

            {/* Wall Of Love & Leaderboard Dropdown - Enhanced Design */}
            <div
              className={`absolute top-full left-0 mt-2 transition-all duration-500 ease-out ${isWallLeaderDropdownOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
                }`}
              onMouseEnter={() => setIsWallLeaderDropdownOpen(true)}
              onMouseLeave={() => setIsWallLeaderDropdownOpen(false)}
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
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50"
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

          <div className="flex items-center justify-between h-16 md:pl-16">
            {/* Desktop Main Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <button className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group flex items-center space-x-1">
                  <span>Deckoviz For Businesses</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isBusinessDropdownOpen ? "rotate-180" : ""}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
                </button>

                {/* Beautiful Dropdown with Optimized Images */}
                <div
                  className={`absolute top-full left-0 mt-2 transition-all duration-500 ease-out ${isBusinessDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-4"
                    }`}
                >
                  <div className="w-[640px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#8345EE]/10 via-[#7239D3]/5 to-[#6B2FD6]/10 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Choose Your Industry
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Discover how Deckoviz transforms your space{" "}
                      </p>
                    </div>

                    {/* Scrollable content area */}
                    <div className="overflow-y-auto max-h-[60vh]">
                      <div className="p-6">
                        {/* Grid of other categories */}
                        <div className="grid grid-cols-2 gap-3">
                          {otherCategories.map((category, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleBusinessNavigation(category.route)
                              }
                              className="group relative p-4 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                              }}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                              ></div>
                              <div className="relative z-10 flex items-start space-x-3">
                                <div className="w-8 h-8 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                  <OptimizedImage
                                    src={category.image}
                                    alt={category.title}
                                    className="w-8 h-8"
                                    fallbackColor={category.fallbackColor}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                                    {category.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <svg
                                  width="16"
                                  height="16"
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
                            </button>
                          ))}
                        </div>

                        {/* MODIFICATION: Centered Enterprise button at the bottom */}
                        {enterpriseCategory && (
                          <div className="flex justify-center mt-3">
                            <button
                              key="enterprises"
                              onClick={() =>
                                handleBusinessNavigation(
                                  enterpriseCategory.route,
                                )
                              }
                              className="group relative p-4 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden w-full max-w-xs"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                              }}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${enterpriseCategory.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                              ></div>
                              <div className="relative z-10 flex items-start space-x-3">
                                <div className="w-8 h-8 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                                  <OptimizedImage
                                    src={enterpriseCategory.image}
                                    alt={enterpriseCategory.title}
                                    className="w-8 h-8"
                                    fallbackColor={
                                      enterpriseCategory.fallbackColor
                                    }
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                                    {enterpriseCategory.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                                    {enterpriseCategory.description}
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <svg
                                  width="16"
                                  height="16"
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
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        Can't find your industry?{" "}
                        <a
                          href="/contact"
                          className="text-[#8345EE] hover:underline cursor-pointer font-medium"
                        >
                          Contact Us
                        </a>{" "}
                        for custom solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/pricing"
                className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>

            </div>

            {/* Center Logo */}
            <a href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1 z-50">
              <img
                src="/images/deckovizlogo.png"
                alt="Deckoviz Symbol"
                className="h-7 sm:h-8 md:h-12 w-auto object-contain"
              />
              <img
                src="/images/new_logoo.jpeg"
                alt="Deckoviz Space Labs Logo"
                className="h-7 sm:h-8 md:h-12 w-auto object-contain"
              />
            </a>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/blog"
                className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group"
              >
                About us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
              <Button variant="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>

              {/* User Profile / Login */}
              <div className="relative ml-2">
                {user ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsUserDropdownOpen(true)}
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-2 p-1.5 rounded-full bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                        <User size={16} />
                      </div>
                      <ChevronDown size={14} className={`text-purple-600 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* User Dropdown */}
                    <div className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 ${isUserDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                          <p className="text-xs text-purple-600 font-bold mt-1">🪙 {user.credits} Credits</p>
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
                    className="px-5 py-2.5 rounded-xl border-2 border-purple-100 text-purple-600 font-bold text-sm hover:bg-purple-50 transition-all"
                  >
                    Login
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 z-50 pl-2">
                {/* Previous */}
                <button
                  onClick={prev}
                  className="p-2 rounded-full bg-white/80 backdrop-blur shadow border hover:bg-blue-50 transition transform hover:scale-110"
                >
                  <SkipBack size={18} className="text-blue-600" />
                </button>


                {/* Play / Pause */}
                <button
                  onClick={toggle}
                  className="p-2 rounded-full bg-white/80 backdrop-blur shadow border hover:bg-blue-50 transition transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Volume2 size={20} className="text-blue-600" />
                  ) : (
                    <VolumeX size={20} className="text-gray-400" />
                  )}
                </button>

                {/* Next */}
                <button
                  onClick={next}
                  className="p-2 rounded-full bg-white/80 backdrop-blur shadow border hover:bg-blue-50 transition transform hover:scale-110"
                >
                  <SkipForward size={18} className="text-blue-600" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button with cool animation */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-[#8345EE] transition-all duration-300 p-2 rounded-lg hover:bg-purple-50 transform hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"}`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Optimized Images */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-out ${isOpen ? "top-16 opacity-100 visible" : "top-16 opacity-0 invisible"
            }`}
          style={{
            maxHeight: isOpen ? "calc(100vh - 4rem)" : "0",
            overflowY: "auto",
          }}
        >
          <div className="px-4 py-6 space-y-0">
            {/* Mobile Business Dropdown */}
            <div className="mb-4">
              <button
                onClick={() =>
                  setIsBusinessDropdownOpen(!isBusinessDropdownOpen)
                }
                className="w-full text-left text-gray-700 hover:text-[#8345EE] transition-all duration-200 font-medium py-3 px-3 rounded-lg hover:bg-purple-50 flex items-center justify-between"
              >
                <span>Deckoviz For Business</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isBusinessDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Business Categories Dropdown */}
              <div
                className={`overflow-hidden transition-all duration-200 ${isBusinessDropdownOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="pl-4 space-y-1 mt-2 max-h-[350px] overflow-y-auto">
                  {businessCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleBusinessNavigation(category.route)}
                      className="w-full text-left text-gray-600 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 py-2 px-3 rounded-lg text-sm flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        {/* OPTIMIZATION 2: Use OptimizedImage in mobile too */}
                        <OptimizedImage
                          src={category.image}
                          alt={category.title}
                          className="w-6 h-6"
                          fallbackColor={category.fallbackColor}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {category.title}
                        </div>
                        <p className="text-xs text-gray-500 truncate">
                          {category.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>



            {/* Other Navigation Items */}
            <div className="border-t border-gray-200 pt-4 space-y-0">
              <a
                href="/Wall-Of-Love"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Wall Of Love
              </a>

              <a
                href="/Leaderboard"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Leaderboard
              </a>

              <a
                href="/contact"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>

              <a
                href="/pricing"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>

              <a
                href="/blog"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>

              <a
                href="/about"
                className="block text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 font-medium py-3 px-3 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                About us
              </a>

              <div className="pt-4 space-y-3">
                {user ? (
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                        <p className="text-xs text-purple-600 font-bold">🪙 {user.credits} Credits</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm text-red-600 font-bold bg-white border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { openAuthModal(); setIsOpen(false); }}
                    className="w-full py-3 rounded-xl border-2 border-purple-100 text-purple-600 font-bold text-sm hover:bg-purple-50 transition-all"
                  >
                    Login / Sign Up
                  </button>
                )}
                
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
