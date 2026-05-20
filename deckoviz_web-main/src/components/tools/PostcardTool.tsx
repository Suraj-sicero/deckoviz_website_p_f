import React, { useState, useCallback, useEffect } from "react";
import ToolLayout from "./ToolLayout";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com"}`);

type Status = "idle" | "uploading" | "loading" | "done" | "error";

interface PostcardResult {
  success: boolean;
  imageUrl: string;
  afterUrl: string;
  beforeUrl: string;
  reasoning: string;
}

const ComparisonSlider: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  const [position, setPosition] = useState(50);
  
  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl group select-none bg-black/5 flex items-center justify-center">
      {/* Dynamic Sizing Image to naturally fit different aspect ratios without cropping */}
      <img src={after} alt="After Sizer" className="w-full h-auto block opacity-0 pointer-events-none" />

      {/* After Image (Top Layer) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before} alt="Before" className="w-full h-full object-cover" />
      </div>

      {/* Before Image (Bottom Layer) */}
      <div className="absolute inset-0 z-0">
        <img src={after} alt="After" className="w-full h-full object-cover" />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 pointer-events-none z-30 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-emerald-500 text-emerald-600 font-bold">
          ↔
        </div>
      </div>

      {/* Invisible Range Input */}
      <input 
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 z-40 opacity-0 cursor-ew-resize w-full h-full"
      />

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-50 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold pointer-events-none uppercase tracking-widest">Original</div>
      <div className="absolute bottom-4 right-4 z-50 bg-emerald-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold pointer-events-none uppercase tracking-widest">Deckoviz Transformed</div>
    </div>
  );
};

const steps = [
  "Scanning interior layout...",
  "AI wall detection & perspective check...",
  "Designing custom museum-grade artwork...",
  "Crafting premium wooden hardware bezel...",
  "Applying LED backlighting & shadows...",
  "Finalizing photorealistic composition..."
];

const frameOptions = [
  { id: "frame1", name: "Classic Walnut", description: "Rich dark walnut with ambient blue glow", color: "bg-[#5c4033]", glowColor: "#3b6390", borderClass: "border-[#5c4033]" },
  { id: "frame2", name: "Sleek Charcoal", description: "Modern charcoal with sunset orange glow", color: "bg-[#2b2b2b]", glowColor: "#ec8567", borderClass: "border-[#2b2b2b]" },
  { id: "frame3", name: "Natural Oak", description: "Elegant natural oak with soft golden glow", color: "bg-[#c2a679]", glowColor: "#ceaf8e", borderClass: "border-[#c2a679]" },
  { id: "frame4", name: "Modern Maple", description: "Warm maple wood with bronze accent glow", color: "bg-[#a0785a]", glowColor: "#8c7765", borderClass: "border-[#a0785a]" },
];

