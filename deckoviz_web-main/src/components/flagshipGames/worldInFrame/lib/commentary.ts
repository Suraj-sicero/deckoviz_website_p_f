import type { Submission } from "./frameState";

export function vizzyCommentary(winner: Submission | null): string {
  if (!winner) return "Nothing won outright tonight, which is also a kind of answer.";
  const wordCount = winner.text.split(/\s+/).filter(Boolean).length;
  const lines: string[] = [];
  lines.push("This sentence leaves just enough unsaid to become unforgettable.");
  if (wordCount < 12) lines.push("Compression is its own form of mercy.");
  if (wordCount > 20) lines.push("Long, but every clause was earned.");
  if (/[?]$/.test(winner.text)) lines.push("Ending in a question is more generous than it sounds.");
  if (/[!]$/.test(winner.text)) lines.push("The exclamation is doing the work of restraint.");
  if (/^I /i.test(winner.text)) lines.push("First person, but turned outward — that's the trick.");
  return lines[Math.floor(Math.random() * lines.length)];
}

/* Vizzy's own sentence: rule-of-thumb hypothetical. */
const VIZZY_SENTENCES = [
  "The light arrived too late to mean what it meant.",
  "She had been preparing this absence for years.",
  "They both pretended not to notice the same thing.",
  "Outside, the rain considered turning into something else.",
  "What he meant to say arrived in a different room.",
];

export function vizzyOwnSentence(): string {
  return VIZZY_SENTENCES[Math.floor(Math.random() * VIZZY_SENTENCES.length)];
}

/* Pick Vizzy's Pick: a submission that didn't win the popular vote but has strong qualities */
export function pickVizzysPick(submissions: Submission[], popularId: string | null): string | null {
  const eligible = submissions.filter((s) => s.id !== popularId);
  if (eligible.length === 0) return null;
  // Prefer shortest with at least one vote, else most concise
  const withVotes = eligible.filter((s) => s.voteCount > 0);
  const candidate =
    [...(withVotes.length > 0 ? withVotes : eligible)].sort((a, b) => a.text.length - b.text.length)[0];
  return candidate?.id ?? null;
}

export function popularWinner(submissions: Submission[]): string | null {
  if (submissions.length === 0) return null;
  const sorted = [...submissions].sort((a, b) => b.voteCount - a.voteCount);
  if (sorted[0].voteCount === 0) return null;
  return sorted[0].id;
}
