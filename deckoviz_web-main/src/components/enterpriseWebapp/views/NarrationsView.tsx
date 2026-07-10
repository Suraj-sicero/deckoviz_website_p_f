import { useState, useEffect } from "react";
import { Mic, Play, Star } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";

export default function NarrationsView() {
  const [voices, setVoices] = useState<string[]>([]);

  useEffect(() => {
    enterpriseApi.getNarrations().then(setVoices).catch(console.error);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Narrations</h1>
        <p className="text-sm text-gray-400 mt-1">{voices.length} AI narration voices available</p>
      </div>

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
    </div>
  );
}
