import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

type Status = "idle" | "loading" | "done" | "error";

interface JournalResult {
  imageUrl: string;
  mood: string;
  moodScore: number;
  colors: string[];
  caption: string;
  prompt: string;
}

const moodPalettes: Record<string, { bg: string; text: string; border: string }> = {
  happy: { bg: "from-yellow-100 to-orange-100", text: "text-orange-700", border: "border-orange-200" },
  sad: { bg: "from-blue-100 to-indigo-100", text: "text-indigo-700", border: "border-indigo-200" },
  calm: { bg: "from-teal-100 to-cyan-100", text: "text-teal-700", border: "border-teal-200" },
  anxious: { bg: "from-red-100 to-rose-100", text: "text-rose-700", border: "border-rose-200" },
  inspired: { bg: "from-violet-100 to-indigo-100", text: "text-violet-700", border: "border-violet-200" },
  nostalgic: { bg: "from-amber-100 to-yellow-100", text: "text-amber-700", border: "border-amber-200" },
  default: { bg: "from-gray-100 to-slate-100", text: "text-gray-700", border: "border-gray-200" },
};

const VisualJournalTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [entry, setEntry] = useState("");
  const [style, setStyle] = useState("watercolor");
  const [result, setResult] = useState<JournalResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const artStyles = [
    { value: "watercolor", label: "Watercolor", emoji: "💧" },
    { value: "oil-painting", label: "Oil Painting", emoji: "🎨" },
    { value: "digital-art", label: "Digital Art", emoji: "💻" },
    { value: "sketch", label: "Sketch", emoji: "✏️" },
    { value: "abstract", label: "Abstract", emoji: "🌀" },
    { value: "dreamy", label: "Dreamy", emoji: "✨" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!entry.trim()) { setError("Please write your journal entry first."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/visual-journal/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry, style }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data: JournalResult = await res.json();
      setResult(data);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setEntry(""); setResult(null); setStatus("idle"); setError("");
  };

  const moodStyle = result
    ? (moodPalettes[result.mood?.toLowerCase()] ?? moodPalettes.default)
    : moodPalettes.default;

  return (
    <ToolLayout
      icon="🌸"
      title="Visual Journal"
      subtitle="Write your thoughts - Vizzy reads your emotion and creates an art card"
      gradient="from-pink-500 via-rose-600 to-fuchsia-700"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Write Your Entry</h2>
          <p className="text-sm text-gray-500 mb-6">Be as honest or poetic as you like. Vizzy will understand the feeling.</p>

          <div className="mb-5">
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Today I felt like the whole world was moving too fast. I sat near the window and watched the rain fall down the glass, and for a moment everything felt still and safe…"
              rows={6}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all font-medium"
            />
            <p className="text-xs text-gray-400 mt-1">{entry.length} characters - the more you write, the richer the art</p>
          </div>

          {/* Art Style */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Art Style</label>
            <div className="grid grid-cols-3 gap-3">
              {artStyles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                    style === s.value
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-pink-200"
                  }`}
                >
                  <span>{s.emoji}</span> {s.label}
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
                : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Reading your emotion…
              </span>
            ) : "🌸 Generate Visual Card"}
          </button>
        </div>

        {/* Processing */}
        {status === "loading" && (
          <div className="bg-pink-50 border border-pink-200 rounded-3xl p-10 text-center">
            <div className="text-5xl mb-4 animate-pulse">🌸</div>
            <h3 className="text-lg font-bold text-pink-800 mb-2">Gemini is reading your emotion…</h3>
            <p className="text-sm text-pink-600">Analysing mood → crafting visual prompt → generating art card</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your Visual Card ✨</h2>
              <button onClick={reset} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-pink-300 hover:bg-pink-50 transition-all">
                🔄 New Entry
              </button>
            </div>

            {/* Art Card */}
            <div className={`bg-gradient-to-br ${moodStyle.bg} border ${moodStyle.border} rounded-3xl overflow-hidden shadow-2xl`}>
              {/* Image */}
              <div className="w-full aspect-video bg-white/50 flex items-center justify-center relative overflow-hidden">
                {result.imageUrl ? (
                  <img src={result.imageUrl} alt="Generated visual" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8 opacity-70">
                    <div className="text-6xl mb-3">🎨</div>
                    <p className="font-semibold text-gray-700">Visual Art Card</p>
                    <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">{result.prompt}</p>
                  </div>
                )}

                {/* Mood badge overlay */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur bg-white/70 border ${moodStyle.border}`}>
                  <span className={`text-sm font-bold capitalize ${moodStyle.text}`}>
                    {result.mood}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                {result.caption && (
                  <p className={`text-base font-medium italic leading-relaxed mb-4 ${moodStyle.text}`}>
                    "{result.caption}"
                  </p>
                )}

                {/* Color palette */}
                {result.colors?.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Palette</span>
                    <div className="flex gap-1.5">
                      {result.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Mood score */}
                {result.moodScore !== undefined && (
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Emotional Intensity</span>
                      <span className={`text-xs font-bold ${moodStyle.text}`}>{result.moodScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-400 to-rose-600 transition-all duration-1000"
                        style={{ width: `${result.moodScore}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  {result.imageUrl && (
                    <a
                      href={result.imageUrl}
                      download="vizzy-journal-card.png"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
                    >
                      📥 Save Card
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Emotion Analysis", desc: "Gemini analyses tone, feeling and emotional depth in your writing" },
            { icon: "🎨", title: "Personalised Art", desc: "Each card's palette, style and scene reflects your unique emotional state" },
            { icon: "💾", title: "Save & Collect", desc: "Build a private art journal - one card for every entry you write" },
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

export default VisualJournalTool;
