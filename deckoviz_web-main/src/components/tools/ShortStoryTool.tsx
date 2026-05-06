import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface StoryResult {
  title: string;
  story: string;
  wordCount: number;
  genre: string;
  readTime: string;
}

const ShortStoryTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("drama");
  const [length, setLength] = useState("medium");
  const [result, setResult] = useState<StoryResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const genres = [
    { value: "drama", label: "Drama", emoji: "🎭" },
    { value: "fantasy", label: "Fantasy", emoji: "🧙" },
    { value: "thriller", label: "Thriller", emoji: "😱" },
    { value: "romance", label: "Romance", emoji: "💕" },
    { value: "sci-fi", label: "Sci-Fi", emoji: "🚀" },
    { value: "horror", label: "Horror", emoji: "👻" },
    { value: "adventure", label: "Adventure", emoji: "⚔️" },
    { value: "comedy", label: "Comedy", emoji: "😄" },
  ];

  const lengths = [
    { value: "short", label: "Flash (~300 words)", desc: "Quick read" },
    { value: "medium", label: "Short (~800 words)", desc: "5 min read" },
    { value: "long", label: "Long (~1500 words)", desc: "10 min read" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!prompt.trim()) { setError("Please enter a story prompt."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/short-story/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, genre, length }),
      });
      if (!res.ok) throw new Error(await res.text() || "Generation failed");
      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setPrompt(""); setResult(null);
    setStatus("idle"); setError("");
  };

  const handleDownload = () => {
    if (!result) return;
    const content = `${result.title}\n\n${result.story}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${result.title.replace(/\s+/g, "_")}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.title}\n\n${result.story}`);
  };

  return (
    <ToolLayout
      icon="✍️"
      title="Short Story Generator"
      subtitle="Describe an idea — Gemini crafts a complete, engaging short story"
      gradient="from-amber-500 via-orange-600 to-red-700"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Your Story Idea</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Story Prompt *</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A detective in a rainy city discovers that all recent crimes were committed by the same person — who died 10 years ago…"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">{prompt.length}/600 characters</p>
          </div>

          {/* Genre */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
            <div className="grid grid-cols-4 gap-2">
              {genres.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGenre(g.value)}
                  className={`flex items-center justify-center gap-1.5 p-3 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
                    genre === g.value
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-amber-200"
                  }`}
                >
                  <span>{g.emoji}</span> {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Story Length</label>
            <div className="grid grid-cols-3 gap-3">
              {lengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLength(l.value)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    length === l.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-100 bg-white hover:border-amber-200"
                  }`}
                >
                  <p className={`font-semibold text-sm ${length === l.value ? "text-amber-700" : "text-gray-700"}`}>{l.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>
          )}

          <button
            onClick={generate}
            disabled={status === "loading"}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
              status === "loading"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Vizzy is writing your story…
              </span>
            ) : "✍️ Generate Story"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">📝</div>
            <h3 className="text-lg font-bold text-amber-800 mb-2">Gemini is crafting your story…</h3>
            <p className="text-sm text-amber-600">Building characters, plot, and narrative arc. Usually takes 10–20 seconds.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">{result.title}</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700 uppercase tracking-wider">{result.genre}</span>
                    <span className="text-xs text-gray-400">{result.wordCount} words · {result.readTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all text-sm"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all text-sm"
                    title="Download as text"
                  >
                    📥
                  </button>
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className="px-8 py-6">
              <div className="prose prose-gray max-w-none">
                {result.story.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base">{para}</p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="px-8 pb-8 flex gap-4 flex-wrap">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
              >
                📥 Download Story
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-amber-300 hover:bg-amber-50 transition-all"
              >
                📋 Copy Text
              </button>
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                🔄 New Story
              </button>
            </div>
          </div>
        )}

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Gemini Powered", desc: "Advanced AI crafts coherent narratives with proper story structure and pacing" },
            { icon: "🎭", title: "8 Genres", desc: "From horror to comedy — every genre has its own tone, voice, and style" },
            { icon: "📥", title: "Export Ready", desc: "Download as plain text or copy to your clipboard for any use" },
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

export default ShortStoryTool;
