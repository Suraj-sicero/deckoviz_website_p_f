import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface SongResult {
  title: string;
  lyrics: string;
  genre: string;
  mood: string;
  audioUrl?: string;
  structure: string;
}

const SongTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [theme, setTheme] = useState("");
  const [mood, setMood] = useState("uplifting");
  const [genre, setGenre] = useState("pop");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState<SongResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const moods = [
    { value: "uplifting", label: "Uplifting", emoji: "☀️" },
    { value: "romantic", label: "Romantic", emoji: "💕" },
    { value: "melancholic", label: "Melancholic", emoji: "🌧️" },
    { value: "energetic", label: "Energetic", emoji: "⚡" },
    { value: "nostalgic", label: "Nostalgic", emoji: "🍂" },
    { value: "inspirational", label: "Inspirational", emoji: "🌟" },
  ];

  const genres = [
    { value: "pop", label: "Pop" },
    { value: "ballad", label: "Ballad" },
    { value: "indie", label: "Indie" },
    { value: "country", label: "Country" },
    { value: "r&b", label: "R&B" },
    { value: "hip-hop", label: "Hip-Hop" },
    { value: "folk", label: "Folk" },
    { value: "rock", label: "Rock" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!theme.trim()) { setError("Please describe the theme or story of your song."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/song/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, mood, genre, recipient }),
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
    setTheme(""); setRecipient(""); setResult(null);
    setStatus("idle"); setError("");
  };

  const handleDownload = () => {
    if (!result) return;
    const content = `${result.title}\n\nGenre: ${result.genre} | Mood: ${result.mood}\n\n${result.lyrics}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${result.title.replace(/\s+/g, "_")}_lyrics.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      icon="🎤"
      title="Personalized Song Creator"
      subtitle="Generate custom lyrics and an original song just for you or someone special"
      gradient="from-rose-500 via-pink-600 to-fuchsia-700"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Describe Your Song</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Song Theme or Story *</label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. A song about finding your courage after a tough year and realizing you are stronger than you think. Include themes of resilience and hope…"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dedicated to (optional)</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. My daughter Maya, a friend going through hard times…"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Mood */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Song Mood</label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMood(m.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                    mood === m.value
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-rose-200"
                  }`}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGenre(g.value)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                    genre === g.value
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-gray-200 bg-white text-gray-500 hover:border-rose-200"
                  }`}
                >
                  {g.label}
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
                : "bg-gradient-to-r from-rose-500 to-fuchsia-600 hover:from-rose-400 hover:to-fuchsia-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Writing your song…
              </span>
            ) : "🎤 Create My Song"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-10 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-1.5 bg-rose-500 rounded-full animate-bounce"
                  style={{ height: `${16 + i * 6}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <h3 className="text-lg font-bold text-rose-800 mb-2">Composing your song…</h3>
            <p className="text-sm text-rose-600">Gemini is writing lyrics and sending to the music generation API.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-4">
            {/* Song header */}
            <div
              className="rounded-3xl p-8 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f43f5e 0%, #a855f7 100%)" }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">🎵 Your Personalized Song</p>
                <h2 className="text-3xl font-black text-white mb-2">{result.title}</h2>
                <div className="flex justify-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">{result.genre}</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">{result.mood}</span>
                  {result.structure && <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold">{result.structure}</span>}
                </div>
              </div>
            </div>

            {/* Audio player */}
            {result.audioUrl ? (
              <div className="bg-white/80 border border-rose-200 rounded-3xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-gray-700 mb-3">🎧 Audio Track</h3>
                <audio controls className="w-full rounded-xl" src={result.audioUrl}>
                  Your browser does not support audio playback.
                </audio>
              </div>
            ) : (
              <div className="bg-white/80 border border-dashed border-rose-200 rounded-3xl p-6 text-center">
                <p className="text-sm text-gray-500">🎵 Audio generation requires a music API key. Lyrics are ready below.</p>
              </div>
            )}

            {/* Lyrics */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">📜 Lyrics</h3>
              <div className="space-y-4">
                {result.lyrics.split("\n\n").map((section, i) => {
                  const [firstLine, ...rest] = section.split("\n");
                  const isHeader = firstLine.startsWith("[") || firstLine.startsWith("(");
                  return (
                    <div key={i} className="border-l-2 border-rose-200 pl-4">
                      {isHeader && (
                        <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2">{firstLine}</p>
                      )}
                      {(isHeader ? rest : [firstLine, ...rest]).map((line, j) => (
                        <p key={j} className="text-gray-700 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
              >
                📥 Download Lyrics
              </button>
              {result.audioUrl && (
                <a
                  href={result.audioUrl}
                  download="vizzy-song.mp3"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-rose-200 text-rose-700 font-semibold text-sm hover:bg-rose-50 transition-all"
                >
                  🎵 Download Audio
                </a>
              )}
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                🔄 New Song
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "✍️", title: "AI Lyrics", desc: "Gemini writes complete songs with verses, chorus, bridge, and your unique story" },
            { icon: "🎵", title: "Music Generation", desc: "Lyrics sent to music AI for optional audio track generation" },
            { icon: "❤️", title: "Deeply Personal", desc: "Add a recipient or dedication to make it truly one-of-a-kind" },
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

export default SongTool;
