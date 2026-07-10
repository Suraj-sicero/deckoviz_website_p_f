import { useState, useEffect } from "react";
import { Music, Play, Clock, Tag } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";

export default function MusicDashboardView() {
  const [music, setMusic] = useState<any[]>([]);

  useEffect(() => {
    enterpriseApi.getMusic().then(setMusic).catch(console.error);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Music Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">{music.length} tracks available</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {music.map((track) => (
          <div key={track.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white">
                <Music size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-bold text-gray-800 truncate">{track.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Clock size={11} /> {track.duration}</span>
                  <span className="flex items-center gap-1"><Tag size={11} /> {track.genre}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-400 font-medium">Added {track.createdAt}</p>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#182a4a]/10 text-[#182a4a] transition hover:bg-[#182a4a]/20">
                <Play size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
