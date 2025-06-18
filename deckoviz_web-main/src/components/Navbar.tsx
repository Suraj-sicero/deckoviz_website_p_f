"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleSectionNav("deckoviz-for-businesses")}
              className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group"
            >
              Deckoviz For Businesses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
            <button
              onClick={() => handleSectionNav("pricing")}
              className="text-gray-700 hover:text-[#8345EE] transition-all duration-300 font-medium relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8345EE] to-[#6B2FD6] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
          </div>

          {/* Center Logo with original gradient */}
          <a href="/" className="flex items-center gap-1">
            <img src="/images/logo.png" alt="Deckoviz Logo" className="h-12 w-12 rounded-full object-contain" />
            <span
              className="text-3xl font-semibold bg-clip-text text-transparent leading-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #05286d, #2da370, #c8d188, #e3aa4b, #ff9100, #602377, #2f1086)",
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
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl mt-4 p-6 border border-gray-100 mx-2 transform transition-all duration-500">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleSectionNav("deckoviz-for-businesses")}
                className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-3 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group"
              >
                <span className="flex items-center">
                  Deckoviz For Businesses
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </span>
              </button>
              <button
                onClick={() => handleSectionNav("pricing")}
                className="text-left text-gray-700 hover:text-[#8345EE] hover:bg-purple-50 transition-all duration-300 font-medium py-3 px-4 rounded-xl transform hover:translate-x-2 hover:scale-105 group"
              >
                <span className="flex items-center">
                  Pricing
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </span>
              </button>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"></div>

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
    </nav>
  )
}

export default Navbar
