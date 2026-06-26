import { useState } from "react";
import { Mic, Play, Clock, ChevronDown, Search } from "lucide-react";
import { narrationVoices } from "../enterpriseData";

export default function NarrationsView() {
  const [selectedVoice, setSelectedVoice] = useState(narrationVoices[0]);
  const [text, setText] = useState("");

  const pastNarrations = [
    { id: 1, title: "Welcome to Grand Metropolitan", voice: "Emily — Warm British", duration: "0:45", date: "Jun 24" },
    { id: 2, title: "Spa Experience Introduction", voice: "Aria — Soft French", duration: "1:12", date: "Jun 22" },
    { id: 3, title: "Art Collection Guided Tour", voice: "James — Deep American", duration: "3:30", date: "Jun 20" },
    { id: 4, title: "Evening Jazz Event Announcement", voice: "Oliver — Classic British", duration: "0:38", date: "Jun 18" },
    { id: 5, title: "Garden Terrace Walkthrough", voice: "Sofia — Elegant Italian", duration: "2:15", date: "Jun 16" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Narrations</h1>
        <p className="text-sm text-gray-400 mt-1">Generate voiceovers with AI narrators</p>
      </div>

      {/* Generator */}
      <div className="mb-8 rounded-2xl border border-[#e8eaef] bg-white p-6">
        <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Create Narration</h3>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you'd like to narrate..."
          className="w-full h-32 rounded-xl border border-[#e2e4ea] bg-[#f8f9fb] p-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white resize-none"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-xs font-bold text-gray-500">Voice:</p>
            <div className="relative">
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="appearance-none rounded-lg border border-[#e2e4ea] bg-white px-4 py-2 pr-8 text-xs font-semibold text-gray-600 outline-none focus:border-blue-300"
              >
                {narrationVoices.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]">
            <Mic size={16} /> Generate Narration
          </button>
        </div>
      </div>

      {/* Voice Preview Cards */}
      <div className="mb-8">
        <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Voice Options</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {narrationVoices.map((voice) => (
            <button
              key={voice}
              onClick={() => setSelectedVoice(voice)}
              className={`group rounded-xl border px-4 py-3.5 text-left transition-all ${
                selectedVoice === voice ? "border-blue-300 bg-[#182a4a]/10 shadow-sm" : "border-[#e8eaef] bg-white hover:border-blue-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${selectedVoice === voice ? "bg-gradient-to-r from-[#182a4a] to-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                  <Mic size={12} />
                </div>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition group-hover:bg-[#182a4a]/10 group-hover:text-[#182a4a]">
                  <Play size={8} />
                </div>
              </div>
              <p className="text-xs font-bold text-gray-700">{voice}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Past Narrations */}
      <div className="rounded-xl border border-[#e8eaef] bg-white">
        <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Previous Narrations</h3>
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
            <input type="text" placeholder="Search..." className="h-8 w-[180px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-8 pr-3 text-[11px] outline-none focus:border-blue-300" />
          </label>
        </div>
        <div className="divide-y divide-[#f5f5f8]">
          {pastNarrations.map((n) => (
            <div key={n.id} className="flex items-center gap-4 px-6 py-4 transition hover:bg-blue-50/30 group">
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
                <Play size={14} />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-700">{n.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{n.voice} · <Clock size={10} className="inline" /> {n.duration} · {n.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
