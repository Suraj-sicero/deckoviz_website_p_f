"use client";

import React, { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import type { ArtworkRecord, Difficulty } from "./artworkDb";

export type Phase =
  | "lobby"
  | "intro"
  | "reveal"
  | "bluff-writing"
  | "fact-reading"
  | "voting"
  | "results"
  | "leaderboard";

export interface Player {
  id: string;
  name: string;
  color: string;
  points: number;
  vizzyPoints: number; // bonus for catching Vizzy bluff or being caught by trap
  chaosPoints: number;
  perfectBluffs: number;
  doubleDownUsed: boolean;
  privateTruth: string | null; // the real fact handed to them this round
}

export interface FactCard {
  id: string;
  source: "player" | "vizzy" | "truth";
  authorId: string | null; // playerId, or null for truth/vizzy
  text: string;
  isTruth: boolean;
  doubleDown: boolean;
  voteCount: number;
  votersWhoChose: string[]; // playerIds
}

export interface RoundRecord {
  round: number;
  artwork: ArtworkRecord;
  facts: FactCard[];
  truthId: string;
  vizzyBluffId: string | null;
}

export interface State {
  phase: Phase;
  difficulty: Difficulty;
  vizzyBluffUsed: boolean;
  vizzyBluffsCaught: number; // times Vizzy fooled the room
  players: Player[];
  round: number;
  roundLimit: number;
  artwork: ArtworkRecord | null;
  truthHolderId: string | null; // player who got the real fact
  facts: FactCard[];
  factOrder: string[]; // shuffled order for reading
  readingIdx: number;
  rounds: RoundRecord[];
  votingIdx: number; // current voter for pass-the-device voting
  roomCode: string;
  trapBonusId: string | null;
}

export type Action =
  | { type: "RESET" }
  | { type: "SET_DIFFICULTY"; difficulty: Difficulty }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; id: string }
  | { type: "START" }
  | { type: "BEGIN_REVEAL"; artwork: ArtworkRecord; truthHolderId: string }
  | { type: "BEGIN_BLUFFING" }
  | { type: "SUBMIT_FACTS"; playerId: string; facts: FactCard[]; doubleDownFactId: string | null }
  | { type: "INJECT_TRUTH_CARD"; card: FactCard }
  | { type: "INJECT_VIZZY_BLUFF"; card: FactCard }
  | { type: "BEGIN_READING"; order: string[] }
  | { type: "BUMP_READING" }
  | { type: "BEGIN_VOTING" }
  | { type: "CAST_VOTE"; voterId: string; factId: string }
  | { type: "BUMP_VOTER" }
  | { type: "FINALIZE_ROUND"; trapBonusId: string | null }
  | { type: "USE_DOUBLE_DOWN"; playerId: string }
  | { type: "ADVANCE" };

const COLORS = ["#fbbf24", "#a78bfa", "#22d3ee", "#f472b6", "#34d399", "#fb7185", "#60a5fa", "#facc15"];

