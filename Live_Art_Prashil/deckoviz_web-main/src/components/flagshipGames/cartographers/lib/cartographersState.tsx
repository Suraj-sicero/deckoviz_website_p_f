"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from "react";
import type {
  Player,
  WorldArchive,
  FoundingAnswers,
  LoreEntry,
  OpenQuestion,
  Contradiction,
  WorldEvent,
  Expedition,
  MapLayer,
} from "./cartographersTypes";

const STORAGE_KEY = "deckoviz.cartographers.v1";

export type Phase =
  | "intro"
  | "founding"
  | "atlas"
  | "expedition-pick"
  | "expedition-play"
  | "world-event"
  | "contradiction";

export interface State {
  phase: Phase;
  players: Player[];
  archive: WorldArchive | null;
  pendingExpeditionKind: string | null;
}

function persistedArchive(): WorldArchive | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WorldArchive;
  } catch {
    return null;
  }
}
function persistArchive(a: WorldArchive | null) {
  try {
    if (a) localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export type Action =
  | { type: "RESET_SESSION" }
  | { type: "DELETE_ARCHIVE" }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "GOTO"; phase: Phase }
  | { type: "RECORD_FOUNDING"; name: string; answers: FoundingAnswers; layers: MapLayer[]; loreEntry: LoreEntry; seedQuestions: OpenQuestion[] }
  | { type: "PICK_EXPEDITION"; kind: string | null }
  | { type: "ADD_EXPEDITION"; expedition: Expedition; lore: LoreEntry[]; layers: MapLayer[]; depthBumps: Partial<WorldArchive["depth"]>; questions: OpenQuestion[] }
  | { type: "ADD_WORLD_EVENT"; event: WorldEvent; lore: LoreEntry }
  | { type: "ADD_CONTRADICTION"; contradiction: Contradiction }
  | { type: "RESOLVE_CONTRADICTION"; id: string; status: Contradiction["status"] }
  | { type: "TOGGLE_QUESTION_PIN"; id: string }
  | { type: "ADD_QUESTION"; question: OpenQuestion };

const COLORS = ["#fbbf24", "#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#60a5fa"];

const initialArchive = persistedArchive();
const initialState: State = {
  phase: initialArchive ? "atlas" : "intro",
  players: [],
  archive: initialArchive,
  pendingExpeditionKind: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET_SESSION":
      return { ...state, players: [], phase: state.archive ? "atlas" : "intro" };
    case "DELETE_ARCHIVE":
      return { ...state, archive: null, phase: "intro" };
    case "ADD_PLAYER":
      if (state.players.length >= 6) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "GOTO":
      return { ...state, phase: action.phase };
    case "RECORD_FOUNDING": {
      const archive: WorldArchive = {
        id: `world-${Date.now()}`,
        name: action.name,
        founding: action.answers,
        layers: action.layers,
        lore: [action.loreEntry],
        questions: action.seedQuestions,
        contradictions: [],
        events: [],
        expeditions: [],
        depth: { geography: 2, people: 0, history: 0, mythology: 0, culture: 0, mystery: 1 },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return { ...state, archive, phase: "atlas" };
    }
    case "PICK_EXPEDITION":
      return { ...state, pendingExpeditionKind: action.kind };
    case "ADD_EXPEDITION": {
      if (!state.archive) return state;
      const depth = { ...state.archive.depth };
      Object.entries(action.depthBumps).forEach(([k, v]) => {
        const key = k as keyof typeof depth;
        depth[key] = Math.min(10, (depth[key] ?? 0) + (v ?? 0));
      });
      const archive: WorldArchive = {
        ...state.archive,
        layers: [...state.archive.layers, ...action.layers],
        lore: [...state.archive.lore, ...action.lore],
        questions: [...state.archive.questions, ...action.questions],
        expeditions: [...state.archive.expeditions, action.expedition],
        depth,
        updatedAt: Date.now(),
      };
      return { ...state, archive, phase: "atlas", pendingExpeditionKind: null };
    }
    case "ADD_WORLD_EVENT":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          events: [...state.archive.events, action.event],
          lore: [...state.archive.lore, action.lore],
          updatedAt: Date.now(),
        },
        phase: "world-event",
      };
    case "ADD_CONTRADICTION":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          contradictions: [...state.archive.contradictions, action.contradiction],
          updatedAt: Date.now(),
        },
        phase: "contradiction",
      };
    case "RESOLVE_CONTRADICTION":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          contradictions: state.archive.contradictions.map((c) =>
            c.id === action.id ? { ...c, status: action.status } : c,
          ),
          updatedAt: Date.now(),
        },
      };
    case "TOGGLE_QUESTION_PIN":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          questions: state.archive.questions.map((q) =>
            q.id === action.id ? { ...q, pinned: !q.pinned } : q,
          ),
          updatedAt: Date.now(),
        },
      };
    case "ADD_QUESTION":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          questions: [...state.archive.questions, action.question],
          updatedAt: Date.now(),
        },
      };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const CartographersContext = createContext<Ctx | null>(null);

export const CartographersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    persistArchive(state.archive);
  }, [state.archive]);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `cg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <CartographersContext.Provider value={value}>{children}</CartographersContext.Provider>;
};

export function useCartographers(): Ctx {
  const ctx = useContext(CartographersContext);
  if (!ctx) throw new Error("useCartographers must be inside provider");
  return ctx;
}
