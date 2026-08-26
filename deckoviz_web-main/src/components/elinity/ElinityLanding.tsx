import { useEffect, useState, useRef, FC } from "react";
import { motion, AnimatePresence, Variants } from 'framer-motion'
import React, {  forwardRef } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ElinityNavbar from "./ElinityNavbar";
import ElinityFooter from "./ElinityFooter";
// ─── Brand Tokens ─────────────────────────────────────────────────────────────

const brand = {
  primary: {
    main: "#a855f7",
    secondary: "#7c4dff",
    light: "#b983ff",
  },
  background: {
    main: "#0a0a23",
    panel: "#181848",
    deep: "#3a185a",
  },
  ui: {
    input: "#23235b",
    border: "#33336b",
  },
  text: {
    primary: "#ffffff",
    secondary: "#c4b5fd",
    light: "#f3e8ff",
  },
  gradients: {
    button: "linear-gradient(to right, #a855f7, #7c4dff)",
    background: "radial-gradient(circle at 50% 30%, #b983ff 0%, #a855f7 40%, #3a185a 80%, #181848 100%)",
  },
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureItem {
  title: string;
  desc: string;
  accent: string;
}

interface BeliefItem {
  num: string;
  title: string;
  body: string;
  emoji?: string;
}

interface TribeItem {
  num: string;
  name: string;
  desc: string;
}

interface StepItem {
  idx: string;
  title: string;
  desc: string;
}

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface FooterColumn {
  title: string;
  links: string[];
}

interface SectionLabelProps {
  label: string;
  index: string;
}

interface FeatureRowProps {
  items: FeatureItem[];
  borderTop?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS: string[] = [
  "Love", "Leisure", "Collaboration", "Connection",
  "Resonance", "Belonging", "Growth", "Depth",
];

const FEATURES_ROW1: FeatureItem[] = [
  { title: "curated recommendations", desc: "no more browsing fatigue. we only show you people who cross your high compatibility bar - if no one fits, we show no one. every match is vetted by an ai that deeply understands your personality, values, and life direction.", accent: "var(--primary-main)" },
  { title: "matching beyond romance", desc: "we offer dedicated matching logic for travel, hobbies, collaborations and projects. discover the rich potential of platonic and creative partnerships on the same platform.", accent: "var(--primary-secondary)" },
  { title: "prompt your way to people", desc: "tell lumi exactly what you need. whether you're new to a city or seeking an astrophysics-loving hiking partner, elinity translates your human intent into precise matching logic.", accent: "var(--primary-main)" },
  { title: "your life book", desc: "a private, shared garden for your journey. collect photos, voice notes, and memories in a visual journal that you can keep private or share with your friends and family.", accent: "var(--primary-secondary)" },
];

const FEATURES_ROW2: FeatureItem[] = [
  { title: "connection games", desc: "play is essential. our suite of games - ranging from light and funny to deep and soulful - is designed to spark laughter, curiosity, and closeness for couples and friends alike.", accent: "var(--primary-secondary)" },
  { title: "relationship home", desc: "your 'relationship os.' access rituals, daily cards, shared goals, streaks, and skill-building sessions in one living space that keeps your bonds intentional and vibrant.", accent: "var(--primary-main)" },
  { title: "voice journaling", desc: "talk, don't type. journal solo or as a pair to capture natural, honest reflections. lumi listens and offers actionable insights and growth patterns without the \"therapy-speak.\"", accent: "var(--primary-secondary)" },
  { title: "skill learning + growth", desc: "deepen your relational and social skills and your emotional intelligence with 90+ guided modules. learn resilience, intimacy, frameworks for self knowledge and self expression, through sessions that evolve with you as you do.", accent: "var(--primary-main)" },
];

const BELIEFS: BeliefItem[] = [
  { num: "01 - Philosophy", emoji: "💎", title: "rich, deep profiles:", body: "deep representations of real humans, inspired by story cafes, not reducing people to photos and labels." },
  { num: "02 - Matching", emoji: "🧿", title: "threshold-based", body: "you only see high-fit connections; we never waste your time. we want to minimize the time you spend looking." },
  { num: "03 - AI", emoji: "🧬", title: "multi-dimensional", body: "matching based on values and goals, character and personality, not just 'vibes' or surface-level attributes." },
  { num: "04 - Journey", emoji: "🏹", title: "proactive support", body: "lumi helps you flourish before problems arise, as your relationship ally, and as your reflection companion." },
  { num: "05 - Design", emoji: "🎨", title: "meaningful play", body: "curiosity and novelty built into the core, as the foundation for relational flourishing." },
  { num: "06 - Vision", emoji: "✨", title: "story assistant", body: "lumi helps you craft an honest, sparkling profile, that helps you bring your story to the fore." },
];

const TRIBES: TribeItem[] = [
  { num: "Tribe 01", name: "The Lovers", desc: "For those seeking conscious, resonant intimacy over chaotic swiping. The ones who believe in soulmates, and want to find theirs." },
  { num: "Tribe 02", name: "The Social Expanders", desc: "For those looking for instant-yes friends for life's adventures. Those who love to play, to yap, to travel, those who carpe diem." },
  { num: "Tribe 03", name: "The Builders", desc: "For those seeking cool collaborators with aligned vision and temperament. Bring your creative ideas to life with people you'd love building with." },
  { num: "Tribe 04", name: "The Deepeners", desc: "For those nurturing existing bonds with intention and joy, be it with a partner, friends, or family. The ones who go all the way in." },
  { num: "Tribe 05", name: "The Explorers", desc: "Refining their inner world to improve all outer connections. Exploring and expressing the richness of what's within." },
];

const STEPS: StepItem[] = [
  {
    idx: "01",
    title: "create your deep profile",
    desc: "an onboarding journey to express your values, rhythms, and who you are becoming."
  },
  {
    idx: "02",
    title: "let lumi understand you",
    desc: "through journals and psychometrics, lumi builds a model of your ideal life fit."
  },
  {
    idx: "03",
    title: "choose your intention",
    desc: "toggle between love, leisure, or collaboration modes anytime."
  },
  {
    idx: "04",
    title: "cross the bar",
    desc: "we only introduce you to those who meet your high compatibility threshold. no noise, just intent."
  },
  {
    idx: "05",
    title: "connect with ease",
    desc: "use icebreakers and vibe checks to move from digital match to real-world momentum."
  },
  {
    idx: "06",
    title: "grow together",
    desc: "use our suite of tools to keep your relationships designed, tended, and celebrated."
  }
];

const STATS: StatItem[] = [
  { value: "90+", label: "Growth modules",   color: "var(--primary-main)" },
  { value: "3",   label: "Connection modes", color: "var(--primary-secondary)" },
  { value: "∞",   label: "Depth potential",  color: "var(--primary-main)" },
  { value: "0",   label: "Wasted swipes",    color: "var(--primary-secondary)" },
];

const FOOTER_COLS: FooterColumn[] = [
  { title: "Product",  links: ["Features", "How it works", "For lovers", "For builders"] },
  { title: "Company",  links: ["About", "Blog", "Careers", "Press"] },
  { title: "Connect",  links: ["Instagram", "Twitter / X", "Discord", "contact@elinity.com"] },
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useFadeIn(): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Global CSS ───────────────────────────────────────────────────────────────
// In production: move to index.css / globals.css and add the Google Fonts <link>
// to index.html or _document.tsx.

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');

  .elinity-page {
    --primary-main:      ${brand.primary.main};
    --primary-secondary: ${brand.primary.secondary};
    --primary-light:     ${brand.primary.light};

    --bg-main:  ${brand.background.main};
    --bg-panel: ${brand.background.panel};
    --bg-deep:  ${brand.background.deep};

    --ui-input:  ${brand.ui.input};
    --ui-border: ${brand.ui.border};

    --text-primary:   ${brand.text.primary};
    --text-secondary: ${brand.text.secondary};
    --text-light:     ${brand.text.light};

    --gradient-button: ${brand.gradients.button};
    --gradient-bg:     ${brand.gradients.background};

    --border: ${brand.ui.border};

    background: var(--bg-main);
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── Cursor ── */
  .elinity-page {
    --elinity-indigo: #7B3FE4;
    --elinity-blue: #3B82F6;
    --elinity-cyan: #00D2FF;
    --elinity-glow: rgba(59, 130, 246, 0.4);
  }

  .elinity-page .elinity-cursor {
    width: 10px; 
    height: 10px;
    background: linear-gradient(135deg, var(--elinity-blue), var(--elinity-cyan));
    border-radius: 50%;
    position: fixed; 
    pointer-events: none; 
    z-index: 9999;
    transition: transform 0.1s ease;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px var(--elinity-glow);
  }

  .elinity-page .elinity-cursor-ring {
    width: 40px; 
    height: 40px;
    border: 1.5px solid var(--elinity-indigo);
    opacity: 0.5;
    border-radius: 50%;
    position: fixed; 
    pointer-events: none; 
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: 
      width 0.3s cubic-bezier(0.23, 1, 0.32, 1), 
      height 0.3s cubic-bezier(0.23, 1, 0.32, 1), 
      border-color 0.3s ease;
  }
  .elinity-page .nav-logo {
    font-family: 'Anton', sans-serif; font-size: 22px; letter-spacing: 2px;
    background: var(--gradient-button);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    text-transform: uppercase; text-decoration: none;
  }
  .elinity-page .nav-right { display: flex; align-items: center; gap: 32px; }
  .elinity-page .nav-link {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.1em;
    color: var(--text-secondary); text-decoration: none; text-transform: uppercase;
    transition: color 0.2s;
  }
  .elinity-page .nav-link:hover { color: var(--primary-main); }
  .elinity-page .nav-btn {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.1em;
    color: var(--text-primary); background: var(--gradient-button);
    border: none; padding: 10px 20px; text-transform: uppercase;
    cursor: pointer; transition: opacity 0.2s; border-radius: 2px;
  }
  .elinity-page .nav-btn:hover { opacity: 0.82; }

  /* ── Section label ── */
  .elinity-page .section-label {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.15em;
    color: var(--text-secondary); text-transform: uppercase; opacity: 0.55;
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 40px; border-bottom: 1px solid var(--border);
  }

  /* ── Display ── */
  .elinity-page .display {
    font-family: 'Anton', sans-serif;
    font-size: clamp(56px, 10vw, 130px);
    line-height: 0.92; letter-spacing: -1px;
    color: var(--text-primary);
  }

  /* ── Hero ── */
  .elinity-page .hero {
    padding: 120px 40px 0;
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--border);
    min-height: 100vh; align-items: start;
  }
  .elinity-page .hero-left { padding: 60px 60px 60px 0; border-right: 1px solid var(--border); }
  .elinity-page .hero-tagline {
    font-family: 'Space Mono', monospace; font-size: 11px;
    color: var(--primary-main); letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 40px; display: flex; align-items: center; gap: 12px;
  }
  .elinity-page .hero-tagline::before { content: ''; display: block; width: 32px; height: 1px; background: var(--primary-main); }
  .elinity-page .hero-body { margin-top: 40px; max-width: 480px; font-size: 16px; color: var(--text-secondary); line-height: 1.75; }
  .elinity-page .hero-cta-row { display: flex; gap: 16px; margin-top: 56px; flex-wrap: wrap; }
  .elinity-page .hero-right {
    display: flex; align-items: flex-end; justify-content: center;
    padding: 60px 0 0; position: relative; overflow: hidden;
  }
  .elinity-page .creature-bg {
    width: 70%; aspect-ratio: 1;
    background: var(--gradient-bg);
    border-radius: 50% 50% 0 0;
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    opacity: 0.55;
  }
  .elinity-page .creature { position: relative; z-index: 2; width: 280px; }
  .elinity-page .blob-svg { width: 100%; height: auto; filter: drop-shadow(0 40px 80px rgba(168,85,247,0.5)); }

  /* ── Buttons ── */
  .elinity-page .btn-primary {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.12em;
    background: var(--gradient-button); color: var(--text-primary);
    padding: 14px 28px;  border: none;
    cursor: pointer; transition: opacity 0.2s; font-weight: 700; border-radius: 2px;
  }
  .elinity-page .btn-primary:hover { opacity: 0.82; }
  .elinity-page .btn-outline {
    font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.12em;
    background: transparent; color: var(--text-light);
    padding: 14px 28px; 
    border: 1px solid var(--ui-border);
    cursor: pointer; transition: border-color 0.2s, color 0.2s; border-radius: 2px;
  }
  .elinity-page .btn-outline:hover { border-color: var(--primary-main); color: var(--primary-main); }

  /* ── Marquee ── */
  .elinity-page .marquee-wrap {
    overflow: hidden; padding: 16px 0;
    background: var(--gradient-button);
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  }
  .elinity-page .marquee-track { display: flex; animation: marquee 18s linear infinite; white-space: nowrap; }
  .elinity-page .marquee-item {
    font-family: 'Anton', sans-serif; font-size: 18px; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text-primary);
    padding: 0 32px; display: flex; align-items: center; gap: 32px;
  }
  .elinity-page .marquee-item::after { content: '✦'; font-size: 14px; opacity: 0.7; }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  .elinity-page .section { border-bottom: 1px solid var(--border); }

  /* ── Statement ── */
  .elinity-page .statement-section { padding: 100px 40px; border-bottom: 1px solid var(--border); }
  .elinity-page .statement-row { display: flex; align-items: flex-start; gap: 80px; }

  /* ── Features ── */
  .elinity-page .features-header {
    padding: 60px 40px 40px; border-bottom: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .elinity-page .features-scroll { display: grid; grid-template-columns: repeat(4,1fr); }
  .elinity-page .feature-col {
    padding: 40px; border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border); transition: background 0.2s;
  }
  .elinity-page .feature-col:last-child { border-right: none; }
  .elinity-page .feature-col:hover { background: var(--bg-panel); }
  .elinity-page .feature-dot { width: 8px; height: 8px; border-radius: 50%; margin-bottom: 24px; }
  .elinity-page .feature-title { font-family: 'Anton', sans-serif; font-size: 20px; color: var(--text-primary); margin-bottom: 12px; line-height: 1.1; }
  .elinity-page .feature-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.8; }

  /* ── Beliefs ── */
  .elinity-page .beliefs-section { background: var(--bg-deep); border-bottom: 1px solid var(--border); }
  .elinity-page .beliefs-header { padding: 60px 40px 40px; border-bottom: 1px solid rgba(168,85,247,0.2); }
  .elinity-page .beliefs-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }
  .elinity-page .belief-cell { padding: 40px; border-right: 1px solid rgba(168,85,247,0.2); border-bottom: 1px solid rgba(168,85,247,0.2); }
  .elinity-page .belief-cell:nth-child(3n) { border-right: none; }
  .elinity-page .belief-num { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--primary-main); letter-spacing: 0.15em; margin-bottom: 16px; opacity: 0.7; }
  .elinity-page .belief-title { font-family: 'Anton', sans-serif; font-size: 22px; text-transform: uppercase; color: var(--text-light); margin-bottom: 12px; }
  .elinity-page .belief-body { font-size: 13px; color: var(--text-secondary); line-height: 1.8; }

  /* ── Tribes ── */
  .elinity-page .tribes-section { background: var(--bg-panel); border-bottom: 1px solid var(--border); }
  .elinity-page .tribes-header { padding: 60px 40px; border-bottom: 1px solid var(--border); }
  .elinity-page .tribe-grid { display: grid; grid-template-columns: repeat(5,1fr); }
  .elinity-page .tribe-cell { padding: 40px 32px; border-right: 1px solid var(--border); transition: background 0.2s; cursor: pointer; }
  .elinity-page .tribe-cell:last-child { border-right: none; }
  .elinity-page .tribe-cell:hover { background: var(--ui-input); }
  .elinity-page .tribe-num { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--primary-main); letter-spacing: 0.12em; margin-bottom: 24px; opacity: 0.7; }
  .elinity-page .tribe-name { font-family: 'Anton', sans-serif; font-size: 24px; text-transform: uppercase; color: var(--text-light); line-height: 1.05; margin-bottom: 16px; }
  .elinity-page .tribe-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.75; }

  /* ── Steps ── */
  .elinity-page .steps-section { border-bottom: 1px solid var(--border); }
  .elinity-page .steps-header { padding: 60px 40px 40px; border-bottom: 1px solid var(--border); }
  .elinity-page .step-row {
    display: grid; grid-template-columns: 80px 1fr 1fr;
    align-items: start; padding: 40px; border-bottom: 1px solid var(--border);
    gap: 40px; transition: background 0.2s; cursor: pointer;
  }
  .elinity-page .step-row:hover { background: var(--bg-panel); }
  .elinity-page .step-row:last-child { border-bottom: none; }
  .elinity-page .step-idx { font-family: 'Anton', sans-serif; font-size: 48px; color: var(--primary-main); line-height: 1; }
  .elinity-page .step-title { font-family: 'Anton', sans-serif; font-size: 28px;  color: var(--text-primary); line-height: 1.1; align-self: center; }
  .elinity-page .step-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.8; align-self: center; }

  /* ── Lumi / Resonance ── */
  .elinity-page .lumi-section { border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; }
  .elinity-page .lumi-left { padding: 80px 40px; border-right: 1px solid var(--border); display: flex; flex-direction: column; justify-content: space-between; }
  .elinity-page .lumi-right { background: var(--bg-panel); display: flex; align-items: center; justify-content: center; padding: 80px 40px; position: relative; overflow: hidden; }
  .elinity-page .lumi-creature-bg { position: absolute; width: 320px; height: 320px; background: var(--gradient-bg); border-radius: 50%; bottom: -60px; left: 50%; transform: translateX(-50%); opacity: 0.25; }
  .elinity-page .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); }
  .elinity-page .stat-cell { background: var(--bg-main); padding: 24px; }
  .elinity-page .stat-num { font-family: 'Anton', sans-serif; font-size: 36px; }
  .elinity-page .stat-label { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text-secondary); letter-spacing: 0.1em; margin-top: 4px; }

  /* ── Closing ── */
  .elinity-page .closing { padding: 120px 40px; border-bottom: 1px solid var(--border); text-align: center; }
  .elinity-page .closing-sub {
    font-family: 'Space Mono', monospace; font-size: 13px; color: var(--text-secondary);
    letter-spacing: 0.08em; margin-top: 40px; max-width: 560px;
    margin-left: auto; margin-right: auto; line-height: 1.8;
  }
  .elinity-page .closing-cta-row { margin-top: 56px; display: flex; justify-content: center; gap: 16px; }

  /* ── Fade-in ── */
  .elinity-page .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .elinity-page .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .elinity-page .hero { grid-template-columns: 1fr; padding: 100px 20px 0; }
    .elinity-page .hero-left { border-right: none; padding-right: 0; }
    .elinity-page .hero-right { display: none; }
    .elinity-page .section-label { padding: 14px 20px; }
    .elinity-page .display { font-size: clamp(40px, 12vw, 80px); }
    .elinity-page .features-scroll, .elinity-page .tribe-grid { grid-template-columns: 1fr; }
    .elinity-page .beliefs-grid { grid-template-columns: 1fr; }
    .elinity-page .belief-cell { border-right: none !important; }
    .elinity-page .tribe-cell { border-right: none; border-bottom: 1px solid var(--border); }
    .elinity-page .lumi-section { grid-template-columns: 1fr; }
    .elinity-page .lumi-right { display: none; }
    .elinity-page .step-row { grid-template-columns: 60px 1fr; }
    .elinity-page .step-desc { display: none; }
    .elinity-page .statement-row { flex-direction: column; gap: 32px; }
    .elinity-page .statement-section, .elinity-page .closing, .elinity-page .steps-header, .elinity-page .features-header,
    .elinity-page .tribes-header, .elinity-page .beliefs-header, .elinity-page .lumi-left,
    .elinity-page .feature-col, .elinity-page .belief-cell, .elinity-page .tribe-cell, .elinity-page .step-row { padding-left: 20px; padding-right: 20px; }
    .elinity-page .closing { padding: 60px 20px; }
  }
