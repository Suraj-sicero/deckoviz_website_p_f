import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TransformWalls() {
  // Array of images from pin_images folder
  const pinImages = [
    "/images/pin_images/Starry_Night_Over_the_Rhone.jpg.jpeg",
    "/images/pin_images/access-o-keeffe-3.webp",
    "/images/pin_images/Heade-Hummingbird-and-passionflowers-DT2080.jpg.jpeg",
    "/images/pin_images/Ocean-Coast-by-Maurice-Denis.-Public-Domain.-Swedish-National-Museum.png",
    "/images/pin_images/robert-delaunay-eiffel-tower-with-trees-1910-obelisk-art-history.400x0.jpg.jpeg",
    "/images/pin_images/Vasily-Kandinsky-Black-and-Violet.webp",
    "/images/pin_images/paris-musees-online-collection-public-domain-1.jpg.jpeg",
    "/images/pin_images/paris-musees-online-collection-public-domain-4.jpg.jpeg",
    "/images/pin_images/paris-musees-online-collection-public-domain-5.jpg.jpeg",
    "/images/pin_images/paris-musees-online-collection-public-domain-6.jpg.jpeg",
    "/images/pin_images/N-Roerich-Monhegan-Maine-Google-Art-Project.jpg.jpeg",
    "/images/pin_images/champagne-printer-publisher-1897.jpg.jpeg",
    "/images/pin_images/fish-8724841_1280.png",
    "/images/pin_images/main_image_star-forming_region_carina_nircam_final-1280.jpg.jpeg",
    "/images/pin_images/WYF_L010_C_Autumn_90x100cm_9800.jpg.jpeg",
    "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=764&auto=format&fit=crop",
    "https://i.pinimg.com/736x/6a/14/5d/6a145d6fd6b80d62d3378ccfb75cbc5f.jpg",
    "https://i.pinimg.com/736x/1d/76/b8/1d76b855636a65684b11182f0fa99e43.jpg",
    "https://i.pinimg.com/736x/7e/a8/88/7ea888763035ff1abe949afca1b4cd51.jpg",
    "https://plus.unsplash.com/premium_photo-1710787193520-74df05ed7736?q=80&w=1170&auto=format&fit=crop",
    "https://i.pinimg.com/736x/b0/3b/8e/b03b8e4a1188d6b68c001cd8e9e8b490.jpg"
  ];

  // State for rotating images - 18 slots for all images
  const [currentImages, setCurrentImages] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prev => 
        prev.map(index => (index + 18) % pinImages.length)
      );
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, [pinImages.length]);

  return (
    <section className="py-12 md:py-16 lg:py-20 overflow-hidden relative bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content - Beautiful Animated Typography */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Introduction Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-teal-100 border border-cyan-200"
            >
              <span className="text-teal-700 text-sm font-semibold italic">Introducing The DAS Portal</span>
            </motion.div>

            {/* Animated Heading */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-2">
              <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-gray-900">Transform Your</span>{" "}
                <span className="relative inline-block">
                  <span className="italic text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text bg-[length:200%_auto] animate-gradient">Walls</span>
                  <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }} className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 origin-left"></motion.span>
                </span>
              </motion.h2>
              <motion.h3 initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }} className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-gray-900">Transform Your</span>{" "}
                <span className="italic text-transparent bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600 bg-clip-text bg-[length:200%_auto] animate-gradient">World.</span>
              </motion.h3>
            </motion.div>

            {/* Main Description with Animations */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} className="space-y-5 text-base md:text-lg leading-relaxed">
              <p className="text-gray-700">
                <span className="font-bold text-2xl md:text-3xl text-transparent bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text bg-[length:200%_auto] animate-gradient">
                  Deckoviz Dynamic Art and Storytelling Portal
                </span>{" "}
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="inline-block">
                  is the world's first{" "}
                  <span className="relative inline-block group">
                    <span className="font-semibold italic text-teal-600">emotionally intelligent</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-700"></span>
                  </span>{" "}
                  dynamic art frame - a new category of{" "}
                  <span className="relative inline-block px-2 py-0.5">
                    <span className="relative z-10 font-semibold italic text-orange-600">living canvas</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 rounded opacity-30"></span>
                  </span>{" "}
                  that learns from you, understands you, creates with you, and{" "}
                  <span className="font-bold text-gray-900 relative inline-block">
                    evolves alongside you
                    <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }} className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-300 to-transparent origin-left"></motion.span>
                  </span>, transforming your space into an ever-changing experience.
                </motion.span>
              </p>

              <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.7 }} className="text-gray-700">
                The{" "}
                <span className="font-bold text-xl text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">DAS Portal</span>{" "}
                brings together your{" "}
                <span className="italic text-rose-600 font-medium hover:text-rose-700 transition-colors">dynamic art canvas</span>,{" "}
                <span className="italic text-amber-600 font-medium hover:text-amber-700 transition-colors">storytelling portal</span>,{" "}
                <span className="italic text-sky-600 font-medium hover:text-sky-700 transition-colors">smart photo frame</span>,{" "}
                <span className="italic text-emerald-600 font-medium hover:text-emerald-700 transition-colors">mood setter</span>, and{" "}
                <span className="italic text-slate-700 font-medium hover:text-slate-800 transition-colors">Google TV</span> - all in one magical experience. It combines generative AI, deep personalization, immersive creative tools, and soulful design. All powered by{" "}
                <span className="relative inline-block group/vizzy">
                  <span className="font-bold text-xl text-transparent bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text bg-[length:200%_auto] animate-gradient">Vizzy</span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-lg opacity-0 group-hover/vizzy:opacity-100 transition-opacity duration-300 -z-10"></span>
                </span>{" "}
                your{" "}
                <span className="italic text-teal-700 font-medium">emotionally intelligent AI companion</span>, creative partner, personal painter, and curator.
              </motion.p>

              <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.7 }} className="text-gray-700">
                From{" "}
                <span className="relative inline-block group/art">
                  <span className="italic text-amber-700 font-medium">timeless masterpieces</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/60 to-amber-100/0 rounded opacity-0 group-hover/art:opacity-100 transition-opacity duration-500 -z-10"></span>
                </span>{" "}
                to your{" "}
                <span className="italic text-pink-600 font-medium">personal memories</span>, from{" "}
                <span className="relative inline-block group/art">
                  <span className="italic text-blue-600 font-medium">cinematic dreamscapes</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-100/0 via-blue-100/60 to-blue-100/0 rounded opacity-0 group-hover/art:opacity-100 transition-opacity duration-500 -z-10"></span>
                </span>{" "}
                to{" "}
                <span className="italic text-cyan-600 font-medium">original creations</span>{" "}
                painted in iconic art styles, Deckoviz turns your walls into an{" "}
                <span className="font-bold text-xl text-transparent bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text bg-[length:200%_auto] animate-gradient">ever-evolving gallery</span>{" "}
                of art, stories, and living posters.
              </motion.p>
            </motion.div>

            {/* Tagline with Animation */}
            <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-gray-900 italic relative inline-block" style={{ fontFamily: "'Playfair Display', serif" }}>
              Walls reimagined. Every single day.
              <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"></motion.span>
            </motion.p>

            {/* Animated Mood Pills */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.6 }} className="flex flex-wrap gap-2.5 pt-2">
              {[
                { text: "Inspired", color: "from-cyan-500 to-teal-500", delay: 0 },
                { text: "Serene", color: "from-sky-500 to-blue-500", delay: 0.05 },
                { text: "Energized", color: "from-orange-500 to-red-500", delay: 0.1 },
                { text: "Grounded", color: "from-emerald-500 to-green-600", delay: 0.15 },
                { text: "Joyous", color: "from-amber-500 to-orange-500", delay: 0.2 },
                { text: "Curious", color: "from-teal-500 to-cyan-600", delay: 0.25 },
                { text: "Playful", color: "from-pink-500 to-rose-500", delay: 0.3 },
                { text: "Nostalgic", color: "from-violet-500 to-pink-500", delay: 0.35 },
                { text: "Uplifted", color: "from-yellow-500 to-amber-500", delay: 0.4 },
                { text: "Centered", color: "from-lime-500 to-emerald-500", delay: 0.45 },
                { text: "Alive", color: "from-red-500 to-orange-500", delay: 0.5 }
              ].map((mood) => (
                <motion.span key={mood.text} initial={{ opacity: 0, scale: 0.8, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: mood.delay, duration: 0.4, type: "spring", bounce: 0.5 }} whileHover={{ scale: 1.1, y: -3 }} className={`px-4 py-2 bg-gradient-to-r ${mood.color} text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default`} style={{ fontFamily: "'Comfortaa', sans-serif" }}>
                  {mood.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated Feature Points */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.6 }} className="space-y-3 text-gray-600 text-sm md:text-base pt-2">
              {[
                { text: "Effortlessly controlled through your Deckoviz mobile companion create, curate, schedule, and shape every experience.", color: "bg-cyan-500", delay: 0 },
                { text: "Built on the Google TV platform for fluid performance, streaming versatility, and seamless smart integration.", color: "bg-orange-500", delay: 0.1 },
                { text: "Emotionally intelligent at its core. Designed for your inner world.", color: "bg-emerald-500", delay: 0.2, italic: true }
              ].map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: feature.delay, duration: 0.5 }} className="flex items-start gap-3 group">
                  <span className={`${feature.color} mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300`}></span>
                  <p className={feature.italic ? "italic" : ""}>{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated CTA Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.3, duration: 0.6 }} className="pt-4">
              <motion.button onClick={() => window.location.href = '/place-order'} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white px-8 py-3.5 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-base overflow-hidden group">
                <span className="relative z-10">Order Now</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.3 }}></motion.div>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Aesthetic Pinned Wall Collage with ALL Rotating Images */}
          <div className="relative order-1 lg:order-2 h-[1100px] md:h-[1200px]">
            {/* Large center art piece - Slot 0 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 0 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 2 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
              animate={{ y: [0, -8, 0] }}
              style={{ animationDuration: "6s", animationIterationCount: "infinite" }}
              className="absolute top-0 right-0 w-[70%] h-[45%] bg-white p-4 shadow-2xl hover:shadow-3xl transition-shadow duration-300 cursor-pointer"
            >
              <motion.img 
                key={currentImages[0]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[0]]} 
                alt="Living Art" 
                className="w-full h-full object-cover" 
              />
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-2 text-sm text-gray-600 italic font-handwriting"
              >
                Living Art
              </motion.p>
            </motion.div>

            {/* Small top left - Slot 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -10 }} 
              whileInView={{ opacity: 1, x: 0, rotate: -5 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.1, rotate: 0, y: -5, transition: { duration: 0.3 } }}
              animate={{ y: [0, -5, 0] }}
              style={{ animationDuration: "4s", animationIterationCount: "infinite" }}
              className="absolute top-0 left-0 w-32 h-40 bg-white p-2 shadow-xl hover:shadow-2xl z-10 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[1]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[1]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Top right with cyan pin - Slot 2 */}
            <motion.div 
              initial={{ opacity: 0, y: -30, rotate: 12 }} 
              whileInView={{ opacity: 1, y: 0, rotate: 8 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.3, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 3, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [8, 10, 8] }}
              style={{ animationDuration: "5s", animationIterationCount: "infinite" }}
              className="absolute top-8 right-4 w-40 h-32 bg-white p-3 shadow-xl hover:shadow-2xl z-20 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[2]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[2]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-1 text-xs text-gray-600 italic font-handwriting"
              >
                Timeless
              </motion.p>
            </motion.div>

            {/* Middle left - Slot 3 */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -8 }} 
              whileInView={{ opacity: 1, x: 0, rotate: -3 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.4, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 2, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [-3, -5, -3] }}
              style={{ animationDuration: "5.5s", animationIterationCount: "infinite" }}
              className="absolute top-[45%] left-4 w-44 h-32 bg-white p-3 shadow-xl hover:shadow-2xl z-20 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[3]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[3]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
              <motion.p 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="text-center mt-1 text-xs text-gray-600 italic font-handwriting"
              >
                Vibrant
              </motion.p>
            </motion.div>

            {/* Middle right with emerald pin - Slot 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, rotate: 10 }} 
              whileInView={{ opacity: 1, y: 0, rotate: 5 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.5, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -10, transition: { duration: 0.3 } }}
              animate={{ y: [0, -8, 0], rotate: [5, 7, 5] }}
              style={{ animationDuration: "6.5s", animationIterationCount: "infinite" }}
              className="absolute top-[48%] right-12 w-36 h-40 bg-white p-3 shadow-xl hover:shadow-2xl z-30 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[4]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[4]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
              <motion.p 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-1 text-xs text-gray-600 italic font-handwriting"
              >
                Nature
              </motion.p>
            </motion.div>

            {/* Bottom left corner - Slot 5 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.6, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.1, rotate: -3, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [-8, -10, -8] }}
              style={{ animationDuration: "4.5s", animationIterationCount: "infinite" }}
              className="absolute bottom-[35%] left-8 w-32 h-28 bg-white p-2 shadow-xl hover:shadow-2xl z-25 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[5]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[5]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom row - 5 more images aesthetically arranged */}
            
            {/* Bottom left with pink pin - Slot 6 */}
            <motion.div 
              initial={{ opacity: 0, x: -40, rotate: -10 }} 
              whileInView={{ opacity: 1, x: 0, rotate: -6 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.7, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -2, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [-6, -8, -6] }}
              style={{ animationDuration: "5.2s", animationIterationCount: "infinite" }}
              className="absolute bottom-[8%] left-2 w-40 h-36 bg-white p-3 shadow-xl hover:shadow-2xl z-20 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="absolute -top-2 left-8 w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[6]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[6]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom center-left - Slot 7 */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: 8 }} 
              whileInView={{ opacity: 1, y: 0, rotate: 4 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.8, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [4, 6, 4] }}
              style={{ animationDuration: "5.8s", animationIterationCount: "infinite" }}
              className="absolute bottom-[12%] left-[28%] w-36 h-32 bg-white p-2 shadow-xl hover:shadow-2xl z-15 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[7]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[7]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom center with orange pin - Slot 8 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -7 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.9, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -8, 0], rotate: [-3, -5, -3] }}
              style={{ animationDuration: "6.2s", animationIterationCount: "infinite" }}
              className="absolute bottom-[5%] left-[48%] w-38 h-36 bg-white p-3 shadow-xl hover:shadow-2xl z-25 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.13, 1] }}
                transition={{ duration: 2.3, repeat: Infinity }}
                className="absolute -top-2 right-8 w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[8]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[8]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom center-right - Slot 9 */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 9 }} 
              whileInView={{ opacity: 1, x: 0, rotate: 5 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 1.0, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 1, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [5, 7, 5] }}
              style={{ animationDuration: "5.5s", animationIterationCount: "infinite" }}
              className="absolute bottom-[15%] right-[18%] w-34 h-30 bg-white p-2 shadow-xl hover:shadow-2xl z-18 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[9]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[9]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom right with violet pin - Slot 10 */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -11 }} 
              whileInView={{ opacity: 1, y: 0, rotate: -7 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 1.1, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -2, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [-7, -9, -7] }}
              style={{ animationDuration: "6s", animationIterationCount: "infinite" }}
              className="absolute bottom-[8%] right-4 w-36 h-38 bg-white p-3 shadow-xl hover:shadow-2xl z-22 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[10]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[10]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Additional images to fill empty spaces */}
            
            {/* Top center - Slot 11 */}
            <motion.div 
              initial={{ opacity: 0, y: -30, rotate: -6 }} 
              whileInView={{ opacity: 1, y: 0, rotate: -3 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.35, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [-3, -5, -3] }}
              style={{ animationDuration: "5.3s", animationIterationCount: "infinite" }}
              className="absolute top-[18%] left-[35%] w-36 h-32 bg-white p-2 shadow-xl hover:shadow-2xl z-15 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[11]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[11]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Middle center with teal pin - Slot 12 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 7 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 4 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.55, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [4, 6, 4] }}
              style={{ animationDuration: "5.7s", animationIterationCount: "infinite" }}
              className="absolute top-[38%] left-[42%] w-40 h-36 bg-white p-3 shadow-xl hover:shadow-2xl z-28 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.1, repeat: Infinity }}
                className="absolute -top-2 right-10 w-4 h-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[12]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[12]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Lower middle left - Slot 13 */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -9 }} 
              whileInView={{ opacity: 1, x: 0, rotate: -5 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.65, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -1, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [-5, -7, -5] }}
              style={{ animationDuration: "5.4s", animationIterationCount: "infinite" }}
              className="absolute bottom-[28%] left-[18%] w-38 h-34 bg-white p-2 shadow-xl hover:shadow-2xl z-20 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[13]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[13]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Lower middle right with rose pin - Slot 14 */}
            <motion.div 
              initial={{ opacity: 0, x: 30, rotate: 10 }} 
              whileInView={{ opacity: 1, x: 0, rotate: 6 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.75, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 2, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [6, 8, 6] }}
              style={{ animationDuration: "5.9s", animationIterationCount: "infinite" }}
              className="absolute bottom-[25%] right-[25%] w-36 h-32 bg-white p-3 shadow-xl hover:shadow-2xl z-24 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.11, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="absolute -top-2 left-8 w-4 h-4 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[14]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[14]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom far left - Slot 15 */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -13 }} 
              whileInView={{ opacity: 1, y: 0, rotate: -9 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.85, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -4, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -6, 0], rotate: [-9, -11, -9] }}
              style={{ animationDuration: "5.6s", animationIterationCount: "infinite" }}
              className="absolute bottom-[2%] left-[8%] w-34 h-32 bg-white p-2 shadow-xl hover:shadow-2xl z-16 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[15]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[15]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom center-left with amber pin - Slot 16 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 6 }} 
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 0.95, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -8, 0], rotate: [3, 5, 3] }}
              style={{ animationDuration: "6.1s", animationIterationCount: "infinite" }}
              className="absolute bottom-[3%] left-[38%] w-36 h-34 bg-white p-3 shadow-xl hover:shadow-2xl z-23 cursor-pointer transition-shadow duration-300"
            >
              <motion.div 
                animate={{ scale: [1, 1.13, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-2 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md"
              ></motion.div>
              <motion.img 
                key={currentImages[16]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[16]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Bottom far right - Slot 17 */}
            <motion.div 
              initial={{ opacity: 0, x: 40, rotate: 11 }} 
              whileInView={{ opacity: 1, x: 0, rotate: 7 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, delay: 1.05, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.08, rotate: 3, y: -8, transition: { duration: 0.3 } }}
              animate={{ y: [0, -7, 0], rotate: [7, 9, 7] }}
              style={{ animationDuration: "5.8s", animationIterationCount: "infinite" }}
              className="absolute bottom-[1%] right-[12%] w-38 h-36 bg-white p-2 shadow-xl hover:shadow-2xl z-19 cursor-pointer transition-shadow duration-300"
            >
              <motion.img 
                key={currentImages[17]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                src={pinImages[currentImages[17]]} 
                alt="Art Piece" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
