"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Eye, Send, Star } from "lucide-react";
import { useFrame, type Submission, type DetailHuntEntry } from "./lib/frameState";
import { pickFormat, pickScene, type SceneRecord } from "./lib/scenes";
import { popularWinner, pickVizzysPick, vizzyCommentary, vizzyOwnSentence } from "./lib/commentary";

const OBSERVATION_SECONDS = 30;
const WRITING_SECONDS = 120;

const FramePlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useFrame();
  const [now, setNow] = useState(Date.now());
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!state.style || state.players.length === 0) {
      navigate("/flagship-games/world-in-frame");
    }
  }, [state.style, state.players.length, navigate]);

  // intro -> first observation
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => beginNextRound(), 3500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  // tick
  useEffect(() => {
    if (state.phase !== "observation" && state.phase !== "writing") return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [state.phase]);

  // observation timeout -> writing
  useEffect(() => {
    if (state.phase !== "observation" || !state.observationDeadline) return;
    if (now >= state.observationDeadline) {
      const format = pickFormat(state.round - 1);
      const deadline = Date.now() + WRITING_SECONDS * 1000;
      dispatch({ type: "BEGIN_WRITING", format, deadline });
      setActiveIdx(0);
      setDraft("");
    }
  }, [now, state.phase, state.observationDeadline, state.round, dispatch]);

  // writing timeout -> reading
  useEffect(() => {
    if (state.phase !== "writing" || !state.writingDeadline) return;
    const submitted = state.submissions.filter((s) => s.round === state.round).length;
    if (submitted >= state.players.length || now >= state.writingDeadline) {
      dispatch({ type: "BEGIN_READING" });
    }
  }, [now, state.phase, state.writingDeadline, state.submissions, state.round, state.players.length, dispatch]);

  // reading pacing
  const roundSubs = useMemo(
    () => state.submissions.filter((s) => s.round === state.round),
    [state.submissions, state.round],
  );
  useEffect(() => {
    if (state.phase !== "reading") return;
    if (state.readingIdx >= roundSubs.length) {
      const t = setTimeout(() => dispatch({ type: "BEGIN_VOTING" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => dispatch({ type: "BUMP_READING" }), 5500);
    return () => clearTimeout(t);
  }, [state.phase, state.readingIdx, roundSubs.length, dispatch]);

  const beginNextRound = useCallback(() => {
    if (!state.style) return;
    // Detail Hunt: trigger once around round 3 (before observation)
    if (!state.detailHuntUsed && state.round === 2) {
      dispatch({ type: "BEGIN_DETAIL_HUNT" });
      return;
    }
    const usedIds = state.rounds.map((r) => r.scene.id);
    const scene = pickScene(state.style.id, usedIds);
    const deadline = Date.now() + OBSERVATION_SECONDS * 1000;
    dispatch({ type: "BEGIN_OBSERVATION", scene, deadline });
  }, [state.style, state.rounds, state.detailHuntUsed, state.round, dispatch]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    const player = state.players[activeIdx];
    if (!player) return;
    // enforce one-sentence (no internal full stop except at end)
    const stripped = text.replace(/[.!?]$/, "");
    if (/[.!?]/.test(stripped)) {
      // too many sentences - we'll still accept but trim to first sentence
      const firstSentence = stripped.split(/[.!?]/)[0].trim() + ".";
      finalizeSubmission(player.id, firstSentence);
      return;
    }
    finalizeSubmission(player.id, text);
  };

  const finalizeSubmission = (playerId: string, text: string) => {
    const submission: Submission = {
      id: `wf-${state.round}-${playerId}-${Date.now()}`,
      playerId,
      round: state.round,
      text: text.slice(0, 280),
      voteCount: 0,
    };
    dispatch({ type: "SUBMIT", submission });
    setDraft("");
    if (activeIdx < state.players.length - 1) {
      setActiveIdx((i) => i + 1);
    }
  };

  const castVote = (id: string) => {
    dispatch({ type: "CAST_VOTE", submissionId: id });
    if (state.votingIdx < state.players.length - 1) {
      dispatch({ type: "BUMP_VOTER" });
    } else {
      // finalize
      setTimeout(() => {
        const latestSubs = state.submissions
          .filter((s) => s.round === state.round)
          .map((s) => (s.id === id ? { ...s, voteCount: s.voteCount + 1 } : s));
        const winner = popularWinner(latestSubs);
        const vizzy = pickVizzysPick(latestSubs, winner);
        dispatch({
          type: "FINALIZE_ROUND",
          winnerId: winner,
          vizzyPickId: vizzy,
          vizzySentence: vizzyOwnSentence(),
        });
      }, 0);
    }
  };

  if (!state.style) return null;
  const style = state.style;

  /* === INTRO === */
  if (state.phase === "intro") {
    return (
      <Shell style={style} navigate={navigate}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center py-20">
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">
            "We are going to look first. Then write."
          </h2>
          <p className="text-white/40 italic text-xs mt-6">Vizzy, quietly, from the next room.</p>
        </motion.div>
      </Shell>
    );
  }

  /* === OBSERVATION === */
  if (state.phase === "observation" && state.scene) {
    const secondsLeft = Math.max(0, Math.ceil(((state.observationDeadline ?? now) - now) / 1000));
    return (
      <Shell style={style} navigate={navigate}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Round {state.round} / {state.roundLimit} · observation
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 inline-flex items-center gap-1">
              <Eye size={11} /> {secondsLeft}s of silence
            </div>
          </div>
          <SceneFrame scene={state.scene} />
        </div>
      </Shell>
    );
  }

  /* === WRITING === */
  if (state.phase === "writing" && state.scene && state.format) {
    const submitted = state.submissions.filter((s) => s.round === state.round).length;
    const player = state.players[activeIdx];
    const secondsLeft = Math.max(0, Math.ceil(((state.writingDeadline ?? now) - now) / 1000));
    const allSubmitted = submitted >= state.players.length;

    return (
      <Shell style={style} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SceneFrame scene={state.scene} dimmed />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">{state.format.label}</div>
              <p className="font-serif text-white text-base leading-snug">"{state.format.prompt}"</p>
              <div className="text-[10px] text-white/40 mt-2">{secondsLeft}s · {submitted}/{state.players.length} written</div>
            </div>
            {!allSubmitted && player && (
              <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: player.color }}>
                    {player.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-sm">{player.name}</span>
                </div>
                <textarea
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, 280))}
                  placeholder="One sentence."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/40 tabular-nums">{draft.length}/280 · {draft.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <button
                    onClick={submit}
                    disabled={!draft.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #cbd5e1, #fbbf24)", color: "black" }}
                  >
                    Place it <Send size={12} />
                  </button>
                </div>
              </div>
            )}
            {allSubmitted && (
              <div className="text-sm text-white/60 italic">Waiting for the room…</div>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  /* === READING === */
  if (state.phase === "reading" && state.scene) {
    const current = roundSubs[state.readingIdx];
    return (
      <Shell style={style} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SceneFrame scene={state.scene} dimmed />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Round {state.round} · reading {Math.min(state.readingIdx + 1, roundSubs.length)} / {roundSubs.length}
            </div>
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 1.1 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6"
                >
                  <p className="font-serif text-white text-xl md:text-2xl leading-relaxed">"{current.text}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Shell>
    );
  }

  /* === VOTING === */
  if (state.phase === "voting" && state.scene) {
    const voter = state.players[state.votingIdx];
    const eligible = roundSubs.filter((s) => s.playerId !== voter?.id);
    if (!voter) return null;
    return (
      <Shell style={style} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SceneFrame scene={state.scene} dimmed />
          </div>
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{voter.name}, pick the most resonant.</div>
            <div className="space-y-2">
              {eligible.map((s) => (
                <motion.button
                  key={s.id}
                  whileHover={{ x: 4 }}
                  onClick={() => castVote(s.id)}
                  className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-4 transition-colors"
                >
                  <p className="font-serif text-white text-base leading-relaxed">"{s.text}"</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  /* === COMMENTARY === */
  if (state.phase === "commentary" && state.scene) {
    return <CommentaryView onAdvance={() => {
      if (state.round >= state.roundLimit) {
        dispatch({ type: "BEGIN_RETURN" });
      } else {
        beginNextRound();
      }
    }} navigate={navigate} />;
  }

  /* === DETAIL HUNT === */
  if (state.phase === "detail-hunt" && state.scene) {
    return <DetailHuntView onResume={() => {
      const usedIds = state.rounds.map((r) => r.scene.id);
      const scene = pickScene(state.style!.id, usedIds);
      const deadline = Date.now() + OBSERVATION_SECONDS * 1000;
      dispatch({ type: "BEGIN_OBSERVATION", scene, deadline });
    }} navigate={navigate} />;
  }

  /* === THE RETURN === */
  if (state.phase === "the-return") {
    return <TheReturnView onFinish={() => navigate("/flagship-games/world-in-frame/leaderboard")} navigate={navigate} />;
  }

  return null;
};

/* ===== Shell ===== */

const Shell: React.FC<{ children: React.ReactNode; style: ReturnType<typeof useFrame>["state"]["style"]; navigate: ReturnType<typeof useNavigate> }> = ({ children, style, navigate }) => (
  <div className="min-h-screen bg-[#040506] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: style?.bgGradient ?? "#040506" }} />
    {/* dust */}
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 1.5 + Math.random() * 2,
            height: 1.5 + Math.random() * 2,
            background: "rgba(254, 243, 199, 0.35)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 10 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
    <div className="relative max-w-7xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/world-in-frame")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{style?.name}</div>
      </div>
      {children}
    </div>
  </div>
);

const SceneFrame: React.FC<{ scene: SceneRecord; dimmed?: boolean }> = ({ scene, dimmed }) => (
  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-[6px] border-stone-200/15 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
    <motion.div
      key={scene.id}
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: dimmed ? 0.45 : 1 }}
      transition={{ duration: 3 }}
      className="absolute inset-0"
      style={{ background: scene.background }}
    />
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
    <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/80">
      <span className="font-serif italic">{scene.description}</span>
    </div>
  </div>
);

/* ===== Commentary ===== */

const CommentaryView: React.FC<{ onAdvance: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onAdvance, navigate }) => {
  const { state } = useFrame();
  const style = state.style!;
  const roundSubs = state.submissions.filter((s) => s.round === state.round);
  const max = Math.max(1, ...roundSubs.map((s) => s.voteCount));
  const record = state.rounds[state.rounds.length - 1];
  const winner = roundSubs.find((s) => s.id === record?.winnerId) ?? null;
  const pick = roundSubs.find((s) => s.id === record?.vizzyPickId) ?? null;
  const vizzySentence = state.vizzySentences[state.vizzySentences.length - 1];

  return (
    <Shell style={style} navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {state.scene && <SceneFrame scene={state.scene} />}
        </div>
        <div className="lg:col-span-2 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Round {state.round} · results</div>
          {roundSubs.map((s) => {
            const player = state.players.find((p) => p.id === s.playerId);
            const isWinner = s.id === record?.winnerId;
            const isPick = s.id === record?.vizzyPickId;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-2xl border p-3 ${isWinner ? "border-amber-300/40 bg-amber-500/10" : isPick ? "border-violet-300/40 bg-violet-500/10" : "border-white/10 bg-white/[0.04]"}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-[0.25em]">
                  {player && (
                    <span className="text-white/60 inline-flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full" style={{ background: player.color }} /> {player.name}
                    </span>
                  )}
                  {isWinner && <span className="text-amber-200">Most votes</span>}
                  {isPick && !isWinner && <span className="text-violet-200">Vizzy's Pick</span>}
                  <span className="ml-auto text-white/60 tabular-nums">{s.voteCount} ★</span>
                </div>
                <p className="font-serif text-white text-sm leading-relaxed">"{s.text}"</p>
                <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.voteCount / max) * 100}%` }}
                    transition={{ duration: 0.9 }}
                    className="h-full bg-gradient-to-r from-amber-200 to-amber-300"
                  />
                </div>
              </motion.div>
            );
          })}
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Vizzy on the room</div>
            <p className="font-serif italic text-white/90 text-sm leading-relaxed">"{vizzyCommentary(winner)}"</p>
          </div>
          {vizzySentence && (
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Vizzy wrote, privately</div>
              <p className="font-serif italic text-white/80 text-sm">"{vizzySentence.text}"</p>
            </div>
          )}
          <button onClick={onAdvance} className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm">
            {state.round >= state.roundLimit ? "Begin The Return" : "Next scene"}
          </button>
        </div>
      </div>
    </Shell>
  );
};

/* ===== Detail Hunt ===== */

const DetailHuntView: React.FC<{ onResume: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onResume, navigate }) => {
  const { state, dispatch } = useFrame();
  const style = state.style!;
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const [voting, setVoting] = useState(false);
  const [voterIdx, setVoterIdx] = useState(0);

  // Use last shown scene
  const scene = state.scene ?? state.rounds[state.rounds.length - 1]?.scene ?? null;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    const player = state.players[activeIdx];
    if (!player) return;
    const entry: DetailHuntEntry = {
      id: `dh-${player.id}-${Date.now()}`,
      playerId: player.id,
      text: text.slice(0, 140),
      voteCount: 0,
    };
    dispatch({ type: "DETAIL_SUBMIT", entry });
    setDraft("");
    if (activeIdx < state.players.length - 1) setActiveIdx((i) => i + 1);
    else setVoting(true);
  };

  const vote = (entryId: string) => {
    dispatch({ type: "DETAIL_VOTE", entryId });
    if (voterIdx < state.players.length - 1) setVoterIdx((i) => i + 1);
    else {
      // determine winner
      setTimeout(() => {
        const sorted = [...state.detailHuntEntries].sort((a, b) => b.voteCount - a.voteCount);
        // include the just-cast vote
        const ranked = sorted.map((e) => (e.id === entryId ? { ...e, voteCount: e.voteCount + 1 } : e));
        ranked.sort((a, b) => b.voteCount - a.voteCount);
        dispatch({ type: "END_DETAIL_HUNT", winnerId: ranked[0]?.playerId ?? null });
        onResume();
      }, 0);
    }
  };

  return (
    <Shell style={style} navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          {scene && <SceneFrame scene={scene} />}
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Detail Hunt</div>
            <p className="text-sm text-white/80 italic">"One detail nobody else would notice."</p>
          </div>

          {!voting ? (
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
              <div className="text-xs text-white/60">
                {state.players[activeIdx]?.name}'s turn - {activeIdx + 1} / {state.players.length}
              </div>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 140))}
                placeholder="A small thing you saw."
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              />
              <button
                onClick={submit}
                disabled={!draft.trim()}
                className="w-full px-4 py-2 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-40"
              >
                Submit detail
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-2">
              <div className="text-xs text-white/60">
                {state.players[voterIdx]?.name}, vote for the most perceptive.
              </div>
              {state.detailHuntEntries.map((e) => (
                <button
                  key={e.id}
                  onClick={() => vote(e.id)}
                  className="w-full text-left rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-2.5"
                >
                  <p className="font-serif text-white text-sm">"{e.text}"</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
};

/* ===== The Return ===== */

const TheReturnView: React.FC<{ onFinish: () => void; navigate: ReturnType<typeof useNavigate> }> = ({ onFinish, navigate }) => {
  const { state, dispatch } = useFrame();
  const style = state.style!;
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");

  // Pick a memorable earlier scene (first one)
  const returnedScene = state.rounds[0]?.scene ?? state.scene;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    const player = state.players[activeIdx];
    if (!player) return;
    const submission: Submission = {
      id: `wf-return-${player.id}-${Date.now()}`,
      playerId: player.id,
      round: 999,
      text: text.slice(0, 280),
      voteCount: 0,
    };
    dispatch({ type: "RETURN_SUBMIT", submission });
    setDraft("");
    if (activeIdx < state.players.length - 1) setActiveIdx((i) => i + 1);
    else onFinish();
  };

  if (!returnedScene) return null;

  return (
    <Shell style={style} navigate={navigate}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <SceneFrame scene={returnedScene} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">The Return</div>
            <p className="text-sm text-white/80 italic">
              "You've seen each other now. One final sentence - no format. The pieces will be saved together."
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
            <div className="text-xs text-white/60">
              {state.players[activeIdx]?.name}'s turn - {activeIdx + 1} / {state.players.length}
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 280))}
              rows={3}
              placeholder="The closing sentence you almost didn't write."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
            <button
              onClick={submit}
              disabled={!draft.trim()}
              className="w-full px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold disabled:opacity-40"
            >
              Place it
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default FramePlay;
