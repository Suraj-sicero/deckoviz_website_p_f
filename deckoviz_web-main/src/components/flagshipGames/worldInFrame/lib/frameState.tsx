"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { SceneStyle, SceneRecord, WritingFormat } from "./scenes";

export type Phase =
  | "lobby"
  | "intro"
  | "observation"
  | "writing"
  | "reading"
  | "voting"
  | "commentary"
  | "detail-hunt"
  | "the-return"
  | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  points: number;
  vizzyPicks: number;
  haikuPoints: number;
  steadyVoiceCount: number;
}

export interface Submission {
  id: string;
  playerId: string;
  round: number;
  text: string;
  voteCount: number;
}

export interface VizzySentence {
  round: number;
  text: string;
}

export interface DetailHuntEntry {
  id: string;
  playerId: string;
  text: string;
  voteCount: number;
}

export interface RoundRecord {
  round: number;
  scene: SceneRecord;
  format: WritingFormat;
  submissions: Submission[];
  winnerId: string | null;
  vizzyPickId: string | null;
}

export interface State {
  phase: Phase;
  style: SceneStyle | null;
  players: Player[];
  round: number;
  roundLimit: number;
  scene: SceneRecord | null;
  format: WritingFormat | null;
  observationDeadline: number | null;
  writingDeadline: number | null;
  submissions: Submission[];
  rounds: RoundRecord[];
  readingIdx: number;
  votingIdx: number;
  vizzySentences: VizzySentence[];
  detailHuntUsed: boolean;
  detailHuntEntries: DetailHuntEntry[];
  finalReturnSentences: Submission[];
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_STYLE"; style: SceneStyle }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_OBSERVATION"; scene: SceneRecord; deadline: number }
  | { type: "BEGIN_WRITING"; format: WritingFormat; deadline: number }
  | { type: "SUBMIT"; submission: Submission }
  | { type: "BEGIN_READING" }
  | { type: "BUMP_READING" }
  | { type: "BEGIN_VOTING" }
  | { type: "CAST_VOTE"; submissionId: string }
  | { type: "BUMP_VOTER" }
  | { type: "FINALIZE_ROUND"; winnerId: string | null; vizzyPickId: string | null; vizzySentence: string }
  | { type: "BEGIN_DETAIL_HUNT" }
  | { type: "DETAIL_SUBMIT"; entry: DetailHuntEntry }
  | { type: "DETAIL_VOTE"; entryId: string }
  | { type: "END_DETAIL_HUNT"; winnerId: string | null }
  | { type: "BEGIN_RETURN" }
  | { type: "RETURN_SUBMIT"; submission: Submission }
  | { type: "ADVANCE" }
  | { type: "GOTO"; phase: Phase };

const COLORS = ["#cbd5e1", "#fbbf24", "#a78bfa", "#34d399", "#f472b6", "#60a5fa", "#fb7185"];

export const initialState: State = {
  phase: "lobby",
  style: null,
  players: [],
  round: 0,
  roundLimit: 6,
  scene: null,
  format: null,
  observationDeadline: null,
  writingDeadline: null,
  submissions: [],
  rounds: [],
  readingIdx: 0,
  votingIdx: 0,
  vizzySentences: [],
  detailHuntUsed: false,
  detailHuntEntries: [],
  finalReturnSentences: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_STYLE":
      return { ...state, style: action.style };
    case "ADD_PLAYER":
      if (state.players.length >= 7) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "intro", round: 0 };
    case "BEGIN_OBSERVATION":
      return {
        ...state,
        phase: "observation",
        round: state.round + 1,
        scene: action.scene,
        format: null,
        observationDeadline: action.deadline,
        writingDeadline: null,
      };
    case "BEGIN_WRITING":
      return { ...state, phase: "writing", format: action.format, writingDeadline: action.deadline };
    case "SUBMIT":
      if (state.submissions.some((s) => s.round === action.submission.round && s.playerId === action.submission.playerId)) {
        return state;
      }
      return { ...state, submissions: [...state.submissions, action.submission] };
    case "BEGIN_READING":
      return { ...state, phase: "reading", readingIdx: 0 };
    case "BUMP_READING":
      return { ...state, readingIdx: state.readingIdx + 1 };
    case "BEGIN_VOTING":
      return { ...state, phase: "voting", votingIdx: 0 };
    case "CAST_VOTE": {
      const submissions = state.submissions.map((s) =>
        s.id === action.submissionId ? { ...s, voteCount: s.voteCount + 1 } : s,
      );
      return { ...state, submissions };
    }
    case "BUMP_VOTER":
      return { ...state, votingIdx: state.votingIdx + 1 };
    case "FINALIZE_ROUND": {
      const roundSubs = state.submissions.filter((s) => s.round === state.round);
      const players = state.players.map((p) => {
        let points = p.points;
        let vizzy = p.vizzyPicks;
        let haiku = p.haikuPoints;
        let steady = p.steadyVoiceCount;
        const mine = roundSubs.find((s) => s.playerId === p.id);
        if (mine) {
          points += mine.voteCount * 2;
          if (action.vizzyPickId === mine.id) {
            points += 1;
            vizzy += 1;
          }
          const wordCount = mine.text.split(/\s+/).filter(Boolean).length;
          if (wordCount < 10 && mine.voteCount >= 2) {
            haiku += 1;
          }
          if (mine.voteCount >= 1) steady += 1;
        }
        return { ...p, points, vizzyPicks: vizzy, haikuPoints: haiku, steadyVoiceCount: steady };
      });
      const record: RoundRecord = {
        round: state.round,
        scene: state.scene!,
        format: state.format!,
        submissions: roundSubs,
        winnerId: action.winnerId,
        vizzyPickId: action.vizzyPickId,
      };
      return {
        ...state,
        phase: "commentary",
        players,
        rounds: [...state.rounds, record],
        vizzySentences: [...state.vizzySentences, { round: state.round, text: action.vizzySentence }],
      };
    }
    case "BEGIN_DETAIL_HUNT":
      return { ...state, phase: "detail-hunt", detailHuntUsed: true, detailHuntEntries: [] };
    case "DETAIL_SUBMIT":
      return { ...state, detailHuntEntries: [...state.detailHuntEntries, action.entry] };
    case "DETAIL_VOTE": {
      const entries = state.detailHuntEntries.map((e) =>
        e.id === action.entryId ? { ...e, voteCount: e.voteCount + 1 } : e,
      );
      return { ...state, detailHuntEntries: entries };
    }
    case "END_DETAIL_HUNT": {
      const players = action.winnerId
        ? state.players.map((p) => (p.id === action.winnerId ? { ...p, points: p.points + 1 } : p))
        : state.players;
      return { ...state, players, phase: "writing" };
    }
    case "BEGIN_RETURN":
      return { ...state, phase: "the-return" };
    case "RETURN_SUBMIT":
      return { ...state, finalReturnSentences: [...state.finalReturnSentences, action.submission] };
    case "ADVANCE":
      if (state.round >= state.roundLimit) {
        return { ...state, phase: "the-return" };
      }
      return { ...state, phase: "observation" };
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

const FrameContext = createContext<Ctx | null>(null);

export const FrameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `wf-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          points: 0,
          vizzyPicks: 0,
          haikuPoints: 0,
          steadyVoiceCount: 0,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
};

export function useFrame(): Ctx {
  const ctx = useContext(FrameContext);
  if (!ctx) throw new Error("useFrame must be inside provider");
  return ctx;
}
