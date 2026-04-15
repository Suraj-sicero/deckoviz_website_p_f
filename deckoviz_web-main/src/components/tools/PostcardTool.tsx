import React, { useState, useCallback, useEffect } from "react";
import ToolLayout from "./ToolLayout";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

type Status = "idle" | "uploading" | "loading" | "done" | "error";

interface RoomAnalysis {
  style: string;
  mood: string;
  wallColor: string;
  roomType: string;
  palette: string[];
}

interface PostcardResult {
  success: boolean;
  imageUrl: string;
  afterImageUrl: string;
  artworkUrl?: string;
  roomAnalysis?: RoomAnalysis;
}

/* Progress steps shown during generation */
const PIPELINE_STEPS = [
  { label: "Analyzing room with AI Vision…", icon: "🔍", duration: 6000 },
  { label: "Generating gallery-quality artwork…", icon: "🎨", duration: 8000 },
  { label: "Applying premium AI transformation…", icon: "✨", duration: 18000 },
  { label: "Post-processing for cinematic quality…", icon: "🎬", duration: 4000 },
  { label: "Composing final premium postcard…", icon: "🖼️", duration: 3000 },
];

const PostcardTool: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [result, setResult] = useState<PostcardResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setImage(file);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  /* Animate through pipeline steps while backend works */
  useEffect(() => {
    if (status !== "loading") {
      setPipelineStep(0);
      return;
    }

    let step = 0;
    setPipelineStep(0);

    const advance = () => {
      if (step < PIPELINE_STEPS.length - 1) {
        step += 1;
        setPipelineStep(step);
        timer = setTimeout(advance, PIPELINE_STEPS[step].duration);
      }
    };

    let timer = setTimeout(advance, PIPELINE_STEPS[0].duration);
    return () => clearTimeout(timer);
  }, [status]);

  const generate = async () => {
    if (!image) { setError("Please upload an image of your space."); return; }
    if (!businessName.trim()) { setError("Please enter your business name."); return; }

    setError("");
    setStatus("loading");
    setResult(null);
    setShowBeforeAfter(false);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("businessName", businessName);

      const res = await fetch(`${BACKEND_URL}/api/postcard/generate`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Generation failed");
      }

      const data = await res.json();
      setResult(data);
      setStatus("done");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setBusinessName("");
    setResult(null);
    setStatus("idle");
    setError("");
    setShowBeforeAfter(false);
    setSliderPosition(50);
  };

  const handleDownload = () => {
    if (!result?.imageUrl) return;
    const a = document.createElement("a");
    a.href = result.imageUrl;
    a.download = `deckoviz_postcard_${businessName.replace(/\s+/g, "_")}.jpg`;
    a.click();
  };

  /* Before / After slider interaction */
  const handleSliderMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDraggingSlider) return;
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setSliderPosition(pos);
    },
    [isDraggingSlider]
  );

  const moodEmojis: Record<string, string> = {
    sophisticated: "💎", cozy: "🏡", energetic: "⚡", serene: "🧘",
    dramatic: "🎭", playful: "🎪", professional: "💼",
  };

  return (
    <ToolLayout
      icon="🎴"
      title="Before & After Postcard"
      subtitle="AI-powered premium interior transformation with Deckoviz DASP"
      gradient="from-emerald-600 via-teal-700 to-cyan-800"
    >
      <div className="space-y-8">
        {/* Input Card */}
        {status !== "done" && (
          <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. Design Your Premium Postcard</h2>

            {/* Business Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Blue Lagoon Restaurant"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 mb-5 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
                  : image
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/30"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(e.target.files)}
              />
              {!preview ? (
                <div>
                  <div className="text-5xl mb-3">📸</div>
                  <p className="font-bold text-gray-600 mb-1">Drop a photo of your space here</p>
                  <p className="text-xs text-gray-400">JPG, PNG or WEBP · Best for walls & interiors</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={preview} alt="Preview" className="w-48 h-32 object-cover rounded-xl shadow-md mb-3" />
                  <p className="font-bold text-emerald-700">Photo uploaded successfully!</p>
                  <p className="text-xs text-emerald-500">Click or drag to replace</p>
                </div>
              )}
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
                  : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02] shadow-lg"
              }`}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating your AI Postcard...
                </span>
              ) : "✨ Generate Premium Postcard"}
            </button>
          </div>
        )}

        {/* ─── Premium Loading Pipeline ─── */}
        {status === "loading" && (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 shadow-2xl">
            {/* Animated orb */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-30 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-50 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {PIPELINE_STEPS[pipelineStep]?.icon || "✨"}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white text-center mb-2">
              {PIPELINE_STEPS[pipelineStep]?.label || "Finishing up…"}
            </h3>
            <p className="text-sm text-gray-400 text-center mb-8">
              Our 5-step premium AI pipeline is crafting a luxury transformation.
            </p>

            {/* Step progress bar */}
            <div className="space-y-3 max-w-md mx-auto">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-500 ${
                    i < pipelineStep
                      ? "bg-emerald-500 text-white"
                      : i === pipelineStep
                      ? "bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400 animate-pulse"
                      : "bg-gray-700 text-gray-500"
                  }`}>
                    {i < pipelineStep ? "✓" : step.icon}
                  </div>
                  <span className={`text-sm transition-all duration-500 ${
                    i < pipelineStep ? "text-emerald-400 line-through opacity-60" :
                    i === pipelineStep ? "text-white font-semibold" : "text-gray-500"
                  }`}>
                    {step.label.replace("…", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Premium Result ─── */}
        {status === "done" && result && (
          <div className="space-y-6">

            {/* Room Analysis Insights */}
            {result.roomAnalysis && (
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-xl border border-gray-700">
                <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                  <span>🔍</span> AI Room Analysis
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">🏠</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Room</p>
                    <p className="text-white font-semibold capitalize text-sm">{result.roomAnalysis.roomType}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Style</p>
                    <p className="text-white font-semibold capitalize text-sm">{result.roomAnalysis.style}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">{moodEmojis[result.roomAnalysis.mood] || "✨"}</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Mood</p>
                    <p className="text-white font-semibold capitalize text-sm">{result.roomAnalysis.mood}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">🖌️</div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Wall</p>
                    <p className="text-white font-semibold capitalize text-sm">{result.roomAnalysis.wallColor}</p>
                  </div>
                </div>
                {/* Color palette chips */}
                {result.roomAnalysis.palette && result.roomAnalysis.palette.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 mr-1">Detected palette:</span>
                    {result.roomAnalysis.palette.map((color, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 border border-white/10">
                        {color}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Main Postcard Image */}
            <div className="bg-white p-4 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="aspect-[16/9] w-full bg-gray-100 rounded-3xl overflow-hidden relative group">
                <img
                  src={result.imageUrl}
                  alt="Transformed Postcard"
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => window.open(result.imageUrl, '_blank')}
                />

                {/* Download Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={handleDownload}
                    className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold shadow-2xl hover:scale-110 transition-transform"
                  >
                    📥 Download High-Res
                  </button>
                  <button
                    onClick={() => window.open(result.imageUrl, '_blank')}
                    className="bg-white/90 text-gray-700 px-6 py-3 rounded-2xl font-bold shadow-2xl hover:scale-110 transition-transform"
                  >
                    🔍 Full Size
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Before/After Slider */}
            {preview && result.afterImageUrl && (
              <div>
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="w-full py-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition-all mb-4"
                >
                  {showBeforeAfter ? "▲ Hide" : "▼ Show"} Interactive Before/After Slider
                </button>

                {showBeforeAfter && (
                  <div
                    className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 select-none cursor-col-resize"
                    onMouseDown={() => setIsDraggingSlider(true)}
                    onMouseUp={() => setIsDraggingSlider(false)}
                    onMouseLeave={() => setIsDraggingSlider(false)}
                    onMouseMove={handleSliderMove}
                    onTouchStart={() => setIsDraggingSlider(true)}
                    onTouchEnd={() => setIsDraggingSlider(false)}
                    onTouchMove={handleSliderMove}
                  >
                    {/* After (full width behind) */}
                    <img
                      src={result.afterImageUrl}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Before (clipped) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={preview}
                        alt="Before"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ width: `${100 / (sliderPosition / 100)}%`, maxWidth: "none" }}
                      />
                    </div>
                    {/* Slider handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                      style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-gray-600 font-bold text-xs">
                        ◀▶
                      </div>
                    </div>
                    {/* Labels */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs font-bold uppercase tracking-wider">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-amber-600/70 text-white text-xs font-bold uppercase tracking-wider">
                      After
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Generated Artwork Preview */}
            {result.artworkUrl && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <span>🖼️</span> AI-Generated Artwork (Context-Aware)
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={result.artworkUrl}
                    alt="AI Generated Artwork"
                    className="w-48 h-36 object-cover rounded-2xl shadow-xl border-4 border-white"
                  />
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">
                      This artwork was <strong>AI-generated specifically for your space</strong> based on the
                      detected <span className="text-emerald-600 font-semibold">{result.roomAnalysis?.style || "interior"}</span> style
                      and <span className="text-emerald-600 font-semibold">{result.roomAnalysis?.mood || ""}</span> mood.
                    </p>
                    <p className="text-xs text-gray-400">
                      The color palette was matched to complement your existing décor for a cohesive, gallery-level result.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-lg hover:shadow-emerald-200 transition-all hover:scale-[1.02]"
              >
                📥 Download Postcard
              </button>
              <button
                onClick={reset}
                className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
              >
                🔄 Create Another
              </button>
            </div>

            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 text-emerald-700 text-sm text-center">
              <p className="font-semibold mb-1">🤖 Powered by 5-Step Premium AI Pipeline</p>
              <p className="italic opacity-80">
                Vision analysis → Context-aware artwork → Precision transformation → Cinematic post-processing → Premium composition
              </p>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🔍", title: "AI Vision Analysis", desc: "Gemini Vision detects your room's style, palette, lighting, and mood for context-aware results." },
            { icon: "🎨", title: "Custom Artwork", desc: "Each artwork is AI-generated to match your specific interior style — never generic." },
            { icon: "💡", title: "Cinematic Glow", desc: "LED backlighting with realistic light diffusion, enhanced warmth, and depth for a premium feel." },
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

export default PostcardTool;
