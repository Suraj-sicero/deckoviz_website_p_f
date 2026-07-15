"use client"

import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  // Wand2,
  // FlaskConical,
  // BookOpen,
  // Brush,
  // Gamepad2,
  // Notebook,
  // Sparkles,
  Grid
} from "lucide-react"
import { motion } from "framer-motion"

// ───────────────── DATA ─────────────────

const productLinks = [
  { name: "Features", path: "/features" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQ", path: "/faq" },
  { name: "Subscriptions & more Info", path: "/generalinfo" },
  { name: "Stories in Sound", path: "/audiobook" },
  { name: "Experimental Art Modes", path: "/experimental-art-modes" },
  { name: "Flagship Games", path: "/flagship-games" },
  { name: "Vizzy Generative Chat", path: "/vizzy-generative-chat" },
  { name: "Master Suite of Features", path: "/master-suite" },
  { name: "Classical Music Gallery", path: "/classical-music-gallery.html" },
]

const companyLinks = [
  { name: "About", path: "/about" },
  { name: "Careers", path: "/contact" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
  { name: "Sitemap", path: "/sitemap" },
  { name: "Support", path: "/support" },
  { name: "Partnerships", path: "/partnership" },
]

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
  { name: "Shipping Policy", path: "/shipping-policy" },
  { name: "Return Policy", path: "/return-policy" }
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/deckoviz/", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/deckoviz/", icon: Linkedin },
]


// ───────────────── FOOTER ─────────────────

