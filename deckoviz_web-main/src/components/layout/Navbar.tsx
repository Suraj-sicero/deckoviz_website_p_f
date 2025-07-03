"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"

// Button component with proper types
interface ButtonProps {
  variant?: "primary" | "secondary"
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", children, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg px-8 py-2.5 text-sm tracking-wide relative z-10"

  const variantClasses = {
    primary:
      "text-white transform hover:scale-[1.05] hover:-translate-y-1",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

    if (variant === "primary") {
    return (
      <div className="relative inline-block">
        {/* Animated Border Glow - Colors flow around perimeter */}
        <div 
          className="absolute -inset-0.5 rounded-lg opacity-100"
          style={{
            background: `linear-gradient(90deg, 
              #8A2BE2, #FF1493, #9932CC, #FF69B4, 
              #8A2BE2, #FF1493, #9932CC, #FF69B4, 
              #8A2BE2, #FF1493)`,
            backgroundSize: '300% 100%',
            filter: 'blur(2px)',
            zIndex: -1,
            animation: 'flowColors 3s linear infinite'
          }}
        />
        
        <button 
          className={classes}
          style={{
            background: `linear-gradient(135deg, 
              #B19CD9 0%, #DDA0DD 25%, #DA70D6 50%, #C8A2C8 75%, #B19CD9 100%)`,
            boxShadow: `
              inset 0 0 30px rgba(138, 43, 226, 0.8),
              inset 0 0 20px rgba(255, 20, 147, 0.6),
              inset 0 0 40px rgba(186, 85, 211, 0.4),
              0 0 15px rgba(138, 43, 226, 0.3),
              0 0 25px rgba(255, 20, 147, 0.2)
            `,
            textShadow: `
              0 0 15px rgba(255, 255, 255, 1),
              0 0 25px rgba(138, 43, 226, 0.8),
              0 0 35px rgba(255, 20, 147, 0.6)
            `,
            border: '1px solid rgba(186, 85, 211, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 0 40px rgba(138, 43, 226, 1),
              inset 0 0 30px rgba(255, 20, 147, 0.8),
              inset 0 0 50px rgba(186, 85, 211, 0.6),
              0 0 20px rgba(138, 43, 226, 0.5),
              0 0 35px rgba(255, 20, 147, 0.4)
            `
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 0 30px rgba(138, 43, 226, 0.8),
              inset 0 0 20px rgba(255, 20, 147, 0.6),
              inset 0 0 40px rgba(186, 85, 211, 0.4),
              0 0 15px rgba(138, 43, 226, 0.3),
              0 0 25px rgba(255, 20, 147, 0.2)
            `
          }}
          {...props}
        >
          {children}
        </button>
        
        {/* Keyframes for color flow */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes flowColors {
              0% { background-position: 0% 0%; }
              100% { background-position: 100% 0%; }
            }
          `
        }} />
      </div>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [currentPath, setCurrentPath] = useState("")
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState<boolean>(false)
  const [isWallLeaderDropdownOpen, setIsWallLeaderDropdownOpen] = useState<boolean>(false)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSectionNav = (sectionId: string): void => {
    if (currentPath !== "/") {
      window.location.href = `/#${sectionId}`
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setIsOpen(false)
  }

  const handleBuyNow = (): void => {
    window.location.href = "/place-order"
    console.log("Buy Now clicked")
  }

  const handleBusinessNavigation = (route: string): void => {
    window.location.href = route
    setIsBusinessDropdownOpen(false)
    setIsOpen(false)
  }

  const businessCategories = [
    {
      title: "Hotels & Resorts",
      description: "Elevate guest experiences",
      image: "/images/hotelnavbar.png",
      gradient: "from-blue-500 to-cyan-500",
      route: "/deckoviz-for-hotels"
    },
    {
      title: "Restaurants & Cafés",
      description: "Create dining ambiance",
      image: "/images/restaurantnavbar.png",
      gradient: "from-orange-500 to-red-500",
      route: "/deckoviz-for-restaurants"
    },
    {
      title: "Architects & Designers",
      description: "Design living spaces",
      image: "/images/architectnavbar.png",
      gradient: "from-purple-500 to-pink-500",
      route: "/deckoviz-for-architects"
    },
    {
      title: "Offices & Workspaces",
      description: "Inspire productivity",
      image: "/images/officenavbar.png",
      gradient: "from-green-500 to-emerald-500",
      route: "/deckoviz-for-offices"
    },
    {
      title: "Real Estate",
      description: "Showcase properties",
      image: "/images/realestatenavbar.png",
      gradient: "from-indigo-500 to-blue-500",
      route: "/deckoviz-for-realestate"
    },
    {
      title: "Wellness & Therapy",
      description: "Healing environments",
      image: "/images/therapistnavbar.png",
      gradient: "from-teal-500 to-cyan-500",
      route: "/deckoviz-for-therapists"
    },
    {
      title: "Schools & Learning",
      description: "Educational spaces",
      image: "/images/schoolnavbar.png",
      gradient: "from-yellow-500 to-orange-500",
      route: "/deckoviz-for-schools"
    },
    {
      title: "Retail & Showrooms",
      description: "Shopping experiences",
      image: "/images/retailnavbar.png",
      gradient: "from-pink-500 to-rose-500",
      route: "/deckoviz-for-retailstores"
    }
  ]

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}
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
              className={`absolute top-full left-0 mt-2 transition-all duration-500 ease-out ${
                isWallLeaderDropdownOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-4'
              }`}
              onMouseEnter={() => setIsWallLeaderDropdownOpen(true)}
              onMouseLeave={() => setIsWallLeaderDropdownOpen(false)}
            >
              <div className="w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#8345EE]/10 via-[#7239D3]/5 to-[#6B2FD6]/10 px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800">Community</h3>
                  <p className="text-xs text-gray-600 mt-1">Connect with our community</p>
                </div>
                
                {/* Menu Items */}
                <div className="p-3 space-y-1">
                  <a
                    href="/Wall-Of-Love"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                  
                  <a
                    href="/Leaderboard"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 9h1.5a2.5 2.5 0 0 0 0-5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9v12l6-3 6 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                  
                  <a
                    href="/contact"
                    className="group relative p-3 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden flex items-center space-x-3 bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between h-16">
            {/* Desktop Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div 
                className="relative"
                onMouseEnter={() => setIsBusinessDropdownOpen(true)}
                onMouseLeave={() => setIsBusinessDropdownOpen(false)}
              >
                <button
                  className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group flex items-center space-x-1"
                >
                  <span>Deckoviz For Businesses</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${isBusinessDropdownOpen ? 'rotate-180' : ''}`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
                </button>

                {/* Beautiful Dropdown */}
                <div className={`absolute top-full left-0 mt-2 transition-all duration-500 ease-out ${
                  isBusinessDropdownOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-4'
                }`}>
                  <div className="w-[640px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#8345EE]/10 via-[#7239D3]/5 to-[#6B2FD6]/10 px-6 py-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800">Choose Your Industry</h3> 
                      <p className="text-sm text-gray-600 mt-1">Discover how Deckoviz transforms your space </p>
                    </div>
                    
                    {/* Grid of Categories */}
                    <div className="grid grid-cols-2 gap-3 p-6">
                      {businessCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => handleBusinessNavigation(category.route)}
                          className="group relative p-4 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-left overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
                          }}
                        >
                          {/* Gradient overlay on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                          
                          {/* Content */}
                          <div className="relative z-10 flex items-start space-x-3">
                            <div className="w-8 h-8 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                              <img 
                                src={category.image} 
                                alt={category.title}
                                className="w-full h-full object-cover rounded-lg"
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
                          
