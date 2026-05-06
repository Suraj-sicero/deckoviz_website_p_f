import React, { useState } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "loading" | "done" | "error";

interface CardResult {
  message: string;
  subject: string;
  tone: string;
  imagePrompt?: string;
  imageUrl?: string;
}

const GreetingCardTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("birthday");
  const [tone, setTone] = useState("warm");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState<CardResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const occasions = [
    { value: "birthday", label: "Birthday", emoji: "🎂" },
    { value: "anniversary", label: "Anniversary", emoji: "💍" },
    { value: "graduation", label: "Graduation", emoji: "🎓" },
    { value: "appreciation", label: "Appreciation", emoji: "🙏" },
    { value: "get-well", label: "Get Well", emoji: "💊" },
    { value: "congratulations", label: "Congrats", emoji: "🎉" },
    { value: "new-year", label: "New Year", emoji: "🎆" },
    { value: "farewell", label: "Farewell", emoji: "👋" },
    { value: "love", label: "Love", emoji: "❤️" },
  ];

  const tones = [
    { value: "warm", label: "Warm & Heartfelt", emoji: "🌸" },
    { value: "funny", label: "Funny & Playful", emoji: "😄" },
    { value: "professional", label: "Professional", emoji: "💼" },
    { value: "poetic", label: "Poetic & Lyrical", emoji: "🌙" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!recipient.trim()) { setError("Please enter the recipient's name."); return; }
    setError(""); setStatus("loading"); setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/greeting-card/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, occasion, tone, extra }),
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
    setRecipient(""); setExtra(""); setResult(null);
    setStatus("idle"); setError("");
  };

  const handleDownload = () => {
    if (!result) return;
    const content = `Greeting Card for ${result.subject}\n\n${result.message}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `greeting_card_${result.subject.replace(/\s+/g, "_")}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      icon="💌"
      title="Greeting Card Creator"
      subtitle="Create a personalised, heartfelt greeting card message with AI art"
      gradient="from-pink-500 via-rose-600 to-red-700"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Card Details</h2>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient's Name *</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Emma, Dad, Team Horizon…"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Touch (optional)</label>
              <input
                type="text"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="e.g. She loves hiking, He turned 30…"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Occasion */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Occasion</label>
            <div className="grid grid-cols-3 gap-2">
              {occasions.map((o) => (
                <button
                  key={o.value}
                  onClick={() => setOccasion(o.value)}
                  className={`flex items-center gap-2 p-3 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
                    occasion === o.value
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-pink-200"
                  }`}
                >
                  <span>{o.emoji}</span> {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Card Tone</label>
            <div className="grid grid-cols-2 gap-3">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    tone === t.value
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-100 bg-white hover:border-pink-200"
                  }`}
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className={`font-medium text-sm ${tone === t.value ? "text-pink-700" : "text-gray-600"}`}>{t.label}</span>
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
                Creating your card…
              </span>
            ) : "💌 Create Greeting Card"}
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="bg-pink-50 border border-pink-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">💌</div>
            <h3 className="text-lg font-bold text-pink-800 mb-2">Crafting your card with love…</h3>
            <p className="text-sm text-pink-600">Gemini is writing a personalised message and generating the card visual.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-4">
            {/* Card visual */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[320px] flex flex-col items-center justify-center p-10 text-center"
              style={{
                background: result.imageUrl
                  ? `url(${result.imageUrl}) center/cover`
                  : "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 40%, #f9a8d4 100%)",
              }}
            >
              {result.imageUrl && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl" />
              )}
              <div className="relative z-10 max-w-lg">
                <p className="text-sm font-bold uppercase tracking-widest mb-4 text-white/80">
                  {occasions.find(o => o.value === occasion)?.emoji} {occasions.find(o => o.value === occasion)?.label}
                </p>
                <p className="text-xl md:text-2xl font-bold leading-relaxed text-white drop-shadow-lg">
                  {result.message}
                </p>
                <p className="text-sm text-white/70 mt-5 font-medium">— With love ♥</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-xl">✅</div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Card Ready for {result.subject}!</h2>
                  <p className="text-sm text-gray-500">Your personalised {result.tone} greeting card</p>
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-sm hover:scale-[1.02] transition-all shadow-lg"
                >
                  📥 Download Card
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(result.message)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-pink-300 hover:bg-pink-50 transition-all"
                >
                  📋 Copy Message
                </button>
                <button
                  onClick={reset}
                  className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  🔄 New Card
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "✨", title: "Hyper-Personalised", desc: "Every card is unique — tailored to the recipient, occasion, and your personal notes" },
            { icon: "🎨", title: "AI Art Background", desc: "Each card comes with a matching AI-generated visual that fits the mood" },
            { icon: "📤", title: "Share Instantly", desc: "Download or copy the message to send via any platform" },
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

export default GreetingCardTool;
