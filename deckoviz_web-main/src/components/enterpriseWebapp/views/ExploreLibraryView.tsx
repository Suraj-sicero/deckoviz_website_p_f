import { useState } from "react";
import { Search, Bookmark, Lightbulb, Sparkles, Download } from "lucide-react";
import { libraryCategories } from "../enterpriseData";

type LibTab = "art" | "photos" | "posters";

export default function ExploreLibraryView() {
  const [activeTab, setActiveTab] = useState<LibTab>("art");

  const tabs: { id: LibTab; label: string }[] = [
    { id: "art", label: "Art" },
    { id: "photos", label: "Photos" },
    { id: "posters", label: "Posters" },
  ];

  const items = libraryCategories[activeTab];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Explore Deckoviz Library</h1>
          <p className="text-sm text-gray-400 mt-1">Examples, ideas, references, inspirations, prompts & templates</p>
        </div>
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search library..."
            className="h-9 w-[260px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </label>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/20"
                : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200 hover:text-[#182a4a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-[#e8eaef] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-[200px] overflow-hidden">
              <img
                src={item.cover}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/70 font-medium">{item.count} items</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30">
                    <Bookmark size={14} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inspiration Section */}
      <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
            <Lightbulb size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Prompt Inspiration</h3>
            <p className="text-xs text-white/40">Try these prompts to create stunning content</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "A serene Japanese garden at dawn with gentle mist rolling over koi ponds",
            "Abstract oil painting with bold brushstrokes, deep blue and gold palette",
            "Modern minimalist poster with clean typography for a luxury hotel event",
            "Macro photograph of morning dew on spider silk, bokeh background",
            "Art deco inspired pattern using geometric shapes in emerald and copper",
            "Impressionist sunset over Mediterranean coastal village, warm tones"
          ].map((prompt, i) => (
            <div key={i} className="group rounded-xl bg-white/5 border border-white/10 p-4 transition hover:bg-white/10 hover:border-white/20 cursor-pointer">
              <p className="text-xs text-white/70 italic leading-relaxed">{prompt}</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition">
                <Sparkles size={10} /> Use this prompt
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
