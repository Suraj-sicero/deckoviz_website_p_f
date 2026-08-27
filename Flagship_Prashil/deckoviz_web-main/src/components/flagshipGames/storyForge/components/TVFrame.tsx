"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Genre } from "../lib/genres";
import type { SceneIllustration } from "../lib/mockAI";

interface Props {
  genre: Genre;
  scene: SceneIllustration | null;
  overlayText?: string;
  showRoundLabel?: string;
  twistBanner?: string;
  storyLines?: { text: string; playerColor: string }[];
}

const PARTICLE_COUNT = 36;

const TVFrame: React.FC<Props> = ({
  genre,
  scene,
  overlayText,
  showRoundLabel,
  twistBanner,
  storyLines = [],
}) => {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
      })),
    [scene?.id],
  );

  const linesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.scrollTop = linesRef.current.scrollHeight;
    }
  }, [storyLines.length]);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
      {/* Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene?.id ?? "default"}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: scene?.background ?? genre.themeColors.bgGradient,
          }}
        />
      </AnimatePresence>

      {/* Slow camera drift */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1], x: [0, 10, 0], y: [0, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: scene?.overlay ?? "transparent",
          mixBlendMode: "screen",
        }}
      />

      {/* Particle layer */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: particleColorFor(genre.particles),
              boxShadow: `0 0 ${p.size * 2}px ${particleColorFor(genre.particles)}`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Round label */}
      {showRoundLabel && (
        <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
          {showRoundLabel}
        </div>
      )}

      {/* Story lines overlay */}
      <div
        ref={linesRef}
        className="absolute inset-x-0 bottom-0 max-h-[60%] overflow-y-auto px-8 md:px-14 pb-10 pt-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <div className="space-y-2.5 max-w-3xl">
          <AnimatePresence initial={false}>
            {storyLines.map((l, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="font-serif text-white text-base md:text-xl leading-relaxed drop-shadow-lg"
                style={{
                  textShadow: `0 0 16px ${l.playerColor}66, 0 2px 8px rgba(0,0,0,0.8)`,
                }}
              >
                {l.text}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Center overlay text (opening, twist) */}
      <AnimatePresence>
        {overlayText && (
          <motion.div
            key={overlayText}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 flex items-center justify-center px-10 text-center pointer-events-none"
          >
            <h2 className="font-serif text-2xl md:text-4xl text-white max-w-2xl leading-snug drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              {overlayText}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twist banner */}
      <AnimatePresence>
        {twistBanner && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-300/40 backdrop-blur-md text-amber-100 text-xs uppercase tracking-[0.3em]"
          >
            ✦ Twist in play · {twistBanner}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function particleColorFor(p: Genre["particles"]): string {
  switch (p) {
    case "rain":
      return "rgba(173, 216, 230, 0.7)";
    case "snow":
      return "rgba(255, 255, 255, 0.85)";
    case "embers":
      return "rgba(251, 191, 36, 0.85)";
    case "sparks":
      return "rgba(125, 211, 252, 0.85)";
    case "fog":
      return "rgba(200, 200, 220, 0.4)";
    case "petals":
      return "rgba(244, 114, 182, 0.7)";
    case "dust":
    default:
      return "rgba(255, 240, 210, 0.55)";
  }
}

export default TVFrame;
