"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { MuseumTheme, Medium } from "./themes";

export type Phase =
  | "lobby"
  | "intro"
  | "prompt"
  | "creating"
  | "revealing"
  | "sharing"
  | "anonymous-guess"
  | "vizzy-piece"
  | "curation"
  | "curator-note"
  | "final-wall";

export interface Player {
  id: string;
  name: string;
  color: string;
  presenceMoments: number;
}

export interface Artwork {
  id: string;
  playerId: string | "vizzy";
  round: number;
  prompt: string;
  title: string;
  medium: Medium;
  description: string;
  anonymous: boolean;
  art: { background: string; overlay: string };
  notes?: string;
  createdAt: number;
}

export interface State {
  phase: Phase;
  theme: MuseumTheme | null;
  players: Player[];
  rounds: { round: number; prompt: string; anonymous: boolean }[];
  round: number; // 1-indexed
  totalRounds: number;
  anonymousRoundNumber: number | null;
  artworks: Artwork[];
  currentArtworkIdx: number;
  museumName: string | null;
  curatorNote: string | null;
  vizzyContributed: boolean;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_THEME"; theme: MuseumTheme }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_ROUND"; prompt: string; anonymous: boolean }
  | { type: "SUBMIT_ARTWORK"; artwork: Artwork }
  | { type: "BEGIN_REVEAL" }
  | { type: "BUMP_REVEAL" }
  | { type: "GOTO_SHARING" }
  | { type: "GOTO_ANON_GUESS" }
  | { type: "MARK_PRESENCE"; playerId: string }
  | { type: "ADD_VIZZY_PIECE"; artwork: Artwork }
  | { type: "GOTO_CURATION" }
  | { type: "GOTO_CURATOR_NOTE" }
  | { type: "SET_MUSEUM_NAME"; name: string }
  | { type: "SET_CURATOR_NOTE"; note: string }
  | { type: "GOTO_FINAL_WALL" }
  | { type: "ADVANCE_ROUND" }
  | { type: "GOTO"; phase: Phase };

const COLORS = ["#fbbf24", "#a78bfa", "#f472b6", "#34d399", "#60a5fa", "#fb7185"];

export const initialState: State = {
  phase: "lobby",
  theme: null,
  players: [],
  rounds: [],
  round: 0,
  totalRounds: 4,
  anonymousRoundNumber: null,
  artworks: [],
  currentArtworkIdx: 0,
  museumName: null,
  curatorNote: null,
  vizzyContributed: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "ADD_PLAYER":
      if (state.players.length >= 6) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START": {
      // pick anonymous round randomly among rounds 2 .. totalRounds
      const r = state.totalRounds >= 2 ? 2 + Math.floor(Math.random() * (state.totalRounds - 1)) : 1;
      return { ...state, phase: "intro", anonymousRoundNumber: r };
    }
    case "BEGIN_ROUND":
      return {
        ...state,
        phase: "prompt",
        round: state.round + 1,
        rounds: [...state.rounds, { round: state.round + 1, prompt: action.prompt, anonymous: action.anonymous }],
        currentArtworkIdx: 0,
      };
    case "SUBMIT_ARTWORK":
      if (state.artworks.some((a) => a.round === state.round && a.playerId === action.artwork.playerId)) {
        return state;
      }
      return { ...state, artworks: [...state.artworks, action.artwork] };
    case "BEGIN_REVEAL":
      return { ...state, phase: "revealing", currentArtworkIdx: 0 };
    case "BUMP_REVEAL":
      return { ...state, currentArtworkIdx: state.currentArtworkIdx + 1 };
    case "GOTO_SHARING":
      return { ...state, phase: "sharing" };
    case "GOTO_ANON_GUESS":
      return { ...state, phase: "anonymous-guess" };
    case "MARK_PRESENCE": {
      const players = state.players.map((p) =>
        p.id === action.playerId ? { ...p, presenceMoments: p.presenceMoments + 1 } : p,
      );
      return { ...state, players };
    }
    case "ADD_VIZZY_PIECE":
      return {
        ...state,
        artworks: [...state.artworks, action.artwork],
        vizzyContributed: true,
        phase: "vizzy-piece",
      };
    case "GOTO_CURATION":
      return { ...state, phase: "curation" };
    case "GOTO_CURATOR_NOTE":
      return { ...state, phase: "curator-note" };
    case "SET_MUSEUM_NAME":
      return { ...state, museumName: action.name };
    case "SET_CURATOR_NOTE":
      return { ...state, curatorNote: action.note };
    case "GOTO_FINAL_WALL":
      return { ...state, phase: "final-wall" };
    case "ADVANCE_ROUND":
      if (state.round >= state.totalRounds) {
        return { ...state, phase: "vizzy-piece" };
      }
      return { ...state, phase: "prompt" };
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

const MuseumContext = createContext<Ctx | null>(null);

export const MuseumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `mu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          presenceMoments: 0,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <MuseumContext.Provider value={value}>{children}</MuseumContext.Provider>;
};

export function useMuseum(): Ctx {
  const ctx = useContext(MuseumContext);
  if (!ctx) throw new Error("useMuseum must be inside provider");
  return ctx;
}
