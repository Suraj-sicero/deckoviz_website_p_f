"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useStoryForge } from "./lib/storyForgeState";
import TVFrame from "./components/TVFrame";
import VizzyNarrator from "./components/VizzyNarrator";
import MobileInput from "./components/MobileInput";
import TwistRevealOverlay from "./components/TwistRevealOverlay";
import ResonanceVote from "./components/ResonanceVote";
import PlayerHud from "./components/PlayerHud";
import { generateTwist } from "./lib/twistEngine";
import {
  mockImageProvider,
  generateStoryTitle,
  generateEnding,
  assignArchetypes,
} from "./lib/mockAI";
import { startAmbient, stopAmbient, setMood, playSting } from "./lib/audio";

const ENDING_TONES: { id: "triumphant" | "ambiguous" | "tragic" | "surprising"; label: string; desc: string }[] = [
  { id: "triumphant", label: "Triumphant", desc: "Hope, hard-earned." },
  { id: "ambiguous", label: "Ambiguous", desc: "Let the reader decide." },
  { id: "tragic", label: "Tragic", desc: "Beauty in the falling." },
  { id: "surprising", label: "Surprising", desc: "Even the storyteller is caught off-guard." },
];

const StoryForgePlay: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, helpers } = useStoryForge();
  const [audioOn, setAudioOn] = useState(true);
  const [openingComplete, setOpeningComplete] = useState(false);
  const [showExtendVote, setShowExtendVote] = useState(false);
  const lastSentenceRef = useRef<string | null>(null);
  const [generatingScene, setGeneratingScene] = useState(false);

  // Bootstrap: if user lands here without a genre, send them back
  useEffect(() => {
    if (!state.genre || state.players.length === 0) {
      navigate("/flagship-games/story-forge");
    }
  }, [state.genre, state.players.length, navigate]);

  // Audio lifecycle
  useEffect(() => {
    if (audioOn && state.genre) startAmbient(state.genre, "calm");
    else stopAmbient();
    return () => stopAmbient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioOn]);

  useEffect(() => {
    if (state.phase === "twist") setMood("twist");
    else if (state.phase === "ending" || state.phase === "ending-vote") setMood("ending");
    else if (state.phase === "round") setMood("rising");
  }, [state.phase]);

  // ----- handlers -----

  const submitSentence = useCallback(
    (text: string) => {
      const active = helpers.activePlayer;
      if (!active || !state.genre) return;
      const id = `s-${state.round}-${Date.now()}`;
      dispatch({
        type: "SUBMIT_SENTENCE",
        sentence: {
          id,
          playerId: active.id,
          text,
          round: state.round,
          voteCount: 0,
        },
      });
      lastSentenceRef.current = text;
      playSting("submit");
      // bump turn
      const submittedAfter =
        state.sentences.filter((s) => s.round === state.round).length + 1;
      if (submittedAfter < state.players.length) {
        dispatch({ type: "BUMP_TURN" });
      } else {
        // round complete - generate scene + twist
        void completeRound();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [helpers.activePlayer, state.genre, state.round, state.sentences, state.players.length],
  );

  const completeRound = useCallback(async () => {
    if (!state.genre) return;
    setGeneratingScene(true);
    const storySoFar = [
      ...state.sentences.map((s) => s.text),
      lastSentenceRef.current ?? "",
    ].filter(Boolean);
    const scene = await mockImageProvider.generateScene({
      genre: state.genre,
      storySoFar,
      round: state.round,
    });
    dispatch({ type: "SET_SCENE", scene });
    setGeneratingScene(false);
    // open voting first
    dispatch({ type: "OPEN_VOTING", round: state.round });
  }, [state.genre, state.round, state.sentences, dispatch]);

  const handleVote = (sentenceId: string) => {
    dispatch({ type: "CAST_VOTE", sentenceId });
    playSting("vote");
  };

  const finishVote = () => {
    dispatch({ type: "CLOSE_VOTING" });
    // Reveal a twist (unless final round just ended - then go straight to ending vote)
    if (state.round >= state.roundLimit) {
      // If we're at the final round, jump to ending vote
      dispatch({ type: "ADVANCE_ROUND" });
      return;
    }
    if (state.round === state.roundLimit - 1) {
      setShowExtendVote(true);
      return;
    }
    revealTwist();
  };

  const revealTwist = () => {
    if (!state.genre) return;
    const twist = generateTwist({
      bias: state.genre.twistBias,
      usedIds: new Set(state.twistsUsed),
    });
    dispatch({ type: "APPLY_TWIST", twist });
  };

  const continueAfterTwist = () => {
    dispatch({ type: "ADVANCE_ROUND" });
  };

  const handleExtendVote = (extend: boolean) => {
    if (extend) {
      dispatch({ type: "EXTEND_ROUNDS" });
    }
    setShowExtendVote(false);
    revealTwist();
  };

  const finalizeEnding = async (tone: typeof ENDING_TONES[number]["id"]) => {
    if (!state.genre) return;
    dispatch({ type: "SET_ENDING_TONE", tone });
    playSting("ending");
    const storyLines = state.sentences.map((s) => s.text);
    const [text, title, scene, archetypes] = await Promise.all([
      generateEnding({ storyLines, tone, genre: state.genre }),
      generateStoryTitle(storyLines, state.genre),
      mockImageProvider.generateScene({
        genre: state.genre,
        storySoFar: storyLines,
        round: state.roundLimit + 1,
      }),
      assignArchetypes(
        state.players.map((p) => ({
          playerId: p.id,
          lines: state.sentences.filter((s) => s.playerId === p.id).map((s) => s.text),
        })),
      ),
    ]);
    dispatch({ type: "SET_ENDING", text, title, scene, archetypes });
  };

  // ----- derived -----

  const storyLines = useMemo(
    () =>
      state.sentences.map((s) => ({
        text: s.text,
        playerColor:
          state.players.find((p) => p.id === s.playerId)?.color ?? "#fff",
      })),
    [state.sentences, state.players],
  );

  if (!state.genre) return null;
  const genre = state.genre;

  // ----- views by phase -----

  if (state.phase === "opening") {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TVFrame
              genre={genre}
              scene={null}
              overlayText={genre.openingPrompt}
              showRoundLabel="Opening · A new world"
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <VizzyNarrator
              text={`Welcome, storytellers. Tonight we begin a ${genre.name}. ${genre.openingPrompt}`}
              genre={genre}
              type="intro"
              onComplete={() => setOpeningComplete(true)}
            />
            <button
              type="button"
              disabled={!openingComplete}
              onClick={() => dispatch({ type: "BEGIN_ROUNDS" })}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40"
              style={{
                background: `linear-gradient(135deg, ${genre.themeColors.primary}, ${genre.themeColors.accent})`,
                color: "white",
              }}
            >
              <Sparkles size={14} /> Begin Round 1
            </button>
            <p className="text-xs text-white/50">
              Each player writes one sentence per round. Vizzy will narrate. After
              each round a Twist Card appears.
            </p>
          </div>
        </div>
      </PlayShell>
    );
  }

  if (state.phase === "round") {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="mb-4">
          <PlayerHud players={state.players} activeIdx={state.currentPlayerIdx} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TVFrame
              genre={genre}
              scene={state.pendingScene}
              showRoundLabel={`Round ${state.round} / ${state.roundLimit}`}
              twistBanner={state.activeTwist?.text ?? undefined}
              storyLines={storyLines}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            {lastSentenceRef.current && (
              <VizzyNarrator
                text={lastSentenceRef.current}
                genre={genre}
                type="sentence"
              />
            )}
            <MobileInput
              activePlayer={helpers.activePlayer}
              round={state.round}
              totalRounds={state.roundLimit}
              twist={state.activeTwist?.text}
              onSubmit={submitSentence}
              disabled={generatingScene}
            />
            {generatingScene && (
              <div className="text-xs text-white/50 italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-300 animate-pulse" />
                Generating the next scene...
              </div>
            )}
          </div>
        </div>
      </PlayShell>
    );
  }

  if (state.phase === "vote") {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TVFrame
              genre={genre}
              scene={state.pendingScene}
              showRoundLabel={`Round ${state.round} complete`}
              storyLines={storyLines}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <ResonanceVote
              sentences={state.sentences}
              players={state.players}
              round={state.round}
              onVote={handleVote}
              onSkip={finishVote}
            />
            <button
              type="button"
              onClick={finishVote}
              className="w-full px-5 py-3 rounded-full bg-white text-black font-semibold text-sm"
            >
              Continue
            </button>
          </div>
        </div>
        <AnimatePresence>
          {showExtendVote && (
            <ExtendOverlay onChoose={handleExtendVote} />
          )}
        </AnimatePresence>
      </PlayShell>
    );
  }

  if (state.phase === "twist" && state.activeTwist) {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 relative">
            <TVFrame
              genre={genre}
              scene={state.pendingScene}
              showRoundLabel={`Twist · Round ${state.round}`}
              storyLines={storyLines}
            />
            <TwistRevealOverlay twist={state.activeTwist} onContinue={continueAfterTwist} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <VizzyNarrator
              text={`A turn in the tale - ${state.activeTwist.text}`}
              genre={genre}
              type="twist"
            />
          </div>
        </div>
      </PlayShell>
    );
  }

  if (state.phase === "ending-vote") {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TVFrame
              genre={genre}
              scene={state.pendingScene}
              showRoundLabel="Final breath · choose the ending"
              storyLines={storyLines}
            />
          </div>
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-xl text-white">How shall it end?</h3>
            <p className="text-sm text-white/60">
              Pick the emotional shape of the closing scene.
            </p>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {ENDING_TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => finalizeEnding(t.id)}
                  className="text-left rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 px-4 py-3 transition-all"
                >
                  <div className="text-white font-semibold">{t.label}</div>
                  <div className="text-xs text-white/50">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PlayShell>
    );
  }

  if (state.phase === "ending" && state.endingText) {
    return (
      <PlayShell genre={genre} audioOn={audioOn} setAudioOn={setAudioOn} navigate={navigate}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TVFrame
              genre={genre}
              scene={state.pendingScene}
              showRoundLabel="Ending"
              overlayText={state.storyTitle ?? undefined}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <VizzyNarrator text={state.endingText} genre={genre} type="ending" />
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "GOTO_STORYBOOK" });
                navigate("/flagship-games/story-forge/storybook");
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm"
              style={{
                background: `linear-gradient(135deg, ${genre.themeColors.primary}, ${genre.themeColors.accent})`,
                color: "white",
              }}
            >
              <Sparkles size={14} /> Open the Storybook
            </button>
          </div>
        </div>
      </PlayShell>
    );
  }

  return null;
};