`;

// ─── Components ───────────────────────────────────────────────────────────────

const GlobalStyles: FC = () => (
  <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
);



const CustomCursor: FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top  = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", onMove);

    let rafId: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const expand = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(2)";
      if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; }
    };
    const shrink = () => {
      if (cursorRef.current) cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) { ringRef.current.style.width = "36px"; ringRef.current.style.height = "36px"; }
    };

    const targets = document.querySelectorAll<HTMLElement>("button, a, .tribe-cell, .step-row, .feature-col");
    targets.forEach((el) => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      targets.forEach((el) => { el.removeEventListener("mouseenter", expand); el.removeEventListener("mouseleave", shrink); });
    };
  }, []);

  return (
    <>
      <div className="elinity-cursor" ref={cursorRef} />
      <div className="elinity-cursor-ring" ref={ringRef} />
    </>
  );
};

const words = ["social connector", "matchmaker", "relationship buddy"];


interface PixelAnimation {
  name: string;
  frames: number;
}
 
interface PixelData {
  x: number;
  y: number;
  color: string;
  opacity: number;
}
 
type AnimationType = "Wave" | "Dance" | "Jump" | "Spin" | "Excited" | null;
 
// ─── Constants ────────────────────────────────────────────────────────────────
 
const PIXEL_SIZE = 9;
const CANVAS_W = 340;
const CANVAS_H = 340;
 
const pixelAnimations: PixelAnimation[] = [
  { name: "Hello I am Lumi", frames: 4 },
  { name: "Loading Magic...", frames: 6 },
  { name: "Processing Prompts...", frames: 5 },
  { name: "Charging Energy...", frames: 8 },
  { name: "Ready to Explore!", frames: 6 },
];
 
const ANIMATION_TYPES: AnimationType[] = [
  "Wave",
  "Dance",
  "Jump",
  "Spin",
  "Excited",
];
 
// ─── Base Robot Pixel Map ─────────────────────────────────────────────────────
 
const BASE_ROBOT: [number, number, string][] = [
  // Antenna ball
  [19, 1, "#FFE5B4"], [20, 1, "#FFE5B4"], [21, 1, "#FFE5B4"],
  [19, 2, "#FFE5B4"], [20, 2, "#FFF4D6"], [21, 2, "#FFE5B4"],
  [19, 3, "#FFE5B4"], [20, 3, "#FFE5B4"], [21, 3, "#FFE5B4"],
  // Antenna connector
  [20, 4, "#6B8DB8"], [20, 5, "#6B8DB8"],
  // Head top
  [17, 6, "#7BA3D1"], [18, 6, "#7BA3D1"], [19, 6, "#7BA3D1"], [20, 6, "#7BA3D1"], [21, 6, "#7BA3D1"], [22, 6, "#7BA3D1"], [23, 6, "#7BA3D1"],
  // Head upper
  [16, 7, "#7BA3D1"], [17, 7, "#7BA3D1"], [18, 7, "#7BA3D1"], [19, 7, "#7BA3D1"], [20, 7, "#7BA3D1"], [21, 7, "#7BA3D1"], [22, 7, "#7BA3D1"], [23, 7, "#7BA3D1"], [24, 7, "#7BA3D1"],
  // Face screen
  [16, 8, "#7BA3D1"], [17, 8, "#E8F0FF"], [18, 8, "#E8F0FF"], [19, 8, "#E8F0FF"], [20, 8, "#E8F0FF"], [21, 8, "#E8F0FF"], [22, 8, "#E8F0FF"], [23, 8, "#E8F0FF"], [24, 8, "#7BA3D1"],
  [16, 9, "#7BA3D1"], [17, 9, "#E8F0FF"], [18, 9, "#E8F0FF"], [19, 9, "#E8F0FF"], [20, 9, "#E8F0FF"], [21, 9, "#E8F0FF"], [22, 9, "#E8F0FF"], [23, 9, "#E8F0FF"], [24, 9, "#7BA3D1"],
  // Eyes
  [16, 10, "#7BA3D1"], [17, 10, "#E8F0FF"], [18, 10, "#4A5F7F"], [19, 10, "#2C3E50"], [20, 10, "#E8F0FF"], [21, 10, "#E8F0FF"], [22, 10, "#4A5F7F"], [23, 10, "#E8F0FF"], [24, 10, "#7BA3D1"],
  [16, 11, "#7BA3D1"], [17, 11, "#E8F0FF"], [18, 11, "#2C3E50"], [19, 11, "#FFD700"], [20, 11, "#E8F0FF"], [21, 11, "#2C3E50"], [22, 11, "#FFD700"], [23, 11, "#E8F0FF"], [24, 11, "#7BA3D1"],
  // Smile
  [16, 12, "#7BA3D1"], [17, 12, "#E8F0FF"], [18, 12, "#E8F0FF"], [19, 12, "#5B7DAE"], [20, 12, "#5B7DAE"], [21, 12, "#5B7DAE"], [22, 12, "#E8F0FF"], [23, 12, "#E8F0FF"], [24, 12, "#7BA3D1"],
  [16, 13, "#7BA3D1"], [17, 13, "#E8F0FF"], [18, 13, "#5B7DAE"], [19, 13, "#E8F0FF"], [20, 13, "#E8F0FF"], [21, 13, "#E8F0FF"], [22, 13, "#5B7DAE"], [23, 13, "#E8F0FF"], [24, 13, "#7BA3D1"],
  // Head bottom
  [16, 14, "#7BA3D1"], [17, 14, "#7BA3D1"], [18, 14, "#7BA3D1"], [19, 14, "#7BA3D1"], [20, 14, "#7BA3D1"], [21, 14, "#7BA3D1"], [22, 14, "#7BA3D1"], [23, 14, "#7BA3D1"], [24, 14, "#7BA3D1"],
  // Left ear
  [14, 9, "#FFB4C8"], [15, 9, "#FFB4C8"],
  [14, 10, "#FFB4C8"], [15, 10, "#FFC8DC"],
  [14, 11, "#FFB4C8"], [15, 11, "#FFB4C8"],
  [13, 10, "#FFD700"],
  // Right ear
  [25, 9, "#FFB4C8"], [26, 9, "#FFB4C8"],
  [25, 10, "#FFC8DC"], [26, 10, "#FFB4C8"],
  [25, 11, "#FFB4C8"], [26, 11, "#FFB4C8"],
  [27, 10, "#FFD700"],
  // Neck
  [19, 15, "#6B8DB8"], [20, 15, "#6B8DB8"], [21, 15, "#6B8DB8"],
  // Body top
  [17, 16, "#7BA3D1"], [18, 16, "#7BA3D1"], [19, 16, "#7BA3D1"], [20, 16, "#7BA3D1"], [21, 16, "#7BA3D1"], [22, 16, "#7BA3D1"], [23, 16, "#7BA3D1"],
  // Body with heart
  [16, 17, "#7BA3D1"], [17, 17, "#7BA3D1"], [18, 17, "#7BA3D1"], [19, 17, "#7BA3D1"], [20, 17, "#7BA3D1"], [21, 17, "#7BA3D1"], [22, 17, "#7BA3D1"], [23, 17, "#7BA3D1"], [24, 17, "#7BA3D1"],
  [16, 18, "#7BA3D1"], [17, 18, "#7BA3D1"], [18, 18, "#FFD700"], [19, 18, "#FFC850"], [20, 18, "#7BA3D1"], [21, 18, "#FFD700"], [22, 18, "#FFC850"], [23, 18, "#7BA3D1"], [24, 18, "#7BA3D1"],
  [16, 19, "#7BA3D1"], [17, 19, "#7BA3D1"], [18, 19, "#FFC850"], [19, 19, "#FFD700"], [20, 19, "#FFC850"], [21, 19, "#FFC850"], [22, 19, "#FFD700"], [23, 19, "#7BA3D1"], [24, 19, "#7BA3D1"],
  [16, 20, "#7BA3D1"], [17, 20, "#7BA3D1"], [18, 20, "#FFD700"], [19, 20, "#FFC850"], [20, 20, "#FFD700"], [21, 20, "#FFD700"], [22, 20, "#FFC850"], [23, 20, "#7BA3D1"], [24, 20, "#7BA3D1"],
  [16, 21, "#7BA3D1"], [17, 21, "#7BA3D1"], [18, 21, "#7BA3D1"], [19, 21, "#FFD700"], [20, 21, "#FFC850"], [21, 21, "#FFD700"], [22, 21, "#7BA3D1"], [23, 21, "#7BA3D1"], [24, 21, "#7BA3D1"],
  [16, 22, "#7BA3D1"], [17, 22, "#7BA3D1"], [18, 22, "#7BA3D1"], [19, 22, "#7BA3D1"], [20, 22, "#FFD700"], [21, 22, "#7BA3D1"], [22, 22, "#7BA3D1"], [23, 22, "#7BA3D1"], [24, 22, "#7BA3D1"],
  // Body bottom
  [17, 23, "#7BA3D1"], [18, 23, "#7BA3D1"], [19, 23, "#7BA3D1"], [20, 23, "#7BA3D1"], [21, 23, "#7BA3D1"], [22, 23, "#7BA3D1"], [23, 23, "#7BA3D1"],
  [17, 24, "#6B8DB8"], [18, 24, "#6B8DB8"], [19, 24, "#6B8DB8"], [20, 24, "#6B8DB8"], [21, 24, "#6B8DB8"], [22, 24, "#6B8DB8"], [23, 24, "#6B8DB8"],
  // Left arm
  [11, 18, "#7BA3D1"], [12, 18, "#7BA3D1"],
  [11, 19, "#7BA3D1"], [12, 19, "#7BA3D1"],
  [11, 20, "#7BA3D1"], [12, 20, "#6B8DB8"],
  [10, 21, "#7BA3D1"], [11, 21, "#7BA3D1"], [12, 21, "#6B8DB8"],
  [9, 22, "#7BA3D1"], [10, 22, "#7BA3D1"], [11, 22, "#7BA3D1"],
  [9, 23, "#7BA3D1"], [10, 23, "#6B8DB8"], [11, 23, "#6B8DB8"],
  // Right arm
  [28, 18, "#7BA3D1"], [29, 18, "#7BA3D1"],
  [28, 19, "#7BA3D1"], [29, 19, "#7BA3D1"],
  [28, 20, "#6B8DB8"], [29, 20, "#7BA3D1"],
  [28, 21, "#6B8DB8"], [29, 21, "#7BA3D1"], [30, 21, "#7BA3D1"],
  [29, 22, "#7BA3D1"], [30, 22, "#7BA3D1"], [31, 22, "#7BA3D1"],
  [29, 23, "#6B8DB8"], [30, 23, "#6B8DB8"], [31, 23, "#7BA3D1"],
  // Left leg
  [17, 25, "#7BA3D1"], [18, 25, "#7BA3D1"], [19, 25, "#7BA3D1"],
  [17, 26, "#7BA3D1"], [18, 26, "#7BA3D1"], [19, 26, "#7BA3D1"],
  [17, 27, "#7BA3D1"], [18, 27, "#6B8DB8"], [19, 27, "#7BA3D1"],
  [17, 28, "#7BA3D1"], [18, 28, "#6B8DB8"], [19, 28, "#7BA3D1"],
  [17, 29, "#FFD700"],
  [17, 29, "#6B8DB8"], [18, 29, "#6B8DB8"], [19, 29, "#6B8DB8"],
  [16, 30, "#6B8DB8"], [17, 30, "#6B8DB8"], [18, 30, "#5B7DAE"], [19, 30, "#6B8DB8"], [20, 30, "#6B8DB8"],
  // Right leg
  [21, 25, "#7BA3D1"], [22, 25, "#7BA3D1"], [23, 25, "#7BA3D1"],
  [21, 26, "#7BA3D1"], [22, 26, "#7BA3D1"], [23, 26, "#7BA3D1"],
  [21, 27, "#7BA3D1"], [22, 27, "#6B8DB8"], [23, 27, "#7BA3D1"],
  [21, 28, "#7BA3D1"], [22, 28, "#6B8DB8"], [23, 28, "#7BA3D1"],
  [21, 29, "#6B8DB8"], [22, 29, "#6B8DB8"], [23, 29, "#6B8DB8"],
  [20, 30, "#6B8DB8"], [21, 30, "#6B8DB8"], [22, 30, "#5B7DAE"], [23, 30, "#6B8DB8"], [24, 30, "#6B8DB8"],
  [23, 29, "#FFD700"],
];
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
const isLeftArm = (x: number, y: number) => x >= 9 && x <= 12 && y >= 18 && y <= 23;
const isRightArm = (x: number, y: number) => x >= 28 && x <= 31 && y >= 18 && y <= 23;
const isLeg = (x: number, y: number) =>
  (x >= 17 && x <= 19 && y >= 25 && y <= 30) ||
  (x >= 21 && x <= 23 && y >= 25 && y <= 30);
const isHeart = (c: string) => c === "#FFD700" || c === "#FFC850";
 
// ─── Pixel Transform ──────────────────────────────────────────────────────────
 
function transformPixel(
  bx: number,
  by: number,
  col: string,
  anim: AnimationType,
  t: number
): PixelData {
  let dx = 0;
  let dy = 0;
  let alpha = 1;
  let color = col;
  const cx = 20;
 
  if (anim === "Wave") {
    if (isLeftArm(bx, by)) {
      dy = -Math.sin(t * Math.PI * 2) * 3;
      dx = Math.cos(t * Math.PI * 2) * 1.5;
    }
    if (isRightArm(bx, by)) {
      dy = Math.sin(t * Math.PI * 2 + Math.PI) * 2;
    }
  } else if (anim === "Dance") {
    dx = Math.sin(t * Math.PI * 4) * 1.5;
    if (isLeftArm(bx, by)) {
      dy = -Math.abs(Math.sin(t * Math.PI * 4)) * 4;
      dx += -1;
    }
    if (isRightArm(bx, by)) {
      dy = -Math.abs(Math.sin(t * Math.PI * 4 + Math.PI)) * 4;
      dx += 1;
    }
    if (isLeg(bx, by)) {
      dy = Math.sin(t * Math.PI * 4 + (bx < 20 ? 0 : Math.PI)) * 2;
    }
  } else if (anim === "Jump") {
    const jumpY = -Math.abs(Math.sin(t * Math.PI)) * 6;
    dy = jumpY;
    if (jumpY > -1) {
      const squash = 0.15 * (1 - Math.abs(jumpY) / 6);
      dx = (bx - cx) * squash;
      dy += (by - 17) * (-squash * 0.5);
    }
  } else if (anim === "Spin") {
    const angle = t * Math.PI * 2;
    const rx = (bx - cx) * Math.cos(angle);
    dx = rx - (bx - cx);
    dy = (bx - cx) * Math.sin(angle) * 0.3;
    alpha = 0.6 + Math.abs(Math.cos(angle)) * 0.4;
  } else if (anim === "Excited") {
    dx = Math.sin(t * Math.PI * 8) * 0.8;
    dy = Math.cos(t * Math.PI * 8) * 0.8;
    if (isLeftArm(bx, by) || isRightArm(bx, by)) {
      dy -= Math.abs(Math.sin(t * Math.PI)) * 3;
    }
    if (isHeart(col)) {
      color = t % 0.5 < 0.25 ? "#FFD700" : "#FF8C00";
    }
  }
 
  return {
    x: Math.round((bx + dx) * PIXEL_SIZE),
    y: Math.round((by + dy) * PIXEL_SIZE),
    color,
    opacity: alpha,
  };
}
 
// ─── Canvas Renderer ──────────────────────────────────────────────────────────
 
function renderFrame(
  ctx: CanvasRenderingContext2D,
  anim: AnimationType,
  t: number
) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  for (const [bx, by, col] of BASE_ROBOT) {
    const px = transformPixel(bx, by, col, anim, t);
    ctx.globalAlpha = px.opacity;
    ctx.fillStyle = px.color;
    ctx.fillRect(px.x, px.y, PIXEL_SIZE, PIXEL_SIZE);
  }
  ctx.globalAlpha = 1;
}
 
// ─── HeroCreature ─────────────────────────────────────────────────────────────
 
const HeroCreature: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []); 
 
  const [hoverCount, setHoverCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
 
  // Draw idle state on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderFrame(ctx, null, 0);
  }, []);
 
  const stopAnim = () => {
    if (frameTimerRef.current) clearInterval(frameTimerRef.current);
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    setIsAnimating(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) renderFrame(ctx, null, 0);
    }
  };
 
  const handleHover = () => {
    // Stop any running animation first
    if (frameTimerRef.current) clearInterval(frameTimerRef.current);
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
 
    const nextCount = hoverCount + 1;
    setHoverCount(nextCount);
 
    const animDef = pixelAnimations[nextCount % pixelAnimations.length];
    const animType = ANIMATION_TYPES[nextCount % ANIMATION_TYPES.length];
    const totalFrames = animDef.frames;
    const frameDuration = 140;
    const totalDuration = totalFrames * frameDuration + 400;
 
    setBubbleText(animDef.name);
    setIsAnimating(true);
 
    let frame = 0;
    frameTimerRef.current = setInterval(() => {
      frame = (frame + 1) % totalFrames;
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) renderFrame(ctx, animType, frame / totalFrames);
      }
    }, frameDuration);
 
    endTimerRef.current = setTimeout(stopAnim, totalDuration);
  };
 
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameTimerRef.current) clearInterval(frameTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);
 
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        padding: "60px",
      }}
      onMouseEnter={handleHover}
    >
      {/* Speech Bubble */}
<AnimatePresence>
  {isAnimating && (
    <motion.div
      key={bubbleText}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: -10 }}
      exit={{ opacity: 0, scale: 0.7, y: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        position: "absolute",

        // MOBILE vs DESKTOP positioning
        top: isMobile ? "-48px" : "8%",
        left: isMobile ? "50%" : "75%",
        transform: isMobile ? "translateX(-50%)" : "none",

        backgroundColor: "white",
        color: "#1a1a1a",
        padding: isMobile ? "12px 18px" : "16px 24px",

        border: "4px solid #2C3E50",
        borderRadius: "4px",
        boxShadow: "6px 6px 0px rgba(44, 62, 80, 0.4)",

        fontWeight: "bold",
        fontFamily: '"Courier New", monospace',

        // Responsive text
        fontSize: isMobile ? "0.5rem" : "0.6rem",

        zIndex: 10,
        whiteSpace: "nowrap",
      }}
    >
      {bubbleText}

      {/* Speech bubble tail */}
      <div
        style={{
          position: "absolute",
          bottom: "-16px",
          left: isMobile ? "50%" : "20px",
          transform: isMobile ? "translateX(-50%)" : "none",

          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "16px solid white",

          filter: "drop-shadow(2px 4px 0px rgba(44, 62, 80, 0.3))",
        }}
      />
    </motion.div>
  )}
</AnimatePresence>
 
      {/* Pixel Robot Canvas */}
      <div
        style={{
          position: "relative",
          width: `${CANVAS_W}px`,
          height: `${CANVAS_H}px`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ imageRendering: "pixelated", display: "block" }}
        />
 
        {/* Glow effects during animation */}
        <AnimatePresence>
          {isAnimating && (
            <>
              <motion.div
                key="glow1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.2, 0.9] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "300px",
                  height: "300px",
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              />
              <motion.div
                key="glow2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "280px",
                  height: "280px",
                  background:
                    "radial-gradient(circle, rgba(119,89,253,0.3) 0%, transparent 70%)",
                  filter: "blur(30px)",
                  zIndex: -2,
                  pointerEvents: "none",
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


interface AnimationMessage {
  text: string;
  emotionColor: string;
}
 
type AnimationState =
  | "idle"
  | "wave"
  | "dance"
  | "jump"
  | "spin"
  | "excited";
 
// ─── Constants ────────────────────────────────────────────────────────────────
 
const MESSAGES: AnimationMessage[] = [
  { text: "Hello! I am Lumi ✨", emotionColor: "#7BA3D1" },
  { text: "Loading Magic...", emotionColor: "#9B7BE8" },
  { text: "Processing Prompts...", emotionColor: "#5DCAA5" },
  { text: "Charging Energy! ⚡", emotionColor: "#FFD700" },
  { text: "Ready to Explore! 🚀", emotionColor: "#FF8C69" },
];
 
const ANIMATION_SEQUENCE: AnimationState[] = [
  "wave",
  "dance",
  "jump",
  "spin",
  "excited",
];
 
const COLORS = {
  bodyBlue: "#7BA3D1",
  bodyBlueDark: "#5B85B8",
  bodyBlueLight: "#A8C4E8",
  bodyBluePale: "#D4E5F7",
  bodyBlueShadow: "#4A6E9E",
  earPink: "#F0B8C8",
  earPinkLight: "#FAD4E2",
  eyeGlow: "#FFD700",
  eyeGlowOuter: "#FF9500",
  heartGold: "#FFD700",
  heartOrange: "#FF8C00",
  antennaOrb: "#FFE5A0",
  antennaOrbGlow: "#FFD060",
  neckDark: "#5A7EA8",
  footDark: "#4A6E9E",
  shadowBase: "#3A5C88",
  white: "#FFFFFF",
  screenBg: "#EAF2FF",
};
 
// ─── Framer Motion Variants ───────────────────────────────────────────────────
 
const floatVariants: Variants = {
  idle: {
    y: [0, -10, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  wave: {
    y: [0, -6, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  dance: {
    x: [-8, 8, -8],
    y: [0, -5, 0],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  jump: {
    y: [0, -30, 0],
    transition: {
      duration: 0.6,
      repeat: 3,
      ease: [0.2, 0, 0.8, 1],
    },
  },
  spin: {
    rotate: [0, 360],
    transition: {
      duration: 1.2,
      repeat: 2,
      ease: "easeInOut",
    },
  },
  excited: {
    y: [0, -8, 0, -8, 0],
    x: [-3, 3, -3, 3, 0],
    transition: {
      duration: 0.4,
      repeat: 4,
      ease: "easeInOut",
    },
  },
};
 
const leftArmVariants: Variants = {
  idle: {
    rotate: 0,
    y: 0,
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
  wave: {
    rotate: [-10, -50, -10],
    y: [-5, -15, -5],
    transition: { duration: 0.5, repeat: 6, ease: "easeInOut" },
  },
  dance: {
    rotate: [-20, 20, -20],
    transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
  },
  jump: { rotate: -30, y: -5, transition: { duration: 0.3 } },
  spin: { rotate: 0, y: 0 },
  excited: {
    rotate: [-40, 40, -40],
    y: [-10, 0, -10],
    transition: { duration: 0.4, repeat: 5, ease: "easeInOut" },
  },
};
 
const rightArmVariants: Variants = {
  idle: { rotate: 0, y: 0 },
  wave: { rotate: 0, y: 0 },
  dance: {
    rotate: [20, -20, 20],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.35,
    },
  },
  jump: { rotate: 30, y: -5, transition: { duration: 0.3 } },
  spin: { rotate: 0, y: 0 },
  excited: {
    rotate: [40, -40, 40],
    y: [-10, 0, -10],
    transition: {
      duration: 0.4,
      repeat: 5,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};
 
const heartVariants: Variants = {
  idle: {
    scale: [1, 1.12, 1],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
  wave: {
    scale: [1, 1.25, 1],
    transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
  },
  dance: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
  },
  jump: {
    scale: [1, 1.4, 1],
    transition: { duration: 0.6, repeat: 3, ease: "easeInOut" },
  },
  spin: {
    scale: [1, 1.2, 1],
    transition: { duration: 1.2, repeat: 2, ease: "easeInOut" },
  },
  excited: {
    scale: [1, 1.5, 1, 1.5, 1],
    transition: { duration: 0.4, repeat: 4 },
  },
};
 
const glowVariants: Variants = {
  idle: {
    opacity: [0.25, 0.45, 0.25],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
  wave: {
    opacity: [0.35, 0.6, 0.35],
    scale: [0.98, 1.1, 0.98],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
  },
  dance: {
    opacity: [0.4, 0.7, 0.4],
    scale: [1, 1.15, 1],
    transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
  },
  jump: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.2, 1],
    transition: { duration: 0.6, repeat: 3 },
  },
  spin: {
    opacity: [0.4, 0.8, 0.4],
    scale: [0.9, 1.2, 0.9],
    transition: { duration: 1.2, repeat: 2 },
  },
  excited: {
    opacity: [0.5, 0.9, 0.5],
    scale: [1, 1.25, 1],
    transition: { duration: 0.4, repeat: 4 },
  },
};
 
// ─── Sub-components ───────────────────────────────────────────────────────────
 
const BlinkingEyes: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [blink, setBlink] = useState(false);
 
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = isActive
        ? 1500 + Math.random() * 1500
        : 2500 + Math.random() * 3000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleRef.current = scheduleBlink();
        }, 130);
      }, delay);
    };
 
    const scheduleRef = { current: scheduleBlink() };
    return () => clearTimeout(scheduleRef.current);
  }, [isActive]);
 
  const eyeScaleY = blink ? 0.07 : 1;
 
  return (
    <g>
      {/* Left eye */}
      <motion.g
        animate={{ scaleY: eyeScaleY }}
        transition={{ duration: 0.06 }}
        style={{ transformOrigin: "148px 155px" }}
      >
        <ellipse cx="148" cy="155" rx="22" ry="24" fill={COLORS.eyeGlowOuter} opacity="0.3" />
        <ellipse cx="148" cy="155" rx="18" ry="20" fill="#2C3E50" />
        <ellipse cx="148" cy="155" rx="12" ry="14" fill={COLORS.eyeGlow} />
        <ellipse cx="148" cy="155" rx="6" ry="7" fill="#FFF8E0" opacity="0.9" />
        <ellipse cx="143" cy="150" rx="3" ry="3" fill={COLORS.white} opacity="0.7" />
      </motion.g>
 
      {/* Right eye */}
      <motion.g
        animate={{ scaleY: eyeScaleY }}
        transition={{ duration: 0.06 }}
        style={{ transformOrigin: "222px 155px" }}
      >
        <ellipse cx="222" cy="155" rx="22" ry="24" fill={COLORS.eyeGlowOuter} opacity="0.3" />
        <ellipse cx="222" cy="155" rx="18" ry="20" fill="#2C3E50" />
        <ellipse cx="222" cy="155" rx="12" ry="14" fill={COLORS.eyeGlow} />
        <ellipse cx="222" cy="155" rx="6" ry="7" fill="#FFF8E0" opacity="0.9" />
        <ellipse cx="217" cy="150" rx="3" ry="3" fill={COLORS.white} opacity="0.7" />
      </motion.g>
    </g>
  );
};
 
const HeartChest: React.FC<{ animState: AnimationState }> = ({ animState }) => {
  const isExcited = animState === "excited";
  const heartColor = isExcited ? COLORS.heartOrange : COLORS.heartGold;
 
  return (
    <motion.g variants={heartVariants} animate={animState} initial="idle">
      {/* Heart glow */}
      <ellipse cx="185" cy="335" rx="35" ry="28" fill={heartColor} opacity="0.25" />
      {/* Heart shape */}
      <path
        d="M185 350 C185 350 155 330 155 315 C155 305 163 298 172 298 C177 298 182 301 185 305 C188 301 193 298 198 298 C207 298 215 305 215 315 C215 330 185 350 185 350Z"
        fill={heartColor}
        opacity="0.95"
      />
      {/* Heart inner highlight */}
      <path
        d="M178 308 C178 308 168 318 168 324"
        stroke={COLORS.white}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </motion.g>
  );
};
 
const Sparkles: React.FC<{ visible: boolean }> = ({ visible }) => {
  const positions = [
    { x: 60, y: 120, delay: 0, size: 8 },
    { x: 310, y: 95, delay: 0.3, size: 6 },
    { x: 45, y: 280, delay: 0.6, size: 5 },
    { x: 320, y: 320, delay: 0.9, size: 7 },
    { x: 180, y: 50, delay: 0.2, size: 5 },
    { x: 280, y: 200, delay: 0.7, size: 6 },
  ];
 
  return (
    <AnimatePresence>
      {visible &&
        positions.map((pos, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [0, -15, -30],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: pos.delay,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
          >
            <path
              d={`M${pos.x} ${pos.y - pos.size} L${pos.x + 1.5} ${pos.y - 1.5} L${pos.x + pos.size} ${pos.y} L${pos.x + 1.5} ${pos.y + 1.5} L${pos.x} ${pos.y + pos.size} L${pos.x - 1.5} ${pos.y + 1.5} L${pos.x - pos.size} ${pos.y} L${pos.x - 1.5} ${pos.y - 1.5} Z`}
              fill={i % 2 === 0 ? COLORS.eyeGlow : COLORS.antennaOrb}
              opacity="0.85"
            />
          </motion.g>
        ))}
    </AnimatePresence>
  );
};
 
// ─── Main Robot SVG ───────────────────────────────────────────────────────────
 
const RobotSVG: React.FC<{ animState: AnimationState }> = ({ animState }) => {
  return (
    <svg
      viewBox="0 0 370 520"
      width="100%"
      style={{ maxWidth: 340, overflow: "visible" }}
      aria-label="Lumi the robot mascot"
    >
      <defs>
        {/* Body gradient */}
        <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={COLORS.bodyBlueLight} />
          <stop offset="55%" stopColor={COLORS.bodyBlue} />
          <stop offset="100%" stopColor={COLORS.bodyBlueDark} />
        </radialGradient>
 
        {/* Head gradient */}
        <radialGradient id="headGrad" cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor={COLORS.bodyBluePale} />
          <stop offset="45%" stopColor={COLORS.bodyBlueLight} />
          <stop offset="100%" stopColor={COLORS.bodyBlueDark} />
        </radialGradient>
 
        {/* Face screen gradient */}
        <radialGradient id="faceGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={COLORS.screenBg} />
          <stop offset="100%" stopColor="#C8DCFA" />
        </radialGradient>
 
        {/* Ear gradient */}
        <radialGradient id="earGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor={COLORS.earPinkLight} />
          <stop offset="100%" stopColor={COLORS.earPink} />
        </radialGradient>
 
        {/* Antenna orb gradient */}
        <radialGradient id="orbGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFAE0" />
          <stop offset="50%" stopColor={COLORS.antennaOrb} />
          <stop offset="100%" stopColor={COLORS.antennaOrbGlow} />
        </radialGradient>
 
        {/* Limb gradient */}
        <linearGradient id="limbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.bodyBlueLight} />
          <stop offset="100%" stopColor={COLORS.bodyBlueDark} />
        </linearGradient>
 
        {/* Shadow gradient */}
        <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLORS.shadowBase} stopOpacity="0.35" />
          <stop offset="100%" stopColor={COLORS.shadowBase} stopOpacity="0" />
        </radialGradient>
 
        {/* Foot gradient */}
        <linearGradient id="footGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={COLORS.bodyBlue} />
          <stop offset="100%" stopColor={COLORS.footDark} />
        </linearGradient>
      </defs>
 
      {/* Sparkles */}
      <Sparkles visible={animState !== "idle"} />
 
      {/* ── Floating shadow ── */}
      <motion.ellipse
        cx="185"
        cy="510"
        rx="80"
        ry="10"
        fill="url(#shadowGrad)"
        animate={
          animState === "jump"
            ? { rx: 100, ry: 7, opacity: 0.5 }
            : { rx: 80, ry: 10, opacity: 1 }
        }
        transition={{ duration: 0.3 }}
      />
 
      {/* ── Right arm (behind body) ── */}
      <motion.g
        variants={rightArmVariants}
        animate={animState}
        initial="idle"
        style={{ transformOrigin: "270px 310px" }}
      >
        {/* Upper right arm */}
        <rect x="265" y="290" width="42" height="65" rx="21" fill="url(#bodyGrad)" />
        {/* Right elbow joint */}
        <ellipse cx="286" cy="355" rx="22" ry="18" fill={COLORS.bodyBlue} />
        <ellipse cx="286" cy="355" rx="16" ry="12" fill={COLORS.bodyBlueDark} />
        {/* Lower right arm */}
        <rect x="268" y="350" width="36" height="60" rx="18" fill="url(#limbGrad)" />
        {/* Right hand */}
        <ellipse cx="286" cy="418" rx="24" ry="20" fill="url(#bodyGrad)" />
        {/* Right hand knuckle highlight */}
        <ellipse cx="293" cy="412" rx="6" ry="5" fill={COLORS.bodyBluePale} opacity="0.4" />
        {/* Blue dot on right arm */}
        <ellipse cx="286" cy="370" rx="8" ry="7" fill={COLORS.screenBg} opacity="0.6" />
      </motion.g>
 
      {/* ── Left leg ── */}
      <rect x="118" y="400" width="58" height="75" rx="22" fill="url(#bodyGrad)" />
      {/* Left knee joint */}
      <ellipse cx="147" cy="465" rx="28" ry="20" fill={COLORS.bodyBlueDark} opacity="0.5" />
      {/* Left foot */}
      <ellipse cx="143" cy="488" rx="38" ry="22" fill="url(#footGrad)" />
      <ellipse cx="143" cy="488" rx="30" ry="16" fill={COLORS.bodyBlue} opacity="0.4" />
      {/* Left foot glow dot */}
      <ellipse cx="143" cy="493" rx="10" ry="6" fill={COLORS.eyeGlow} opacity="0.7" />
 
      {/* ── Right leg ── */}
      <rect x="194" y="400" width="58" height="75" rx="22" fill="url(#bodyGrad)" />
      {/* Right knee joint */}
      <ellipse cx="223" cy="465" rx="28" ry="20" fill={COLORS.bodyBlueDark} opacity="0.5" />
      {/* Right foot */}
      <ellipse cx="227" cy="488" rx="38" ry="22" fill="url(#footGrad)" />
      <ellipse cx="227" cy="488" rx="30" ry="16" fill={COLORS.bodyBlue} opacity="0.4" />
      {/* Right foot glow dot */}
      <ellipse cx="227" cy="493" rx="10" ry="6" fill={COLORS.eyeGlow} opacity="0.7" />
 
      {/* ── Body ── */}
      <rect x="105" y="270" width="160" height="145" rx="45" fill="url(#bodyGrad)" />
 
      {/* Body shoulder curve top */}
      <ellipse cx="185" cy="270" rx="80" ry="25" fill="url(#bodyGrad)" />
 
      {/* Body waist band */}
      <rect x="108" y="390" width="154" height="20" rx="10" fill={COLORS.neckDark} opacity="0.35" />
 
      {/* Body highlight */}
      <ellipse cx="155" cy="295" rx="30" ry="20" fill={COLORS.bodyBluePale} opacity="0.25" />
 
      {/* Heart chest */}
      <HeartChest animState={animState} />
 
      {/* ── Left arm (waving, in front) ── */}
      <motion.g
        variants={leftArmVariants}
        animate={animState}
        initial="idle"
        style={{ transformOrigin: "100px 310px" }}
      >
        {/* Upper left arm */}
        <rect x="62" y="290" width="42" height="65" rx="21" fill="url(#bodyGrad)" />
        {/* Left elbow joint */}
        <ellipse cx="83" cy="355" rx="22" ry="18" fill={COLORS.bodyBlue} />
        <ellipse cx="83" cy="355" rx="16" ry="12" fill={COLORS.bodyBlueDark} />
        {/* Lower left arm */}
        <rect x="65" y="350" width="36" height="60" rx="18" fill="url(#limbGrad)" />
        {/* Left hand */}
        <ellipse cx="83" cy="418" rx="24" ry="20" fill="url(#bodyGrad)" />
        {/* Left hand knuckle highlight */}
        <ellipse cx="76" cy="412" rx="6" ry="5" fill={COLORS.bodyBluePale} opacity="0.4" />
 
        {/* Waving fingers (subtle) */}
        <motion.g
          animate={
            animState === "wave" || animState === "excited"
              ? { rotate: [-15, 15, -15], transition: { duration: 0.3, repeat: Infinity } }
              : { rotate: 0 }
          }
          style={{ transformOrigin: "83px 410px" }}
        >
          <ellipse cx="70" cy="403" rx="7" ry="10" fill="url(#bodyGrad)" />
          <ellipse cx="83" cy="400" rx="7" ry="11" fill="url(#bodyGrad)" />
          <ellipse cx="96" cy="403" rx="7" ry="10" fill="url(#bodyGrad)" />
        </motion.g>
      </motion.g>
 
      {/* ── Neck ── */}
      <rect x="163" y="248" width="44" height="30" rx="14" fill={COLORS.neckDark} />
      <ellipse cx="185" cy="248" rx="22" ry="10" fill={COLORS.bodyBlue} opacity="0.6" />
 
      {/* ── Head ── */}
      <ellipse cx="185" cy="170" rx="105" ry="110" fill="url(#headGrad)" />
 
      {/* Head highlight */}
      <ellipse cx="145" cy="95" rx="35" ry="22" fill={COLORS.white} opacity="0.12" />
 
      {/* ── Left ear ── */}
      <ellipse cx="80" cy="168" rx="28" ry="32" fill="url(#earGrad)" />
      <ellipse cx="80" cy="168" rx="18" ry="22" fill={COLORS.earPink} opacity="0.5" />
      {/* Ear glow ring */}
      <ellipse cx="80" cy="168" rx="12" ry="15" fill={COLORS.eyeGlow} opacity="0.2" />
      <ellipse cx="80" cy="168" rx="7" ry="9" fill={COLORS.eyeGlow} opacity="0.5" />
 
      {/* ── Right ear ── */}
      <ellipse cx="290" cy="168" rx="28" ry="32" fill="url(#earGrad)" />
      <ellipse cx="290" cy="168" rx="18" ry="22" fill={COLORS.earPink} opacity="0.5" />
      {/* Ear glow ring */}
      <ellipse cx="290" cy="168" rx="12" ry="15" fill={COLORS.eyeGlow} opacity="0.2" />
      <ellipse cx="290" cy="168" rx="7" ry="9" fill={COLORS.eyeGlow} opacity="0.5" />
 
      {/* ── Face screen ── */}
      <ellipse cx="185" cy="172" rx="82" ry="88" fill="url(#faceGrad)" />
      {/* Screen rim */}
      <ellipse cx="185" cy="172" rx="82" ry="88" fill="none" stroke={COLORS.bodyBlueDark} strokeWidth="3" opacity="0.3" />
 
      {/* ── Eyes ── */}
      <BlinkingEyes isActive={animState !== "idle"} />
 
      {/* ── Smile ── */}
      <path
        d="M162 195 Q185 215 208 195"
        fill="none"
        stroke={COLORS.bodyBlueDark}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Cheek blush left */}
      <ellipse cx="142" cy="200" rx="16" ry="10" fill={COLORS.earPink} opacity="0.35" />
      {/* Cheek blush right */}
      <ellipse cx="228" cy="200" rx="16" ry="10" fill={COLORS.earPink} opacity="0.35" />
 
      {/* ── Antenna ── */}
      {/* Antenna stem */}
      <rect x="181" y="55" width="8" height="38" rx="4" fill={COLORS.bodyBlueDark} />
      {/* Antenna orb glow ring */}
      <motion.ellipse
        cx="185"
        cy="46"
        rx="22"
        ry="22"
        fill={COLORS.antennaOrbGlow}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          r: [18, 22, 18],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Antenna orb */}
      <circle cx="185" cy="46" r="16" fill="url(#orbGrad)" />
      <circle cx="179" cy="41" r="5" fill={COLORS.white} opacity="0.5" />
    </svg>
  );
};
 
// ─── Speech Bubble ─────────────────────────────────────────────────────────────
 
const SpeechBubble: React.FC<{
  text: string;
  color: string;
  visible: boolean;
}> = ({ text, color, visible }) => (
  <AnimatePresence mode="wait">
    {visible && (
      <motion.div
        key={text}
        initial={{ opacity: 0, scale: 0.75, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.75, y: 10 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          position: "absolute",
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          border: `2px solid ${color}`,
          borderRadius: 16,
          padding: "10px 20px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'DM Sans', 'Nunito', system-ui, sans-serif",
          color: "#1E2A3A",
          whiteSpace: "nowrap",
          zIndex: 20,
          boxShadow: `0 4px 24px ${color}44, 0 2px 8px rgba(0,0,0,0.1)`,
          letterSpacing: "0.01em",
        }}
      >
        {text}
        {/* Tail */}
        <div
          style={{
            position: "absolute",
            bottom: -11,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: `12px solid ${color}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid rgba(255,255,255,0.97)",
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
        else setShow(false);
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, show] as const;
}

// --- COMPONENTS ---

const Hero = ({ onJoinWaitlist }: { onJoinWaitlist: () => void }) => {
  const [index, setIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    "https://res.cloudinary.com/dge1qccxs/image/upload/v1778571696/main_yrw4jo.png",
    "https://res.cloudinary.com/dge1qccxs/image/upload/v1778571696/second_qqci1a.png",
    "https://res.cloudinary.com/dge1qccxs/image/upload/v1778571696/fourth_tm9t5c.png",
    "https://res.cloudinary.com/dge1qccxs/image/upload/v1778571697/fivth_mna64t.png",
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 720);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Text cycler (3s)
    const textInterval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    
    // Image cycler (10s)
    const imageInterval = setInterval(() => setCurrentImage((prev) => (prev + 1) % images.length), 10000);

    return () => {
      clearInterval(textInterval);
      clearInterval(imageInterval);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const brandGradient = "linear-gradient(to bottom right, #3B82F6, #7B3FE4)";

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: isMobile ? "120px 20px" : "100px 8%",
        backgroundColor: "#030014",
        color: "white",
        overflowX: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            loading="lazy"
            alt="Elinity Mood"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: isMobile ? "brightness(0.4)" : "brightness(0.3)", // Darkened for text legibility
            }}
          />
        </AnimatePresence>
        {/* Gradient Overlay for extra depth */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "radial-gradient(circle at center, transparent 0%, #030014 90%)" 
          }} 
        />
      </div>

      {/* Content Container */}
      <div style={{ 
        width: "100%", 
        maxWidth: "1250px", 
        zIndex: 2, 
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ 
            fontSize: isMobile ? "2.8rem" : "clamp(3.5rem, 8vw, 6rem)", 
            lineHeight: "1", 
            fontWeight: 900, 
            margin: "0 0 2rem 0", 
            letterSpacing: "-0.04em" 
          }}>
            find your <span style={{ background: brandGradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: "transparent" }}>person,</span>
            <br />
            your <span style={{ background: brandGradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: "transparent" }}>tribe.</span>
            <br />
            build <span style={{ background: brandGradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: "transparent" }}>awesome</span> relationships.
          </h1>
          
