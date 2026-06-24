import React, { useState, useCallback } from "react";
import ToolLayout from "./ToolLayout";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "uploading" | "loading" | "done" | "error";

interface VisualPage {
  page: number;
  caption: string;
  story: string;
  imageUrl?: string;
}

interface VisualBookResult {
  title: string;
  introduction: string;
  pages: VisualPage[];
}

const VisualBookTool: React.FC = () => {
  const { deductCredits } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [style, setStyle] = useState("memoir");
  const [result, setResult] = useState<VisualBookResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const styles = [
    { value: "memoir", label: "Personal Memoir", emoji: "📖" },
    { value: "adventure", label: "Adventure Story", emoji: "⚔️" },
    { value: "poetry", label: "Poetic Journey", emoji: "🌸" },
    { value: "documentary", label: "Documentary", emoji: "📷" },
    { value: "fairytale", label: "Fairy Tale", emoji: "🧚" },
  ];

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter(f => f.type.startsWith("image/")).slice(0, 10);
    setImages(prev => [...prev, ...newFiles].slice(0, 10));

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviews(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  const generate = async () => {
    const hasCredits = await deductCredits(5); // Default to 5, can be adjusted
    if (!hasCredits) return;
    if (images.length < 2) { setError("Please upload at least 2 images."); return; }
    setError(""); setStatus("uploading"); setResult(null);

    try {
      const formData = new FormData();
      images.forEach(img => formData.append("images", img));
      formData.append("style", style);

      setStatus("loading");
      const res = await fetch(`${BACKEND_URL}/api/visual-book/generate`, {
        method: "POST",
        body: formData,
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

  const reset = () => {
    setImages([]); setPreviews([]); setResult(null);
    setStatus("idle"); setError("");
  };

  return (
    <ToolLayout
      icon="📸"
      title="Visual Book Creator"
      subtitle="Upload your photos - Gemini creates captions and weaves them into a visual story"
      gradient="from-violet-600 via-violet-700 to-fuchsia-800"
    >
      <div className="space-y-8">

        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6">1. Upload Your Photos</h2>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 mb-5 ${
              isDragging
                ? "border-violet-500 bg-violet-50 scale-[1.01]"
                : images.length > 0
                ? "border-violet-300 bg-violet-50/30"
                : "border-gray-200 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/30"
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => handleFileChange(e.target.files)}
            />
            {images.length === 0 ? (
              <div>
                <div className="text-5xl mb-3">📸</div>
                <p className="font-bold text-gray-600 mb-1">Drop photos here or click to browse</p>
                <p className="text-xs text-gray-400">Up to 10 images · JPG, PNG, WEBP</p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">✅</div>
                <p className="font-bold text-violet-700">{images.length} photo{images.length > 1 ? "s" : ""} ready</p>
                <p className="text-xs text-violet-500">Click to add more (max 10)</p>
              </div>
            )}
          </div>

          {/* Image previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mb-5">
              {previews.map((src, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                  <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm"
                  >
                    Remove
                  </button>
                  <div className="absolute bottom-1 right-1 text-white text-xs font-bold bg-black/50 px-1.5 py-0.5 rounded">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Style picker */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Story Style</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {styles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 text-xs font-medium transition-all duration-200 ${
                    style === s.value
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-gray-100 bg-white text-gray-600 hover:border-violet-200"
                  }`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">⚠️ {error}</div>
          )}

          <button
            onClick={generate}
            disabled={status === "loading" || status === "uploading"}
            className={`w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
              (status === "loading" || status === "uploading")
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-700 hover:from-violet-500 hover:to-fuchsia-600 hover:shadow-xl hover:scale-[1.02] shadow-lg"
            }`}
          >
            {status === "uploading" ? "Uploading photos…" :
             status === "loading" ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating your visual book…
              </span>
            ) : "📸 Create Visual Book"}
          </button>
        </div>

        {/* Loading */}
        {(status === "loading" || status === "uploading") && (
          <div className="bg-violet-50 border border-violet-200 rounded-3xl p-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">📸</div>
            <h3 className="text-lg font-bold text-violet-800 mb-2">Gemini is analyzing your photos…</h3>
            <p className="text-sm text-violet-600">Creating captions, story, and assembling your visual book.</p>
          </div>
        )}

        {/* Output */}
        {status === "done" && result && (
          <div className="space-y-6">
            {/* Book title */}
            <div
              className="rounded-3xl p-8 text-center overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c026d3 100%)" }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_white_0%,_transparent_70%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-widest text-violet-200 mb-2">📸 Your Visual Book</p>
                <h2 className="text-3xl font-black text-white mb-3">{result.title}</h2>
                <p className="text-sm text-violet-300 italic leading-relaxed max-w-xl mx-auto">{result.introduction}</p>
              </div>
            </div>

            {/* Page viewer */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl overflow-hidden shadow-2xl">
              {/* Photo */}
              <div className="w-full h-80 bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                {result.pages[currentPage]?.imageUrl ? (
                  <img
                    src={result.pages[currentPage].imageUrl}
                    alt={`Page ${currentPage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : previews[currentPage] ? (
                  <img
                    src={previews[currentPage]}
                    alt={`Page ${currentPage + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl opacity-50">🖼️</div>
                )}
              </div>

              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-3">
                  Photo {currentPage + 1} of {result.pages.length}
                </p>
                <p className="text-lg font-bold text-gray-900 mb-3 italic">"{result.pages[currentPage]?.caption}"</p>
                <p className="text-gray-600 leading-relaxed">{result.pages[currentPage]?.story}</p>
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between px-8 pb-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-all disabled:opacity-40"
                >
                  ← Previous
                </button>
                <div className="flex gap-1.5">
                  {result.pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentPage ? "bg-violet-500 scale-125" : "bg-gray-300 hover:bg-violet-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(result.pages.length - 1, p + 1))}
                  disabled={currentPage === result.pages.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-all disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>

            <button onClick={reset} className="w-full py-3 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-violet-300 hover:bg-violet-50 transition-all">
              🔄 Create New Visual Book
            </button>
          </div>
        )}

        {/* Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🖼️", title: "Photo Analysis", desc: "Gemini reads the content and emotion of each photo to write matching captions" },
            { icon: "📖", title: "Narrative Story", desc: "Your photos are connected into a flowing narrative with introduction and chapters" },
            { icon: "🎨", title: "5 Story Styles", desc: "From personal memoir to fairy tale - pick the tone that fits your photos" },
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

export default VisualBookTool;
