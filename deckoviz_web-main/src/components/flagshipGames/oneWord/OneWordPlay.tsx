"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Send, ArrowDownToLine, RotateCcw, Trophy, Star } from "lucide-react";
import { useOneWord, type SentenceRecord, type Word } from "./lib/oneWordState";
import { illustrateSentence, narrate, pickVizzyInterruptWord, rateCloser } from "./lib/narration";
import { rollMoodPerSentence } from "./lib/sessionMoods";

const MAX_WORDS = 20;

const OneWordPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useOneWord();
  const [draft, setDraft] = useState("");
  const [now, setNow] = useState(Date.now());
  const interruptLockRef = useRef(false);

  useEffect(() => {
    if (!state.mood || state.players.length < 2) {
      navigate("/flagship-games/one-word");
    }
  }, [state.mood, state.players.length, navigate]);

  // intro -> writing
  useEffect(() => {
    if (state.phase !== "intro") return;
    const t = setTimeout(() => dispatch({ type: "BEGIN_FIRST_SENTENCE" }), 2400);
    return () => clearTimeout(t);
  }, [state.phase, dispatch]);

  // tick
  useEffect(() => {
    if (state.phase !== "writing" && state.phase !== "speed-round") return;
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, [state.phase]);

  // timeout handling
  useEffect(() => {
    if (state.phase !== "writing" && state.phase !== "speed-round") return;
    if (!state.turnStartedAt) return;
    const elapsed = (now - state.turnStartedAt) / 1000;
    if (elapsed >= state.turnSeconds) {
      // pass turn
      dispatch({ type: "BUMP_TURN" });
      setDraft("");
    }
  }, [now, state.turnStartedAt, state.turnSeconds, state.phase, dispatch]);

  // random vizzy interrupt mid-sentence (one per session, never on first 2 words)
  useEffect(() => {
    if (state.phase !== "writing") return;
    if (state.vizzyInterruptUsed) return;
    if (state.currentWords.length < 4 || state.currentWords.length > 12) return;
    if (interruptLockRef.current) return;
    if (Math.random() > 0.93) {
      interruptLockRef.current = true;
      const w: Word = {
        id: `vizzy-${Date.now()}`,
        text: pickVizzyInterruptWord(),
        authorId: "vizzy",
        submittedAt: Date.now(),
      };
      dispatch({ type: "VIZZY_INTERRUPT", word: w });
      setTimeout(() => {
        dispatch({ type: "BUMP_TURN" });
        interruptLockRef.current = false;
      }, 800);
    }
  }, [state.currentWords.length, state.vizzyInterruptUsed, state.phase, dispatch]);

  // current sentence text helper
  const currentText = useMemo(() => buildSentenceText(state.currentWords), [state.currentWords]);

  const submitWord = useCallback(
    (raw: string) => {
      const cleaned = raw.trim().replace(/\s+/g, " ");
      if (!cleaned || state.players.length === 0) return;
      const player = state.players[state.currentTurnIdx];
      if (!player) return;

      // detect sentence end (period)
      const endsSentence = /[.!?]$/.test(cleaned);
      const word = cleaned.replace(/[.,;:!?]+$/, "");
      const tokens = word.split(/\s+/);
      if (tokens.length > 1) return; // single word only

      const submission: Word = {
        id: `w-${Date.now()}`,
        text: word,
        authorId: player.id,
        submittedAt: Date.now(),
      };

      dispatch({ type: "SUBMIT_WORD", word: submission });
      setDraft("");

      const newWords = [...state.currentWords, submission];
      const reachedMax = newWords.length >= MAX_WORDS;
      const shouldEnd = endsSentence || reachedMax;

      if (shouldEnd) {
        const text = buildSentenceText(newWords);
        const moodForSentence = state.mood ? rollMoodPerSentence(state.mood, state.sentenceIdx - 1) : null;
        const closerStars = rateCloser(text, newWords);
        const record: SentenceRecord = {
          id: `s-${state.sentenceIdx}-${Date.now()}`,
          index: state.sentenceIdx,
          words: newWords,
          text,
          endedById: player.id,
          closerStars,
          pivotWordId: null,
          pivotPlayerId: null,
          narration: moodForSentence ? narrate(text, moodForSentence) : text,
          illustration: moodForSentence ? illustrateSentence(moodForSentence, text) : { background: "#000", overlay: "" },
          moodId: moodForSentence?.id ?? state.mood?.id ?? "absurdist",
          abandoned: false,
        };
        dispatch({ type: "END_SENTENCE", record });
      } else {
        dispatch({ type: "BUMP_TURN" });
      }
    },
    [state.players, state.currentTurnIdx, state.currentWords, state.sentenceIdx, state.mood, dispatch],
  );

  const redirect = () => {
    const player = state.players[state.currentTurnIdx];
    if (!player || player.redirectUsed) return;
    const text = buildSentenceText(state.currentWords) + "-";
    const moodForSentence = state.mood ? rollMoodPerSentence(state.mood, state.sentenceIdx - 1) : null;
    const record: SentenceRecord = {
      id: `s-${state.sentenceIdx}-${Date.now()}-redir`,
      index: state.sentenceIdx,
      words: state.currentWords,
      text,
      endedById: "vizzy",
      closerStars: 0,
      pivotWordId: null,
      pivotPlayerId: null,
      narration: `[redirected] ${text}`,
      illustration: moodForSentence ? illustrateSentence(moodForSentence, text) : { background: "#000", overlay: "" },
      moodId: moodForSentence?.id ?? state.mood?.id ?? "absurdist",
      abandoned: true,
    };
    dispatch({ type: "REDIRECT", redirectingPlayerId: player.id, partialRecord: record });
  };

  if (!state.mood) return null;
  const mood = state.mood;

  return (
    <Shell mood={mood} navigate={navigate}>
      {state.phase === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">
            "Welcome to the writers' room. There are no notes. There is barely a writer."
          </h2>
          <p className="text-white/50 italic mt-4">Vizzy, dramatic, possibly drunk on coffee.</p>
        </motion.div>
      )}

      {(state.phase === "writing" || state.phase === "speed-round") && (
        <WritingView
          currentText={currentText}
          draft={draft}
          setDraft={setDraft}
          onSubmit={submitWord}
          onRedirect={redirect}
          secondsLeft={Math.max(0, state.turnSeconds - Math.floor((now - (state.turnStartedAt ?? now)) / 1000))}
          speedRound={state.phase === "speed-round"}
        />
      )}

      {state.phase === "sentence-complete" && (
        <SentenceCompleteView
          onNext={() => dispatch({ type: "BEGIN_NEXT_SENTENCE" })}
        />
      )}

      {state.phase === "final-vote" && (
        <FinalVoteView onDone={() => navigate("/flagship-games/one-word/leaderboard")} />
      )}
    </Shell>
  );
};

/* ===== Shell ===== */

const Shell: React.FC<{
  children: React.ReactNode;
  mood: ReturnType<typeof useOneWord>["state"]["mood"];
  navigate: ReturnType<typeof useNavigate>;
}> = ({ children, mood, navigate }) => (
  <div className="min-h-screen bg-[#040206] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: mood?.bgGradient ?? "#040206" }} />
    <div className="relative max-w-7xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/one-word")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{mood?.name}</div>
      </div>
      {children}
    </div>
  </div>
);

/* ===== Writing ===== */

const WritingView: React.FC<{
  currentText: string;
  draft: string;
  setDraft: (v: string) => void;
  onSubmit: (raw: string) => void;
  onRedirect: () => void;
  secondsLeft: number;
  speedRound: boolean;
}> = ({ currentText, draft, setDraft, onSubmit, onRedirect, secondsLeft, speedRound }) => {
  const { state } = useOneWord();
  const player = state.players[state.currentTurnIdx];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        {/* Rotation ring */}
        <div className="flex flex-wrap justify-center gap-2">
          {state.players.map((p, i) => {
            const active = i === state.currentTurnIdx;
            const next = i === (state.currentTurnIdx + 1) % state.players.length;
            return (
              <motion.div
                key={p.id}
                animate={{ scale: active ? 1.15 : 1, opacity: active ? 1 : next ? 0.8 : 0.5 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/30 text-xs"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: p.color }}>
                  {p.name.slice(0, 1).toUpperCase()}
                </div>
                <span>{p.name}</span>
                {p.hasFreeze && <span className="text-[9px] text-cyan-200">❄</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Kinetic typography sentence */}
        <div className="relative min-h-[14rem] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-6 overflow-hidden flex items-center">
          <AnimatePresence>
            {speedRound && (
              <motion.div
                key="speed-banner"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-3 left-3 right-3 text-center text-[10px] uppercase tracking-[0.3em] text-rose-200"
              >
                ⚡ Speed Round · 4 seconds
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-wrap gap-x-2 gap-y-1 items-baseline w-full pt-2">
            <AnimatePresence initial={false}>
              {state.currentWords.map((w, idx) => {
                const isLast = idx === state.currentWords.length - 1;
                const isVizzy = w.authorId === "vizzy";
                const player = state.players.find((p) => p.id === w.authorId);
                return (
                  <motion.span
                    key={w.id}
                    initial={{ opacity: 0, x: 30, scale: 1.2 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className={`font-serif text-2xl md:text-3xl leading-snug ${isVizzy ? "text-amber-200 italic" : isLast ? "text-white" : "text-white/80"}`}
                    style={{ textShadow: player ? `0 0 18px ${player.color}66` : isVizzy ? "0 0 18px rgba(251,191,36,0.6)" : undefined }}
                  >
                    {idx === 0 ? capFirst(w.text) : w.text}
                  </motion.span>
                );
              })}
            </AnimatePresence>
            {state.currentWords.length === 0 && (
              <span className="text-white/30 italic font-serif text-xl">A sentence begins…</span>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Sentence {state.sentenceIdx} / {state.sessionLimit}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Words {state.currentWords.length} / {MAX_WORDS}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-3xl font-serif tabular-nums text-white">{secondsLeft}s</div>
            {player && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: player.color }}>
                  {player.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="text-sm">{player.name}</span>
              </div>
            )}
          </div>
          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              key={`${state.sentenceIdx}-${state.currentTurnIdx}-${state.turnStartedAt}`}
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: state.turnSeconds, ease: "linear" }}
              className="h-full bg-gradient-to-r from-pink-300 via-fuchsia-300 to-amber-200"
            />
          </div>
        </div>

        {player && (
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value.replace(/\s+/g, " ").slice(0, 30))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && draft.trim()) onSubmit(draft);
              }}
              placeholder="One word…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 font-serif text-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                onClick={() => onSubmit(draft + ".")}
                disabled={state.currentWords.length < 2}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-white/5 border border-white/10 disabled:opacity-30"
                title="Submit your word, ending the sentence"
              >
                <ArrowDownToLine size={12} /> End with .
              </button>
              <button
                onClick={onRedirect}
                disabled={!player || player.redirectUsed || state.currentWords.length < 3}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs bg-rose-500/20 border border-rose-300/30 text-rose-100 disabled:opacity-30"
                title="Abandon this sentence"
              >
                <Zap size={12} /> Redirect
              </button>
              <button
                onClick={() => onSubmit(draft)}
                disabled={!draft.trim()}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #ec4899, #fbbf24)", color: "white" }}
              >
                Submit <Send size={12} />
              </button>
            </div>
            {player.hasFreeze && (
              <div className="mt-2 text-[10px] text-cyan-200 italic">
                Freeze Token: you cannot end the next sentence.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ===== Sentence complete ===== */

const SentenceCompleteView: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { state, dispatch } = useOneWord();
  const last = state.sentences[state.sentences.length - 1];

  const showPivotVote = !last?.abandoned && (state.sentenceIdx % 5 === 0);

  useEffect(() => {
    if (!showPivotVote && last) {
      const t = setTimeout(onNext, 5500);
      return () => clearTimeout(t);
    }
  }, [showPivotVote, last, onNext]);

  if (!last) return null;
  const closerPlayer = state.players.find((p) => p.id === last.endedById);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          <motion.div
            key={last.id}
            initial={{ filter: "blur(20px)", opacity: 0, scale: 1.05 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{ background: last.illustration.background }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: last.illustration.overlay }} />
          <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
            <p className="font-serif text-xl md:text-3xl text-white leading-snug drop-shadow-lg max-w-3xl">
              "{last.text}"
            </p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-pink-200">
          Sentence {last.index} / {state.sessionLimit}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-pink-200 mb-1">Vizzy delivers</div>
          <p className="font-serif italic text-white/90 leading-relaxed text-sm">"{last.narration}"</p>
        </div>
        {!last.abandoned && (
          <div className="flex items-center gap-2 text-xs text-white/60">
            {[1, 2, 3].map((s) => (
              <Star key={s} size={12} className={s <= last.closerStars ? "text-amber-200" : "text-white/15"} fill={s <= last.closerStars ? "currentColor" : "transparent"} />
            ))}
            <span>
              {last.closerStars > 0 && closerPlayer ? `Closer Point → ${closerPlayer.name}` : "No closer point"}
            </span>
          </div>
        )}

        {showPivotVote && (
          <PivotVote sentenceId={last.id} onResolved={onNext} />
        )}

        {!showPivotVote && (
          <button onClick={onNext} className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm">
            Next sentence
          </button>
        )}
      </div>
    </div>
  );
};

const PivotVote: React.FC<{ sentenceId: string; onResolved: () => void }> = ({ sentenceId, onResolved }) => {
  const { state, dispatch } = useOneWord();
  const sentence = state.sentences.find((s) => s.id === sentenceId);
  if (!sentence) return null;

  return (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">Pivot vote</div>
      <p className="text-xs text-white/70 mb-3 italic">
        Which word transformed the sentence? The author wins the Pivot Badge.
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {sentence.words.map((w) => {
          const author = state.players.find((p) => p.id === w.authorId);
          const isVizzy = w.authorId === "vizzy";
          return (
            <button
              key={w.id}
              onClick={() => {
                if (isVizzy) return;
                dispatch({
                  type: "AWARD_PIVOT",
                  sentenceId: sentence.id,
                  pivotWordId: w.id,
                  pivotPlayerId: w.authorId as string,
                });
                onResolved();
              }}
              disabled={isVizzy}
              className={`px-2.5 py-1.5 rounded-full text-xs border ${isVizzy ? "border-amber-300/30 bg-amber-500/10 text-amber-100 opacity-50" : "border-white/15 bg-white/[0.04] hover:bg-white/10"}`}
              title={author ? author.name : "Vizzy"}
            >
              {w.text}
            </button>
          );
        })}
      </div>
      <button onClick={onResolved} className="w-full px-4 py-2 rounded-full bg-white text-black text-xs font-semibold">
        Skip vote
      </button>
    </div>
  );
};

/* ===== Final vote ===== */

const FinalVoteView: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const { state, dispatch } = useOneWord();
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-white mb-2">Vote for the most absurd sentence</h2>
        <p className="text-white/50 italic text-xs">Tap one. We crown the Absurdist.</p>
      </div>
      <div className="space-y-2">
        {state.sentences
          .filter((s) => !s.abandoned)
          .map((s) => {
            const ender = state.players.find((p) => p.id === s.endedById);
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (ender) dispatch({ type: "FINAL_ABSURD_VOTE", playerId: ender.id });
                  onDone();
                }}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-4 transition-colors"
              >
                <p className="font-serif text-white leading-relaxed">"{s.text}"</p>
                <div className="text-[10px] text-white/40 mt-1">{ender ? `closed by ${ender.name}` : "-"}</div>
              </button>
            );
          })}
      </div>
      <div className="flex justify-center">
        <button onClick={onDone} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold">
          Skip & finish
        </button>
      </div>
    </div>
  );
};

/* ===== helpers ===== */

function buildSentenceText(words: Word[]): string {
  if (words.length === 0) return "";
  const out = words.map((w, i) => (i === 0 ? capFirst(w.text) : w.text)).join(" ");
  return out;
}

function capFirst(s: string): string {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1);
}

export default OneWordPlay;
