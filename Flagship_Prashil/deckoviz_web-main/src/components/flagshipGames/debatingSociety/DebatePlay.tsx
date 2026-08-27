"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, Zap, Scale, ChevronRight, Mic } from "lucide-react";
import { useDebate, scoreRhetoric, type Speech, type Heckle, type CrossExamExchange, type Side } from "./lib/debateState";
import { CROSS_EXAM_BANK, VIZZY_LINES } from "./lib/topics";

const DebatePlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useDebate();
  const [speakerIdx, setSpeakerIdx] = useState(0);
  const [activeSide, setActiveSide] = useState<Side>("for");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (state.players.length < 2) navigate("/flagship-games/debating-society");
  }, [state.players.length, navigate]);

  // intro -> opening
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => dispatch({ type: "GOTO", phase: "opening" }), 3200);
    return () => clearTimeout(t);
  }, [state.phase, dispatch]);

  // when entering a speech phase, pick the first speaker of "for" side
  useEffect(() => {
    if (state.phase === "opening" || state.phase === "rebuttal" || state.phase === "closing") {
      setActiveSide("for");
      setSpeakerIdx(0);
    }
  }, [state.phase]);

  const sidePlayers = useMemo(() => {
    return {
      for: state.players.filter((p) => p.side === "for"),
      against: state.players.filter((p) => p.side === "against"),
    };
  }, [state.players]);

  const speakerList = activeSide === "for" ? sidePlayers.for : sidePlayers.against;
  const currentSpeaker = speakerList[speakerIdx];

  const submitSpeech = () => {
    if (!currentSpeaker) return;
    const text = draft.trim();
    if (!text) return;
    const phase = state.phase as "opening" | "rebuttal" | "closing";
    const rhetoric = scoreRhetoric(text);
    const speech: Speech = {
      id: `sp-${Date.now()}`,
      playerId: currentSpeaker.id,
      side: currentSpeaker.side,
      phase,
      text,
      rhetoricScore: rhetoric,
      createdAt: Date.now(),
    };
    dispatch({ type: "SUBMIT_SPEECH", speech });
    // crowd reaction
    const delta = (rhetoric - 5) * 2;
    if (currentSpeaker.side === "for") {
      dispatch({ type: "TICK_CROWD", forDelta: delta, againstDelta: -delta * 0.5 });
    } else {
      dispatch({ type: "TICK_CROWD", forDelta: -delta * 0.5, againstDelta: delta });
    }
    setDraft("");

    // advance speaker
    if (speakerIdx + 1 < speakerList.length) {
      setSpeakerIdx((i) => i + 1);
    } else if (activeSide === "for" && sidePlayers.against.length > 0) {
      setActiveSide("against");
      setSpeakerIdx(0);
    } else {
      // phase complete
      const next = nextPhase(state.phase);
      dispatch({ type: "GOTO", phase: next });
    }
  };

  const submitHeckle = (text: string) => {
    if (!currentSpeaker) return;
    // The heckling player is whichever opposite-side player still has a token
    const opp = state.players.find((p) => p.side !== currentSpeaker.side && p.heckleToken);
    if (!opp) return;
    const hit = Math.random() > 0.45 || /\b(actually|specifically|imagine)\b/i.test(text);
    const heckle: Heckle = {
      id: `hk-${Date.now()}`,
      byPlayerId: opp.id,
      targetPhase: state.phase,
      text: text.slice(0, 140),
      rated: hit ? "hit" : "missed",
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_HECKLE", heckle, sideHit: currentSpeaker.side });
    dispatch({
      type: "AWARD_POINTS",
      playerId: opp.id,
      pts: hit ? 1 : -1,
    });
  };

  const beginCrossExam = useCallback(() => {
    const fp = sidePlayers.for[0];
    const ap = sidePlayers.against[0];
    if (!fp || !ap) {
      dispatch({ type: "GOTO", phase: "closing" });
      return;
    }
    const exchange: CrossExamExchange = {
      id: `cx-${Date.now()}`,
      forPlayerId: fp.id,
      againstPlayerId: ap.id,
      question: CROSS_EXAM_BANK[Math.floor(Math.random() * CROSS_EXAM_BANK.length)],
      forAnswer: "",
      againstAnswer: "",
      forRating: "pending",
      againstRating: "pending",
    };
    dispatch({ type: "BEGIN_CROSS_EXAM", exchange });
  }, [sidePlayers.for, sidePlayers.against, dispatch]);

  useEffect(() => {
    if (state.phase === "cross-exam" && !state.crossExam) beginCrossExam();
  }, [state.phase, state.crossExam, beginCrossExam]);

  const goToVoting = () => dispatch({ type: "GOTO", phase: "voting" });

  /* ---------- views ---------- */

  if (state.phase === "intro") {
    return (
      <Shell navigate={navigate}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-3">Tonight's resolution</div>
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">"{state.topic}"</h2>
          <SidesGrid sidePlayers={sidePlayers} />
        </motion.div>
      </Shell>
    );
  }

  if (state.phase === "opening" || state.phase === "rebuttal" || state.phase === "closing") {
    const phaseSeconds = state.phase === "opening" ? 60 : state.phase === "rebuttal" ? 45 : 45;
    return (
      <Shell navigate={navigate}>
        <PhaseHeader phaseLabel={phaseTitle(state.phase)} topic={state.topic} crowd={state.crowd} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-3">
            <SidesGrid sidePlayers={sidePlayers} active={currentSpeaker} />
            <SpeechFeed speeches={state.speeches.filter((s) => s.phase === state.phase)} state={state} />
          </div>
          <div className="lg:col-span-2 space-y-3">
            {currentSpeaker ? (
              <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: currentSpeaker.color }}>
                      {currentSpeaker.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{currentSpeaker.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-amber-200">{currentSpeaker.side.toUpperCase()}</div>
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{phaseSeconds}s</div>
                </div>
                {state.phase === "rebuttal" && (
                  <div className="text-[10px] text-amber-200 italic">
                    "{VIZZY_LINES.derailmentRebuttal[0]}" - Vizzy, if you wander off-topic.
                  </div>
                )}
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value.slice(0, 700))}
                  placeholder={state.phase === "opening" ? "Open with a claim that the room can't ignore…" : state.phase === "rebuttal" ? "Rebut. Don't introduce new arguments." : "Final strike. Make it memorable."}
                  rows={5}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={submitSpeech}
                    disabled={!draft.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
                  >
                    Deliver <Send size={12} />
                  </button>
                  {!currentSpeaker.pivotUsed && (
                    <button
                      onClick={() => dispatch({ type: "USE_PIVOT", playerId: currentSpeaker.id })}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-rose-500/15 border border-rose-300/30 text-rose-100 text-xs"
                      title="Switch sides mid-debate"
                    >
                      <Zap size={11} /> Pivot
                    </button>
                  )}
                  {!currentSpeaker.conscienceUsed && (
                    <button
                      onClick={() => dispatch({ type: "USE_CONSCIENCE", playerId: currentSpeaker.id })}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-500/15 border border-amber-300/30 text-amber-100 text-xs"
                      title="Invoke the Conscience Clause"
                    >
                      <Scale size={11} /> Conscience
                    </button>
                  )}
                </div>
                <HeckleStrip onSubmit={submitHeckle} state={state} currentSpeakerSide={currentSpeaker.side} />
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-sm text-white/60 italic">
                The chamber waits.
              </div>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  if (state.phase === "cross-exam" && state.crossExam) {
    return <CrossExamView />;
  }

  if (state.phase === "voting") {
    return <VotingView onAdvance={() => dispatch({ type: "GOTO", phase: "verdict" })} />;
  }

  if (state.phase === "verdict") {
    return <VerdictView navigate={navigate} />;
  }

  return null;
};

/* ---------- helpers ---------- */

function nextPhase(p: string): import("./lib/debateState").Phase {
  if (p === "opening") return "rebuttal";
  if (p === "rebuttal") return "cross-exam";
  if (p === "cross-exam") return "closing";
  if (p === "closing") return "voting";
  return "verdict";
}

function phaseTitle(p: string): string {
  if (p === "opening") return "Phase I · Opening Statements";
  if (p === "rebuttal") return "Phase II · Rebuttal";
  if (p === "cross-exam") return "Phase III · Cross-Examination";
  if (p === "closing") return "Phase IV · Closing Arguments";
  return p;
}

/* ---------- Shell + header + crowd ---------- */

const Shell: React.FC<{ children: React.ReactNode; navigate: ReturnType<typeof useNavigate> }> = ({ children, navigate }) => (
  <div className="min-h-screen bg-[#040206] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #06040a, #1c1410 60%, #06040a)" }} />
    {/* velvet spotlight */}
    <motion.div
      className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
      style={{ background: "rgba(180, 83, 9, 0.15)" }}
      animate={{ opacity: [0.18, 0.32, 0.18] }}
      transition={{ duration: 9, repeat: Infinity }}
    />
    <div className="relative max-w-7xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/debating-society")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
      </div>
      {children}
    </div>
  </div>
);

