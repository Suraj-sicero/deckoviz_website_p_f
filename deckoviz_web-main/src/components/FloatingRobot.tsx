import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

interface FloatingRobotProps {
  onClick: () => void;
  isOpen: boolean;
}

type ActionState = "idle" | "wave" | "hoverReact" | "activeChat" | "attention";

const FloatingRobot: React.FC<FloatingRobotProps> = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [tooltipText, setTooltipText] = useState("");
  const [hasBeenDragged, setHasBeenDragged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const macroControls = useAnimation();

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D look to feel organic rather than rigid
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 2 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 2 });

  const rotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]); // Look up/down
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-20, 20]); // Look left/right
  const eyeShiftX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const eyeShiftY = useTransform(smoothMouseY, [-1, 1], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates (-1 to 1) based on screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Inactivity timer
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      setIsInactive(false);
      if (!isHovered && !isOpen && !isDragging) {
        setActionState("idle");
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsInactive(true);
        setActionState("attention");
        const tips = [
          "Need help?", 
          "Want me to build your deck?", 
          "Ask Vizzy anything 👋"
        ];
        setTooltipText(tips[Math.floor(Math.random() * tips.length)]);
      }, 25000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeout);
    };
  }, [isHovered, isOpen, isDragging]);

  // Autonomous vertical roaming
  useEffect(() => {
    let isActive = true;

    const roam = async () => {
      if (!hasBeenDragged) {
        await macroControls.start({ x: 30, y: 0, transition: { duration: 0 } });
      }

      while (isActive) {
        if (hasBeenDragged || isDragging) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        if (!isHovered && !isOpen && !isInactive) {
          const targetY = -(Math.random() * (window.innerHeight * 0.4));
          const duration = 15 + Math.random() * 10;
          const targetX = 25 + Math.random() * 15; 

          await macroControls.start({
            y: targetY,
            x: targetX,
            transition: { duration, ease: "easeInOut" }
          });

          if (isActive) await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 2000));
        } else {
          await macroControls.start({ x: 0, transition: { duration: 0.8, type: "spring", stiffness: 100 }});
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    roam();
    return () => { isActive = false; macroControls.stop(); };
  }, [isHovered, isOpen, isInactive, macroControls, hasBeenDragged, isDragging]);

  // Random waves
  useEffect(() => {
    const waveInterval = setInterval(() => {
      if (!isHovered && !isOpen && !isInactive && !isDragging && actionState === "idle") {
        if (Math.random() > 0.4) {
          setActionState("wave");
          setTimeout(() => {
            if (!isHovered && !isOpen && !isInactive && !isDragging) {
              setActionState("idle");
            }
          }, 3000);
        }
      }
    }, 8000 + Math.random() * 5000);

    return () => clearInterval(waveInterval);
  }, [isHovered, isOpen, isInactive, isDragging, actionState]);

  // Handle interactions
  useEffect(() => {
    if (isOpen) {
      setActionState("activeChat");
    } else if (isHovered && !isDragging) {
      setActionState("hoverReact");
      setTooltipText("Hi, I'm Vizzy 👋");
    } else if (isInactive && !isDragging) {
      setActionState("attention");
    } else if (!isDragging) {
      setActionState("idle");
    }
  }, [isOpen, isHovered, isInactive, isDragging]);

  // Inner variants (Micro animations with Squash & Stretch)
  const innerVariants = {
    idle: {
      y: [0, -15, 0],
      scaleX: [1, 1.03, 1], // Squash & Stretch horizontally
      scaleY: [1, 0.97, 1], // Squash & Stretch vertically
      rotateZ: [-2, 3, -1],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    },
    wave: {
      y: [0, -10, 0],
      scaleX: [1, 1.05, 1],
      scaleY: [1, 0.95, 1],
      rotateZ: [0, -15, 20, -15, 20, 0],
      transition: { 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        scaleX: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        scaleY: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 1.5, ease: "easeInOut" }
      }
    },
    hoverReact: {
      y: [-2, -8, -2],
      scaleX: 1.08,
      scaleY: 1.1,
      rotateZ: -5,
      x: -15,
      transition: { 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        scaleX: { duration: 0.4, type: "spring", stiffness: 300 },
        scaleY: { duration: 0.4, type: "spring", stiffness: 300 },
        rotateZ: { duration: 0.5, type: "spring" },
        x: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 }
      }
    },
    attention: {
      y: [0, -20, 0],
      scaleX: [1, 1.08, 1],
      scaleY: [1, 0.95, 1],
      rotateZ: [0, -10, 15, -10, 15, 0],
      x: -15,
      transition: { 
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        rotateZ: { duration: 1.5, ease: "easeInOut" },
        x: { duration: 0.8, ease: "easeOut" },
        scaleX: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        scaleY: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    },
    activeChat: {
      y: [0, -5, 0],
      scaleX: 1,
      scaleY: 1,
      rotateZ: 0,
      x: -10,
      transition: { 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 0.5, type: "spring" }
      }
    }
  };

  const glowVariants = {
    idle: { 
      opacity: 0.4, 
      scale: 1, 
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
    },
    wave: { 
      opacity: [0.4, 0.7, 0.4], 
      scale: [1, 1.15, 1], 
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
    },
    hoverReact: { 
      opacity: 0.9, 
      scale: 1.3, 
      transition: { duration: 0.4 } 
    },
    attention: { 
      opacity: [0.5, 1, 0.5], 
      scale: [1, 1.25, 1], 
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } 
    },
    activeChat: {
      opacity: [0.6, 0.9, 0.6],
      scale: [1.1, 1.2, 1.1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        setHasBeenDragged(true);
      }}
      animate={macroControls}
      className="fixed bottom-4 right-0 z-[60] flex items-end justify-end pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <motion.div
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => !isDragging && setIsHovered(true)}
        onMouseLeave={() => !isDragging && setIsHovered(false)}
        onClick={(e) => {
          if (!isDragging) onClick();
        }}
        variants={innerVariants}
        initial="idle"
        animate={actionState}
        style={{ 
          originX: 0.5, 
          originY: 1,
          perspective: 1200 // 3D Perspective container
        }}
      >
        {/* Tooltips */}
        <AnimatePresence>
          {((isHovered || isInactive) && !isOpen && !isDragging) && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute -top-16 right-10 whitespace-nowrap px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl shadow-purple-500/30 text-slate-900 text-[15px] font-bold tracking-wide z-20 pointer-events-none"
            >
              {tooltipText}
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white/95 border-r border-b border-white/50 rotate-45 backdrop-blur-2xl"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Image Container with 3D Transforms */}
        <motion.div 
          className="relative w-32 h-40 md:w-40 md:h-48 flex items-center justify-center transform-style-3d"
          style={{ rotateX, rotateY }} // Applies 3D rotation tracking the mouse
        >
          {/* Ambient Glow */}
          <motion.div
            variants={glowVariants}
            animate={actionState}
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-600 via-violet-500 to-purple-600 blur-2xl z-0 pointer-events-none"
            style={{ x: eyeShiftX, y: eyeShiftY }} // Glow slightly offsets to sell 3D depth
          />
          
          <motion.img 
            src="/vizzy_robot.svg" 
            alt="Vizzy Assistant"
            className="relative w-full h-full object-contain z-10 drop-shadow-[0_0_20px_rgba(139,92,246,0.4)] pointer-events-none"
            style={{ originX: 0.5, originY: 0.9 }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingRobot;
