import React, { useState } from "react";
import ToolLayout from "./ToolLayout";

import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface InspirationResult {
  quote: { text: string; author: string; imageUrl?: string };
  poem: { title: string; text: string; imageUrl?: string };
  book: { title: string; author: string; genre: string; reason: string; imageUrl?: string };
  movie: { title: string; year: string; genre: string; reason: string; imageUrl?: string };
  date: string;
}

const DailyInspirationTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [theme, setTheme] = useState("general");
  const [result, setResult] = useState<InspirationResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"quote" | "poem" | "book" | "movie">("quote");

  const themes = [
    { value: "general", label: "General", emoji: "✨" },
    { value: "motivation", label: "Motivation", emoji: "💪" },
    { value: "gratitude", label: "Gratitude", emoji: "🙏" },
    { value: "creativity", label: "Creativity", emoji: "🎨" },
    { value: "love", label: "Love", emoji: "❤️" },
    { value: "wisdom", label: "Wisdom", emoji: "🦉" },
    { value: "adventure", label: "Adventure", emoji: "🌍" },
    { value: "mindfulness", label: "Mindfulness", emoji: "🧘" },
  ];

  const generate = async () => {
    setError(""); setStatus("loading"); setResult(null);

    const hasCredits = await deductCredits(1);
    if (!hasCredits) {
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/daily/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (!res.ok) throw new Error(await res.text() || "Generation failed");
      const data = await res.json();
      setResult(data);
      setActiveTab("quote");
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const handleShare = (type: string, content: string) => {
    navigator.clipboard.writeText(content);
  };

  const tabs = [
    { key: "quote" as const, label: "Quote", icon: "💬" },
    { key: "poem" as const, label: "Poem", icon: "🌸" },
    { key: "book" as const, label: "Book", icon: "📚" },
    { key: "movie" as const, label: "Movie", icon: "🎬" },
  ];

  return (
    <ToolLayout
      icon="🌅"
      title="Daily Inspiration Engine"
      subtitle="Get your daily dose of quotes, poems, book, and movie recommendations"
      gradient="from-orange-500 via-amber-500 to-yellow-500"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Today's Inspiration</h2>
          <p className="text-sm text-gray-500 mb-6">Choose a theme and Vizzy generates your personalized daily inspiration package.</p>

          {/* Theme picker */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Today's Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
                    theme === t.value
                      ? "border-amber-500 bg-amber-50 text-amber-800"
                      : "border-gray-100 bg-white text-gray-600 hover:border-amber-200"
                  }`}
                >
                  <span className="text-xl">{t.emoji}</span>
                  {t.label}
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
                : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Gathering today's inspiration…
              </span>
            ) : "🌅 Generate Daily Inspiration"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-spin">🌅</div>
            <h3 className="text-lg font-bold text-amber-800 mb-2">Curating your inspiration…</h3>
            <p className="text-sm text-amber-600">Gemini is selecting quotes, writing a poem, and finding the perfect book and movie.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-5">
            {/* Header */}
            <div
              className="rounded-3xl p-8 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)" }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_white_0%,_transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">Daily Inspiration</p>
                <h2 className="text-2xl font-black text-white mb-1">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full text-white text-sm font-bold">
                  {themes.find(t => t.value === theme)?.emoji} {themes.find(t => t.value === theme)?.label} Theme
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 rounded-2xl p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.key
                      ? "bg-white text-amber-700 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quote Tab */}
            {activeTab === "quote" && result.quote && (
              <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-3xl p-8 shadow-xl">
                {result.quote.imageUrl && (
                  <img src={result.quote.imageUrl} alt="Quote visual" className="w-full h-48 object-cover rounded-2xl mb-6" />
                )}
                {!result.quote.imageUrl && (
                  <div className="w-full h-48 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl mb-6 flex items-center justify-center">
                    <span className="text-7xl">💬</span>
                  </div>
                )}
                <blockquote className="text-2xl font-bold text-gray-900 leading-relaxed mb-4 italic">
                  "{result.quote.text}"
                </blockquote>
                <p className="text-sm font-semibold text-amber-600">- {result.quote.author}</p>
                <button
                  onClick={() => handleShare("quote", `"${result.quote.text}" - ${result.quote.author}`)}
                  className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-all"
                >
                  📋 Copy Quote
                </button>
              </div>
            )}

            {/* Poem Tab */}
            {activeTab === "poem" && result.poem && (
              <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-3xl p-8 shadow-xl">
                {result.poem.imageUrl && (
                  <img src={result.poem.imageUrl} alt="Poem visual" className="w-full h-48 object-cover rounded-2xl mb-6" />
                )}
                {!result.poem.imageUrl && (
                  <div className="w-full h-32 bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl mb-6 flex items-center justify-center">
                    <span className="text-5xl">🌸</span>
                  </div>
                )}
                <h3 className="text-xl font-black text-gray-900 mb-5">{result.poem.title}</h3>
                <div className="space-y-3">
                  {result.poem.text.split("\n\n").map((stanza, i) => (
                    <div key={i} className="text-gray-700 leading-relaxed">
                      {stanza.split("\n").map((line, j) => (
                        <p key={j} className="text-base">{line}</p>
                      ))}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleShare("poem", `${result.poem.title}\n\n${result.poem.text}`)}
                  className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 border border-pink-200 text-pink-700 text-sm font-semibold hover:bg-pink-100 transition-all"
                >
                  📋 Copy Poem
                </button>
              </div>
            )}

            {/* Book Tab */}
            {activeTab === "book" && result.book && (
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-3xl p-8 shadow-xl">
                {result.book.imageUrl ? (
                  <img src={result.book.imageUrl} alt="Book cover" className="w-32 h-48 object-cover rounded-2xl mb-6 shadow-lg" />
                ) : (
                  <div className="w-32 h-48 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-5xl">📚</span>
                  </div>
                )}
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Today's Book Pick</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{result.book.title}</h3>
                <p className="text-sm text-gray-500 mb-1">by {result.book.author}</p>
                <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-bold text-emerald-700 mb-4">{result.book.genre}</span>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                  <p className="text-sm font-bold text-emerald-800 mb-1">Why Vizzy Recommends It:</p>
                  <p className="text-sm text-emerald-700">{result.book.reason}</p>
                </div>
              </div>
            )}

            {/* Movie Tab */}
            {activeTab === "movie" && result.movie && (
              <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-3xl p-8 shadow-xl">
                {result.movie.imageUrl ? (
                  <img src={result.movie.imageUrl} alt="Movie poster" className="w-32 h-48 object-cover rounded-2xl mb-6 shadow-lg" />
                ) : (
                  <div className="w-32 h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                    <span className="text-5xl">🎬</span>
                  </div>
                )}
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Today's Movie Pick</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">{result.movie.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{result.movie.year}</p>
                <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-700 mb-4">{result.movie.genre}</span>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                  <p className="text-sm font-bold text-blue-800 mb-1">Why Vizzy Recommends It:</p>
                  <p className="text-sm text-blue-700">{result.movie.reason}</p>
                </div>
              </div>
            )}

            <button onClick={generate} className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-amber-300 hover:bg-amber-50 transition-all">
              🔄 Regenerate Today's Inspiration
            </button>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: "💬", title: "Daily Quote", desc: "An inspiring quote matched to your theme" },
            { icon: "🌸", title: "Poem of the Day", desc: "An original poem crafted by Gemini" },
            { icon: "📚", title: "Book Pick", desc: "A book recommendation for your mood" },
            { icon: "🎬", title: "Movie Pick", desc: "A film recommendation to watch tonight" },
          ].map((c) => (
            <div key={c.title} className="bg-white/60 border border-gray-100 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h4>
              <p className="text-xs text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default DailyInspirationTool;
