"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { WorldSeed } from "./worldSeeds";

export type Phase =
  | "lobby"
  | "intro"
  | "geography"
  | "atmosphere"
  | "inhabitants"
  | "secret"
  | "final"
  | "library";

export interface Player {
  id: string;
  name: string;
  color: string;
  badges: string[];
  contributions: Record<Exclude<Phase, "lobby" | "intro" | "final" | "library">, number>;
}

export interface Contribution {
  id: string;
  playerId: string;
  phase: Exclude<Phase, "lobby" | "intro" | "final" | "library">;
  text: string;
  createdAt: number;
}

export interface SavedWorld {
  id: string;
  name: string;
  seed: WorldSeed;
  contributions: Contribution[];
  poeticDescription: string;
  secrets: Contribution[];
  finalScene: { background: string; overlay: string };
  savedAt: number;
}

export interface State {
  phase: Phase;
  mode: "multiplayer" | "solo";
  seed: WorldSeed | null;
  players: Player[];
  currentPlayerIdx: number;
  contributions: Contribution[];
  finalName: string | null;
  poeticDescription: string | null;
  chosenSecretId: string | null;
  library: SavedWorld[];
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_MODE"; mode: State["mode"] }
  | { type: "SET_SEED"; seed: WorldSeed }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "ADVANCE_PHASE" }
  | { type: "BUMP_TURN" }
  | { type: "ADD_CONTRIBUTION"; contribution: Contribution }
  | { type: "FINALIZE"; name: string; description: string; chosenSecretId: string | null }
  | { type: "SAVE_TO_LIBRARY"; world: SavedWorld }
  | { type: "GOTO"; phase: Phase };

const COLORS = ["#34d399", "#a78bfa", "#fbbf24", "#22d3ee", "#f472b6"];

function nextPhase(p: Phase): Phase {
  const order: Phase[] = ["lobby", "intro", "geography", "atmosphere", "inhabitants", "secret", "final", "library"];
  const i = order.indexOf(p);
  return order[Math.min(i + 1, order.length - 1)];
}

export const initialState: State = {
  phase: "lobby",
  mode: "multiplayer",
  seed: null,
  players: [],
  currentPlayerIdx: 0,
  contributions: [],
  finalName: null,
  poeticDescription: null,
  chosenSecretId: null,
  library: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { ...initialState, library: state.library };
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "SET_SEED":
      return { ...state, seed: action.seed };
    case "ADD_PLAYER":
      if (state.players.length >= 5) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "intro" };
    case "ADVANCE_PHASE":
      return { ...state, phase: nextPhase(state.phase), currentPlayerIdx: 0 };
    case "BUMP_TURN":
      if (state.players.length === 0) return state;
      return { ...state, currentPlayerIdx: (state.currentPlayerIdx + 1) % state.players.length };
    case "ADD_CONTRIBUTION": {
      const players = state.players.map((p) => {
        if (p.id !== action.contribution.playerId) return p;
        return {
          ...p,
          contributions: {
            ...p.contributions,
            [action.contribution.phase]: (p.contributions[action.contribution.phase] ?? 0) + 1,
          },
        };
      });
      return { ...state, contributions: [...state.contributions, action.contribution], players };
    }
    case "FINALIZE":
      return {
        ...state,
        phase: "final",
        finalName: action.name,
        poeticDescription: action.description,
        chosenSecretId: action.chosenSecretId,
      };
    case "SAVE_TO_LIBRARY":
      return { ...state, library: [action.world, ...state.library], phase: "library" };
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

const DreamArchitectContext = createContext<Ctx | null>(null);

export const DreamArchitectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `da-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          badges: [],
          contributions: { geography: 0, atmosphere: 0, inhabitants: 0, secret: 0 },
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <DreamArchitectContext.Provider value={value}>{children}</DreamArchitectContext.Provider>;
};

export function useDreamArchitect(): Ctx {
  const ctx = useContext(DreamArchitectContext);
  if (!ctx) throw new Error("useDreamArchitect must be inside provider");
  return ctx;
}
