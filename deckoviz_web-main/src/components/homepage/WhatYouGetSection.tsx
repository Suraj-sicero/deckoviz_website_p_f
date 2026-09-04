import React, { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  Home,
  Building2,
  GraduationCap,
  CheckCircle2,
  Tv,
  Headphones,
  Zap,
  Sun,
  Frame,
  PackagePlus,
  RefreshCw,
  BookOpenCheck,
  BookMarked,
  ShieldCheck,
  Gift,
  Bot,
  Sparkle
} from "lucide-react";

interface Item {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface CategoryData {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  gradient: string;
  badgeBg: string;
  items: Item[];
}

const whatYouGetCategories: CategoryData[] = [
  {
    id: "homes",
    icon: <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[#182a4a]" />,
    badge: "For Homes",
    title: "Deckoviz Portal for Your Home",
    subtitle: "What exactly do you get with a Deckoviz Portal for your home?",
    gradient: "from-teal-400/20 via-indigo-400/10 to-transparent",
    badgeBg: "bg-teal-50/90 text-teal-900 border-teal-200/90 shadow-sm",
    items: [
      {
        title: "The DASPort, your generative display",
        desc: "A living canvas for art, posters, live-generated visuals, and multimodal media, plus a full-featured personal photo frame and art frame in one.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Vizzy, your home's emotionally intelligent companion",
        desc: "Learns your moods, preferences, lifestyle, hopes, and rhythms, and grows more attuned to your family over years, even decades. Vizzy proactively creates and curates experiences for your space, almost magically anticipating what your home needs, when it needs it. Your home's creative OS and emotional intelligence, built in.",
        icon: <Bot className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Full Google TV integration",
        desc: "Stream YouTube, use your favourite TV apps, or simply use it as a smart TV, the DASPort is as multipurpose as you want it to be, for those who want their TV to function as an art frame, and their art frames to function as a TV.",
        icon: <Tv className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Attentive, always-on customer support",
        desc: "Real help, whenever you need it.",
        icon: <Headphones className="w-5 h-5 text-sky-600" />
      },
      {
        title: "Monthly generation credits",
        desc: "Every customer gets free credits monthly, with significantly more included across our three paid subscription tiers.",
        icon: <Zap className="w-5 h-5 text-amber-500" />
      },
      {
        title: "Halo backlight",
        desc: "Ambient lighting that syncs beautifully with whatever art is on display.",
        icon: <Sun className="w-5 h-5 text-amber-600" />
      },
      {
        title: "A sleek, handcrafted wooden frame",
        desc: "Designed to belong on your wall, not just in front of it, as an actual art frame would.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Optional add-ons",
        desc: "Custom frame finishes, mounts and stands, immersive 16D speakers, wooden frame skins, and more.",
        icon: <PackagePlus className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Weekly feature and content updates",
        desc: "Your Portal keeps getting better, automatically, every single week.",
        icon: <RefreshCw className="w-5 h-5 text-cyan-600" />
      },
      {
        title: "Onboarding & Installation Guide",
        desc: "A clear, step-by-step guide that takes you from unboxing to your first piece of generated art and personalized setup, no technical know-how required.",
        icon: <BookOpenCheck className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Tens of In-Depth Guides to Get the Most From Your DASPort",
        desc: "Dedicated guides covering everything from art and posters to photos, mood-setting, storytelling, and rituals, so you're never wondering what your DASPort can do next.",
        icon: <BookMarked className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Warranty",
        desc: "Every Deckoviz Portal is backed by our standard warranty, so your investment is protected from day one.",
        icon: <ShieldCheck className="w-5 h-5 text-teal-600" />
      },
      {
        title: "More Perks of the Deckoviz Family",
        desc: "Being a Deckoviz customer comes with more than the Portal itself. We've got more perks and benefits for our community, coming soon.",
        icon: <Gift className="w-5 h-5 text-[#182a4a]" />
      }
    ]
  },
  {
    id: "enterprises",
    icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#182a4a]" />,
    badge: "For Enterprises",
    title: "Deckoviz Portal for Your Business",
    subtitle: "What exactly do you get with a Deckoviz Portal for your business?",
    gradient: "from-teal-500/20 via-indigo-500/10 to-transparent",
    badgeBg: "bg-teal-50/90 text-teal-900 border-teal-200/90 shadow-sm",
    items: [
      {
        title: "The DASPort, your generative display",
        desc: "A living canvas for on-brand art, posters, live-generated visuals, and multimodal content across your space.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Vizzy, your Creative, Marketing & Experience Director",
        desc: "A business and brand companion that proactively creates, curates, and displays content on your behalf. Vizzy runs an entire suite of specialised sub-agents and features under the hood, acting as a genuine director for your space: generating on-brand content, crafting special moments for your guests, and continuously elevating the experience your business delivers. Far more than a display, an active creative and marketing function for your brand. Think of it as your Space Director.",
        icon: <Bot className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Attentive, always-on customer support",
        desc: "Real help, whenever you need it.",
        icon: <Headphones className="w-5 h-5 text-sky-600" />
      },
      {
        title: "Monthly generation credits",
        desc: "Every customer gets free credits monthly, with significantly more included across our three paid subscription tiers.",
        icon: <Zap className="w-5 h-5 text-amber-500" />
      },
      {
        title: "Halo backlight",
        desc: "Ambient lighting that syncs beautifully with whatever's on display.",
        icon: <Sun className="w-5 h-5 text-amber-600" />
      },
      {
        title: "A sleek, handcrafted wooden frame",
        desc: "A piece that elevates your space, not just occupies it.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Optional add-ons",
        desc: "Custom frame finishes, mounts and stands, immersive 16D speakers, wooden frame skins, and more.",
        icon: <PackagePlus className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Weekly feature and content updates",
        desc: "Your Portal keeps getting better, automatically, every single week.",
        icon: <RefreshCw className="w-5 h-5 text-cyan-600" />
      },
      {
        title: "Full Google TV integration",
        desc: "Flexible enough to double as a smart TV or streaming display wherever your space calls for it.",
        icon: <Tv className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Onboarding & Installation Guide",
        desc: "A clear, guided setup process, from unboxing to your first generated experience, built for teams and staff, not just individual users.",
        icon: <BookOpenCheck className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Tens of In-Depth Guides to Get the Most From Your DASPort",
        desc: "A growing library of guides covering every modality and experience your business or school can use, from content creation and ambiance design to classroom and guest experiences.",
        icon: <BookMarked className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Warranty",
        desc: "Every Deckoviz Portal is backed by our standard warranty, giving your business or school lasting peace of mind.",
        icon: <ShieldCheck className="w-5 h-5 text-teal-600" />
      },
      {
        title: "More Perks of the Deckoviz Family",
        desc: "Being part of the Deckoviz ecosystem comes with more than the Portal itself. We've got more perks and benefits for our partners and institutions, coming soon.",
        icon: <Gift className="w-5 h-5 text-[#182a4a]" />
      }
    ]
  },
  {
    id: "schools",
    icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-teal-700" />,
    badge: "For Schools",
    title: "Deckoviz Portal for Your Classroom",
    subtitle: "What exactly do you get with a Deckoviz Portal for your classroom?",
    gradient: "from-teal-500/20 via-blue-500/10 to-transparent",
    badgeBg: "bg-teal-50/90 text-teal-900 border-teal-200/90 shadow-sm",
    items: [
      {
        title: "The Portal, your generative display",
        desc: "A living canvas for multimodal learning content, and a fully capable classroom smart display in its own right, to adapt classes to lessons and students.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Vizzy, the ultimate learning companion and teaching assistant",
        desc: "A personalised learning companion for every student, and a dedicated assistant for every teacher. Vizzy learns, adapts, curates, and creates intelligently, generating multimodal and personalised learning materials in real time, tailored to how each student learns and how each teacher teaches. This is not a screen with content loaded on it, but a genuine learning partner for your classroom.",
        icon: <Bot className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Full Google TV integration",
        desc: "Access smart learning apps and video-based learning through YouTube and beyond, all with school-appropriate controls configured from the start.",
        icon: <Tv className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Attentive, always-on customer support",
        desc: "Real help, whenever your school needs it.",
        icon: <Headphones className="w-5 h-5 text-sky-600" />
      },
      {
        title: "Monthly generation credits",
        desc: "Every customer gets free credits monthly, with significantly more included across our three paid subscription tiers.",
        icon: <Zap className="w-5 h-5 text-amber-500" />
      },
      {
        title: "Halo backlight",
        desc: "Ambient lighting that syncs beautifully with classroom visuals.",
        icon: <Sun className="w-5 h-5 text-amber-600" />
      },
      {
        title: "A sleek, handcrafted wooden frame",
        desc: "Built to belong in a modern learning space.",
        icon: <Frame className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Optional add-ons",
        desc: "Custom frame finishes, mounts and stands, immersive 16D speakers, wooden frame skins, and more.",
        icon: <PackagePlus className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Weekly feature and content updates",
        desc: "Your Portal, and your school's learning library, keeps growing, automatically, every single week.",
        icon: <RefreshCw className="w-5 h-5 text-cyan-600" />
      },
      {
        title: "Onboarding & Installation Guide",
        desc: "A clear, guided setup process, from unboxing to your first generated experience, built for teams and staff, not just individual users.",
        icon: <BookOpenCheck className="w-5 h-5 text-teal-600" />
      },
      {
        title: "Tens of In-Depth Guides to Get the Most From Your DASPort",
        desc: "A growing library of guides covering every modality and experience your business or school can use, from content creation and ambiance design to classroom and guest experiences.",
        icon: <BookMarked className="w-5 h-5 text-indigo-600" />
      },
      {
        title: "Warranty",
        desc: "Every Deckoviz Portal is backed by our standard warranty, giving your business or school lasting peace of mind.",
        icon: <ShieldCheck className="w-5 h-5 text-teal-600" />
      },
      {
        title: "More Perks of the Deckoviz Family",
        desc: "Being part of the Deckoviz ecosystem comes with more than the Portal itself. We've got more perks and benefits for our partners and institutions, coming soon.",
        icon: <Gift className="w-5 h-5 text-[#182a4a]" />
      }
    ]
  }
];

export default function WhatYouGetSection() {
  const [openCategory, setOpenCategory] = useState<string>("homes");

  const handleMouseEnter = (id: string, e: React.MouseEvent) => {
    if ("pointerType" in e.nativeEvent && (e.nativeEvent as PointerEvent).pointerType === "touch") {
      return;
    }
    setOpenCategory(id);
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto my-12 sm:my-16 px-3 sm:px-6 relative z-10"
    >
      {/* SECTION HEADER */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_8px_25px_rgba(37,99,235,0.15)] text-[10px] sm:text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3 sm:mb-4">
          <Sparkle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 animate-spin-slow" />
          <span>Included With Every Purchase</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What You Get <span className="bg-gradient-to-r from-indigo-950 via-indigo-700 to-blue-600 bg-clip-text text-transparent italic">Deckoviz Portal</span>
        </h2>

        <p className="text-xs sm:text-base lg:text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed font-normal px-2">
          What all do you get as a Deckoviz customer when you purchase a Deckoviz Portal? Tap or hover over any category to expand.
        </p>
      </div>

      {/* CATEGORY ACCORDION PANELS WITH MOBILE TOUCH FIX */}
      <div className="space-y-4 sm:space-y-6">
        {whatYouGetCategories.map((cat) => {
          const isOpen = openCategory === cat.id;

          return (
            <div
              key={cat.id}
              onMouseEnter={(e) => handleMouseEnter(cat.id, e)}
              className={`group/panel relative rounded-3xl sm:rounded-[2.5rem] border transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen
                  ? "bg-white/70 sm:bg-white/55 backdrop-blur-2xl border-white/95 shadow-[inset_0_2.5px_5px_rgba(255,255,255,1),0_20px_50px_rgba(37,99,235,0.15)] sm:scale-[1.01]"
                  : "bg-white/40 sm:bg-white/35 backdrop-blur-xl border-white/70 hover:bg-white/55 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.8),0_10px_25px_rgba(0,0,0,0.04)]"
              }`}
            >
              {/* Glass Top Edge Reflection Line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

              {/* Ambient Glow Background Orb when open */}
              {isOpen && (
                <div
                  className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none bg-gradient-to-br ${cat.gradient}`}
                />
              )}

              {/* ACCORDION HEADER BUTTON */}
              <button
                type="button"
                onClick={() => setOpenCategory((prev) => (prev === cat.id ? "" : cat.id))}
                className="w-full px-4 sm:px-9 py-4 sm:py-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none relative z-10 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-white flex items-center justify-center group-hover/panel:scale-105 sm:group-hover/panel:scale-110 transition-all duration-500 shrink-0">
                    {cat.icon}
                  </div>

                  <div className="min-w-0">
                    <span
                      className={`inline-block px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 backdrop-blur-md border ${cat.badgeBg}`}
                    >
                      {cat.badge}
                    </span>
                    <h3 className="text-base sm:text-2xl font-bold text-slate-900 leading-tight truncate">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isOpen
                      ? "bg-gradient-to-r from-indigo-900 to-blue-600 text-white rotate-180 shadow-md shadow-indigo-600/30 border border-white/30"
                      : "bg-white/80 sm:bg-white/60 backdrop-blur-md text-slate-700 group-hover/panel:bg-white group-hover/panel:text-indigo-900 border border-white/80"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>

              {/* ACCORDION BODY CONTENT WITH SMOOTH MOBILE ANIMATION */}
              {isOpen && (
                <div className="px-4 sm:px-9 pb-6 sm:pb-9 pt-2 border-t border-slate-200/50 relative z-10 transition-all duration-500 animate-fadeIn">
                  <p className="text-xs sm:text-base font-bold text-indigo-950 mb-4 sm:mb-7 italic bg-white/85 backdrop-blur-md px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/95 shadow-sm inline-block max-w-full">
                    {cat.subtitle}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {cat.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="group/item relative p-5 sm:p-6 rounded-[1.75rem] bg-white/60 backdrop-blur-xl border border-white/90 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(37,99,235,0.18)] hover:border-white hover:-translate-y-1.5 hover:scale-[1.01] hover:bg-white/80 transition-all duration-500 flex items-start gap-4 overflow-hidden"
                      >
                        {/* Top edge highlight */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

                        {/* Clean Lucide Icon Badge */}
                        <div className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-sm flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:rotate-3 transition-transform duration-300 relative">
                          {item.icon}
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
