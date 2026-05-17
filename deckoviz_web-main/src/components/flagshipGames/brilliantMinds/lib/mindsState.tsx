"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { Universe } from "./questions";

export type RoundType = "straight" | "reasoning" | "connection" | "minority" | "wild";
export type Phase = "lobby" | "intro" | "round" | "results" | "rabbit-hole" | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  team: string | null; // teamId
  points: number;
  rabbitHoleUsed: boolean;
  challengeUsed: boolean;
}

export interface Submission {
  playerId: string;
  text: string;
  scoreDelta: number; // tentative; finalized on reveal
}

export interface RoundRecord {
  index: number;
  type: RoundType;
  prompt: string;
  expectedAnswer: string;
  submissions: Submission[];
  revealed: boolean;
}

export interface State {
  phase: Phase;
  universe: Universe;
  teamMode: boolean;
  players: Player[];
  roundIdx: number;
  totalRounds: number;
  currentRound: RoundRecord | null;
  rounds: RoundRecord[];
  rabbitHole: { title: string; body: string } | null;
  labTheme: string | null;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_UNIVERSE"; universe: Universe }
  | { type: "TOGGLE_TEAMS" }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_ROUND"; round: RoundRecord }
  | { type: "SUBMIT"; submission: Submission }
  | { type: "REVEAL"; finalDeltas: Record<string, number> }
  | { type: "ADVANCE" }
  | { type: "TRIGGER_RABBIT_HOLE"; content: { title: string; body: string }; playerId: string | null }
  | { type: "EXIT_RABBIT_HOLE" }
  | { type: "AWARD_LAB_THEME"; theme: string };

const COLORS = ["#22d3ee", "#fbbf24", "#a78bfa", "#f472b6", "#34d399", "#fb7185", "#60a5fa", "#facc15"];

export const initialState: State = {
  phase: "lobby",
  universe: "whole",
  teamMode: false,
  players: [],
  roundIdx: 0,
  totalRounds: 5,
  currentRound: null,
  rounds: [],
  rabbitHole: null,
  labTheme: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_UNIVERSE":
      return { ...state, universe: action.universe };
    case "TOGGLE_TEAMS":
      return { ...state, teamMode: !state.teamMode };
    case "ADD_PLAYER":
      if (state.players.length >= 8) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "intro" };
    case "BEGIN_ROUND":
      return { ...state, phase: "round", currentRound: action.round, roundIdx: action.round.index };
    case "SUBMIT": {
      if (!state.currentRound) return state;
      // replace prior submission by same player
      const others = state.currentRound.submissions.filter((s) => s.playerId !== action.submission.playerId);
      return {
        ...state,
        currentRound: { ...state.currentRound, submissions: [...others, action.submission] },
      };
    }
    case "REVEAL": {
      if (!state.currentRound) return state;
      const updatedSubmissions = state.currentRound.submissions.map((s) => ({
        ...s,
        scoreDelta: action.finalDeltas[s.playerId] ?? s.scoreDelta,
      }));
      const players = state.players.map((p) => ({
        ...p,
        points: p.points + (action.finalDeltas[p.id] ?? 0),
      }));
      return {
        ...state,
        phase: "results",
        currentRound: { ...state.currentRound, submissions: updatedSubmissions, revealed: true },
        rounds: [...state.rounds, { ...state.currentRound, submissions: updatedSubmissions, revealed: true }],
        players,
      };
    }
    case "ADVANCE": {
      if (state.roundIdx >= state.totalRounds) {
        return { ...state, phase: "leaderboard" };
      }
      return { ...state, phase: "round", currentRound: null };
    }
    case "TRIGGER_RABBIT_HOLE": {
      const players = action.playerId
        ? state.players.map((p) => (p.id === action.playerId ? { ...p, rabbitHoleUsed: true } : p))
        : state.players;
      return { ...state, phase: "rabbit-hole", rabbitHole: action.content, players };
    }
    case "EXIT_RABBIT_HOLE":
      return { ...state, phase: "round", rabbitHole: null };
    case "AWARD_LAB_THEME":
      return { ...state, labTheme: action.theme };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const MindsContext = createContext<Ctx | null>(null);

export const MindsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          team: null,
          points: 0,
          rabbitHoleUsed: false,
          challengeUsed: false,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <MindsContext.Provider value={value}>{children}</MindsContext.Provider>;
};

export function useMinds(): Ctx {
  const ctx = useContext(MindsContext);
  if (!ctx) throw new Error("useMinds must be inside provider");
  return ctx;
}

export function isMatch(answer: string, target: string, acceptable: string[] = []): boolean {
  const norm = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9 ]/g, "");
  const a = norm(answer);
  if (!a) return false;
  if (norm(target).includes(a) || a.includes(norm(target))) return true;
  return acceptable.some((x) => {
    const n = norm(x);
    return n === a || n.includes(a) || a.includes(n);
  });
}

export function rateReasoning(text: string): { stars: 0 | 1 | 2 | 3 | 4; pts: number } {
  if (!text.trim()) return { stars: 0, pts: 0 };
  let stars: 0 | 1 | 2 | 3 | 4 = 1;
  if (text.length > 60) stars = 2;
  if (/because|therefore|consider|imagine|trade-?off|tension|however/i.test(text)) stars = 3;
  if (text.length > 180 && /[?]/.test(text)) stars = 4;
  return { stars, pts: stars };
}
