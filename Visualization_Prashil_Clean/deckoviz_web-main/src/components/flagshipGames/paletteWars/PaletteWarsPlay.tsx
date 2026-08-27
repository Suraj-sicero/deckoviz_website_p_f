"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Smile, Send, Zap, Trophy, Award } from "lucide-react";
import { usePaletteWars, type Response } from "./lib/paletteWarsState";
import { mockArtProvider, type Artwork } from "./lib/artGenerator";
import { rollMoodFor } from "./lib/moods";
import {
  pickWriterPrompt,
  pickThemeConstraint,
  vizzyPickLine,
  vizzyWinnerLine,
  assignPlayerTitles,
} from "./lib/prompts";

const WRITING_SECONDS = 90;

const PaletteWarsPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = usePaletteWars();
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const [now, setNow] = useState(Date.now());
  const generatingLockRef = useRef(false);

  // safety: kick back if no setup
  useEffect(() => {
    if (!state.mood || state.players.length === 0) {
      navigate("/flagship-games/palette-wars");
    }
  }, [state.mood, state.players.length, navigate]);

  // tick for countdown
  useEffect(() => {
    if (state.phase !== "writing") return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [state.phase]);

  // Phase: opening -> generating
  useEffect(() => {
    if (state.phase === "opening") {
      const t = setTimeout(() => dispatch({ type: "BEGIN_ROUND" }), 1800);
      return () => clearTimeout(t);
    }
  }, [state.phase, dispatch]);

  // Phase: generating -> writing (after art generated)
  useEffect(() => {
    if (state.phase !== "generating" || !state.mood) return;
    if (generatingLockRef.current) return;
    generatingLockRef.current = true;
    (async () => {
      const useMood = rollMoodFor(state.round - 1, state.mood!);
      const artwork = await mockArtProvider.generate({ mood: useMood, round: state.round });
      dispatch({ type: "SET_ARTWORK", artwork });
      // theme on every 3rd round (3, 6, 9, ...)
      if (state.round % 3 === 0 && state.round > 0) {
        const theme = pickThemeConstraint(state.round);
        dispatch({ type: "SET_THEME", theme });
      }
      // small reveal pause then writing
      await new Promise((r) => setTimeout(r, 1400));
      const deadline = Date.now() + WRITING_SECONDS * 1000;
      dispatch({ type: "BEGIN_WRITING", deadline });
      setCurrentPlayerIdx(0);
      setDraft("");
      generatingLockRef.current = false;
    })();
  }, [state.phase, state.round, state.mood, dispatch]);

  // Phase: writing -> reveal once deadline reached or all submitted
  useEffect(() => {
    if (state.phase !== "writing" || !state.writingDeadline) return;
    const submittedThisRound = state.responses.filter((r) => r.round === state.round).length;
    if (submittedThisRound >= state.players.length || now >= state.writingDeadline) {
      dispatch({ type: "BEGIN_REVEAL" });
    }
  }, [state.phase, state.writingDeadline, state.responses, state.round, state.players.length, now, dispatch]);

  // Responses for this round (shuffled deterministically per round)
  const roundResponses = useMemo(() => {
    const subset = state.responses.filter((r) => r.round === state.round);
    return [...subset].sort((a, b) => (a.id < b.id ? 1 : -1));
  }, [state.responses, state.round]);

  // Phase: reveal pacing
  useEffect(() => {
    if (state.phase !== "reveal") return;
    if (roundResponses.length === 0) {
      dispatch({ type: "BEGIN_VOTING" });
      return;
    }
    if (state.revealIdx >= roundResponses.length) {
      const t = setTimeout(() => dispatch({ type: "BEGIN_VOTING" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => dispatch({ type: "BUMP_REVEAL" }), 3200);
    return () => clearTimeout(t);
  }, [state.phase, state.revealIdx, roundResponses.length, dispatch]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    const player = state.players[currentPlayerIdx];
    if (!player) return;
    const response: Response = {
      id: `r-${state.round}-${player.id}-${Date.now()}`,
      playerId: player.id,
      text: text.slice(0, 280),
      round: state.round,
      voteCount: 0,
      laughs: [],
    };
    dispatch({ type: "SUBMIT_RESPONSE", response });
    setDraft("");
    if (currentPlayerIdx < state.players.length - 1) {
      setCurrentPlayerIdx((i) => i + 1);
    }
  };

  const useSwap = () => {
    const player = state.players[currentPlayerIdx];
    if (!player || player.swapUsed) return;
    dispatch({ type: "USE_SWAP", playerId: player.id });
  };

  const vote = (responseId: string) => {
    dispatch({ type: "CAST_VOTE", responseId });
  };

  const laugh = (responseId: string) => {
    const player = state.players[currentPlayerIdx];
    if (!player) return;
    dispatch({ type: "LAUGH", responseId, voterId: player.id });
  };

  const finalizeRound = useCallback(() => {
    // determine winner by voteCount, Vizzy's Pick = a different player (most laughs, or random)
    const responses = state.responses.filter((r) => r.round === state.round);
    if (responses.length === 0) {
      dispatch({ type: "FINALIZE_ROUND", winnerId: null, vizzyPickId: null });
      return;
    }
    const sorted = [...responses].sort((a, b) => b.voteCount - a.voteCount);
    const winner = sorted[0];
    let pickPool = responses.filter((r) => r.playerId !== winner.playerId);
    if (pickPool.length === 0) pickPool = responses;
    const pick =
      [...pickPool].sort((a, b) => b.laughs.length - a.laughs.length)[0] ?? null;
    dispatch({
      type: "FINALIZE_ROUND",
      winnerId: winner.id,
      vizzyPickId: pick?.id ?? null,
    });
  }, [state.responses, state.round, dispatch]);

  const advance = () => {
    if (state.round >= state.roundLimit) {
      dispatch({
        type: "FINISH",
        titles: assignPlayerTitles(state.players.map((p) => p.id)),
      });
      navigate("/flagship-games/palette-wars/leaderboard");
      return;
    }
    dispatch({ type: "BEGIN_ROUND" });
  };

  if (!state.mood) return null;
  const mood = state.mood;

  return (
    <Shell mood={mood} navigate={navigate}>
      {state.phase === "opening" && (
        <OpeningView mood={mood} />
      )}

      {state.phase === "generating" && (
        <GeneratingView mood={mood} round={state.round} limit={state.roundLimit} />
      )}

      {state.phase === "writing" && state.artwork && (
        <WritingView
          artwork={state.artwork}
          round={state.round}
          limit={state.roundLimit}
          deadline={state.writingDeadline ?? Date.now()}
          now={now}
          activePlayer={state.players[currentPlayerIdx]}
          submittedCount={state.responses.filter((r) => r.round === state.round).length}
          totalPlayers={state.players.length}
          theme={state.activeTheme}
          draft={draft}
          setDraft={setDraft}
          onSubmit={submit}
          onSwap={useSwap}
          swapDisabled={!state.players[currentPlayerIdx] || state.players[currentPlayerIdx].swapUsed}
          writerPrompt={pickWriterPrompt(state.round)}
        />
      )}

      {state.phase === "reveal" && state.artwork && (
        <RevealView
          artwork={state.artwork}
          responses={roundResponses}
          idx={Math.min(state.revealIdx, roundResponses.length - 1)}
          round={state.round}
          limit={state.roundLimit}
        />
      )}

      {state.phase === "voting" && state.artwork && (
        <VotingView
          artwork={state.artwork}
          responses={roundResponses}
          players={state.players}
          currentVoter={state.players[currentPlayerIdx]}
          onVote={(id) => {
            vote(id);
            if (currentPlayerIdx < state.players.length - 1) {
              setCurrentPlayerIdx((i) => i + 1);
            } else {
              finalizeRound();
              setCurrentPlayerIdx(0);
            }
          }}
          onLaugh={laugh}
          round={state.round}
          limit={state.roundLimit}
        />
      )}

      {state.phase === "results" && state.artwork && (
        <ResultsView
          artwork={state.artwork}
          responses={roundResponses}
          players={state.players}
          winnerId={state.winnerId}
          vizzyPickId={state.vizzyPickId}
          isFinal={state.round >= state.roundLimit}
          onAdvance={advance}
        />
      )}
    </Shell>
  );
};

/* -------------- shell -------------- */

const Shell: React.FC<{
  children: React.ReactNode;
  mood: ReturnType<typeof usePaletteWars>["state"]["mood"];
  navigate: ReturnType<typeof useNavigate>;
}> = ({ children, mood, navigate }) => (
  <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: mood?.bgGradient ?? "#020108" }} />
    <div className="relative max-w-7xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/palette-wars")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{mood?.name}</div>
      </div>
      {children}
    </div>
  </div>
);

