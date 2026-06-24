"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Eye, EyeOff, ChevronRight, Frame } from "lucide-react";
import { useMuseum, type Artwork } from "./lib/museumState";
import { MEDIUMS, type Medium } from "./lib/themes";
import {
  generateArtworkVisual,
  generateVizzyArtwork,
  pickPrompt,
  presenceObservations,
  suggestMuseumNames,
  writeCuratorNote,
} from "./lib/museumEngine";

const MuseumPlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useMuseum();

  useEffect(() => {
    if (!state.theme || state.players.length === 0) {
      navigate("/flagship-games/museum-of-us");
    }
  }, [state.theme, state.players.length, navigate]);

  // intro -> first prompt
  useEffect(() => {
    if (state.phase !== "intro" || !state.theme) return;
    const t = setTimeout(() => {
      const prompt = pickPrompt(state.theme!, 0);
      const anonymous = state.anonymousRoundNumber === 1;
      dispatch({ type: "BEGIN_ROUND", prompt, anonymous });
    }, 4000);
    return () => clearTimeout(t);
  }, [state.phase, state.theme, state.anonymousRoundNumber, dispatch]);

  if (!state.theme) return null;
  const theme = state.theme;

  return (
    <Shell theme={theme} navigate={navigate}>
      {state.phase === "intro" && <IntroView />}
      {state.phase === "prompt" && <PromptView />}
      {state.phase === "creating" && <CreatingView />}
      {state.phase === "revealing" && <RevealingView />}
      {state.phase === "sharing" && <SharingView />}
      {state.phase === "anonymous-guess" && <AnonGuessView />}
      {state.phase === "vizzy-piece" && <VizzyPieceView />}
      {state.phase === "curation" && <CurationView />}
      {state.phase === "curator-note" && <CuratorNoteView />}
      {state.phase === "final-wall" && <FinalWallView />}
    </Shell>
  );
};

/* ===== Shell ===== */

const Shell: React.FC<{
  children: React.ReactNode;
  theme: NonNullable<ReturnType<typeof useMuseum>["state"]["theme"]>;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ children, theme, navigate }) => (
  <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: theme.bgGradient }} />
    {/* halo light */}
    <motion.div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none"
      style={{ background: theme.halo }}
      animate={{ opacity: [0.18, 0.32, 0.18] }}
      transition={{ duration: 9, repeat: Infinity }}
    />
    {/* dust */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 1.5 + Math.random() * 2,
            height: 1.5 + Math.random() * 2,
            background: "rgba(255, 240, 220, 0.4)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 9 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}
    </div>
    <div className="relative max-w-6xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/museum-of-us")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{theme.name}</div>
      </div>
      {children}
    </div>
  </div>
);

/* ===== Intro ===== */

const IntroView: React.FC = () => {
  const { state } = useMuseum();
  if (!state.theme) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="text-center py-20">
      <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-4">Curator</div>
      <h2 className="font-serif text-2xl md:text-4xl text-white max-w-2xl mx-auto leading-snug">
        "{state.theme.introNarration}"
      </h2>
      <p className="text-white/40 italic text-xs mt-6">opening the doors…</p>
    </motion.div>
  );
};

/* ===== Prompt + creating ===== */

const PromptView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const round = state.rounds[state.rounds.length - 1];
  if (!round || !state.theme) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-12">
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-3">
          Round {state.round} / {state.totalRounds}{round.anonymous ? " · Anonymous Room" : ""}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-white leading-snug">
          "{round.prompt}"
        </h2>
        <p className="text-white/60 italic mt-4">Take your time. No timer.</p>
        <button
          onClick={() => dispatch({ type: "GOTO", phase: "creating" })}
          className="mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm"
        >
          Begin
        </button>
      </div>
    </motion.div>
  );
};

