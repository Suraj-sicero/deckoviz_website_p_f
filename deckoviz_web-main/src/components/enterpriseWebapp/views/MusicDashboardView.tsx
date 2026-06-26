import { useState } from "react";
import { Music, Play, Plus, Search, Clock, Headphones } from "lucide-react";
import { musicPieces } from "../enterpriseData";

export default function MusicDashboardView() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Music Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Generate AI music and manage your compositions</p>
      </div>

      {/* Generator */}
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 70% 50%, #3b82f6 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <Music size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Generate Music</h3>
              <p className="text-xs text-white/40">Describe the mood, genre, or atmosphere</p>
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., Calm jazz piano for a luxury hotel lobby evening ambiance"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 h-12 rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-violet-400/50 focus:bg-white/10 backdrop-blur-sm"
            />
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-6 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]">
              <Music size={16} /> Generate
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {["Ambient", "Jazz", "Classical", "Lo-fi", "Nature Sounds", "Electronic"].map((g) => (
              <button key={g} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold text-white/50 transition hover:bg-white/10 hover:text-white/80">
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Music List */}
      <div className="rounded-xl border border-[#e8eaef] bg-white">
        <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Your Music</h3>
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
            <input type="text" placeholder="Search..." className="h-8 w-[180px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-8 pr-3 text-[11px] outline-none focus:border-blue-300" />
          </label>
        </div>
        <div className="divide-y divide-[#f5f5f8]">
          {musicPieces.map((piece) => (
            <div key={piece.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-blue-50/30 group">
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500 transition group-hover:bg-violet-500 group-hover:text-white">
                <Play size={14} />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-700">{piece.title}</p>
                <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Clock size={10} /> {piece.duration}</span>
                  <span>{piece.genre}</span>
                  <span>{piece.createdAt}</span>
                </div>
              </div>
              <button className="flex h-8 items-center gap-1.5 rounded-lg bg-gray-50 px-3 text-[11px] font-semibold text-gray-400 transition hover:bg-[#182a4a]/10 hover:text-[#182a4a]">
                <Headphones size={12} /> Listen
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
