import { useState } from "react";
import { Image as ImageIcon, Video, Music, Mic, Upload, Filter, Grid, List, Search } from "lucide-react";

const mediaTabs = [
  { id: "gen_images", label: "Generated Images", icon: ImageIcon, count: 847 },
  { id: "gen_videos", label: "Generated Videos", icon: Video, count: 126 },
  { id: "gen_narrations", label: "Generated Narrations", icon: Mic, count: 64 },
  { id: "gen_music", label: "Generated Music", icon: Music, count: 93 },
  { id: "up_images", label: "Uploaded Images", icon: Upload, count: 512 },
  { id: "up_videos", label: "Uploaded Videos", icon: Video, count: 78 },
  { id: "up_music", label: "Uploaded Music", icon: Music, count: 231 },
];

const placeholderImages = [
  "/images/webapp/figma/spiral-ocean.jpg",
  "/images/webapp/figma/solo-rafting-card.jpg",
  "/images/webapp/figma/violin-art.jpg",
  "/images/webapp/figma/abstract-wave-wide.jpg",
  "/images/webapp/figma/interior-tech.jpg",
  "/images/webapp/figma/aurora-lake.jpg",
  "/images/webapp/figma/boat-pond.jpg",
  "/images/webapp/nature_garden.png",
  "/images/webapp/digital_plants.png",
  "/images/webapp/vibrant_face_art.png",
  "/images/webapp/city_fire_reflection.png",
  "/images/webapp/abstract_landscape.png",
  "/images/webapp/minimalistic_night.png",
];

export default function AllMediaView() {
  const [activeTab, setActiveTab] = useState("gen_images");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // removed unused activeTabData
  const isImageTab = activeTab.includes("images");
  const isVideoTab = activeTab.includes("videos");

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">All Media</h1>
          <p className="text-sm text-gray-400 mt-1">Browse all your generated and uploaded media assets</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search media..."
              className="h-9 w-[240px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </label>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e4ea] bg-white text-gray-400 transition hover:border-blue-300 hover:text-[#182a4a]">
            <Filter size={14} />
          </button>
          <div className="flex rounded-lg border border-[#e2e4ea] overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex h-9 w-9 items-center justify-center transition ${viewMode === "grid" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white" : "bg-white text-gray-400 hover:text-gray-600"}`}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex h-9 w-9 items-center justify-center transition ${viewMode === "list" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white" : "bg-white text-gray-400 hover:text-gray-600"}`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {mediaTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/20"
                : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200 hover:text-[#182a4a]"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {(isImageTab || isVideoTab) ? (
        <div className={`grid gap-3 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
          {placeholderImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl border border-[#e8eaef] bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                viewMode === "list" ? "flex items-center gap-4 p-3" : ""
              }`}
            >
              <div className={`overflow-hidden ${viewMode === "grid" ? "aspect-square" : "h-16 w-16 shrink-0 rounded-lg"}`}>
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {isVideoTab && viewMode === "grid" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg">
                      <Video size={16} />
                    </div>
                  </div>
                )}
              </div>
              {viewMode === "grid" ? (
                <div className="p-3">
                  <p className="text-xs font-bold text-gray-700 truncate">Asset_{(i + 1).toString().padStart(3, '0')}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Jun {20 - (i % 10)}, 2025 · 2.4 MB</p>
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-700">Asset_{(i + 1).toString().padStart(3, '0')}.{isVideoTab ? "mp4" : "png"}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Jun {20 - (i % 10)}, 2025 · 2.4 MB · 1920×1080</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Audio / Narration list view */
        <div className="rounded-xl border border-[#e8eaef] bg-white divide-y divide-[#f5f5f8]">
          {Array.from({length: 8}, (_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 transition hover:bg-blue-50/30 group">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activeTab.includes("music") ? "bg-blue-50 text-[#2563EB]" : "bg-amber-50 text-amber-500"}`}>
                {activeTab.includes("music") ? <Music size={16} /> : <Mic size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-700">{activeTab.includes("music") ? `Track ${i + 1} — Ambient ${["Sunrise","Calm","Focus","Drift","Rain","Drift","Flow","Pulse"][i]}` : `Narration ${i + 1} — ${["Welcome","Guided Tour","Event Intro","Room Brief","Garden Walk","Spa Guide","Art Story","Check-in"][i]}`}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Duration: {3 + (i % 4)}:{((i * 13) % 60).toString().padStart(2,'0')} · Jun {20 - i}, 2025</p>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-[#182a4a]/10 hover:text-[#182a4a]">
                ▶
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
