"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import type { Genre } from "./genres";
import type { Twist } from "./twistEngine";
import type { SceneIllustration, ArchetypeAssignment } from "./mockAI";

export type GamePhase =
  | "lobby"
  | "opening"
  | "round"
  | "twist"
  | "vote"
  | "ending-vote"
  | "ending"
  | "storybook";

export interface Player {
  id: string;
  name: string;
  color: string;
  ready: boolean;
  resonance: number;
}

export interface StorySentence {
  id: string;
  playerId: string;
  text: string;
  round: number;
  voteCount: number;
}

export interface RoundRecord {
  round: number;
  sentences: StorySentence[];
  twist: Twist | null;
  scene: SceneIllustration | null;
}

export interface StoryForgeState {
  phase: GamePhase;
  mode: "multiplayer" | "solo";
  genre: Genre | null;
  players: Player[];
  currentPlayerIdx: number;
  roundLimit: number;
  round: number; // 1-indexed
  sentences: StorySentence[];
  rounds: RoundRecord[];
  activeTwist: Twist | null;
  twistsUsed: string[];
  pendingScene: SceneIllustration | null;
  votingOpenForRound: number | null;
  endingTone: "triumphant" | "ambiguous" | "tragic" | "surprising" | null;
  endingText: string | null;
  storyTitle: string | null;
  archetypes: ArchetypeAssignment[];
  roomCode: string;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_GENRE"; genre: Genre }
  | { type: "SET_MODE"; mode: "multiplayer" | "solo" }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "TOGGLE_READY"; id: string }
  | { type: "START_GAME" }
  | { type: "BEGIN_ROUNDS" }
  | { type: "SUBMIT_SENTENCE"; sentence: StorySentence }
  | { type: "BUMP_TURN" }
  | { type: "SET_SCENE"; scene: SceneIllustration }
  | { type: "APPLY_TWIST"; twist: Twist }
  | { type: "OPEN_VOTING"; round: number }
  | { type: "CAST_VOTE"; sentenceId: string }
  | { type: "CLOSE_VOTING" }
  | { type: "ADVANCE_ROUND" }
  | { type: "EXTEND_ROUNDS" }
  | { type: "ENTER_ENDING_VOTE" }
  | { type: "SET_ENDING_TONE"; tone: StoryForgeState["endingTone"] }
  | { type: "SET_ENDING"; text: string; title: string; archetypes: ArchetypeAssignment[]; scene: SceneIllustration }
  | { type: "GOTO_STORYBOOK" };

const PLAYER_COLORS = [
  "#a78bfa",
  "#22d3ee",
  "#f472b6",
  "#fbbf24",
  "#10b981",
  "#fb7185",
];