function randomRoom(): string {
  const letters = "ACDEFGHJKLMNPQRTUVWXY";
  return Array.from({ length: 5 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
}

export const initialState: State = {
  phase: "lobby",
  difficulty: "initiated",
  vizzyBluffUsed: false,
  vizzyBluffsCaught: 0,
  players: [],
  round: 0,
  roundLimit: 5,
  artwork: null,
  truthHolderId: null,
  facts: [],
  factOrder: [],
  readingIdx: 0,
  rounds: [],
  votingIdx: 0,
  roomCode: randomRoom(),
  trapBonusId: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { ...initialState, roomCode: randomRoom() };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.difficulty };
    case "ADD_PLAYER":
      if (state.players.length >= 8) return state;
      return { ...state, players: [...state.players, action.player] };
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "START":
      return { ...state, phase: "intro", round: 0 };
    case "BEGIN_REVEAL": {
      const players = state.players.map((p) => ({
        ...p,
        privateTruth: p.id === action.truthHolderId ? action.artwork.truths[0] : null,
      }));
      return {
        ...state,
        phase: "reveal",
        round: state.round + 1,
        artwork: action.artwork,
        truthHolderId: action.truthHolderId,
        facts: [],
        factOrder: [],
        readingIdx: 0,
        votingIdx: 0,
        trapBonusId: null,
        players,
      };
    }
    case "BEGIN_BLUFFING":
      return { ...state, phase: "bluff-writing" };
    case "SUBMIT_FACTS": {
      // Replace facts authored by this player for the current round
      const others = state.facts.filter((f) => f.authorId !== action.playerId);
      const newFacts = [...others, ...action.facts];
      let players = state.players;
      if (action.doubleDownFactId) {
        players = players.map((p) =>
          p.id === action.playerId ? { ...p, doubleDownUsed: true } : p,
        );
      }
      return { ...state, facts: newFacts, players };
    }
    case "INJECT_TRUTH_CARD":
      return { ...state, facts: [...state.facts, action.card] };
    case "INJECT_VIZZY_BLUFF":
      return { ...state, facts: [...state.facts, action.card], vizzyBluffUsed: true };
    case "BEGIN_READING":
      return { ...state, phase: "fact-reading", factOrder: action.order, readingIdx: 0 };
    case "BUMP_READING":
      return { ...state, readingIdx: state.readingIdx + 1 };
    case "BEGIN_VOTING":
      return { ...state, phase: "voting", votingIdx: 0 };
    case "CAST_VOTE": {
      const facts = state.facts.map((f) => {
        if (f.id !== action.factId) return f;
        return {
          ...f,
          voteCount: f.voteCount + 1,
          votersWhoChose: [...f.votersWhoChose, action.voterId],
        };
      });
      return { ...state, facts };
    }
    case "BUMP_VOTER":
      return { ...state, votingIdx: state.votingIdx + 1 };
    case "FINALIZE_ROUND": {
      const truthCard = state.facts.find((f) => f.isTruth);
      const vizzyCard = state.facts.find((f) => f.source === "vizzy");
      let vizzyBluffsCaught = state.vizzyBluffsCaught;
      if (vizzyCard && vizzyCard.voteCount > 0) vizzyBluffsCaught += 1;

      const players = state.players.map((p) => {
        let points = p.points;
        let vizzyPoints = p.vizzyPoints;
        let chaosPoints = p.chaosPoints;
        let perfectBluffs = p.perfectBluffs;

        // Truth detection: +2 if this player voted for the truth
        if (truthCard?.votersWhoChose.includes(p.id)) points += 2;

        // Vizzy bluff catch: +1 for not falling for Vizzy and instead voting truth
        if (vizzyCard && !vizzyCard.votersWhoChose.includes(p.id) && truthCard?.votersWhoChose.includes(p.id)) {
          // counted above already; no double-award
        }

        // Bluff success: +1 per vote on this player's fake facts
        const myFakes = state.facts.filter((f) => f.authorId === p.id && !f.isTruth);
        for (const f of myFakes) {
          const votesGained = f.voteCount;
          points += votesGained;
          // Perfect bluff (all eligible voters)
          if (votesGained > 0 && votesGained >= state.players.length - 1) {
            points += 3;
            perfectBluffs += 1;
          }
          // Double down resolution
          if (f.doubleDown) {
            const half = Math.ceil((state.players.length - 1) / 2);
            if (votesGained >= half) {
              points += votesGained; // double the bluff points
            } else if (votesGained === 0) {
              points -= 1;
            }
          }
        }

        // Trap bonus (chaos)
        if (action.trapBonusId) {
          const trap = state.facts.find((f) => f.id === action.trapBonusId);
          if (trap?.authorId === p.id) chaosPoints += 1;
        }

        return { ...p, points, vizzyPoints, chaosPoints, perfectBluffs };
      });

      const record: RoundRecord = {
        round: state.round,
        artwork: state.artwork!,
        facts: state.facts,
        truthId: truthCard?.id ?? "",
        vizzyBluffId: vizzyCard?.id ?? null,
      };
      return {
        ...state,
        phase: "results",
        rounds: [...state.rounds, record],
        players,
        trapBonusId: action.trapBonusId,
        vizzyBluffsCaught,
      };
    }
    case "USE_DOUBLE_DOWN": {
      const players = state.players.map((p) =>
        p.id === action.playerId ? { ...p, doubleDownUsed: true } : p,
      );
      return { ...state, players };
    }
    case "ADVANCE":
      if (state.round >= state.roundLimit) {
        return { ...state, phase: "leaderboard" };
      }
      return { ...state, phase: "reveal" };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  dispatch: React.Dispatch<Action>;
  addPlayer: (name: string) => void;
}

const VerdictContext = createContext<Ctx | null>(null);

export const VerdictProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addPlayer = useCallback(
    (name: string) => {
      dispatch({
        type: "ADD_PLAYER",
        player: {
          id: `vv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          color: COLORS[state.players.length % COLORS.length],
          points: 0,
          vizzyPoints: 0,
          chaosPoints: 0,
          perfectBluffs: 0,
          doubleDownUsed: false,
          privateTruth: null,
        },
      });
    },
    [state.players.length],
  );
  const value = useMemo(() => ({ state, dispatch, addPlayer }), [state, addPlayer]);
  return <VerdictContext.Provider value={value}>{children}</VerdictContext.Provider>;
};

export function useVerdict(): Ctx {
  const ctx = useContext(VerdictContext);
  if (!ctx) throw new Error("useVerdict must be inside provider");
  return ctx;
}
