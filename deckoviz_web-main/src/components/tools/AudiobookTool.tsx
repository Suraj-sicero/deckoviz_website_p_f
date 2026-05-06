import React, { useState, useRef } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";
const HF_AUDIOBOOK_URL = "https://sudharsan051006-visual-audiobook-api.hf.space";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

const AudiobookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("calm-warm");
  const [frames, setFrames] = useState(5);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [downloadId, setDownloadId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const voiceOptions = [
    { value: "calm-warm", label: "Calm & Warm", emoji: "🌙" },
    { value: "clear-professional", label: "Clear & Professional", emoji: "💼" },
    { value: "expressive-narrative", label: "Expressive & Narrative", emoji: "🎭" },
    { value: "neutral-academic", label: "Neutral & Academic", emoji: "📚" },
  ];

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (!file) { setError("Please upload a PDF first."); return; }
    setError(""); setStatus("uploading"); setStatusMsg("Uploading PDF...");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("frames", frames.toString());
    formData.append("style", voice);

    try {
      const res = await fetch(`${HF_AUDIOBOOK_URL}/generate`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Upload failed");
      }

      const data = await res.json();
      const jobId = data.job_id as string;

      setStatus("processing");
      setStatusMsg("Generating your audiobook… this may take a minute.");

      intervalRef.current = setInterval(async () => {
        try {
          const poll = await fetch(`${HF_AUDIOBOOK_URL}/result/${jobId}`);
          if (!poll.ok) return;
          const json = await poll.json();
          // The HF API returns status in the format: { status: "processing" | "done" | "error" }
          // If the endpoint is different (e.g., /status vs /result), HF uses /result/:jobId
          if (json.status === "processing") return;
          clearInterval(intervalRef.current!);

          if (json.status === "done") {
            setDownloadId(jobId);
            setStatus("done");
            setStatusMsg("Your audiobook is ready!");
          } else {
            throw new Error(json.message || "Generation failed");
          }
        } catch (e: any) {
          clearInterval(intervalRef.current!);
          setStatus("error");
          setError(e.message || "Something went wrong while polling.");
        }
      }, 5000);
    } catch (e: any) {
      setStatus("error");
      setError(e.message || "Failed to start generation.");
    }
  };

  const handleDownload = () => {
    if (!downloadId) return;
    const url = `${HF_AUDIOBOOK_URL}/download/${downloadId}`;
    const a = document.createElement("a");
    a.href = url; a.download = "visual_audiobook.zip";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null); setStatus("idle"); setStatusMsg("");
    setDownloadId(null); setError(""); setFrames(5); setVoice("calm-warm");
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const isRunning = status === "uploading" || status === "processing";

  return (
    <ToolLayout
      icon="🎧"
      title="Audiobook Creator"
      subtitle="Turn any PDF into a beautifully narrated audiobook with AI voice"
      gradient="from-violet-600 via-violet-700 to-indigo-800"
    >
      <div className="space-y-8">

        {/* ── Input Card ─────────────────────────────────────────────── */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Configure Your Audiobook</h2>

          {/* File upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload PDF *
            </label>
            <label
              htmlFor="pdf-upload"
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                file
                  ? "border-violet-400 bg-violet-50"
                  : "border-gray-200 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/50"
              }`}
            >
              {file ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold text-violet-700">{file.name}</p>
                  <p className="text-xs text-violet-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="font-semibold text-gray-600">Drop your PDF here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                </div>
              )}
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Voice picker */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Choose a Voice Style</label>
            <div className="grid grid-cols-2 gap-3">
              {voiceOptions.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVoice(v.value)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    voice === v.value
                      ? "border-violet-500 bg-violet-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-violet-200 hover:bg-violet-50/30"
                  }`}
                >
                  <span className="text-2xl">{v.emoji}</span>
                  <span className={`font-medium text-sm ${voice === v.value ? "text-violet-700" : "text-gray-600"}`}>
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Frames slider */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Visual Frames: <span className="text-violet-600">{frames}</span>
            </label>
            <input
              type="range"
              min={1} max={20} step={1}
              value={frames}
              onChange={(e) => setFrames(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
            <p className="text-xs text-gray-400 mt-1">
              Higher = more visual snapshots through your PDF (slower processing)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generate}
            disabled={isRunning}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
              isRunning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            }`}
          >
            {isRunning ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {statusMsg}
              </span>
            ) : "🎙️ Generate Audiobook"}
          </button>
        </div>

        {/* ── Processing State ────────────────────────────────────────── */}
        {status === "processing" && (
          <div className="bg-violet-50 border border-violet-200 rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-violet-400 opacity-40 animate-ping"
                    style={{ animationDelay: `${i * 300}ms` }}
                  />
                ))}
                <div className="absolute inset-4 bg-violet-500 rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-violet-800 mb-1">Vizzy is creating your audiobook…</h3>
            <p className="text-sm text-violet-600">This usually takes 1–3 minutes depending on PDF length.</p>
          </div>
        )}

        {/* ── Output ─────────────────────────────────────────────────── */}
        {status === "done" && (
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">✅</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Audiobook is Ready!</h2>
                <p className="text-sm text-gray-500">Download the ZIP to get your audio + visuals</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                📥 Download Audiobook ZIP
              </button>
              <button
                onClick={reset}
                className="px-6 py-3.5 rounded-2xl font-semibold text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-sm"
              >
                🔄 Create Another
              </button>
            </div>
          </div>
        )}

        {/* ── How it works (always visible) ──────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "1", icon: "📄", title: "Upload PDF", desc: "Books, essays, papers, or any text-heavy document" },
            { step: "2", icon: "🤖", title: "AI Narrates", desc: "Our AI engine reads and narrates with chosen voice style" },
            { step: "3", icon: "📥", title: "Download", desc: "Get your audiobook + visual slides as a ZIP" },
          ].map((step) => (
            <div key={step.step} className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 text-center">
              <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl mx-auto mb-3">
                {step.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Step {step.step}: {step.title}</h4>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default AudiobookTool;