function randomRoomCode(): string {
  const letters = "ACDEFGHJKLMNPQRTUVWXY";
  return Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

export const initialState: StoryForgeState = {
  phase: "lobby",
  mode: "multiplayer",
  genre: null,
  players: [],
  currentPlayerIdx: 0,
  roundLimit: 5,
  round: 0,
  sentences: [],
  rounds: [],
  activeTwist: null,
  twistsUsed: [],
  pendingScene: null,
  votingOpenForRound: null,
  endingTone: null,
  endingText: null,
  storyTitle: null,
  archetypes: [],
  roomCode: randomRoomCode(),
};

function reducer(state: StoryForgeState, action: Action): StoryForgeState {
  switch (action.type) {
    case "RESET":
      return { ...initialState, roomCode: randomRoomCode() };
    case "SET_GENRE":
      return { ...state, genre: action.genre };
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "ADD_PLAYER":
      if (state.players.length >= 6) return state;
      if (state.players.some((p) => p.id === action.player.id)) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "TOGGLE_READY":
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.id ? { ...p, ready: !p.ready } : p,
        ),
      };
    case "START_GAME":
      return { ...state, phase: "opening" };
    case "BEGIN_ROUNDS":
      return { ...state, phase: "round", round: 1, currentPlayerIdx: 0 };
    case "SUBMIT_SENTENCE": {
      const newSentences = [...state.sentences, action.sentence];
      return {
        ...state,
        sentences: newSentences,
      };
    }
    case "BUMP_TURN": {
      if (state.players.length === 0) return state;
      const next = (state.currentPlayerIdx + 1) % state.players.length;
      return { ...state, currentPlayerIdx: next };
    }
    case "SET_SCENE":
      return { ...state, pendingScene: action.scene };
    case "APPLY_TWIST":
      return {
        ...state,
        phase: "twist",
        activeTwist: action.twist,
        twistsUsed: [...state.twistsUsed, action.twist.id],
      };
    case "OPEN_VOTING":
      return { ...state, phase: "vote", votingOpenForRound: action.round };
    case "CAST_VOTE": {
      const sentences = state.sentences.map((s) =>
        s.id === action.sentenceId ? { ...s, voteCount: s.voteCount + 1 } : s,
      );
      const target = sentences.find((s) => s.id === action.sentenceId);
      const players = state.players.map((p) =>
        target && p.id === target.playerId ? { ...p, resonance: p.resonance + 1 } : p,
      );
      return { ...state, sentences, players };
    }
    case "CLOSE_VOTING":
      return { ...state, votingOpenForRound: null };
    case "ADVANCE_ROUND": {
      const completedRound: RoundRecord = {
        round: state.round,
        sentences: state.sentences.filter((s) => s.round === state.round),
        twist: state.activeTwist,
        scene: state.pendingScene,
      };
      const nextRound = state.round + 1;
      return {
        ...state,
        rounds: [...state.rounds, completedRound],
        round: nextRound,
        currentPlayerIdx: 0,
        phase: nextRound > state.roundLimit ? "ending-vote" : "round",
      };
    }
    case "EXTEND_ROUNDS":
      return { ...state, roundLimit: state.roundLimit + 2 };
    case "ENTER_ENDING_VOTE":
      return { ...state, phase: "ending-vote" };
    case "SET_ENDING_TONE":
      return { ...state, endingTone: action.tone };
    case "SET_ENDING":
      return {
        ...state,
        phase: "ending",
        endingText: action.text,
        storyTitle: action.title,
        archetypes: action.archetypes,
        pendingScene: action.scene,
      };
    case "GOTO_STORYBOOK":
      return { ...state, phase: "storybook" };
    default:
      return state;
  }
}

interface StoryForgeContextValue {
  state: StoryForgeState;
  dispatch: React.Dispatch<Action>;
  helpers: {
    activePlayer: Player | null;
    advanceTurn: () => void;
    isRoundComplete: boolean;
    addPlayer: (name: string) => void;
  };
}

const StoryForgeContext = createContext<StoryForgeContextValue | null>(null);

export const StoryForgeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const activePlayer = state.players[state.currentPlayerIdx] ?? null;
  const submittedThisRound = state.sentences.filter((s) => s.round === state.round).length;
  const isRoundComplete = state.players.length > 0 && submittedThisRound >= state.players.length;

  const advanceTurn = useCallback(() => {
    dispatch({ type: "BUMP_TURN" });
  }, []);

  const addPlayer = useCallback(
    (name: string) => {
      const id = `player-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const color = PLAYER_COLORS[state.players.length % PLAYER_COLORS.length];
      dispatch({
        type: "ADD_PLAYER",
        player: { id, name, color, ready: false, resonance: 0 },
      });
    },
    [state.players.length],
  );

  const value = useMemo<StoryForgeContextValue>(
    () => ({
      state,
      dispatch,
      helpers: { activePlayer, advanceTurn, isRoundComplete, addPlayer },
    }),
    [state, activePlayer, advanceTurn, isRoundComplete, addPlayer],
  );

  return (
    <StoryForgeContext.Provider value={value}>{children}</StoryForgeContext.Provider>
  );
};

export function useStoryForge(): StoryForgeContextValue {
  const ctx = useContext(StoryForgeContext);
  if (!ctx) {
    throw new Error("useStoryForge must be used within StoryForgeProvider");
  }
  return ctx;
}
