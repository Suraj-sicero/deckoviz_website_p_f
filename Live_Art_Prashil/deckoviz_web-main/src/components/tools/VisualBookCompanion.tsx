"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { jsPDF } from "jspdf";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL || "https://deckoviz-web-f.onrender.com"}/api/wizzy`;

const STYLES = [
  { id: "cinematic", name: "Cinematic", icon: "🎬" },
  { id: "anime", name: "Anime", icon: "🏮" },
  { id: "watercolor", name: "Watercolor", icon: "🎨" },
  { id: "dark-fantasy", name: "Dark Fantasy", icon: "⚔️" },
];

const ASPECT_RATIOS = [
  { id: "16-9", label: "16:9", ratio: [16, 9], class: "aspect-video" },
  { id: "9-16", label: "9:16", ratio: [9, 16], class: "aspect-[9/16]" },
  { id: "4-5", label: "4:5", ratio: [4, 5], class: "aspect-[4/5]" },
  { id: "1-1", label: "1:1", ratio: [1, 1], class: "aspect-square" },
];

const BORDER_COLORS = [
  { id: "white", color: "#FFFFFF", label: "White" },
  { id: "black", color: "#000000", label: "Black" },
  { id: "violet", color: "#7C3AED", label: "Violet" },
  { id: "gold", color: "#D4AF37", label: "Gold" },
];

const MAX_CHARS = 500000;

interface VisualBeat {
  image: string;
  text: string;
  prompt: string;
  distilledSummary: string;
}

