import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Briefcase,
  Sparkles,
  BookOpen,
  Target,
  Lightbulb,
  Users,
  Hotel,
  Coffee,
  ShoppingBag,
  BookMarked,
  ArrowRight,
  Sparkle,
  Clock,
  Flame,
  Building,
  ChevronRight
} from "lucide-react";

/* ===== Enterprise Core Reading Content ===== */

const enterpriseCoreReadings = [
  {
    title: "Why The Deckoviz Portal for Enterprises?",
    slug: "why-the-deckoviz-portal-for-enterprises",
    category: "Thesis",
    readTime: "9 min read",
    isFeatured: true,
    description:
      "The foundational thesis. What happens when your space stops being a backdrop and starts being a business asset — and why this matters so much today."
  },
  {
    title: "Why Deckoviz E-DASP Is a Game-Changer for Businesses",
    slug: "why-deckoviz-e-dasp-is-a-game-changer-for-businesses",
    category: "Strategy",
    readTime: "6 min read",
    description:
      "Why dynamic, personalised, generative, narrative-infused experiences are the future for every customer-facing brand space."
  },
  {
    title: "The Power of Visual Storytelling for Enterprises",
    slug: "the-power-of-visual-storytelling-and-custom-art-for-enterprises-with-deckoviz-e-dasp",
    category: "Use Cases",
    readTime: "5 min read",
    description:
      "Using dynamic art, narrative, and emotionally intelligent experiences to craft unforgettable guest experiences."
  },
  {
    title: "The Enterprise Guide to Use Cases & Possibilities",
    slug: "enterprise-guide-use-cases-possibilities",
    category: "Guides",
    readTime: "25 min read",
    description:
      "A comprehensive core resource detailing how Deckoviz transforms physical boundaries into intelligent, experiential, cinematic environments."
  },
  {
    title: "A Companion Guide: Creative Enterprise Use Cases",
    slug: "enterprise-companion-guide-creative-use-cases",
    category: "Guides",
    readTime: "25 min read",
    description:
      "An extended compilation of unexpected possibilities, out-of-the-box experiences, and 120 additional ideas for creative enterprise use."
  },
  {
    title: "How Enterprises Can Use Deckoviz",
    slug: "enterprise-control-layer",
    category: "Strategy",
    readTime: "10 min read",
    description:
      "Turning spaces into experiences people remember — real, concrete ways enterprises are already using Deckoviz."
  },
  {
    title: "What Spaces Is Deckoviz the Perfect Fit For?",
    slug: "what-spaces-and-businesses-is-deckoviz-dasp-the-perfect-fit-for",
    category: "Use Cases",
    readTime: "5 min read",
    description:
      "Exploring the environments where intelligent art meets real-world impact — from restaurants to hotels to retail."
  },
  {
    title: "The Future of Hotels Is Emotional",
    slug: "deckoviz-for-hotels",
    category: "Hospitality",
    readTime: "10 min read",
    description:
      "How Deckoviz redefines hospitality by turning hotels into living, emotional experiences guests remember."
  },
  {
    title: "The Future of the Restaurant Experience",
    slug: "the-future-of-the-restaurant-experience",
    category: "Dining",
    readTime: "6 min read",
    description:
      "How Deckoviz brings tomorrow's dining experience and technology to your space today."
  },
  {
    title: "The Future of Restaurants Is Experiential",
    slug: "deckoviz-for-restaurants",
    category: "Dining",
    readTime: "10 min read",
    description:
      "How Deckoviz transforms dining spaces into living brand experiences that customers return to."
  },
  {
    title: "Custom Art as a Brand Asset",
    slug: "custom-art-as-a-brand-asset",
    category: "Brand",
    readTime: "12 min read",
    description:
      "Exploring identity, meaning, and emotion through deeply personal generative art — and why your brand deserves this."
  },
  {
    title: "Creating Workspaces That Breathe, Connect, and Inspire",
    slug: "deckoviz-for-employees-creating-workspaces-that-breathe-connect-and-inspire",
    category: "Workplace",
    readTime: "8 min read",
    description:
      "How Deckoviz transforms office environments into spaces that support creativity, wellness, and genuine human connection."
  }
];

const icons = [
  Building2,
  Briefcase,
  Sparkles,
  BookOpen,
  Target,
  Lightbulb,
  Users,
  Hotel,
  Coffee,
  ShoppingBag,
  BookMarked,
  Building
];

export default function EnterpriseCoreReading() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Thesis",
    "Strategy",
    "Use Cases",
    "Hospitality",
    "Dining",
    "Guides"
  ];

  const featuredArticle =
    enterpriseCoreReadings.find((r) => r.isFeatured) || enterpriseCoreReadings[0];

  const filteredReadings = enterpriseCoreReadings.filter((item) => {
    if (selectedCategory === "All") return !item.isFeatured;
    return item.category === selectedCategory && !item.isFeatured;
  });

  return (
    <section className="min-h-screen px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-[#090d16] via-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-slate-100">
      {/* Ambient Soft Glow Background Orbs */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[750px] h-[750px] bg-gradient-to-br from-indigo-600/15 via-rose-500/10 to-purple-600/15 rounded-full blur-[170px]" />
        <div className="absolute top-[40%] right-[-15%] w-[800px] h-[800px] bg-gradient-to-tl from-violet-600/15 via-blue-500/10 to-indigo-600/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-gradient-to-tr from-rose-600/15 via-indigo-600/10 to-sky-500/15 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-xs font-bold text-indigo-300 uppercase tracking-widest mb-6 hover:scale-105 transition-all duration-300 cursor-default">
            <Sparkle className="w-4 h-4 text-rose-400" />
            <span>Commercial Strategy · Deckoviz for Enterprises</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight mb-6 font-medium">
            Enterprise Core Reading
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal px-2">
            The essential strategic reading for understanding how the Deckoviz Portal transforms commercial walls into intelligent, brand-aligned, experience-generating assets.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-rose-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-rose-600/30 scale-105 border border-white/30"
                    : "bg-white/10 backdrop-blur-xl text-slate-300 hover:bg-white/20 hover:text-white border border-white/15 shadow-sm"
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
              onClick={() => navigate(`/blog/${featuredArticle.slug}`)}
              className="group relative rounded-[2.5rem] p-6 sm:p-10 md:p-12 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),0_30px_70px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_40px_90px_rgba(99,102,241,0.3)] transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
                {/* Visual Thumbnail */}
                <div className="w-full lg:w-5/12 h-64 sm:h-72 lg:h-80 rounded-[2rem] overflow-hidden relative shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 flex-shrink-0 border border-white/20">
                  <img
                    src="/images/office.png"
                    alt="Why The Deckoviz Portal for Enterprises?"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-white/30">
                      <Flame className="w-3.5 h-3.5 text-amber-300" />
                      Foundational Thesis
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-7/12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs font-bold text-indigo-400 mb-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-indigo-400/40 text-indigo-300 uppercase tracking-wider shadow-sm">
                      Strategic Blueprint
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-4 leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    {featuredArticle.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-indigo-600 to-blue-600 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-rose-600/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300 border border-white/30">
                      <span>Read Enterprise Thesis</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ARTICLES GRID - CLEAN UNCLIPPED DARK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {filteredReadings.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/blog/${item.slug}`)}
              className="group relative rounded-[2rem] p-7 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_25px_65px_rgba(99,102,241,0.3)] hover:border-white/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Icon Badge + Category Bar */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-lg border border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                    {React.createElement(icons[index % icons.length], {
                      className: "w-5 h-5 text-white"
                    })}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-3">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-indigo-400 group-hover:text-rose-300">
                <span>Read Strategic Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* HIGH CONVERTING ENTERPRISE CONVERSION BANNER */}
        <div className="relative rounded-[2.5rem] p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 text-white shadow-2xl mb-16 border border-white/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-400/30">
                <Building2 className="w-4 h-4 text-rose-400" />
                <span>Enterprise Growth Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight text-white">
                Transform Your Space into a Guest Experience Machine
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Elevate your restaurant, hotel, showroom, or workspace with ambient, generative visual storytelling that drives customer delight and loyalty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => (window.location.href = "/contact")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-rose-500/50 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <span>Book Enterprise Consultation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => (window.location.href = "/deckoviz-for-enterprises")}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <span>Explore Solutions</span>
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER EXPLORE JOURNAL */}
        <div className="text-center">
          <p className="text-slate-400 max-w-xl mx-auto font-medium text-sm sm:text-base mb-6">
            Looking for more insights on spatial AI and brand design? Explore our full collection in the Deckoviz Journal.
          </p>

          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 font-bold text-white bg-gradient-to-r from-indigo-600 to-rose-600 rounded-full shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 group text-xs uppercase tracking-widest border border-white/20"
          >
            Explore the Deckoviz Journal
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
