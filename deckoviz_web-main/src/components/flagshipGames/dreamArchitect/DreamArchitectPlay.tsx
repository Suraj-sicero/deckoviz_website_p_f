"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Send, Sparkles } from "lucide-react";
import { useDreamArchitect, type Contribution, type Phase } from "./lib/dreamArchitectState";
import { renderWorld } from "./lib/worldRender";
import { PHASE_DETAILS, chooseSecret, describeWorld, nameWorld, awardBadges, type PhaseKey } from "./lib/loreEngine";

const PHASE_ORDER: PhaseKey[] = ["geography", "atmosphere", "inhabitants", "secret"];

const DreamArchitectPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useDreamArchitect();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!state.seed || state.players.length === 0) {
      navigate("/flagship-games/dream-architect");
    }
  }, [state.seed, state.players.length, navigate]);

  // Auto-transition from intro -> geography
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => dispatch({ type: "ADVANCE_PHASE" }), 3200);
    return () => clearTimeout(t);
  }, [state.phase, dispatch]);

  const phaseKey: PhaseKey | null = PHASE_ORDER.includes(state.phase as PhaseKey)
    ? (state.phase as PhaseKey)
    : null;

  const activePlayer = state.players[state.currentPlayerIdx];

  const submissionsThisPhase = useMemo(
    () => state.contributions.filter((c) => c.phase === phaseKey).length,
    [state.contributions, phaseKey],
  );

  // Decide minimum submissions per phase: one per player for secret, one per player for others
  const requiredPerPhase = state.players.length;
  const phaseComplete = phaseKey ? submissionsThisPhase >= requiredPerPhase : false;

  const submitContribution = () => {
    const text = draft.trim();
    if (!text || !activePlayer || !phaseKey) return;
    const contribution: Contribution = {
      id: `c-${phaseKey}-${activePlayer.id}-${Date.now()}`,
      playerId: activePlayer.id,
      phase: phaseKey,
      text: text.slice(0, 220),
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_CONTRIBUTION", contribution });
    setDraft("");
    // bump turn if more remain in this phase
    if (submissionsThisPhase + 1 < requiredPerPhase) {
      dispatch({ type: "BUMP_TURN" });
    }
  };

  const advancePhase = () => {
    if (state.phase === "secret") {
      // finalize
      const description = describeWorld(state.seed!, state.contributions);
      const name = nameWorld(state.seed!, state.contributions);
      const secret = chooseSecret(state.contributions);
      dispatch({ type: "FINALIZE", name, description, chosenSecretId: secret?.id ?? null });
      return;
    }
    dispatch({ type: "ADVANCE_PHASE" });
  };

  const render = useMemo(() => {
    if (!state.seed) return null;
    return renderWorld(state.seed, state.contributions, state.phase);
  }, [state.seed, state.contributions, state.phase]);

  if (!state.seed || !render) return null;
  const seed = state.seed;

  /* -------- INTRO -------- */
  if (state.phase === "intro") {
    return (
      <Shell seed={seed} render={render} navigate={navigate}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-3">Vizzy intones</div>
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            "{seed.text}"
          </h2>
          <p className="text-white/60 italic mt-4">Beginning the rough render…</p>
        </motion.div>
      </Shell>
    );
  }

  /* -------- FINAL -------- */
  if (state.phase === "final") {
    return (
      <Shell seed={seed} render={render} navigate={navigate}>
        <FinalReveal />
      </Shell>
    );
  }

  /* -------- LIBRARY -------- */
  if (state.phase === "library") {
    return (
      <Shell seed={seed} render={render} navigate={navigate}>
        <LibrarySaved />
      </Shell>
    );
  }

  /* -------- PHASE (geography/atmosphere/inhabitants/secret) -------- */
  if (!phaseKey) return null;
  const phaseInfo = PHASE_DETAILS[phaseKey];
  const myContributions = state.contributions.filter((c) => c.phase === phaseKey);

  return (
    <Shell seed={seed} render={render} navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <PhaseBanner phaseInfo={phaseInfo} index={PHASE_ORDER.indexOf(phaseKey) + 1} />
          {/* live "world growing" feed */}
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 max-h-72 overflow-y-auto space-y-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-1">
              The world so far ({state.contributions.length} details)
            </div>
            {state.contributions.length === 0 && (
              <p className="text-white/40 text-sm italic">The first detail will appear here.</p>
            )}
            <AnimatePresence initial={false}>
              {state.contributions.map((c) => {
                const p = state.players.find((pl) => pl.id === c.playerId);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 py-1"
                  >
                    <div className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-[9px] font-bold text-black shrink-0" style={{ background: p?.color }}>
                      {p?.name?.slice(0, 1).toUpperCase() ?? "?"}
                    </div>
                    <div>
                      <p className="font-serif text-white/90 text-sm leading-relaxed">{c.text}</p>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">{PHASE_DETAILS[c.phase].label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-200 mb-1">
              Phase {PHASE_ORDER.indexOf(phaseKey) + 1} of 4 · {phaseInfo.label}
            </div>
            <h3 className="font-serif text-xl text-white mb-1">{phaseInfo.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-3">{phaseInfo.description}</p>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Examples</div>
            <ul className="text-xs text-white/60 italic space-y-1 mb-3">
              {phaseInfo.examples.map((e, i) => (
                <li key={i}>· {e}</li>
              ))}
            </ul>
            <div className="text-[10px] text-emerald-200">{phaseInfo.ambientNote}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {activePlayer && (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: activePlayer.color }}>
                      {activePlayer.name.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{activePlayer.name}'s turn</span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-white/40">
                {submissionsThisPhase} / {requiredPerPhase}
              </span>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 220))}
              placeholder={`Add one ${phaseInfo.label.toLowerCase()} detail…`}
              rows={3}
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-[10px] text-white/40 tabular-nums">{draft.length}/220</span>
              <button
                onClick={submitContribution}
                disabled={!draft.trim() || phaseComplete}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${seed.palette[0]}, ${seed.palette[1]})`,
                  color: "white",
                }}
              >
                Add to the world <Send size={12} />
              </button>
            </div>
            <div className="mt-2 text-[10px] text-white/40 italic">
              Vizzy will paint this detail onto the world.
            </div>
          </div>

          {phaseComplete && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={advancePhase}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold text-sm"
            >
              {state.phase === "secret" ? "Reveal the world" : "Continue"} <ChevronRight size={14} />
            </motion.button>
          )}

          {myContributions.length > 0 && (
            <div className="text-[10px] text-white/40 italic">
              {phaseInfo.label} so far: {myContributions.length} detail{myContributions.length === 1 ? "" : "s"}.
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
};

/* ----------------- Sub views ----------------- */

const PhaseBanner: React.FC<{
  phaseInfo: (typeof PHASE_DETAILS)[PhaseKey];
  index: number;
}> = ({ phaseInfo, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3 inline-flex items-center gap-3"
  >
    <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-200">Phase {index}</div>
    <div className="w-1 h-3 bg-white/20 rounded-full" />
    <div className="font-serif text-white">{phaseInfo.label}</div>
  </motion.div>
);

const FinalReveal: React.FC = () => {
  const { state, dispatch } = useDreamArchitect();
  const navigate = useNavigate();
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setRevealStep((s) => Math.min(s + 1, 3)), 1800);
    return () => clearTimeout(t);
  }, [revealStep]);

  const saveToLibrary = () => {
    if (!state.seed || !state.finalName || !state.poeticDescription) return;
    const render = renderWorld(state.seed, state.contributions, "final");
    const secretId = state.chosenSecretId;
    const secrets = state.contributions.filter((c) => c.phase === "secret");
    const world = {
      id: `world-${Date.now()}`,
      name: state.finalName,
      seed: state.seed,
      contributions: state.contributions,
      poeticDescription: state.poeticDescription,
      secrets: secretId ? secrets : secrets,
      finalScene: { background: render.background, overlay: render.overlay },
      savedAt: Date.now(),
    };
    dispatch({ type: "SAVE_TO_LIBRARY", world });
  };

  return (
    <div className="grid grid-cols-1 gap-6 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="text-center"
      >
        <div className="text-[10px] uppercase tracking-[0.4em] text-emerald-200 mb-3">A world has emerged</div>
        <h1 className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg">{state.finalName}</h1>
      </motion.div>

      {revealStep >= 1 && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center px-4"
        >
          {state.poeticDescription}
        </motion.p>
      )}

      {revealStep >= 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
          {state.players.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: p.color }}>
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">{p.name}</div>
                <div className="text-[10px] text-white/50">
                  {p.contributions.geography + p.contributions.atmosphere + p.contributions.inhabitants + p.contributions.secret} contributions
                </div>
              </div>
              <BadgePill player={p} />
            </div>
          ))}
        </motion.div>
      )}

      {revealStep >= 3 && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={saveToLibrary}
          className="mx-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
        >
          <Sparkles size={14} /> Save to the World Library
        </motion.button>
      )}
    </div>
  );
};

const BadgePill: React.FC<{ player: ReturnType<typeof useDreamArchitect>["state"]["players"][number] }> = ({ player }) => {
  const { state } = useDreamArchitect();
  // compute on the fly so it reflects the latest contribution counts
  const badge = useMemo(() => {
    const all = awardBadges(state.players.map((p) => ({ id: p.id, name: p.name, contributions: p.contributions })));
    return all.find((a) => a.playerId === player.id)?.badge ?? "Dreamshaper";
  }, [player.id, state.players]);
  return (
    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-300/30 text-emerald-100 text-[10px] uppercase tracking-[0.25em]">
      {badge}
    </span>
  );
};

const LibrarySaved: React.FC = () => {
  const { state, dispatch } = useDreamArchitect();
  const navigate = useNavigate();
  const latest = state.library[0];
  if (!latest) return null;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2">
        <div className="text-[10px] uppercase tracking-[0.4em] text-emerald-200">Saved · World Library</div>
        <h1 className="font-serif text-4xl text-white">{latest.name}</h1>
        <p className="text-white/60 mt-2 max-w-2xl mx-auto italic font-serif">{latest.poeticDescription}</p>
      </motion.div>

      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 max-w-3xl mx-auto">
        <h3 className="font-serif text-white text-lg mb-3">Lore archive</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {latest.contributions.map((c) => {
            const p = state.players.find((pl) => pl.id === c.playerId);
            return (
              <div key={c.id} className="flex items-start gap-2 text-sm">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 w-24 shrink-0 pt-0.5">
                  {PHASE_DETAILS[c.phase].label}
                </span>
                <div className="flex-1">
                  <p className="font-serif text-white/90 leading-relaxed">{c.text}</p>
                  <div className="text-[10px] text-white/40">— {p?.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/flagship-games/dream-architect");
          }}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm"
        >
          Dream a new world
        </button>
      </div>
    </div>
  );
};

/* ----------------- Shell ----------------- */

const Shell: React.FC<{
  children: React.ReactNode;
  seed: ReturnType<typeof useDreamArchitect>["state"]["seed"];
  render: ReturnType<typeof renderWorld>;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ children, render, navigate }) => {
  // particle config based on weather hint
  const particleColor = particleColorFor(render.particles);
  return (
    <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 0.95 }}
        transition={{ duration: 1.4 }}
        style={{ background: render.background }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: render.overlay }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: particleColor,
              boxShadow: `0 0 6px ${particleColor}`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 7 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/dream-architect")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

function particleColorFor(p: ReturnType<typeof renderWorld>["particles"]): string {
  switch (p) {
    case "rain":
      return "rgba(173, 216, 230, 0.7)";
    case "snow":
      return "rgba(255, 255, 255, 0.85)";
    case "embers":
      return "rgba(251, 191, 36, 0.85)";
    case "aurora":
      return "rgba(94, 234, 212, 0.7)";
    case "mist":
      return "rgba(220, 220, 235, 0.45)";
    case "pollen":
      return "rgba(253, 224, 71, 0.7)";
    case "dust":
    default:
      return "rgba(254, 215, 170, 0.55)";
  }
}

export default DreamArchitectPlay;
