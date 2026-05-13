import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureItem {
  title: string;
  description: string;
}

const EnterpriseHorizontalScrollingFeatures: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cloudState, setCloudState] = useState({ left: 0, top: 0, tailX: 0 });
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const features: FeatureItem[] = [
    {
      title: "Deckoviz as your Custom Art Creator",
      description: "Create and display bespoke artworks tailored to your brand, space, and customers."
    },
    {
      title: "Deckoviz as your Poster and Signage Engine",
      description: "Design and display dynamic and aesthetic menus, offers, announcements, and in-store communication."
    },
    {
      title: "Deckoviz as your Product and Food Visual Studio",
      description: "Generate and showcase high-quality product, dish, and lifestyle visuals and videos."
    },
    {
      title: "Deckoviz as your Digital Merchandising System",
      description: "Create and display engaging, real-time merchandising and stunning promotional content."
    },
    {
      title: "Deckoviz as your Brand Representative",
      description: "Act as a storyteller, concierge, greeter, and consistent brand personality through Vizzy."
    }
  ];

  // Duplicate features to create an infinite scrolling effect
  const displayFeatures = [...features, ...features, ...features, ...features, ...features, ...features];


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
          if (!isHovering && !isDragging && container && cardsRef.current.length > features.length) {
            // Calculate the width of one complete set of features (including gaps)
            const firstSetWidth = cardsRef.current[features.length]?.offsetLeft - cardsRef.current[0]?.offsetLeft;
            
            // Smooth scroll with consistent speed and seamless snap back
            if (firstSetWidth && container.scrollLeft >= firstSetWidth) {
              container.scrollLeft -= firstSetWidth; 
            } else {
              container.scrollLeft += 2.5; // Optimized speed
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
  }, [isHovering, isDragging, features.length]);

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
    <div className="bg-white py-8 md:py-10 overflow-visible relative flex items-center -mt-8 md:-mt-12">
      {/* Subtle, refined background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(147,51,234,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236,72,153,0.4) 0%, transparent 50%)"
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 z-10 relative">
        {/* Beautiful section title */}
        <div className="text-center mb-10">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif"
            }}
          >
            <span className="text-gray-900">Discover Deckoviz for </span>
            <span
              className="bg-gradient-to-r from-[#182A4A] via-[#2563EB] to-[#182A4A] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(37,99,235,0.2))"
              }}
            >
              Enterprises
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Your AI, Ambiance and Experience Layer For Every Need, Every Moment
          </p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="relative overflow-visible group">
          {/* Subtle fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible scrollbar-hide py-6 px-12 md:px-32 select-none"
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
              {displayFeatures.map((feature, index) => {
                // Different color schemes for each card
                const colorSchemes = [
                  {
                    bg: "from-violet-50/50 via-violet-50/40 to-indigo-50/30",
                    border: "border-indigo-200/50 hover:border-violet-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(139,92,246,0.1)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)]",
                    textColor: "#5b21b6", // darker violet for visibility
                    orb: "rgba(139,92,246,0.3)",
                    dots: "bg-violet-300/60"
                  },
                  {
                    bg: "from-pink-50/50 via-rose-50/40 to-red-50/30",
                    border: "border-indigo-200/50 hover:border-pink-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(236,72,153,0.1)] hover:shadow-[0_12px_32px_rgba(236,72,153,0.2)]",
                    textColor: "#be185d", // darker pink for visibility
                    orb: "rgba(236,72,153,0.3)",
                    dots: "bg-pink-300/60"
                  },
                  {
                    bg: "from-orange-50/50 via-amber-50/40 to-yellow-50/30",
                    border: "border-orange-200/50 hover:border-orange-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(251,146,60,0.1)] hover:shadow-[0_12px_32px_rgba(251,146,60,0.2)]",
                    textColor: "#c2410c", // darker orange for visibility
                    orb: "rgba(251,146,60,0.3)",
                    dots: "bg-orange-300/60"
                  },
                  {
                    bg: "from-cyan-50/50 via-sky-50/40 to-blue-50/30",
                    border: "border-cyan-200/50 hover:border-cyan-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(6,182,212,0.1)] hover:shadow-[0_12px_32px_rgba(6,182,212,0.2)]",
                    textColor: "#0e7490", // darker cyan for visibility
                    orb: "rgba(6,182,212,0.3)",
                    dots: "bg-cyan-300/60"
                  },
                  {
                    bg: "from-emerald-50/50 via-green-50/40 to-lime-50/30",
                    border: "border-emerald-200/50 hover:border-emerald-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(16,185,129,0.1)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.2)]",
                    textColor: "#047857", // darker green for visibility
                    orb: "rgba(16,185,129,0.3)",
                    dots: "bg-emerald-300/60"
                  },
                  {
                    bg: "from-fuchsia-50/50 via-violet-50/40 to-violet-50/30",
                    border: "border-fuchsia-200/50 hover:border-fuchsia-300/70",
                    shadow: "shadow-[0_4px_16px_rgba(217,70,239,0.1)] hover:shadow-[0_12px_32px_rgba(217,70,239,0.2)]",
                    textColor: "#a21caf", // darker fuchsia for visibility
                    orb: "rgba(217,70,239,0.3)",
                    dots: "bg-fuchsia-300/60"
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
                    {/* Playful, colorful card */}
                    <motion.div
                      whileHover={{ y: -8, rotate: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className={`relative px-8 py-6 rounded-3xl overflow-hidden
                                 w-[260px] h-[110px] flex flex-col justify-center items-center will-change-transform
                                 bg-gradient-to-br ${colors.bg}
                                 border-2 ${colors.border}
                                 ${colors.shadow}
                                 transition-all duration-400`}
                    >
                      {/* Playful gradient orb */}
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
                      
                      {/* Colorful text with playful styling */}
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
                      
                      {/* Playful sparkle accents */}
                      <div
                        className="absolute top-3 right-3 text-[14px] opacity-0 group-hover/card:opacity-70
                                   transition-all duration-500"
                        style={{
                          animation: "sparkle1 3s linear infinite",
                          color: colors.textColor
                        }}
                      >
                        ✨
                      </div>
                      
                      <div
                        className="absolute bottom-3 left-3 text-[12px] opacity-0 group-hover/card:opacity-60
                                   transition-all duration-500"
                        style={{
                          animation: "sparkle2 4s linear infinite",
                          color: colors.textColor
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
                      background: "linear-gradient(135deg, rgba(147,51,234,1) 0%, rgba(236,72,153,1) 100%)"
                    }}
                  />
                  
                  <p className="relative text-[15px] md:text-[16px] leading-relaxed text-center text-gray-700">
                    {displayFeatures[hoveredIndex].description}
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

export default EnterpriseHorizontalScrollingFeatures;
