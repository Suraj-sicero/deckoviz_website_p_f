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
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg px-8 py-2.5 text-sm tracking-wide"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#8345EE] via-[#7239D3] to-[#6B2FD6] hover:from-[#7239D3] hover:via-[#6B2FD6] hover:to-[#5A28C4] text-white shadow-lg hover:shadow-xl border border-purple-500/20 hover:border-purple-400/30 transform hover:scale-[1.02] hover:-translate-y-0.5",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <button className={classes} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  )
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [currentPath, setCurrentPath] = useState("")
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState<boolean>(false)

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
      icon: "🏨",
      gradient: "from-blue-500 to-cyan-500",
      route: "/deckovizforhotels"
    },
    {
      title: "Restaurants & Cafés",
      description: "Create dining ambiance",
      icon: "🍽️",
      gradient: "from-orange-500 to-red-500",
      route: "/deckovizforrestaurants"
    },
    {
      title: "Architects & Designers",
      description: "Design living spaces",
      icon: "🏗️",
      gradient: "from-purple-500 to-pink-500",
      route: "/deckovizforarchitects"
    },
    {
      title: "Offices & Workspaces",
      description: "Inspire productivity",
      icon: "💼",
      gradient: "from-green-500 to-emerald-500",
      route: "/deckovizforoffices"
    },
    {
      title: "Real Estate",
      description: "Showcase properties",
      icon: "🏡",
      gradient: "from-indigo-500 to-blue-500",
      route: "/deckovizforrealestate"
    },
    {
      title: "Wellness & Therapy",
      description: "Healing environments",
      icon: "🧘",
      gradient: "from-teal-500 to-cyan-500",
      route: "/deckovizfortherapists"
    },
    {
      title: "Schools & Learning",
      description: "Educational spaces",
      icon: "📚",
      gradient: "from-yellow-500 to-orange-500",
      route: "/deckovizforschools"
    },
    {
      title: "Retail & Showrooms",
      description: "Shopping experiences",
      icon: "🛍️",
      gradient: "from-pink-500 to-rose-500",
      route: "/deckovizforretailstores"
    }
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
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
                    <p className="text-sm text-gray-600 mt-1">Discover how Deckoviz transforms your space</p>
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
                          <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
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
                      Can't find your industry? <span className="text-[#8345EE] hover:underline cursor-pointer font-medium">Contact us</span> for custom solutions
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
          <a href="/" className="flex items-center ">
            <img src="/images/logo.png" alt="Deckoviz Logo" className="h-12 w-12 rounded-full object-contain mt-1" />
            <span
              className="text-3xl font-extrabold bg-clip-text text-transparent leading-none [text-shadow:0_1px_1px_rgba(0,0,0,0.15)]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #05286d, #2da370, #c8d188, #e3aa4b, #ff9100, #602377, #2f1086)",
                fontFamily: 'Comfortaa, cursive'
              }}
            >
              Deckoviz
            </span>
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

        {/* Mobile Navigation with cool animations */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl mt-4 p-6 border border-gray-100 mx-2 transform transition-all duration-500">
            <div className="flex flex-col space-y-1">
              {/* Mobile Business Dropdown */}
              <div className="mb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 px-4">Business Solutions</p>
                <div className="grid grid-cols-1 gap-2">
                  {businessCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleBusinessNavigation(category.route)}
                      className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-2 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group flex items-center space-x-3"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <div className="flex-1">
                        <span className="text-sm font-medium">{category.title}</span>
                        <p className="text-xs text-gray-500">{category.description}</p>
                      </div>
                      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <a
                  href="/pricing"
                  className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-3 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    Pricing
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </a>

                <a
                  href="/blog"
                  className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-3 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    Blog
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </a>

                <a
                  href="/about"
                  className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-3 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    About us
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </a>

                <div className="pt-4">
                  <Button variant="primary" className="w-full" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar