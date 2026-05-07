import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface MemoryEntry {
  title: string;
  year?: string;
  description: string;
}

interface Chapter {
  chapter: number;
  title: string;
  timeframe: string;
  narrative: string;
  theme: string;
}

interface LifeBookResult {
  bookTitle: string;
  chapters: Chapter[];
}

const LifeBookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [memories, setMemories] = useState<MemoryEntry[]>([
    { title: "", year: "", description: "" },
  ]);
  const [authorName, setAuthorName] = useState("");
  const [result, setResult] = useState<LifeBookResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [activeChapter, setActiveChapter] = useState(0);

  const addMemory = () => {
    setMemories([...memories, { title: "", year: "", description: "" }]);
  };

  const removeMemory = (index: number) => {
    setMemories(memories.filter((_, i) => i !== index));
  };

  const updateMemory = (index: number, field: keyof MemoryEntry, value: string) => {
    const updated = [...memories];
    updated[index][field] = value;
    setMemories(updated);
  };

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    const validMemories = memories.filter(m => m.description.trim());
    if (validMemories.length < 2) { setError("Please add at least 2 memory descriptions."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/life-book/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memories: validMemories, authorName }),
      });
      if (!res.ok) throw new Error(await res.text() || "Generation failed");
      const data = await res.json();
      setResult(data);
      setActiveChapter(0);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setMemories([{ title: "", year: "", description: "" }]);
    setAuthorName(""); setResult(null);
    setStatus("idle"); setError("");
  };

  const themeColors: Record<string, string> = {
    childhood: "from-yellow-100 to-amber-100 border-yellow-300",
    youth: "from-green-100 to-emerald-100 border-green-300",
    adventure: "from-blue-100 to-indigo-100 border-blue-300",
    love: "from-pink-100 to-rose-100 border-pink-300",
    growth: "from-violet-100 to-violet-100 border-violet-300",
    wisdom: "from-orange-100 to-amber-100 border-orange-300",
    default: "from-gray-50 to-slate-100 border-gray-300",
  };

  return (
    <ToolLayout
      icon="📔"
      title="Life Book"
      subtitle="Transform your memories into beautifully organised chapters of your life story"
      gradient="from-emerald-600 via-teal-700 to-cyan-800"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Tell Vizzy Your Memories</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name (optional)</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Sarah Mitchell"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Memory entries */}
          <div className="space-y-4 mb-5">
            {memories.map((memory, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-emerald-700">Memory #{index + 1}</span>
                  {memories.length > 1 && (
                    <button
                      onClick={() => removeMemory(index)}
                      className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={memory.title}
                      onChange={(e) => updateMemory(index, "title", e.target.value)}
                      placeholder="Memory title (e.g. First Day of School)"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={memory.year}
                      onChange={(e) => updateMemory(index, "year", e.target.value)}
                      placeholder="Year (e.g. 2005)"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                    />
                  </div>
                </div>
                <textarea
                  value={memory.description}
                  onChange={(e) => updateMemory(index, "description", e.target.value)}
                  placeholder="Describe this memory in detail — what happened, who was there, how you felt…"
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                />
              </div>
            ))}
          </div>

          <button
            onClick={addMemory}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-emerald-300 text-emerald-600 font-semibold text-sm hover:bg-emerald-50 hover:border-emerald-400 transition-all mb-7"
          >
            + Add Another Memory
          </button>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>
          )}

          <button
            onClick={generate}
            disabled={status === "loading"}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
              status === "loading"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Writing your life chapters…
              </span>
            ) : "📔 Create My Life Book"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">📔</div>
            <h3 className="text-lg font-bold text-emerald-800 mb-2">Organizing your life story…</h3>
            <p className="text-sm text-emerald-600">Gemini is weaving your memories into beautifully narrated chapters.</p>
          </div>
        )}

        {/* Output — Book UI */}
        {status === "done" && result && (
          <div className="space-y-6">
            {/* Book cover */}
            <div
              className="relative rounded-3xl p-10 text-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #064e3b 0%, #065f46 40%, #047857 100%)",
                boxShadow: "0 20px 60px -10px rgba(6,78,59,0.5)",
              }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-3">The Life Book of</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{result.bookTitle}</h2>
                {authorName && <p className="text-emerald-300 font-medium">by {authorName}</p>}
                <p className="text-emerald-400 mt-3 text-sm">{result.chapters.length} chapters · A memoir</p>
              </div>
            </div>

            {/* Chapter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {result.chapters.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => setActiveChapter(i)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeChapter === i
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  Ch. {ch.chapter}: {ch.title}
                </button>
              ))}
            </div>

            {/* Chapter content */}
            {result.chapters[activeChapter] && (
              <div className={`bg-gradient-to-br ${themeColors[result.chapters[activeChapter].theme] || themeColors.default} border rounded-3xl p-8`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Chapter {result.chapters[activeChapter].chapter}</p>
                    <h3 className="text-2xl font-black text-gray-900">{result.chapters[activeChapter].title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{result.chapters[activeChapter].timeframe}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-gray-700 capitalize">
                    {result.chapters[activeChapter].theme}
                  </span>
                </div>
                <div className="prose prose-gray max-w-none">
                  {result.chapters[activeChapter].narrative.split("\n\n").map((para, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/50">
                  <button
                    onClick={() => setActiveChapter(a => Math.max(0, a - 1))}
                    disabled={activeChapter === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 text-gray-700 font-semibold text-sm hover:bg-white transition-all disabled:opacity-40"
                  >
                    ← Previous Chapter
                  </button>
                  <span className="text-xs text-gray-500">{activeChapter + 1} / {result.chapters.length}</span>
                  <button
                    onClick={() => setActiveChapter(a => Math.min(result.chapters.length - 1, a + 1))}
                    disabled={activeChapter === result.chapters.length - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-all disabled:opacity-40"
                  >
                    Next Chapter →
                  </button>
                </div>
              </div>
            )}

            <button onClick={reset} className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-emerald-300 hover:bg-emerald-50 transition-all">
              🔄 Create New Life Book
            </button>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📝", title: "Your Memories", desc: "Add as many memories as you want — Gemini groups and narrates them intelligently" },
            { icon: "📚", title: "Organised Chapters", desc: "AI structures your memories into meaningful life chapters with a narrative arc" },
            { icon: "🌿", title: "Themed Presentation", desc: "Each chapter gets its own visual theme — childhood, youth, love, wisdom, and more" },
          ].map((c) => (
            <div key={c.title} className="bg-white/60 border border-gray-100 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{c.icon}</div>
              <h4 className="font-bold text-gray-900 mb-1">{c.title}</h4>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default LifeBookTool;