/* ---------- Shell ---------- */

const PlayShell: React.FC<{
  children: React.ReactNode;
  genre: ReturnType<typeof useStoryForge>["state"]["genre"];
  audioOn: boolean;
  setAudioOn: (v: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ children, genre, audioOn, setAudioOn, navigate }) => {
  return (
    <div className="min-h-screen bg-[#020108] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: 0.85 }}
        style={{
          background: genre?.themeColors.bgGradient ?? "#020108",
        }}
      />
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/flagship-games/story-forge")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm"
          >
            <ArrowLeft size={16} /> Lobby
          </button>
          <button
            type="button"
            onClick={() => setAudioOn(!audioOn)}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs"
          >
            {audioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>Ambient {audioOn ? "on" : "off"}</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ExtendOverlay: React.FC<{
  onChoose: (extend: boolean) => void;
}> = ({ onChoose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0612] p-6 text-center"
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-violet-300 mb-2">
        Vote
      </div>
      <h3 className="font-serif text-2xl text-white mb-2">
        Extend by two more rounds?
      </h3>
      <p className="text-sm text-white/60 mb-5">
        The story is finding its breath. Stretch it further, or move toward the
        ending.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChoose(false)}
          className="flex-1 px-4 py-2.5 rounded-full border border-white/15 text-white/80 hover:bg-white/5"
        >
          Move to ending
        </button>
        <button
          type="button"
          onClick={() => onChoose(true)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-semibold"
        >
          <Plus size={14} /> +2 rounds
        </button>
      </div>
    </motion.div>
  </motion.div>
);

export default StoryForgePlay;