const PhaseHeader: React.FC<{ phaseLabel: string; topic: string; crowd: { forScore: number; againstScore: number } }> = ({
  phaseLabel,
  topic,
  crowd,
}) => (
  <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">{phaseLabel}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Crowd reaction</div>
    </div>
    <div className="font-serif text-white text-lg md:text-2xl leading-snug">"{topic}"</div>
    <div className="mt-3 flex items-center gap-3">
      <div className="text-[10px] text-emerald-200 w-12">FOR {Math.round(crowd.forScore)}</div>
      <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-300 to-emerald-500"
          animate={{ width: `${crowd.forScore}%` }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-rose-300 to-rose-500"
          animate={{ width: `${crowd.againstScore}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-[10px] text-rose-200 w-16 text-right">AGAINST {Math.round(crowd.againstScore)}</div>
    </div>
  </div>
);

const SidesGrid: React.FC<{ sidePlayers: { for: any[]; against: any[] }; active?: any }> = ({ sidePlayers, active }) => (
  <div className="grid grid-cols-2 gap-3">
    {(["for", "against"] as Side[]).map((side) => (
      <div key={side} className={`rounded-2xl border ${side === "for" ? "border-emerald-300/30 bg-emerald-500/5" : "border-rose-300/30 bg-rose-500/5"} p-3`}>
        <div className={`text-[10px] uppercase tracking-[0.3em] ${side === "for" ? "text-emerald-200" : "text-rose-200"} mb-2`}>
          {side === "for" ? "FOR · proposition" : "AGAINST · opposition"}
        </div>
        <div className="flex flex-wrap gap-2">
          {sidePlayers[side].map((p) => (
            <div
              key={p.id}
              className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs ${active?.id === p.id ? "bg-white text-black" : "bg-white/[0.04] border border-white/10 text-white/80"}`}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: p.color }}>
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SpeechFeed: React.FC<{ speeches: Speech[]; state: ReturnType<typeof useDebate>["state"] }> = ({ speeches, state }) => (
  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-3 max-h-64 overflow-y-auto space-y-2">
    {speeches.length === 0 && <p className="text-white/40 text-xs italic">The chamber is quiet, briefly.</p>}
    {speeches.map((s) => {
      const player = state.players.find((p) => p.id === s.playerId);
      return (
        <div key={s.id} className={`rounded-xl border p-2.5 ${s.side === "for" ? "border-emerald-300/20 bg-emerald-500/5" : "border-rose-300/20 bg-rose-500/5"}`}>
          <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-[0.2em]">
            {player && (
              <>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: player.color }} />
                <span className="text-white/70">{player.name}</span>
              </>
            )}
            <span className={s.side === "for" ? "text-emerald-200" : "text-rose-200"}>{s.side}</span>
            <span className="ml-auto text-white/40">rhetoric {s.rhetoricScore}/10</span>
          </div>
          <p className="font-serif text-white/85 text-sm leading-relaxed">"{s.text}"</p>
        </div>
      );
    })}
  </div>
);

