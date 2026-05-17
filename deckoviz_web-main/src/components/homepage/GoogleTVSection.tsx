import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backgroundImages = [
  '/images/google-tv-images/everything-in-one-place-2x.webp=n-w2400-h1372-fcrop64=1,00000000ffffffff-rw',
  '/images/google-tv-images/maulik-2x.webp=n-w599-h337-fcrop64=1,0000001cffffffe4-rw',
  '/images/google-tv-images/Screenshot_from_2025_07_16_09_48_36_8691156ccf.webp',
  '/images/google-tv-images/original-b3de00a6da1404bafdb541fc9dbe6659.webp'
];

const GoogleTVSection: React.FC = () => {

  const [currentLeftIndex, setCurrentLeftIndex] = useState(0);
  const [currentRightIndex, setCurrentRightIndex] = useState(1);

  // Change background images every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeftIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
      setCurrentRightIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-20 right-[-80px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute top-[40%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(79, 70, 229, 0.16)" }} />
        <div className="absolute top-[40%] right-0 w-[450px] h-[450px] rounded-full blur-[90px]" style={{ background: "rgba(59, 130, 246, 0.18)" }} />
        <div className="absolute bottom-[-80px] left-[25%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(99, 102, 241, 0.14)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
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
            <span className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
              Google TV
            </span>
            . At Its Core.
          </h2>
        </motion.div>

        {/* Creative Layout with Side-by-Side Zigzag */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20 lg:space-y-32 mt-10">
          
          {/* Section 1: Image Left, Text Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-[#182A4A]/20 to-[#2563EB]/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 bg-gray-900 border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentLeftIndex}
                    src={backgroundImages[currentLeftIndex]}
                    alt="Deckoviz Display"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Text Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Blue glow blob BEHIND the glass — visible through it on hover */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] overflow-visible pointer-events-none">
                <div className="absolute -inset-6 bg-[#2563EB]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-4 bg-[#182A4A]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-100" />
              </div>

              {/* Glass Text Card 1 */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] transition-all duration-700 p-8 md:p-10 group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]"
                style={{
                  background: "rgba(255,255,255,0.30)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.50)",
                  borderTop: "1px solid rgba(255,255,255,0.80)",
                  boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
                }}
              >

                {/* Top shiny edge */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
                {/* Left shiny edge */}
                <div className="absolute left-0 inset-y-0 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
                {/* Diagonal glare — intensifies on hover */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-tl-[2rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Blue tint wash on hover — makes glass feel lit from behind */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#182A4A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                {/* Blue bottom accent */}
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent pointer-events-none" />

                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-2xl opacity-10 rotate-12 pointer-events-none" />
                
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed mb-6 relative font-semibold">
                  Deckoviz DASP isn't just a beautiful art frame. It's a full-fledged{" "}
                  <span className="font-bold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                    Google TV
                  </span>
                  , built for everyday use.
                </p>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed relative font-medium">
                  So while it transforms your space into something extraordinary, it also works exactly like the TV you already know and love.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Section 2: Text Left, Image Right */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Text Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full lg:w-1/2 relative group"
            >
              {/* Blue glow blob BEHIND the glass */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] overflow-visible pointer-events-none">
                <div className="absolute -inset-6 bg-[#2563EB]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-4 bg-[#182A4A]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 delay-100" />
              </div>
              {/* Glass Text Card 2 */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] transition-all duration-700 p-8 md:p-10 group-hover:shadow-[0_20px_60px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]"
                style={{
                  background: "rgba(255,255,255,0.30)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.50)",
                  borderTop: "1px solid rgba(255,255,255,0.80)",
                  boxShadow: "0 8px 32px rgba(31,38,135,0.12), inset 0 1px 0 rgba(255,255,255,0.60)",
                }}
              >

                {/* Top shiny edge */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
                {/* Left shiny edge */}
                <div className="absolute left-0 inset-y-0 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
                {/* Diagonal glare — intensifies on hover */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-tl-[2rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Blue tint wash on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#182A4A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" />
                {/* Blue bottom accent */}
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 right-6 w-20 h-20 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-3xl opacity-5 -rotate-12 pointer-events-none" />
                
                <h3
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  All Your Apps. All in One Place.
                </h3>

                <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6 relative font-medium">
                  Access the complete Google TV ecosystem seamlessly:
                </p>

                {/* Creative Bullet Points */}
                <ul className="space-y-4 mb-6 relative">
                  {[
                    { text: "Netflix, YouTube, Prime Video, Disney+, Spotify", color: "from-red-500 to-pink-500" },
                    { text: "Google Play Store with thousands of apps", color: "from-[#182A4A] to-[#2563EB]" },
                    { text: "Voice search with Google Assistant", color: "from-blue-500 to-cyan-500" },
                    { text: "Seamless casting from your phone", color: "from-orange-500 to-yellow-500" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                      className="flex items-start group"
                    >
                      <div className={`flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-br ${item.color} mt-2.5 mr-4 shadow-lg group-hover:scale-125 transition-transform`} />
                      <span className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                        {item.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed relative font-medium">
                  Whether you're watching, listening, or browsing, everything is right there.
                </p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-[#182A4A]/20 to-[#2563EB]/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] hover:rotate-1 transition-all duration-700 bg-gray-900 border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentRightIndex}
                    src={backgroundImages[currentRightIndex]}
                    alt="Deckoviz Display"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleTVSection;
