"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockNarrationProvider } from "../lib/mockAI";
import type { Genre } from "../lib/genres";

interface Props {
  text: string;
  genre: Genre;
  type?: "sentence" | "twist" | "summary" | "ending" | "intro";
  onComplete?: () => void;
  active?: boolean;
}

const VizzyNarrator: React.FC<Props> = ({
  text,
  genre,
  type = "sentence",
  onComplete,
  active = true,
}) => {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active || !text) return;
    let cancelled = false;
    setShown("");
    setDone(false);
    (async () => {
      let acc = "";
      for await (const chunk of mockNarrationProvider.narrate({ text, genre, type })) {
        if (cancelled) return;
        acc = acc ? `${acc} ${chunk.text}` : chunk.text;
        setShown(acc);
        await new Promise((r) => setTimeout(r, chunk.delayMs));
      }
      if (!cancelled) {
        setDone(true);
        onComplete?.();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, genre, type, active, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{
            background: `linear-gradient(135deg, ${genre.themeColors.primary}, ${genre.themeColors.accent})`,
          }}
        >
          V
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">
            Vizzy · {type}
          </div>
          <p className="font-serif text-white/90 text-sm md:text-base leading-relaxed">
            {shown}
            {!done && <span className="inline-block w-2 h-4 ml-0.5 bg-white/70 align-middle animate-pulse" />}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VizzyNarrator;
