import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated logo/icon area */}
        <div className="relative">
          {/* Rotating rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-32 h-32"
          >
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 w-28 h-28"
          >
            <div className="absolute inset-0 border-4 border-transparent border-b-indigo-500 border-l-fuchsia-500 rounded-full" />
          </motion.div>

          {/* Center pulsing circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-32 h-32 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-2xl" />
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
              className="absolute inset-0 w-32 h-32"
            >
              <div
                className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full"
                style={{
                  background: [
                    "linear-gradient(135deg, #a855f7, #ec4899)",
                    "linear-gradient(135deg, #ec4899, #6366f1)",
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  ][i],
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Brand name with animated gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
            >
              Deckoviz
            </motion.span>
          </h1>
          
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gray-600 text-sm"
          >
            Creating magic...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Percentage */}
        <motion.div
          key={progress}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
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
