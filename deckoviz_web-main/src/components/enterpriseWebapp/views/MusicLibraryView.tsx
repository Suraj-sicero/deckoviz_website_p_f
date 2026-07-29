import { useState, useEffect } from "react";
import { Search, Play, Heart, Shuffle, Music, Loader2 } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";

import { EmptyState } from "./ui/EmptyState";

const categories = ["All", "Nature", "Piano", "Ambient", "Jazz", "Classical", "Lo-fi"];

export default function MusicLibraryView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [musicLib, setMusicLib] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enterpriseApi.getMusic().then((res) => {
      setMusicLib(res);
    }).catch((err) => {
      console.error("Music API error", err);
      setMusicLib([]);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All" ? musicLib : musicLib.filter(m => m.category === activeCategory);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Music & Ambience</h1>
          <p className="text-sm text-gray-400 mt-1">{musicLib.length} tracks and playlists available</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search music..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e2e4ea] bg-white text-gray-400 hover:text-[#182a4a] transition">
            <Shuffle size={14} />
          </button>
        </div>
      </div>
      
      {musicLib.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`shrink-0 rounded-xl px-5 py-2 text-xs font-bold transition ${activeCategory === cat ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-[#e8eaef] bg-white divide-y divide-[#f5f5f8]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
               <div className="h-10 w-10 rounded-full bg-gray-100" />
               <div className="flex-1 space-y-2">
                 <div className="h-4 bg-gray-100 rounded w-1/4" />
                 <div className="h-3 bg-gray-100 rounded w-1/6" />
               </div>
            </div>
          ))}
        </div>
      ) : musicLib.length === 0 ? (
        <EmptyState
          icon={Music}
          title="No music found"
          description="Your music and ambience library is currently empty. Try refreshing."
        />
      ) : (
        <div className="rounded-xl border border-[#e8eaef] bg-white divide-y divide-[#f5f5f8]">
          {filtered.map((track, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 transition hover:bg-blue-50/30 group">
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#182a4a]/10 text-[#182a4a] transition group-hover:bg-blue-500 group-hover:text-white">
                <Play size={14} />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-700">{track.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{track.artist} · {track.duration}</p>
              </div>
              <span className="rounded-full bg-gray-50 px-3 py-1 text-[10px] font-bold text-gray-400">{track.category}</span>
              <button className="text-gray-300 hover:text-red-400 transition">
                <Heart size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
