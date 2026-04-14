import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GoogleTVSection: React.FC = () => {
  // Array of beautiful background images
  const backgroundImages = [
    '/images/framebg (1).png',
    '/images/framebg (5).png',
    '/images/framebg (10).png',
    '/images/framebg (15).png',
    '/images/framebg (20).png',
    '/images/herol (5).png',
    '/images/herol (10).png',
    '/images/herol (15).png',
  ];

  const [currentLeftIndex, setCurrentLeftIndex] = useState(0);
  const [currentRightIndex, setCurrentRightIndex] = useState(4);

  // Change background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeftIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
      setCurrentRightIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1800px] mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Powerful{" "}
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Google TV
            </span>
            . At Its Core.
          </h2>
        </motion.div>

        {/* Creative Layout with Large Floating Images */}
        <div className="relative">
          {/* Left Large Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block absolute left-0 top-10 w-[380px] xl:w-[420px] z-10"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-[3rem] blur-3xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)] transform hover:scale-105 hover:rotate-[-4deg] transition-all duration-700 bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentLeftIndex}
                    src={backgroundImages[currentLeftIndex]}
                    alt="Deckoviz Display"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-auto object-contain aspect-[16/9]"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Large Floating Image */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block absolute right-0 top-32 w-[380px] xl:w-[420px] z-10"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-[3rem] blur-3xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)] transform hover:scale-105 hover:rotate-[4deg] transition-all duration-700 bg-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentRightIndex}
                    src={backgroundImages[currentRightIndex]}
                    alt="Deckoviz Display"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-auto object-contain aspect-[16/9]"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Center Content with Creative Design */}
          <div className="max-w-3xl mx-auto relative z-20 px-4 lg:px-20">
            {/* First Content Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative mb-8"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 rounded-[2rem] opacity-60 blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-[1.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl opacity-10 rotate-12" />
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl opacity-10 -rotate-12" />
                
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4 relative">
                  Deckoviz DASP isn't just a beautiful art frame. It's a full-fledged{" "}
                  <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Google TV
                  </span>
                  , built for everyday use.
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed relative">
                  So while it transforms your space into something extraordinary, it also works exactly like the TV you already know and love.
                </p>
              </div>
            </motion.div>

            {/* Second Content Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 via-pink-50 to-orange-100 rounded-[2rem] opacity-60 blur-xl" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-[1.5rem] p-6 md:p-8 shadow-xl border border-gray-100">
                <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl opacity-10 rotate-45" />
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl opacity-10 -rotate-45" />
                
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 relative"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  All Your Apps. All in One Place.
                </h3>

                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 relative">
                  Access the complete Google TV ecosystem:
                </p>

                {/* Creative Bullet Points */}
                <ul className="space-y-3 mb-6 relative">
                  {[
                    { text: "Netflix, YouTube, Prime Video, Disney+, Spotify, and more", color: "from-purple-500 to-pink-500" },
                    { text: "Google Play Store with thousands of apps", color: "from-green-500 to-emerald-500" },
                    { text: "Voice search with Google Assistant", color: "from-blue-500 to-cyan-500" },
                    { text: "Seamless casting from your phone", color: "from-orange-500 to-yellow-500" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 + 0.1 * index }}
                      className="flex items-start group"
                    >
                      <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${item.color} mt-2 mr-4 shadow-lg group-hover:scale-125 transition-transform`} />
                      <span className="text-base md:text-lg text-gray-700 leading-relaxed">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed relative">
                  Whether you're watching, listening, or browsing, everything is right there.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleTVSection;
