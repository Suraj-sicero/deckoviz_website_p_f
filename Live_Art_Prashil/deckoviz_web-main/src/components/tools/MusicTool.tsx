import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-web-f.onrender.com";

type Status = "idle" | "loading" | "done" | "error";

interface MusicResult {
  audioUrl: string;
  title: string;
  duration: string;
  prompt: string;
}

const MusicTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [description, setDescription] = useState("");
  const [mood, setMood] = useState("calm");
  const [genre, setGenre] = useState("ambient");
  const [duration, setDuration] = useState(30);
  const [result, setResult] = useState<MusicResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const moods = [
    { value: "calm", label: "Calm", emoji: "🌊" },
    { value: "energetic", label: "Energetic", emoji: "⚡" },
    { value: "mysterious", label: "Mysterious", emoji: "🌙" },
    { value: "happy", label: "Happy", emoji: "😊" },
    { value: "melancholic", label: "Melancholic", emoji: "🍂" },
    { value: "epic", label: "Epic", emoji: "🏔️" },
  ];

  const genres = [
    { value: "ambient", label: "Ambient" },
    { value: "lo-fi", label: "Lo-Fi" },
    { value: "classical", label: "Classical" },
    { value: "electronic", label: "Electronic" },
    { value: "jazz", label: "Jazz" },
    { value: "cinematic", label: "Cinematic" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!description.trim()) { setError("Please describe the music you want."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/music/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, mood, genre, duration }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setDescription(""); setResult(null);
    setStatus("idle"); setError("");
  };

  return (
    <ToolLayout
      icon="🎼"
      title="Music Creator"
      subtitle="Describe a mood or scene - Vizzy composes an original AI music track"
      gradient="from-cyan-500 via-teal-600 to-emerald-700"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Describe Your Track</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Music Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A peaceful morning in a Japanese garden, rain falling softly on stone lanterns, distant temple bells…"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Mood */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Mood</label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                    mood === m.value
                      ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-cyan-200"
                  }`}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGenre(g.value)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    genre === g.value
                      ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-cyan-200"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duration: <span className="text-cyan-600">{duration}s</span>
            </label>
            <input
              type="range" min={15} max={120} step={15}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>15s</span><span>60s</span><span>120s</span>
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
                : "bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Vizzy is composing…
              </span>
            ) : "🎵 Generate Music"}
          </button>
        </div>

        {/* Processing */}
        {status === "loading" && (
          <div className="bg-cyan-50 border border-cyan-200 rounded-3xl p-10 text-center">
            <div className="flex justify-center mb-4 gap-1">
              {[0,1,2,3,4].map(i => (
                <div
                  key={i}
                  className="w-1.5 bg-cyan-500 rounded-full animate-bounce"
                  style={{ height: `${20 + i * 8}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <h3 className="text-lg font-bold text-cyan-800 mb-2">Composing your track…</h3>
            <p className="text-sm text-cyan-600">Gemini is enhancing your prompt, then the music AI generates the audio.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-xl">🎵</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{result.title || "Your Generated Track"}</h2>
                <p className="text-sm text-gray-500">{result.duration} · AI Composed</p>
              </div>
            </div>

            {result.audioUrl ? (
              <audio controls className="w-full rounded-xl mb-6" src={result.audioUrl}>
                Your browser does not support audio playback.
              </audio>
            ) : (
              <div className="w-full h-20 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border border-cyan-200 flex items-center justify-center mb-6">
                <p className="text-sm text-cyan-600 font-medium">🎧 Audio ready - loading player…</p>
              </div>
            )}

            {result.prompt && (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Enhanced Prompt</p>
                <p className="text-sm text-gray-700">{result.prompt}</p>
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              {result.audioUrl && (
                <a
                  href={result.audioUrl}
                  download="vizzy-music.mp3"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
                >
                  📥 Download MP3
                </a>
              )}
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                🔄 New Track
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Gemini Enhanced", desc: "Your description is enriched by Gemini before the music API receives it" },
            { icon: "🎹", title: "Multiple Genres", desc: "From ambient lo-fi to cinematic orchestral - full creative range" },
            { icon: "🔊", title: "Instant Playback", desc: "Listen directly in the browser, then download as MP3" },
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

export default MusicTool;
