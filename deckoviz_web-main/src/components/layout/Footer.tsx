"use client"

import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter
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
  { name: "Return Policy", path:"/return-policy" }
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
    <>
      {/* ───── FOOTER ───── */}
      <footer className="relative overflow-hidden">

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

          {/* Glowing orbs in background */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
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
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/30">
                  <img src="/images/deckoviz background removed.png" className="h-14 drop-shadow-2xl" alt="Deckoviz" />
                </div>
                <p className="text-white text-sm leading-tight max-w-xs hidden md:block">
                  Transform your space with AI-powered art
                </p>
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

              {/* Copyright - moved to 4th column */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col justify-center"
              >
                <p className="text-[11px] text-white/60 leading-relaxed">
                  © {year} Deckoviz.<br/>
                  All rights reserved.<br/>
                  Made with <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block text-pink-400">♥</motion.span> by Deckoviz Team
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
        
      </footer>
    </>
  )
}

export default Footer
