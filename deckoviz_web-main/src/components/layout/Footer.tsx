"use client"

import type React from "react"
// import { useState } from "react"
import { Instagram, Linkedin, Facebook } from "lucide-react"
// import { useMediaQuery } from 'react-responsive';

const Footer: React.FC = () => {

  const handleNavigation = (sectionId: string, fallbackUrl: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = fallbackUrl
    }
  }

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.location.href = "/place-order"
  }

  return (
<footer className="bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_40%),linear-gradient(to_bottom_right,#ffffff,rgba(243,232,255,0.3),rgba(245,243,255,0.4))] text-gray-700 border-t border-purple-100 overflow-hidden">

  <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-10">

    {/* Main Split Grid */}
<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">

  {/* CENTER DIVIDER */}
  <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-purple-200 -translate-x-1/2"></div>

  {/* LEFT SECTION */}
  <div className="flex flex-col gap-12">

    {/* Logo + Description */}
    <div>
      <a href="/" className="inline-block mb-5">
        <img src="/images/deckospacelabs.png" alt="Deckoviz Logo" className="h-12 w-auto" />
      </a>

      <p className="text-gray-600 max-w-md leading-relaxed text-sm md:text-base">
        Transform your space with AI-powered art that evolves with your style.
        Create personalized artwork that reflects your taste and brings your walls to life.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6">
        <a
          href="https://www.instagram.com/deckoviz/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-gray-300 rounded-md transition-all hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:text-purple-500"
        >
          <Instagram size={20} />
        </a>

        <a
          href="#"
          className="p-2 border border-gray-300 rounded-md transition-all hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:text-purple-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/>
          </svg>
        </a>

        <a
          href="#"
          className="p-2 border border-gray-300 rounded-md transition-all hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:text-purple-500"
        >
          <Facebook size={20} />
        </a>

        <a
          href="https://www.linkedin.com/company/deckoviz/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border border-gray-300 rounded-md transition-all hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:text-purple-500"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </div>

    {/* Links */}
    <div className="grid grid-cols-2 gap-12">

      {/* Product */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-5">
          Product
        </h3>

        <ul className="space-y-3 text-sm">
          {[
            { name: "Features", path: "/features" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "Pricing", path: "/pricing" },
            { name: "FAQ", path: "/faq" },
            { name: "Subscriptions and more info", path: "/generalinfo" },
          ].map((item) => (
            <li key={item.name}>
              <button
                onClick={() => (window.location.href = item.path)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-5">
          Company
        </h3>

        <ul className="space-y-3 text-sm">
          {[
            { name: "About Us", path: "/about" },
            { name: "Careers", path: "https://www.linkedin.com/company/deckoviz-space/jobs/" },
            { name: "Blog", path: "/blog" },
            { name: "Contact Us", path: "/contact" },
            { name: "Support", path: "/support" },
          ].map((item) => (
            <li key={item.name}>
              <button
                onClick={() => (window.location.href = item.path)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>

  </div>

  {/* RIGHT CTA */}
  <div className="flex items-center justify-center">

    <div className="relative rounded-2xl border bg-gradient-to-br from-purple-50 to-pink-50 p-10 max-w-md w-full">

      <div className="absolute inset-0 bg-purple-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center">

        <h3 className="text-2xl font-light text-gray-900 mb-3">
          Shop for the Future
        </h3>

        <p className="text-sm text-gray-600 mb-8">
          Join thousands of happy customers who’ve brought their walls to life with Deckoviz.
        </p>

        <button
          onClick={handleOnClick}
          className="group relative px-10 py-4 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(124,58,237,0.45)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

          <span className="relative z-10">Shop Deckoviz Frames</span>
        </button>

      </div>

    </div>

  </div>

  </div>
      <div className="pt-8 border-t border-purple-200 flex flex-col md:flex-row justify-between items-center gap-6">

      <p className="text-[10px] text-gray-600 tracking-wider">
        © {new Date().getFullYear()} DECKOVIZ. ALL RIGHTS RESERVED.
      </p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">

        <button
          onClick={() => handleNavigation("privacy", "/privacy-policy")}
          className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
        >
          Privacy Policy
        </button>

        <button
          onClick={() => handleNavigation("terms", "/terms-conditions")}
          className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
        >
          Terms & Conditions
        </button>

        <button
          onClick={() => handleNavigation("shipping", "/shipping-policy")}
          className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
        >
          Shipping Policy
        </button>

      </div>

    </div>

</div>

    {/* Bottom Bar */}

</footer>
  )
}

export default Footer