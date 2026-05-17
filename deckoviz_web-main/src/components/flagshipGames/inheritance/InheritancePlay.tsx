"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Scroll, Mail, BookOpen, Sparkles, ChevronRight, UserPlus, Crown } from "lucide-react";
import { useInheritance } from "./lib/inheritanceState";
import {
  generatePortrait,
  pickChapterTemplate,
  type FamilyMember,
  type Chapter,
  type Heirloom,
  type Letter,
  type FoundingAnswers,
  type ChapterType,
  CHAPTER_LIBRARY,
} from "./lib/inheritanceTypes";
import { writeArchivalEntry, continuityHints, legacyPointsFor, unlocksAvailable, composeLetter } from "./lib/continuityEngine";

const InheritancePlay: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useInheritance();

  return (
    <Shell navigate={navigate}>
      {state.phase === "founding" && <FoundingView />}
      {state.phase === "founding-portrait" && <FoundingPortraitView />}
      {state.phase === "chapter-setup" && <ChapterSetupView />}
      {state.phase === "chapter-play" && <ChapterPlayView />}
      {state.phase === "archival-entry" && <ArchivalEntryView />}
      {state.phase === "library" && <LibraryView />}
      {state.phase === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <h2 className="font-serif text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-snug">
            "Tonight we begin a family. Tomorrow, we'll have always had one."
          </h2>
        </motion.div>
      )}
    </Shell>
  );
};

/* ===== Shell ===== */

const Shell: React.FC<{ children: React.ReactNode; navigate: ReturnType<typeof useNavigate> }> = ({ children, navigate }) => (
  <div className="min-h-screen bg-[#0a0805] text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #0a0805, #1f1610 50%, #0a0805)" }} />
    {/* warm amber */}
    <motion.div
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full blur-3xl pointer-events-none"
      style={{ background: "rgba(180, 83, 9, 0.18)" }}
      animate={{ opacity: [0.18, 0.32, 0.18] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    <div className="relative max-w-6xl mx-auto z-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate("/flagship-games/inheritance")} className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <ArrowLeft size={16} /> Lobby
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ===== FOUNDING ===== */

const FoundingView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  const [answers, setAnswers] = useState<FoundingAnswers>({
    surname: "",
    origin: "",
    values: "",
    wound: "",
    craft: "",
    relationToBeauty: "",
  });
  const [founderNames, setFounderNames] = useState<string[]>(["", ""]);

  const submit = () => {
    if (!answers.surname.trim()) return;
    const founders: FamilyMember[] = founderNames
      .filter((n) => n.trim().length > 0)
      .map((n, i) => ({
        id: `m-${Date.now()}-${i}`,
        name: n.trim(),
        generation: 1,
        parents: [],
        spouse: null,
        birthYear: null,
        deathYear: null,
        isBlackSheep: false,
        notes: "",
        portrait: generatePortrait(i + answers.surname.length),
      }));
    dispatch({
      type: "RECORD_FOUNDING",
      answers,
      portrait: generatePortrait(answers.surname.length || 1),
      founders,
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">Founding session</div>
        <h2 className="font-serif text-3xl md:text-4xl text-white">Tell me about the family.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FoundingField label="Surname" placeholder="The Marchand family." value={answers.surname} onChange={(v) => setAnswers({ ...answers, surname: v })} />
        <FoundingField label="Where did they begin?" placeholder="A coastal town no map agrees on." value={answers.origin} onChange={(v) => setAnswers({ ...answers, origin: v })} />
        <FoundingField label="What do they value?" placeholder="Quiet meals. Long silences. Loyalty too far." value={answers.values} onChange={(v) => setAnswers({ ...answers, values: v })} />
        <FoundingField label="What wound runs through generations?" placeholder="A letter never sent." value={answers.wound} onChange={(v) => setAnswers({ ...answers, wound: v })} />
        <FoundingField label="What do they make or create?" placeholder="They restore furniture, badly, beautifully." value={answers.craft} onChange={(v) => setAnswers({ ...answers, craft: v })} />
        <FoundingField label="Their relationship to beauty, work, memory" placeholder="They distrust the first, worship the second, lie about the third." value={answers.relationToBeauty} onChange={(v) => setAnswers({ ...answers, relationToBeauty: v })} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Founders (1–4)</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              value={founderNames[i] ?? ""}
              onChange={(e) => {
                const next = [...founderNames];
                next[i] = e.target.value.slice(0, 40);
                setFounderNames(next);
              }}
              placeholder={i === 0 ? "Eldest founder" : i === 1 ? "Second founder" : "Optional"}
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={!answers.surname.trim() || !founderNames.some((n) => n.trim())}
        className="w-full px-5 py-3 rounded-full text-sm font-semibold disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
      >
        Found the family
      </button>
    </div>
  );
};

const FoundingField: React.FC<{ label: string; placeholder: string; value: string; onChange: (v: string) => void }> = ({
  label,
  placeholder,
  value,
  onChange,
}) => (
  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-3">
    <div className="text-[10px] uppercase tracking-[0.25em] text-amber-200 mb-1.5">{label}</div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, 160))}
      placeholder={placeholder}
      className="w-full bg-transparent text-white font-serif placeholder:text-white/30 focus:outline-none"
    />
  </div>
);

