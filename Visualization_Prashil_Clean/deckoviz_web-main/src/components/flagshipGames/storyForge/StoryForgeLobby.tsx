"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  UserMinus,
  Sparkles,
  Bot,
  Wifi,
  Tv,
} from "lucide-react";
import { useStoryForge } from "./lib/storyForgeState";
import GenreCarousel from "./components/GenreCarousel";
import { startAmbient, stopAmbient, setMood } from "./lib/audio";
import { GENRES } from "./lib/genres";

const StoryForgeLobby: React.FC = () => {
  const { state, dispatch, helpers } = useStoryForge();
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  const canStart =
    state.genre &&
    ((state.mode === "multiplayer" && state.players.length >= 2) ||
      state.mode === "solo");

  const addLocalPlayer = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    helpers.addPlayer(trimmed);
    setNewName("");
  };

  const beginGame = () => {
    if (!canStart) return;
    // For solo mode, ensure there is exactly one Vizzy co-author + the player
    if (state.mode === "solo") {
      if (state.players.length === 0) {
        helpers.addPlayer("You");
      }
      if (!state.players.some((p) => p.id === "vizzy-ai")) {
        dispatch({
          type: "ADD_PLAYER",
          player: {
            id: "vizzy-ai",
            name: "Vizzy",
            color: "#a78bfa",
            ready: true,
            resonance: 0,
          },
        });
      }
    }
    dispatch({ type: "START_GAME" });
    if (state.genre) {
      startAmbient(state.genre, "calm");
      setMood("rising");
    }
    navigate("/flagship-games/story-forge/play");
  };

  return (
    <div className="min-h-screen bg-[#040209] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient backdrop responds to selected genre */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: state.genre ? 0.9 : 0.5 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            state.genre?.themeColors.bgGradient ??
            "linear-gradient(180deg, #050314, #0a0814, #050314)",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-20 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{
            background: state.genre
              ? `${state.genre.themeColors.primary}33`
              : "rgba(168,85,247,0.18)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate("/flagship-games")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm"
          >
            <ArrowLeft size={16} /> Back to games
          </button>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Wifi size={14} /> Room
            <span className="font-mono text-white tracking-wider">{state.roomCode}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-violet-200 mb-4">
            <Sparkles size={12} /> Story Forge
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
            Gather your storytellers
          </h1>
          <p className="text-white/60 mt-3 max-w-xl mx-auto">
            Pick a genre, invite players, and step into a cinematic AI-narrated story you'll build together.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_MODE", mode: "multiplayer" })}
              className={`px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-all ${
                state.mode === "multiplayer"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Users size={14} /> Multiplayer
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_MODE", mode: "solo" })}
              className={`px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-all ${
                state.mode === "solo"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Bot size={14} /> Solo with Vizzy
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Genre selection */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-white">Choose a genre</h3>
              {state.genre && (
                <span className="text-xs text-white/50 italic">
                  {state.genre.mood}
                </span>
              )}
            </div>
            <GenreCarousel
              selectedId={state.genre?.id ?? null}
              onSelect={(g) => {
                dispatch({ type: "SET_GENRE", genre: g });
                startAmbient(g, "calm");
              }}
            />

            {/* TV preview */}
            {state.genre && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-3xl border border-white/10 overflow-hidden relative aspect-video"
                style={{ background: state.genre.posterGradient }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.1), transparent 60%)",
                  }}
                />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white/60 inline-flex items-center gap-2">
                  <Tv size={12} /> TV Frame Preview
                </div>
                <div className="absolute inset-0 flex items-center justify-center px-10 text-center">
                  <h2 className="font-serif text-2xl md:text-3xl text-white drop-shadow-lg max-w-2xl">
                    {state.genre.openingPrompt}
                  </h2>
                </div>
              </motion.div>
            )}
          </div>

          {/* Players panel */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-white">Players</h3>
                <span className="text-xs text-white/50">
                  {state.players.length} / 6
                </span>
              </div>

              <div className="space-y-2 mb-4 min-h-[3rem]">
                {state.players.length === 0 && (
                  <p className="text-white/40 text-sm italic">
                    Add at least two players to begin.
                  </p>
                )}
                {state.players.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
                      style={{ background: p.color }}
                    >
                      {p.name.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="flex-1 text-sm text-white/90">{p.name}</span>
                    {p.id !== "vizzy-ai" && (
                      <button
                        type="button"
                        onClick={() => dispatch({ type: "REMOVE_PLAYER", id: p.id })}
                        className="text-white/40 hover:text-rose-400 transition-colors"
                        aria-label="Remove player"
                      >
                        <UserMinus size={14} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {state.players.length < 6 && state.mode === "multiplayer" && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value.slice(0, 24))}
                    onKeyDown={(e) => e.key === "Enter" && addLocalPlayer()}
                    placeholder="Player name"
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={addLocalPlayer}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90"
                  >
                    Add
                  </button>
                </div>
              )}

              {state.mode === "solo" && (
                <p className="text-xs text-white/50">
                  Solo mode plays alongside Vizzy. Add your name above (defaults to "You").
                </p>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 5 rounds (extendable)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Vizzy narrates each turn
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Twist cards after every round
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Final illustrated storybook
                </div>
              </div>

              <button
                type="button"
                disabled={!canStart}
                onClick={beginGame}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: state.genre
                    ? `linear-gradient(135deg, ${state.genre.themeColors.primary}, ${state.genre.themeColors.accent})`
                    : "linear-gradient(135deg, #a78bfa, #ec4899)",
                  color: "white",
                  boxShadow: "0 10px 40px -10px rgba(168,85,247,0.5)",
                }}
              >
                <Sparkles size={14} /> Begin the story
              </button>
            </div>

            <div className="mt-4 px-1 text-[11px] text-white/40">
              Tip: pass the device to each player on their turn - or open the
              same room code on another screen for a TV setup.
            </div>
          </div>
        </div>

        {/* Genre meta strip */}
        <div className="mt-12 flex flex-wrap gap-3 items-center justify-center text-[11px] text-white/40">
          <span>Available genres:</span>
          {GENRES.map((g) => (
            <span
              key={g.id}
              className="px-2 py-0.5 rounded-full border border-white/10"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryForgeLobby;