const HeckleStrip: React.FC<{ onSubmit: (text: string) => void; state: ReturnType<typeof useDebate>["state"]; currentSpeakerSide: Side }> = ({
  onSubmit,
  state,
  currentSpeakerSide,
}) => {
  const eligible = state.players.find((p) => p.side !== currentSpeakerSide && p.heckleToken);
  const [text, setText] = useState("");
  if (!eligible) return null;
  return (
    <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-3">
      <div className="text-[10px] uppercase tracking-[0.25em] text-amber-200 mb-1.5 inline-flex items-center gap-1">
        ✦ Heckle available · {eligible.name}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 140))}
          placeholder="One sentence. Make it count."
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5 text-xs placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            onSubmit(text);
            setText("");
          }}
          disabled={!text.trim()}
          className="px-3 py-1.5 rounded-full bg-amber-300 text-black text-xs font-semibold disabled:opacity-40"
        >
          Heckle
        </button>
      </div>
    </div>
  );
};

/* ---------- Cross-exam ---------- */

const CrossExamView: React.FC = () => {
  const { state, dispatch } = useDebate();
  const navigate = useNavigate();
  const ex = state.crossExam!;
  const [forAnswer, setForAnswer] = useState("");
  const [againstAnswer, setAgainstAnswer] = useState("");
  const fp = state.players.find((p) => p.id === ex.forPlayerId)!;
  const ap = state.players.find((p) => p.id === ex.againstPlayerId)!;

  const submit = (side: "for" | "against") => {
    const text = side === "for" ? forAnswer : againstAnswer;
    if (!text.trim()) return;
    const rating = scoreRhetoric(text) >= 6 ? "strong" : "weak";
    dispatch({ type: "ANSWER_CROSS_EXAM", playerId: side === "for" ? fp.id : ap.id, answer: text, rating });
    if (side === "for") setForAnswer("");
    else setAgainstAnswer("");
  };

  const done = ex.forRating !== "pending" && ex.againstRating !== "pending";

  return (
    <Shell navigate={navigate}>
      <PhaseHeader phaseLabel="Phase III · Cross-Examination" topic={state.topic} crowd={state.crowd} />
      <div className="mt-6 rounded-3xl border border-amber-300/30 bg-amber-500/10 p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Vizzy asks</div>
        <p className="font-serif italic text-amber-50 text-lg">"{ex.question}"</p>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExamPanel side="for" player={fp} value={forAnswer} setValue={setForAnswer} onSubmit={() => submit("for")} answered={ex.forRating !== "pending"} rating={ex.forRating} answer={ex.forAnswer} />
        <ExamPanel side="against" player={ap} value={againstAnswer} setValue={setAgainstAnswer} onSubmit={() => submit("against")} answered={ex.againstRating !== "pending"} rating={ex.againstRating} answer={ex.againstAnswer} />
      </div>
      {done && (
        <button
          onClick={() => dispatch({ type: "GOTO", phase: "closing" })}
          className="mt-6 w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm"
        >
          To closing arguments <ChevronRight size={14} className="inline ml-1" />
        </button>
      )}
    </Shell>
  );
};

