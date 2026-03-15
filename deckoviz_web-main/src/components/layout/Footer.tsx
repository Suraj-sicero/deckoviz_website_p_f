"use client"

import type React from "react"
import { Instagram, Linkedin, Facebook, ArrowUpRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const XIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
  </svg>
)

const productLinks = [
  { name: "Features", path: "/features" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Pricing", path: "/pricing" },
  { name: "FAQ", path: "/faq" },
  { name: "Subscriptions & Info", path: "/generalinfo" },
  { name: "Stories in Sound", path: "/audiobook" },
]

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "https://www.linkedin.com/company/deckoviz-space/jobs/" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
  { name: "Support", path: "/support" },
]

const socialLinks = [
  {
    href: "https://www.instagram.com/deckoviz/",
    label: "",
    handle: "@deckoviz",
    external: true,
    icon: Instagram,
    gradient: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
  },
  {
    href: "#",
    label: "",
    handle: "@deckoviz",
    external: false,
    icon: XIcon,
    gradient: "linear-gradient(135deg,#1a1a2e,#374151)",
  },
  {
    href: "#",
    label: "",
    handle: "Deckoviz",
    external: false,
    icon: Facebook,
    gradient: "linear-gradient(135deg,#0062e0,#19afff)",
  },
  {
    href: "https://www.linkedin.com/company/deckoviz/",
    label: "",
    handle: "Deckoviz",
    external: true,
    icon: Linkedin,
    gradient: "linear-gradient(135deg,#0077b5,#00a0dc)",
  },
]

const legalLinks = [
  { label: "Privacy Policy", section: "privacy", path: "/privacy-policy" },
  { label: "Terms & Conditions", section: "terms", path: "/terms-conditions" },
  { label: "Shipping Policy", section: "shipping", path: "/shipping-policy" },
]

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');

/* ── Base nav link ── */
.dkv-navlink {
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.01em;
  transition: color 0.3s ease, transform 0.3s ease;
  text-align: left;
  width: 100%;
  position: relative;
}
.dkv-navlink::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
}
.dkv-navlink:hover {
  color: #a855f7;
  transform: translateX(6px);
}
.dkv-navlink:hover::after {
  width: calc(100% - 24px);
}
.dkv-navlink .arrow {
  opacity: 0;
  transform: translateX(-8px) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.dkv-navlink:hover .arrow {
  opacity: 1;
  transform: translateX(0) rotate(0deg);
}

/* ── Legal link ── */
.dkv-legal {
  font-family: 'Jost', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: color 0.25s ease;
  padding: 0;
  position: relative;
}
.dkv-legal::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #a855f7;
  transition: width 0.25s ease;
}
.dkv-legal:hover { color: #a855f7; }
.dkv-legal:hover::after { width: 100%; }

/* ── Scroll reveal ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
.dkv-rv { opacity: 0; animation: fadeUp 0.75s cubic-bezier(0.16,1,0.3,1) forwards; }
.dkv-d0 { animation-delay: 0s; }
.dkv-d1 { animation-delay: 0.12s; }
.dkv-d2 { animation-delay: 0.24s; }
.dkv-d3 { animation-delay: 0.36s; }

/* ── Decorative blobs ── */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.06); }
}
.dkv-pulse { animation: pulse-slow 5s ease-in-out infinite; }

