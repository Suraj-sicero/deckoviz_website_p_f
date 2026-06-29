import { useState } from "react";
import { Sparkles, Bookmark, ChevronRight } from "lucide-react";

export default function CurationsView() {
  const [activeTab, setActiveTab] = useState<"vizzy" | "deckoviz">("vizzy");

  const vizzyCurations = [
    { title: "Morning Serenity Bundle", desc: "Curated based on your lobby's morning schedule — calm, bright, inviting", items: 12, cover: "/images/webapp/nature_garden.png" },
    { title: "Corporate Welcome Pack", desc: "Professional yet warm art for your boardroom and conference spaces", items: 8, cover: "/images/webapp/minimalistic_night.png" },
    { title: "Evening Ambiance Palette", desc: "Warm tones, abstract forms, perfect for dinner ambiance", items: 15, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
    { title: "Spa Wellness Collection", desc: "Nature-inspired calming visuals for your spa and wellness area", items: 20, cover: "/images/webapp/digital_plants.png" },
  ];

  const deckovizCurations = [
    { title: "Renaissance Revival", desc: "Classic masterpieces reimagined for modern digital display", items: 24, cover: "/images/webapp/figma/spiral-ocean.jpg" },
    { title: "Urban Contemporary", desc: "Bold cityscapes and urban art for dynamic spaces", items: 18, cover: "/images/webapp/city_fire_reflection.png" },
    { title: "Botanical Dreams", desc: "Lush botanical illustrations and nature art", items: 30, cover: "/images/webapp/digital_plants.png" },
    { title: "Abstract Horizons", desc: "Vibrant abstract art with bold colors and gradients", items: 22, cover: "/images/webapp/vibrant_face_art.png" },
    { title: "Minimalist Focus", desc: "Clean, minimal artwork for professional spaces", items: 16, cover: "/images/webapp/abstract_landscape.png" },
    { title: "Coastal Serenity", desc: "Ocean-inspired art for relaxing environments", items: 20, cover: "/images/webapp/figma/aurora-lake.jpg" },
  ];

  const curations = activeTab === "vizzy" ? vizzyCurations : deckovizCurations;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Deckoviz Curations</h1>
        <p className="text-sm text-gray-400 mt-1">Explore curated art and poster collections</p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-3">
        <button onClick={() => setActiveTab("vizzy")} className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${activeTab === "vizzy" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/20" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
          <Sparkles size={14} /> Curated For You by Vizzy
        </button>
        <button onClick={() => setActiveTab("deckoviz")} className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold transition ${activeTab === "deckoviz" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/20" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
          Deckoviz Curations
        </button>
      </div>

      {activeTab === "vizzy" && (
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100 p-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700">Personalized by Vizzy AI</h3>
            <p className="text-xs text-gray-400 mt-0.5">These curations are specifically selected based on your enterprise profile, usage patterns, and guest preferences.</p>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {curations.map((cur) => (
          <div key={cur.title} className="group overflow-hidden rounded-2xl border border-[#e8eaef] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="relative h-[180px] overflow-hidden">
              <img src={cur.cover} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40">
                  <Bookmark size={14} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">{cur.items} artworks</span>
              </div>
            </div>
            <div className="p-5 flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-1">{cur.title}</h3>
                <p className="text-[11px] text-gray-400 leading-relaxed max-w-[360px]">{cur.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-[#182a4a] transition mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
