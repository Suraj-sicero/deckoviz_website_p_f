import { Sparkles, Wand2, Heart, Sun } from "lucide-react";
import InteractiveParticleGraphic from "./other/InteractiveParticleGraphic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -50px 0px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const ABOUT_US_IMAGES = [
  "/images/about_us_images/Nov 18, 2025, 10_52_27 PM.png",
  "/images/about_us_images/Nov 18, 2025, 10_52_46 PM.png",
  "/images/about_us_images/Nov 18, 2025, 10_52_56 PM.png",
  "/images/about_us_images/ee3164c2-c758-4655-b33c-04eaf3b9d52a.png",
  "/images/about_us_images/f08689c6-51e8-4c9c-9025-da12d8cc2433.png",
  "/images/about_us_images/f86905e0-a200-4c70-b595-4d039a0b905a.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23850.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23851.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23854.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23856.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23857.png",
  "/images/about_us_images/freepik__the-style-is-candid-image-photography-with-natural__23864.png"
];

export default function AboutUs() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const smoothPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideIndex2, setSlideIndex2] = useState(Math.floor(ABOUT_US_IMAGES.length / 2));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % ABOUT_US_IMAGES.length);
      setSlideIndex2((prev) => (prev + 1) % ABOUT_US_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let target = { x: -200, y: -200 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, target.x, 0.07);
      smoothPos.current.y = lerp(smoothPos.current.y, target.y, 0.07);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x - 200}px, ${smoothPos.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  return (
    <div id="about" className="relative min-h-screen bg-white overflow-x-hidden">

      {/* ── High-Fidelity Codex-style Fluid Gradient Background ── */}
      <style>{`
        @keyframes fluid-drift-1 {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); }
          33% { transform: scale(1.1) translate(6vw, 8vh) rotate(8deg); }
          66% { transform: scale(0.9) translate(-6vw, 10vh) rotate(-5deg); }
          100% { transform: scale(1) translate(0, 0) rotate(0deg); }
        }
        @keyframes fluid-drift-2 {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); }
          33% { transform: scale(0.9) translate(-8vw, -6vh) rotate(-8deg); }
          66% { transform: scale(1.1) translate(8vw, -10vh) rotate(6deg); }
          100% { transform: scale(1) translate(0, 0) rotate(0deg); }
        }
        @keyframes fluid-drift-3 {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); }
          33% { transform: scale(1.1) translate(8vw, -8vh) rotate(6deg); }
          66% { transform: scale(0.9) translate(-6vw, 10vh) rotate(-8deg); }
          100% { transform: scale(1) translate(0, 0) rotate(0deg); }
        }
        @keyframes fluid-drift-4 {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); }
          33% { transform: scale(0.95) translate(-8vw, 8vh) rotate(-4deg); }
          66% { transform: scale(1.05) translate(10vw, -6vh) rotate(4deg); }
          100% { transform: scale(1) translate(0, 0) rotate(0deg); }
        }
        
        .mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          will-change: auto;
        }

        #about h1, #about h2 {
          font-family: 'Playfair Display', serif !important;
        }

        /* Deep Navy Blue */
        .mesh-blob-1 {
          width: 80vw;
          height: 80vw;
          background: #1B2A4A;
          left: -20vw;
          top: -20vh;
          animation: fluid-drift-1 25s ease-in-out infinite;
        }
        /* Royal Blue */
        .mesh-blob-2 {
          width: 70vw;
          height: 70vw;
          background: #2563EB;
          right: -10vw;
          top: 10vh;
          animation: fluid-drift-2 30s ease-in-out infinite;
        }
        /* Cyan */
        .mesh-blob-3 {
          width: 90vw;
          height: 90vw;
          background: #06b6d4;
          left: 10vw;
          bottom: -30vh;
          animation: fluid-drift-3 28s ease-in-out infinite;
        }
        /* Sky Blue */
        .mesh-blob-4 {
          width: 60vw;
          height: 60vw;
          background: #38bdf8;
          right: 20vw;
          bottom: -15vh;
          animation: fluid-drift-4 35s ease-in-out infinite;
        }
      `}</style>
      
      {/* Base Light Background */}
      <div className="fixed inset-0 z-0 bg-[#f8fafc] pointer-events-none" />

      {/* Fluid animated background mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative w-[120vw] h-[120vh] max-w-[2000px]">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="mesh-blob mesh-blob-4" />
        </div>
      </div>

      {/* Interactive Cursor Sphere */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] rounded-full transition-opacity duration-[400ms] will-change-transform ease-out top-0 left-0"
        style={{
          width: 400,
          height: 400,
          transform: 'translate(-400px, -400px)',
          background: 'radial-gradient(circle at center, rgba(37,99,235,0.7) 0%, rgba(6,182,212,0.3) 40%, transparent 70%)',
          opacity: cursorVisible ? 1 : 0,
          filter: 'blur(60px)',
          /* mixBlendMode removed for cleaner visual blending */
        }}
      />

      {/* Decorative 3D Elements with hover effects */}
      <div className="absolute top-48 left-4 sm:left-12 md:left-60 w-16 h-16 sm:w-20 sm:h-20 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/text3D.png"
          alt="3D Text"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      <div className="absolute top-80 left-8 sm:left-20 md:left-72 w-14 h-14 sm:w-16 sm:h-16 z-30 cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-rotate-12 hover:drop-shadow-2xl">
        <img
          src="/images/3dicons-brush-dynamic-color.png"
          alt="3D Brush"
          className="w-full h-full object-contain drop-shadow-lg pointer-events-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Shiny glowing Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center pt-4 pb-2 mt-24 mb-6"
        >
          <div className="relative group cursor-default">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500" />
            <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-6 py-1.5 rounded-xl text-sm font-semibold tracking-widest uppercase shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              Who We Are
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Hero heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 bg-gradient-to-br from-[#182A4A] via-[#2563EB] to-teal-400 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          About Us
        </motion.h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2563EB]/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#182A4A]/50" />
        </div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
          className="max-w-2xl mx-auto mb-20 sm:mb-28 px-4"
        >
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
            At <span className="text-[#2563EB] font-bold">Deckoviz</span>, we are reimagining what it means to live, work,
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
            and <span className="text-teal-500 font-bold">feel</span> within a space.
          </p>
        </motion.div>

        {/* Premium Staggered Image Showcase */}
        <div className="relative max-w-6xl mx-auto mb-28">
          {/* Ambient background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-300/15 rounded-full blur-[60px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-end">
            {/* Card 1 - tall, left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0 }}
              className="group relative overflow-hidden rounded-[2rem] lg:translate-y-8 cursor-pointer"
              style={{ boxShadow: '0 24px 60px rgba(37,99,235,0.2), 0 4px 16px rgba(0,0,0,0.08)' }}>
              {/* Glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-[2.2rem] opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10 blur-sm" />
              {/* Corner ornament */}
              <div className="absolute top-4 right-4 z-20 w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 z-20 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-xl" />

              <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem]">
                <img src="/images/about1.png" alt="Modern living room with mountain landscape display"
                  className="w-full h-full object-cover object-[center_right] transition-transform duration-700 group-hover:scale-105 scale-100" />
                {/* Always-on subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b36]/70 via-[#0d1b36]/10 to-transparent" />
                {/* Hover shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-full group-hover:translate-x-0" style={{ transition: 'opacity 0.7s, transform 0.9s' }} />
              </div>

              {/* Label chip */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-[#182A4A]/80  px-3 py-1.5 rounded-full border border-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">Living Space</span>
              </div>
              {/* Bottom caption */}
              <div className="absolute bottom-5 inset-x-5 z-20">
                <p className="text-white/80 text-xs font-medium leading-snug">Mountain landscape display - immersive & serene</p>
              </div>
            </motion.div>

            {/* Card 2 - extra tall, center */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className="group relative overflow-hidden rounded-[2rem] cursor-pointer"
              style={{ boxShadow: '0 32px 80px rgba(20,184,166,0.2), 0 6px 20px rgba(0,0,0,0.10)' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-[#2563EB] to-teal-400 rounded-[2.2rem] opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10 blur-sm" />
              <div className="absolute top-4 right-4 z-20 w-8 h-8 border-t-2 border-r-2 border-teal-300/60 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 z-20 w-8 h-8 border-b-2 border-l-2 border-teal-300/30 rounded-bl-xl" />

              <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden rounded-[2rem]">
                <img src="/images/about2.png" alt="Contemporary space with cosmic night sky display"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b2e]/70 via-[#0d2b2e]/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-teal-900/70  px-3 py-1.5 rounded-full border border-teal-300/30">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                <span className="text-teal-100 text-[10px] font-bold tracking-widest uppercase">Cosmic Art</span>
              </div>
              {/* Featured badge */}
              <div className="absolute top-5 right-5 z-20 bg-gradient-to-r from-[#2563EB] to-teal-400 text-white text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase">
                ★ Featured
              </div>
              <div className="absolute bottom-5 inset-x-5 z-20">
                <p className="text-white/80 text-xs font-medium leading-snug">Cosmic night sky display - wonder & depth</p>
              </div>
            </motion.div>

            {/* Card 3 - tall, right */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.24 }}
              className="group relative overflow-hidden rounded-[2rem] lg:translate-y-8 cursor-pointer"
              style={{ boxShadow: '0 24px 60px rgba(24,42,74,0.2), 0 4px 16px rgba(0,0,0,0.08)' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-[#182A4A] rounded-[2.2rem] opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10 blur-sm" />
              <div className="absolute top-4 right-4 z-20 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 z-20 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />

              <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem]">
                <img src="/images/about3.png" alt="Modern interior with ocean sunset display"
                  className="w-full h-full object-cover object-[80%_center] transition-transform duration-700 group-hover:scale-105 scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2b]/70 via-[#0d1b2b]/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-[#182A4A]/80  px-3 py-1.5 rounded-full border border-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">Interior</span>
              </div>
              <div className="absolute bottom-5 inset-x-5 z-20">
                <p className="text-white/80 text-xs font-medium leading-snug">Ocean sunset display - warmth & vitality</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="mt-20 max-w-6xl mx-auto px-4">

          {/* Company Description Section */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16"
          >
            <div className="text-left">
              {/* Accent bar */}
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-1 h-full min-h-[120px] rounded-full bg-gradient-to-b from-[#2563EB] to-teal-400" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                  We are a <span className="bg-gradient-to-r from-[#2563EB] to-teal-400 bg-clip-text text-transparent">next-generation</span>
                  <br />company innovating at
                  <br />the frontier of emotional-amplifying tech.
                </h2>
              </div>
            </div>
            <div className="text-left flex items-center">
              <div className="relative">
                {/* Quote mark */}
                <div className="absolute -top-4 -left-4 text-6xl text-[#2563EB]/10 font-black leading-none select-none">&ldquo;</div>
                <p className="text-gray-500 leading-relaxed text-base sm:text-lg relative z-10">
                  where deep personalization, generative AI, new modalities of art and storytelling, new modalities of
                  mood and state setting, and emotionally intelligent technology converge. Our mission is
                  simple yet profound: to infuse environments with more beauty, meaning, emotion, vitality, and
                  wonder - powered by the most human-centric, expression-amplifying technologies ever created.
                </p>
              </div>
            </div>
          </motion.div>


          {/* Flagship Products Container - frosted glass */}
          <motion.div {...fadeUp} className="mb-20">
            <div className="group relative overflow-hidden rounded-3xl p-6 mt-8 sm:p-10 lg:p-14
              bg-white/30  transform-gpu
              border border-white/50
              shadow-[0_8px_40px_rgba(37,99,235,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]
              hover:shadow-[0_16px_60px_rgba(37,99,235,0.15)]
              transition-all duration-500">
              {/* Shimmer top edge */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
              {/* Diagonal glare */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/30 to-transparent pointer-events-none opacity-70" />
              {/* Vertical separator */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#2563EB]/20 to-transparent transform -translate-x-1/2 hidden lg:block" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                <div className="text-center lg:text-left lg:pr-6">
                  <div className="text-xs font-bold text-[#2563EB] tracking-widest uppercase mb-3 bg-[#2563EB]/8 border border-[#2563EB]/20 inline-block px-4 py-1.5 rounded-full">
                    OUR FLAGSHIP PRODUCT
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Deckoviz DASP 1</h4>
                </div>
                <div className="text-center lg:text-left lg:pl-6">
                  <div className="text-xs font-bold text-teal-600 tracking-widest uppercase mb-3 bg-teal-50 border border-teal-200/50 inline-block px-4 py-1.5 rounded-full">
                    Coming Soon
                  </div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Spatial Enhancement System</h4>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Description - highlighted pull quote */}
          <motion.div {...fadeUp} className="relative mb-20">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/5 via-teal-300/5 to-transparent rounded-3xl" />
            <div className="relative border-l-4 border-gradient-to-b border-[#2563EB] pl-8 py-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2563EB] to-teal-400 rounded-full" />
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-medium max-w-5xl">
                Through the power of proprietary modelling and personalization engines, generative creativity, intelligent
                curation, and a suite of story-affirming features, Deckoviz creates deeply emotionally attuned, multisensory
                visual experiences - designed to <span className="text-[#2563EB] font-semibold">inspire</span>, <span className="text-teal-500 font-semibold">soothe</span>, <span className="font-semibold text-[#182A4A]">energize</span>, or uplift, depending on your
                intentions and needs. Every piece of art it displays, every visual it curates, is attuned to your unique life, spirit, and essence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Philosophy Section */}
        <div className="relative mt-32 mb-32 overflow-hidden py-16">
          <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
            <InteractiveParticleGraphic />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 pointer-events-none">

            {/* Our Philosophy Grid Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 pointer-events-auto"
            >
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-10 w-full justify-center">
                <div className="h-px flex-1 bg-gradient-to-l from-[#2563EB]/30 to-transparent" />
                <div className="relative group cursor-default">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-40 transition duration-500" />
                  <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-5 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                    Our Philosophy
                  </div>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
              </div>

              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                  We believe technology should not just be{' '}
                  <span className="bg-gradient-to-r from-[#2563EB] to-teal-400 bg-clip-text text-transparent">functional</span>
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                  At Deckoviz, we are pioneering a new category of<br />
                  AI-powered spatial enhancement and state-setting - bringing<br />
                  future-ready tech, personalization, and emotion<br />
                  into homes, offices, restaurants, hotels, wellness spaces, and beyond.
                </p>
              </div>
            </motion.div>

            {/* Four Philosophy Cards - glassmorphic */}
            <div className="relative pointer-events-auto">
              {/* Ambient glow */}
              <div className="absolute inset-0 -z-10" style={{ background: 'conic-gradient(from 0deg at center, rgba(37,99,235,0.12) 0%, rgba(24,42,74,0.10) 90deg, rgba(20,184,166,0.06) 180deg, rgba(37,99,235,0.04) 270deg, rgba(24,42,74,0.06) 360deg)', borderRadius: '60%', filter: 'blur(80px)' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { icon: Sparkles, text: 'It should be beautiful.', accent: 'from-[#182A4A] to-[#2563EB]', glow: 'rgba(37,99,235,0.2)' },
                  { icon: Wand2, text: 'It should be magical.', accent: 'from-[#2563EB] to-teal-400', glow: 'rgba(20,184,166,0.2)' },
                  { icon: Heart, text: 'It should be emotionally enriching.', accent: 'from-teal-400 to-[#182A4A]', glow: 'rgba(24,42,74,0.2)' },
                  { icon: Sun, text: 'It should help us live more intentionally, more expressively, more joyfully', accent: 'from-[#182A4A] to-teal-400', glow: 'rgba(37,99,235,0.15)' },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl p-7 text-center
                    bg-white/60 
                    border border-white/70
                    shadow-[0_4px_24px_rgba(37,99,235,0.07),inset_0_1px_1px_rgba(255,255,255,0.8)]
                    hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)]
                    hover:-translate-y-2 transition-all duration-500 cursor-default">
                    {/* Shiny edge */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                    {/* Bottom accent bar */}
                    <div className={`absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl`} />
                    {/* Icon ring */}
                    <div className={`relative mx-auto mb-5 w-20 h-20 rounded-2xl bg-gradient-to-br ${card.accent} p-0.5`}>
                      <div className="w-full h-full rounded-[0.9rem] bg-white/90 flex items-center justify-center text-[#2563EB]">
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">{card.text}</h3>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Vision Section */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">

            {/* Full-width dark glass panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[2.5rem] mb-16
              bg-gradient-to-br from-[#0d1b36] to-[#182A4A]
              border border-white/10
              shadow-[0_32px_80px_rgba(24,42,74,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]">
              {/* Decorative lines */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
              {/* Ambient blobs inside panel */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#2563EB]/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-[60px]" />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="relative z-10 p-10 md:p-16 text-center">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white/10 border border-white/20 text-white/90 px-5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase  flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    Our Mission and Vision
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-white/70 leading-relaxed max-w-4xl mx-auto">
                  Our mission is to develop an ecosystem of cutting-edge, artistically rich,
                  technologically beautiful products that continue to blur the lines between
                  technology, art, and life design, breathing curiosity, wonder, joy, and inspiration into
                  every corner of your world, both inner and outer.
                </p>
              </div>
            </motion.div>

            {/* Two Column Vision blocks */}
            <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left - numbered vision statements */}
              <div className="space-y-6">
                {[
                  { num: '01', title: 'We envision a world where your spaces are not static, but alive with your story. Where art evolves with you, your moods, your states.', body: 'Where your home and work environments are extensions of your innermost self – vibrant, dynamic, evolving, richly expressed.' },
                  { num: '02', title: 'We are building the next generation of ecosystem at the crossroads of evolving art, gen AI, emotional modelling, and soulful design.', body: 'Creating living environments that resonate emotionally, artistically, and intelligently with the people who inhabit them.' },
                ].map((item) => (
                  <div key={item.num} className="group flex gap-5 items-start p-6 rounded-2xl
                    bg-white/50  border border-white/60
                    shadow-[0_4px_20px_rgba(37,99,235,0.06)]
                    hover:shadow-[0_8px_32px_rgba(37,99,235,0.14)] hover:-translate-y-1 transition-all duration-400">
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-black">{item.num}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right - image with glow frame */}
              <div className="relative">
                <div className="absolute -inset-16 transform"
                  style={{ background: 'conic-gradient(from 0deg at center, rgba(37,99,235,0.18) 0%, rgba(24,42,74,0.14) 90deg, rgba(20,184,166,0.06) 180deg, rgba(37,99,235,0.10) 270deg, rgba(24,42,74,0.12) 360deg)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 1 }} />
                <div className="relative bg-gradient-to-b from-[#2563EB] via-teal-400 to-[#182A4A] rounded-2xl shadow-lg max-w-sm mx-auto ml-8 overflow-hidden" style={{ zIndex: 2, padding: '4px' }}>
                  <img src="/images/Gemini_Generated_Image_qcetl0qcetl0qcet.jpeg" alt="AI-Powered Vision That Inspires You" className="w-full h-auto object-cover rounded-xl" />
                  {/* AI Badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95  text-gray-900 px-4 py-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 w-max">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">AI</div>
                      <div className="text-xs text-gray-500">Vision That Inspires You</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Section 1 - Our Product Deckoviz */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge - brand pill */}
            <div className="flex justify-start mb-8">
              <div className="relative group cursor-default">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-30 transition duration-500" />
                <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-5 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-xl">
                  The Deckoviz DASP
                </div>
              </div>
            </div>

            {/* Two Column Layout - Text Left, Image Right */}
            <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="text-left space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Our First Product :
                    <br />
                    <span className="text-[#2563EB]">Deckoviz DASP</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    Deckoviz DASP is a personalized Dynamic Art and Storytelling Portal art frame, 
                    <br />
                    that curates, creates, and displays a continually evolving collection of
                    <br />
                    artworks, paintings, photography, and visuals all tailored
                    <br />
                    precisely to your tastes, moods, goals, intentions, and inner
                    <br />
                    world.
                  </p>

                  <button onClick={() => (window.location.href = "/transform-walls")} className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8">
                    Find Out More
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">It evolves hourly, daily, or at any pace you choose.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">
                        It creates and curates art that feels like it was made
                        <br />
                        for you - because, it was.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image with Browser Frame */}
              <div className="relative">
                {/* Pink/Violet gradient background like in your image */}
                <div
                  className="absolute -inset-20 transform"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, rgba(24,42,74,0.12) 40%, rgba(20,184,166,0.08) 80%, transparent 100%)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    zIndex: 1,
                  }}
                />

                {/* Browser mockup container - WHITE with shadow */}
                <div
                  className="relative bg-white rounded-3xl overflow-hidden max-w-xs sm:max-w-md mx-auto border border-gray-200"
                  style={{
                    zIndex: 2,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  {/* Browser header */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>

                    {/* URL bar with lock icon */}
                    <div className="flex items-center bg-gray-300 px-3 py-1.5 rounded-lg">
                      <svg className="w-3 h-3 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">Deckoviz.com</span>
                    </div>

                    <div></div>
                  </div>

                  {/* Image content */}
                  <div className="aspect-square relative overflow-hidden">
                    <AnimatePresence>
                      <motion.img
                        key={slideIndex2}
                        src={ABOUT_US_IMAGES[slideIndex2]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        alt="Deckoviz AI Art Frame"
                        className="w-full h-full object-cover absolute top-0 left-0"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
        </div>

        {/* Product Section 2 - Think of Deckoviz */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge - Blue bg */}
            <div className="flex justify-center mb-8 lg:justify-end lg:mr-10">
              <div className="relative group cursor-default">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-30 transition duration-500" />
                <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-5 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase shadow-xl">
                  Some Product Highlights
                </div>
              </div>
            </div>

            {/* Two Column Layout - Image Left, Text Right */}
            <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Image with Browser Frame */}
              <div className="relative">
                {/* Pink/Violet gradient background */}
                <div
                  className="absolute -inset-20 transform"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, rgba(24,42,74,0.12) 40%, rgba(20,184,166,0.08) 80%, transparent 100%)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                    zIndex: 1,
                  }}
                />

                {/* Browser mockup container - WHITE with shadow */}
                <div
                  className="relative bg-white rounded-3xl overflow-hidden max-w-xs sm:max-w-md mx-auto border border-gray-200"
                  style={{
                    zIndex: 2,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  {/* Browser header */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>

                    {/* URL bar with lock icon */}
                    <div className="flex items-center bg-gray-300 px-3 py-1.5 rounded-lg">
                      <svg className="w-3 h-3 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">Deckoviz.com</span>
                    </div>

                    <div></div>
                  </div>

                  {/* Image content */}
                  <div className="aspect-square relative overflow-hidden">
                    <AnimatePresence>
                      <motion.img
                        key={currentSlideIndex}
                        src={ABOUT_US_IMAGES[currentSlideIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        alt="Deckoviz dynamically loading artwork displays"
                        className="w-full h-full object-cover absolute top-0 left-0"
                      />
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Right Column - Text Content */}
              <div className="text-left space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    Think of Deckoviz as a
                    <br />
                    new kind of art experience:
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    With stunning personal art and posters, customizable frame options,
                    <br />
                    collections, evolving AI art styles, and endless possibilities for
                    <br />
                    expression, Deckoviz ensures that your space never feels
                    <br />
                    stale - only ever more you.
                  </p>

                  <button className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
                    Find Out More
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">From static to alive.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">From generic to deeply personal.</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">
                        From merely decorative to emotionally
                        <br />
                        moving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our Technology Section */}
        <div className="relative mt-32 mb-32">
          {/* Radial gradient background - moved down and slightly darker */}
          <div
            className="absolute inset-0 transform translate-y-16"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, rgba(24,42,74,0.12) 25%, rgba(20,184,166,0.08) 50%, rgba(240,248,255,0.05) 75%, transparent 100%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Technology
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                The Magic Behind The DASP Technology
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                At the heart of Deckoviz lies our proprietary AI personalization architecture,
                <br />
                built from the ground up to understand you intimately, and learns more about you over time,
                <br />
                tuning its creations, personality, towards yours, adapting to your rhythms, taste, inner world. 
              </p>
            </div>

            {/* Three Technology Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Card 1 - Taste & Preference */}
              <div className="relative rounded-3xl p-6 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                {/* Image container with glass background */}
                <div className="bg-white/40  transform-gpu border border-white/80 rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle1.png"
                    alt="AI character representing taste and preferences"
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
                  />
                </div>

                {/* Single tag aligned left */}
                <div className="mb-4 flex justify-start">
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">
                    Taste & Preference
                  </span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your tastes, your preferences,
                  <br />
                  your emotional states.
                </h3>

                {/* Learn More Button with exact styling */}
                <button className="w-full bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] text-sm">
                  Learn More
                </button>
              </div>

              {/* Card 2 - Dream & Moods */}
              <div className="relative rounded-3xl p-6 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                {/* Image container with glass background */}
                <div className="bg-white/40  transform-gpu border border-white/80 rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle2.png"
                    alt="AI character representing dreams and moods"
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
                  />
                </div>

                {/* Two tags aligned left */}
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">Dream</span>
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">Moods</span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your intentions, your
                  <br />
                  dreams, your moods.
                </h3>

                {/* Learn More Button */}
                <button className="w-full bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] text-sm">
                  Learn More
                </button>
              </div>

              {/* Card 3 - Beauty, Growth, Connection */}
              <div className="relative rounded-3xl p-6 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                {/* Image container with glass background */}
                <div className="bg-white/40  transform-gpu border border-white/80 rounded-2xl p-4 mb-6 aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/doodle3.png"
                    alt="AI character representing beauty, growth and connection"
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
                  />
                </div>

                {/* Three tags aligned left */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">Beauty</span>
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">Growth</span>
                  <span className="text-xs bg-white/60  border border-white/80 text-gray-700 px-3 py-1 rounded-full font-semibold shadow-sm">
                    Connection
                  </span>
                </div>

                {/* Title with exact line breaks - left aligned with Bricolage Grotesque font */}
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-tight text-left"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Your desire for beauty, growth,
                  <br />
                  expression, and connection.
                </h3>

                {/* Learn More Button */}
                <button className="w-full bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 py-3 rounded-xl font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Learning Section */}
        <div className="relative mt-32 mb-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            {/* Cloud Image */}
            <div className="flex justify-center mb-8">
              <img src="/images/cloud.png" alt="AI Cloud" className="w-16 h-16 object-contain" />
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Vizzy, your AI learns, grows, evolves, curates, creates, 
              <br />
              with you.
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-700 leading-relaxed mb-16 max-w-3xl mx-auto">
              It evolves with you helping you craft a living environment that
              <br />
              feels more alive, more inspiring, more aligned with your true self.
            </p>

            {/* Systems Description with Bricolage Grotesque font */}
            <h3
              className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-16"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              We leverage multi-layered AI systems to:
            </h3>

            {/* Four AI Capabilities with enhanced design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {/* Capability 1 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-violet-200/30 to-pink-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-violet-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-pink-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-violet-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-violet-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Understand and model
                      <br />
                      your emotional
                      <br />
                      landscape.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 2 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8-2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Create and curate 
                      <br />
                      dynamically evolving, 
                      <br />
                      multisensory art
                      <br />
                      experiences.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 3 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-pink-200/30 to-red-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, rgba(239, 68, 68, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-pink-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Generate original
                      <br />
                      and personal visuals tuned  
                      <br />
                      to your unique aesthetic
                      <br />
                      fingerprint.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Capability 4 */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className="relative rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 h-80 flex flex-col"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 60%, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.03) 40%, rgba(255, 255, 255, 1) 70%)",
                  }}
                >
                  {/* Icon with enhanced styling - positioned lower */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl blur-lg opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Text with enhanced styling */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4
                      className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-green-700 transition-colors duration-300"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Keep your spaces
                      <br />
                      vibrant, fresh, and
                      <br />
                      deeply reflective of
                      <br />
                      your journey.
                    </h4>
                  </div>

                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Future Section */}
        <div className="relative mt-32 mb-32">
          {/* Intentionally removed the pink static gradient here to let the global interactive fluid mesh show through clearly */}

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#6670d8] text-white px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                Our Future
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Where Are We Going
            </h2>

            {/* Subheading */}
            <p className="text-lg text-gray-800 leading-relaxed mb-4 max-w-2xl mx-auto">
              Deckoviz DASP is just the beginning.
            </p>

            {/* Description */}
            <div className="text-gray-800 leading-relaxed mb-16 max-w-3xl mx-auto">
              <p className="mb-2">
                We are committed to creating a future where personalization, beauty, technology, and
                <br />
                human emotions are not separate realms but one seamless experience.
                <br />
                We are building an ecosystem of products that reimagine:
              </p>
            </div>

            {/* Three Future Cards */}
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Card 1 - Home Spaces */}
              <div className="relative rounded-[2rem] p-8 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-white/40  p-3 rounded-2xl border border-white/80 shadow-sm">
                    <img src="/images/ourfuture1.png" alt="Home Spaces Icon" className="w-10 h-10 object-contain drop-shadow-sm" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Home Spaces
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      As dynamic expressions of identity and
                      <br />
                      mood.
                    </p>
                    <button onClick={() => (window.location.href = "/features")}
                      className="bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2 - Offices */}
              <div className="relative rounded-[2rem] p-8 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-white/40  p-3 rounded-2xl border border-white/80 shadow-sm">
                    <img src="/images/ourfuture2.png" alt="Offices Icon" className="w-10 h-10 object-contain drop-shadow-sm" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Offices
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      As environments that foster creativity,
                      <br />
                      alignment, and vitality.
                    </p>
                    <button onClick={() => (window.location.href = "/deckoviz-for-offices")}
                      className="bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3 - Restaurants, hotels, and public spaces */}
              <div className="relative rounded-[2rem] p-8 bg-white/30  transform-gpu border border-white/60 shadow-[0_8px_32px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 bg-white/40  p-3 rounded-2xl border border-white/80 shadow-sm">
                    <img src="/images/ourfuture3.png" alt="Public Spaces Icon" className="w-10 h-10 object-contain drop-shadow-sm" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                    >
                      Restaurants, hotels, and
                      <br />
                      public spaces
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">As immersive emotional experiences.</p>
                    <button onClick={() => (window.location.href = "/deckoviz-for-restaurants")}
                      className="bg-white/60 hover:bg-white/90  border border-white/80 text-gray-800 px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.08)] transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Our Community Section - Frosted Glass */}
        <div className="relative mt-32 mb-32" style={{ isolation: 'isolate' }}>
          <div className="relative max-w-6xl mx-auto px-4">

            {/* Blue glow blobs behind the glass */}
            <div className="absolute inset-0 -z-10 overflow-visible">
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#2563EB]/25 rounded-full blur-[70px] animate-[float_10s_ease-in-out_infinite]" />
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#182A4A]/20 rounded-full blur-[80px] animate-[float_8s_ease-in-out_infinite_reverse]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-300/20 rounded-full blur-[60px] animate-[float_12s_ease-in-out_infinite]" />
            </div>

            {/* Mail icon overlapping the card top */}
            <div className="flex justify-center relative z-50 mb-0">
              <img src="/images/mailnoti.png" alt="Mail Notification" className="w-28 h-28 object-contain drop-shadow-xl" />
            </div>

            {/* Frosted Glass Card */}
            <div className="relative -mt-14 overflow-hidden rounded-[2.5rem] group
              bg-white/15  transform-gpu
              border border-white/35
              shadow-[0_16px_60px_rgba(37,99,235,0.15),0_4px_20px_rgba(24,42,74,0.1),inset_0_1px_1px_rgba(255,255,255,0.7)]
              hover:shadow-[0_24px_80px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]
              transition-all duration-700">

              {/* Shiny top edge */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
              {/* Left edge */}
              <div className="absolute left-0 inset-y-0 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
              {/* Diagonal glare */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/25 to-transparent pointer-events-none rounded-tl-[2.5rem] opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Blue bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent pointer-events-none" />
              {/* Brand dot pattern inside glass */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #2563EB 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              {/* Content */}
              <div className="relative z-10 pt-16 pb-16 px-8 md:px-16 text-center">
                {/* Welcome Text */}
                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">Welcome to a more beautiful future.</p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">Welcome to Deckoviz.</p>
                </div>

                {/* Main Heading */}
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8"
                  style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  Join our community
                </h2>

                {/* Description */}
                <div className="text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto space-y-4">
                  <p>
                    If you believe that the spaces where we live and work should inspire us<br />
                    If you dream of living in environments that feel, grow, respond, and reflect<br />
                    who you are
                  </p>
                  <p>
                    If you believe that beauty, art, and technology can and should work together<br />
                    to make life more vivid, joyful, and meaningful
                  </p>
                </div>

                {/* Email Signup Form */}
                <div className="max-w-sm sm:max-w-md mx-auto">
                  <div className="relative group/form">
                    {/* Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-2xl blur opacity-20 group-hover/form:opacity-40 transition duration-500" />
                    {/* Form glass container */}
                    <div className="relative bg-white/80  rounded-2xl p-2 shadow-xl border border-white/60">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <div className="flex-1 relative">
                          <input
                            type="email"
                            placeholder="Email address..."
                            className="w-full px-4 py-3 bg-gray-50/80 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-300"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <button className="bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transform transition-all duration-300 flex items-center gap-2">
                          <span>Submit</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