const ExamPanel: React.FC<{
  side: Side;
  player: any;
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  answered: boolean;
  rating: string;
  answer: string;
}> = ({ side, player, value, setValue, onSubmit, answered, rating, answer }) => (
  <div className={`rounded-2xl border p-4 ${side === "for" ? "border-emerald-300/30 bg-emerald-500/5" : "border-rose-300/30 bg-rose-500/5"}`}>
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: player.color }}>
        {player.name.slice(0, 1).toUpperCase()}
      </div>
      <div>
        <div className="text-sm font-semibold">{player.name}</div>
        <div className={`text-[10px] uppercase tracking-[0.25em] ${side === "for" ? "text-emerald-200" : "text-rose-200"}`}>{side}</div>
      </div>
    </div>
    {!answered ? (
      <>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, 320))}
          rows={3}
          placeholder="30 seconds. Direct answer please."
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
        />
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className="mt-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold disabled:opacity-40"
        >
          Answer
        </button>
      </>
    ) : (
      <>
        <p className="font-serif italic text-white/85 text-sm leading-relaxed">"{answer}"</p>
        <div className={`mt-2 text-[10px] uppercase tracking-[0.25em] ${rating === "strong" ? "text-emerald-200" : "text-rose-200"}`}>
          Vizzy rates: {rating} {rating === "strong" && "· +1"}
        </div>
      </>
    )}
  </div>
);

/* ---------- Voting ---------- */

