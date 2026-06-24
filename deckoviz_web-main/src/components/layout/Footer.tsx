"use client"

import { useState, useEffect } from "react"
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Wand2,
  FlaskConical,
  BookOpen,
  Brush,
  Gamepad2,
  Notebook,
  Sparkles,
  Heart,
  MessageSquare,
  Volume2,
  FileText,
  Clock,
  Music,
  Radio,
  Zap,
  X,
  Grid
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  { name: "Shipping Policy", path: "/shipping-policy" },
  { name: "Return Policy", path: "/return-policy" }
]

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/deckoviz/", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/deckoviz/", icon: Linkedin },
]

const funTools = [
  {
    name: "Before & After Postcard",
    path: "/tools/postcard",
    icon: Sparkles,
    color: "from-[#ec4899] to-[#8b5cf6]",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    name: "Gratitude Cards",
    path: "/tools/gratitude-card",
    icon: Heart,
    color: "from-[#ef4444] to-[#f43f5e]",
    glow: "rgba(239, 68, 68, 0.4)"
  },
  {
    name: "Conversational Studio",
    path: "/conversational-studio",
    icon: MessageSquare,
    color: "from-[#3b82f6] to-[#8b5cf6]",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    name: "Audiobook Creator",
    path: "/tools/audiobook",
    icon: Volume2,
    color: "from-[#f97316] to-[#eab308]",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  {
    name: "Quote Poster Generator",
    path: "/tools/quote-poster",
    icon: FileText,
    color: "from-[#10b981] to-[#06b6d4]",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    name: "Ambient Timescape",
    path: "/developer-specs/ambient-clock",
    icon: Clock,
    color: "from-[#06b6d4] to-[#3b82f6]",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    name: "Music Responsive Art",
    path: "/developer-specs/music-responsive-art",
    icon: Music,
    color: "from-[#d946ef] to-[#ec4899]",
    glow: "rgba(217, 70, 239, 0.4)"
  },
  {
    name: "Soundscape",
    path: "/soundscapes",
    icon: Radio,
    color: "from-[#14b8a6] to-[#10b981]",
    glow: "rgba(20, 184, 166, 0.4)"
  },
  {
    name: "Shape Vortex",
    path: "/developer-specs/agentic-shape-vortex",
    icon: Zap,
    color: "from-[#facc15] to-[#f97316]",
    glow: "rgba(250, 204, 21, 0.4)"
  },
]

// ───────────────── FOOTER ─────────────────

const Footer = () => {
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [radius, setRadius] = useState(220)
  const [isMobile, setIsMobile] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      if (width < 380) {
        setRadius(95)
      } else if (width < 480) {
        setRadius(110)
      } else if (width < 768) {
        setRadius(130)
      } else {
        setRadius(230)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <footer className="relative bg-transparent overflow-hidden print:hidden">

      {/* Main Footer Content with Floating Particles */}
      <div
        className="relative py-6 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/wallhaven-962wqx.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#0a1628]/50"></div>

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
            className="flex justify-center items-center gap-4 flex-wrap mb-8"
          >
            <a
              href="/webapp"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,100,50,0.5)] hover:shadow-[0_0_50px_rgba(255,100,50,0.8)] border border-orange-400/30"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c, #f59e0b, #ea580c, #f97316)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Grid className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Webapp</span>
            </a>
            <a
              href="/creative-journal"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:shadow-[0_0_50px_rgba(167,139,250,0.8)] border border-violet-400/30"
              style={{
                background: "linear-gradient(135deg, #a855f7, #6366f1, #ec4899, #6366f1, #a855f7)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Notebook className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Creative Journal</span>
            </a>

            <a
              href="/creative-studio"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #60A5FA, #2563EB, #0ea5e9, #2563EB, #60A5FA)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Wand2 className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Creative Studio</span>
            </a>

            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes footerGradientFlow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}} />
            <a
              href="/experimental-art-modes"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899, #3b82f6, #ec4899, #7c3aed)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <FlaskConical className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Experimental Art Modes</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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

            <a
              href="/deckoviz-storytelling"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #7dd3fc, #0ea5e9, #0284c7, #0ea5e9, #7dd3fc)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <BookOpen className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Deckoviz Storytelling</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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

            <a
              href="/vizzy-canvas"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669, #047857, #059669, #10b981)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Brush className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Vizzy Creation Canvas</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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

            <a
              href="/conversational-studio"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #a855f7, #d946ef, #8b5cf6, #d946ef, #a855f7)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Sparkles className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Vizzy Conversational Studio (VCS)</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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

            <a
              href="/flagship-games"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:shadow-[0_0_50px_rgba(255,255,255,0.9)]"
              style={{
                background: "linear-gradient(135deg, #f43f5e, #be123c, #9333ea, #be123c, #f43f5e)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Gamepad2 className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Flagship Games</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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

            <a
              href="/master-suite"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden hover:scale-105 shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:shadow-[0_0_50px_rgba(167,139,250,0.8)] border border-indigo-400/30"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #f59e0b)",
                backgroundSize: "300% 300%",
                animation: "footerGradientFlow 4s ease infinite",
                color: "white",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Grid className="relative z-10 w-4 h-4 text-amber-200 animate-pulse" />
              <span className="relative z-10">Master Suite of Features</span>
              <svg
                className="relative z-10 group-hover:translate-x-1 transition-transform"
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
          </motion.div>


          {/* Links Grid - Ultra compact 4 columns on desktop */}
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
            className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-3"
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

            {/* Some fun little tools */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col"
            >
              <h3 className="text-white font-semibold text-xs mb-1.5">Fun Zone</h3>
              <div className="relative w-full">
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-[11px] transition-all text-left font-semibold shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]"
                >
                  <span>Some fun little tools</span>
                  <Sparkles size={14} className="text-pink-400 animate-pulse" />
                </button>
              </div>
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
              <span className="inline-flex items-center gap-1.5 ml-1 align-middle">
                <span style={{ fontFamily: "'Caveat', cursive, 'Dancing Script'" }} className="text-lg font-bold text-white/95 drop-shadow-md">Made with</span>
                <motion.span animate={{ scale: [1, 1.25, 1], textShadow: ["0px 0px 8px rgba(96,165,250,0.4)", "0px 0px 16px rgba(96,165,250,0.8)", "0px 0px 8px rgba(96,165,250,0.4)"] }} transition={{ duration: 1.5, repeat: Infinity }} className="inline-block text-blue-400 text-lg">♥</motion.span>
                <span style={{ fontFamily: "'Caveat', cursive, 'Dancing Script'" }} className="text-lg font-bold text-white/95 drop-shadow-md">by</span>
                <span style={{ fontFamily: "'Comfortaa', sans-serif" }} className="text-sm sm:text-base font-extrabold bg-gradient-to-r from-white via-blue-200 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] tracking-wide ml-0.5">Deckoviz Space Labs Team</span>
              </span>
            </p>
          </motion.div>

        </div>
      </div>

      {/* Full-screen flying balls overlay */}
      <AnimatePresence>
        {isToolsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050b14]/95 backdrop-blur-lg flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Animated Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
              {/* Soft glowing ambient light */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsToolsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-3 rounded-full transition-all duration-300 group z-50"
              aria-label="Close Fun Zone"
            >
              <X size={20} className="transform group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Header Info */}
            <div className="relative z-10 text-center mb-8 px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-flex items-center justify-center p-2.5 bg-white/5 border border-white/10 rounded-2xl mb-4"
              >
                <Sparkles className="w-5 h-5 text-pink-400 animate-pulse mr-2" />
                <span className="text-white/80 font-bold text-xs uppercase tracking-wider">Interactive Hub</span>
              </motion.div>
              <h2
                className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 tracking-tight drop-shadow-[0_0_15px_rgba(167,139,250,0.2)]"
              >
                Vizzy Fun Zone
              </h2>
              <p
                className="text-white/50 text-xs md:text-sm max-w-sm mx-auto mt-2 leading-relaxed"
              >
                Click a floating ball to launch your generative adventure. Hover to feel the gravity pull.
              </p>
            </div>

            {/* Balls Container */}
            <div className="relative w-full max-w-4xl h-[450px] md:h-[550px] flex items-center justify-center">
              {/* Center core */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(139,92,246,0.15)] z-0"
              >
                <img src="/images/deckovizlogo.png" className="w-10 h-10 md:w-14 md:h-14 object-contain opacity-80 animate-pulse" alt="Core logo" />
              </motion.div>

              {/* Floating Balls */}
              {funTools.map((tool, i) => {
                const ToolIcon = tool.icon
                const angle = (i * 2 * Math.PI) / funTools.length
                
                // Compute static initial target position
                const targetX = Math.cos(angle) * radius
                const targetY = Math.sin(angle) * radius

                // Generate slight random variations for infinite float
                const floatRangeX = [
                  targetX,
                  targetX + Math.sin(i) * 12,
                  targetX + Math.cos(i) * 12,
                  targetX
                ]
                const floatRangeY = [
                  targetY,
                  targetY + Math.cos(i) * 12,
                  targetY + Math.sin(i) * 12,
                  targetY
                ]

                return (
                  <motion.a
                    key={tool.name}
                    href={tool.path}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: floatRangeX,
                      y: floatRangeY,
                    }}
                    transition={{
                      x: {
                        duration: 6 + (i % 3) * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                      },
                      y: {
                        duration: 7 + (i % 2) * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.33, 0.66, 1]
                      },
                      scale: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: i * 0.05
                      },
                      opacity: {
                        duration: 0.5,
                        delay: i * 0.05
                      }
                    }}
                    whileHover={{ 
                      scale: 1.15,
                      zIndex: 40,
                      boxShadow: `0 0 35px ${tool.glow}`,
                      transition: { duration: 0.2, type: "tween" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute cursor-pointer rounded-full bg-gradient-to-br ${tool.color} p-[1px] hover:p-[2px] transition-all`}
                    style={{
                      boxShadow: `0 0 20px ${tool.glow}`,
                    }}
                  >
                    <div 
                      className={`rounded-full bg-[#0a1122]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 select-none transition-all ${
                        isMobile ? "w-20 h-20" : "w-32 h-32"
                      }`}
                    >
                      <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 mb-1 group-hover:scale-110 transition-transform ${isMobile ? "p-1 mb-0.5" : "p-2 mb-1.5"}`}>
                        <ToolIcon className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]`} />
                      </div>
                      <span className={`${isMobile ? "text-[8px]" : "text-[10px] md:text-[11px]"} font-bold text-white/95 leading-tight max-w-[90%]`}>
                        {tool.name}
                      </span>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer