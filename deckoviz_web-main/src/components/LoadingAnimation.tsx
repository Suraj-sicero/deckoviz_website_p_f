import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Inject Comfortaa light weight from Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400&display=swap";
if (!document.head.querySelector('[href*="Comfortaa"]')) document.head.appendChild(fontLink);

const letters = [
  { char: "D", color: "#e05580", glow: "#e05580" },
  { char: "e", color: "#d4784a", glow: "#d4784a" },
  { char: "c", color: "#c9ac30", glow: "#c9ac30" },
  { char: "k", color: "#4aaa70", glow: "#4aaa70" },
  { char: "o", color: "#38b0b8", glow: "#38b0b8" },
  { char: "v", color: "#4488d8", glow: "#4488d8" },
  { char: "i", color: "#6868d8", glow: "#6868d8" },
  { char: "z", color: "#9050c8", glow: "#9050c8" },
];

const LoadingAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0c14 0%, #0d1018 40%, #0c1220 70%, #0a0e18 100%)",
        overflow: "hidden",
      }}
    >
      {/* Per-letter colored glow blobs in background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {letters.map((l, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.08, 0.25, 0.08], 
              scale: [1, 1.25, 1],
              x: ["0%", "10%", "-10%", "0%"],
              y: ["0%", "-10%", "10%", "0%"],
            }}
            transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: l.glow,
              filter: "blur(110px)",
              top: "42%",
              left: `${8 + (i / letters.length) * 86}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        {/* Extra dark vignette overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 10%, #080910 85%)",
        }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
          style={{
            width: "260px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0, 205, 212, 0.8), rgba(74, 96, 255, 0.8), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* ===== NEON "Deckoviz" Text ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", alignItems: "baseline", gap: "1px" }}
        >
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(12px)" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                filter: "blur(0px)",
                textShadow: [
                  `0 0 10px ${l.glow}aa, 0 0 25px ${l.glow}77, 0 0 50px ${l.glow}44`,
                  `0 0 15px ${l.glow}ee, 0 0 40px ${l.glow}bb, 0 0 80px ${l.glow}77`,
                  `0 0 10px ${l.glow}aa, 0 0 25px ${l.glow}77, 0 0 50px ${l.glow}44`,
                ]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" },
                y: { duration: 0.6, delay: 0.1 + i * 0.08, type: "spring", stiffness: 120, damping: 14 },
                scale: { duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" },
                filter: { duration: 0.6, delay: 0.1 + i * 0.08, ease: "easeOut" },
                textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }
              }}
              style={{
                color: l.color,
                fontSize: "clamp(50px, 9vw, 115px)",
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                display: "inline-block",
                transform: "scaleX(1.22)", // reduced slightly from 1.28 for elegance
              }}
            >
              {l.char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -5, filter: "blur(4px)", letterSpacing: "0.15em" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", letterSpacing: "0.28em" }}
          transition={{ duration: 1.2, delay: 0.85, ease: "easeOut" }}
          style={{
            color: "#00c896",
            fontSize: "clamp(10px, 1.4vw, 13px)",
            fontFamily: "'Nunito', 'Comfortaa', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            textShadow: "0 0 14px rgba(0, 200, 150, 0.7)",
            margin: 0,
          }}
        >
          Generative Ambiance Platform
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          style={{ width: "clamp(260px, 40vw, 400px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "10px" }}
        >
          {/* Track */}
          <div style={{
            width: "100%",
            height: "8px",
            background: "rgba(5, 7, 15, 0.6)",
            borderRadius: "8px",
            position: "relative",
            boxShadow: "inset 0 3px 6px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.04)"
          }}>
            {/* The Animated Fill */}
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 50%", "200% 50%"]
              }}
              transition={{ 
                backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" }
              }}
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #e05580, #d4784a, #c9ac30, #4aaa70, #38b0b8, #4488d8, #9050c8, #e05580, #d4784a)",
                backgroundSize: "200% 100%",
                borderRadius: "8px",
                position: "absolute",
                top: 0, left: 0,
                boxShadow: "0 0 12px rgba(255,255,255,0.15)",
                overflow: "hidden" // Keep shimmer contained
              }}
            >
              {/* Brilliant Inner Shimmer */}
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3], x: ["-100%", "100%"] }}
                transition={{ opacity: { duration: 2, repeat: Infinity }, x: { duration: 1.5, repeat: Infinity, ease: "linear" } }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  borderRadius: "8px",
                  mixBlendMode: "overlay"
                }}
              />
            </motion.div>
            
            {/* Intense Glowing Leading Flare (Pin to the Fill Edge) */}
            <div style={{
              position: "absolute",
              left: `${progress}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "2px",
              height: "20px",
              background: "#ffffff",
              boxShadow: "0 0 10px #fff, 0 0 25px rgba(255,255,255,0.8), 0 0 45px #38b0b8, 0 0 80px #e05580",
              zIndex: 20
            }} />
          </div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{ position: 'relative' }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              INITIALIZING ENGINE {progress.toString().padStart(2, '0')}%
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }}
          style={{
            width: "180px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(74, 96, 255, 0.8), rgba(0, 205, 212, 0.8), transparent)",
            transformOrigin: "center",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
