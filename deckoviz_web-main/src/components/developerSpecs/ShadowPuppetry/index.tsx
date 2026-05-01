"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const SHAPES = [
  {
    name: "human",
    // Simplified silhouette of a person standing
    path: "M100,60c-11,0-20,9-20,20s9,20,20,20s20-9,20-20S111,60,100,60z M125,110c-10-5-25-10-25-10s-15,5-25,10 c-15,8-20,25-20,45v50h20v60h20v-60h10v60h20v-60h20v-50C145,135,140,118,125,110z",
  },
  {
    name: "bird",
    // Simplified silhouette of a bird with wings spread
    path: "M100,100c0,0-40-20-80,0c0,0,20,40,80,20c60,20,80-20,80-20C140,80,100,100,100,100z M100,120c-10,0-15,10-15,20 c0,15,15,30,15,30s15-15,15-30C115,130,110,120,100,120z",
  },
  {
    name: "embrace",
    // Two figures hugging
    path: "M80,60c-11,0-20,9-20,20s9,20,20,20s20-9,20-20S91,60,80,60z M120,60c-11,0-20,9-20,20s9,20,20,20s20-9,20-20 S131,60,120,60z M150,110c-10-5-25-10-25-10c-10,0-15,5-25,5c-10,0-15-5-25-5c-10,0-25,5-35,10c-15,8-20,25-20,45v110h150v-110 C170,135,165,118,150,110z",
  }
];

const ShadowPuppetry: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for light ripple
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHAPES.length);
    }, 8000); // Slow transition every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center cursor-none"
    >
      {/* Backlight Glow Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, #f59e0b, #d97706, #78350f, #000)",
        }}
      >
        {/* Dynamic Light Ripple */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #fbbf24, transparent)",
            left: springX,
            top: springY,
            transform: "translate(-50%, -50%)",
          }}
        />
      </motion.div>

      {/* The Paper Screen */}
      <div className="absolute inset-0 z-10 opacity-40 mix-blend-multiply pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-grain)" />
        </svg>
      </div>

      {/* Screen Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* Shadow Figures Container */}
      <div className="relative z-30 w-full max-w-4xl aspect-video flex items-center justify-center">
        <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <defs>
            <filter id="shadow-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          
          <motion.path
            d={SHAPES[currentIndex].path}
            fill="black"
            filter="url(#shadow-blur)"
            initial={false}
            animate={{ 
              d: SHAPES[currentIndex].path,
              scale: [1, 1.02, 1],
            }}
            transition={{
              d: { duration: 5, ease: "easeInOut" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </svg>
      </div>

      {/* Ambient Dust Particles */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="absolute inset-0 animate-pulse opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-200 rounded-full blur-[1px]"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random()
              }}
              animate={{
                y: ["-10%", "110%"],
                x: (Math.random() - 0.5) * 50 + "px",
              }}
              transition={{
                duration: 20 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 20
              }}
            />
          ))}
        </div>
      </div>

      {/* UI Overlay */}
      <div className="absolute bottom-12 left-12 z-50 text-amber-100/50 font-serif italic text-lg tracking-widest pointer-events-none">
        Shadow Puppetry Engine
        <div className="text-xs uppercase mt-2 tracking-[0.5em] opacity-50 not-italic">
          Experimental Art Mode
        </div>
      </div>
      
      <button 
        onClick={() => window.history.back()}
        className="absolute top-12 left-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-amber-200 hover:bg-white/10 transition-all backdrop-blur-md group"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
    </div>
  );
};

export default ShadowPuppetry;
