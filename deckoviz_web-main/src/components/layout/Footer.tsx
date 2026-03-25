"use client"

import React from "react"
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  ArrowUpRight
} from "lucide-react"
import { motion } from "framer-motion"
import { path } from "framer-motion/client"

// ───────────────── DATA ─────────────────

const productLinks = [
  { name: "Features", path: "/features" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQ", path: "/faq" },
  { name: "Subscriptions & more Info", path: "/generalinfo" },
  { name: "Stories in Sound", path: "/audiobook" },
]

const companyLinks = [
  { name: "About", path: "/about" },
  { name: "Careers", path: "https://www.linkedin.com/company/deckoviz-space/jobs/" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
  { name: "Sitemap", path: "/sitemap" },
  { name: "Support", path: "/support" },
  { name: "Partnerships", path: "/partnership" },
]

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
  { name: "Shipping Policy  ", path: "/shipping-policy" },
  { name: "Return Policy", path:"/return-policy" }
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/deckoviz/", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/deckoviz/", icon: Linkedin },
]

// ───────────────── COMPONENTS ─────────────────

const NavLink = ({ item }: any) => (
  <a
    href={item.path}
    className="group flex justify-between items-center py-2 px-2 rounded-md hover:bg-white/40 transition"
  >
    <span className="text-sm text-slate-600 group-hover:text-purple-600 transition">
      {item.name}
    </span>
    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition text-purple-500" size={14} />
  </a>
)

const SocialButton = ({ item }: any) => (
  <a
    href={item.href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white transition shadow"
  >
    <item.icon size={16} />
  </a>
)

// ───────────────── FOOTER ─────────────────

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#FFFBF5] pt-24 pb-12 overflow-hidden">

      {/* ✨ BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-300 opacity-30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-300 opacity-30 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ───── CTA ───── */}
        <div className="relative mb-20 rounded-3xl p-10 overflow-hidden">

          {/* Glow behind CTA */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 opacity-80" />
          <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-r from-purple-400 to-pink-400" />

          <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="max-w-lg text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-lucida font-bold ">
                Ready to transform your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                  space
                </span>
                ?
              </h2>

              <p className="text-slate-600 mt-3 text-sm">
                Join thousands of happy customers who’ve brought their walls to life with Deckoviz.


              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/place-order")}
              className="relative px-8 py-4 bg-gradient-to-r from-pink-600 to-transparent-600 text-white rounded-full flex items-center gap-2 hover:bg-gradient-to-r from-purple-600 to-pink-600 transition"
            >
              Shop Deckoviz Frames
              <ArrowUpRight size={16} />
            </button>

          </div>
        </div>

        {/* ───── GRID ───── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">

          {/* BRAND */}
          <div className="lg:col-span-4">
            <img src="/images/deckospacelabs.png" className="h-10 mb-6" />

            <p className="text-sm text-slate-600 leading-7 mb-6 max-w-sm">
              Transform your space with AI-powered art that evolves with your style. Create personalized artwork that reflects your taste and brings your walls to life.
            </p>

            <p className="text-purple-600 mb-3 font-medium">Follow Us</p>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <SocialButton key={s.name} item={s} />
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

            <div>
              <h3 className="font-serif font-bold mb-4">Product</h3>
              {productLinks.map((l) => <NavLink key={l.name} item={l} />)}
            </div>

            <div>
              <h3 className="font-serif font-bold mb-4">Company</h3>
              {companyLinks.map((l) => <NavLink key={l.name} item={l} />)}
            </div>

            <div>
              <h3 className="font-serif font-bold mb-4">Legal</h3>
              {legalLinks.map((l) => <NavLink key={l.name} item={l} />)}
            </div>

          </div>
        </div>

        {/* ───── BOTTOM ───── */}
        <div className="border-t pt-6 text-sm text-slate-500 flex justify-between">
          <p>© {year} Deckoviz. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer	

