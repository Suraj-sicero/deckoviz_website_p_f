import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Home,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Leaf,
  MessageSquare,
  Frame,
  Palette,
  Heart,
  Clock,
  Wand2,
  ArrowRight,
  Sparkle,
  ShoppingBag,
  CheckCircle2,
  Flame,
  UtensilsCrossed,
  Building
} from "lucide-react";

/* ===== Core Reading Content ===== */

const coreReadings: {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  isFeatured?: boolean;
  description: string;
  customLink?: string;
}[] = [
  {
    title: "Why The Deckoviz Portal for Homes?",
    slug: "why-the-deckoviz-portal-for-homes",
    category: "Thesis",
    readTime: "8 min read",
    isFeatured: true,
    description:
      "The foundational thesis. What happens when your home starts co-evolving with you — and why this is the best thing that will ever enter your life."
  },
  {
    title: "Who Is Deckoviz For?",
    slug: "who-is-deckoviz-for",
    category: "Philosophy",
    readTime: "6 min read",
    description:
      "A clear, values-first look at the kinds of people, homes, and lives Deckoviz is designed to support. Less demographics, more mindset, intention, and taste."
  },
  {
    title: "Who Is Deckoviz For – And How It Gently Becomes Part of Your Life",
    slug: "who-is-deckoviz-for",
    category: "Philosophy",
    readTime: "7 min read",
    description:
      "A deeper companion piece that explores how Deckoviz doesn’t arrive as a feature checklist, but slowly integrates into routines, rituals, and spaces."
  },
  {
    title: "Vizzy for Your Home",
    slug: "the-vizzy-magic-for-homes-and-businesses",
    category: "AI & Tech",
    readTime: "5 min read",
    description:
      "An introduction to Vizzy, your quiet AI companion. How it curates, learns, adapts, and supports without demanding attention or control."
  },
  {
    title: "DASP User’s Guide",
    slug: "dasp-users-guide",
    category: "Guides",
    readTime: "10 min read",
    description:
      "A practical guide to living with Deckoviz: modes, rituals, personalization, memories, posters, and how it all fits together over time."
  },
  {
    title: "Looking to Buy a Smart TV?",
    slug: "why-deckoviz-dasp-is-the-last-screen",
    category: "Comparison",
    readTime: "6 min read",
    description:
      "Why Deckoviz DASP might be the last screen you’ll ever need. A grounded comparison explaining why Deckoviz replaces more than ads."
  },
  {
    title: "A Day in the Life With Deckoviz",
    slug: "a-day-in-the-life-with-deckoviz",
    category: "Experience",
    readTime: "7 min read",
    description:
      "A narrative walkthrough of how different people actually use Deckoviz across a full day from morning rituals to evening wind-down."
  },
  {
    title: "A Portal to Your Inner Worlds",
    slug: "a-portal-to-your-inner-worlds",
    category: "Mindset",
    readTime: "8 min read",
    description:
      "Exploring Deckoviz as a space for reflection, imagination, journaling, dreams, and inner life not productivity theatre."
  },
  {
    title: "When Walls Stop Repeating Themselves",
    slug: "when-walls-stop-repeating-themselves",
    category: "Design",
    readTime: "5 min read",
    description:
      "Why static art and frozen frames quietly fail over time and what changes when your walls are allowed to evolve."
  },
  {
    title: "Dynamic Posters, Moodboards, and Vision Boards",
    slug: "dynamic-posters-moodboards-and-vision-boards",
    category: "Features",
    readTime: "6 min read",
    description:
      "How posters become living signals for intention, memory, focus, and emotional alignment."
  },
  {
    title: "Designed for Humans. Not Feeds.",
    slug: "designed-for-humans-not-feeds",
    category: "Philosophy",
    readTime: "6 min read",
    description:
      "The philosophy behind building something deliberately anti-scroll, anti-notification, and anti-algorithmic anxiety."
  },
  {
    title: "What If Your Home Had a Nervous System?",
    slug: "what-if-your-home-had-a-nervous-system",
    category: "AI & Tech",
    readTime: "7 min read",
    description:
      "A simple explanation of how Deckoviz becomes time-aware, mood-aware, and context-aware without dashboards or micromanagement."
  },
  {
    title: "A Frame That’s Never Finished",
    slug: "a-frame-thats-never-finished",
    category: "Design",
    readTime: "5 min read",
    description:
      "Why Deckoviz is built as a platform that keeps evolving, learning, and growing with you long after it’s on your wall."
  },
  {
    title: "The Home of 2030: Your Home Learns to Love You Back",
    slug: "home-of-2030",
    category: "Essays",
    readTime: "12 min read",
    customLink: "/essay/home-of-2030",
    description:
      "An essay on the future of the home — from smart to sentient, from static walls to living expressions. What happens when your home becomes a genuine member of the family."
  },
  {
    title: "The Restaurant of 2030: Designing for an Experience-Led Future",
    slug: "restaurant-of-2030",
    category: "Essays",
    readTime: "10 min read",
    customLink: "/essay/restaurant-of-2030",
    description:
      "A thought piece for restaurant owners, operators, and hospitality leaders. When food becomes a commodity, experience becomes the moat."
  }
];

const icons = [
  Brain,
  Home,
  Sparkles,
  BookOpen,
  ImageIcon,
  Leaf,
  MessageSquare,
  Frame,
  Palette,
  Heart,
  Clock,
  Wand2,
  Building,
  UtensilsCrossed
];

export default function CoreReading() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Thesis",
    "Philosophy",
    "AI & Tech",
    "Guides",
    "Design",
    "Essays"
  ];

  const featuredArticle = coreReadings.find((r) => r.isFeatured) || coreReadings[0];

  const filteredReadings = coreReadings.filter((item) => {
    if (selectedCategory === "All") return !item.isFeatured;
    return item.category === selectedCategory && !item.isFeatured;
  });

  return (
    <section className="min-h-screen px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-[#e8efff] via-[#f5f3ff] to-[#e0f2fe]">
      {/* Ambient Soft Glow Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-indigo-400/20 via-teal-300/15 to-blue-500/15 rounded-full blur-[160px]" />
        <div className="absolute top-[35%] right-[-15%] w-[750px] h-[750px] bg-gradient-to-tl from-purple-400/20 via-sky-300/15 to-indigo-400/20 rounded-full blur-[170px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[650px] h-[650px] bg-gradient-to-tr from-emerald-300/20 via-cyan-400/15 to-blue-400/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm text-xs font-bold text-indigo-900 uppercase tracking-widest mb-6 hover:scale-105 transition-all duration-300 cursor-default">
            <Sparkle className="w-4 h-4 text-indigo-600" />
            <span>Essential Discoveries · Deckoviz for Homes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-slate-900 leading-tight mb-6 font-medium">
            Core Reading for Homes
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal px-2">
            These aren’t meant to be read all at once. They are foundational essays, principles, and practice guides meant to be dipped into, bookmarked, and lived with over time.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-600 text-white shadow-lg shadow-indigo-600/30 scale-105 border border-white/30"
                    : "bg-white/50 backdrop-blur-xl text-slate-800 hover:bg-white/80 hover:text-indigo-900 border border-white/80 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* HERO FEATURED THESIS ARTICLE CARD */}
        {selectedCategory === "All" && (
          <div className="mb-16">
            <div
              onClick={() => navigate(featuredArticle.customLink || `/blog/${featuredArticle.slug}`)}
              className="group relative rounded-[2.5rem] p-6 sm:p-10 md:p-12 bg-white/55 backdrop-blur-2xl border border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_25px_60px_rgba(37,99,235,0.12)] hover:shadow-[inset_0_2.5px_5px_rgba(255,255,255,1),0_35px_80px_rgba(37,99,235,0.22)] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
                {/* Visual Thumbnail */}
                <div className="w-full lg:w-5/12 h-64 sm:h-72 lg:h-80 rounded-[2rem] overflow-hidden relative shadow-xl group-hover:scale-[1.02] transition-transform duration-500 flex-shrink-0 border border-white/60">
                  <img
                    src="/images/herol (3).png"
                    alt="Why The Deckoviz Portal for Homes?"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-900 to-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md border border-white/30">
                      <Flame className="w-3.5 h-3.5 text-amber-300" />
                      Foundational Thesis
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-7/12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-bold text-indigo-700 mb-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-indigo-200 uppercase tracking-wider shadow-sm">
                      Must Read
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-4 leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    {featuredArticle.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-950 via-indigo-800 to-blue-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-600/50 group-hover:scale-105 transition-all duration-300 border border-white/20">
                      <span>Read Foundational Thesis</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID - CLEAN UNCLIPPED CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filteredReadings.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.customLink || `/blog/${item.slug}`)}
              className="group relative rounded-[2rem] p-7 bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_12px_35px_rgba(37,99,235,0.08)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_25px_60px_rgba(37,99,235,0.18)] hover:border-white hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Icon Badge + Category Bar */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md border border-white/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                    {React.createElement(icons[index % icons.length], {
                      className: "w-5 h-5 text-white"
                    })}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/90 shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-3">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-indigo-900">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* HIGH CONVERTING GLASSY CONVERSION BANNER */}
        <div className="relative rounded-[2.5rem] p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white shadow-2xl mb-16 border border-white/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Ready For Your Space?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight text-white">
                Bring Deckoviz into Your Home Today
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join thousands of homes transforming static walls into co-evolving, intelligent art portals that adapt to your mood and lifestyle.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => (window.location.href = "/place-order")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Deckoviz Now</span>
              </button>
              <button
                onClick={() => (window.location.href = "/all-features")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <span>Explore Features</span>
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER EXPLORE JOURNAL */}
        <div className="text-center">
          <p className="text-slate-600 max-w-xl mx-auto font-medium text-sm sm:text-base mb-6">
            If Deckoviz resonates with you, explore our complete library of articles, guides, and stories in the Journal.
          </p>

          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 font-bold text-white bg-gradient-to-r from-[#2563EB] to-indigo-700 rounded-full shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group text-xs uppercase tracking-widest border border-white/20"
          >
            Explore the Deckoviz Journal
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