/* -------------- per-phase views -------------- */

const OpeningView: React.FC<{ mood: NonNullable<ReturnType<typeof usePaletteWars>["state"]["mood"]> }> = ({ mood }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-10">
    <motion.h2
      animate={{ scale: [0.96, 1, 0.98], opacity: [0.7, 1, 0.85] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="font-serif text-3xl md:text-5xl bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent"
    >
      Tonight's exhibition: {mood.name}
    </motion.h2>
    <p className="text-white/60 mt-4 max-w-xl mx-auto">{mood.description}</p>
  </motion.div>
);

const GeneratingView: React.FC<{ mood: NonNullable<ReturnType<typeof usePaletteWars>["state"]["mood"]>; round: number; limit: number }> = ({ mood, round, limit }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-6">
    <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
      Round {round} / {limit}
    </div>
    <div className="relative w-44 h-44">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${mood.palette[0]}66, transparent 70%)` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-white/20 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={28} className="text-white/80" />
      </motion.div>
    </div>
    <p className="font-serif italic text-white/70">Vizzy is painting…</p>
  </div>
);

const ArtFrame: React.FC<{ artwork: Artwork; tall?: boolean }> = ({ artwork, tall }) => (
  <div className={`relative w-full ${tall ? "aspect-square md:aspect-video" : "aspect-video"} rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] bg-black`}>
    <motion.div
      key={artwork.id}
      initial={{ filter: "blur(40px)", opacity: 0, scale: 1.1 }}
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, ease: "easeOut" }}
      className="absolute inset-0"
      dangerouslySetInnerHTML={{ __html: artwork.svg }}
    />
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 6, repeat: Infinity }}
      style={{ background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)" }}
    />
    <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] text-white/50 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm">
      Untitled · live
    </div>
  </div>
);

const WritingView: React.FC<{
  artwork: Artwork;
  round: number;
  limit: number;
  deadline: number;
  now: number;
  activePlayer: ReturnType<typeof usePaletteWars>["state"]["players"][number] | undefined;
  submittedCount: number;
  totalPlayers: number;
  theme: ReturnType<typeof usePaletteWars>["state"]["activeTheme"];
  draft: string;
  setDraft: (v: string) => void;
  onSubmit: () => void;
  onSwap: () => void;
  swapDisabled: boolean;
  writerPrompt: string;
}> = ({ artwork, round, limit, deadline, now, activePlayer, submittedCount, totalPlayers, theme, draft, setDraft, onSubmit, onSwap, swapDisabled, writerPrompt }) => {
  const secondsLeft = Math.max(0, Math.ceil((deadline - now) / 1000));
  const progress = Math.max(0, Math.min(100, (secondsLeft / WRITING_SECONDS) * 100));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 relative">
        <ArtFrame artwork={artwork} />
        {theme && (
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 rounded-2xl border border-amber-300/40 bg-amber-500/10 backdrop-blur-md px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">
              ✦ Theme constraint
            </div>
            <div className="font-serif text-amber-50 text-lg">{theme.label}</div>
            <div className="text-xs text-amber-100/70 italic">{theme.detail}</div>
          </motion.div>
        )}
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Round {round} / {limit}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              {submittedCount} / {totalPlayers} written
            </div>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-serif tabular-nums text-white">
              {secondsLeft}s
            </div>
            {activePlayer && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: activePlayer.color }}>
                  {activePlayer.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="text-sm text-white/90">{activePlayer.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-rose-200 mb-2">
            Vizzy whispers
          </div>
          <p className="font-serif italic text-white/90">{writerPrompt}</p>
        </div>

        {activePlayer && (
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 280))}
              placeholder="Title it, narrate it, confess to it…"
              rows={4}
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-[10px] text-white/40 tabular-nums">{draft.length}/280</span>
              <div className="flex gap-2">
                <button
                  onClick={onSwap}
                  disabled={swapDisabled}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-100 text-xs disabled:opacity-30"
                  title="Swap the artwork (once per game)"
                >
                  <Zap size={12} /> Swap
                </button>
                <button
                  onClick={onSubmit}
                  disabled={!draft.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #ec4899, #fbbf24)", color: "white" }}
                >
                  Submit <Send size={12} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RevealView: React.FC<{
  artwork: Artwork;
  responses: Response[];
  idx: number;
  round: number;
  limit: number;
}> = ({ artwork, responses, idx, round, limit }) => {
  const current = responses[idx];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <ArtFrame artwork={artwork} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Round {round} / {limit} · reveal {idx + 1} / {responses.length || 0}
        </div>
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.9 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-rose-200 mb-3">
                Anonymous response
              </div>
              <p className="font-serif text-white text-xl leading-relaxed">{current.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const VotingView: React.FC<{
  artwork: Artwork;
  responses: Response[];
  players: ReturnType<typeof usePaletteWars>["state"]["players"];
  currentVoter: ReturnType<typeof usePaletteWars>["state"]["players"][number] | undefined;
  onVote: (id: string) => void;
  onLaugh: (id: string) => void;
  round: number;
  limit: number;
}> = ({ artwork, responses, currentVoter, onVote, onLaugh, round, limit }) => {
  const eligible = responses.filter((r) => r.playerId !== currentVoter?.id);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <ArtFrame artwork={artwork} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Round {round} / {limit} · {currentVoter?.name} voting
        </div>
        <p className="font-serif italic text-white/80">Vote for the response that moved you most.</p>
        <div className="space-y-3">
          {eligible.map((r) => (
            <motion.div
              key={r.id}
              whileHover={{ x: 4 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-4 flex items-center gap-3"
            >
              <button onClick={() => onVote(r.id)} className="flex-1 text-left">
                <p className="font-serif text-white text-base leading-relaxed">{r.text}</p>
              </button>
              <button
                onClick={() => onLaugh(r.id)}
                className="px-3 py-2 rounded-full bg-amber-500/15 border border-amber-300/30 text-amber-100 text-xs inline-flex items-center gap-1.5"
                title="Award a Joy Point"
              >
                <Smile size={14} />
              </button>
            </motion.div>
          ))}
          {eligible.length === 0 && (
            <p className="text-white/40 text-sm italic">Nothing else to vote on this round.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ResultsView: React.FC<{
  artwork: Artwork;
  responses: Response[];
  players: ReturnType<typeof usePaletteWars>["state"]["players"];
  winnerId: string | null;
  vizzyPickId: string | null;
  isFinal: boolean;
  onAdvance: () => void;
}> = ({ artwork, responses, players, winnerId, vizzyPickId, isFinal, onAdvance }) => {
  const max = Math.max(1, ...responses.map((r) => r.voteCount));
  const winnerResp = responses.find((r) => r.id === winnerId);
  const pickResp = responses.find((r) => r.id === vizzyPickId);
  const playerOf = (pid: string) => players.find((p) => p.id === pid);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <ArtFrame artwork={artwork} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Results</div>
        <div className="space-y-2">
          {[...responses]
            .sort((a, b) => b.voteCount - a.voteCount)
            .map((r) => {
              const player = playerOf(r.playerId);
              const isWinner = r.id === winnerId;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl border p-3 ${
                    isWinner ? "border-amber-300/50 bg-amber-500/10" : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: player?.color ?? "#fff" }}>
                      {player?.name?.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm text-white/90">{player?.name}</span>
                    {isWinner && <Trophy size={14} className="text-amber-200" />}
                    <span className="ml-auto text-xs text-white/60 tabular-nums">{r.voteCount} ★</span>
                  </div>
                  <p className="font-serif text-white text-sm leading-relaxed">{r.text}</p>
                  <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(r.voteCount / max) * 100}%` }}
                      transition={{ duration: 0.9 }}
                      className="h-full bg-gradient-to-r from-rose-300 to-amber-300"
                    />
                  </div>
                  {r.laughs.length > 0 && (
                    <div className="mt-1.5 text-[10px] text-amber-200 inline-flex items-center gap-1">
                      <Smile size={10} /> +{r.laughs.length} Joy
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>

        {winnerResp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="rounded-2xl border border-amber-300/40 bg-amber-500/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">
              Vizzy on the winner
            </div>
            <p className="font-serif italic text-amber-50">{vizzyWinnerLine()}</p>
          </motion.div>
        )}

        {pickResp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="rounded-2xl border border-violet-300/30 bg-violet-500/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-violet-200 mb-1 inline-flex items-center gap-1">
              <Award size={12} /> Vizzy's Pick
            </div>
            <p className="font-serif text-violet-50 leading-relaxed text-sm">
              "{pickResp.text}" - {playerOf(pickResp.playerId)?.name}
            </p>
            <p className="text-xs text-violet-200/70 italic mt-1">{vizzyPickLine()}</p>
          </motion.div>
        )}

        <button
          onClick={onAdvance}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm bg-white text-black"
        >
          {isFinal ? "See the leaderboard" : "Next round"}
        </button>
      </div>
    </div>
  );
};

export default PaletteWarsPlay;
