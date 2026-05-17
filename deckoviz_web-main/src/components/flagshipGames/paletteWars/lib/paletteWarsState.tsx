"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { ArtMood } from "./moods";
import type { Artwork } from "./artGenerator";

export type Phase =
  | "lobby"
  | "opening"
  | "generating"
  | "writing"
  | "reveal"
  | "voting"
  | "results"
  | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  ready: boolean;
  points: number;
  vizzyPicks: number;
  joyPoints: number;
  swapUsed: boolean;
  title?: string;
}

export interface Response {
  id: string;
  playerId: string;
  text: string;
  round: number;
  voteCount: number;
  laughs: string[]; // playerIds who hit the laugh button
}

export interface RoundRecord {
  round: number;
  artwork: Artwork;
  responses: Response[];
  winnerId: string | null;
  vizzyPickId: string | null;
  theme: { id: string; label: string; detail: string } | null;
}

export interface State {
  phase: Phase;
  gameMode: "standard" | "party" | "solo";
  mood: ArtMood | null;
  players: Player[];
  round: number;
  roundLimit: number;
  artwork: Artwork | null;
  activeTheme: { id: string; label: string; detail: string } | null;
  writingDeadline: number | null;
  responses: Response[];
  rounds: RoundRecord[];
  revealIdx: number;
  winnerId: string | null;
  vizzyPickId: string | null;
  roomCode: string;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_MODE"; mode: State["gameMode"] }
  | { type: "SET_MOOD"; mood: ArtMood }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_ROUND" }
  | { type: "SET_ARTWORK"; artwork: Artwork }
  | { type: "SET_THEME"; theme: State["activeTheme"] }
  | { type: "BEGIN_WRITING"; deadline: number }
  | { type: "SUBMIT_RESPONSE"; response: Response }
  | { type: "BEGIN_REVEAL" }
  | { type: "BUMP_REVEAL" }
  | { type: "BEGIN_VOTING" }
  | { type: "CAST_VOTE"; responseId: string }
  | { type: "LAUGH"; responseId: string; voterId: string }
  | { type: "FINALIZE_ROUND"; winnerId: string | null; vizzyPickId: string | null }
  | { type: "ADVANCE" }
  | { type: "USE_SWAP"; playerId: string }
  | { type: "FINISH"; titles: { playerId: string; title: string }[] };

const COLORS = ["#a78bfa", "#22d3ee", "#f472b6", "#fbbf24", "#10b981", "#fb7185", "#60a5fa", "#facc15"];

function randomRoom(): string {
  const letters = "ACDEFGHJKLMNPQRTUVWXY";
  return Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

export const initialState: State = {
  phase: "lobby",
  gameMode: "standard",
  mood: null,
  players: [],
  round: 0,
  roundLimit: 6,
  artwork: null,
  activeTheme: null,
  writingDeadline: null,
  responses: [],
  rounds: [],
  revealIdx: 0,
  winnerId: null,
  vizzyPickId: null,
  roomCode: randomRoom(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { ...initialState, roomCode: randomRoom() };
    case "SET_MODE": {
      const limit = action.mode === "party" ? 10 : action.mode === "solo" ? 5 : 6;
      return { ...state, gameMode: action.mode, roundLimit: limit };
    }
    case "SET_MOOD":
      return { ...state, mood: action.mood };
    case "ADD_PLAYER":
      if (state.players.length >= 8) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "opening", round: 0 };
    case "BEGIN_ROUND":
      return {
        ...state,
        phase: "generating",
        round: state.round + 1,
        artwork: null,
        activeTheme: null,
        writingDeadline: null,
        revealIdx: 0,
        winnerId: null,
        vizzyPickId: null,
      };
    case "SET_ARTWORK":
      return { ...state, artwork: action.artwork };
    case "SET_THEME":
      return { ...state, activeTheme: action.theme };
    case "BEGIN_WRITING":
      return { ...state, phase: "writing", writingDeadline: action.deadline };
    case "SUBMIT_RESPONSE":
      // dedupe: one response per player per round
      if (state.responses.some((r) => r.round === action.response.round && r.playerId === action.response.playerId)) {
        return state;
      }
      return { ...state, responses: [...state.responses, action.response] };
    case "BEGIN_REVEAL":
      return { ...state, phase: "reveal", revealIdx: 0 };
    case "BUMP_REVEAL":
      return { ...state, revealIdx: state.revealIdx + 1 };
    case "BEGIN_VOTING":
      return { ...state, phase: "voting" };
    case "CAST_VOTE": {
      const responses = state.responses.map((r) =>
        r.id === action.responseId ? { ...r, voteCount: r.voteCount + 1 } : r,
      );
      return { ...state, responses };
    }
    case "LAUGH": {
      const responses = state.responses.map((r) => {
        if (r.id !== action.responseId) return r;
        if (r.laughs.includes(action.voterId) || r.playerId === action.voterId) return r;
        return { ...r, laughs: [...r.laughs, action.voterId] };
      });
      return { ...state, responses };
    }
    case "FINALIZE_ROUND": {
      const roundResponses = state.responses.filter((r) => r.round === state.round);
      const players = state.players.map((p) => {
        let points = p.points;
        let vp = p.vizzyPicks;
        let joy = p.joyPoints;
        for (const r of roundResponses) {
          if (r.playerId === p.id) {
            points += r.voteCount;
            joy += r.laughs.length;
            if (r.id === action.vizzyPickId) {
              vp += 1;
              points += 1;
            }
          }
        }
        return { ...p, points, vizzyPicks: vp, joyPoints: joy };
      });
      const record: RoundRecord = {
        round: state.round,
        artwork: state.artwork!,
        responses: roundResponses,
        winnerId: action.winnerId,
        vizzyPickId: action.vizzyPickId,
        theme: state.activeTheme,
      };
      return {
        ...state,
        phase: "results",
        winnerId: action.winnerId,
        vizzyPickId: action.vizzyPickId,
        rounds: [...state.rounds, record],
        players,
      };
    }
    case "ADVANCE":
      if (state.round >= state.roundLimit) {
        return { ...state, phase: "leaderboard" };
      }
      return { ...state, phase: "generating", round: state.round + 1, artwork: null, activeTheme: null, writingDeadline: null, revealIdx: 0 };
    case "USE_SWAP": {
      const players = state.players.map((p) =>
        p.id === action.playerId ? { ...p, swapUsed: true } : p,
      );
      return { ...state, players, artwork: null, writingDeadline: null, phase: "generating" };
    }
    case "FINISH": {
      const titleMap = Object.fromEntries(action.titles.map((t) => [t.playerId, t.title]));
      const players = state.players.map((p) => ({ ...p, title: titleMap[p.id] }));
      return { ...state, phase: "leaderboard", players };
    }
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const PaletteWarsContext = createContext<Ctx | null>(null);

export const PaletteWarsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback((name: string) => {
    dispatch({
      type: "ADD_PLAYER",
      player: {
        id: `pw-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name,
        color: COLORS[state.players.length % COLORS.length],
        ready: false,
        points: 0,
        vizzyPicks: 0,
        joyPoints: 0,
        swapUsed: false,
      },
    });
  }, [state.players.length]);

  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <PaletteWarsContext.Provider value={value}>{children}</PaletteWarsContext.Provider>;
};

export function usePaletteWars(): Ctx {
  const ctx = useContext(PaletteWarsContext);
  if (!ctx) throw new Error("usePaletteWars must be inside provider");
  return ctx;
}