/* ===== FOUNDING PORTRAIT ===== */

const FoundingPortraitView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  if (!state.archive) return null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">The founding portrait</div>
        <h2 className="font-serif text-3xl md:text-4xl text-white">The {state.archive.surname} Family</h2>
      </div>

      <Portrait portrait={state.archive.foundingPortrait!} />

      <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4">
        <p className="font-serif italic text-white/85 leading-relaxed">
          A family that began in {state.archive.founding?.origin || "an unnamed place"} —
          made {state.archive.founding?.craft || "things with their hands"},
          carried {state.archive.founding?.wound || "an old silence"},
          and treated {state.archive.founding?.relationToBeauty || "beauty"} with characteristic suspicion.
        </p>
      </div>

      <button
        onClick={() => dispatch({ type: "GOTO", phase: "chapter-setup" })}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black font-semibold text-sm"
      >
        Begin Chapter One <ChevronRight size={14} />
      </button>
    </div>
  );
};

const Portrait: React.FC<{ portrait: { background: string; overlay: string }; tall?: boolean; label?: string }> = ({ portrait, tall, label }) => (
  <div className={`relative w-full ${tall ? "aspect-[3/4]" : "aspect-[16/10]"} rounded-3xl overflow-hidden border-[8px] border-amber-200/15 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]`}>
    <motion.div
      initial={{ filter: "blur(20px)", opacity: 0, scale: 1.08 }}
      animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
      transition={{ duration: 3.2 }}
      className="absolute inset-0"
      style={{ background: portrait.background }}
    />
    <div className="absolute inset-0 pointer-events-none" style={{ background: portrait.overlay }} />
    {label && (
      <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-md bg-black/45 backdrop-blur-sm border border-white/10 text-xs text-white/80">
        <span className="font-serif italic">{label}</span>
      </div>
    )}
  </div>
);

/* ===== CHAPTER SETUP ===== */