const PostcardTool: React.FC = () => {
  const [mode, setMode] = useState<"mode1" | "mode2">("mode1");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [frameImage, setFrameImage] = useState<File | null>(null);
  const [framePreview, setFramePreview] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [frameStyle, setFrameStyle] = useState<string>("frame1");
  const [result, setResult] = useState<PostcardResult | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingFrame, setIsDraggingFrame] = useState(false);

  // Simulate loading steps
  useEffect(() => {
    let interval: any;
    if (status === "loading") {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 3500); // Change step every 3.5 seconds
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleSpaceFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file for the space.");
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

  const handleFrameFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file for the frame.");
      return;
    }
    setFrameImage(file);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setFramePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSpaceDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleSpaceFileChange(e.dataTransfer.files);
  }, []);

  const onFrameDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFrame(false);
    handleFrameFileChange(e.dataTransfer.files);
  }, []);

  const generate = async () => {
    if (!image) { setError("Please upload an image of your space."); return; }
    if (mode === "mode1" && !frameImage) { setError("Please upload an image of the frame/artwork."); return; }
    if (!businessName.trim()) { setError("Please enter your business name."); return; }
    
    setError(""); 
    setStatus("loading"); 
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("businessName", businessName);
      formData.append("frameStyle", frameStyle);
      if (mode === "mode1") {
        if (frameImage) formData.append("frameImage", frameImage);
      }

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
    setFrameImage(null);
    setFramePreview(null);
    setBusinessName("");
    setFrameStyle("frame1");
    setMode("mode1");
    setResult(null);
    setStatus("idle");
    setError("");
  };

  const handleDownloadPostcard = async () => {
    if (!result?.imageUrl) return;
    try {
      const response = await fetch(result.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `deckoviz_postcard_${businessName.replace(/\s+/g, "_") || 'result'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      const a = document.createElement("a");
      a.href = result.imageUrl;
      a.download = "postcard.jpg";
      a.click();
    }
  };

  const handleDownloadRoom = async () => {
    if (!result?.afterUrl) return;
    try {
      const response = await fetch(result.afterUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `deckoviz_room_${businessName.replace(/\s+/g, "_") || 'result'}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      const a = document.createElement("a");
      a.href = result.afterUrl;
      a.download = "transformed_room.jpg";
      a.click();
    }
  };

  return (
    <ToolLayout
      icon="🎴"
      title="Before & After Postcard"
      subtitle="Transform your real-world space with a premium Deckoviz DASP frame"
      gradient="from-emerald-600 via-teal-700 to-cyan-800"
    >
      <div className="space-y-8">
        {/* Input Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-6 transition-all">1. Design Your Postcard</h2>

          {/* Mode Selector */}
          <div className="flex p-1 bg-gray-100/80 backdrop-blur-md rounded-2xl mb-8 border border-gray-200">
            <button
              onClick={() => {
                setMode("mode1");
                setError("");
              }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                mode === "mode1"
                  ? "bg-white text-gray-900 shadow-md scale-[1.01]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/40"
              }`}
            >
              🖼️ Mode 1: Custom Artwork
            </button>
            <button
              onClick={() => {
                setMode("mode2");
                setError("");
              }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                mode === "mode2"
                  ? "bg-white text-gray-900 shadow-md scale-[1.01]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-white/40"
              }`}
            >
              ✨ Mode 2: Auto Showcase
            </button>
          </div>

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

          {/* Frame Style Selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Premium Frame Style</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {frameOptions.map((opt) => {
                const isSelected = frameStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFrameStyle(opt.id)}
                    type="button"
                    className={`relative p-4 rounded-2xl text-left border-2 transition-all duration-300 ${
                      isSelected 
                        ? "bg-white border-transparent shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] scale-[1.02]" 
                        : "bg-white/40 border-gray-100 hover:border-gray-200 hover:bg-white/60"
                    }`}
                    style={{
                      borderColor: isSelected ? opt.glowColor : undefined,
                      boxShadow: isSelected ? `0 10px 25px -5px ${opt.glowColor}40, 0 8px 10px -6px ${opt.glowColor}30` : undefined
                    }}
                  >
                    {/* Simulated Frame Preview Box */}
                    <div className="relative aspect-[4/3] rounded-lg mb-3 flex items-center justify-center overflow-hidden bg-gray-50 border border-gray-100">
                      {/* Ambient Backlight Glow */}
                      <div 
                        className="absolute w-2/3 h-2/3 rounded-full blur-xl opacity-60 transition-opacity"
                        style={{ backgroundColor: opt.glowColor }}
                      />
                      {/* Outer Frame Bezel */}
                      <div className={`relative w-4/5 h-3/5 rounded border-[6px] bg-gray-100 flex items-center justify-center transition-all ${opt.borderClass}`}>
                        {/* Inner Artwork screen placeholder */}
                        <div className="w-full h-full bg-white flex items-center justify-center">
                          <span className="text-[10px] font-bold text-gray-400">ART</span>
                        </div>
                      </div>
                    </div>

                    <div className="font-bold text-xs text-gray-900">{opt.name}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 leading-snug">{opt.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drop zones grid */}
          <div className={`grid gap-6 mb-6 ${mode === "mode1" ? "md:grid-cols-2" : "grid-cols-1"}`}>
            {/* Space Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onSpaceDrop}
              className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center ${
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
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => handleSpaceFileChange(e.target.files)}
              />
              {!preview ? (
                <div>
                  <div className="text-5xl mb-3">📸</div>
                  <p className="font-bold text-gray-600 mb-1">Upload Space / Wall Photo</p>
                  <p className="text-xs text-gray-400">Best for walls, interiors, & rooms</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img src={preview} alt="Space Preview" className="w-48 h-32 object-cover rounded-xl shadow-md mb-3" />
                  <p className="font-bold text-emerald-700">Space uploaded!</p>
                  <p className="text-xs text-emerald-500">Click or drag to replace</p>
                </div>
              )}
            </div>

            {/* Frame Artwork Drop zone (Mode 1 only) */}
            {mode === "mode1" && (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingFrame(true); }}
                onDragLeave={() => setIsDraggingFrame(false)}
                onDrop={onFrameDrop}
                className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center ${
                  isDraggingFrame
                    ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
                    : frameImage
                    ? "border-emerald-300 bg-emerald-50/30"
                    : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/30"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  onChange={(e) => handleFrameFileChange(e.target.files)}
                />
                {!framePreview ? (
                  <div>
                    <div className="text-5xl mb-3">🖼️</div>
                    <p className="font-bold text-gray-600 mb-1">Upload Frame / Artwork Image</p>
                    <p className="text-xs text-gray-400">The design to place in the frame</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src={framePreview} alt="Frame Preview" className="w-48 h-32 object-cover rounded-xl shadow-md mb-3" />
                    <p className="font-bold text-emerald-700">Artwork uploaded!</p>
                    <p className="text-xs text-emerald-500">Click or drag to replace</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mode 2 Explanatory Tip */}
          {mode === "mode2" && (
            <div className="mb-6 px-5 py-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-emerald-800 text-xs flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="font-bold mb-0.5">Vizzy Smart Placement</p>
                <p className="text-emerald-700/90 leading-relaxed">Vizzy will automatically scan your room, detect the optimal wall layout, and seamlessly synthesize a premium Decoviz digital art frame with a matching wooden bezel, ambient backlight glow, and realistic drop shadows using Google's Gemini 2.5 vision rendering engine.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-bounce">⚠️ {error}</div>
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
            ) : "✨ Generate Postcard"}
          </button>
        </div>

        {/* Loading Timeline State */}
        {status === "loading" && (
          <div className="bg-white/90 backdrop-blur-md border border-emerald-100 rounded-3xl p-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-50" />
            
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl animate-bounce">🪄</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Vizzy is Crafting Your Postcard</h3>
                  <p className="text-sm text-gray-500 italic">Advanced AI processing in progress...</p>
                </div>
              </div>

              <div className="space-y-4 ml-2">
                {steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-4 transition-all duration-700 ${
                      idx < loadingStep 
                        ? "opacity-100 translate-x-2" 
                        : idx === loadingStep 
                        ? "opacity-100 scale-105" 
                        : "opacity-30"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      idx < loadingStep 
                        ? "bg-emerald-500 text-white" 
                        : idx === loadingStep 
                        ? "bg-emerald-600 animate-pulse text-white" 
                        : "bg-gray-200 text-gray-400"
                    }`}>
                      {idx < loadingStep ? "✓" : idx + 1}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${
                      idx === loadingStep ? "text-emerald-700" : "text-gray-600"
                    }`}>
                      {step}
                    </span>
                    {idx === loadingStep && (
                      <div className="flex gap-1 ml-auto">
                        <div className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar Background */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000 ease-linear"
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Result Area */}
        {status === "done" && result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                <ComparisonSlider before={result.beforeUrl} after={result.afterUrl} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <button
                onClick={handleDownloadPostcard}
                className="group relative py-5 rounded-2xl bg-gray-900 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-white font-bold flex items-center justify-center gap-2">
                  📥 Download Postcard
                </span>
              </button>
              <button
                onClick={handleDownloadRoom}
                className="group relative py-5 rounded-2xl bg-emerald-700 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-white font-bold flex items-center justify-center gap-2">
                  🖼️ Download Room Photo
                </span>
              </button>
              <button
                onClick={reset}
                className="py-5 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-95 text-center"
              >
                🔄 Create Another Space
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100/50 shadow-inner">
                <div className="flex gap-4 items-start">
                    <div className="text-3xl">✨</div>
                    <div>
                        <h4 className="font-bold text-emerald-900 mb-1">AI Placement Strategy</h4>
                        <p className="text-sm text-emerald-700/80 leading-relaxed italic">
                            "{result.reasoning}"
                        </p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🪄", title: "AI Transformation", desc: "Our advanced vision AI identifies walls and adds realistic digital art frames." },
            { icon: "📐", title: "Perfect Scale", desc: "Frames are placed with correct perspective and scale to feel natural in your space." },
            { icon: "💡", title: "Ambient Glow", desc: "Each frame includes realistic LED backlighting that interacts with your wall." },
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
