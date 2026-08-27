import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, MessageSquare, Volume2, FileText, Clock, Music, Radio, Zap } from "lucide-react";

const funTools = [
  {
    name: "Before & After Postcard",
    path: "/tools/postcard",
    icon: Sparkles,
    color: "from-[#ec4899] to-[#8b5cf6]",
    glow: "rgba(236, 72, 153, 0.4)"
  },
  {
    name: "Gratitude Cards",
    path: "/tools/gratitude-card",
    icon: Heart,
    color: "from-[#ef4444] to-[#f43f5e]",
    glow: "rgba(239, 68, 68, 0.4)"
  },
  {
    name: "Conversational Studio",
    path: "/conversational-studio",
    icon: MessageSquare,
    color: "from-[#3b82f6] to-[#8b5cf6]",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    name: "Audiobook Creator",
    path: "/tools/audiobook",
    icon: Volume2,
    color: "from-[#f97316] to-[#eab308]",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  {
    name: "Quote Poster Generator",
    path: "/tools/quote-poster",
    icon: FileText,
    color: "from-[#10b981] to-[#06b6d4]",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    name: "Ambient Timescape",
    path: "/developer-specs/ambient-clock",
    icon: Clock,
    color: "from-[#06b6d4] to-[#3b82f6]",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    name: "Music Responsive Art",
    path: "/developer-specs/music-responsive-art",
    icon: Music,
    color: "from-[#d946ef] to-[#ec4899]",
    glow: "rgba(217, 70, 239, 0.4)"
  },
  {
    name: "Soundscape",
    path: "/soundscapes",
    icon: Radio,
    color: "from-[#14b8a6] to-[#10b981]",
    glow: "rgba(20, 184, 166, 0.4)"
  },
  {
    name: "Shape Vortex",
    path: "/developer-specs/agentic-shape-vortex",
    icon: Zap,
    color: "from-[#facc15] to-[#f97316]",
    glow: "rgba(250, 204, 21, 0.4)"
  },
];

const VizzyFunZone: React.FC = () => {
  const [radius, setRadius] = useState(220);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 380) {
        setRadius(95);
      } else if (width < 480) {
        setRadius(110);
      } else if (width < 768) {
        setRadius(130);
      } else {
        setRadius(230);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5f6f8] flex flex-col items-center overflow-hidden pt-24 pb-12">
      {/* Background Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#182a4a]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        {/* Soft glowing ambient light */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]" style={{ background: "rgba(37, 99, 235, 0.12)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px]" style={{ background: "rgba(99, 102, 241, 0.12)" }} />
      </div>

      {/* Header Info */}
      <div className="relative z-10 text-center mb-12 px-4 mt-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="inline-flex items-center justify-center p-2.5 bg-white/60 border border-blue-200/50 shadow-sm rounded-2xl mb-4 backdrop-blur-md"
        >
          <Sparkles className="w-5 h-5 text-blue-500 animate-pulse mr-2" />
          <span className="text-gray-700 font-bold text-xs uppercase tracking-wider">Interactive Hub</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#182a4a] to-[#2563EB] tracking-tight drop-shadow-sm filter">
          Vizzy Fun Zone
        </h2>
        <p className="text-gray-600 text-sm max-w-sm mx-auto mt-4 leading-relaxed font-medium">
          Click a floating ball to launch your generative adventure. Hover to feel the gravity pull.
        </p>
      </div>

      {/* Balls Container */}
      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center min-h-[450px] md:min-h-[550px]">
        {/* Center core */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/80 border border-blue-200 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(37,99,235,0.2)] z-0"
        >
          <img src="/images/deckovizlogo.png" className="w-10 h-10 md:w-14 md:h-14 object-contain opacity-90 animate-pulse" alt="Core logo" />
        </motion.div>

        {/* Floating Balls */}
        {funTools.map((tool, i) => {
          const ToolIcon = tool.icon;
          const angle = (i * 2 * Math.PI) / funTools.length;
          
          // Compute static initial target position
          const targetX = Math.cos(angle) * radius;
          const targetY = Math.sin(angle) * radius;

          // Generate slight random variations for infinite float
          const floatRangeX = [
            targetX,
            targetX + Math.sin(i) * 12,
            targetX + Math.cos(i) * 12,
            targetX
          ];
          const floatRangeY = [
            targetY,
            targetY + Math.cos(i) * 12,
            targetY + Math.sin(i) * 12,
            targetY
          ];

          return (
            <motion.a
              key={tool.name}
              href={tool.path}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: floatRangeX,
                y: floatRangeY,
              }}
              transition={{
                x: {
                  duration: 6 + (i % 3) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.33, 0.66, 1]
                },
                y: {
                  duration: 7 + (i % 2) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.33, 0.66, 1]
                },
                scale: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: i * 0.05
                },
                opacity: {
                  duration: 0.5,
                  delay: i * 0.05
                }
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 40,
                boxShadow: `0 0 35px ${tool.glow}`,
                transition: { duration: 0.2, type: "tween" }
              }}
              whileTap={{ scale: 0.95 }}
              className={`absolute cursor-pointer rounded-full bg-gradient-to-br ${tool.color} p-[1px] hover:p-[2px] transition-all`}
              style={{
                boxShadow: `0 0 20px ${tool.glow}`,
              }}
            >
              <div 
                className={`rounded-full bg-white/95 backdrop-blur-xl border border-white flex flex-col items-center justify-center text-center p-2 select-none transition-all shadow-inner group ${
                  isMobile ? "w-20 h-20" : "w-32 h-32"
                }`}
              >
                <div className={`flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${isMobile ? "mb-0.5" : "mb-1.5"}`}>
                  <ToolIcon className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-[#2563EB] drop-shadow-sm`} />
                </div>
                <span className={`${isMobile ? "text-[8px]" : "text-[10px] md:text-[11px]"} font-extrabold text-[#182a4a] leading-tight max-w-[90%]`}>
                  {tool.name}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default VizzyFunZone;
