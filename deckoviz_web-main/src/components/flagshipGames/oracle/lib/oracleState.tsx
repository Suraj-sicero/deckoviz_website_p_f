"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { Depth } from "./depths";

export type Phase =
  | "lobby"
  | "intro"
  | "submission"
  | "reveal"
  | "answering"
  | "reading"
  | "discussion"
  | "guessing"
  | "asker-reveal"
  | "last-question"
  | "closing"
  | "archive";

export interface Player {
  id: string;
  name: string;
  color: string;
  insightPoints: number;
  depthPoints: number;
  transparencyPoints: number;
  courageAwarded: boolean;
}

export interface QuestionEntry {
  id: string;
  text: string;
  authorId: string | "vizzy";
  isVizzy: boolean;
  isFromPassBack: boolean;
}

export interface AnswerEntry {
  id: string;
  questionId: string;
  authorId: string;
  text: string;
}

export interface GuessRecord {
  questionId: string;
  byPlayerId: string;
  guessedAuthorId: string;
  correct: boolean;
}

export interface State {
  phase: Phase;
  depth: Depth;
  players: Player[];
  pool: QuestionEntry[]; // unused questions to draw next from
  history: { question: QuestionEntry; answers: AnswerEntry[]; guesses: GuessRecord[] }[];
  current: { question: QuestionEntry | null; answers: AnswerEntry[]; readingIdx: number; guesses: GuessRecord[]; voterIdx: number };
  vizzyQuestionUsed: boolean;
  passBackUsed: boolean;
  totalQuestions: number;
  questionsAnswered: number;
  lastQuestionAnswers: AnswerEntry[];
  courageAwardedId: string | null;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_DEPTH"; depth: Depth }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "SUBMIT_QUESTION"; question: QuestionEntry }
  | { type: "BEGIN_NEXT_QUESTION" }
  | { type: "ANSWER"; answer: AnswerEntry }
  | { type: "BEGIN_READING" }
  | { type: "BUMP_READING" }
  | { type: "BEGIN_GUESSING" }
  | { type: "GUESS"; record: GuessRecord }
  | { type: "BUMP_VOTER" }
  | { type: "REVEAL_ASKER" }
  | { type: "ADD_PASSBACK"; question: QuestionEntry }
  | { type: "QUEUE_VIZZY_QUESTION"; question: QuestionEntry }
  | { type: "BEGIN_LAST_QUESTION"; question: QuestionEntry }
  | { type: "LAST_ANSWER"; answer: AnswerEntry }
  | { type: "GO_CLOSING" }
  | { type: "GO_ARCHIVE" }
  | { type: "AWARD_DEPTH"; playerId: string }
  | { type: "AWARD_COURAGE"; playerId: string }
  | { type: "GOTO"; phase: Phase };

const COLORS = ["#5eead4", "#a78bfa", "#fbbf24", "#f472b6", "#34d399", "#60a5fa"];

export const initialState: State = {
  phase: "lobby",
  depth: "middle",
  players: [],
  pool: [],
  history: [],
  current: { question: null, answers: [], readingIdx: 0, guesses: [], voterIdx: 0 },
  vizzyQuestionUsed: false,
  passBackUsed: false,
  totalQuestions: 7,
  questionsAnswered: 0,
  lastQuestionAnswers: [],
  courageAwardedId: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_DEPTH":
      return { ...state, depth: action.depth };
    case "ADD_PLAYER":
      if (state.players.length >= 6) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "submission" };
    case "SUBMIT_QUESTION":
      return { ...state, pool: [...state.pool, action.question] };
    case "BEGIN_NEXT_QUESTION": {
      // pull a non-vizzy question first; save vizzy for second-to-last
      const remaining = state.totalQuestions - state.questionsAnswered;
      const needVizzy = remaining === 2 && !state.vizzyQuestionUsed && state.pool.some((q) => q.isVizzy);
      const idx = state.pool.findIndex((q) => (needVizzy ? q.isVizzy : !q.isVizzy));
      const fallbackIdx = idx >= 0 ? idx : 0;
      const question = state.pool[fallbackIdx];
      if (!question) return state;
      const pool = state.pool.filter((_, i) => i !== fallbackIdx);
      return {
        ...state,
        pool,
        phase: "reveal",
        current: { question, answers: [], readingIdx: 0, guesses: [], voterIdx: 0 },
        vizzyQuestionUsed: state.vizzyQuestionUsed || question.isVizzy,
      };
    }
    case "ANSWER":
      return {
        ...state,
        current: {
          ...state.current,
          answers: [...state.current.answers.filter((a) => a.authorId !== action.answer.authorId), action.answer],
        },
      };
    case "BEGIN_READING":
      return { ...state, phase: "reading", current: { ...state.current, readingIdx: 0 } };
    case "BUMP_READING":
      return { ...state, current: { ...state.current, readingIdx: state.current.readingIdx + 1 } };
    case "BEGIN_GUESSING":
      return { ...state, phase: "guessing", current: { ...state.current, voterIdx: 0 } };
    case "GUESS": {
      const guesses = [...state.current.guesses, action.record];
      const players = action.record.correct
        ? state.players.map((p) => (p.id === action.record.byPlayerId ? { ...p, insightPoints: p.insightPoints + 1 } : p))
        : state.players;
      return { ...state, current: { ...state.current, guesses }, players };
    }
    case "BUMP_VOTER":
      return { ...state, current: { ...state.current, voterIdx: state.current.voterIdx + 1 } };
    case "REVEAL_ASKER": {
      // resolve transparency points
      const q = state.current.question;
      if (!q) return state;
      const correctGuesses = state.current.guesses.filter((g) => g.correct).length;
      const players = state.players.map((p) => {
        if (q.isVizzy) return p;
        if (p.id !== q.authorId) return p;
        if (correctGuesses > state.players.length / 2) {
          return { ...p, transparencyPoints: p.transparencyPoints + 2 };
        }
        return p;
      });
      const history = [...state.history, { question: q, answers: state.current.answers, guesses: state.current.guesses }];
      const questionsAnswered = state.questionsAnswered + 1;
      return {
        ...state,
        players,
        history,
        questionsAnswered,
        phase: "asker-reveal",
      };
    }
    case "ADD_PASSBACK":
      return { ...state, pool: [action.question, ...state.pool], passBackUsed: true };
    case "QUEUE_VIZZY_QUESTION":
      return { ...state, pool: [...state.pool, action.question] };
    case "BEGIN_LAST_QUESTION":
      return {
        ...state,
        phase: "last-question",
        current: { question: action.question, answers: [], readingIdx: 0, guesses: [], voterIdx: 0 },
      };
    case "LAST_ANSWER":
      return { ...state, lastQuestionAnswers: [...state.lastQuestionAnswers, action.answer] };
    case "GO_CLOSING":
      return { ...state, phase: "closing" };
    case "GO_ARCHIVE":
      return { ...state, phase: "archive" };
    case "AWARD_DEPTH": {
      const players = state.players.map((p) => (p.id === action.playerId ? { ...p, depthPoints: p.depthPoints + 1 } : p));
      return { ...state, players };
    }
    case "AWARD_COURAGE":
      return {
        ...state,
        courageAwardedId: action.playerId,
        players: state.players.map((p) => (p.id === action.playerId ? { ...p, courageAwarded: true } : p)),
      };
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

const OracleContext = createContext<Ctx | null>(null);

export const OracleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `or-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          insightPoints: 0,
          depthPoints: 0,
          transparencyPoints: 0,
          courageAwarded: false,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <OracleContext.Provider value={value}>{children}</OracleContext.Provider>;
};

export function useOracle(): Ctx {
  const ctx = useContext(OracleContext);
  if (!ctx) throw new Error("useOracle must be inside provider");
  return ctx;
}
