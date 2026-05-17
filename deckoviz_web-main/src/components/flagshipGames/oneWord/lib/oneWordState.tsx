"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { SessionMood } from "./sessionMoods";

export type Phase = "lobby" | "intro" | "writing" | "sentence-complete" | "speed-round" | "final-vote" | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  quickfire: number;
  closers: number;
  pivots: number;
  redirectUsed: boolean;
  hasFreeze: boolean;
  absurdistVotes: number;
}

export interface Word {
  id: string;
  text: string;
  authorId: string | "vizzy";
  submittedAt: number;
}

export interface SentenceRecord {
  id: string;
  index: number;
  words: Word[];
  text: string;
  endedById: string | "vizzy" | null;
  closerStars: 0 | 1 | 2 | 3;
  pivotWordId: string | null;
  pivotPlayerId: string | null;
  narration: string;
  illustration: { background: string; overlay: string };
  moodId: string;
  abandoned: boolean;
}

export interface State {
  phase: Phase;
  mood: SessionMood | null;
  players: Player[];
  sentenceIdx: number; // 1-indexed; current sentence's number
  sessionLimit: number;
  currentWords: Word[];
  currentTurnIdx: number;
  turnStartedAt: number | null;
  turnSeconds: number;
  vizzyInterruptUsed: boolean;
  vizzyInterruptThisSentence: boolean;
  speedRoundUsed: boolean;
  sentences: SentenceRecord[];
  pivotPromptOpen: boolean;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_MOOD"; mood: SessionMood }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_FIRST_SENTENCE" }
  | { type: "BEGIN_TURN"; at: number }
  | { type: "SUBMIT_WORD"; word: Word }
  | { type: "BUMP_TURN" }
  | { type: "VIZZY_INTERRUPT"; word: Word }
  | { type: "END_SENTENCE"; record: SentenceRecord }
  | { type: "BEGIN_NEXT_SENTENCE" }
  | { type: "REDIRECT"; redirectingPlayerId: string; partialRecord: SentenceRecord }
  | { type: "SPEED_ROUND_START" }
  | { type: "SPEED_ROUND_END" }
  | { type: "AWARD_PIVOT"; sentenceId: string; pivotWordId: string; pivotPlayerId: string }
  | { type: "FINAL_ABSURD_VOTE"; playerId: string }
  | { type: "GOTO"; phase: Phase };

const COLORS = ["#fbbf24", "#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#fb7185", "#60a5fa", "#facc15"];

export const initialState: State = {
  phase: "lobby",
  mood: null,
  players: [],
  sentenceIdx: 0,
  sessionLimit: 10,
  currentWords: [],
  currentTurnIdx: 0,
  turnStartedAt: null,
  turnSeconds: 8,
  vizzyInterruptUsed: false,
  vizzyInterruptThisSentence: false,
  speedRoundUsed: false,
  sentences: [],
  pivotPromptOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_MOOD":
      return { ...state, mood: action.mood };
    case "ADD_PLAYER":
      if (state.players.length >= 8) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "intro" };
    case "BEGIN_FIRST_SENTENCE":
      return {
        ...state,
        phase: "writing",
        sentenceIdx: 1,
        currentWords: [],
        currentTurnIdx: 0,
        turnStartedAt: Date.now(),
        vizzyInterruptThisSentence: false,
      };
    case "BEGIN_TURN":
      return { ...state, turnStartedAt: action.at };
    case "SUBMIT_WORD": {
      // record quickfire if under 3s
      let players = state.players;
      if (action.word.authorId !== "vizzy" && state.turnStartedAt) {
        const elapsed = (action.word.submittedAt - state.turnStartedAt) / 1000;
        if (elapsed < 3) {
          players = players.map((p) =>
            p.id === action.word.authorId ? { ...p, quickfire: p.quickfire + 1 } : p,
          );
        }
      }
      return {
        ...state,
        currentWords: [...state.currentWords, action.word],
        players,
      };
    }
    case "BUMP_TURN":
      if (state.players.length === 0) return state;
      return {
        ...state,
        currentTurnIdx: (state.currentTurnIdx + 1) % state.players.length,
        turnStartedAt: Date.now(),
      };
    case "VIZZY_INTERRUPT":
      return {
        ...state,
        currentWords: [...state.currentWords, action.word],
        vizzyInterruptUsed: true,
        vizzyInterruptThisSentence: true,
      };
    case "END_SENTENCE": {
      // award closer if stars > 0
      let players = state.players;
      if (action.record.endedById && action.record.endedById !== "vizzy" && action.record.closerStars > 0) {
        players = players.map((p) =>
          p.id === action.record.endedById ? { ...p, closers: p.closers + 1 } : p,
        );
      }
      return {
        ...state,
        phase: "sentence-complete",
        sentences: [...state.sentences, action.record],
        players,
      };
    }
    case "BEGIN_NEXT_SENTENCE": {
      if (state.sentenceIdx >= state.sessionLimit) {
        return { ...state, phase: "final-vote" };
      }
      // trigger speed round randomly once per session in the middle
      const triggerSpeed = !state.speedRoundUsed && state.sentenceIdx >= 3 && Math.random() > 0.6;
      return {
        ...state,
        phase: triggerSpeed ? "speed-round" : "writing",
        sentenceIdx: state.sentenceIdx + 1,
        currentWords: [],
        currentTurnIdx: 0,
        turnStartedAt: Date.now(),
        vizzyInterruptThisSentence: false,
        turnSeconds: triggerSpeed ? 4 : 8,
        speedRoundUsed: triggerSpeed ? true : state.speedRoundUsed,
      };
    }
    case "REDIRECT": {
      const players = state.players.map((p) =>
        p.id === action.redirectingPlayerId ? { ...p, redirectUsed: true, hasFreeze: true } : p,
      );
      return {
        ...state,
        phase: "sentence-complete",
        sentences: [...state.sentences, action.partialRecord],
        players,
      };
    }
    case "SPEED_ROUND_START":
      return { ...state, phase: "speed-round", turnSeconds: 4 };
    case "SPEED_ROUND_END":
      return { ...state, phase: "writing", turnSeconds: 8 };
    case "AWARD_PIVOT": {
      const sentences = state.sentences.map((s) =>
        s.id === action.sentenceId
          ? { ...s, pivotWordId: action.pivotWordId, pivotPlayerId: action.pivotPlayerId }
          : s,
      );
      const players = state.players.map((p) =>
        p.id === action.pivotPlayerId ? { ...p, pivots: p.pivots + 1 } : p,
      );
      return { ...state, sentences, players };
    }
    case "FINAL_ABSURD_VOTE": {
      const players = state.players.map((p) =>
        p.id === action.playerId ? { ...p, absurdistVotes: p.absurdistVotes + 1 } : p,
      );
      return { ...state, players };
    }
    case "GOTO":
      return { ...state, phase: action.phase };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const OneWordContext = createContext<Ctx | null>(null);

export const OneWordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `ow-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          quickfire: 0,
          closers: 0,
          pivots: 0,
          redirectUsed: false,
          hasFreeze: false,
          absurdistVotes: 0,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <OneWordContext.Provider value={value}>{children}</OneWordContext.Provider>;
};

export function useOneWord(): Ctx {
  const ctx = useContext(OneWordContext);
  if (!ctx) throw new Error("useOneWord must be inside provider");
  return ctx;
}
