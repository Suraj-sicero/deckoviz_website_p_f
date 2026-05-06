import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface StoryPage {
  page: number;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
}

interface StorybookStudioResult {
  title: string;
  pages: StoryPage[];
}

const StorybookStudioTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [idea, setIdea] = useState("");
  const [genre, setGenre] = useState("fantasy");
  const [result, setResult] = useState<StorybookStudioResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [editingPage, setEditingPage] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [regeneratingImage, setRegeneratingImage] = useState<number | null>(null);

  const genres = [
    { value: "fantasy", label: "Fantasy", emoji: "🧙" },
    { value: "adventure", label: "Adventure", emoji: "⚔️" },
    { value: "mystery", label: "Mystery", emoji: "🔍" },
    { value: "sci-fi", label: "Sci-Fi", emoji: "🚀" },
    { value: "romance", label: "Romance", emoji: "💕" },
    { value: "fairy-tale", label: "Fairy Tale", emoji: "🧚" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!idea.trim()) { setError("Please describe your story idea."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/storybook-studio/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, genre }),
      });
      if (!res.ok) throw new Error(await res.text() || "Generation failed");
      const data = await res.json();
      setResult(data);
      setCurrentPage(0);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const startEdit = (pageIndex: number) => {
    setEditingPage(pageIndex);
    setEditedText(result?.pages[pageIndex]?.text || "");
  };

  const saveEdit = () => {
    if (!result || editingPage === null) return;
    const updated = { ...result };
    updated.pages[editingPage].text = editedText;
    setResult(updated);
    setEditingPage(null);
  };

  const regenerateImage = async (pageIndex: number) => {
    if (!result) return;
    setRegeneratingImage(pageIndex);

    try {
      const res = await fetch(`${BACKEND_URL}/api/storybook-studio/regenerate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagePrompt: result.pages[pageIndex].imagePrompt,
          genre,
        }),
      });
      if (!res.ok) throw new Error("Regeneration failed");
      const data = await res.json();
      const updated = { ...result };
      updated.pages[pageIndex].imageUrl = data.imageUrl;
      setResult(updated);
    } catch (e: any) {
      console.error("Image regen error:", e.message);
    } finally {
      setRegeneratingImage(null);
    }
  };

  const updateTitle = (newTitle: string) => {
    if (!result) return;
    setResult({ ...result, title: newTitle });
  };

  const reset = () => {
    setIdea(""); setResult(null);
    setStatus("idle"); setError(""); setCurrentPage(0); setEditingPage(null);
  };

  return (
    <ToolLayout
      icon="🎨"
      title="Storybook Studio"
      subtitle="Create, edit, and refine your storybook — modify text and regenerate images"
      gradient="from-teal-600 via-emerald-700 to-green-800"
    >
      <div className="space-y-8">

        {/* Input */}
        {status !== "done" && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. Create Your Storybook</h2>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Story Idea *</label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. A young wizard discovers an ancient map that leads to a hidden dragon sanctuary…"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="mb-7">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
              <div className="grid grid-cols-3 gap-3">
                {genres.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGenre(g.value)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                      genre === g.value
                        ? "border-teal-500 bg-teal-50 text-teal-700"
                        : "border-gray-100 bg-white text-gray-600 hover:border-teal-200"
                    }`}
                  >
                    <span>{g.emoji}</span> {g.label}
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
                  : "bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 hover:shadow-xl hover:scale-[1.02] shadow-lg"
              }`}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating your storybook…
                </span>
              ) : "🎨 Generate Storybook"}
            </button>
          </div>
        )}

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-teal-50 border border-teal-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎨</div>
            <h3 className="text-lg font-bold text-teal-800 mb-2">Building your storybook…</h3>
            <p className="text-sm text-teal-600">Gemini is writing pages and generating illustrations.</p>
          </div>
        )}

        {/* Studio Editor */}
        {status === "done" && result && (
          <div className="space-y-5">
            {/* Title editor */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-6 shadow-xl flex items-center gap-4">
              <span className="text-3xl">📖</span>
              <input
                type="text"
                value={result.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="flex-1 text-2xl font-black text-gray-900 border-b-2 border-transparent hover:border-teal-300 focus:border-teal-500 focus:outline-none bg-transparent transition-all"
              />
              <button onClick={reset} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-teal-300 hover:bg-teal-50 transition-all shrink-0">
                🔄 New Story
              </button>
            </div>

            {/* Page tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {result.pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPage(i); setEditingPage(null); }}
                  className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === i
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300 hover:bg-teal-50"
                  }`}
                >
                  Page {i + 1}
                </button>
              ))}
            </div>

            {/* Page editor */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl overflow-hidden shadow-2xl">
              {/* Image section */}
              <div className="relative w-full h-72 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                {result.pages[currentPage]?.imageUrl ? (
                  <img src={result.pages[currentPage].imageUrl} alt={`Page ${currentPage + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center opacity-60 p-6">
                    <div className="text-5xl mb-2">🖼️</div>
                    <p className="text-xs text-gray-500">{result.pages[currentPage]?.imagePrompt?.substring(0, 100)}…</p>
                  </div>
                )}
                {/* Regenerate image button */}
                <button
                  onClick={() => regenerateImage(currentPage)}
                  disabled={regeneratingImage === currentPage}
                  className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur border border-white/60 text-sm font-semibold text-gray-700 hover:bg-white transition-all shadow-lg disabled:opacity-60"
                >
                  {regeneratingImage === currentPage ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Regenerating…
                    </>
                  ) : "🎨 Regenerate Image"}
                </button>
              </div>

              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-3">
                  Page {currentPage + 1} of {result.pages.length}
                </p>

                {/* Text editor or display */}
                {editingPage === currentPage ? (
                  <div>
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-teal-400 bg-teal-50/50 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-base leading-relaxed"
                    />
                    <div className="flex gap-3 mt-3">
                      <button onClick={saveEdit} className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-500 transition-all shadow-md">
                        ✅ Save Changes
                      </button>
                      <button onClick={() => setEditingPage(null)} className="px-5 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 text-base leading-relaxed mb-5">{result.pages[currentPage]?.text}</p>
                    <button
                      onClick={() => startEdit(currentPage)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-sm font-semibold hover:bg-teal-100 transition-all"
                    >
                      ✏️ Edit Text
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-8 pb-8">
                <button
                  onClick={() => { setCurrentPage(p => Math.max(0, p - 1)); setEditingPage(null); }}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-40"
                >
                  ← Previous
                </button>
                <div className="flex gap-1.5">
                  {result.pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentPage(i); setEditingPage(null); }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentPage ? "bg-teal-500 scale-125" : "bg-gray-300 hover:bg-teal-300"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => { setCurrentPage(p => Math.min(result.pages.length - 1, p + 1)); setEditingPage(null); }}
                  disabled={currentPage === result.pages.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-500 transition-all disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Image prompt editor */}
            <div className="bg-white/60 border border-gray-100 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-gray-700 mb-2">🎨 Image Prompt for Page {currentPage + 1}</h4>
              <p className="text-xs text-gray-500 italic">{result.pages[currentPage]?.imagePrompt}</p>
            </div>
          </div>
        )}

        {/* Info */}
        {status !== "done" && (
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✏️", title: "Edit Any Page", desc: "Click on any page text to modify it — your story, your words" },
              { icon: "🎨", title: "Regenerate Images", desc: "Not happy with an illustration? Hit regenerate for a fresh one" },
              { icon: "📖", title: "Live Preview", desc: "See your changes reflected instantly in the storybook reader" },
            ].map((c) => (
              <div key={c.title} className="bg-white/60 border border-gray-100 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{c.title}</h4>
                <p className="text-sm text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default StorybookStudioTool;
