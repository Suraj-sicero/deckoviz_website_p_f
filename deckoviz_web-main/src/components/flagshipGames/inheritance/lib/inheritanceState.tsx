"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from "react";
import type {
  FamilyArchive,
  FoundingAnswers,
  FamilyMember,
  Chapter,
  Heirloom,
  Letter,
  Player,
} from "./inheritanceTypes";

const STORAGE_KEY = "deckoviz.inheritance.v1";

export type Phase =
  | "intro"
  | "founding"
  | "founding-portrait"
  | "chapter-setup"
  | "chapter-play"
  | "archival-entry"
  | "library";

export interface State {
  phase: Phase;
  players: Player[];
  archive: FamilyArchive | null;
  pendingChapterTypeHint: string | null;
}

function persistedArchive(): FamilyArchive | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FamilyArchive;
  } catch {
    return null;
  }
}

function persistArchive(archive: FamilyArchive | null) {
  try {
    if (archive) localStorage.setItem(STORAGE_KEY, JSON.stringify(archive));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop — localStorage might be disabled */
  }
}

export type Action =
  | { type: "RESET_SESSION" }
  | { type: "DELETE_ARCHIVE" }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "SET_ARCHIVE"; archive: FamilyArchive }
  | { type: "GOTO"; phase: Phase }
  | { type: "RECORD_FOUNDING"; answers: FoundingAnswers; portrait: FamilyArchive["foundingPortrait"]; founders: FamilyMember[] }
  | { type: "ADD_MEMBER"; member: FamilyMember }
  | { type: "UPDATE_MEMBER"; member: FamilyMember }
  | { type: "ADD_CHAPTER"; chapter: Chapter }
  | { type: "ADD_HEIRLOOM"; heirloom: Heirloom }
  | { type: "ADD_LETTER"; letter: Letter }
  | { type: "AWARD_LEGACY"; pts: number }
  | { type: "PICK_NEXT_CHAPTER_HINT"; hint: string | null };

const COLORS = ["#fbbf24", "#a78bfa", "#f472b6", "#34d399", "#60a5fa"];

const initialArchive = persistedArchive();

const initialState: State = {
  phase: initialArchive ? "library" : "intro",
  players: [],
  archive: initialArchive,
  pendingChapterTypeHint: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET_SESSION":
      return { ...state, players: [], phase: state.archive ? "library" : "intro" };
    case "DELETE_ARCHIVE":
      return { ...state, archive: null, phase: "intro" };
    case "ADD_PLAYER":
      if (state.players.length >= 5) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "SET_ARCHIVE":
      return { ...state, archive: action.archive };
    case "GOTO":
      return { ...state, phase: action.phase };
    case "RECORD_FOUNDING": {
      const archive: FamilyArchive = {
        id: `family-${Date.now()}`,
        surname: action.answers.surname,
        founding: action.answers,
        foundingPortrait: action.portrait,
        members: action.founders,
        chapters: [],
        heirlooms: [],
        letters: [],
        legacyPoints: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      return { ...state, archive, phase: "founding-portrait" };
    }
    case "ADD_MEMBER":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          members: [...state.archive.members, action.member],
          updatedAt: Date.now(),
        },
      };
    case "UPDATE_MEMBER":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          members: state.archive.members.map((m) => (m.id === action.member.id ? action.member : m)),
          updatedAt: Date.now(),
        },
      };
    case "ADD_CHAPTER":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          chapters: [...state.archive.chapters, action.chapter],
          updatedAt: Date.now(),
        },
      };
    case "ADD_HEIRLOOM":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          heirlooms: [...state.archive.heirlooms, action.heirloom],
          updatedAt: Date.now(),
        },
      };
    case "ADD_LETTER":
      if (!state.archive) return state;
      return {
        ...state,
        archive: {
          ...state.archive,
          letters: [...state.archive.letters, action.letter],
          updatedAt: Date.now(),
        },
      };
    case "AWARD_LEGACY":
      if (!state.archive) return state;
      return {
        ...state,
        archive: { ...state.archive, legacyPoints: state.archive.legacyPoints + action.pts, updatedAt: Date.now() },
      };
    case "PICK_NEXT_CHAPTER_HINT":
      return { ...state, pendingChapterTypeHint: action.hint };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const InheritanceContext = createContext<Ctx | null>(null);

export const InheritanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist archive on change
  useEffect(() => {
    persistArchive(state.archive);
  }, [state.archive]);

  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `ih-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          privateNotes: [],
        },
      });
    },
    [state.players.length],
  );

  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <InheritanceContext.Provider value={value}>{children}</InheritanceContext.Provider>;
};

export function useInheritance(): Ctx {
  const ctx = useContext(InheritanceContext);
  if (!ctx) throw new Error("useInheritance must be inside provider");
  return ctx;
}
