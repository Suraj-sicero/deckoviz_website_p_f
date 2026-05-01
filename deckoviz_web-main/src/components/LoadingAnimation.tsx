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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
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
            animate={{ opacity: [0.10, 0.20, 0.10], scale: [1, 1.15, 1] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: l.glow,
              filter: "blur(90px)",
              top: "42%",
              left: `${8 + (i / letters.length) * 86}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        {/* Extra dark vignette overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 20%, #0b0b14 80%)",
        }} />
      </div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>

        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            width: "220px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #00cdd4, #4a60ff, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* ===== NEON "Deckoviz" Text ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", alignItems: "baseline", gap: "0px" }}
        >
          {letters.map((l, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: "easeOut" }}
              style={{
                color: l.color,
                fontSize: "clamp(46px, 8.5vw, 105px)",
                fontFamily: "'Comfortaa', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.01em",
                lineHeight: 1.15,
                display: "inline-block",
                transform: "scaleX(1.28)",
                textShadow: [
                  `0 0 6px  ${l.glow}dd`,
                  `0 0 22px ${l.glow}99`,
                  `0 0 55px ${l.glow}55`,
                  `0 0 90px ${l.glow}22`,
                ].join(", "),
              }}
            >
              {l.char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          style={{
            color: "#00c896",
            fontSize: "clamp(10px, 1.4vw, 13px)",
            fontFamily: "'Nunito', 'Comfortaa', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            textShadow: "0 0 12px #00c89666",
            margin: 0,
          }}
        >
          Generative Ambiance Platform
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ width: "clamp(260px, 40vw, 400px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
        >
          {/* Track */}
          <div style={{
            width: "100%",
            height: "3px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "2px",
            overflow: "hidden",
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #ff2d78, #ff7020, #e8d800, #00e676, #00cdd4, #00aaff, #4a60ff, #b826ff)",
                borderRadius: "2px",
                boxShadow: "0 0 8px rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            key={progress}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "14px",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 500,
            }}
          >
            {progress}%
          </motion.span>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{
            width: "160px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #4a60ff, #00cdd4, transparent)",
            transformOrigin: "center",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