const CreatingView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const [activeIdx, setActiveIdx] = useState(0);
  const [title, setTitle] = useState("");
  const [medium, setMedium] = useState<Medium>("Painting");
  const [description, setDescription] = useState("");
  const round = state.rounds[state.rounds.length - 1];

  const submitted = state.artworks.filter((a) => a.round === state.round).length;
  const player = state.players[activeIdx];
  const isAnonymous = round?.anonymous ?? false;

  if (!round || !state.theme) return null;

  const submit = () => {
    const t = title.trim();
    const d = description.trim();
    if (!t || !d || !player) return;
    const visual = generateArtworkVisual({ theme: state.theme!, medium, seed: Date.now() % 999 });
    const artwork: Artwork = {
      id: `art-${player.id}-${state.round}-${Date.now()}`,
      playerId: player.id,
      round: state.round,
      prompt: round.prompt,
      title: t.slice(0, 80),
      medium,
      description: d.slice(0, 400),
      anonymous: isAnonymous,
      art: visual,
      createdAt: Date.now(),
    };
    dispatch({ type: "SUBMIT_ARTWORK", artwork });
    setTitle("");
    setDescription("");
    setMedium("Painting");

    if (submitted + 1 >= state.players.length) {
      dispatch({ type: "BEGIN_REVEAL" });
      setActiveIdx(0);
    } else {
      setActiveIdx((i) => (i + 1) % state.players.length);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">
            Round {state.round} / {state.totalRounds}
          </div>
          <p className="font-serif text-white text-lg leading-snug">"{round.prompt}"</p>
          {isAnonymous && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-rose-200">
              <EyeOff size={11} /> Anonymous round - names hidden until reveal
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-xs text-white/50 italic">
          {submitted} of {state.players.length} artworks placed.
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 space-y-4">
          {player && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: player.color }}>
                {player.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-semibold">{player.name}</div>
                <div className="text-xs text-white/50">creating an artwork</div>
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-white/40 block mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 80))}
              placeholder="Give it a name."
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-2.5 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-white/40 block mb-1">Medium</label>
            <div className="flex flex-wrap gap-2">
              {MEDIUMS.map((m) => {
                const sel = m === medium;
                return (
                  <button
                    key={m}
                    onClick={() => setMedium(m)}
                    className={`px-3 py-1.5 rounded-full text-xs transition ${sel ? "bg-white text-black" : "bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/10"}`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.25em] text-white/40 block mb-1">Description (2–3 sentences)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 400))}
              rows={4}
              placeholder="Curate it. What does it look like? What does it ask of the viewer?"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 font-serif text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 tabular-nums">{description.length}/400</span>
            <button
              onClick={submit}
              disabled={!title.trim() || !description.trim()}
              className="px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f472b6)", color: "white" }}
            >
              Place in museum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== Revealing ===== */

const RevealingView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const round = state.rounds[state.rounds.length - 1];
  const roundArtworks = useMemo(
    () => state.artworks.filter((a) => a.round === state.round),
    [state.artworks, state.round],
  );
  const idx = state.currentArtworkIdx;
  const current = roundArtworks[idx];

  // Auto-advance every 7s for a slow gallery feel
  useEffect(() => {
    if (idx >= roundArtworks.length) return;
    const t = setTimeout(() => {
      if (idx + 1 < roundArtworks.length) {
        dispatch({ type: "BUMP_REVEAL" });
      } else if (round?.anonymous) {
        dispatch({ type: "GOTO_ANON_GUESS" });
      } else {
        dispatch({ type: "GOTO_SHARING" });
      }
    }, 7000);
    return () => clearTimeout(t);
  }, [idx, roundArtworks.length, round?.anonymous, dispatch]);

  if (!current) return null;
  const isAnon = round?.anonymous ?? false;
  const player = state.players.find((p) => p.id === current.playerId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <FramedArtwork artwork={current} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">
          Round {state.round} · piece {idx + 1} of {roundArtworks.length}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="space-y-3"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-white leading-snug">"{current.title}"</h2>
            <div className="text-xs text-white/60">{current.medium}</div>
            <p className="font-serif text-white/85 leading-relaxed">{current.description}</p>
            <div className="pt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
              {isAnon ? "Artist withheld" : `- ${player?.name ?? "Visitor"}`}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ===== Sharing / Presence ===== */

const SharingView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const roundArtworks = state.artworks.filter((a) => a.round === state.round);

  const nextRound = () => {
    if (state.round >= state.totalRounds) {
      // generate Vizzy piece
      const vizzy = generateVizzyArtwork(state.theme!, state.artworks);
      dispatch({ type: "ADD_VIZZY_PIECE", artwork: vizzy });
      return;
    }
    const prompt = pickPrompt(state.theme!, state.round);
    const anonymous = state.anonymousRoundNumber === state.round + 1;
    dispatch({ type: "BEGIN_ROUND", prompt, anonymous });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">An optional moment</div>
        <h3 className="font-serif text-xl text-white">Would anyone like to share?</h3>
        <p className="text-sm text-white/60 italic">
          Speak about the real memory, the hidden meaning, why you made it - or simply sit with the room. Silence is welcome.
        </p>
        <div className="pt-2">
          <button
            onClick={nextRound}
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center gap-2"
          >
            {state.round >= state.totalRounds ? "Vizzy has something" : "Continue when ready"} <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">Presence Moments</div>
        <p className="text-xs text-white/50 italic mb-3">
          Privately mark a moment that felt true, beautiful, honest, or surprising.
        </p>
        <div className="space-y-2">
          {roundArtworks.map((a) => {
            const player = state.players.find((p) => p.id === a.playerId);
            return (
              <button
                key={a.id}
                onClick={() => dispatch({ type: "MARK_PRESENCE", playerId: a.playerId })}
                className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] p-3 flex items-center gap-3 transition-colors"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-black" style={{ background: player?.color }}>
                  {player?.name?.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-serif text-white text-sm">"{a.title}"</div>
                  <div className="text-[10px] text-white/40">{a.medium} · {player?.name}</div>
                </div>
                <Heart size={14} className="text-amber-200" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ===== Anonymous Guess ===== */

const AnonGuessView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const [revealed, setRevealed] = useState(false);
  const roundArtworks = state.artworks.filter((a) => a.round === state.round);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-rose-200 mb-2">Anonymous Room</div>
        <h2 className="font-serif text-2xl text-white">Who made which?</h2>
        <p className="text-xs text-white/50 italic mt-1">Discuss out loud. Reveal when you're ready.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roundArtworks.map((a) => {
          const player = state.players.find((p) => p.id === a.playerId);
          return (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
              <div className="font-serif text-white">"{a.title}"</div>
              <div className="text-[10px] text-white/40 mb-2">{a.medium}</div>
              <p className="text-sm text-white/70 italic mb-3">{a.description}</p>
              <div className="text-[10px] uppercase tracking-[0.25em]">
                {revealed ? (
                  <span className="text-amber-200">- {player?.name}</span>
                ) : (
                  <span className="text-white/40">- hidden</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 pt-4">
        <button
          onClick={() => setRevealed(true)}
          disabled={revealed}
          className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm inline-flex items-center gap-2 disabled:opacity-40"
        >
          <Eye size={14} /> Reveal artists
        </button>
        <button
          onClick={() => dispatch({ type: "GOTO_SHARING" })}
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

/* ===== Vizzy Piece ===== */

const VizzyPieceView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const vizzy = state.artworks.find((a) => a.playerId === "vizzy");
  if (!vizzy) {
    // Build it now if not present (safety net)
    const a = generateVizzyArtwork(state.theme!, state.artworks);
    dispatch({ type: "ADD_VIZZY_PIECE", artwork: a });
    return null;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <FramedArtwork artwork={vizzy} />
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200">Something Vizzy noticed</div>
        <h2 className="font-serif text-2xl md:text-3xl text-white leading-snug">"{vizzy.title}"</h2>
        <div className="text-xs text-white/60">{vizzy.medium}</div>
        <p className="font-serif text-white/85 leading-relaxed">{vizzy.description}</p>
        <button
          onClick={() => dispatch({ type: "GOTO_CURATION" })}
          className="mt-4 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center gap-2"
        >
          Name the museum <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ===== Curation (name museum) ===== */

const CurationView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const [name, setName] = useState<string>("");
  const suggestions = useMemo(() => (state.theme ? suggestMuseumNames(state.theme) : []), [state.theme]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">Name the museum together</div>
        <h2 className="font-serif text-3xl text-white">What did we make tonight?</h2>
      </div>
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 60))}
          placeholder="A name that fits the evening…"
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 font-serif text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">Suggestions</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setName(s)}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70 hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          disabled={!name.trim()}
          onClick={() => {
            dispatch({ type: "SET_MUSEUM_NAME", name: name.trim() });
            const note = writeCuratorNote({
              theme: state.theme!,
              artworks: state.artworks,
              players: state.players,
            });
            dispatch({ type: "SET_CURATOR_NOTE", note });
            dispatch({ type: "GOTO_CURATOR_NOTE" });
          }}
          className="w-full px-5 py-3 rounded-full text-sm font-semibold disabled:opacity-40"
          style={{ background: "linear-gradient(135deg, #fbbf24, #f472b6)", color: "white" }}
        >
          Set the name
        </button>
      </div>
    </div>
  );
};

/* ===== Curator note ===== */

const CuratorNoteView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
      <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200">
        {state.museumName}
      </div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-serif text-2xl md:text-3xl text-white leading-relaxed"
      >
        "{state.curatorNote}"
      </motion.h2>
      <p className="text-xs text-white/40 italic">- Curator's note</p>
      <button
        onClick={() => dispatch({ type: "GOTO_FINAL_WALL" })}
        className="mt-4 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold inline-flex items-center gap-2"
      >
        Walk the gallery <ChevronRight size={14} />
      </button>
    </div>
  );
};

/* ===== Final wall ===== */

const FinalWallView: React.FC = () => {
  const { state, dispatch } = useMuseum();
  const navigate = useNavigate();
  const observations = useMemo(
    () => presenceObservations({ players: state.players, artworks: state.artworks }),
    [state.players, state.artworks],
  );

  return (
    <div className="py-6 space-y-8">
      <div className="text-center">
        <Frame className="inline-block text-amber-200 mb-2" size={20} />
        <h1 className="font-serif text-3xl md:text-4xl text-white">{state.museumName}</h1>
        <p className="text-white/60 italic max-w-2xl mx-auto mt-2 text-sm">{state.curatorNote}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.artworks.map((a) => {
          const player = state.players.find((p) => p.id === a.playerId);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden border border-white/15 bg-stone-100/5"
            >
              <div className="aspect-[4/5] relative" style={{ background: a.art.background }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: a.art.overlay }} />
              </div>
              <div className="p-3 bg-stone-900/60 border-t border-white/10">
                <div className="font-serif text-white text-sm leading-snug">"{a.title}"</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-0.5">
                  {a.medium} {a.playerId !== "vizzy" && player && <span>· {player.name}</span>}
                  {a.playerId === "vizzy" && <span>· Vizzy</span>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {observations.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5 max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">Vizzy's observations</div>
          <ul className="space-y-1.5 text-sm text-white/80 font-serif italic">
            {observations.map((o, i) => (
              <li key={i}>· {o}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/flagship-games/museum-of-us");
          }}
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
        >
          Close gently
        </button>
      </div>
    </div>
  );
};

/* ===== Framed artwork view ===== */

const FramedArtwork: React.FC<{ artwork: Artwork }> = ({ artwork }) => (
  <div className="relative w-full aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden border-[6px] border-stone-200/15 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] bg-stone-950">
    <motion.div
      key={artwork.id}
      initial={{ filter: "blur(28px)", opacity: 0, scale: 1.05 }}
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{ duration: 4.2, ease: "easeOut" }}
      className="absolute inset-0"
      style={{ background: artwork.art.background }}
    />
    <div className="absolute inset-0 pointer-events-none" style={{ background: artwork.art.overlay }} />
    {/* gallery label */}
    <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/80">
      <span className="font-serif italic">"{artwork.title}"</span> · {artwork.medium}
    </div>
  </div>
);

export default MuseumPlay;
