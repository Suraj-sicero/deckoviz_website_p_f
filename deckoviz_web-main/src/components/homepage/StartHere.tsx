import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Sparkles, Tv, BookOpen, Smartphone, BrainCircuit, BookMarked, Flame } from "lucide-react";
import { UseCasesModal } from "./UseCasesModal";
import HomesMicrosite from "./HomesMicrosite";

export default function StartHere() {
  const navigate = useNavigate();
  const [showUseCasesModal, setShowUseCasesModal] = useState(false);
  const [showHomesMicrosite, setShowHomesMicrosite] = useState(false);

  // Scrolling ticker state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Ticker Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const startAutoScroll = () => {
      const scroll = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= frameTime) {
          if (container && !isHovering && !isDragging) {
            container.scrollLeft += 1;
            if (container.scrollLeft >= container.scrollWidth / 2) {
              container.scrollLeft = 0;
            }
          }
          lastTime = currentTime;
        }
        animationId = requestAnimationFrame(scroll);
      };
      animationId = requestAnimationFrame(scroll);
    };

    startAutoScroll();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovering, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    setIsHovering(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 30%, #eef2ff 60%, #e0e8ff 100%)" }}
    >
      {/* Soft blue blobs so glass card is clearly visible */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[110px]" style={{ background: "rgba(99, 102, 241, 0.22)" }} />
        <div className="absolute -top-10 right-[-60px] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.20)" }} />
        <div className="absolute bottom-[-60px] left-[20%] w-[700px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(79, 70, 229, 0.18)" }} />
      </div>

      {/* Glass Card */}
      <div className="relative max-w-5xl mx-auto px-6">

        <div className="relative rounded-[36px]
          bg-white/10 backdrop-blur-3xl
          shadow-[0_24px_60px_rgba(37,99,235,0.25),0_8px_20px_rgba(24,42,74,0.15),inset_0_1px_1px_rgba(255,255,255,0.7)]
          border border-white/40 overflow-hidden
          hover:shadow-[0_32px_80px_rgba(37,99,235,0.35),0_12px_30px_rgba(24,42,74,0.2),inset_0_1px_1px_rgba(255,255,255,0.7)]
          transition-shadow duration-700">

          {/* Multiple shine layers for glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Top edge shine */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
          
          {/* Left edge shine */}
          <div className="absolute top-0 left-0 bottom-0 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent" />

          {/* Blue bottom glow */}
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-[1px] rounded-[35px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_4px_rgba(37,99,235,0.05)]" />

          {/* Content */}
          <div className="relative p-12 md:p-16 text-center">

            {/* CENTERED HEADING */}
            <h2 className="text-4xl font-semibold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent mb-8 drop-shadow-sm">
              Start Here
            </h2>

            <p className="text-gray-800/90 mb-4 max-w-2xl mx-auto drop-shadow-sm">
              If you're curious about Deckoviz, but want to understand it properly before bringing it into your home,
              this is the best place to begin.
            </p>

            <p className="text-gray-800/90 mb-6 max-w-2xl mx-auto drop-shadow-sm">
              These pieces are designed to answer the real questions people have.
            </p>

            <div className="space-y-1 text-gray-800/90 mb-10 drop-shadow-sm">
              <p>What is this actually for?</p>
              <p>How does it fit into daily life?</p>
              <p>Is this just another screen, or something meaningfully different?</p>
            </div>

            <button
              onClick={() => navigate("/core-reading")}
              className="px-12 py-3 rounded-xl bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white font-medium shadow-lg hover:shadow-[#2563EB]/50 transition-all hover:-translate-y-0.5"
            >
              Core Reading
            </button>

          </div>

          {/* Bottom gradient bar ONLY (no text) */}
          <div className="relative h-16 bg-gradient-to-r from-[#182A4A] to-[#2563EB]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          </div>

        </div>

      </div>

      {/* Glassmorphic Ticker Section */}
      <div className="w-full overflow-hidden mt-16 mb-8 relative px-0" style={{ maxWidth: '100vw' }}>
        {/* Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#eef2ff] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#e0e8ff] to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          className={`flex gap-4 sm:gap-8 px-4 py-6 sm:py-8 w-full overflow-x-auto no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[1, 2].map((iteration) => (
            <div key={iteration} className="flex gap-4 sm:gap-8 shrink-0">
              {/* 🏠 Deckoviz for Homes Button */}
              <button
                onClick={() => setShowHomesMicrosite(true)}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-teal-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(20,184,166,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#182A4A] opacity-70">
                        For Homes
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-blue-700 transition-colors w-40 sm:w-48">
                      Why Deckoviz & Problem It Solves
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-blue-600 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>
              {/* 🌌 Infinite Portal Button */}
              <button
                onClick={() => navigate("/infinite-portal")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-blue-600 font-bold mb-1">
                      Experiences
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-blue-700 transition-colors w-40 sm:w-48">
                      A Portal of Infinite Goodness
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-blue-600 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>
              {/* 📺 TV Guide Button */}
              <button
                onClick={() => navigate("/tv")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(20,184,166,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Tv className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-teal-700 font-bold mb-1">
                      TV Guide
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-teal-700 transition-colors w-40 sm:w-48">
                      Looking to buy a TV?
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-teal-600 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>
              {/* 📘 DASP Guide Button */}
              <button
                onClick={() => navigate("/dasp-guide")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#182A4A]/10 via-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#2563EB] font-bold mb-1">
                      Research
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-[#2563EB] transition-colors w-40 sm:w-48">
                      Our Founding Thesis
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>
              {/* 🌟 Use Cases Button */}
              <button
                onClick={() => setShowUseCasesModal(true)}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(14,165,233,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-cyan-700 font-bold mb-1">
                      Inspiration
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-cyan-700 transition-colors w-40 sm:w-48">
                      A Guide To Deckoviz Use Cases
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-cyan-600 group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 📱 Minimalist Button */}
              <button
                onClick={() => navigate("/minimalist")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(14,165,233,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#182A4A] font-bold mb-1 opacity-70">
                      For The Minimalists
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-blue-700 transition-colors w-40 sm:w-48">
                      If This Is the Only Screen You Keep
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-blue-600 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 🧠 Nervous System Button */}
              <button
                onClick={() => navigate("/nervous-system")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(20,184,166,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#182A4A] font-bold mb-1 opacity-70">
                      A Living Space
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-teal-700 transition-colors w-40 sm:w-48">
                      What If Your Home Had a Nervous System?
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-teal-600 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 📘 DAS Portal Homes Guide Button */}
              <button
                onClick={() => navigate("/dasp-homes-guide")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <BookMarked className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#2563EB] font-bold mb-1 opacity-70">
                      A Quick Guide
                    </span>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-[#2563EB] transition-colors w-40 sm:w-48">
                      Guide To Your DAS Portal
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 📖 Alternate Use Cases Guide Button */}
              <button
                onClick={() => navigate("/alternate-use-cases")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(37,99,235,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.32)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-indigo-700 font-bold opacity-80">
                        Inspiration
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-indigo-700 transition-colors w-40 sm:w-48">
                      Alternate Use Cases
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-indigo-600 group-hover:bg-[#4f46e5] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 🎨 Vizzy Art Engine Button */}
              <button
                onClick={() => navigate("/vizzy-art-engine")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(20,184,166,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,184,166,0.32)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(20,184,166,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-teal-800 font-bold opacity-80">
                        Behind The Scenes
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-teal-800 transition-colors w-40 sm:w-48">
                      Vizzy Art Engine
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-teal-600 group-hover:bg-[#0d9488] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* ✍️ Blog & Articles Button */}
              <button
                onClick={() => navigate("/blog")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(249,115,22,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(249,115,22,0.32)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <BookMarked className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-800 font-bold opacity-80">
                        Dive Deeper
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-amber-800 transition-colors w-40 sm:w-48">
                      Blog & Insights
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-orange-600 group-hover:bg-[#ea580c] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 🏡 Why The Deckoviz Portal Button */}
              <button
                onClick={() => navigate("/blog/why-the-deckoviz-portal-for-homes")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,185,129,0.32)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-800 font-bold opacity-80">
                        Core Reading
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-emerald-800 transition-colors w-40 sm:w-48">
                      Why The Deckoviz Portal for Homes?
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-emerald-600 group-hover:bg-[#059669] group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>

              {/* 💞 Elinity × Deckoviz Guide Button */}
              <button
                onClick={() => navigate("/elinity-deckoviz-guide")}
                className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 pr-4 sm:pr-6 bg-white/40 border border-white/60 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-[0_8px_32px_rgba(99,102,241,0.1)] transition-all duration-500 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.32)] hover:border-white/90 min-w-[280px] sm:min-w-[340px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 via-violet-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
                     style={{
                       background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 80%)",
                       backgroundSize: "200% 100%",
                       animation: "glassShine 3s infinite linear"
                     }}
                />
                <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(99,102,241,0.35)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 text-xl">
                    💞
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                        Elinity × Deckoviz
                      </span>
                    </div>
                    <span className="text-[13px] sm:text-[15px] font-bold text-[#182A4A] leading-tight group-hover:text-indigo-700 transition-colors w-40 sm:w-48">
                      Deepen Every Relationship
                    </span>
                  </div>
                </div>
                <div className="ml-auto w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-white/50 border border-white/80 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 relative z-10 shadow-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </button>



            </div>
          ))}
        </div>
      </div>

      <UseCasesModal 
        isOpen={showUseCasesModal} 
        onClose={() => setShowUseCasesModal(false)} 
      />
      {showHomesMicrosite && (
        <HomesMicrosite onClose={() => setShowHomesMicrosite(false)} />
      )}

      <style>{`
        @keyframes float {
          0% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-55%) translateX(0); }
          100% { transform: translateY(-50%) translateX(0); }
        }
        @keyframes glassShine {
          0% { background-position: 200% 50%; }
          100% { background-position: -100% 50%; }
        }
        @keyframes cardSwing {
          0%   { transform: rotate(-3deg);  }
          25%  { transform: rotate(2deg);   }
          50%  { transform: rotate(-1.2deg);}
          75%  { transform: rotate(2.5deg); }
          100% { transform: rotate(-3deg);  }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
}
