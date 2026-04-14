import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoadingAnimation: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Animated logo/icon area */}
        <div className="relative flex items-center justify-center">
          {/* Rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32"
          >
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-800 border-r-blue-700 rounded-full" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-28 h-28"
          >
            <div className="absolute inset-0 border-4 border-transparent border-b-blue-900 border-l-blue-800 rounded-full" />
          </motion.div>

          {/* Center pulsing circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-full shadow-2xl" />
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
              className="absolute w-32 h-32"
            >
              <div
                className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full"
                style={{
                  background: [
                    "linear-gradient(135deg, #1e3a8a, #1e40af)",
                    "linear-gradient(135deg, #1e40af, #2563eb)",
                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
                  ][i],
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Brand logo text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          <style>
            {`
              @keyframes subtitleFlow {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }

              /* Perfect per-letter gradients matching image exact original colors and boundaries */
              .deckoviz-letter {
                display: inline-block;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: 700;
                /* Super subtle fluid shift that securely protects the target colors */
                background-size: 150% 100%;
                animation: 
                  fluidBreath 4s ease-in-out infinite alternate,
                  liquidFloat 2.5s ease-in-out infinite alternate;
              }

              @keyframes fluidBreath {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
              }

              @keyframes liquidFloat {
                0% { 
                  transform: translateY(4px) scale(0.98); 
                  filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.05));
                }
                100% { 
                  transform: translateY(-8px) scale(1.02); 
                  filter: drop-shadow(0px 12px 16px rgba(0,0,0,0.15));
                }
              }

              .l-D { background-image: linear-gradient(to right, #011439, #07509A, #011439); animation-delay: 0.0s, 0.0s; }
              .l-e { background-image: linear-gradient(to right, #007D6D, #24A352, #007D6D); animation-delay: -0.5s, 0.15s; }
              .l-c { background-image: linear-gradient(to right, #33AE4C, #ADD02F, #33AE4C); animation-delay: -1.0s, 0.3s; }
              .l-k { background-image: linear-gradient(to right, #F9C605, #F3901B, #F9C605); animation-delay: -1.5s, 0.45s; }
              .l-o { background-image: linear-gradient(to right, #F15C24, #ED2624, #F15C24); animation-delay: -2.0s, 0.6s; }
              .l-v { background-image: linear-gradient(to right, #ED1E24, #C41459, #ED1E24); animation-delay: -2.5s, 0.75s; }
              .l-i { background-image: linear-gradient(to right, #A01265, #551075, #A01265); animation-delay: -3.0s, 0.9s; }
              .l-z { background-image: linear-gradient(to right, #3E0D78, #180945, #3E0D78); animation-delay: -3.5s, 1.05s; }

              .fluid-gradient-subtitle {
                background: linear-gradient(
                  to right,
                  #4b5563 0%,
                  #9ca3af 50%,
                  #4b5563 100%
                );
                background-size: 200% 100%;
                animation: subtitleFlow 3s ease-in-out infinite alternate;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: 0.05em;
              }
            `}
          </style>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-2 flex items-center justify-center p-4"
            style={{ fontFamily: "'Comfortaa', sans-serif" }}
          >
            {/* Smooth container scaling instead of snappy */}
            <motion.span
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: 'inline-flex', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.05))' }}
            >
              <span className="deckoviz-letter l-D">D</span>
              <span className="deckoviz-letter l-e">e</span>
              <span className="deckoviz-letter l-c">c</span>
              <span className="deckoviz-letter l-k">k</span>
              <span className="deckoviz-letter l-o">o</span>
              <span className="deckoviz-letter l-v">v</span>
              <span className="deckoviz-letter l-i">i</span>
              <span className="deckoviz-letter l-z">z</span>
            </motion.span>
          </h1>

          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="fluid-gradient-subtitle text-sm font-medium mt-1"
            style={{ fontFamily: '"Nunito", "Varela Round", "Comfortaa", sans-serif' }}
          >
            Creating magic...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Percentage */}
        <motion.div
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent"
        >
          {progress}%
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: [
                "#a855f7",
                "#ec4899",
                "#6366f1",
                "#8b5cf6",
                "#f472b6",
                "#c084fc",
              ][i],
              left: `${50 + (i - 3) * 10}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