const VisualBookCompanion: React.FC = () => {
  const { user, deductCredits } = useAuth();
  const [inputMethod, setInputMethod] = useState<"pdf" | "text">("text");
  const [file, setFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState("");
  const [numPages, setNumPages] = useState(50);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [hasBorders, setHasBorders] = useState(false);
  const [borderColor, setBorderColor] = useState(BORDER_COLORS[0]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("");
  const [beats, setBeats] = useState<VisualBeat[]>([]);
  const [viewMode, setViewMode] = useState<"setup" | "generating" | "result">("setup");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startGeneration = async () => {
    const hasInput = inputMethod === "pdf" ? !!file : rawText.trim().length > 20;
    if (!hasInput) return;

    // PRODUCTION MODE: Credit Deduction Active
    const success = await deductCredits(15);
    if (!success) return;

    setIsGenerating(true);
    setViewMode("generating");
    setProgress(0);

    try {
      const totalChars = rawText.length;
      const N = numPages; // Now supports up to 200
      const chunkSize = Math.floor(totalChars / N);
      const generatedBeats: VisualBeat[] = [];

      for (let i = 0; i < N; i++) {
        const p = Math.min(100, (i / N) * 100);
        setProgress(p);
        
        const sectionStart = i * chunkSize;
        const sectionEnd = (i + 1) * chunkSize;
        const sectionText = rawText.substring(sectionStart, sectionEnd);

        setCurrentStatus(`Gemini 1.5 Pro Analyzing Section ${i + 1} of ${N}...`);

        // 1. Call Gemini to Distill & Generate Prompt
        const distillRes = await axios.post(`${API_BASE}/companion/distill`, {
          text: sectionText.substring(0, 5000),
          style: selectedStyle.id,
          additionalInstructions
        });

        const { visualSummary, imagePrompt } = distillRes.data;

        setCurrentStatus(`Synthesizing Visual Narrative ${i + 1}...`);

        // 2. Call Backend to Generate Image
        const imageRes = await axios.post(`${API_BASE}/generate-image`, {
          characterDescription: "High-fidelity book illustrations",
          style: selectedStyle.id,
          sceneDescription: imagePrompt
        });

        generatedBeats.push({
          image: imageRes.data.url,
          text: sectionText.substring(0, 500) + "...",
          distilledSummary: visualSummary,
          prompt: imagePrompt
        });
      }

      setBeats(generatedBeats);
      setProgress(100);
      setIsGenerating(false);
      setViewMode("result");
    } catch (err) {
      console.error("Generation Failed:", err);
      alert("A.I. Pipeline encountered a temporary bottleneck. Please check your credit balance or retry.");
      setIsGenerating(false);
      setViewMode("setup");
    }
  };

  const toDataURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timeout")), 20000);
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          clearTimeout(timeout);
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(reject);
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const doc = new jsPDF({
      orientation: aspectRatio.ratio[0] > aspectRatio.ratio[1] ? "landscape" : "portrait",
      unit: "mm",
      format: "a4",
    });

    try {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let i = 0; i < beats.length; i++) {
        if (i > 0) doc.addPage();
        const beat = beats[i];
        
        if (hasBorders) {
          doc.setFillColor(borderColor.color);
          doc.rect(0, 0, pageWidth, pageHeight, "F");
        }

        try {
          const imgData = await toDataURL(beat.image);
          let imgW = pageWidth - 40;
          let imgH = (imgW * aspectRatio.ratio[1]) / aspectRatio.ratio[0];
          const x = (pageWidth - imgW) / 2;
          const y = (pageHeight - imgH) / 2;
          doc.addImage(imgData, "JPEG", x, y, imgW, imgH, undefined, "FAST");
          
          if (hasBorders) {
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(0.5);
            doc.rect(x, y, imgW, imgH, "D");
          }
        } catch (e) {
          doc.setTextColor(150, 150, 150);
          doc.text("[Image processing unavailable]", 20, 100);
        }

        doc.setFontSize(10);
        doc.setTextColor(hasBorders ? (borderColor.id === "white" ? 0 : 255) : 80);
        const footerText = doc.splitTextToSize(`Beat ${i + 1}: ${beat.distilledSummary}`, pageWidth - 40);
        doc.text(footerText, 20, pageHeight - 10);
      }
      doc.save(`Vizzy_Companion_Book_${Date.now()}.pdf`);
    } finally { setIsDownloading(false); }
  };

  return (
    <div className="min-h-screen bg-[#fafaff] pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase italic">Visual Book Companion</h1>
            <p className="text-sm text-violet-600 font-bold tracking-[0.2em] uppercase">Powered by Google Gemini 1.5 Pro • Production v1.0</p>
          </div>
          <button onClick={() => window.history.back()} className="p-4 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-gray-900 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl w-fit border border-gray-200/50">
                  <button onClick={() => setInputMethod("pdf")} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${inputMethod === "pdf" ? 'bg-white text-violet-600 shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Upload PDF</button>
                  <button onClick={() => setInputMethod("text")} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${inputMethod === "text" ? 'bg-white text-violet-600 shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Paste Text</button>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-violet-500/5 min-h-[350px] flex flex-col relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 grayscale select-none pointer-events-none">
                     <img src="https://www.gstatic.com/lamda/images/gemini_wordmark_light_6021e73995874c431bc1.svg" alt="Gemini" width="120" />
                   </div>
                  {inputMethod === "text" ? (
                    <textarea className="flex-1 w-full p-8 rounded-2xl border border-gray-100 bg-gray-50/30 focus:ring-4 focus:ring-violet-100 focus:bg-white outline-none transition-all text-sm leading-relaxed text-gray-600 resize-none font-medium" placeholder="Paste your narrative here..." value={rawText} onChange={(e) => setRawText(e.target.value.slice(0, MAX_CHARS))} />
                  ) : (
                    <label className="relative flex-1 flex flex-col items-center justify-center w-full border-2 border-dashed border-violet-100 rounded-3xl hover:bg-violet-50/30 transition-all cursor-pointer group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm text-3xl">📁</div>
                        <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">{file ? file.name : "Drop Fiction PDF"}</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                    </label>
                  )}
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-violet-500/5">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Base Artistic Direction</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STYLES.map(s => (
                      <button key={s.id} onClick={() => setSelectedStyle(s)} className={`p-4 rounded-2xl border transition-all text-center ${selectedStyle.id === s.id ? 'border-violet-500 bg-violet-50/50 shadow-lg' : 'border-gray-50 bg-white'}`}>
                        <div className="text-3xl mb-2">{s.icon}</div>
                        <div className={`font-black text-[10px] uppercase tracking-widest ${selectedStyle.id === s.id ? 'text-violet-700' : 'text-gray-500'}`}>{s.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-violet-500/5">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 italic">Additional Instructions</h3>
                  <textarea className="w-full p-6 rounded-2xl border border-gray-100 bg-gray-50/30 focus:ring-4 focus:ring-emerald-100 focus:bg-white outline-none transition-all text-sm leading-relaxed text-gray-600 resize-none font-medium h-24" placeholder="Mention preferences..." value={additionalInstructions} onChange={(e) => setAdditionalInstructions(e.target.value)} />
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-violet-500/5">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Aesthetic Controls</h4>
                  
                  <div className="mb-8">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-3">Aspect Ratio</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ASPECT_RATIOS.map(ratio => (
                        <button key={ratio.id} onClick={() => setAspectRatio(ratio)} className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${aspectRatio.id === ratio.id ? 'bg-violet-600 text-white border-violet-600' : 'bg-gray-50 text-gray-400'}`}>{ratio.label}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 border-t border-gray-50 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Illustrative Borders</label>
                      <button onClick={() => setHasBorders(!hasBorders)} className={`w-10 h-5 rounded-full relative transition-all ${hasBorders ? 'bg-violet-600' : 'bg-gray-200'}`}><div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${hasBorders ? 'left-6' : 'left-1'}`} /></button>
                    </div>
                    {hasBorders && (
                      <div className="flex gap-2">
                        {BORDER_COLORS.map(color => (
                          <button key={color.id} onClick={() => setBorderColor(color)} className={`w-8 h-8 rounded-lg border-2 transition-all ${borderColor.id === color.id ? 'border-violet-500 scale-110' : 'border-transparent'}`} style={{ backgroundColor: color.color }} title={color.label} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-10 border-t border-gray-50 pt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Section Count (N)</label>
                      <span className="text-xs font-black text-violet-600 italic">{numPages}</span>
                    </div>
                    <input type="range" min="10" max="200" step="10" value={numPages} onChange={(e) => setNumPages(parseInt(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-violet-500" />
                    <div className="flex justify-between text-[8px] text-gray-400 uppercase font-black mt-1">
                      <span>Standard</span>
                      <span>Collector's Edition</span>
                    </div>
                  </div>

                  <button disabled={(inputMethod === "pdf" ? !file : rawText.trim().length < 20) || isGenerating} onClick={startGeneration} className="w-full py-5 rounded-2xl bg-violet-600 text-white font-black uppercase tracking-[0.2em] shadow-xl hover:bg-violet-500 transition-all">Launch Pipeline</button>
                  <p className="text-[9px] text-center mt-6 text-gray-400 font-bold uppercase tracking-[0.2em]">15 Credits • Secure Generation</p>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "generating" && (
            <motion.div key="generating" className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative w-48 h-48 mb-12">
                <div className="absolute inset-0 rounded-full border-[8px] border-violet-50" />
                <motion.div className="absolute inset-0 rounded-full border-[8px] border-violet-600 border-t-transparent shadow-[0_0_20px_rgba(124,58,237,0.4)]" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                <div className="absolute inset-0 flex items-center justify-center font-black text-3xl text-gray-900">{Math.round(progress)}%</div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">Gemini Intelligence Processing</h2>
              <p className="text-xs font-mono text-violet-600 uppercase tracking-widest animate-pulse max-w-lg mx-auto">"{currentStatus}"</p>
            </motion.div>
          )}

          {viewMode === "result" && (
            <motion.div key="result" className="space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 uppercase italic">Narrative Export Ready</h2>
                  <p className="text-[10px] text-violet-600 font-black uppercase tracking-widest">{beats.length} High-Fidelity Pages Synthesized</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleDownload} className="px-10 py-4 rounded-xl bg-gray-900 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105">{isDownloading ? "Constructing PDF..." : "Download Companion Book"}</button>
                  <button onClick={() => setViewMode("setup")} className="px-10 py-4 rounded-xl border-2 border-gray-100 text-gray-400 font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-50 transition-all">Start Over</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                {beats.map((beat, i) => (
                  <div key={i} className={`relative rounded-[2rem] overflow-hidden shadow-2xl bg-white transition-all duration-700 ${aspectRatio.class} ${hasBorders ? 'p-4' : ''}`} style={{ backgroundColor: hasBorders ? borderColor.color : 'white' }}>
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative group">
                      <img 
                        src={beat.image} 
                        alt={`Beat ${i+1}`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        loading="eager"
                      />
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/50 backdrop-blur text-white font-black flex items-center justify-center text-xs border border-white/10">{i + 1}</div>
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                        <p className="text-[10px] font-black text-violet-400 uppercase mb-2">Gemini Analysis</p>
                        <p className="text-white text-[10px] leading-relaxed uppercase tracking-tight italic opacity-90">{beat.distilledSummary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisualBookCompanion;
