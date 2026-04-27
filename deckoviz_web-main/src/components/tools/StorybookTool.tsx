import React, { useState } from "react";
import ToolLayout from "./ToolLayout";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

type Status = "idle" | "loading" | "done" | "error";

interface StoryPage {
  page: number;
  text: string;
  imageUrl?: string;
  imagePrompt?: string;
}

const StorybookTool: React.FC = () => {
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState("fantasy");
  const [ageGroup, setAgeGroup] = useState("children");
  const [pages, setPages] = useState<StoryPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const genres = [
    { value: "fantasy", label: "Fantasy", emoji: "🧙‍♂️" },
    { value: "adventure", label: "Adventure", emoji: "⚔️" },
    { value: "mystery", label: "Mystery", emoji: "🔍" },
    { value: "sci-fi", label: "Sci-Fi", emoji: "🚀" },
    { value: "romance", label: "Romance", emoji: "💕" },
    { value: "horror", label: "Horror", emoji: "👻" },
  ];

  const ageGroups = [
    { value: "children", label: "Children (5–10)" },
    { value: "teen", label: "Teen (11–17)" },
    { value: "adult", label: "Adult (18+)" },
  ];

  const generate = async () => {
    if (!idea.trim()) { setError("Please describe your story idea."); return; }
    setError(""); setStatus("loading"); setPages([]);

    try {
      const res = await fetch(`${BACKEND_URL}/api/storybook/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, genre, ageGroup }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setPages(data.pages || []);
      setCurrentPage(0);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setIdea(""); setPages([]); setStatus("idle");
    setError(""); setCurrentPage(0);
  };

  return (
    <ToolLayout
      icon="📖"
      title="Storybook Creator"
      subtitle="Describe your idea — Gemini writes an illustrated story just for you"
      gradient="from-purple-600 via-indigo-700 to-blue-800"
    >
      <div className="space-y-8">

        {/* Input Card */}
        {status !== "done" && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. Describe Your Story</h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Story Idea *</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. A brave little fox discovers a magical library hidden inside an ancient oak tree, where every book comes to life…"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">{idea.length}/500 characters</p>
            </div>

            {/* Genre */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
              <div className="grid grid-cols-3 gap-3">
                {genres.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGenre(g.value)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                      genre === g.value
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-100 bg-white text-gray-600 hover:border-purple-200"
                    }`}
                  >
                    <span>{g.emoji}</span> {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Age group */}
            <div className="mb-7">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age Group</label>
              <div className="flex gap-3 flex-wrap">
                {ageGroups.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAgeGroup(a.value)}
                    className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      ageGroup === a.value
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 bg-white text-gray-500 hover:border-purple-200"
                    }`}
                  >
                    {a.label}
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
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
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
              ) : "✨ Generate Storybook"}
            </button>
          </div>
        )}

        {/* Processing state */}
        {status === "loading" && (
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">📖</div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">Gemini is writing your story…</h3>
            <p className="text-sm text-purple-600">Crafting characters, scenes, and illustrations. Takes ~30 seconds.</p>
          </div>
        )}

        {/* Output — Storybook reader */}
        {status === "done" && pages.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your Storybook ✨</h2>
              <button onClick={reset} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-purple-300 hover:bg-purple-50 transition-all">
                🔄 New Story
              </button>
            </div>

            {/* Page viewer */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl overflow-hidden shadow-2xl">
              {/* Image placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 flex items-center justify-center">
                {pages[currentPage]?.imageUrl ? (
                  <img src={pages[currentPage].imageUrl} alt={`Page ${currentPage + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center opacity-60">
                    <div className="text-5xl mb-2">🖼️</div>
                    <p className="text-sm text-gray-500">Visual for Page {currentPage + 1}</p>
                    {pages[currentPage]?.imagePrompt && (
                      <p className="text-xs text-gray-400 mt-1 px-6">{pages[currentPage].imagePrompt}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-3">
                  Page {currentPage + 1} of {pages.length}
                </p>
                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {pages[currentPage]?.text}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-8 pb-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                <div className="flex gap-1.5">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        i === currentPage ? "bg-purple-500 scale-125" : "bg-gray-300 hover:bg-purple-300"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
                  disabled={currentPage === pages.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "💭", title: "Ideas Welcome", desc: "Any genre, any length — Gemini adapts your concept into structured pages" },
            { icon: "🎨", title: "Rich Visuals", desc: "Each page gets an AI-generated illustration prompt for immersive storytelling" },
            { icon: "📚", title: "Read & Share", desc: "Flip through your pages in the built-in reader, then save or share" },
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

export default StorybookTool;
