import type { FamilyArchive, Chapter, Heirloom, FamilyMember } from "./inheritanceTypes";

/**
 * Compose an archival entry — a literary, melancholic record of what changed.
 * Mock substitute for an LLM-backed historian.
 */
export function writeArchivalEntry(input: {
  archive: FamilyArchive;
  chapterType: string;
  prompts: { question: string; answer: string }[];
  involvedMembers: FamilyMember[];
}): string {
  const { archive, chapterType, prompts, involvedMembers } = input;
  const surname = archive.surname || "the family";
  const memberPhrase =
    involvedMembers.length > 0
      ? involvedMembers.map((m) => m.name).join(" and ")
      : `a member of the ${surname} family`;
  const answers = prompts.filter((p) => p.answer.trim().length > 0);
  const detail = answers[0]?.answer ?? "It was, like all of it, not what they had planned.";
  const consequence = answers[answers.length - 1]?.answer ?? "Afterwards, the house was quieter.";

  const intros: Record<string, string> = {
    marriage: `When ${memberPhrase} married, the ${surname}s did what they always did:`,
    departure: `${memberPhrase} left in ${currentDecade()}.`,
    reunion: `The ${surname}s sat in a room together for the first time in years.`,
    discovery: `Something was found this season.`,
    inheritance: `An inheritance was read aloud.`,
    betrayal: `A small fracture entered the house this year.`,
    reckoning: `${memberPhrase} finally said it out loud.`,
    disappearance: `${memberPhrase} was no longer there.`,
    celebration: `A good thing arrived briefly.`,
    funeral: `${memberPhrase} was buried this year.`,
    "golden-age": `The ${surname}s did well, briefly. Long enough to remember it.`,
    "the-end": `The ${surname} name was carried, this final time, by ${memberPhrase}.`,
  };
  const intro = intros[chapterType] ?? `Something shifted in the house.`;
  return `${intro} ${detail} ${consequence} It was recorded. It is part of the family now.`;
}

export function currentDecade(): string {
  const year = new Date().getFullYear();
  const decade = Math.floor(year / 10) * 10;
  return `the ${decade}s`;
}

/**
 * Continuity references — when narrating the next chapter, surface earlier wounds.
 */
export function continuityHints(archive: FamilyArchive): string[] {
  const hints: string[] = [];
  if (archive.heirlooms.length > 0) {
    const h = archive.heirlooms[archive.heirlooms.length - 1];
    hints.push(`The ${h.name.toLowerCase()} (${h.kind.toLowerCase()}) is still in the house.`);
  }
  if (archive.chapters.length > 0) {
    const last = archive.chapters[archive.chapters.length - 1];
    hints.push(`Last chapter: ${last.title.toLowerCase()}.`);
  }
  const blackSheep = archive.members.find((m) => m.isBlackSheep);
  if (blackSheep) hints.push(`${blackSheep.name} is still away.`);
  return hints;
}

export function legacyPointsFor(chapterType: string, addedMembers: number): number {
  let pts = 5; // completing a chapter
  if (addedMembers > 0) pts += 2 * addedMembers;
  if (chapterType === "reckoning" || chapterType === "golden-age" || chapterType === "the-end") pts += 3;
  return pts;
}

export function unlocksAvailable(legacy: number): { type: string; label: string; minPoints: number; unlocked: boolean }[] {
  return [
    { type: "reckoning", label: "The Reckoning · old wounds confronted", minPoints: 10, unlocked: legacy >= 10 },
    { type: "golden-age", label: "The Golden Age · flourishing", minPoints: 25, unlocked: legacy >= 25 },
    { type: "the-end", label: "The End · final generation", minPoints: 50, unlocked: legacy >= 50 },
  ];
}

/* Letter composition — placeholder for AI letter writer */
export function composeLetter(input: {
  from: FamilyMember | null;
  to: FamilyMember | null;
  acrossYears: string;
  seed: string;
}): string {
  const { from, to, acrossYears, seed } = input;
  const fromName = from?.name ?? "a voice from before";
  const toName = to?.name ?? "whoever this finds";
  const body = [
    `${toName},`,
    `I am writing across ${acrossYears}. I am writing in a house that already knew how this would end.`,
    `${seed || "There is something I should have said when we were still in the same room."}`,
    `I am told you cannot answer this letter. I am told that's the point.`,
    `Yours, still,`,
    `${fromName}.`,
  ];
  return body.join("\n\n");
}
