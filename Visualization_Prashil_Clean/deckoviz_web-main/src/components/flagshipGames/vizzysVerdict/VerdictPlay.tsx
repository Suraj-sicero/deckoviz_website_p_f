"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Lock, Sparkles, Award, Send, Zap, Trophy } from "lucide-react";
import { useVerdict, type FactCard } from "./lib/verdictState";
import { pickArtwork, pickTruth, generateVizzyBluff, type ArtworkRecord } from "./lib/artworkDb";

const VerdictPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useVerdict();

  useEffect(() => {
    if (state.players.length < 3) navigate("/flagship-games/vizzys-verdict");
  }, [state.players.length, navigate]);

  // intro -> begin first round
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => beginNextRound(), 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  const beginNextRound = () => {
    const usedIds = state.rounds.map((r) => r.artwork.id);
    const artwork = pickArtwork(state.difficulty, usedIds);
    // pick a random player to receive the truth
    const truthHolder = state.players[Math.floor(Math.random() * state.players.length)];
    const truthText = pickTruth(artwork);
    // Inject the truth fact card immediately so the round always has a truth
    const truthCard: FactCard = {
      id: `truth-${artwork.id}-${Date.now()}`,
      source: "truth",
      authorId: truthHolder.id,
      text: truthText,
      isTruth: true,
      doubleDown: false,
      voteCount: 0,
      votersWhoChose: [],
    };
    dispatch({ type: "BEGIN_REVEAL", artwork, truthHolderId: truthHolder.id });
    // The state update is async - we use a microtask to inject after BEGIN_REVEAL clears facts
    setTimeout(() => {
      dispatch({ type: "INJECT_TRUTH_CARD", card: truthCard });
    }, 0);
  };

  if (state.phase === "intro") {
    return (
      <Shell navigate={navigate}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-3">Vizzy clears the velvet rope</div>
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">
            "Tonight, my dears, the truth will be lonely. Everything else will sound true."
          </h2>
        </motion.div>
      </Shell>
    );
  }

  if (state.phase === "reveal" && state.artwork) {
    return <RevealView onBegin={() => dispatch({ type: "BEGIN_BLUFFING" })} navigate={navigate} />;
  }

  if (state.phase === "bluff-writing" && state.artwork) {
    return <BluffWritingView navigate={navigate} />;
  }

  if (state.phase === "fact-reading" && state.artwork) {
    return <FactReadingView navigate={navigate} />;
  }

  if (state.phase === "voting" && state.artwork) {
    return <VotingView navigate={navigate} />;
  }

  if (state.phase === "results" && state.artwork) {
    return (
      <ResultsView
        navigate={navigate}
        onAdvance={() => {
          if (state.round >= state.roundLimit) {
            dispatch({ type: "ADVANCE" });
            navigate("/flagship-games/vizzys-verdict/leaderboard");
          } else {
            beginNextRound();
          }
        }}
      />
    );
  }

  return null;
};

/* ---------- Shell ---------- */

