import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureItem {
  title: string;
  description: string;
}

const HorizontalScrollingFeatures: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cloudState, setCloudState] = useState({ left: 0, top: 0, tailX: 0 });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  const features: FeatureItem[] = [
    {
      title: "Deckoviz as your Personal Artist",
      description: "Your partner in creating deeply meaningful artworks, helping you explore ideas, themes, and emotions, and co-create pieces that truly resonate."
    },
    {
      title: "Deckoviz as your Storytelling Muse",
      description: "Your companion for creating and displaying immersive stories, from visual narratives to bedtime worlds and imaginative journeys."
    },
    {
      title: "Deckoviz as your Art Photo Frame",
      description: "Transforming your photos into stunning, gallery-like artistic displays."
    },
    {
      title: "Deckoviz as your Smart Photo Frame",
      description: "A dynamic, intelligent frame that curates and adapts your memories beautifully over time."
    },
    {
      title: "Deckoviz as your Emotionally Intelligent Home OS",
      description: "A system that understands your moods and context, and adapts your space accordingly."
    },
    {
      title: "Deckoviz as your Creative Game Ecosystem",
      description: "A playful, interactive world of connection-driven, creative experiences."
    }
  ];

  const updateCloudPosition = useCallback((index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const viewportWidth = typeof window !== 'undefined' ? document.documentElement.clientWidth : 1000;
    
    // Proportional scaling for the bubble
    const expectedBubbleWidth = viewportWidth < 768 ? 340 : 420;
    const safetyMargin = 24; 
    
    const cardCenterX = rect.left + rect.width / 2;
    let targetLeft = cardCenterX - (expectedBubbleWidth / 2);
    
    if (targetLeft < safetyMargin) {
      targetLeft = safetyMargin;
    }
    
    const maxLeft = viewportWidth - expectedBubbleWidth - safetyMargin;
    if (targetLeft > maxLeft) {
      targetLeft = maxLeft;
    }
    
    const finalBubbleCenter = targetLeft + expectedBubbleWidth / 2;
    const tailX = cardCenterX - finalBubbleCenter;
    
    setCloudState({
      left: targetLeft,
      top: rect.top - 20,
      tailX: tailX
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll effect with performance optimization
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
          if (!isHovering && !isDragging && container) {
            const maxScroll = container.scrollWidth - container.clientWidth;
            
            // Smooth scroll with consistent speed
            if (container.scrollLeft >= maxScroll) {
              container.scrollLeft = 0;
            } else {
              container.scrollLeft += 1.5; // Optimized speed
            }
          }
          lastTime = currentTime - (deltaTime % frameTime);
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

  useEffect(() => {
    const handleScroll = () => {
      if (hoveredIndex !== null) {
        updateCloudPosition(hoveredIndex);
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hoveredIndex, updateCloudPosition]);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isDragging) {
      setHoveredIndex(index);
      setIsHovering(true);
      updateCloudPosition(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsHovering(false);
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setHoveredIndex(null);
    setIsHovering(true);
    if (!scrollContainerRef.current) return;
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative -mt-8 flex items-center overflow-hidden rounded-[2.5rem] bg-[#f7fbff] py-8 pb-20 md:-mt-12 md:rounded-[4rem] md:py-10 md:pb-28">
      {/* Frosted blue/teal background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 16% 24%, rgba(37,99,235,0.14) 0%, transparent 32%),
              radial-gradient(circle at 86% 62%, rgba(20,184,166,0.16) 0%, transparent 36%),
              linear-gradient(135deg, rgba(255,255,255,0.92), rgba(224,242,254,0.70) 48%, rgba(240,253,250,0.76)),
              repeating-linear-gradient(90deg, rgba(37,99,235,0.035) 0 1px, transparent 1px 92px)
            `
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-56 w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/18 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 z-10 relative">
        {/* Beautiful section title */}
        <div className="relative mx-auto mb-3 max-w-6xl px-5 py-3 text-center md:mb-4 md:px-10 md:py-4">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif"
            }}
          >
            <span className="text-gray-900">Discover </span>
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 46%, #14b8a6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 8px rgba(14,165,233,0.16))"
              }}
            >
              Deckoviz
            </span>
            <span className="text-gray-900"> in its various avatars!</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Vizzy, your generative companion for every moment!
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative overflow-visible group">
          {/* Subtle fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#f7fbff] to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#f7fbff] to-transparent pointer-events-none z-20" />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible scrollbar-hide px-12 py-4 md:px-32 md:py-5 select-none"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={startDragging}
            onMouseLeave={() => {
              setIsDragging(false);
              setHoveredIndex(null);
              setIsHovering(false);
            }}
            onMouseUp={() => {
              setIsDragging(false);
              setIsHovering(false);
            }}
            onMouseMove={onDrag}
            onTouchStart={startDragging}
            onTouchEnd={() => {
              setIsDragging(false);
              setIsHovering(false);
            }}
            onTouchMove={onDrag}
          >
            <div className="flex gap-6 md:gap-8 min-w-max items-center will-change-transform">
              {features.map((feature, index) => {
                // Blue/teal glass card accents
                const colorSchemes = [
                  {
                    bg: "from-white/68 via-sky-50/42 to-cyan-50/34",
                    border: "border-white/75 hover:border-cyan-300/80",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(14,165,233,0.18)]",
                    textColor: "#0f4a73",
                    orb: "rgba(14,165,233,0.30)",
                    dots: "bg-cyan-300/70"
                  },
                  {
                    bg: "from-white/70 via-blue-50/44 to-sky-50/34",
                    border: "border-white/75 hover:border-blue-300/75",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(37,99,235,0.18)]",
                    textColor: "#1d4ed8",
                    orb: "rgba(37,99,235,0.28)",
                    dots: "bg-blue-300/70"
                  },
                  {
                    bg: "from-white/68 via-teal-50/42 to-cyan-50/34",
                    border: "border-white/75 hover:border-teal-300/80",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(20,184,166,0.17)]",
                    textColor: "#0f766e",
                    orb: "rgba(20,184,166,0.28)",
                    dots: "bg-teal-300/70"
                  },
                  {
                    bg: "from-white/66 via-cyan-50/42 to-blue-50/34",
                    border: "border-white/75 hover:border-sky-300/80",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(6,182,212,0.18)]",
                    textColor: "#0369a1",
                    orb: "rgba(6,182,212,0.28)",
                    dots: "bg-sky-300/70"
                  },
                  {
                    bg: "from-white/70 via-slate-50/46 to-sky-50/32",
                    border: "border-white/75 hover:border-blue-200/80",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(37,99,235,0.16)]",
                    textColor: "#164e63",
                    orb: "rgba(56,189,248,0.26)",
                    dots: "bg-cyan-200/80"
                  },
                  {
                    bg: "from-white/68 via-blue-50/38 to-teal-50/34",
                    border: "border-white/75 hover:border-teal-200/80",
                    shadow: "shadow-[0_14px_36px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_56px_rgba(14,165,233,0.17)]",
                    textColor: "#0e7490",
                    orb: "rgba(14,165,233,0.28)",
                    dots: "bg-teal-300/70"
                  }
                ];
                
                const colors = colorSchemes[index % colorSchemes.length];
                
                return (
                  <div
                    key={index}
                    ref={el => cardsRef.current[index] = el}
                    className="relative group/card will-change-transform"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Frosted glass card */}
                    <motion.div
                      whileHover={{ y: -8, rotate: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`relative px-8 py-6 rounded-3xl overflow-hidden
                                 w-[260px] h-[110px] flex flex-col justify-center items-center will-change-transform
                                 bg-gradient-to-br ${colors.bg}
                                 border-2 ${colors.border}
                                 ${colors.shadow}
                                 backdrop-blur-xl backdrop-saturate-150
                                 transition-all duration-400`}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.42))]" />
                      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/90" />

                      {/* Blue/teal glow */}
                      <div 
                        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle, ${colors.orb} 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Subtle shine effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 pointer-events-none will-change-transform"
                        style={{
                          background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                          animation: "shine 2s ease-out forwards"
                        }}
                      />
                      
                      {/* Glass card title */}
                      <h3 
                        className="relative text-[17px] font-bold text-center leading-[1.3] tracking-tight
                                   transition-all duration-300 z-10 px-2"
                        style={{
                          color: colors.textColor,
                          textShadow: "0 1px 2px rgba(255,255,255,0.5)"
                        }}
                      >
                        {feature.title}
                      </h3>
                      
                      {/* Glass glint accents */}
                      <div
                        className="absolute top-3 right-3 h-2 w-2 rounded-full text-[0px] opacity-0 blur-[1px]
                                   transition-all duration-500 group-hover/card:opacity-70"
                        style={{
                          animation: "sparkle1 3s linear infinite",
                          background: colors.textColor
                        }}
                      >
                        ✨
                      </div>
                      
                      <div
                        className="absolute bottom-3 left-3 h-1.5 w-1.5 rounded-full text-[0px] opacity-0 blur-[1px]
                                   transition-all duration-500 group-hover/card:opacity-60"
                        style={{
                          animation: "sparkle2 4s linear infinite",
                          background: colors.textColor
                        }}
                      >
                        ✨
                      </div>
                      
                      {/* Decorative corner dots */}
                      <div className={`absolute top-2 left-2 w-1.5 h-1.5 rounded-full ${colors.dots} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
                      <div className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full ${colors.dots} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Simple scroll hint */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span>Drag to explore</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>

      {/* Aesthetic Tooltip Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {hoveredIndex !== null && !isDragging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: "calc(-100% + 20px)" }}
              animate={{ opacity: 1, scale: 1, y: "-100%" }}
              exit={{ opacity: 0, scale: 0.95, y: "calc(-100% + 15px)" }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="fixed"
              style={{ 
                left: cloudState.left,
                top: cloudState.top,
                zIndex: 99999,
                pointerEvents: 'none'
              }}
            >
              <div 
                className="relative" 
                style={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? 340 : 420, maxWidth: '90vw' }}
              >
                {/* Clean, minimal tooltip */}
                <motion.div 
                  className="relative overflow-hidden bg-white rounded-2xl p-8 
                             shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
                             border border-gray-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Subtle gradient accent */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      background: "linear-gradient(135deg, rgba(37,99,235,1) 0%, rgba(20,184,166,1) 100%)"
                    }}
                  />
                  
                  <p className="relative text-[15px] md:text-[16px] leading-relaxed text-center text-gray-700">
                    {features[hoveredIndex].description}
                  </p>
                </motion.div>

                {/* Simple tail */}
                <div style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: `calc(50% + ${cloudState.tailX}px)`,
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                  zIndex: -1
                }}>
                  <div style={{
                    width: "16px", 
                    height: "16px",
                    background: "white",
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  }} />
                  <div style={{
                    width: "10px", 
                    height: "10px",
                    background: "white",
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                  }} />
                  <div style={{
                    width: "6px", 
                    height: "6px",
                    background: "white",
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                  }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Performance-optimized animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(10px, 10px) scale(1.3); opacity: 0.6; }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-10px, -10px) scale(1.3); opacity: 0.6; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes sparkle1 {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.8; }
          50% { transform: rotate(180deg) scale(1.3); opacity: 1; }
        }
        
        @keyframes sparkle2 {
          0%, 100% { transform: rotate(360deg) scale(1); opacity: 0.7; }
          50% { transform: rotate(180deg) scale(1.2); opacity: 0.9; }
        }
        
        @keyframes sparkle3 {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(360deg) scale(1.15); opacity: 0.8; }
        }
        
        /* Hardware acceleration */
        .will-change-transform {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollingFeatures;
