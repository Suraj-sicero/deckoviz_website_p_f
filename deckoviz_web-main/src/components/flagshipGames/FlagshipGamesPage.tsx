"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, Gamepad2, Palette, Globe2, Frame, Eye, Type, Camera, Scroll, Mic, Map, Brain, MessageCircleQuestion } from "lucide-react";

interface FlagshipGame {
  id: string;
  title: string;
  tagline: string;
  description: string;
  route: string;
  players: string;
  duration: string;
  status: "available" | "coming-soon";
  gradient: string;
  glow: string;
  icon: React.ReactNode;
  poster: string;
  tags: string[];
}

const games: FlagshipGame[] = [
  {
    id: "story-forge",
    title: "Story Forge",
    tagline: "AI-powered collaborative fantasy cinema",
    description:
      "A cinematic multiplayer storytelling game where 2–6 players build a living, illustrated tale together. After every round, Vizzy narrates, an AI scene appears, and a Twist Card bends the path of the story.",
    route: "/flagship-games/story-forge",
    players: "2–6 players · Solo Mode",
    duration: "20–35 mins",
    status: "available",
    gradient:
      "linear-gradient(135deg, #1e1b4b, #4c1d95, #be185d, #4c1d95, #1e1b4b)",
    glow: "rgba(168, 85, 247, 0.5)",
    icon: <BookOpen size={28} className="text-violet-200" />,
    poster:
      "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.55), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(236,72,153,0.45), transparent 60%), linear-gradient(180deg, #0b0820, #1e1b4b 60%, #0b0820)",
    tags: ["Multiplayer", "Cinematic", "AI Narration", "Storybook"],
  },
  {
    id: "palette-wars",
    title: "Palette Wars",
    tagline: "A live abstract art gallery, played",
    description:
      "Vizzy generates original abstract artworks; you and 2–7 friends race to write the most moving, surprising, or hilarious interpretation. Anonymous reveals, dramatic voting, Joy Points, Theme rounds, and one explosive Swap per game.",
    route: "/flagship-games/palette-wars",
    players: "2–8 players · Solo Mode",
    duration: "15–30 mins",
    status: "available",
    gradient:
      "linear-gradient(135deg, #0c4a6e, #be185d, #f59e0b, #be185d, #0c4a6e)",
    glow: "rgba(236, 72, 153, 0.5)",
    icon: <Palette size={28} className="text-rose-100" />,
    poster:
      "radial-gradient(ellipse at 20% 30%, rgba(236,72,153,0.55), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(34,211,238,0.45), transparent 60%), radial-gradient(ellipse at 60% 20%, rgba(251,191,36,0.35), transparent 55%), linear-gradient(180deg, #0a0612, #1a0a2a 60%, #0a0612)",
    tags: ["Party", "Voting", "Joy Points", "Theme Rounds"],
  },
  {
    id: "dream-architect",
    title: "Dream Architect",
    tagline: "Collaboratively dream a place into existence",
    description:
      "A slow, atmospheric worldbuilding game for 2–5. Across four phases — Geography, Atmosphere, Inhabitants, Secret — you build an imaginary world together while Vizzy paints it onto a living TV frame, then names it and saves it to the World Library.",
    route: "/flagship-games/dream-architect",
    players: "2–5 players · Solo Mode",
    duration: "30–45 mins",
    status: "available",
    gradient:
      "linear-gradient(135deg, #064e3b, #155e75, #1e3a8a, #155e75, #064e3b)",
    glow: "rgba(45, 212, 191, 0.5)",
    icon: <Globe2 size={28} className="text-emerald-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(45,212,191,0.45), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(96,165,250,0.4), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(251,191,36,0.25), transparent 60%), linear-gradient(180deg, #021014, #0a2a2a 60%, #021014)",
    tags: ["Collaborative", "Meditative", "Worldbuilding", "Library"],
  },
  {
    id: "museum-of-us",
    title: "The Museum of Us",
    tagline: "A quiet exhibition made from memory",
    description:
      "An intimate emotional experience for 2–6. Vizzy gives you prompts about childhood, solitude, love, regret. You title imaginary artworks. Vizzy renders them, narrates them like a curator, and at the end writes a poetic note for the museum you made together.",
    route: "/flagship-games/museum-of-us",
    players: "2–6 players · Solo Mode",
    duration: "30–60 mins",
    status: "available",
    gradient:
      "linear-gradient(135deg, #1c1917, #44403c, #78350f, #44403c, #1c1917)",
    glow: "rgba(251, 191, 36, 0.35)",
    icon: <Frame size={28} className="text-amber-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(251,191,36,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(244,114,182,0.22), transparent 60%), linear-gradient(180deg, #0c0a08, #1a1410 60%, #0c0a08)",
    tags: ["Intimate", "Reflective", "Curator", "Presence"],
  },
  {
    id: "vizzys-verdict",
    title: "Vizzy's Verdict",
    tagline: "An unreliable curator after dark",
    description:
      "A stylish social bluffing game for 3–8 players. Vizzy unveils a real artwork. You each get one true fact in private, then invent two convincing lies. The room votes for the truth. Confidence beats accuracy. Most rounds, anyway.",
    route: "/flagship-games/vizzys-verdict",
    players: "3–8 players",
    duration: "20–35 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #1c1917, #422006, #7c2d12, #422006, #1c1917)",
    glow: "rgba(251, 146, 60, 0.45)",
    icon: <Eye size={28} className="text-amber-100" />,
    poster:
      "radial-gradient(ellipse at 30% 30%, rgba(251,146,60,0.5), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(178,72,40,0.4), transparent 60%), linear-gradient(180deg, #08060a, #1c1410 60%, #08060a)",
    tags: ["Bluff", "Party", "Art History", "Curator"],
  },
  {
    id: "one-word",
    title: "One Word At A Time",
    tagline: "Improv jazz, in language",
    description:
      "A fast, chaotic, hilarious word-chain game for 2–8. Each turn you add ONE word — eight seconds, no edits, no plans. Vizzy narrates every completed sentence with full theatrical commitment and may interrupt to redirect the chaos.",
    route: "/flagship-games/one-word",
    players: "2–8 players",
    duration: "15–20 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #0c0a14, #7c2d12, #ec4899, #7c2d12, #0c0a14)",
    glow: "rgba(236, 72, 153, 0.5)",
    icon: <Type size={28} className="text-rose-100" />,
    poster:
      "radial-gradient(ellipse at 20% 30%, rgba(236,72,153,0.5), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(251,191,36,0.4), transparent 60%), linear-gradient(180deg, #0a0814, #1a0a2a 60%, #0a0814)",
    tags: ["Realtime", "Chaotic", "Improv", "Typography"],
  },
  {
    id: "world-in-frame",
    title: "World in a Frame",
    tagline: "How much fits in one sentence?",
    description:
      "A quiet literary game for 2–7. Vizzy reveals a cinematic scene. You observe in silence, then write exactly one sentence that unlocks the story. The room votes for the most resonant line; Vizzy gently explains what made it land.",
    route: "/flagship-games/world-in-frame",
    players: "2–7 players · Solo Mode",
    duration: "25–35 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #0c0a09, #1e293b, #0f172a, #1e293b, #0c0a09)",
    glow: "rgba(148, 163, 184, 0.35)",
    icon: <Camera size={28} className="text-slate-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(148,163,184,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(254,243,199,0.22), transparent 60%), linear-gradient(180deg, #060709, #161a1f 60%, #060709)",
    tags: ["Literary", "Observation", "Restraint", "Archive"],
  },
  {
    id: "inheritance",
    title: "The Inheritance",
    tagline: "A family saga, played across months",
    description:
      "A long-form multi-session experience for 2–5. Together you found a fictional family, then return chapter by chapter — marriages, departures, reckonings — while Vizzy keeps an archive of every wound, heirloom, and letter. The family persists between sessions. Forever.",
    route: "/flagship-games/inheritance",
    players: "2–5 players · Solo Mode",
    duration: "Weeks to months",
    status: "available",
    gradient: "linear-gradient(135deg, #1c1917, #44403c, #92400e, #44403c, #1c1917)",
    glow: "rgba(180, 83, 9, 0.4)",
    icon: <Scroll size={28} className="text-amber-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(180,83,9,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(146,64,14,0.35), transparent 60%), linear-gradient(180deg, #0a0805, #1f1610 60%, #0a0805)",
    tags: ["Long-form", "Generational", "Persistent", "Archive"],
  },
  {
    id: "debating-society",
    title: "The Debating Society",
    tagline: "Oxford Union after midnight",
    description:
      "A theatrical performance-debate game for 2–8 players. Vizzy moderates like a slightly smug professor. Open, rebut, get cross-examined, then close — Heckle and Pivot tokens raise the stakes. You're judged on persuasion and wit, not on whether you actually believe what you're saying.",
    route: "/flagship-games/debating-society",
    players: "2–8 players",
    duration: "25–40 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #1c1917, #422006, #7c2d12, #422006, #1c1917)",
    glow: "rgba(180, 83, 9, 0.4)",
    icon: <Mic size={28} className="text-amber-100" />,
    poster:
      "radial-gradient(ellipse at 30% 30%, rgba(180,83,9,0.4), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(124,45,18,0.35), transparent 60%), linear-gradient(180deg, #0a0606, #1c1410 60%, #0a0606)",
    tags: ["Debate", "Rhetoric", "Theatre", "Performance"],
  },
  {
    id: "cartographers",
    title: "Cartographers",
    tagline: "A civilization, slowly drawn",
    description:
      "A persistent long-form worldbuilding experience for 2–6. Begin from a blank parchment and seven founding questions, then return for Expeditions — peoples, history, mythology, language, crisis, hidden things. Vizzy maintains the atlas, the open questions, and the world events between sessions.",
    route: "/flagship-games/cartographers",
    players: "2–6 players · Solo Mode",
    duration: "Weeks to months",
    status: "available",
    gradient: "linear-gradient(135deg, #0c0a08, #44403c, #78350f, #44403c, #0c0a08)",
    glow: "rgba(254, 215, 170, 0.4)",
    icon: <Map size={28} className="text-amber-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(254,215,170,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(120,53,15,0.32), transparent 60%), linear-gradient(180deg, #0a0805, #1f1610 60%, #0a0805)",
    tags: ["Persistent", "Atlas", "Mythology", "Continuity"],
  },
  {
    id: "brilliant-minds",
    title: "Brilliant Minds",
    tagline: "Curiosity as a spectator sport",
    description:
      "A premium knowledge-and-reasoning game for 2–8. Five round types: Straight Question, Reasoning Chain, the Connection, Minority Report, and Vizzy's Wild Card. Rabbit Hole, Challenge, and Team Telepathy mechanics reward clever thinking even when the answer is wrong.",
    route: "/flagship-games/brilliant-minds",
    players: "2–8 players · Teams",
    duration: "25–40 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #0c0a14, #1e3a8a, #0ea5e9, #1e3a8a, #0c0a14)",
    glow: "rgba(34, 211, 238, 0.45)",
    icon: <Brain size={28} className="text-sky-100" />,
    poster:
      "radial-gradient(ellipse at 30% 30%, rgba(34,211,238,0.45), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(96,165,250,0.35), transparent 60%), linear-gradient(180deg, #050a14, #0a1830 60%, #050a14)",
    tags: ["Knowledge", "Reasoning", "Curiosity", "Game Show"],
  },
  {
    id: "oracle",
    title: "The Oracle",
    tagline: "The questions reveal you",
    description:
      "An anonymous emotional inquiry game for 2–6. Players submit real questions, everyone answers anonymously, the room tries to guess who asked. Three depth settings, a Pass-Back follow-up mechanic, Vizzy's own observant question, and a haunting Last Question that closes every session.",
    route: "/flagship-games/oracle",
    players: "2–6 players · Solo Mode",
    duration: "35–50 mins",
    status: "available",
    gradient: "linear-gradient(135deg, #02060a, #0c4a6e, #1e1b4b, #0c4a6e, #02060a)",
    glow: "rgba(94, 234, 212, 0.35)",
    icon: <MessageCircleQuestion size={28} className="text-teal-100" />,
    poster:
      "radial-gradient(ellipse at 30% 40%, rgba(94,234,212,0.32), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(30,27,75,0.4), transparent 60%), linear-gradient(180deg, #020608, #0a1a24 60%, #020608)",
    tags: ["Anonymous", "Reflective", "Conversation", "Calm"],
  },
];

const FlagshipGamesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-10 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
          style={{ background: "rgba(168,85,247,0.18)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full blur-3xl"
          style={{ background: "rgba(236,72,153,0.16)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-[24rem] h-[24rem] rounded-full blur-3xl"
          style={{ background: "rgba(56,189,248,0.12)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-violet-200 mb-6">
              <Gamepad2 size={14} />
              <span>Flagship Games</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent mb-4">
              Premium games, lovingly crafted
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A growing library of cinematic, AI-powered experiences designed for cozy nights, dinner tables, and the Deckoviz TV frame.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md cursor-pointer"
              onClick={() => game.status === "available" && navigate(game.route)}
              style={{
                boxShadow: `0 30px 80px -40px ${game.glow}`,
              }}
            >
              {/* Poster */}
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: game.poster }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        {game.icon}
                      </div>
                      <div className="text-xs uppercase tracking-[0.25em] text-white/70">
                        {game.tagline}
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif font-semibold text-white drop-shadow-lg">
                      {game.title}
                    </h3>
                  </div>
                </div>
                {game.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] uppercase tracking-widest text-white/90">
                    Coming Soon
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {game.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/60 mb-5">
                  <span>{game.players}</span>
                  <span>{game.duration}</span>
                </div>
                <button
                  disabled={game.status !== "available"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (game.status === "available") navigate(game.route);
                  }}
                  className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-semibold text-sm overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: game.gradient,
                    backgroundSize: "300% 300%",
                    animation: "footerGradientFlow 6s ease infinite",
                    color: "white",
                  }}
                >
                  <Sparkles size={14} />
                  <span>{game.status === "available" ? "Enter Game" : "Coming Soon"}</span>
                  <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Placeholder slot — invites players to anticipate more */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 flex flex-col items-center justify-center text-center min-h-[26rem]"
          >
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <Sparkles size={22} className="text-white/40" />
            </div>
            <h4 className="text-white/80 font-semibold mb-2">More worlds coming</h4>
            <p className="text-xs text-white/40 max-w-xs">
              New flagship games are added in sequence. Bookmark this page — the next title arrives soon.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlagshipGamesPage;
