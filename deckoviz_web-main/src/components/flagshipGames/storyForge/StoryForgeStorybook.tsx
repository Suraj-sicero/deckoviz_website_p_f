"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, RotateCcw, Share2, Play, Pause } from "lucide-react";
import { useStoryForge } from "./lib/storyForgeState";
import { stopAmbient, startAmbient, playSting } from "./lib/audio";
import jsPDF from "jspdf";

const StoryForgeStorybook: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStoryForge();
  const [page, setPage] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!state.endingText || !state.genre) {
      navigate("/flagship-games/story-forge");
      return;
    }
    startAmbient(state.genre, "ending");
    return () => stopAmbient();
  }, [state.endingText, state.genre, navigate]);

  const pages = useMemo(() => {
    if (!state.genre) return [];
    const cover = {
      kind: "cover" as const,
      title: state.storyTitle ?? "An Untitled Tale",
      subtitle: state.genre.name,
    };
    const roundPages = state.rounds.map((r) => ({
      kind: "round" as const,
      round: r.round,
      sentences: r.sentences,
      twist: r.twist,
      scene: r.scene,
    }));
    const endingPage = {
      kind: "ending" as const,
      text: state.endingText ?? "",
      scene: state.pendingScene,
      archetypes: state.archetypes,
      players: state.players,
    };
    return [cover, ...roundPages, endingPage];
  }, [state]);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(
      () => setPage((p) => (p + 1) % pages.length),
      6000,
    );
    return () => clearTimeout(t);
  }, [autoplay, page, pages.length]);

  const downloadPdf = () => {
    if (!state.genre) return;
    playSting("submit");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const margin = 48;

    // Cover
    doc.setFillColor(15, 12, 35);
    doc.rect(0, 0, W, doc.internal.pageSize.getHeight(), "F");
    doc.setTextColor(245, 245, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(state.storyTitle ?? "An Untitled Tale", W / 2, 200, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "italic");
    doc.text(`A ${state.genre.name} story`, W / 2, 230, { align: "center" });
    doc.setFontSize(11);
    doc.text(
      `Storytellers: ${state.players.map((p) => p.name).join(", ")}`,
      W / 2,
      260,
      { align: "center" },
    );

    state.rounds.forEach((r) => {
      doc.addPage();
      doc.setFillColor(20, 16, 40);
      doc.rect(0, 0, W, doc.internal.pageSize.getHeight(), "F");
      doc.setTextColor(245, 245, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`Round ${r.round}`, margin, margin + 12);
      let y = margin + 50;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      for (const s of r.sentences) {
        const player = state.players.find((p) => p.id === s.playerId);
        doc.setFont("helvetica", "italic");
        doc.text(`${player?.name ?? "Player"}:`, margin, y);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(s.text, W - 2 * margin - 70);
        doc.text(lines, margin + 70, y);
        y += lines.length * 16 + 8;
      }
      if (r.twist) {
        y += 8;
        doc.setFont("helvetica", "bolditalic");
        doc.setTextColor(251, 191, 36);
        doc.text(`Twist: ${r.twist.text}`, margin, y);
        doc.setTextColor(245, 245, 255);
      }
    });

    // Ending
    doc.addPage();
    doc.setFillColor(20, 16, 40);
    doc.rect(0, 0, W, doc.internal.pageSize.getHeight(), "F");
    doc.setTextColor(245, 245, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Ending", margin, margin + 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const endingLines = doc.splitTextToSize(state.endingText ?? "", W - 2 * margin);
    doc.text(endingLines, margin, margin + 50);

    let y = margin + 50 + endingLines.length * 16 + 24;
    doc.setFont("helvetica", "bold");
    doc.text("Archetypes", margin, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    for (const a of state.archetypes) {
      const player = state.players.find((p) => p.id === a.playerId);
      doc.text(`${player?.name ?? "Player"} — ${a.archetype} (${a.reason})`, margin, y);
      y += 16;
    }

    doc.save(`${state.storyTitle ?? "story-forge"}.pdf`);
  };

  const share = async () => {
    const text = `${state.storyTitle} — a Story Forge tale we just made.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: state.storyTitle ?? "Story Forge", text });
      } catch {
        /* user dismissed */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard.");
    }
  };

  const replay = () => {
    dispatch({ type: "RESET" });
    navigate("/flagship-games/story-forge");
  };

  if (!state.genre) return null;
  const genre = state.genre;
  const current = pages[page];

  return (
    <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: genre.themeColors.bgGradient }}
      />
      <div className="relative max-w-5xl mx-auto z-10" ref={containerRef}>
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/flagship-games/story-forge")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm"
          >
            <ArrowLeft size={16} /> Lobby
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoplay(!autoplay)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
            >
              {autoplay ? <Pause size={12} /> : <Play size={12} />}
              {autoplay ? "Pause" : "Replay narration"}
            </button>
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
            >
              <Share2 size={12} /> Share
            </button>
            <button
              type="button"
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold"
            >
              <Download size={12} /> Download
            </button>
          </div>
        </div>

        {/* Book frame */}
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        >
          <div
            className="relative aspect-[16/10] flex items-center justify-center px-10 md:px-16"
            style={{
              background:
                current?.kind === "round" && current.scene
                  ? current.scene.background
                  : current?.kind === "ending" && current.scene
                  ? current.scene.background
                  : genre.posterGradient,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
              }}
            />
            <div className="relative max-w-3xl text-center">
              {current?.kind === "cover" && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-3">
                    A {genre.name} Story
                  </div>
                  <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white drop-shadow-lg leading-tight">
                    {current.title}
                  </h1>
                  <div className="mt-6 text-sm text-white/70 italic">
                    By {state.players.map((p) => p.name).join(" · ")}
                  </div>
                </>
              )}
              {current?.kind === "round" && (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2">
                    Round {current.round}
                  </div>
                  {current.sentences.map((s) => {
                    const player = state.players.find((p) => p.id === s.playerId);
                    return (
                      <p
                        key={s.id}
                        className="font-serif text-white text-base md:text-lg leading-relaxed drop-shadow"
                        style={{
                          textShadow: `0 0 16px ${player?.color ?? "#fff"}66, 0 2px 8px rgba(0,0,0,0.8)`,
                        }}
                      >
                        {s.text}
                      </p>
                    );
                  })}
                  {current.twist && (
                    <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-300/40 text-amber-100 text-xs">
                      ✦ Twist · {current.twist.text}
                    </div>
                  )}
                </div>
              )}
              {current?.kind === "ending" && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-3">
                    Ending
                  </div>
                  <p className="font-serif text-white text-lg md:text-2xl leading-relaxed drop-shadow">
                    {current.text}
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Page controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/80 disabled:opacity-30"
          >
            ← Previous
          </button>
          <div className="text-xs text-white/40">
            Page {page + 1} / {pages.length}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/80 disabled:opacity-30"
          >
            Next →
          </button>
        </div>

        {/* Archetypes + resonance */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
            <h3 className="font-serif text-lg text-white mb-3">Player archetypes</h3>
            <ul className="space-y-2">
              {state.archetypes.map((a) => {
                const p = state.players.find((pl) => pl.id === a.playerId);
                return (
                  <li key={a.playerId} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold text-black"
                      style={{ background: p?.color ?? "#fff" }}
                    >
                      {p?.name?.slice(0, 1).toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">
                        {p?.name ?? "Player"} — <span className="text-violet-200">{a.archetype}</span>
                      </div>
                      <div className="text-xs text-white/50 italic">{a.reason}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
            <h3 className="font-serif text-lg text-white mb-3">Resonance scoreboard</h3>
            <ul className="space-y-2">
              {[...state.players]
                .sort((a, b) => b.resonance - a.resonance)
                .map((p, i) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <span className="text-white/40 w-5 text-xs tabular-nums">{i + 1}</span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black"
                      style={{ background: p.color }}
                    >
                      {p.name.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="flex-1 text-sm text-white/90">{p.name}</span>
                    <span className="text-xs text-violet-200 tabular-nums">
                      {p.resonance} {p.resonance === 1 ? "spark" : "sparks"}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            <RotateCcw size={14} /> Tell another story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryForgeStorybook;