const Footer = () => {
  const year = new Date().getFullYear()



  return (
    <footer className="relative bg-transparent overflow-hidden print:hidden">

      {/* Main Footer Content */}
      <div 
        className="relative py-6 overflow-hidden bg-[#0a1628]"
        style={{
          backgroundImage: "url('/images/wallhaven-962wqx.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] to-transparent"></div>

        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs in background - Balanced across full width */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left glowing ball */}
          <motion.div
            className="absolute bottom-10 left-[10%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Center glowing ball */}
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          {/* Right glowing ball */}
          <motion.div
            className="absolute top-20 right-[10%] w-80 h-80 bg-teal-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Top Section: Logo + Description + Social Links in one compact row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5 pb-3 border-b border-white/10"
          >
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="rounded-xl md:rounded-2xl p-2 md:p-2.5 shadow-[0_0_20px_rgba(167,139,250,0.3)] flex items-center space-x-1 md:space-x-2 border border-white/50"
                style={{
                  background: "linear-gradient(135deg, #e0e7ff, #ccfbf1, #c7d2fe, #ccfbf1)",
                  backgroundSize: "300% 300%",
                  animation: "footerGradientFlow 6s ease infinite",
                }}
              >
                <img src="/images/deckovizlogo.png" className="h-8 sm:h-10 md:h-12 object-contain" alt="Deckoviz Symbol" />
                <img src="/images/new_logoo.jpeg" className="h-8 sm:h-10 md:h-12 object-contain mix-blend-multiply" alt="Deckoviz" />
              </div>
              <div className="hidden md:flex flex-col gap-3">
                <p className="text-white text-sm leading-tight max-w-xs">
                  Bring your space to life with AI-powered ambiance, dynamic art and visually stunning stories
                </p>
              </div>
            </motion.div>

            {/* Social Links inline */}
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-xs font-medium hidden sm:block">Follow Us:</span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8 mb-10"
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes footerGradientFlow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}} />

            {/* Top 2 Horizon Buttons */}
            <div className="flex justify-center items-center gap-6 w-full flex-wrap">
              {[
                { label: "Home Webapp", href: "/webapp", icon: Grid, gradient: "linear-gradient(135deg, #38bdf8, #0ea5e9, #0284c7, #0ea5e9, #38bdf8)", shadow: "rgba(14,165,233,0.4)", hoverShadow: "rgba(14,165,233,0.7)" },
                { label: "Enterprise Webapp", href: "/enterprise-webapp", icon: Grid, gradient: "linear-gradient(135deg, #1e40af, #1e3a5f, #3b82f6, #1e3a5f, #1e40af)", shadow: "rgba(30,64,175,0.4)", hoverShadow: "rgba(59,130,246,0.7)" },
              ].map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 overflow-hidden hover:scale-105 border border-white/20"
                  style={{
                    background: btn.gradient,
                    backgroundSize: "300% 300%",
                    animation: "footerGradientFlow 4s ease infinite",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 15px 40px ${btn.hoverShadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 10px 30px ${btn.shadow}`;
                  }}
                  ref={(el) => {
                    if (el) el.style.boxShadow = `0 10px 30px ${btn.shadow}`;
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <btn.icon className="relative z-10 w-5 h-5 flex-shrink-0" />
                  <span className="relative z-10">{btn.label}</span>
                </a>
              ))}
            </div>

            {/* Remaining 9 Standardized Buttons */}
            {/* 
            <div className="flex justify-center items-center gap-4 flex-wrap max-w-4xl">
              {[
                { label: "Quick Access Zone: Some nifty little fun tools", href: "/vizzy-fun-zone", icon: Sparkles },
                { label: "Creative Journal", href: "/creative-journal", icon: Notebook },
                { label: "Creative Studio", href: "/creative-studio", icon: Wand2 },
                { label: "Experimental Art Modes", href: "/experimental-art-modes", icon: FlaskConical },
                { label: "Deckoviz Storytelling", href: "/deckoviz-storytelling", icon: BookOpen },
                { label: "Vizzy Creation Canvas", href: "/vizzy-canvas", icon: Brush },
                { label: "Vizzy Conversational Studio (VCS)", href: "/conversational-studio", icon: Sparkles },
                { label: "Flagship Games", href: "/flagship-games", icon: Gamepad2 },
                { label: "Master Suite of Features", href: "/master-suite", icon: Grid },
              ].map((btn, index) => {
                const isStyle1 = index % 2 === 0;
                // Style 1: Vibrant transparent-like Blue (Creative Studio style)
                // Style 2: Deep Blue to Light Blue to Slate Edge
                const gradient = isStyle1
                  ? "linear-gradient(90deg, #38bdf8, #0ea5e9, #38bdf8)"
                  : "linear-gradient(90deg, #1d4ed8, #3b82f6, #94a3b8, #3b82f6, #1d4ed8)";
                
                const shadowColor = isStyle1 ? "rgba(14,165,233,0.4)" : "rgba(59,130,246,0.4)";
                const hoverShadowColor = isStyle1 ? "rgba(14,165,233,0.7)" : "rgba(59,130,246,0.7)";

                return (
                  <a
                    key={btn.label}
                    href={btn.href}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105"
                    style={{
                      background: gradient,
                      backgroundSize: "300% 300%",
                      animation: "footerGradientFlow 4s ease infinite",
                      color: "white",
                      boxShadow: `0 0 20px ${shadowColor}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 35px ${hoverShadowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${shadowColor}`;
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <btn.icon className="relative z-10 w-4 h-4 flex-shrink-0" />
                    <span className="relative z-10">{btn.label}</span>
                    <svg
                      className="relative z-10 group-hover:translate-x-1 transition-transform ml-1"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                );
              })}
            </div>
            */}
          </motion.div>


          {/* Links Grid - Ultra compact 3 columns on desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 mb-3 justify-items-center"
          >

            {/* Product */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-white font-semibold text-xs mb-1.5">Product</h3>
              <ul className="space-y-0.5">
                {productLinks.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 3 }}>
                    <a href={link.path} className="text-white/70 hover:text-white text-[11px] transition-colors duration-200 inline-block">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-white font-semibold text-xs mb-1.5">Company</h3>
              <ul className="space-y-0.5">
                {companyLinks.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 3 }}>
                    <a href={link.path} className="text-white/70 hover:text-white text-[11px] transition-colors duration-200 inline-block">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-white font-semibold text-xs mb-1.5">Legal</h3>
              <ul className="space-y-0.5">
                {legalLinks.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 3 }}>
                    <a href={link.path} className="text-white/70 hover:text-white text-[11px] transition-colors duration-200 inline-block">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>


          </motion.div>

          {/* Copyright - Moved to bottom center to avoid fixed chat button on right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center border-t border-white/10 mt-8 pt-6 pb-6 md:pb-8"
          >
            <p className="text-[12px] text-white/50 leading-relaxed text-center">
              © {year} Deckoviz. All rights reserved.<br className="md:hidden" />
              <span className="hidden md:inline"> • </span>
              Deckoviz Space Labs Division
            </p>
          </motion.div>

        </div>
      </div>

    </footer>
  )
}

export default Footer