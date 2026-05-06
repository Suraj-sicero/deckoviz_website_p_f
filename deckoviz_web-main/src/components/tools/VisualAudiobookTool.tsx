import React, { useState, useRef } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5000"}`);
const HF_AUDIOBOOK_URL = "https://sudharsan051006-visual-audiobook-api.hf.space";

type Status = "idle" | "uploading" | "processing" | "done" | "error";

const VisualAudiobookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("calm-warm");
  const [frames, setFrames] = useState(8);
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
    setError(""); setStatus("uploading"); setStatusMsg("Uploading PDF…");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("frames", frames.toString());
    formData.append("style", voice);

    try {
      const res = await fetch(`${HF_AUDIOBOOK_URL}/generate`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text() || "Upload failed");

      const data = await res.json();
      const jobId = data.job_id as string;

      setStatus("processing");
      setStatusMsg("Generating visual audiobook… this may take a few minutes.");

      intervalRef.current = setInterval(async () => {
        try {
          const poll = await fetch(`${HF_AUDIOBOOK_URL}/result/${jobId}`);
          if (!poll.ok) return;
          const json = await poll.json();
          // HF Space API returns { status: "processing" | "done" | "error" } on the /result endpoint
          if (json.status === "processing") return;
          clearInterval(intervalRef.current!);

          if (json.status === "done") {
            setDownloadId(jobId);
            setStatus("done");
            setStatusMsg("Your visual audiobook is ready!");
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
    setDownloadId(null); setError(""); setFrames(8); setVoice("calm-warm");
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const isRunning = status === "uploading" || status === "processing";

  return (
    <ToolLayout
      icon="🎬"
      title="Visual Audiobook"
      subtitle="Transform PDFs into scene-by-scene visual audiobooks with narration and AI art"
      gradient="from-fuchsia-600 via-violet-700 to-violet-800"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Configure Your Visual Audiobook</h2>

          {/* File upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload PDF *</label>
            <label
              htmlFor="visual-pdf-upload"
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                file
                  ? "border-fuchsia-400 bg-fuchsia-50"
                  : "border-gray-200 bg-gray-50 hover:border-fuchsia-300 hover:bg-fuchsia-50/50"
              }`}
            >
              {file ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold text-fuchsia-700">{file.name}</p>
                  <p className="text-xs text-fuchsia-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="font-semibold text-gray-600">Drop your PDF here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse (max 20MB)</p>
                </div>
              )}
              <input
                id="visual-pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Voice picker */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Narration Voice Style</label>
            <div className="grid grid-cols-2 gap-3">
              {voiceOptions.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVoice(v.value)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                    voice === v.value
                      ? "border-fuchsia-500 bg-fuchsia-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-fuchsia-200 hover:bg-fuchsia-50/30"
                  }`}
                >
                  <span className="text-2xl">{v.emoji}</span>
                  <span className={`font-medium text-sm ${voice === v.value ? "text-fuchsia-700" : "text-gray-600"}`}>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual frames slider */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Visual Scenes: <span className="text-fuchsia-600">{frames}</span>
            </label>
            <input
              type="range" min={3} max={20} step={1}
              value={frames}
              onChange={(e) => setFrames(Number(e.target.value))}
              className="w-full accent-fuchsia-600"
            />
            <p className="text-xs text-gray-400 mt-1">Each scene gets an AI-generated illustration synchronized with narration</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>
          )}

          <button
            onClick={generate}
            disabled={isRunning}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
              isRunning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-fuchsia-600 via-violet-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 hover:shadow-xl hover:scale-[1.02] shadow-lg"
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
            ) : "🎬 Generate Visual Audiobook"}
          </button>
        </div>

        {/* Processing */}
        {status === "processing" && (
          <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-fuchsia-400 opacity-40 animate-ping"
                    style={{ animationDelay: `${i * 300}ms` }}
                  />
                ))}
                <div className="absolute inset-4 bg-fuchsia-500 rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-fuchsia-800 mb-1">Creating your visual audiobook…</h3>
            <p className="text-sm text-fuchsia-600">Splitting into scenes, narrating with AI voice, and generating illustrations. Takes 2–5 minutes.</p>
          </div>
        )}

        {/* Done */}
        {status === "done" && (
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">✅</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Visual Audiobook is Ready!</h2>
                <p className="text-sm text-gray-500">ZIP contains: narrated audio + scene illustrations + HTML slideshow</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                📥 Download Visual Audiobook ZIP
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

        {/* How it works */}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: "1", icon: "📄", title: "Upload PDF", desc: "Any text-heavy document" },
            { step: "2", icon: "🧠", title: "Scene Split", desc: "Gemini breaks into scenes" },
            { step: "3", icon: "🎨", title: "AI Visuals", desc: "Illustration per scene" },
            { step: "4", icon: "🎙️", title: "Narration", desc: "ElevenLabs voice audio" },
          ].map((s) => (
            <div key={s.step} className="bg-white/60 border border-gray-100 rounded-2xl p-5 text-center">
              <div className="w-8 h-8 bg-fuchsia-100 rounded-full flex items-center justify-center text-fuchsia-700 font-black text-sm mx-auto mb-2">{s.step}</div>
              <div className="text-2xl mb-2">{s.icon}</div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h4>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default VisualAudiobookTool;