const VotingView: React.FC<{ onAdvance: () => void }> = ({ onAdvance }) => {
  const { state, dispatch } = useDebate();
  const navigate = useNavigate();
  const [voterIdx, setVoterIdx] = useState(0);
  const voter = state.players[voterIdx];

  const cast = (targetId: string) => {
    if (!voter) return;
    dispatch({ type: "CAST_VOTE", voterId: voter.id, targetPlayerId: targetId });
    if (voterIdx < state.players.length - 1) setVoterIdx((i) => i + 1);
    else {
      // tally and award
      setTimeout(() => {
        const tally: Record<string, number> = {};
        Object.entries(state.voteByPlayerId).forEach(([, t]) => {
          tally[t] = (tally[t] ?? 0) + 1;
        });
        tally[targetId] = (tally[targetId] ?? 0) + 1; // include this last vote
        const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
        if (sorted[0]) dispatch({ type: "AWARD_POINTS", playerId: sorted[0][0], pts: 3 });
        // crowd majority: side with more votes wins +1 to each speaker on that side
        const sideTotals = { for: 0, against: 0 };
        Object.entries(tally).forEach(([pid, votes]) => {
          const p = state.players.find((pp) => pp.id === pid);
          if (p) sideTotals[p.side] += votes;
        });
        const dominantSide: Side = sideTotals.for >= sideTotals.against ? "for" : "against";
        state.players.filter((p) => p.side === dominantSide).forEach((p) => {
          dispatch({ type: "AWARD_POINTS", playerId: p.id, pts: 1 });
        });
        // Vizzy commendation: highest rhetoric across all speeches
        const allSpeeches = state.speeches;
        if (allSpeeches.length > 0) {
          const best = [...allSpeeches].sort((a, b) => b.rhetoricScore - a.rhetoricScore)[0];
          dispatch({ type: "AWARD_POINTS", playerId: best.playerId, pts: 2, commendation: true });
        }
        onAdvance();
      }, 0);
    }
  };

  if (!voter) return null;

  return (
    <Shell navigate={navigate}>
      <div className="text-center mb-4">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">Audience vote</div>
        <h2 className="font-serif text-3xl text-white">{voter.name}, who argued best?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {state.players
          .filter((p) => p.id !== voter.id)
          .map((p) => (
            <button
              key={p.id}
              onClick={() => cast(p.id)}
              className="text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: p.color }}>
                  {p.name.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">{p.side}</div>
                </div>
              </div>
            </button>
          ))}
      </div>
    </Shell>
  );
};

/* ---------- Verdict ---------- */

const VerdictView: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => {
  const { state, dispatch } = useDebate();
  const [verdict, setVerdict] = useState<string | null>(null);

  useEffect(() => {
    if (state.verdict) {
      setVerdict(state.verdict);
      return;
    }
    const opener = VIZZY_LINES.verdictOpeners[Math.floor(Math.random() * VIZZY_LINES.verdictOpeners.length)];
    const corpus = state.speeches.map((s) => s.text).join(" ").toLowerCase();
    let theme = "the room was, briefly, willing to be persuaded.";
    if (/love|loss|memory/.test(corpus)) theme = "we are still negotiating what we mean by 'remembering'.";
    if (/work|build|labor/.test(corpus)) theme = "we kept circling back to who is allowed to make things.";
    if (/fear|danger|threat/.test(corpus)) theme = "the room is more frightened than it pretends to be.";
    const text = `${opener} ${theme} And whoever wins, the question is not done with you yet.`;
    setVerdict(text);
    dispatch({ type: "SET_VERDICT", verdict: text, commendationPlayerId: null });
  }, [state.verdict, state.speeches, dispatch]);

  return (
    <Shell navigate={navigate}>
      <div className="text-center py-10">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-3">Vizzy's verdict</div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="font-serif text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed italic"
        >
          "{verdict}"
        </motion.h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 max-w-3xl mx-auto">
        <h3 className="font-serif text-lg text-white mb-3">Tally</h3>
        <ul className="space-y-1.5">
          {[...state.players]
            .sort((a, b) => b.points - a.points)
            .map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 text-sm">
                <span className="text-white/40 w-5 tabular-nums">{i + 1}</span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: p.color }}>
                  {p.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="flex-1 text-white">{p.name}</span>
                <span className="text-xs text-white/40">{p.side}</span>
                {p.commendations > 0 && <span className="text-amber-200 text-xs">✦ commendation</span>}
                {p.perfectFlip && <span className="text-rose-200 text-xs">⇄ perfect flip</span>}
                <span className="ml-auto text-white tabular-nums font-semibold">{p.points}</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/flagship-games/debating-society");
          }}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm inline-flex items-center gap-2"
        >
          <Mic size={14} /> Another resolution
        </button>
      </div>
    </Shell>
  );
};

export default DebatePlay;