                          {/* Hover arrow */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center">
                        Can't find your industry? <a href="/contact" className="text-[#8345EE] hover:underline cursor-pointer font-medium">Contact Us</a> for custom solutions.
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

            {/* Center Logo with Comfortaa font */}
            <a href="/" className="flex items-center">
              <img src="/images/deckovizlogo.png" alt="Deckoviz Logo" className="h-12 w-12 rounded-full object-contain mt-1" />
              <img 
                src="/images/deckospacelabs.png" 
                alt="Space Labs Logo" 
                className="h-14 w-auto object-contain ml-1 mb-2"
              />
            </a>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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

        {/* Mobile Navigation - Fixed position under navbar */}
        <div
          className={`md:hidden fixed left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all duration-300 ease-out ${
            isOpen ? "top-16 opacity-100 visible" : "top-16 opacity-0 invisible"
          }`}
          style={{ 
            maxHeight: isOpen ? 'calc(100vh - 4rem)' : '0',
            overflowY: 'auto'
          }}
        >
          <div className="px-4 py-6 space-y-0">
            {/* Mobile Business Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
                className="w-full text-left text-gray-700 hover:text-[#8345EE] transition-all duration-200 font-medium py-3 px-3 rounded-lg hover:bg-purple-50 flex items-center justify-between"
              >
                <span>Deckoviz For Business</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isBusinessDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {/* Business Categories Dropdown */}
              <div className={`overflow-hidden transition-all duration-200 ${isBusinessDropdownOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-4 space-y-1 mt-2 max-h-[350px] overflow-y-auto">
                  {businessCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleBusinessNavigation(category.route)}
                      className="w-full text-left text-gray-600 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-200 py-2 px-3 rounded-lg text-sm flex items-center space-x-3"
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{category.title}</div>
                        <p className="text-xs text-gray-500 truncate">{category.description}</p>
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

              <div className="pt-4">
                <Button variant="primary" className="w-full" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar