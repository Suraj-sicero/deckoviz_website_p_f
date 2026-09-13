import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Compass,
  Sparkles,
  Palette,
  Frame,
  Image as ImageIcon,
  Clock,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkle
} from "lucide-react";

export interface HowToUseGuideItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  customLink?: string;
  readTime: string;
  category: string;
  badgeColor: string;
  icon: React.ElementType;
  description: string;
  pillColor: string;
}

export const howToUseGuides: HowToUseGuideItem[] = [
  {
    id: "primary-home-guide",
    title: "The Primary Home Guide",
    subtitle: "Making the Most of Your Portal & Vizzy",
    slug: "dasp-users-guide",
    readTime: "20 min read",
    category: "Primary Guide",
    badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-200",
    icon: Home,
    description:
      "The master guide to your relationship with your Portal and Vizzy, organized around seven core pillars of home life and quiet AI intelligence.",
    pillColor: "from-indigo-600 to-blue-600"
  },
  {
    id: "extended-guide",
    title: "The Extended Guide",
    subtitle: "Living Canvas & Everyday Rhythms",
    slug: "alternate-guide-deckoviz-dasport",
    readTime: "25 min read",
    category: "Extended Guide",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
    icon: Compass,
    description:
      "A deep-dive companion guide exploring ambient routines, multi-room setups, subtle environment matching, and living wall rhythms.",
    pillColor: "from-blue-600 to-sky-600"
  },
  {
    id: "creative-users-guide",
    title: "The Creative Users Guide",
    subtitle: "Possibilities & Living Anthology",
    slug: "evolving-guide-deckoviz-use-cases",
    readTime: "18 min read",
    category: "Creative Guide",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-200",
    icon: Sparkles,
    description:
      "An evolving anthology of creative use cases, daily storytelling rituals, mood design, and novel ways people use Deckoviz in their homes.",
    pillColor: "from-purple-600 to-indigo-600"
  },
  {
    id: "art-guide",
    title: "The Art Guide",
    subtitle: "Genres, Vizzy & Living Collections",
    slug: "the-complete-art-guide-for-your-deckoviz-dasportal",
    readTime: "18 min read",
    category: "Art Guide",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    icon: Palette,
    description:
      "Everything on your Portal exists around a center: Art. A comprehensive guide to genres, styles, co-creating with Vizzy, and personal art for your home.",
    pillColor: "from-emerald-600 to-teal-600"
  },
  {
    id: "poster-guide",
    title: "The Poster Guide",
    subtitle: "Dynamic Posters & Vision Boards",
    slug: "the-complete-posters-guide-for-your-deckoviz-portal",
    readTime: "16 min read",
    category: "Poster Guide",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-200",
    icon: Frame,
    description:
      "A painting speaks to the heart. A poster speaks to the mind. Living posters, vision boards, daily priorities, and typographic art for your wall.",
    pillColor: "from-amber-600 to-orange-600"
  },
  {
    id: "photos-guide",
    title: "The Photos Guide",
    subtitle: "Memories, Motion & Presence",
    slug: "the-complete-photos-guide-for-your-deckoviz-dasportal",
    readTime: "14 min read",
    category: "Photos Guide",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-200",
    icon: ImageIcon,
    description:
      "How personal photos, memory archives, global photo collections, and subtle motion bring emotional depth back into your home.",
    pillColor: "from-sky-600 to-indigo-600"
  }
];

export default function HowToUseDeckoviz() {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm text-xs font-bold text-indigo-950 uppercase tracking-widest mb-6 hover:scale-105 transition-all duration-300 cursor-default">
            <Sparkle className="w-4 h-4 text-indigo-600" />
            <span>Practice & Mastery Guides</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-slate-900 leading-tight mb-6 font-medium">
            How to Use Deckoviz
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal px-2">
            Essential companion guides to help you set up, personalize, curate living art, design moodboards, and build a quiet, meaningful relationship with your Deckoviz Portal.
          </p>
        </div>

        {/* GUIDES GRID - 6 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {howToUseGuides.map((guide) => {
            const IconComponent = guide.icon;
            return (
              <div
                key={guide.id}
                onClick={() => navigate(guide.customLink || `/blog/${guide.slug}`)}
                className="group relative rounded-[2.2rem] p-7 bg-white/60 backdrop-blur-2xl border border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_15px_40px_rgba(37,99,235,0.08)] hover:shadow-[inset_0_2.5px_5px_rgba(255,255,255,1),0_30px_70px_rgba(37,99,235,0.2)] hover:border-white hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Glow Pill top corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${guide.pillColor} opacity-5 group-hover:opacity-15 rounded-bl-[100px] transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-blue-600 flex items-center justify-center text-white shadow-md border border-white/80 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shrink-0 p-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border shadow-sm ${guide.badgeColor}`}>
                      {guide.category}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold mb-3">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{guide.readTime}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold mb-1.5 text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <div className="text-xs font-semibold text-indigo-800/80 mb-3.5 italic">
                    {guide.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {guide.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-indigo-900">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Read Guide
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-blue-600 group-hover:text-indigo-900" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
