"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, ChevronRight, Sparkles, BookOpen, MessageSquare } from "lucide-react";
import { isMatch, rateReasoning, useMinds, type RoundType, type RoundRecord, type Submission } from "./lib/mindsState";
import {
  pickStraight,
  pickReasoning,
  pickConnection,
  pickMinority,
  RABBIT_HOLES,
  WILD_CARD_TEMPLATES,
} from "./lib/questions";

const ROUND_ORDER: RoundType[] = ["straight", "reasoning", "connection", "minority", "wild"];

const BrilliantMindsPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useMinds();
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (state.players.length === 0) navigate("/flagship-games/brilliant-minds");
  }, [state.players.length, navigate]);

  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => beginNextRound(), 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  const beginNextRound = () => {
    const idx = state.rounds.length;
    if (idx >= state.totalRounds) {
      dispatch({ type: "ADVANCE" });
      navigate("/flagship-games/brilliant-minds/leaderboard");
      return;
    }
    const type = ROUND_ORDER[idx];
    let round: RoundRecord;
    if (type === "straight") {
      const q = pickStraight(state.universe);
      round = { index: idx + 1, type, prompt: q.prompt, expectedAnswer: q.answer + (q.acceptable ? " · " + q.acceptable.join(", ") : ""), submissions: [], revealed: false };
    } else if (type === "reasoning") {
      const q = pickReasoning(state.universe);
      round = { index: idx + 1, type, prompt: q.prompt, expectedAnswer: q.exemplar, submissions: [], revealed: false };
    } else if (type === "connection") {
      const q = pickConnection(state.universe);
      round = { index: idx + 1, type, prompt: q.items.join(" · "), expectedAnswer: q.knownAnswer, submissions: [], revealed: false };
    } else if (type === "minority") {
      const q = pickMinority(state.universe);
      round = { index: idx + 1, type, prompt: q.prompt, expectedAnswer: `Popular: ${q.popularAnswer} · Correct: ${q.correctAnswer}`, submissions: [], revealed: false };
    } else {
      const tpl = WILD_CARD_TEMPLATES[Math.floor(Math.random() * WILD_CARD_TEMPLATES.length)];
      round = { index: idx + 1, type, prompt: `${tpl.label}: ${tpl.prompt}`, expectedAnswer: "Open-ended", submissions: [], revealed: false };
    }
    dispatch({ type: "BEGIN_ROUND", round });
    setActiveIdx(0);
    setDraft("");
  };

  const submit = () => {
    const text = draft.trim();
    if (!text || !state.currentRound) return;
    const player = state.players[activeIdx];
    if (!player) return;
    const submission: Submission = { playerId: player.id, text: text.slice(0, 360), scoreDelta: 0 };
    dispatch({ type: "SUBMIT", submission });
    setDraft("");
    if (activeIdx < state.players.length - 1) {
      setActiveIdx((i) => i + 1);
    } else {
      // reveal/score
      reveal();
    }
  };

  const reveal = () => {
    if (!state.currentRound) return;
    const round = state.currentRound;
    const finalDeltas: Record<string, number> = {};
    const subs = round.submissions.length === state.players.length ? round.submissions : [
      ...round.submissions,
      // pad with empty submissions for whoever didn't answer
      ...state.players
        .filter((p) => !round.submissions.some((s) => s.playerId === p.id))
        .map((p) => ({ playerId: p.id, text: "", scoreDelta: 0 })),
    ];
    if (round.type === "straight") {
      const expected = round.expectedAnswer.split(" · ")[0];
      const acceptable = round.expectedAnswer.split(" · ").slice(1);
      subs.forEach((s) => {
        if (!s.text.trim()) {
          finalDeltas[s.playerId] = 0;
          return;
        }
        finalDeltas[s.playerId] = isMatch(s.text, expected, acceptable) ? 2 : -1;
      });
    } else if (round.type === "reasoning") {
      subs.forEach((s) => {
        const { pts } = rateReasoning(s.text);
        finalDeltas[s.playerId] = pts;
      });
    } else if (round.type === "connection") {
      subs.forEach((s) => {
        if (!s.text.trim()) {
          finalDeltas[s.playerId] = 0;
          return;
        }
        const matched = isMatch(s.text, round.expectedAnswer);
        finalDeltas[s.playerId] = matched ? 3 : 1; // +1 for any creative attempt
      });
    } else if (round.type === "minority") {
      const expectedCorrect = round.expectedAnswer.split("Correct: ")[1] ?? "";
      const expectedPopular = round.expectedAnswer.split("Popular: ")[1]?.split(" · ")[0] ?? "";
      const tally: Record<string, number> = {};
      subs.forEach((s) => {
        const k = s.text.trim().toLowerCase();
        if (k) tally[k] = (tally[k] ?? 0) + 1;
      });
      subs.forEach((s) => {
        const lower = s.text.trim().toLowerCase();
        if (!lower) {
          finalDeltas[s.playerId] = 0;
          return;
        }
        const count = tally[lower] ?? 1;
        const isCorrect = isMatch(s.text, expectedCorrect);
        const isPopular = isMatch(s.text, expectedPopular) && tally[lower] && tally[lower] > 1;
        let pts = 0;
        if (isCorrect && count === 1) pts = 4; // sole correct
        else if (isCorrect && count > 1) pts = 2;
        else if (isPopular) pts = -1;
        finalDeltas[s.playerId] = pts;
      });
    } else {
      // wild
      subs.forEach((s) => {
        const { pts } = rateReasoning(s.text);
        finalDeltas[s.playerId] = pts > 0 ? pts : s.text.trim().length > 0 ? 1 : 0;
      });
    }
    dispatch({ type: "REVEAL", finalDeltas });
  };

  const triggerRabbitHole = (playerId: string | null) => {
    const content = RABBIT_HOLES[Math.floor(Math.random() * RABBIT_HOLES.length)];
    dispatch({ type: "TRIGGER_RABBIT_HOLE", content, playerId });
  };

  if (state.phase === "intro") {
    return (
      <Shell navigate={navigate}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">
            "Welcome. We're not here to know everything - we're here to connect things beautifully."
          </h2>
        </motion.div>
      </Shell>
    );
  }

  if (state.phase === "round" && state.currentRound) {
    const round = state.currentRound;
    const player = state.players[activeIdx];
    const allSubmitted = round.submissions.length >= state.players.length;
    return (
      <Shell navigate={navigate}>
        <RoundHeader idx={round.index} total={state.totalRounds} type={round.type} />
        <RoundCard prompt={round.prompt} type={round.type} />
        {!allSubmitted && player && (
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: player.color }}>
                {player.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm">{player.name}</span>
              {!player.rabbitHoleUsed && (
                <button
                  onClick={() => triggerRabbitHole(player.id)}
                  className="ml-auto inline-flex items-center gap-1 text-xs text-violet-200 px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-300/30"
                >
                  <BookOpen size={11} /> Rabbit Hole
                </button>
              )}
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, round.type === "straight" || round.type === "minority" ? 80 : 360))}
              rows={round.type === "straight" || round.type === "minority" ? 1 : 4}
              placeholder={
                round.type === "straight"
                  ? "Type your answer."
                  : round.type === "minority"
                  ? "One answer. Don't conform."
                  : round.type === "connection"
                  ? "What connects them?"
                  : round.type === "reasoning"
                  ? "Show your reasoning."
                  : "Anything goes."
              }
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-white/40">{activeIdx + 1} / {state.players.length}</span>
              <button
                onClick={submit}
                disabled={!draft.trim()}
                className="px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #22d3ee)", color: "white" }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {allSubmitted && (
          <div className="text-center text-white/50 italic text-sm mt-4">Vizzy is considering…</div>
        )}
      </Shell>
    );
  }

  if (state.phase === "results" && state.currentRound) {
    return <ResultsView onAdvance={beginNextRound} />;
  }

  if (state.phase === "rabbit-hole" && state.rabbitHole) {
    return (
      <Shell navigate={navigate}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-10 space-y-4">
          <div className="text-[10px] uppercase tracking-[0.4em] text-violet-200">Rabbit hole · 90 seconds of curiosity, no points</div>
          <h2 className="font-serif text-3xl text-white">{state.rabbitHole.title}</h2>
          <p className="font-serif text-white/85 leading-relaxed">{state.rabbitHole.body}</p>
          <button
            onClick={() => dispatch({ type: "EXIT_RABBIT_HOLE" })}
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center gap-2"
          >
            Back to the game <ChevronRight size={14} />
          </button>
        </motion.div>
      </Shell>
    );
  }

  return null;
};