<p style={{ 
  fontSize: isMobile ? "0.85rem" : "clamp(1.2rem, 2vw, 1.5rem)", 
  color: "#d0d0e0", 
  lineHeight: "1.6", 
  marginBottom: "3rem",
  maxWidth: "700px",
  marginLeft: "auto",  // Ensures horizontal centering
  marginRight: "auto", // Ensures horizontal centering
  textAlign: "center"  // Centers the text lines
}}>
  find your people across love, leisure, and collaborations with lumi, your ai {" "}
  <span style={{ 
    display: "inline-grid", 
    minWidth: isMobile ? "100px" : "140px",
    verticalAlign: "middle", // Aligns the animated text with the baseline
    justifyContent: "center" // Centers the motion.span within the grid
  }}>
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          gridArea: "1 / 1",
          fontWeight: 800,
          background: "linear-gradient(110deg, #7B3FE4 0%, #3B82F6 50%, #00D2FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          // maxWidth : "320px",
          textShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                  width: "320px",
        textAlign: "left", // Ensures the text inside the span is centered
        }}
      >
        {words[index]}.
      </motion.span>
    </AnimatePresence>
  </span>
</p>
        </motion.div>

        {/* Buttons */}
        <div style={{
          width: "100%", 
          maxWidth: isMobile ? "100%" : "800px",
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center", 
          alignItems: "center", 
          gap: "16px", 
          zIndex: 10,
        }}>
          {[
            { label: "Download On Android", type: "ghost", action: onJoinWaitlist },
            { label: "Download On iOS", type: "ghost", action: onJoinWaitlist },
            { label: "Join Waitlist", type: "solid", action: onJoinWaitlist }
          ].map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              style={{
                all: "unset",
                height: "58px",
                padding: "0 32px",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "700",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
                border: btn.type === "ghost" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                backgroundColor: btn.type === "ghost" ? "rgba(255, 255, 255, 0.03)" : "transparent",
                backgroundImage: btn.type === "solid" ? brandGradient : "none",
                color: "white",
                backdropFilter: "blur(10px)",
                width: isMobile ? "100%" : "auto",
                minWidth: isMobile ? "none" : "220px",
                boxShadow: btn.type === "solid" ? "0 10px 30px rgba(59, 130, 246, 0.4)" : "none",
              }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

const WaitlistSection = forwardRef<HTMLDivElement>((props, ref) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardRef, show] = useReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("waitlist")
        .insert([{ name: name.trim(), email: email.trim() }]);

      if (!error) {
        alert("You're on the waitlist 🚀");
        setName("");
        setEmail("");
      } else if (error.code === "23505") {
        // Unique violation code in Postgres
        alert("You're already on the waitlist 🙂");
      } else {
        throw error;
      }
    } catch (err) {
      console.error("Supabase Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="elinity-waitlist"
      className="relative w-full bg-[#03000a] py-32 px-6 overflow-hidden lowercase"
    >
      {/* Brand Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7B3FE4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D2FF]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        ref={cardRef}
        initial={false}
        animate={{ 
          opacity: show ? 1 : 0, 
          y: show ? 0 : 60,
          scale: show ? 1 : 0.98 
        }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative max-w-5xl mx-auto text-center z-10"
      >
        <div className="relative group overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-8 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#00D2FF]/5 opacity-40" />
          
          <h2 className="text-4xl sm:text-7xl font-bold mb-12 tracking-tighter text-white leading-tight">
            join the{" "}
            <span style={{ 
              background: "linear-gradient(to right, #3B82F6, #7B3FE4, #00D2FF)", 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              elinity waitlist
            </span>{" "}
            ✨
          </h2>

          <div className="text-neutral-400 text-lg md:text-xl space-y-8 mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            <p>
              we’re building something special, <br className="hidden sm:block" />
              and we’re doing it carefully.
            </p>
            <p className="text-neutral-300">
              we’re onboarding in small, thoughtful batches so every new member
              gets the full <span className="text-[#3B82F6] font-medium">elinity experience</span>.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto mb-16 p-2.5 
                       rounded-[2rem] bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="relative flex-1 group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#3B82F6] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <input
                disabled={loading}
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-none rounded-2xl pl-14 pr-4 py-5 text-white placeholder-white/10 outline-none focus:ring-0 transition-all font-light"
              />
            </div>

            <div className="relative flex-[1.2] group border-t md:border-t-0 md:border-l border-white/5">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#3B82F6] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <input
                disabled={loading}
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-none rounded-2xl pl-14 pr-4 py-5 text-white placeholder-white/10 outline-none focus:ring-0 transition-all font-light"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-10 py-5 font-bold rounded-2xl text-white
                         bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4]
                         shadow-[0_10px_25px_rgba(59,130,246,0.2)]
                         hover:shadow-[0_15px_35px_rgba(59,130,246,0.4)]
                         transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "joining..." : "join now"}
            </motion.button>
          </form>

          <div className="max-w-xl mx-auto border-t border-white/5 pt-12">
            <p className="text-neutral-500 text-sm mb-6 tracking-wide font-light">
              in the meantime, join our newsletter for behind-the-scenes updates.
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-transparent bg-gradient-to-r from-[#3B82F6] to-[#00D2FF] bg-clip-text font-medium italic">
                good things grow best when they’re nurtured.
              </span>
              <span className="grayscale opacity-50">🌱</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

WaitlistSection.displayName = "WaitlistSection";

const Statement: React.FC = () => {
  const ref = useFadeIn();

  return (
    <section 
      ref={ref}
      style={{ 
        padding: "clamp(60px, 10vh, 100px) 6%", 
        // Updated: Deep brand navy/black base
        backgroundColor: "#030014", 
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Subtle background accent glow */}
      <div style={{
        position: "absolute",
        width: "30vw",
        height: "30vw",
        background: "rgba(59, 130, 246, 0.03)",
        filter: "blur(100px)",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none"
      }} />

      <div style={{ 
        display: "flex", 
        flexWrap: "wrap",
        alignItems: "flex-end", 
        gap: "clamp(30px, 5vw, 80px)",
        maxWidth: "1200px",
        width: "100%",
        zIndex: 1
      }}>
        
        {/* Left Side: Large Display Text */}
        <div style={{ 
          flex: "1 1 500px", 
          minWidth: "300px" 
        }}>
          <h2 style={{ 
            fontSize: "clamp(54px, 12vw, 140px)", 
            lineHeight: "0.99", 
            fontWeight: 800,
            margin: 0,
            color: "white",
            letterSpacing: "-0.01em",
            textTransform: "lowercase"
          }}>
            say<br />
            <span style={{ 
              // Updated: Royal Blue glow effect
              color: "#3B82F6", 
              textShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
              background: "linear-gradient(to right, #3B82F6, #7B3FE4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              hello
            </span><br />
            to elinity
          </h2>
        </div>

        {/* Right Side: Description Text */}
        <div style={{ 
          flex: "1 1 350px", 
          paddingBottom: "clamp(0px, 2vw, 25px)",
          display: "flex",
          justifyContent: "flex-start"
        }}>
          <p style={{ 
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)", 
            color: "#94a3b8", // Updated to cool slate-blue
            lineHeight: "1.6", 
            maxWidth: "440px", 
            margin: 0,
            fontWeight: 300,
            letterSpacing: "0.01em"
          }}>
            modern connection is broken - lost in endless swipes and shallow voids. 
            <strong style={{ 
              color: "#3B82F6", // Royal Blue emphasis
              fontWeight: 600 
            }}> elinity fixes the glitch. </strong> 
            we are a holistic ecosystem built to find your "best-fit" humans and turn 
            initial sparks into lifelong, legendary bonds, across all the 3 core areas of your life - love, leisure, and collaboration.
          </p>
        </div>

      </div>
    </section>
  );
};

const Features: React.FC = () => {
  // Brand gradient (Royal Blue to Electric Indigo)
  const brandGradient = 'linear-gradient(to bottom right, #3B82F6, #7B3FE4)';

  return (
    <section 
      style={{ 
        backgroundColor: "#030014", // Updated to Space Black
        padding: "80px 6vw", 
        color: "white",
        fontFamily: "Inter, 'Space Grotesk', sans-serif",
        overflow: "hidden"
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* BIG STATEMENT HEADER */}
        <header style={{ maxWidth: '100%', marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: "clamp(44px, 10vw, 160px)", 
            fontWeight: 900, 
            lineHeight: "0.82", 
            margin: 0,
            letterSpacing: "-0.07em",
            textTransform: 'lowercase',
            wordBreak: 'break-word',
          }}>
            the core <br /> 
            features and <br />
            <span style={{ 
              WebkitTextStroke: "1px rgba(59, 130, 246, 0.25)", // Updated to subtle Blue stroke
              WebkitTextFillColor: "transparent",
              display: "block", 
              marginTop: "4px",
              background: brandGradient, // Updated to brand gradient
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}>
              experience.
            </span>
          </h2>
        </header>

        {/* BRUTALIST FEATURE GRID */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)', // Updated to Blue tint
          border: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          {[...FEATURES_ROW1, ...FEATURES_ROW2].map((f, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              whileTap="hover"
              style={{
                backgroundColor: "#030014", 
                padding: '60px 30px', 
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated Accent Background - Royal Blue to Indigo Palette */}
              <motion.div 
                variants={{
                  hover: { x: '0%' }
                }}
                initial={{ x: '-101%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #7B3FE4 100%)', 
                  zIndex: 1
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.7rem', 
                  opacity: 0.5,
                  display: 'block',
                  marginBottom: '30px'
                }}>
                  ( 0{i + 1} )
                </span>

                <h3 style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: 800, 
                  letterSpacing: '-0.04em',
                  marginBottom: '15px',
                  lineHeight: '1.1'
                }}>
                  {f.title.toLowerCase()}
                </h3>

                <p style={{ 
                  fontSize: '1rem', 
                  lineHeight: '1.5', 
                  color: 'rgba(255,255,255,0.5)',
                  maxWidth: '100%',
                  margin: 0
                }}>
                  {f.desc}
                </p>
              </div>

              {/* Bottom Right Arrow */}
              <div style={{ 
                position: 'absolute', 
                bottom: '30px', 
                right: '30px', 
                fontSize: '1.5rem',
                opacity: 0.3,
                zIndex: 2
              }}>
                ↗
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Sparkle = ({ color, size, style }: { color: string; size: number; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    style={{
      position: "absolute",
      width: size,
      height: size,
      pointerEvents: "none",
      zIndex: 1, 
      ...style,
    }}
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 101.481 58.5085C118.677 75.7244 160 80 160 80C160 80 118.677 84.2756 101.481 101.492C84.2846 118.708 80 160 80 160C80 160 75.7154 118.708 58.5186 101.492C41.322 84.2756 0 80 0 80C0 80 41.322 75.7244 58.5186 58.5085C75.7154 41.2925 80 0 80 0Z"
      fill={color}
    />
  </svg>
);

const LocalSparkleField = () => {
  const [sparkles, setSparkles] = useState<{id: string; x: string; y: string; size: number; color: string}[]>([]);
  const colors = ["#00D2FF", "#7B3FE4", "#3B82F6"];

  useEffect(() => {
    const createSparkle = () => ({
      id: Math.random().toString(36).slice(2, 9),
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    setSparkles(Array.from({ length: 3 }, createSparkle));

    const intervalId = setInterval(() => {
      setSparkles((prev) => {
        const next = [...prev, createSparkle()];
        return next.length > 10 ? next.slice(1) : next;
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {sparkles.map((s) => (
        <Sparkle
          key={s.id}
          color={s.color}
          size={s.size}
          style={{
            left: s.x,
            top: s.y,
            transform: "translate(-50%, -50%)",
            animation: "sparkle-pulse 2s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1) rotate(45deg); }
        }
      `}</style>
    </>
  );
};

// --- Main Component ---

const Beliefs: React.FC = () => {
  const brandGradient = 'linear-gradient(to bottom right, #3B82F6, #7B3FE4)';

  return (
    <section 
      style={{ 
        backgroundColor: "#030014", 
        padding: "100px 6vw", 
        color: "white",
        fontFamily: "Inter, sans-serif",
        position: "relative"
      }}
    >
      {/* SECTION HEADER */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ 
          fontSize: "clamp(40px, 8vw, 90px)", 
          fontWeight: 900, 
          letterSpacing: "-0.05em",
          margin: 0,
          textTransform: "lowercase"
        }}>
          the elinity <span style={{ 
                  background: brandGradient, 
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                  marginLeft: '8px',
                  lineHeight: '1.5'
           }}>edge.</span>
        </h2>
      </div>

      {/* ASYMMETRIC GRID */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "24px" 
      }}>
        {BELIEFS.map((b, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            style={{ 
              position: "relative",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderRadius: "24px",
              padding: "40px",
              border: "1px solid rgba(59, 130, 246, 0.1)", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "280px",
              overflow: "hidden"
            }}
          >
            {/* Sparkles added inside the card */}
            <LocalSparkleField />

            {/* Top Row: Icon & Tag */}
            <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "12px", 
                background: brandGradient, 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)"
              }}>
                {b.emoji}
              </div>
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 10, marginTop: "40px" }}>
              <h3 style={{ 
                fontSize: "1.8rem", 
                fontWeight: 700, 
                marginBottom: "12px",
                letterSpacing: "-0.02em"
              }}>
                {b.title}
              </h3>
              <p style={{ 
                fontSize: "1rem", 
                lineHeight: "1.6", 
                color: "rgba(148, 163, 184, 0.7)", 
                margin: 0,
                fontWeight: 300
              }}>
                {b.body}
              </p>
            </div>

            {/* Decorative Corner Glow */}
            <div style={{ 
              position: "absolute", 
              bottom: "-20px", 
              right: "-20px", 
              width: "100px", 
              height: "100px", 
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
              zIndex: 0
            }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Tribes: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const tribeData = [
    { name: "the lovers", desc: "for those seeking conscious, resonant intimacy over chaotic swiping. the ones who believe in soulmates, and want to find theirs." },
    { name: "the social experience", desc: `for those looking for "instant-yes" friends for life’s adventures. those who love to play, to yap, to travel, those who carpe diem.` },
    { name: "the builders", desc: "for those seeking cool collaborators with aligned vision and temperament. to bring your creative ideas to live with people you’d love building with." },
    { name: "the relationship deepeners", desc: "for those nurturing existing bonds with intention and joy, be it with a partner, friends or family." },
    { name: "the self-explorers", desc: "refining their inner world to improve all outer connections. exploring and expressing the richness of what’s within. " }
  ];

  return (
    <section style={{ 
      backgroundColor: "#030014", // Updated: Space Black
      minHeight: "100vh", 
      width: "100%",
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "flex-start",
      fontFamily: "Inter, sans-serif",
      padding: "100px 6vw"
    }}>
      
      {/* SECTION HEADER */}
      <div style={{ textAlign: 'left', width: '100%', maxWidth: '1100px', marginBottom: '80px' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            fontWeight: 900, 
            letterSpacing: '-0.05em', 
            lineHeight: '1.1',
            // Updated: Royal Blue to Electric Indigo Gradient
            background: 'linear-gradient(to bottom right, #3B82F6, #7B3FE4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            margin: 0 
          }}
        >
          who is elinity for?
        </motion.h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'rgba(148, 163, 184, 0.5)', // Updated: Muted cool-blue
          marginTop: '20px', 
          maxWidth: '600px',
          fontWeight: 300 
        }}>
          for those who believe deep, meaningful connection is the foundation of a good life - seekers, builders, lovers, and thinkers living at the intersections.
        </p>
      </div>

      {/* INTERACTIVE LIST */}
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        {tribeData.map((tribe, i) => (
          <div 
            key={i}
            onMouseEnter={() => setExpandedIndex(i)}
            onMouseLeave={() => setExpandedIndex(null)}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            style={{
              backgroundColor: "#030014",
              cursor: "pointer",
              overflow: "hidden",
              borderBottom: "1px solid rgba(59, 130, 246, 0.05)",
              transition: "background-color 0.3s ease"
            }}
          >
            <div style={{ 
              padding: "40px 0", 
              display: "flex", 
              flexDirection: "column",
              position: "relative"
            }}>
              {/* LABEL & NAME ROW */}
              <div style={{ 
                display: "flex", 
                alignItems: "baseline", 
                gap: "30px",
                transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: expandedIndex === i ? "translateX(10px)" : "translateX(0)"
              }}>
                <span style={{ 
                  fontFamily: "monospace", 
                  fontSize: "0.8rem", 
                  // Updated: Royal Blue accent
                  color: expandedIndex === i ? "#3B82F6" : "rgba(255,255,255,0.2)",
                  width: "30px"
                }}>
                  0{i + 1}
                </span>
                <h3 style={{ 
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)", 
                  fontWeight: 700, 
                  margin: 0, 
                  textTransform: "lowercase",
                  color: expandedIndex === i ? "white" : "rgba(255,255,255,0.3)",
                  transition: "color 0.3s ease"
                }}>
                  {tribe.name}
                </h3>
              </div>

              {/* EXPANDABLE CONTENT */}
              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <p style={{ 
                      padding: "20px 0 0 60px", 
                      fontSize: "clamp(1rem, 2vw, 1.2rem)", 
                      lineHeight: "1.6", 
                      color: "rgba(148, 163, 184, 0.8)", // Updated: Clearer slate text
                      maxWidth: "700px",
                      fontWeight: 300,
                      margin: 0
                    }}>
                      {tribe.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyItExists: React.FC = () => {
  const pillars = [
    {
      id: "01",
      title: "unified experience",
      desc: "one app for dating and love, friends and leisure, and work and projects. Three profiles, one evolving you.",
    },
    {
      id: "02",
      title: "alignment for depth",
      desc: "we use psychometrics and behavioral insights to find deep alignment, treating people as worlds, not commodities.",
    },
    {
      id: "03",
      title: "lumi (your ai)",
      desc: "an emotionally intelligent companion that helps you communicate honestly and design your life with wonder.",
    },
    {
      id: "04",
      title: "finding & flourishing",
      desc: "tools for every stage, ensuring relationships grow rather than stagnate.",
    },
    {
      id: "05",
      title: "designed for humans",
      desc : "we prioritize quality over quantity, presence over dopamine, depth over speed, meaning-making over consumption."
    }
  ];

  return (
    <section style={{ 
      backgroundColor: "#030014", // Updated: Space Black
      padding: "100px 6vw", 
      color: "white",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "60px" 
      }}>
        
        {/* LARGE STICKY-STYLE HEADING */}
        <div style={{ borderBottom: "1px solid rgba(59, 130, 246, 0.1)", paddingBottom: "40px" }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{ 
              fontSize: "clamp(48px, 10vw, 120px)", 
              fontWeight: 900, 
              letterSpacing: "-0.06em",
              margin: 0,
              lineHeight: 0.9,
              textTransform: "lowercase"
            }}
          >
            why it <span style={{ 
              // Updated: Royal Blue to Electric Indigo Gradient
              background: 'linear-gradient(to bottom right, #3B82F6, #7B3FE4)', 
              backgroundClip: 'text', 
              WebkitBackgroundClip: 'text', 
              color: 'transparent' 
            }}>exists.</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "80px 40px" 
        }}>
          
          {/* THE MANIFESTO TEXT */}
          <div style={{ gridColumn: "span 1" }}>
            <p style={{ 
              fontSize: "1.5rem", 
              lineHeight: "1.4", 
              fontWeight: 300, 
              color: "rgba(148, 163, 184, 0.8)", // Updated: Muted cool-blue
              margin: 0
            }}>
              connection isn’t a mere one-step problem to solve; it’s a <span style={{ color: "white", fontWeight: 600 }}>holistic journey</span>. 
              a practice. most apps stop at the introduction - elinity is with you and for you for the long ride, from the start of the connection, to becoming your lifelong relational ally and thinking muse. 
            </p>
          </div>

          {/* THE GRID OF PILLARS */}
          <div style={{ 
            gridColumn: "span 1", 
            display: "flex", 
            flexDirection: "column", 
            gap: "48px" 
          }}>
            {pillars.map((p) => (
              <div key={p.id} style={{ display: "flex", gap: "24px" }}>
                <span style={{ 
                  color: "#3B82F6", // Updated: Royal Blue
                  fontFamily: "monospace", 
                  fontSize: "0.9rem", 
                  paddingTop: "6px" 
                }}>
                  {p.id}
                </span>
                <div>
                  <h4 style={{ 
                    fontSize: "1.2rem", 
                    fontWeight: 700, 
                    marginBottom: "8px", 
                    textTransform: "lowercase" 
                  }}>
                    {p.title}
                  </h4>
                  <p style={{ 
                    fontSize: "0.95rem", 
                    lineHeight: "1.6", 
                    color: "rgba(148, 163, 184, 0.5)", // Updated: Clearer secondary text
                    fontWeight: 300, 
                    margin: 0 
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const Steps: React.FC = () => {
  return (
    <section 
      style={{ 
        backgroundColor: "#030014", // Updated: Space Black
        padding: "100px 8vw", 
        color: "white",
        fontFamily: "Inter, sans-serif"
      }}
    >
      {/* MINIMALIST HEADER */}
      <div style={{ marginBottom: "100px", borderLeft: "4px solid #3B82F6", paddingLeft: "30px" }}>
        <h2 style={{ 
          fontSize: "clamp(40px, 8vw, 80px)", 
          fontWeight: 900, 
          letterSpacing: "-0.05em",
          margin: 0,
          lineHeight: 1
        }}>
          how it <br /><span style={{ color: "rgba(148, 163, 184, 0.2)" }}>works.</span>
        </h2>
      </div>

      <div style={{ position: "relative", maxWidth: "800px" }}>
        
        {/* VERTICAL PROGRESS LINE */}
        <div style={{ 
          position: "absolute", 
          left: "20px", 
          top: "0", 
          bottom: "0", 
          width: "1px", 
          // Updated Gradient: Royal Blue to Electric Indigo
          background: "linear-gradient(to bottom, #3B82F6 0%, #7B3FE4 50%, rgba(59, 130, 246, 0.05) 100%)" 
        }} />

        {STEPS.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ 
              display: "flex", 
              gap: "40px", 
              marginBottom: "80px", 
              position: "relative" 
            }}
          >
            {/* PULSING NODE */}
            <div style={{ zIndex: 2 }}>
              <motion.div 
                animate={{ scale: [1, 1.15, 1], borderColor: ["#3B82F6", "#7B3FE4", "#3B82F6"] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#030014",
                  border: "2px solid #3B82F6", // Updated: Royal Blue
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "white",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
                }}
              >
                {i + 1}
              </motion.div>
            </div>

            {/* CONTENT CARD */}
            <div style={{ flex: 1, paddingTop: "8px" }}>
              <h3 style={{ 
                fontSize: "1.8rem", 
                fontWeight: 800, 
                marginBottom: "12px", 
                letterSpacing: "-0.03em",
                textTransform: "lowercase",
                color: "white"
              }}>
                {s.title}
              </h3>
              
              <p style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.6", 
                color: "rgba(148, 163, 184, 0.6)", // Updated: Muted Slate-Blue
                fontWeight: 300,
                maxWidth: "600px"
              }}>
                {s.desc}
              </p>

              {/* INTERACTIVE DETAIL */}
              <div style={{ 
                marginTop: "20px", 
                height: "1px", 
                width: "40px", 
                background: "rgba(59, 130, 246, 0.3)" 
              }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LumiSection: React.FC = () => {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column', 
        backgroundColor: '#030014', // Updated: Space Black
        color: 'white',
        overflowX: 'hidden', 
        overflowY: 'auto',
        fontFamily: 'Inter, sans-serif',
      }}
      className="lumi-container"
    >
      <style>{`
        .lumi-container { flex-direction: column; }
        .panel-left, .panel-right { width: 100% !important; padding: 4rem 8% !important; box-sizing: border-box; }
        
        @media (min-width: 1024px) {
          .lumi-container { flex-direction: row !important; }
          .panel-left { width: 60% !important; padding: 0 6vw !important; border-right: 1px solid rgba(59, 130, 246, 0.05); }
          .panel-right { width: 40% !important; padding: 0 6vw !important; }
        }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        <motion.div 
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute', top: '-10%', left: '-10%',
            width: '70vw', height: '70vw',
            backgroundColor: '#3B82F6', // Updated: Royal Blue
            borderRadius: '50%',
            filter: 'blur(120px)', opacity: 0.1
          }} 
        />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '60vw', height: '60vw',
          backgroundColor: '#7B3FE4', // Updated: Electric Indigo
          borderRadius: '50%',
          filter: 'blur(120px)', opacity: 0.08
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.02,
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
        }} />
      </div>

      {/* LEFT PANEL */}
      <div className="panel-left" style={{
        position: 'relative', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 style={{ 
            fontWeight: 900, letterSpacing: '-0.06em', lineHeight: '0.9',
            fontSize: 'clamp(3.5rem, 8vw, 8rem)', margin: 0 
          }}>
            the <br />
            <span style={{
              // Updated: Royal Blue to Electric Indigo Gradient
              background: 'linear-gradient(to bottom right, #3B82F6, #7B3FE4, #6366F1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              width: 'max-content',
              maxWidth: '100%',
              display: 'inline-block',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
            }}>
              resonance
            </span> <br />
            engine.
          </h2>

          <p style={{
            maxWidth: '560px', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
            color: 'rgba(148, 163, 184, 0.6)', // Updated: Muted Slate-Blue
            fontWeight: 300,
            lineHeight: '1.6', margin: 0
          }}>
            skip the swipe. our ai models your values and quirks to find resonant matches for love, play, or projects.
            <br /><br />
            <span style={{ color: 'white', fontWeight: 500, fontStyle: 'italic' }}>
              our goal is to get you off the screen and into the real world in record time. and we mean it.
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="panel-right" style={{
        position: 'relative', display: 'flex',
        flexDirection: 'column', justifyContent: 'center',
        zIndex: 2
      }}>
        <motion.div whileHover="hover" style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            variants={{ hover: { backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(123, 63, 228, 0.3)' } }}
            style={{
              position: 'relative', zIndex: 10,
              backgroundColor: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '32px', padding: 'clamp(2rem, 5vw, 3.5rem)',
              transition: 'all 0.7s ease'
            }}
          >
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <motion.div 
                variants={{ hover: { rotate: 45, color: '#3B82F6' } }} 
                style={{ 
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: '#7B3FE4' 
                }}
              >
                ✦
              </motion.div>
            </div>
            <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight:'1.1' }}>
              the <br /> flourishing suite.
            </h3>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(148, 163, 184, 0.5)', lineHeight: '1.6' }}>
              once you meet, the magic grows. access relationship coaching, a shared "life book," whimsy-filled games, a noise-free walled garden f&f network and much more.
            </p>
          </motion.div>
          
          {/* Hover Glow */}
          <motion.div 
            variants={{ hover: { opacity: 1 } }}
            style={{
              position: 'absolute', inset: '-1rem',
              background: 'linear-gradient(to top right, rgba(59, 130, 246, 0.15), rgba(123, 63, 228, 0.15))',
              borderRadius: '40px', filter: 'blur(24px)',
              opacity: 0, transition: 'opacity 0.7s'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

const Closing: React.FC<{ onJoinWaitlist?: () => void }> = ({ onJoinWaitlist }) => {
  const handleLearnMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ 
      backgroundColor: "#030014", // Updated: Space Black
      padding: "100px 6vw", 
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif"
    }}>
      {/* RADIANT AMBIENCE */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '400px',
        // Updated: Royal Blue glow
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
        
        {/* UPPER LABEL */}
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ 
            fontSize: "clamp(1rem, 2vw, 2rem)", 
            letterSpacing: "0.1em", 
            color: "rgba(148, 163, 184, 0.4)", // Updated: Slate
            display: "block",
            marginBottom: "40px",
            textTransform: "lowercase"
          }}
        >
          inside the app
        </motion.span>

        {/* CORE FEATURES LIST */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "32px", 
          marginBottom: "80px" 
        }}>
          <div>
            <span style={{ color: "#3B82F6", fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>
              what you’ll find:
            </span>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "white", margin: 0 }}>
              intentional profiles, dynamic insights, warm prompts, and shared rituals.
            </p>
          </div>

          <div>
            <span style={{ color: "#7B3FE4", fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>
              what it feels like:
            </span>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "rgba(148, 163, 184, 0.6)", margin: 0 }}>
              it feels human, not transactional; like building something meaningful rather than just browsing.
            </p>
          </div>
        </div>

        {/* FINAL WELCOME */}
        <h2 style={{ 
          fontSize: "clamp(52px, 10vw, 130px)", 
          fontWeight: 900, 
          letterSpacing: "-0.07em", 
          lineHeight: 0.8,
          marginBottom: "60px",
          color: "white"
        }}>
          welcome to <br />
          <span style={{ 
            // Updated: Royal Blue to Electric Indigo Gradient
            background: "linear-gradient(135deg, #3B82F6 0%, #7B3FE4 100%)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            elinity.
          </span>
        </h2>

        {/* CTA ROW */}
        <div style={{ 
          display: "flex", 
          gap: "20px", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onJoinWaitlist}
            style={{
              padding: "18px 40px",
              borderRadius: "100px",
              border: "none",
              background: "white",
              color: "#030014",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "box-shadow 0.3s ease"
            }}
          >
            Join the Waitlist
          </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)", borderColor: "rgba(59, 130, 246, 0.3)" }}
            onClick={handleLearnMore}
            style={{
              padding: "18px 40px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
};


// ─── Page Root ────────────────────────────────────────────────────────────────

const ElinityLanding: FC = () => {
  // 1. Create the reference for the waitlist section
  const waitlistRef = useRef<HTMLDivElement>(null);

  // 2. Define the smooth scroll function
  const scrollToWaitlist = () => {
    if (waitlistRef.current) {
      waitlistRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  return (
    <div className="elinity-page">
      <GlobalStyles />
      <CustomCursor />
      
      <ElinityNavbar />

      {/* Pass the function to Hero so the button works */}
      <Hero onJoinWaitlist={scrollToWaitlist} />
      
      <div id="elinity-statement"><Statement /></div>
      <div id="elinity-ellaris"><LumiSection /></div>
      <div id="elinity-features"><Features /></div>
      <div id="elinity-beliefs"><Beliefs /></div>
      <div id="elinity-tribes"><Tribes /></div>
      <div id="elinity-about"><WhyItExists /></div>
      <div id="elinity-steps"><Steps /></div>
      
      <WaitlistSection ref={waitlistRef} />
      
      <Closing onJoinWaitlist={scrollToWaitlist} />

      <ElinityFooter />
    </div>
  );
};

export default ElinityLanding;