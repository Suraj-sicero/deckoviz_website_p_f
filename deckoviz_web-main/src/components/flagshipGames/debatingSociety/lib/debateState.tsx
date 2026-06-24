"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { DebateMode } from "./topics";

export type Side = "for" | "against";
export type Phase =
  | "lobby"
  | "intro"
  | "opening"
  | "rebuttal"
  | "cross-exam"
  | "closing"
  | "voting"
  | "verdict"
  | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  side: Side;
  points: number;
  commendations: number;
  perfectFlip: boolean;
  heckleToken: boolean;
  pivotUsed: boolean;
  conscienceUsed: boolean;
  realBeliefSide: Side | null; // optional, used for Perfect Flip
}

export interface Speech {
  id: string;
  playerId: string;
  side: Side;
  phase: "opening" | "rebuttal" | "closing";
  text: string;
  rhetoricScore: number; // 0–10
  createdAt: number;
}

export interface Heckle {
  id: string;
  byPlayerId: string;
  targetPhase: string;
  text: string;
  rated: "hit" | "missed" | "pending";
  createdAt: number;
}

export interface CrossExamExchange {
  id: string;
  forPlayerId: string;
  againstPlayerId: string;
  question: string;
  forAnswer: string;
  againstAnswer: string;
  forRating: "strong" | "weak" | "pending";
  againstRating: "strong" | "weak" | "pending";
}

export interface CrowdMeter {
  forScore: number;
  againstScore: number;
}

