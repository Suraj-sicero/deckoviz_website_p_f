import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface Chapter {
  chapter: number;
  title: string;
  summary: string;
  content: string;
  visualPrompt: string;
  keyPoints: string[];
}

interface LearningBookResult {
  bookTitle: string;
  introduction: string;
  chapters: Chapter[];
  topic: string;
}

const LearningBookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const [chapters, setChapters] = useState(5);
  const [result, setResult] = useState<LearningBookResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [activeChapter, setActiveChapter] = useState(-1); // -1 = intro

  const levels = [
    { value: "beginner", label: "Beginner", desc: "No prior knowledge", emoji: "🌱" },
    { value: "intermediate", label: "Intermediate", desc: "Some background", emoji: "🌿" },
    { value: "advanced", label: "Advanced", desc: "Experienced learner", emoji: "🌳" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!topic.trim()) { setError("Please enter a topic to learn about."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/learning-book/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level, chapters }),
      });
      if (!res.ok) throw new Error(await res.text() || "Generation failed");
      const data = await res.json();
      setResult(data);
      setActiveChapter(-1);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setTopic(""); setResult(null);
    setStatus("idle"); setError(""); setActiveChapter(-1);
  };

  const handleDownload = () => {
    if (!result) return;
    let content = `${result.bookTitle}\n\n${result.introduction}\n\n`;
    result.chapters.forEach(ch => {
      content += `CHAPTER ${ch.chapter}: ${ch.title}\n\n${ch.content}\n\nKey Points:\n${ch.keyPoints.map(k => `• ${k}`).join("\n")}\n\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${result.bookTitle.replace(/\s+/g, "_")}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const currentContent = activeChapter === -1
    ? { title: "Introduction", body: result?.introduction || "", keyPoints: [] as string[], visualPrompt: "" }
    : {
        title: result?.chapters[activeChapter]?.title || "",
        body: result?.chapters[activeChapter]?.content || "",
        keyPoints: result?.chapters[activeChapter]?.keyPoints || [],
        visualPrompt: result?.chapters[activeChapter]?.visualPrompt || "",
      };

  return (
    <ToolLayout
      icon="📘"
      title="Visual Learning Book"
      subtitle="Convert any topic into a structured, illustrated learning guide"
      gradient="from-blue-600 via-indigo-700 to-violet-800"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. What Do You Want to Learn?</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Topic *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Machine Learning, Ancient Rome, Quantum Physics, Photography, Guitar Basics…"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-base"
            />
          </div>

          {/* Level */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Knowledge Level</label>
            <div className="grid grid-cols-3 gap-3">
              {levels.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    level === l.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className="text-xl mb-1">{l.emoji}</div>
                  <p className={`font-bold text-sm ${level === l.value ? "text-blue-700" : "text-gray-700"}`}>{l.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{l.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter count */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Chapters: <span className="text-blue-600 font-bold">{chapters}</span>
            </label>
            <input
              type="range" min={3} max={10} step={1}
              value={chapters}
              onChange={(e) => setChapters(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>3 (Quick Guide)</span><span>7 (Comprehensive)</span><span>10 (Full Course)</span>
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
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Building your learning book…
              </span>
            ) : "📘 Generate Learning Book"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-bounce">📘</div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">Gemini is building your learning book…</h3>
            <p className="text-sm text-blue-600">Structuring {chapters} chapters with explanations, key points, and visual prompts.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-6">
            {/* Book header */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 50%, #6d28d9 100%)" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
              <div className="relative flex items-center gap-6">
                <div className="text-6xl shrink-0">📘</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-1">{result.topic} · {level}</p>
                  <h2 className="text-2xl font-black text-white mb-1">{result.bookTitle}</h2>
                  <p className="text-blue-300 text-sm">{result.chapters.length} chapters · Visual Learning Edition</p>
                </div>
              </div>
            </div>

            {/* Navigation sidebar + content */}
            <div className="grid md:grid-cols-4 gap-6">
              {/* TOC sidebar */}
              <div className="md:col-span-1 space-y-2">
                <button
                  onClick={() => setActiveChapter(-1)}
                  className={`w-full text-left p-3 rounded-xl text-sm font-semibold transition-all ${
                    activeChapter === -1
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  📖 Introduction
                </button>
                {result.chapters.map((ch, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChapter(i)}
                    className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all ${
                      activeChapter === i
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span className="text-xs font-bold mr-1 opacity-60">Ch.{ch.chapter}</span> {ch.title}
                  </button>
                ))}
              </div>

              {/* Chapter content */}
              <div className="md:col-span-3 bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-black text-gray-900 mb-5">{currentContent.title}</h3>

                {currentContent.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
                ))}

                {currentContent.keyPoints.length > 0 && (
                  <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h4 className="text-sm font-black text-blue-800 uppercase tracking-wider mb-3">🔑 Key Points</h4>
                    <ul className="space-y-2">
                      {currentContent.keyPoints.map((kp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                          <span className="text-blue-400 mt-0.5">•</span> {kp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentContent.visualPrompt && (
                  <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">🎨 Visual Aid Concept</h4>
                    <p className="text-sm text-indigo-800 italic">{currentContent.visualPrompt}</p>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setActiveChapter(a => Math.max(-1, a - 1))}
                    disabled={activeChapter === -1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-gray-400">{activeChapter + 2} / {result.chapters.length + 1}</span>
                  <button
                    onClick={() => setActiveChapter(a => Math.min(result.chapters.length - 1, a + 1))}
                    disabled={activeChapter === result.chapters.length - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
              >
                📥 Download Book
              </button>
              <button
                onClick={reset}
                className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                🔄 New Topic
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Gemini Intelligence", desc: "Tailored content at exactly your knowledge level with clear explanations" },
            { icon: "🎨", title: "Visual Prompts", desc: "Each chapter includes a diagram or infographic concept for visual learners" },
            { icon: "🔑", title: "Key Takeaways", desc: "Every chapter ends with bullet-point summaries for fast review" },
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

export default LearningBookTool;