/* ── Shimmer text ── */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.dkv-shimmer {
  background: linear-gradient(90deg, #a855f7 0%, #ec4899 25%, #a855f7 50%, #ec4899 75%, #a855f7 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3.5s linear infinite;
}

/* ── Divider line draw ── */
@keyframes drawLine {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.dkv-divider {
  transform-origin: left center;
  animation: drawLine 1s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-play-state: paused;
}
.dkv-divider.visible {
  animation-play-state: running;
}

/* ── CTA glow pulse ── */
@keyframes glow-breathe {
  0%, 100% { box-shadow: 0 8px 24px rgba(168,85,247,0.25); }
  50%       { box-shadow: 0 12px 40px rgba(236,72,153,0.38); }
}
.dkv-cta-btn {
  animation: glow-breathe 3s ease-in-out infinite;
}
.dkv-cta-btn:hover {
  animation: none;
}

/* ── Floating orb ── */
@keyframes float-orb {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-12px) rotate(2deg); }
  66%       { transform: translateY(6px) rotate(-1.5deg); }
}
.dkv-orb { animation: float-orb 8s ease-in-out infinite; }
.dkv-orb-2 { animation: float-orb 11s ease-in-out infinite reverse; animation-delay: -3s; }

/* ── Section label reveal ── */
@keyframes labelSlide {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}
.dkv-section-label {
  animation: labelSlide 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-play-state: paused;
}
.dkv-section-label.visible {
  animation-play-state: running;
}

/* ── Staggered nav items ── */
@keyframes navItemIn {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
.dkv-nav-item {
  opacity: 0;
  animation: navItemIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-play-state: paused;
}
.dkv-nav-item.visible {
  animation-play-state: running;
}

/* ── Border gradient animation ── */
@keyframes borderFlow {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

/* ── Copyright fade ── */
@keyframes copyrightIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.dkv-copyright {
  opacity: 0;
  animation: copyrightIn 1s ease forwards;
  animation-play-state: paused;
}
.dkv-copyright.visible {
  animation-play-state: running;
}

/* ── Dot separator pulse ── */
@keyframes dotPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 1; transform: scale(1.5); }
}
.dkv-dot { animation: dotPulse 2s ease-in-out infinite; }
.dkv-dot:nth-child(2) { animation-delay: 0.3s; }
.dkv-dot:nth-child(3) { animation-delay: 0.6s; }

