import React, { useState } from "react";
import HomesDeckovizGuideSection from "./HomesDeckovizGuideSection";
import SchoolsDeckovizGuideSection from "./SchoolsDeckovizGuideSection";
import HotelsDeckovizGuideSection from "./HotelsDeckovizGuideSection";
import { Home, GraduationCap, Hotel, Sparkle } from "lucide-react";

export default function DeckovizSpacesHub() {
  const [selectedSpace, setSelectedSpace] = useState<"homes" | "schools" | "hotels">("homes");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      {/* HUB TOP BANNER */}
      <div className="pt-24 pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm text-xs font-bold text-indigo-950 uppercase tracking-widest mb-6">
          <Sparkle className="w-4 h-4 text-indigo-600" />
          <span>Deckoviz Across Spaces</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-slate-900 leading-tight mb-6">
          What Kinds of Spaces Is Deckoviz For?
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
          Explore how Deckoviz transforms living rooms, classrooms, and hotel properties into living, intelligent, attuned environments.
        </p>

        {/* SPACE SWITCHER PILLS */}
        <div className="inline-flex flex-wrap justify-center gap-3 p-2 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-md">
          <button
            onClick={() => setSelectedSpace("homes")}
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedSpace === "homes"
                ? "bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-700 text-white shadow-lg scale-105"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Deckoviz for Homes</span>
          </button>

          <button
            onClick={() => setSelectedSpace("schools")}
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedSpace === "schools"
                ? "bg-gradient-to-r from-teal-800 via-emerald-700 to-cyan-700 text-white shadow-lg scale-105"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Deckoviz for Schools</span>
          </button>

          <button
            onClick={() => setSelectedSpace("hotels")}
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedSpace === "hotels"
                ? "bg-gradient-to-r from-purple-900 via-indigo-800 to-amber-700 text-white shadow-lg scale-105"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Hotel className="w-4 h-4" />
            <span>Deckoviz for Hotels</span>
          </button>
        </div>
      </div>

      {/* RENDER SELECTED SPACE COMPONENT */}
      <div>
        {selectedSpace === "homes" && <HomesDeckovizGuideSection />}
        {selectedSpace === "schools" && <SchoolsDeckovizGuideSection />}
        {selectedSpace === "hotels" && <HotelsDeckovizGuideSection />}
      </div>
    </div>
  );
}