/* ===== Shell ===== */

const Shell: React.FC<{ children: React.ReactNode; navigate: ReturnType<typeof useNavigate> }> = ({ children, navigate }) => (
  <div className="min-h-screen bg-[#020610] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #020610, #0a1830 60%, #020610)" }} />
    <div className="relative max-w-6xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/brilliant-minds")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
      </div>
      {children}
    </div>
  </div>
);

const RoundHeader: React.FC<{ idx: number; total: number; type: RoundType }> = ({ idx, total, type }) => {
  const labels: Record<RoundType, string> = {
    straight: "Round I · The Straight Question",
    reasoning: "Round II · The Reasoning Chain",
    connection: "Round III · The Connection",
    minority: "Round IV · The Minority Report",
    wild: "Round V · Vizzy's Wild Card",
  };
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-sky-200">
        Round {idx} of {total}
      </div>
      <div className="font-serif text-white text-lg md:text-2xl mt-1">{labels[type]}</div>
    </div>
  );
};

const RoundCard: React.FC<{ prompt: string; type: RoundType }> = ({ prompt, type }) => {
  if (type === "connection") {
    const items = prompt.split(" · ");
    return (
      <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-sky-200 mb-3">Four things. One thread.</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-3 text-center">
              <p className="font-serif text-white">{it}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6">
      <p className="font-serif text-white text-xl md:text-2xl leading-relaxed">"{prompt}"</p>
    </div>
  );
};

const ResultsView: React.FC<{ onAdvance: () => void }> = ({ onAdvance }) => {
  const { state } = useMinds();
  const navigate = useNavigate();
  const round = state.currentRound!;
  return (
    <Shell navigate={navigate}>
      <RoundHeader idx={round.index} total={state.totalRounds} type={round.type} />
      <div className="mt-4 rounded-3xl border border-amber-300/30 bg-amber-500/10 p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Vizzy</div>
        <p className="font-serif italic text-amber-50 leading-relaxed">"{round.expectedAnswer}"</p>
      </div>
      <div className="mt-4 space-y-2">
        {round.submissions.map((s) => {
          const player = state.players.find((p) => p.id === s.playerId);
          return (
            <div key={s.playerId} className={`rounded-2xl border p-3 ${s.scoreDelta > 0 ? "border-emerald-300/30 bg-emerald-500/5" : s.scoreDelta < 0 ? "border-rose-300/30 bg-rose-500/5" : "border-white/10 bg-white/[0.04]"}`}>
              <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-[0.25em]">
                {player && <span className="w-2.5 h-2.5 rounded-full" style={{ background: player.color }} />}
                <span className="text-white/70">{player?.name}</span>
                <span className={`ml-auto tabular-nums ${s.scoreDelta > 0 ? "text-emerald-200" : s.scoreDelta < 0 ? "text-rose-200" : "text-white/40"}`}>
                  {s.scoreDelta > 0 ? `+${s.scoreDelta}` : s.scoreDelta}
                </span>
              </div>
              <p className="font-serif text-white text-sm leading-relaxed">{s.text || <span className="italic text-white/40">- no submission -</span>}</p>
            </div>
          );
        })}
      </div>
      <button onClick={onAdvance} className="mt-4 w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm">
        {round.index >= state.totalRounds ? "Tally minds" : "Next round"}
      </button>
    </Shell>
  );
};

export default BrilliantMindsPlay;