export interface State {
  phase: Phase;
  mode: DebateMode;
  resolvedMode: DebateMode;
  topic: string;
  players: Player[];
  speeches: Speech[];
  heckles: Heckle[];
  crossExam: CrossExamExchange | null;
  crowd: CrowdMeter;
  voteByPlayerId: Record<string, string>; // voterId -> playerId
  verdict: string | null;
  commendationPlayerId: string | null;
  roomCode: string;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_MODE"; mode: DebateMode }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "ASSIGN_SIDES" }
  | { type: "START_TOPIC"; topic: string; resolvedMode: DebateMode }
  | { type: "GOTO"; phase: Phase }
  | { type: "SUBMIT_SPEECH"; speech: Speech }
  | { type: "ADD_HECKLE"; heckle: Heckle; sideHit: Side }
  | { type: "BEGIN_CROSS_EXAM"; exchange: CrossExamExchange }
  | { type: "ANSWER_CROSS_EXAM"; playerId: string; answer: string; rating: "strong" | "weak" }
  | { type: "CAST_VOTE"; voterId: string; targetPlayerId: string }
  | { type: "SET_VERDICT"; verdict: string; commendationPlayerId: string | null }
  | { type: "USE_PIVOT"; playerId: string }
  | { type: "USE_CONSCIENCE"; playerId: string }
  | { type: "TICK_CROWD"; forDelta: number; againstDelta: number }
  | { type: "AWARD_POINTS"; playerId: string; pts: number; commendation?: boolean; perfectFlip?: boolean };

const COLORS = ["#fbbf24", "#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#fb7185", "#60a5fa", "#facc15"];

function randomRoom(): string {
  const letters = "ACDEFGHJKLMNPQRTUVWXY";
  return Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

export const initialState: State = {
  phase: "lobby",
  mode: "civilised",
  resolvedMode: "civilised",
  topic: "",
  players: [],
  speeches: [],
  heckles: [],
  crossExam: null,
  crowd: { forScore: 50, againstScore: 50 },
  voteByPlayerId: {},
  verdict: null,
  commendationPlayerId: null,
  roomCode: randomRoom(),
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { ...initialState, roomCode: randomRoom() };
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "ADD_PLAYER":
      if (state.players.length >= 8) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "ASSIGN_SIDES": {
      const shuffled = [...state.players].sort(() => Math.random() - 0.5);
      const players = shuffled.map((p, i) => ({ ...p, side: (i % 2 === 0 ? "for" : "against") as Side }));
      return { ...state, players };
    }
    case "START_TOPIC":
      return { ...state, phase: "intro", topic: action.topic, resolvedMode: action.resolvedMode };
    case "GOTO":
      return { ...state, phase: action.phase };
    case "SUBMIT_SPEECH":
      return { ...state, speeches: [...state.speeches, action.speech] };
    case "ADD_HECKLE": {
      const heckles = [...state.heckles, action.heckle];
      const players = state.players.map((p) =>
        p.id === action.heckle.byPlayerId ? { ...p, heckleToken: false } : p,
      );
      const crowdDelta = action.heckle.rated === "hit" ? 4 : -2;
      const crowd =
        action.sideHit === "for"
          ? { forScore: state.crowd.forScore + crowdDelta, againstScore: state.crowd.againstScore - crowdDelta / 2 }
          : { againstScore: state.crowd.againstScore + crowdDelta, forScore: state.crowd.forScore - crowdDelta / 2 };
      return { ...state, heckles, players, crowd: clampCrowd(crowd) };
    }
    case "BEGIN_CROSS_EXAM":
      return { ...state, crossExam: action.exchange };
    case "ANSWER_CROSS_EXAM": {
      if (!state.crossExam) return state;
      const isFor = state.crossExam.forPlayerId === action.playerId;
      const exchange = { ...state.crossExam };
      if (isFor) {
        exchange.forAnswer = action.answer;
        exchange.forRating = action.rating;
      } else {
        exchange.againstAnswer = action.answer;
        exchange.againstRating = action.rating;
      }
      const players = state.players.map((p) =>
        p.id === action.playerId && action.rating === "strong" ? { ...p, points: p.points + 1 } : p,
      );
      return { ...state, crossExam: exchange, players };
    }
    case "CAST_VOTE":
      return { ...state, voteByPlayerId: { ...state.voteByPlayerId, [action.voterId]: action.targetPlayerId } };
    case "SET_VERDICT":
      return { ...state, verdict: action.verdict, commendationPlayerId: action.commendationPlayerId };
    case "USE_PIVOT": {
      const players = state.players.map((p) => {
        if (p.id !== action.playerId) return p;
        return { ...p, pivotUsed: true, side: p.side === "for" ? "against" : "for" } as Player;
      });
      return { ...state, players };
    }
    case "USE_CONSCIENCE": {
      const players = state.players.map((p) => {
        if (p.id !== action.playerId) return p;
        return { ...p, conscienceUsed: true, side: p.side === "for" ? "against" : "for" } as Player;
      });
      return { ...state, players };
    }
    case "TICK_CROWD":
      return {
        ...state,
        crowd: clampCrowd({
          forScore: state.crowd.forScore + action.forDelta,
          againstScore: state.crowd.againstScore + action.againstDelta,
        }),
      };
    case "AWARD_POINTS": {
      const players = state.players.map((p) => {
        if (p.id !== action.playerId) return p;
        return {
          ...p,
          points: p.points + action.pts,
          commendations: action.commendation ? p.commendations + 1 : p.commendations,
          perfectFlip: action.perfectFlip ? true : p.perfectFlip,
        };
      });
      return { ...state, players };
    }
    default:
      return state;
  }
}

function clampCrowd(c: CrowdMeter): CrowdMeter {
  return {
    forScore: Math.max(0, Math.min(100, c.forScore)),
    againstScore: Math.max(0, Math.min(100, c.againstScore)),
  };
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const DebateContext = createContext<Ctx | null>(null);

export const DebateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `db-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          side: state.players.length % 2 === 0 ? "for" : "against",
          points: 0,
          commendations: 0,
          perfectFlip: false,
          heckleToken: true,
          pivotUsed: false,
          conscienceUsed: false,
          realBeliefSide: null,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <DebateContext.Provider value={value}>{children}</DebateContext.Provider>;
};

export function useDebate(): Ctx {
  const ctx = useContext(DebateContext);
  if (!ctx) throw new Error("useDebate must be inside provider");
  return ctx;
}

/* Rough rhetoric score - used by Crowd Reaction meter & Vizzy commendation */
export function scoreRhetoric(text: string): number {
  const length = text.trim().length;
  if (length === 0) return 0;
  let score = 4;
  if (length > 80) score += 1;
  if (length > 220) score += 1;
  if (/[?]/.test(text)) score += 1; // rhetorical questions
  if (/because|therefore|moreover|consider/i.test(text)) score += 1;
  if (/imagine|suppose|picture/i.test(text)) score += 1;
  if (/never|always|every|none/i.test(text)) score -= 1; // overstatement penalty
  if (length > 600) score -= 1; // rambled
  return Math.max(0, Math.min(10, score));
}
