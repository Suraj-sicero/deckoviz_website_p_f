import React, { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-web-f.onrender.com";
const HF_AUDIOBOOK_URL = `${BACKEND_URL}/api/audiobook`;

interface PDFChunk {
  name: string;
  blob: Blob;
  start: number;
  end: number;
  status: "idle" | "uploading" | "processing" | "done" | "error";
  statusMsg: string;
  downloadId: string | null;
  error: string;
}

type Status = "idle" | "uploading" | "processing" | "done" | "error";

const AudiobookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [voice, setVoice] = useState("british-male");
  const [frames, setFrames] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [downloadId, setDownloadId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [chunks, setChunks] = useState<PDFChunk[]>([]);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const voiceOptions = [
    { value: "british-male", label: "British Male", emoji: "🇬🇧👨" },
    { value: "british-female", label: "British Female", emoji: "🇬🇧👩" },
    { value: "australian-male", label: "Australian Male", emoji: "🇦🇺👨" },
    { value: "australian-female", label: "Australian Female", emoji: "🇦🇺👩" },
    { value: "american-male", label: "American Male", emoji: "🇺🇸👨" },
    { value: "american-female", label: "American Female", emoji: "🇺🇸👩" },
  ];

  const generate = async () => {
    // Bypassed credit deduction for testing
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

          if (json.status === "done" || json.status === "completed") {
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

  useEffect(() => {
    if (!file) {
      setChunks([]);
      return;
    }

    const analyzeAndSplitPDF = async () => {
      setIsSplitting(true);
      setError("");
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const totalPages = pdfDoc.getPageCount();

        if (totalPages > 100) {
          const chunkList: PDFChunk[] = [];
          const chunkSize = 100;
          for (let i = 0; i < totalPages; i += chunkSize) {
            const start = i;
            const end = Math.min(i + chunkSize, totalPages);

            const chunkDoc = await PDFDocument.create();
            const pageIndices = Array.from({ length: end - start }, (_, index) => start + index);
            const copiedPages = await chunkDoc.copyPages(pdfDoc, pageIndices);
            copiedPages.forEach((page) => chunkDoc.addPage(page));

            const chunkBytes = await chunkDoc.save();
            const chunkBlob = new Blob([chunkBytes as any], { type: "application/pdf" });

            const extensionIndex = file.name.lastIndexOf('.');
            const baseName = extensionIndex !== -1 ? file.name.substring(0, extensionIndex) : file.name;
            const chunkName = `${baseName}_part${Math.floor(i / chunkSize) + 1}.pdf`;

            chunkList.push({
              name: chunkName,
              blob: chunkBlob,
              start: start + 1,
              end: end,
              status: "idle",
              statusMsg: "",
              downloadId: null,
              error: ""
            });
          }
          setChunks(chunkList);
        } else {
          setChunks([]);
        }
      } catch (err: any) {
        console.error("PDF parse error:", err);
        setError("Failed to load or parse PDF. It might be corrupted or secured.");
      } finally {
        setIsSplitting(false);
      }
    };

    analyzeAndSplitPDF();
  }, [file]);

  const updateChunk = (index: number, fields: Partial<PDFChunk>) => {
    setChunks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...fields };
      return copy;
    });
  };

  const generateChunk = async (index: number) => {
    const chunk = chunks[index];
    if (!chunk) return;

    // Bypassed credit deduction for testing

    updateChunk(index, { status: "uploading", statusMsg: "Uploading part...", error: "" });

    const formData = new FormData();
    formData.append("pdf", chunk.blob, chunk.name);
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

      updateChunk(index, { status: "processing", statusMsg: "Generating part...", downloadId: null });

      let pollCount = 0;
      const interval = setInterval(async () => {
        try {
          const poll = await fetch(`${HF_AUDIOBOOK_URL}/result/${jobId}`);
          if (!poll.ok) return;
          const json = await poll.json();

          if (json.status === "processing") {
            pollCount++;
            if (pollCount > 120) {
              throw new Error("Job timed out. Please try again.");
            }
            return;
          }

          clearInterval(interval);
          if (json.status === "done" || json.status === "completed") {
            updateChunk(index, {
              status: "done",
              statusMsg: "Ready!",
              downloadId: jobId
            });
          } else {
            throw new Error(json.message || "Generation failed");
          }
        } catch (e: any) {
          clearInterval(interval);
          updateChunk(index, {
            status: "error",
            error: e.message || "Something went wrong while polling."
          });
        }
      }, 5000);

    } catch (e: any) {
      updateChunk(index, {
        status: "error",
        error: e.message || "Failed to start generation."
      });
    }
  };

  const generateAllChunks = async () => {
    setIsGeneratingAll(true);
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].status === "done") continue;

      try {
        await new Promise<void>(async (resolve, reject) => {
          // Bypassed credit deduction for testing

          updateChunk(i, { status: "uploading", statusMsg: "Uploading part...", error: "" });

          const formData = new FormData();
          formData.append("pdf", chunks[i].blob, chunks[i].name);
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

            updateChunk(i, { status: "processing", statusMsg: "Generating part...", downloadId: null });

            const interval = setInterval(async () => {
              try {
                const poll = await fetch(`${HF_AUDIOBOOK_URL}/result/${jobId}`);
                if (!poll.ok) return;
                const json = await poll.json();

                if (json.status === "processing") return;

                clearInterval(interval);
                if (json.status === "done" || json.status === "completed") {
                  updateChunk(i, {
                    status: "done",
                    statusMsg: "Ready!",
                    downloadId: jobId
                  });
                  resolve();
                } else {
                  throw new Error(json.message || "Generation failed");
                }
              } catch (e: any) {
                clearInterval(interval);
                updateChunk(i, {
                  status: "error",
                  error: e.message || "Something went wrong while polling."
                });
                reject(e);
              }
            }, 5000);
          } catch (e: any) {
            updateChunk(i, {
              status: "error",
              error: e.message || "Failed to start generation."
            });
            reject(e);
          }
        });
      } catch (err) {
        console.error(`Sequential run failed for chunk ${i}:`, err);
        break;
      }
    }
    setIsGeneratingAll(false);
  };

  const handleDownloadChunk = (downloadId: string) => {
    const url = `${HF_AUDIOBOOK_URL}/download/${downloadId}`;
    const a = document.createElement("a");
    a.href = url; a.download = "visual_audiobook.zip";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
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
    setDownloadId(null); setError(""); setFrames(1); setVoice("british-male");
    setChunks([]);
    setIsGeneratingAll(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const isRunning = status === "uploading" || status === "processing";

  return (
    <ToolLayout
      icon="🎧"
      title="Audiobook Creator"
      subtitle="Turn any PDF into a beautifully narrated audiobook with AI voice"
      gradient="from-[#182A4A] to-[#2563EB]"
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
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              {file ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-semibold text-blue-700">{file.name}</p>
                  <p className="text-xs text-blue-500 mt-1">
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
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                  }`}
                >
                  <span className="text-2xl">{v.emoji}</span>
                  <span className={`font-medium text-sm ${voice === v.value ? "text-blue-700" : "text-gray-600"}`}>
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button (only for small PDFs) */}
          {chunks.length === 0 && (
            <button
              onClick={generate}
              disabled={isRunning || isSplitting}
              className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
                isRunning || isSplitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#182A4A] to-[#2563EB] shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:opacity-90 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSplitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing PDF...
                </span>
              ) : isRunning ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {statusMsg}
                </span>
              ) : "🎙️ Generate Audiobook"}
            </button>
          )}

          {/* Chunks List (for heavy PDFs) */}
          {chunks.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">📚 Heavy Book Detected ({chunks.length} parts)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">We split books larger than 100 pages into chunks for faster processing.</p>
                </div>
                <button
                  onClick={generateAllChunks}
                  disabled={isGeneratingAll || chunks.every(c => c.status === "done")}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-300 ${
                    isGeneratingAll || chunks.every(c => c.status === "done")
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#2563EB] hover:bg-[#1e4eb8] shadow-md hover:scale-[1.02]"
                  }`}
                >
                  {isGeneratingAll ? "🎙️ Generating all..." : "⚡ Generate All Parts"}
                </button>
              </div>

              <div className="space-y-3">
                {chunks.map((chunk, idx) => {
                  const isChunkRunning = chunk.status === "uploading" || chunk.status === "processing";
                  return (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center font-bold text-blue-700 text-sm">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-sm truncate max-w-[200px] sm:max-w-[300px]">
                            {chunk.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Pages {chunk.start} – {chunk.end}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-end flex-shrink-0">
                        {chunk.statusMsg && (
                          <span className="text-xs text-blue-600 animate-pulse font-medium">
                            {chunk.statusMsg}
                          </span>
                        )}
                        {chunk.error && (
                          <span className="text-xs text-red-500 font-medium">
                            ⚠️ {chunk.error}
                          </span>
                        )}

                        {chunk.status === "idle" && (
                          <button
                            onClick={() => generateChunk(idx)}
                            disabled={isGeneratingAll}
                            className={`px-4 py-2 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded-xl transition-all duration-200 shadow-sm ${
                              isGeneratingAll ? "opacity-50 cursor-not-allowed" : "hover:border-blue-300 hover:shadow"
                            }`}
                          >
                            🎙️ Generate
                          </button>
                        )}
                        {chunk.status === "error" && (
                          <button
                            onClick={() => generateChunk(idx)}
                            disabled={isGeneratingAll}
                            className={`px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl transition-all duration-200 ${
                              isGeneratingAll ? "opacity-50 cursor-not-allowed" : "hover:bg-red-100"
                            }`}
                          >
                            🔄 Retry
                          </button>
                        )}
                        {isChunkRunning && (
                          <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50/50 rounded-xl">
                            <svg className="w-3.5 h-3.5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                          </div>
                        )}
                        {chunk.status === "done" && chunk.downloadId && (
                          <button
                            onClick={() => handleDownloadChunk(chunk.downloadId!)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-md shadow-emerald-600/20"
                          >
                            📥 Download ZIP
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Processing State ────────────────────────────────────────── */}
        {status === "processing" && (
          <div className="bg-blue-50/50 border border-blue-200 rounded-3xl p-8 text-center shadow-inner">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-40 animate-ping"
                    style={{ animationDelay: `${i * 300}ms` }}
                  />
                ))}
                <div className="absolute inset-4 bg-blue-500 rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Vizzy is creating your audiobook…</h3>
            <p className="text-sm text-gray-600">This usually takes 1–3 minutes depending on PDF length.</p>
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
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl mx-auto mb-3">
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