const Shell: React.FC<{ children: React.ReactNode; navigate: ReturnType<typeof useNavigate> }> = ({
  children,
  navigate,
}) => (
  <div className="min-h-screen bg-[#040206] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #08050b, #1c1410 60%, #08050b)" }} />
    <motion.div
      className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
      style={{ background: "rgba(251, 146, 60, 0.12)" }}
      animate={{ opacity: [0.18, 0.32, 0.18] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    <div className="relative max-w-7xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/vizzys-verdict")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------- Reveal ---------- */

const ArtFrame: React.FC<{ artwork: ArtworkRecord; dimmed?: boolean; showLabel?: boolean }> = ({ artwork, dimmed, showLabel }) => (
  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-[8px] border-amber-200/15 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
    <motion.div
      key={artwork.id}
      initial={{ scale: 1.08, opacity: 0 }}
      animate={{ scale: 1, opacity: dimmed ? 0.4 : 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0"
      style={{ background: artwork.poster }}
    />
    {/* gallery vignette */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 100%)" }} />
    {/* dust */}
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 1.5,
            height: 1.5,
            background: "rgba(254, 215, 170, 0.4)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
    {showLabel && (
      <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white/90">
        <span className="font-serif italic">"{artwork.title}"</span> · {artwork.artist}, {artwork.year}
      </div>
    )}
  </div>
);

const RevealView: React.FC<{ onBegin: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onBegin, navigate }) => {
  const { state } = useVerdict();
  const art = state.artwork!;
  const truthHolder = state.players.find((p) => p.id === state.truthHolderId);
  return (
    <Shell navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ArtFrame artwork={art} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">
            Round {state.round} / {state.roundLimit}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Vizzy</div>
            <p className="font-serif italic text-white/90">"{art.opener}"</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.3em] text-amber-200">
              <Lock size={11} /> Sealed envelope
            </div>
            <p className="text-sm text-white/70">
              One of you has just received the real fact in private. Don't say a word.
            </p>
            {truthHolder && (
              <div className="mt-3 text-xs text-white/50 italic">
                Envelope handed to <span className="text-white">{truthHolder.name}</span>.
              </div>
            )}
          </div>
          <button onClick={onBegin} className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm">
            Begin bluffing
          </button>
        </div>
      </div>
    </Shell>
  );
};

/* ---------- Bluff writing ---------- */

const BluffWritingView: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => {
  const { state, dispatch } = useVerdict();
  const art = state.artwork!;
  const [activeIdx, setActiveIdx] = useState(0);
  const [fake1, setFake1] = useState("");
  const [fake2, setFake2] = useState("");
  const [doubleDownTarget, setDoubleDownTarget] = useState<1 | 2 | null>(null);
  const [revealedTruth, setRevealedTruth] = useState(false);

  const player = state.players[activeIdx];
  const isTruthHolder = player?.id === state.truthHolderId;

  const submit = () => {
    if (!player) return;
    const f1 = fake1.trim();
    const f2 = fake2.trim();
    if (!f1 || !f2) return;

    const facts: FactCard[] = [
      {
        id: `f-${player.id}-1-${Date.now()}`,
        source: "player",
        authorId: player.id,
        text: f1.slice(0, 240),
        isTruth: false,
        doubleDown: doubleDownTarget === 1,
        voteCount: 0,
        votersWhoChose: [],
      },
      {
        id: `f-${player.id}-2-${Date.now() + 1}`,
        source: "player",
        authorId: player.id,
        text: f2.slice(0, 240),
        isTruth: false,
        doubleDown: doubleDownTarget === 2,
        voteCount: 0,
        votersWhoChose: [],
      },
    ];

    dispatch({
      type: "SUBMIT_FACTS",
      playerId: player.id,
      facts,
      doubleDownFactId: doubleDownTarget ? facts[doubleDownTarget - 1].id : null,
    });

    setFake1("");
    setFake2("");
    setDoubleDownTarget(null);
    setRevealedTruth(false);

    if (activeIdx < state.players.length - 1) {
      setActiveIdx((i) => i + 1);
    } else {
      // optionally inject Vizzy bluff
      if (!state.vizzyBluffUsed && Math.random() > 0.55) {
        const card: FactCard = {
          id: `vizzy-${Date.now()}`,
          source: "vizzy",
          authorId: null,
          text: generateVizzyBluff(art),
          isTruth: false,
          doubleDown: false,
          voteCount: 0,
          votersWhoChose: [],
        };
        dispatch({ type: "INJECT_VIZZY_BLUFF", card });
      }
      // shuffle order and begin reading
      // We compute order after a tick to ensure latest facts/state are present.
      setTimeout(() => {
        const order = shuffle([...state.facts.map((f) => f.id)]);
        // ensure we capture latest facts using the dispatch closure pattern
        dispatch({ type: "BEGIN_READING", order });
      }, 0);
    }
  };

  return (
    <Shell navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ArtFrame artwork={art} dimmed />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">
              Pass to {player?.name}
            </div>
            <p className="text-xs text-white/60 italic">
              {isTruthHolder ? "You're holding the truth - write two believable lies around it." : "You weren't handed the truth - invent two convincing facts."}
            </p>
          </div>

          {isTruthHolder && (
            <div className="rounded-2xl border border-amber-300/40 bg-amber-500/10 p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1 flex items-center gap-1">
                <Lock size={11} /> Your sealed envelope
              </div>
              {revealedTruth ? (
                <p className="font-serif italic text-amber-50 leading-relaxed">"{player?.privateTruth ?? state.facts.find((f) => f.isTruth)?.text}"</p>
              ) : (
                <button onClick={() => setRevealedTruth(true)} className="px-3 py-1.5 rounded-full bg-amber-300 text-black text-xs font-semibold">
                  Break the seal
                </button>
              )}
            </div>
          )}

          <BluffField label="Lie #1" value={fake1} onChange={setFake1} doubleDown={doubleDownTarget === 1} onDoubleDown={() => setDoubleDownTarget(doubleDownTarget === 1 ? null : 1)} allowDoubleDown={!player?.doubleDownUsed} />
          <BluffField label="Lie #2" value={fake2} onChange={setFake2} doubleDown={doubleDownTarget === 2} onDoubleDown={() => setDoubleDownTarget(doubleDownTarget === 2 ? null : 2)} allowDoubleDown={!player?.doubleDownUsed} />

          <button
            onClick={submit}
            disabled={!fake1.trim() || !fake2.trim()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
            style={{ background: "linear-gradient(135deg, #fbbf24, #ea580c)", color: "white" }}
          >
            Pass the device <Send size={14} />
          </button>
        </div>
      </div>
    </Shell>
  );
};

const BluffField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  doubleDown: boolean;
  onDoubleDown: () => void;
  allowDoubleDown: boolean;
}> = ({ label, value, onChange, doubleDown, onDoubleDown, allowDoubleDown }) => (
  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">{label}</div>
      {allowDoubleDown && (
        <button
          onClick={onDoubleDown}
          className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] border ${doubleDown ? "bg-rose-500/30 text-rose-100 border-rose-300/60" : "bg-white/5 text-white/50 border-white/10 hover:border-white/30"}`}
        >
          {doubleDown ? "✦ Double down sealed" : "Double down"}
        </button>
      )}
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 240))}
      rows={2}
      placeholder="Confident. Specific. Almost true."
      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
    />
    <div className="text-right text-[10px] text-white/40 tabular-nums">{value.length}/240</div>
  </div>
);

/* ---------- Fact reading ---------- */

const FactReadingView: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => {
  const { state, dispatch } = useVerdict();
  const art = state.artwork!;
  const idx = state.readingIdx;
  const factId = state.factOrder[idx];
  const fact = state.facts.find((f) => f.id === factId);

  useEffect(() => {
    if (!fact) return;
    if (idx >= state.factOrder.length - 1) {
      const t = setTimeout(() => dispatch({ type: "BEGIN_VOTING" }), 4500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => dispatch({ type: "BUMP_READING" }), 4500);
    return () => clearTimeout(t);
  }, [idx, fact, state.factOrder.length, dispatch]);

  if (!fact) return null;
  return (
    <Shell navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ArtFrame artwork={art} dimmed />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">
            Submission {idx + 1} / {state.factOrder.length}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.9 }}
              className="rounded-3xl border border-amber-200/15 bg-white/[0.04] backdrop-blur-md p-6"
            >
              <div className="font-serif italic text-xs uppercase tracking-[0.3em] text-amber-200 mb-2">
                Vizzy reads, neutrally
              </div>
              <p className="font-serif text-white text-lg md:text-xl leading-relaxed">"{fact.text}"</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
};

/* ---------- Voting ---------- */

const VotingView: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => {
  const { state, dispatch } = useVerdict();
  const art = state.artwork!;
  const voter = state.players[state.votingIdx];
  const voterFacts = state.facts.filter((f) => f.authorId !== voter?.id);

  const cast = (factId: string) => {
    if (!voter) return;
    dispatch({ type: "CAST_VOTE", voterId: voter.id, factId });
    if (state.votingIdx < state.players.length - 1) {
      dispatch({ type: "BUMP_VOTER" });
    } else {
      // finalize round - compute trap bonus: wrong answer that fooled the most players
      // (most votes among non-truth facts excluding Vizzy bluff)
      const wrongAnswers = state.facts.filter((f) => !f.isTruth && f.source !== "vizzy");
      const sorted = [...wrongAnswers].sort((a, b) => b.voteCount + (b.id === factId ? 1 : 0) - (a.voteCount + (a.id === factId ? 1 : 0)));
      // we want the latest tally so use a microtask
      setTimeout(() => {
        const fresh = wrongAnswers.length > 0 ? [...wrongAnswers].sort((a, b) => b.voteCount - a.voteCount)[0] : null;
        dispatch({ type: "FINALIZE_ROUND", trapBonusId: fresh && fresh.voteCount > 0 ? fresh.id : null });
      }, 0);
    }
  };

  if (!voter) return null;
  return (
    <Shell navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ArtFrame artwork={art} dimmed />
        </div>
        <div className="lg:col-span-2 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">
            {voter.name}, vote for the truth
          </div>
          <div className="space-y-2">
            {voterFacts.map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ x: 4 }}
                onClick={() => cast(f.id)}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-3"
              >
                <p className="font-serif text-white text-sm leading-relaxed">"{f.text}"</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};

/* ---------- Results ---------- */

const ResultsView: React.FC<{ navigate: ReturnType<typeof useNavigate>; onAdvance: () => void }> = ({ navigate, onAdvance }) => {
  const { state } = useVerdict();
  const art = state.artwork!;
  const truth = state.facts.find((f) => f.isTruth);
  const vizzyBluff = state.facts.find((f) => f.source === "vizzy");
  const max = Math.max(1, ...state.facts.map((f) => f.voteCount));

  return (
    <Shell navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-3">
          <ArtFrame artwork={art} showLabel />
          <div className="rounded-2xl border border-amber-300/40 bg-amber-500/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">The truth was</div>
            <p className="font-serif italic text-amber-50 text-lg leading-relaxed">"{truth?.text}"</p>
            <div className="mt-3 text-xs text-white/70 italic font-serif">{art.context}</div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Results</div>
          {state.facts.map((f) => {
            const player = state.players.find((p) => p.id === f.authorId);
            const isTruth = f.isTruth;
            const isVizzy = f.source === "vizzy";
            const isTrap = state.trapBonusId === f.id;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-2xl border p-3 ${isTruth ? "border-emerald-300/40 bg-emerald-500/10" : isVizzy ? "border-violet-300/40 bg-violet-500/10" : isTrap ? "border-rose-300/40 bg-rose-500/10" : "border-white/10 bg-white/[0.04]"}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-[0.25em]">
                  {isTruth && <span className="text-emerald-200 inline-flex items-center gap-1"><Sparkles size={11} /> Truth</span>}
                  {isVizzy && <span className="text-violet-200 inline-flex items-center gap-1"><Award size={11} /> Vizzy's bluff</span>}
                  {!isTruth && !isVizzy && player && (
                    <span className="text-white/60 inline-flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ background: player.color }} /> {player.name}
                    </span>
                  )}
                  {f.doubleDown && <span className="text-rose-200 inline-flex items-center gap-1"><Zap size={11} /> Double down</span>}
                  {isTrap && <span className="text-rose-200 inline-flex items-center gap-1"><Trophy size={11} /> Trap bonus</span>}
                  <span className="ml-auto text-white/60 tabular-nums">{f.voteCount} ★</span>
                </div>
                <p className="font-serif text-white text-sm leading-relaxed">"{f.text}"</p>
                <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(f.voteCount / max) * 100}%` }}
                    transition={{ duration: 0.9 }}
                    className={`h-full ${isTruth ? "bg-gradient-to-r from-emerald-300 to-amber-300" : "bg-gradient-to-r from-rose-300 to-amber-300"}`}
                  />
                </div>
              </motion.div>
            );
          })}

          {vizzyBluff && vizzyBluff.voteCount > 0 && (
            <div className="text-xs text-violet-200 italic">Vizzy is insufferable about this.</div>
          )}

          <button
            onClick={onAdvance}
            className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm"
          >
            {state.round >= state.roundLimit ? "Tally the gallery" : "Next round"}
          </button>
        </div>
      </div>
    </Shell>
  );
};

/* ---------- helpers ---------- */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default VerdictPlay;
