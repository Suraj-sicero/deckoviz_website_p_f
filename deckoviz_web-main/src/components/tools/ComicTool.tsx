import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface ComicPanel {
  panel: number;
  scene: string;
  dialogue: string;
  imagePrompt: string;
  imageUrl?: string;
}

interface ComicResult {
  title: string;
  panels: ComicPanel[];
}

const ComicTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [idea, setIdea] = useState("");
  const [style, setStyle] = useState("superhero");
  const [panels, setPanels] = useState(6);
  const [result, setResult] = useState<ComicResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const styles = [
    { value: "superhero", label: "Superhero", emoji: "🦸" },
    { value: "manga", label: "Manga", emoji: "⛩️" },
    { value: "cartoon", label: "Cartoon", emoji: "🎠" },
    { value: "noir", label: "Noir", emoji: "🕵️" },
    { value: "fantasy", label: "Fantasy", emoji: "🧙" },
    { value: "sci-fi", label: "Sci-Fi", emoji: "🤖" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!idea.trim()) { setError("Please describe your comic story idea."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/comic/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, style, panels }),
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
    setIdea(""); setResult(null);
    setStatus("idle"); setError("");
  };

  return (
    <ToolLayout
      icon="💥"
      title="Comic Book Creator"
      subtitle="Turn your story idea into a panel-by-panel comic with AI illustrations"
      gradient="from-yellow-500 via-orange-500 to-red-600"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Your Comic Idea</h2>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Story Idea *</label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. A teenage girl discovers she can see 5 minutes into the future. She uses this power to prevent small disasters in her school, until she sees something that changes everything…"
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Style */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Comic Style</label>
            <div className="grid grid-cols-3 gap-3">
              {styles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 text-sm font-medium transition-all duration-200 ${
                    style === s.value
                      ? "border-yellow-500 bg-yellow-50 text-yellow-800"
                      : "border-gray-100 bg-white text-gray-600 hover:border-yellow-200"
                  }`}
                >
                  <span>{s.emoji}</span> {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Panel count */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Panels: <span className="text-yellow-600 font-bold">{panels}</span>
            </label>
            <input
              type="range" min={4} max={12} step={2}
              value={panels}
              onChange={(e) => setPanels(Number(e.target.value))}
              className="w-full accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>4 panels</span><span>8 panels</span><span>12 panels</span>
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
                : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Drawing your comic…
              </span>
            ) : "💥 Generate Comic Book"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4" style={{ animation: "bounce 0.8s infinite alternate" }}>💥</div>
            <h3 className="text-lg font-bold text-yellow-800 mb-2">Gemini is writing your comic panels…</h3>
            <p className="text-sm text-yellow-600">Creating scenes, dialogue, and generating panel illustrations. Takes ~30–60 seconds.</p>
          </div>
        )}

        {/* Output — Comic Layout */}
        {status === "done" && result && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900">{result.title}</h2>
                <p className="text-sm text-gray-500">{result.panels.length} panels · {style} style</p>
              </div>
              <button onClick={reset} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-yellow-300 hover:bg-yellow-50 transition-all">
                🔄 New Comic
              </button>
            </div>

            {/* Comic grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.panels.map((panel) => (
                <div
                  key={panel.panel}
                  className="relative rounded-2xl overflow-hidden border-4 border-gray-900 shadow-[6px_6px_0px_#1a1a1a] bg-white"
                >
                  {/* Panel image */}
                  <div className="w-full h-52 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center relative">
                    {panel.imageUrl ? (
                      <img src={panel.imageUrl} alt={`Panel ${panel.panel}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center opacity-70 p-4">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-xs text-gray-500 leading-tight">{panel.imagePrompt?.substring(0, 80)}…</p>
                      </div>
                    )}
                    {/* Panel number */}
                    <div className="absolute top-2 left-2 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-black">
                      {panel.panel}
                    </div>
                  </div>

                  {/* Scene + dialogue */}
                  <div className="p-4 bg-white">
                    <p className="text-xs text-gray-500 mb-2 italic">{panel.scene}</p>
                    {panel.dialogue && (
                      <div className="bg-gray-900 text-white text-sm font-bold px-3 py-2 rounded-xl relative">
                        <div className="absolute -top-2 left-4 w-3 h-3 bg-gray-900 rotate-45" />
                        "{panel.dialogue}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🎨", title: "Panel Illustrations", desc: "Each panel gets a unique AI-generated image based on the scene description" },
            { icon: "💬", title: "Dynamic Dialogue", desc: "Gemini writes authentic character voices and sharp comic dialogue" },
            { icon: "🎭", title: "6 Styles", desc: "Superhero, Manga, Noir, Fantasy, Sci-Fi, and Cartoon visual modes" },
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

export default ComicTool;
