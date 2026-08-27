import { useState, useEffect, useRef } from "react";
import { Mic, Search, Play, Pause, Download, Volume2, SearchIcon, Loader2, Star } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

const DEFAULT_VOICES = [
  "Rachel — Luxury British Accent",
  "Marcus — Deep Executive Tone",
  "Sophia — Ambient Storyteller",
  "David — Clear Corporate Announcement",
  "Aria — Smooth Gallery Curator",
  "Ethan — Energetic Broadcast"
];

export default function NarrationsView() {
  const [voices, setVoices] = useState<any[]>(DEFAULT_VOICES);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    enterpriseApi.getNarrations().then((res) => {
      if (Array.isArray(res) && res.length > 0) setVoices(res);
    }).catch((err) => {
      console.error("Narrations API error", err);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Narrations & Voice</h1>
          <p className="text-sm text-gray-400 mt-1">{voices.length} premium voices available</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search voices..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Mic size={16} /> New Narration
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-28 rounded-2xl border border-gray-100 bg-gray-50/50 p-5 animate-pulse" />
          ))}
        </div>
      ) : voices.length === 0 ? (
        <EmptyState
          icon={Mic}
          title="No voices available"
          description="We couldn't load the voice library right now. Please try again later."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {voices.map((voice, i) => (
            <div key={i} className="group rounded-2xl border border-[#e8eaef] bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white">
                  <Mic size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold text-gray-800">{voice}</h3>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">AI Voice</p>
                </div>
                <div className="flex gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-[#182a4a]/10 hover:text-[#182a4a] transition">
                    <Play size={14} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-amber-50 hover:text-amber-500 transition">
                    <Star size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