/* ── Social icon pop ── */
@keyframes socialPop {
  from { opacity: 0; transform: scale(0.5) translateY(10px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.dkv-social-icon {
  opacity: 0;
  animation: socialPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  animation-play-state: paused;
}
.dkv-social-icon.visible {
  animation-play-state: running;
}
`

const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <p
    className={`dkv-section-label ${className}`}
    style={{
      fontFamily: "'Jost', sans-serif",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#a855f7",
      marginBottom: 20,
    }}
  >
    {children}
  </p>
)

const NavLink: React.FC<{ name: string; path: string; delay?: number; visible?: boolean }> = ({ name, path, delay = 0, visible = false }) => (
  <button
    className={`dkv-navlink dkv-nav-item ${visible ? "visible" : ""}`}
    style={{ animationDelay: `${delay}s` }}
    onClick={() => (window.location.href = path)}
  >
    {name}
    <ArrowUpRight size={12} className="arrow" />
  </button>
)

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (document.getElementById("dkv-footer-styles")) return
    const s = document.createElement("style")
    s.id = "dkv-footer-styles"
    s.textContent = STYLES
    document.head.appendChild(s)
    return () => { s.remove() }
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.04 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const vis = (d: string) => isVisible ? `dkv-rv ${d}` : ""

const LogoBlock = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: isMobile ? "center" : "flex-start",   // centers logo + text on mobile
      textAlign: isMobile ? "center" : "left"
    }}
  >
    <a href="/" style={{ lineHeight: 0, display: "inline-block" }}>
      <img
        src="/images/deckospacelabs.png"
        alt="Deckoviz"
        style={{
          height: 70,
          opacity: 0.85,
          transition: "opacity 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
        onError={(e) => {
          e.currentTarget.style.display = "none"
          const fb = e.currentTarget.nextElementSibling
          if (fb) fb.style.display = "block"
        }}
      />
      <span
        style={{
          display: "none",
          fontSize: 24,
          fontWeight: 600,
          color: "#1f2937",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        Deckoviz
      </span>
    </a>

    <p
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 16,
        fontWeight: 400,
        color: "#6b7280",
        lineHeight: 1.75,
        margin: 0,
        maxWidth: 320,
      }}
    >
      Transform your space with AI-powered art that evolves with your style.
      Create personalized artwork that reflects your taste and brings your
      walls to life.
    </p>
  </div>
)

  const HeadingBlock = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 14,
      // border:'1px solid black'
     }}>
      <h2
        className="dkv-shimmer"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: isMobile ? 32 : 42,
          fontWeight: 300,
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        shop for future
      </h2>
      <p style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        color: "#6b7280",
        lineHeight: 1.75,
        margin: 0,
        maxWidth: 340,
      }}>
        Join thousands of happy customers who’ve brought their walls to life with Deckoviz.
      </p>
    </div>
  )

  const CTAButton = () => (
    <button
      className="dkv-cta-btn"
      onClick={() => (window.location.href = "/place-order")}
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#fff",
        background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
        border: "none",
        borderRadius: 50,
        padding: "16px 36px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        whiteSpace: "nowrap",
        position: "relative",
        zIndex: 1,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"
        e.currentTarget.style.boxShadow = "0 16px 40px rgba(168,85,247,0.45)"
        e.currentTarget.style.animation = "none"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none"
        e.currentTarget.style.boxShadow = ""
        e.currentTarget.style.animation = ""
      }}
    >
      Shop Deckoviz Frames
    </button>
  )

  return (
    <footer
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#ffffff 0%,#faf5ff 50%,#fdf2f8 100%)",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      {/* Decorative blobs — now floating */}
      <div
        className="dkv-pulse dkv-orb"
        style={{
          position: "absolute", top: "10%", left: "-5%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(236,72,153,0.09) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="dkv-pulse dkv-orb-2"
        style={{
          position: "absolute", bottom: "20%", right: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(168,85,247,0.09) 0%,transparent 70%)",
          pointerEvents: "none",
          animationDelay: "2s",
        }}
      />
      {/* Extra small accent orbs */}
      <div
        className="dkv-orb"
        style={{
          position: "absolute", top: "40%", right: "20%",
          width: 120, height: 120, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(168,85,247,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
          animationDelay: "-5s",
        }}
      />
      <div
        className="dkv-orb-2"
        style={{
          position: "absolute", top: "70%", left: "30%",
          width: 80, height: 80, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(236,72,153,0.07) 0%,transparent 70%)",
          pointerEvents: "none",
          animationDelay: "-2s",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative" }}>

        {/* ══ SECTION 1 — CTA ══ */}
        <div
          className={vis("dkv-d0")}
          style={{
            padding: isMobile ? "60px 0 50px" : "80px 0 70px",
            borderBottom: "1px solid rgba(168,85,247,0.1)",
          }}
        >
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, textAlign: "center"}}>
              <div style={{
                // padding:isMobile ? '24px' : '0px'
              }}><LogoBlock 
              /></div>
              <HeadingBlock />
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  className="dkv-pulse"
                  style={{
                    position: "absolute", inset: -20,
                    background: "radial-gradient(circle,rgba(168,85,247,0.22),transparent 70%)",
                    filter: "blur(24px)", zIndex: 0,
                  }}
                />
                <CTAButton />
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <LogoBlock />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20,
               }}>
                <HeadingBlock />
                <div style={{ marginTop: 10, position: "relative", display: "inline-block" }}>
                  {/* Glow behind button */}
                  <div
                    className="dkv-pulse"
                    style={{
                      position: "absolute", inset: -16,
                      background: "radial-gradient(circle,rgba(168,85,247,0.18),transparent 70%)",
                      filter: "blur(20px)", zIndex: 0, borderRadius: 50,
                    }}
                  />
                  <CTAButton />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ══ SECTION 2 — NAV COLUMNS ══ */}
        <div
          className={vis("dkv-d1")}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr 1fr",
            padding: isMobile ? "48px 0" : "60px 0",
            borderBottom: "1px solid rgba(168,85,247,0.1)",
          }}
        >
          {/* Product */}
          <div style={{
            paddingRight: isMobile ? 0 : 40,
            paddingBottom: isMobile ? 40 : 0,
            marginBottom: isMobile ? 40 : 0,
            borderRight: isMobile ? "none" : "1px solid rgba(168,85,247,0.1)",
            borderBottom: isMobile ? "1px solid rgba(168,85,247,0.1)" : "none",
          }}>
            <SectionLabel className={isVisible ? "visible" : ""}>Product</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {productLinks.map((l, i) => (
                <NavLink key={l.name} {...l} delay={0.05 * i} visible={isVisible} />
              ))}
            </div>
          </div>

          {/* Company */}
          <div style={{
            paddingLeft: isMobile ? 0 : 40,
            paddingRight: isMobile ? 0 : 40,
            paddingTop: isMobile ? 40 : 0,
            paddingBottom: isMobile ? 40 : 0,
            marginBottom: isMobile ? 40 : 0,
            borderRight: isMobile ? "none" : "1px solid rgba(168,85,247,0.1)",
            borderBottom: isMobile ? "1px solid rgba(168,85,247,0.1)" : "none",
          }}>
            <SectionLabel className={isVisible ? "visible" : ""} >Company</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {companyLinks.map((l, i) => (
                <NavLink key={l.name} {...l} delay={0.08 + 0.05 * i} visible={isVisible} />
              ))}
            </div>
          </div>
          

          {/* Follow Us */}
          <div style={{ paddingLeft: isMobile ? 0 : 40, paddingTop: isMobile ? 40 : 0 }}>
            <SectionLabel className={isVisible ? "visible" : ""}>Follow Us</SectionLabel>
            <p style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: "#6b7280",
              lineHeight: 1.75,
              margin: "0 0 24px 0",
            }}>
              Follow us for daily inspiration and exclusive updates
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)", gap: 12 }}>
              {socialLinks.map((s, i) => {
                const [hov, setHov] = useState(false)
                const Icon = s.icon
                return (
                  <a
                    key={s.label + i}
                    href={s.href}
                    aria-label={s.label}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noopener noreferrer" : undefined}
                    className={`dkv-social-icon ${isVisible ? "visible" : ""}`}
                    style={{ animationDelay: `${0.1 + 0.08 * i}s` }}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        padding: "12px 10px",
                        background: hov ? s.gradient : "rgba(168,85,247,0.04)",
                        border: hov ? "1px solid transparent" : "1px solid rgba(168,85,247,0.1)",
                        borderRadius: 12,
                        textDecoration: "none",
                        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                        transform: hov ? "translateY(-4px) scale(1.08)" : "none",
                        boxShadow: hov ? "0 10px 24px rgba(0,0,0,0.13)" : "none",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ color: hov ? "#fff" : "#a855f7", transition: "color 0.3s ease", display: "flex" }}>
                        <Icon size={16} />
                      </span>
                      <span style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: hov ? "rgba(255,255,255,0.9)" : "#6b7280",
                        transition: "color 0.3s ease",
                      }}>
                        {s.label}
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div
          className={`${vis("dkv-d2")} dkv-copyright ${isVisible ? "visible" : ""}`}
          style={{
            padding: "24px 0",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 16 : 24,
          }}
        >
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            color: "#9ca3af",
            margin: 0,
            order: isMobile ? 2 : 0,
          }}>
            © {new Date().getFullYear()} Deckoviz. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", order: isMobile ? 1 : 0 }}>
            {legalLinks.map((l, i) => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <button
                  className="dkv-legal"
                  onClick={() => {
                    const el = document.getElementById(l.section)
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                    else window.location.href = l.path
                  }}
                >
                  {l.label}
                </button>
                {i < legalLinks.length - 1 && (
                  <span
                    className="dkv-dot"
                    style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "rgba(168,85,247,0.4)",
                      display: "inline-block",
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer