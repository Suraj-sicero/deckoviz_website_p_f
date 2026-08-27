"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, MessageCircleQuestion, Send, Sparkles, Heart, EyeOff } from "lucide-react";
import { useOracle, type AnswerEntry, type GuessRecord, type QuestionEntry } from "./lib/oracleState";
import { COURAGE_HINTS, DEPTHS, SEED_QUESTIONS } from "./lib/depths";

const OraclePlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useOracle();
  const depthMeta = DEPTHS.find((d) => d.id === state.depth) ?? DEPTHS[1];

  useEffect(() => {
    if (state.players.length === 0) navigate("/flagship-games/oracle");
  }, [state.players.length, navigate]);

  return (
    <div className="min-h-screen bg-[#02050a] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: depthMeta.bgGradient }}
      />
      {/* slow water particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              background: "rgba(94, 234, 212, 0.3)",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/flagship-games/oracle")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft size={16} /> Lobby
          </button>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{depthMeta.name}</div>
        </div>

        {state.phase === "submission" && <SubmissionView />}
        {state.phase === "reveal" && <RevealView />}
        {state.phase === "answering" && <AnsweringView />}
        {state.phase === "reading" && <ReadingView />}
        {state.phase === "discussion" && <DiscussionView />}
        {state.phase === "guessing" && <GuessingView />}
        {state.phase === "asker-reveal" && <AskerRevealView />}
        {state.phase === "last-question" && <LastQuestionView />}
        {state.phase === "closing" && <ClosingView />}
        {state.phase === "archive" && <ArchiveView />}
      </div>
    </div>
  );
};

/* ====== Submission ====== */

const SubmissionView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const [activeIdx, setActiveIdx] = useState(0);
  const [drafts, setDrafts] = useState<string[]>(["", "", ""]);
  const player = state.players[activeIdx];
  const seedPool = SEED_QUESTIONS[state.depth];

  const submit = () => {
    if (!player) return;
    const submitted = drafts.filter((d) => d.trim().length > 0);
    submitted.forEach((text) => {
      const q: QuestionEntry = {
        id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text: text.trim().slice(0, 220),
        authorId: player.id,
        isVizzy: false,
        isFromPassBack: false,
      };
      dispatch({ type: "SUBMIT_QUESTION", question: q });
    });
    setDrafts(["", "", ""]);
    if (activeIdx < state.players.length - 1) {
      setActiveIdx((i) => i + 1);
    } else {
      // queue Vizzy's question (for 2nd-to-last slot)
      const vizzyPool = DEPTHS.find((d) => d.id === state.depth)?.vizzyQuestionPool ?? [];
      const vq: QuestionEntry = {
        id: `vq-${Date.now()}`,
        text: vizzyPool[Math.floor(Math.random() * vizzyPool.length)] ?? "What do you think people misunderstand about you?",
        authorId: "vizzy",
        isVizzy: true,
        isFromPassBack: false,
      };
      dispatch({ type: "QUEUE_VIZZY_QUESTION", question: vq });
      dispatch({ type: "BEGIN_NEXT_QUESTION" });
    }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto py-10">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">Question submission</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white">
          {player ? `${player.name}, write up to three real questions.` : "Ready."}
        </h2>
        <p className="text-white/50 italic text-sm mt-1">Anonymous. No timer. Write what you actually wonder.</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
        <div className="text-[10px] uppercase tracking-[0.25em] text-teal-200 mb-2">Need a seed?</div>
        <div className="flex flex-wrap gap-2">
          {seedPool.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                const next = [...drafts];
                const slot = next.findIndex((d) => !d.trim());
                next[Math.max(0, slot)] = s;
                setDrafts(next);
              }}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {[0, 1, 2].map((i) => (
        <textarea
          key={i}
          value={drafts[i]}
          onChange={(e) => {
            const next = [...drafts];
            next[i] = e.target.value.slice(0, 220);
            setDrafts(next);
          }}
          rows={2}
          placeholder={`Question ${i + 1}${i === 0 ? " (at least one)" : " (optional)"}`}
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
        />
      ))}
      <button
        onClick={submit}
        disabled={drafts.every((d) => !d.trim())}
        className="w-full px-5 py-3 rounded-full text-sm font-semibold disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #0ea5e9, #5eead4)", color: "white" }}
      >
        {activeIdx < state.players.length - 1 ? `Pass to ${state.players[activeIdx + 1].name}` : "Open the oracle"}
      </button>
    </div>
  );
};

/* ====== Reveal ====== */

const RevealView: React.FC = () => {
  const { state, dispatch } = useOracle();
  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: "GOTO", phase: "answering" }), 5000);
    return () => clearTimeout(t);
  }, [dispatch]);
  const q = state.current.question;
  if (!q) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="text-center py-16">
      <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-4">
        Question {state.questionsAnswered + 1} / {state.totalQuestions} {q.isVizzy && "· Vizzy speaks"}
      </div>
      <h2 className="font-serif text-3xl md:text-4xl text-white max-w-3xl mx-auto leading-snug">"{q.text}"</h2>
      <p className="text-white/40 italic text-xs mt-8">- ten seconds of silence -</p>
    </motion.div>
  );
};

/* ====== Answering ====== */

const AnsweringView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const q = state.current.question;
  const player = state.players[activeIdx];
  const submittedIds = state.current.answers.map((a) => a.authorId);
  const allAnswered = submittedIds.length >= state.players.length;

  useEffect(() => {
    if (allAnswered) dispatch({ type: "BEGIN_READING" });
  }, [allAnswered, dispatch]);

  const submit = () => {
    if (!player || !q) return;
    const text = draft.trim();
    if (!text) return;
    const answer: AnswerEntry = {
      id: `a-${q.id}-${player.id}`,
      questionId: q.id,
      authorId: player.id,
      text: text.slice(0, 360),
    };
    dispatch({ type: "ANSWER", answer });
    setDraft("");
    if (activeIdx < state.players.length - 1) setActiveIdx((i) => i + 1);
  };

  if (!q) return null;
  return (
    <div className="space-y-4 max-w-3xl mx-auto py-6">
      <div className="rounded-2xl border border-teal-300/30 bg-teal-500/10 p-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-teal-200 mb-1">The question</div>
        <p className="font-serif text-white text-lg leading-snug">"{q.text}"</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
        {player && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: player.color }}>
              {player.name.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-sm">{player.name}</span>
            <span className="text-[10px] text-white/40 ml-auto">{activeIdx + 1} / {state.players.length}</span>
          </div>
        )}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value.slice(0, 360))}
          rows={4}
          placeholder="Write when you're ready. No timer."
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
        />
        <button
          onClick={submit}
          disabled={!draft.trim()}
          className="w-full px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #5eead4)", color: "white" }}
        >
          Place answer
        </button>
      </div>
    </div>
  );
};

/* ====== Reading ====== */

const ReadingView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const idx = state.current.readingIdx;
  const ans = state.current.answers[idx];
  useEffect(() => {
    if (idx >= state.current.answers.length) {
      const t = setTimeout(() => dispatch({ type: "GOTO", phase: "discussion" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => dispatch({ type: "BUMP_READING" }), 6000);
    return () => clearTimeout(t);
  }, [idx, state.current.answers.length, dispatch]);
  if (!ans) return null;
  return (
    <div className="py-16">
      <div className="text-center mb-6 text-[10px] uppercase tracking-[0.4em] text-teal-200">
        Anonymous answer {idx + 1} / {state.current.answers.length}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={ans.id}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1.2 }}
          className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <p className="font-serif text-white text-xl md:text-2xl leading-relaxed">"{ans.text}"</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ====== Discussion ====== */

const DiscussionView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const [passBackOpen, setPassBackOpen] = useState(false);
  const [passBackText, setPassBackText] = useState("");

  const triggerPassBack = () => {
    if (!passBackText.trim() || state.passBackUsed) return;
    const q: QuestionEntry = {
      id: `pb-${Date.now()}`,
      text: passBackText.trim().slice(0, 220),
      authorId: state.players[0]?.id ?? "vizzy",
      isVizzy: false,
      isFromPassBack: true,
    };
    dispatch({ type: "ADD_PASSBACK", question: q });
    setPassBackOpen(false);
    setPassBackText("");
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto py-8">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">Discussion</div>
        <h2 className="font-serif text-2xl text-white">Talk it through.</h2>
        <p className="text-white/50 italic text-sm mt-1">No timer. Silence is welcome.</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-teal-200">Answers in the room</div>
        {state.current.answers.map((a) => (
          <p key={a.id} className="font-serif text-white/85 leading-relaxed text-sm">"{a.text}"</p>
        ))}
      </div>
      {!state.passBackUsed && (
        <div className="rounded-2xl border border-teal-300/30 bg-teal-500/10 p-4">
          {!passBackOpen ? (
            <button
              onClick={() => setPassBackOpen(true)}
              className="text-sm text-teal-100 inline-flex items-center gap-2"
            >
              <Sparkles size={12} /> Pass-Back · ask a follow-up next
            </button>
          ) : (
            <div className="space-y-2">
              <input
                value={passBackText}
                onChange={(e) => setPassBackText(e.target.value.slice(0, 200))}
                placeholder="A follow-up question, anonymously."
                className="w-full bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
              />
              <div className="flex gap-2">
                <button
                  onClick={triggerPassBack}
                  disabled={!passBackText.trim()}
                  className="px-3 py-1.5 rounded-full bg-teal-300 text-black text-xs font-semibold disabled:opacity-40"
                >
                  Queue it
                </button>
                <button
                  onClick={() => {
                    setPassBackOpen(false);
                    setPassBackText("");
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/70 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={() => {
            // award depth point to longest, most precise answer (proxy: longest non-empty)
            const sorted = [...state.current.answers].sort((a, b) => b.text.length - a.text.length);
            if (sorted[0]) dispatch({ type: "AWARD_DEPTH", playerId: sorted[0].authorId });
            dispatch({ type: "BEGIN_GUESSING" });
          }}
          className="flex-1 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center justify-center gap-2"
        >
          Guess the asker <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ====== Guessing ====== */

const GuessingView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const voter = state.players[state.current.voterIdx];
  const q = state.current.question;

  // No guessing for Vizzy's question - skip straight to reveal
  useEffect(() => {
    if (q?.isVizzy) dispatch({ type: "GOTO", phase: "asker-reveal" });
  }, [q?.isVizzy, dispatch]);

  if (!voter || !q || q.isVizzy) return null;

  const guess = (targetId: string) => {
    const record: GuessRecord = {
      questionId: q.id,
      byPlayerId: voter.id,
      guessedAuthorId: targetId,
      correct: targetId === q.authorId,
    };
    dispatch({ type: "GUESS", record });
    if (state.current.voterIdx < state.players.length - 1) {
      dispatch({ type: "BUMP_VOTER" });
    } else {
      dispatch({ type: "REVEAL_ASKER" });
    }
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto py-8">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">Who asked?</div>
        <p className="font-serif text-white text-lg">"{q.text}"</p>
      </div>
      <div className="text-center text-xs text-white/50">{voter.name}, your guess.</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {state.players.map((p) => (
          <button
            key={p.id}
            onClick={() => guess(p.id)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-3 flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: p.color }}>
              {p.name.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-sm">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ====== Asker reveal ====== */

const AskerRevealView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const q = state.current.question;
  if (!q) return null;
  const asker = state.players.find((p) => p.id === q.authorId);

  const continueOn = () => {
    const remaining = state.totalQuestions - state.questionsAnswered;
    if (remaining <= 0) {
      // begin Last Question
      const lq: QuestionEntry = {
        id: `last-${Date.now()}`,
        text: "What question did you want to ask tonight that you didn't?",
        authorId: "vizzy",
        isVizzy: true,
        isFromPassBack: false,
      };
      dispatch({ type: "BEGIN_LAST_QUESTION", question: lq });
      return;
    }
    dispatch({ type: "BEGIN_NEXT_QUESTION" });
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto py-10">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">Asker</div>
        <p className="font-serif text-white text-lg italic mb-4">"{q.text}"</p>
        {q.isVizzy ? (
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">- Vizzy asked this. No reveal.</div>
        ) : asker ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: asker.color }}>
              {asker.name.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-sm">{asker.name} asked this.</span>
          </motion.div>
        ) : null}
      </div>
      {/* Courage award - once per session, gentle reasoning */}
      {!state.courageAwardedId && asker && (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4 text-center">
          <button
            onClick={() => dispatch({ type: "AWARD_COURAGE", playerId: asker.id })}
            className="inline-flex items-center gap-2 text-sm text-amber-100"
          >
            <Heart size={14} /> Award Courage Point to {asker.name}
          </button>
          <div className="text-[10px] text-white/50 italic mt-1">
            {COURAGE_HINTS[Math.floor(Math.random() * COURAGE_HINTS.length)]}
          </div>
        </div>
      )}
      <button
        onClick={continueOn}
        className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm inline-flex items-center justify-center gap-2"
      >
        Continue <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ====== Last Question ====== */

const LastQuestionView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const [activeIdx, setActiveIdx] = useState(0);
  const [draft, setDraft] = useState("");
  const player = state.players[activeIdx];
  const q = state.current.question;

  const submit = () => {
    if (!player || !q) return;
    const text = draft.trim();
    if (!text) {
      // allow skipping
      if (activeIdx < state.players.length - 1) setActiveIdx((i) => i + 1);
      else dispatch({ type: "GO_CLOSING" });
      return;
    }
    const a: AnswerEntry = { id: `lq-${player.id}`, questionId: q.id, authorId: player.id, text: text.slice(0, 280) };
    dispatch({ type: "LAST_ANSWER", answer: a });
    setDraft("");
    if (activeIdx < state.players.length - 1) setActiveIdx((i) => i + 1);
    else dispatch({ type: "GO_CLOSING" });
  };

  if (!q) return null;
  return (
    <div className="space-y-5 max-w-3xl mx-auto py-12">
      <div className="text-center">
        <EyeOff className="inline-block text-teal-200 mb-2" size={18} />
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">The Last Question</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-snug">"{q.text}"</h2>
        <p className="text-white/40 italic text-xs mt-3">Anonymous. No attribution. Nothing follows.</p>
      </div>
      {player && (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
          <div className="text-xs text-white/60">{player.name} - passes the device when ready.</div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, 280))}
            rows={3}
            placeholder="Anything you'd like. Or nothing."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
          />
          <button
            onClick={submit}
            className="w-full px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
          >
            {draft.trim() ? "Submit anonymously" : "Skip"}
          </button>
        </div>
      )}
    </div>
  );
};

/* ====== Closing ====== */

const ClosingView: React.FC = () => {
  const { state, dispatch } = useOracle();
  return (
    <div className="text-center py-20 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-3">The session closes</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-relaxed italic">
          "The questions people ask reveal them as much as the answers they give."
        </h2>
      </motion.div>
      {state.lastQuestionAnswers.length > 0 && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-teal-200 mb-2">What was almost asked</div>
          <div className="space-y-2 text-left">
            {state.lastQuestionAnswers.map((a) => (
              <p key={a.id} className="font-serif text-white/80 italic">"{a.text}"</p>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => dispatch({ type: "GO_ARCHIVE" })}
        className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center gap-2"
      >
        See the archive <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ====== Archive ====== */

const ArchiveView: React.FC = () => {
  const { state, dispatch } = useOracle();
  const navigate = useNavigate();
  return (
    <div className="space-y-6 py-6">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-teal-200 mb-2">Session archive</div>
        <h2 className="font-serif text-3xl text-white">What was said tonight</h2>
      </div>
      <div className="space-y-4">
        {state.history.map(({ question, answers }) => (
          <div key={question.id} className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-teal-200 mb-1">{question.isVizzy ? "Vizzy asked" : "Question"}</div>
            <p className="font-serif text-white text-lg leading-snug mb-3">"{question.text}"</p>
            <div className="space-y-1.5">
              {answers.map((a) => (
                <p key={a.id} className="font-serif text-white/75 italic text-sm">"{a.text}"</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-teal-200 mb-3">Quiet scoreboard</div>
        <ul className="space-y-1.5 text-sm">
          {state.players.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black" style={{ background: p.color }}>
                {p.name.slice(0, 1).toUpperCase()}
              </div>
              <span className="flex-1 text-white">{p.name}</span>
              <span className="text-xs text-teal-200">{p.insightPoints} insight</span>
              <span className="text-xs text-amber-200">{p.depthPoints} depth</span>
              <span className="text-xs text-violet-200">{p.transparencyPoints} transparency</span>
              {p.courageAwarded && <span className="text-xs text-rose-200">courage ✦</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/flagship-games/oracle");
          }}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
        >
          Close gently
        </button>
      </div>
    </div>
  );
};

export default OraclePlay;