const ChapterSetupView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  if (!state.archive) return null;
  const hints = continuityHints(state.archive);
  const unlocks = unlocksAvailable(state.archive.legacyPoints);
  const [chosenType, setChosenType] = useState<ChapterType | null>(null);

  const begin = () => {
    dispatch({ type: "PICK_NEXT_CHAPTER_HINT", hint: chosenType });
    dispatch({ type: "GOTO", phase: "chapter-play" });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">A new chapter</div>
        <h2 className="font-serif text-3xl md:text-4xl text-white">The {state.archive.surname}s, again.</h2>
      </div>

      {hints.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Continuity</div>
          <ul className="space-y-1 text-xs text-white/70 italic">
            {hints.map((h, i) => (
              <li key={i}>· {h}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">Choose this chapter's shape</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {CHAPTER_LIBRARY.map((c) => {
            const locked = c.type === "reckoning" ? state.archive!.legacyPoints < 10 : c.type === "golden-age" ? state.archive!.legacyPoints < 25 : c.type === "the-end" ? state.archive!.legacyPoints < 50 : false;
            const sel = chosenType === c.type;
            return (
              <button
                key={c.type}
                onClick={() => !locked && setChosenType(c.type)}
                disabled={locked}
                className={`text-left rounded-2xl border p-3 transition ${sel ? "border-amber-300/60 bg-amber-500/10 ring-2 ring-amber-300/30" : "border-white/10 bg-white/[0.04] hover:border-white/30"} ${locked ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <div className="font-serif text-white">{c.title}</div>
                <div className="text-[10px] text-white/50 italic mt-0.5">{c.theme}</div>
                {locked && <div className="text-[10px] text-amber-200 mt-1">Unlocks at Legacy {c.type === "reckoning" ? 10 : c.type === "golden-age" ? 25 : 50}</div>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-xs text-white/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-200 uppercase tracking-[0.3em] text-[10px]">Legacy</span>
          <span className="text-white tabular-nums">{state.archive.legacyPoints}</span>
        </div>
        <div className="space-y-1">
          {unlocks.map((u) => (
            <div key={u.type} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${u.unlocked ? "bg-amber-300" : "bg-white/20"}`} />
              <span className={u.unlocked ? "text-white/90" : "text-white/40"}>{u.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={!chosenType}
        onClick={begin}
        className="w-full px-5 py-3 rounded-full text-sm font-semibold disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
      >
        Open the chapter
      </button>
    </div>
  );
};

/* ===== CHAPTER PLAY ===== */

const ChapterPlayView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  if (!state.archive) return null;
  const archive = state.archive;
  const template = useMemo(() => pickChapterTemplate(state.pendingChapterTypeHint as ChapterType | undefined), [state.pendingChapterTypeHint]);

  const [answers, setAnswers] = useState<string[]>(() => template.prompts.map(() => ""));
  const [newMembers, setNewMembers] = useState<string[]>([""]);
  const [heirloomName, setHeirloomName] = useState("");
  const [heirloomKind, setHeirloomKind] = useState<Heirloom["kind"]>("Object");
  const [heirloomDescription, setHeirloomDescription] = useState("");
  const [introduceBlackSheep, setIntroduceBlackSheep] = useState(false);
  const [blackSheepName, setBlackSheepName] = useState("");
  const [openLetter, setOpenLetter] = useState(false);
  const [letterSeed, setLetterSeed] = useState("");

  const offerLetterMechanic = (archive.chapters.length + 1) % 5 === 0;

  const completeChapter = () => {
    const chapterId = `ch-${Date.now()}`;
    const involvedMembers: FamilyMember[] = [];

    // add new members
    newMembers
      .filter((n) => n.trim().length > 0)
      .forEach((n) => {
        const member: FamilyMember = {
          id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: n.trim(),
          generation: Math.max(1, ...archive.members.map((m) => m.generation)) + (Math.random() > 0.5 ? 1 : 0),
          parents: [],
          spouse: null,
          birthYear: null,
          deathYear: null,
          isBlackSheep: false,
          notes: "",
          portrait: generatePortrait(n.length + Date.now()),
        };
        dispatch({ type: "ADD_MEMBER", member });
        involvedMembers.push(member);
      });

    if (introduceBlackSheep && blackSheepName.trim()) {
      const member: FamilyMember = {
        id: `m-bs-${Date.now()}`,
        name: blackSheepName.trim(),
        generation: Math.max(1, ...archive.members.map((m) => m.generation)),
        parents: [],
        spouse: null,
        birthYear: null,
        deathYear: null,
        isBlackSheep: true,
        notes: "Walked away from the family. Probably for reasons.",
        portrait: generatePortrait(blackSheepName.length + 999),
      };
      dispatch({ type: "ADD_MEMBER", member });
      involvedMembers.push(member);
    }

    const heirloomIds: string[] = [];
    if (heirloomName.trim() && heirloomDescription.trim()) {
      const heirloom: Heirloom = {
        id: `h-${Date.now()}`,
        name: heirloomName.trim(),
        kind: heirloomKind,
        description: heirloomDescription.trim(),
        introducedInChapterId: chapterId,
        referencedInChapterIds: [],
      };
      dispatch({ type: "ADD_HEIRLOOM", heirloom });
      heirloomIds.push(heirloom.id);
    }

    let letterId: string | null = null;
    if (openLetter && letterSeed.trim()) {
      const from = archive.members[Math.floor(Math.random() * archive.members.length)] ?? null;
      const to = archive.members[Math.floor(Math.random() * archive.members.length)] ?? null;
      const letter: Letter = {
        id: `l-${Date.now()}`,
        fromMemberId: from?.id ?? null,
        toMemberId: to?.id ?? null,
        acrossYears: `${1900 + Math.floor(Math.random() * 80)} → ${1950 + Math.floor(Math.random() * 70)}`,
        text: composeLetter({ from, to, acrossYears: `${1900 + Math.floor(Math.random() * 80)} → ${1950 + Math.floor(Math.random() * 70)}`, seed: letterSeed.trim() }),
        chapterId,
      };
      dispatch({ type: "ADD_LETTER", letter });
      letterId = letter.id;
    }

    const prompts = template.prompts.map((q, i) => ({ question: q, answer: answers[i] ?? "" }));
    const archivalEntry = writeArchivalEntry({
      archive,
      chapterType: template.type,
      prompts,
      involvedMembers,
    });
    const pts = legacyPointsFor(template.type, newMembers.filter((n) => n.trim().length > 0).length + (introduceBlackSheep && blackSheepName.trim() ? 1 : 0));
    const chapter: Chapter = {
      id: chapterId,
      title: template.title,
      type: template.type,
      theme: template.theme,
      prompts,
      archivalEntry,
      heirloomIds,
      letterId,
      illustration: generatePortrait(Date.now() % 100),
      legacyPointsAwarded: pts,
      participatingMemberIds: involvedMembers.map((m) => m.id),
      createdAt: Date.now(),
    };
    dispatch({ type: "ADD_CHAPTER", chapter });
    dispatch({ type: "AWARD_LEGACY", pts });
    dispatch({ type: "GOTO", phase: "archival-entry" });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">Chapter {archive.chapters.length + 1}</div>
        <h2 className="font-serif text-3xl md:text-4xl text-white">{template.title}</h2>
        <p className="text-white/60 italic mt-2">{template.theme}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {template.prompts.map((q, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-amber-200 mb-1.5">{q}</div>
            <textarea
              value={answers[i]}
              onChange={(e) => {
                const next = [...answers];
                next[i] = e.target.value.slice(0, 240);
                setAnswers(next);
              }}
              rows={2}
              className="w-full bg-transparent text-white font-serif placeholder:text-white/30 focus:outline-none resize-none"
              placeholder="Take your time."
            />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 inline-flex items-center gap-1">
          <UserPlus size={11} /> New family members in this chapter
        </div>
        <p className="text-xs text-white/50 italic">Born, married in, returned, or finally named.</p>
        {newMembers.map((n, i) => (
          <input
            key={i}
            value={n}
            onChange={(e) => {
              const next = [...newMembers];
              next[i] = e.target.value.slice(0, 40);
              setNewMembers(next);
            }}
            placeholder="Name"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
          />
        ))}
        <button
          onClick={() => setNewMembers((arr) => [...arr, ""])}
          className="text-xs text-amber-200 hover:text-amber-100 inline-flex items-center gap-1"
        >
          <Plus size={11} /> Add another
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={introduceBlackSheep} onChange={(e) => setIntroduceBlackSheep(e.target.checked)} />
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200 inline-flex items-center gap-1">
            <Crown size={11} /> Introduce a Black Sheep
          </span>
        </label>
        {introduceBlackSheep && (
          <input
            value={blackSheepName}
            onChange={(e) => setBlackSheepName(e.target.value.slice(0, 40))}
            placeholder="Their name"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
          />
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Heirloom (optional)</div>
        <p className="text-xs text-white/50 italic">An object, a phrase, a tradition, a recipe — something to carry forward.</p>
        <div className="flex gap-2 flex-wrap">
          {(["Object", "Phrase", "Tradition", "Ritual", "Recipe", "Song", "Photograph"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setHeirloomKind(k)}
              className={`px-2.5 py-1 rounded-full text-xs ${heirloomKind === k ? "bg-white text-black" : "bg-white/[0.04] border border-white/10 text-white/70"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <input
          value={heirloomName}
          onChange={(e) => setHeirloomName(e.target.value.slice(0, 60))}
          placeholder="Name (e.g., grandmother's silver pin)"
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
        />
        <textarea
          value={heirloomDescription}
          onChange={(e) => setHeirloomDescription(e.target.value.slice(0, 200))}
          rows={2}
          placeholder="What it means."
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
        />
      </div>

      {offerLetterMechanic && (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={openLetter} onChange={(e) => setOpenLetter(e.target.checked)} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-200 inline-flex items-center gap-1">
              <Mail size={11} /> Open The Letter
            </span>
          </label>
          {openLetter && (
            <textarea
              value={letterSeed}
              onChange={(e) => setLetterSeed(e.target.value.slice(0, 260))}
              rows={3}
              placeholder="What is the one thing this letter is for?"
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
            />
          )}
        </div>
      )}

      <button
        onClick={completeChapter}
        disabled={answers.every((a) => !a.trim())}
        className="w-full px-5 py-3 rounded-full text-sm font-semibold disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #b45309, #fbbf24)", color: "white" }}
      >
        Close the chapter <Sparkles size={14} className="inline ml-1" />
      </button>
    </div>
  );
};

/* ===== ARCHIVAL ENTRY ===== */

const ArchivalEntryView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  if (!state.archive) return null;
  const chapter = state.archive.chapters[state.archive.chapters.length - 1];
  if (!chapter) return null;
  const letter = chapter.letterId ? state.archive.letters.find((l) => l.id === chapter.letterId) : null;
  const heirloom = chapter.heirloomIds[0] ? state.archive.heirlooms.find((h) => h.id === chapter.heirloomIds[0]) : null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">Archival entry</div>
        <h2 className="font-serif text-3xl text-white">{chapter.title}</h2>
      </div>

      <Portrait portrait={chapter.illustration} label={chapter.theme} />

      <div className="rounded-3xl border border-amber-300/30 bg-amber-500/10 p-5">
        <p className="font-serif italic text-white/90 leading-relaxed text-base">"{chapter.archivalEntry}"</p>
        <div className="text-[10px] text-amber-200 italic mt-3">+{chapter.legacyPointsAwarded} Legacy · total {state.archive.legacyPoints}</div>
      </div>

      {heirloom && (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1">Heirloom recorded</div>
          <div className="font-serif text-white">{heirloom.name} <span className="text-white/40 text-xs">({heirloom.kind})</span></div>
          <p className="text-sm text-white/70 italic mt-1">{heirloom.description}</p>
        </div>
      )}

      {letter && (
        <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-1 inline-flex items-center gap-1">
            <Mail size={11} /> Letter · {letter.acrossYears}
          </div>
          <pre className="font-serif text-white/90 whitespace-pre-wrap text-sm leading-relaxed">{letter.text}</pre>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: "GOTO", phase: "library" })}
          className="flex-1 px-5 py-2.5 rounded-full border border-white/15 text-sm text-white/90"
        >
          To the archive
        </button>
        <button
          onClick={() => dispatch({ type: "GOTO", phase: "chapter-setup" })}
          className="flex-1 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold"
        >
          Another chapter
        </button>
      </div>
    </div>
  );
};

/* ===== LIBRARY ===== */

const LibraryView: React.FC = () => {
  const { state, dispatch } = useInheritance();
  const navigate = useNavigate();
  if (!state.archive) return null;
  const archive = state.archive;
  const unlocks = unlocksAvailable(archive.legacyPoints);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-amber-200 mb-2">The archive</div>
        <h2 className="font-serif text-3xl md:text-5xl text-white">The {archive.surname} Family</h2>
        <p className="text-white/60 italic mt-2 text-sm">
          {archive.chapters.length} chapter{archive.chapters.length === 1 ? "" : "s"} · {archive.members.length} members · {archive.heirlooms.length} heirlooms · {archive.legacyPoints} Legacy
        </p>
      </div>

      {archive.foundingPortrait && (
        <div className="max-w-3xl mx-auto">
          <Portrait portrait={archive.foundingPortrait} label="Founding portrait" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Members">
          {archive.members.length === 0 && <p className="text-white/40 text-sm italic">No members yet.</p>}
          {archive.members.map((m) => (
            <div key={m.id} className="flex items-center gap-2 py-1">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20" style={{ background: m.portrait.background }} />
              <div className="flex-1">
                <div className={`font-serif text-sm ${m.isBlackSheep ? "text-amber-200" : "text-white"}`}>{m.name}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Gen {m.generation} {m.isBlackSheep && "· Black Sheep"}
                </div>
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Heirlooms">
          {archive.heirlooms.length === 0 && <p className="text-white/40 text-sm italic">Nothing carried yet.</p>}
          {archive.heirlooms.map((h) => (
            <div key={h.id} className="py-1.5 border-b border-white/5 last:border-b-0">
              <div className="font-serif text-white text-sm">{h.name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200">{h.kind}</div>
              <div className="text-xs text-white/60 italic">{h.description}</div>
            </div>
          ))}
        </Panel>

        <Panel title="Letters">
          {archive.letters.length === 0 && <p className="text-white/40 text-sm italic">No letters yet.</p>}
          {archive.letters.map((l) => (
            <div key={l.id} className="py-1.5 border-b border-white/5 last:border-b-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-200">{l.acrossYears}</div>
              <p className="text-xs text-white/70 italic line-clamp-2 font-serif">{l.text.split("\n").find((x) => x.trim().length > 0)}</p>
            </div>
          ))}
        </Panel>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-5">
        <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-3 inline-flex items-center gap-1">
          <BookOpen size={11} /> Chapters
        </div>
        {archive.chapters.length === 0 && <p className="text-white/40 text-sm italic">No chapters yet — begin one.</p>}
        <div className="space-y-3">
          {archive.chapters.map((c, i) => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/15" style={{ background: c.illustration.background }} />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Chapter {i + 1}</div>
                  <div className="font-serif text-white">{c.title}</div>
                </div>
              </div>
              <p className="font-serif italic text-white/80 text-sm leading-relaxed">"{c.archivalEntry}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-200 uppercase tracking-[0.3em] text-[10px]">Legacy unlocks</span>
          <span className="text-white tabular-nums">{archive.legacyPoints}</span>
        </div>
        <div className="space-y-1">
          {unlocks.map((u) => (
            <div key={u.type} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${u.unlocked ? "bg-amber-300" : "bg-white/20"}`} />
              <span className={u.unlocked ? "text-white/90" : "text-white/40"}>{u.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => dispatch({ type: "GOTO", phase: "chapter-setup" })}
          className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm inline-flex items-center gap-2"
        >
          <Scroll size={14} /> Begin a new chapter
        </button>
      </div>
    </div>
  );
};

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
    <div className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mb-2">{title}</div>
    <div className="max-h-72 overflow-y-auto pr-1">{children}</div>
  </div>
);

export default InheritancePlay;
