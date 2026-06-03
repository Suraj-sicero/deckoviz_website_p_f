import React, { useState, useRef } from "react";
import ToolLayout from "./ToolLayout";

const QuotePosterTool: React.FC = () => {
  const [quote, setQuote] = useState("The only way to do great work is to love what you do.");
  const [author, setAuthor] = useState("Steve Jobs");
  const [background, setBackground] = useState("bg-gradient-to-br from-violet-600 to-indigo-900");
  const [fontStyle, setFontStyle] = useState("font-serif");
  const [textColor, setTextColor] = useState("text-white");
  
  const posterRef = useRef<HTMLDivElement>(null);

  const gradients = [
    { name: "Royal Velvet", value: "bg-gradient-to-br from-violet-600 to-indigo-900" },
    { name: "Sunset Glow", value: "bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600" },
    { name: "Ocean Breeze", value: "bg-gradient-to-br from-cyan-500 to-blue-800" },
    { name: "Midnight Forest", value: "bg-gradient-to-br from-emerald-700 to-slate-900" },
    { name: "Rose Quartz", value: "bg-gradient-to-br from-pink-500 via-red-400 to-yellow-500" },
    { name: "Dark Clean", value: "bg-neutral-900 border border-neutral-800" },
  ];

  const fonts = [
    { name: "Classic Serif", value: "font-serif italic" },
    { name: "Modern Sans", value: "font-sans font-bold tracking-tight" },
    { name: "Monospace", value: "font-mono" },
    { name: "Display Elegant", value: "font-serif tracking-widest uppercase font-semibold" },
  ];

  const handleDownload = async () => {
    if (!posterRef.current) return;
    
    // We can use native HTML Canvas to draw the text on a matching gradient background
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
    if (background.includes("from-violet-600")) {
      grad.addColorStop(0, "#7c3aed");
      grad.addColorStop(1, "#312e81");
    } else if (background.includes("from-orange-500")) {
      grad.addColorStop(0, "#f97316");
      grad.addColorStop(0.5, "#f43f5e");
      grad.addColorStop(1, "#a855f7");
    } else if (background.includes("from-cyan-500")) {
      grad.addColorStop(0, "#06b6d4");
      grad.addColorStop(1, "#1e40af");
    } else if (background.includes("from-emerald-700")) {
      grad.addColorStop(0, "#047857");
      grad.addColorStop(1, "#0f172a");
    } else if (background.includes("from-pink-500")) {
      grad.addColorStop(0, "#ec4899");
      grad.addColorStop(0.5, "#f87171");
      grad.addColorStop(1, "#eab308");
    } else {
      grad.addColorStop(0, "#171717");
      grad.addColorStop(1, "#171717");
    }
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1200);

    // Decorative frame border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 15;
    ctx.strokeRect(60, 60, 1080, 1080);
    
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.strokeRect(80, 80, 1040, 1040);

    // Set font styles
    let fontName = "Georgia";
    if (fontStyle.includes("sans")) fontName = "system-ui";
    if (fontStyle.includes("mono")) fontName = "Courier New";
    
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Quote Text wrap
    const text = `“${quote}”`;
    ctx.font = fontStyle.includes("italic") ? `italic 46px ${fontName}` : `bold 46px ${fontName}`;
    
    // Helper to wrap canvas text
    const words = text.split(" ");
    let line = "";
    const lines = [];
    const maxWidth = 900;
    const lineHeight = 65;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw quote marks
    const startY = 600 - (lines.length * lineHeight) / 2;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), 600, startY + i * lineHeight);
    }

    // Draw Author
    if (author) {
      ctx.font = `32px ${fontName}`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillText(`— ${author}`, 600, startY + lines.length * lineHeight + 80);
    }

    // Logo watermark at bottom
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("DECKOVIZ ART LABS", 600, 1040);

    // Export image
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `quote_poster_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolLayout
      icon="💬"
      title="Quote Poster Generator"
      subtitle="Transform your favorite words, quotes, and wisdom into premium, high-resolution downloadable poster graphics."
      gradient="from-violet-500 via-purple-500 to-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Editor controls */}
        <div className="bg-white/90 backdrop-blur-md border border-white/60 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Customize Poster</h2>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quote Text</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Enter your quote..."
              rows={4}
              maxLength={250}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Steve Jobs"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Poster Theme / Gradient</label>
            <div className="grid grid-cols-3 gap-2">
              {gradients.map((g) => (
                <button
                  key={g.name}
                  onClick={() => setBackground(g.value)}
                  className={`h-12 rounded-xl transition-all border-2 ${
                    background === g.value ? "border-purple-600 scale-[1.03]" : "border-transparent"
                  } ${g.value}`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Font style</label>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFontStyle(f.value)}
                  className={`px-4 py-2.5 rounded-xl border-2 text-xs font-semibold text-gray-750 transition-all ${
                    fontStyle === f.value ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-200 bg-white"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all"
          >
            📥 Download High-Res Poster
          </button>
        </div>

        {/* Live Poster Preview Card */}
        <div className="flex flex-col items-center justify-center">
          <div
            ref={posterRef}
            className={`w-full max-w-[400px] aspect-square rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl transition-all duration-300 ${background}`}
          >
            {/* Elegant double borders */}
            <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-white/5 rounded-2xl pointer-events-none" />

            <div />

            {/* Quote container */}
            <div className="text-center px-4 relative z-10">
              <p className={`text-xl md:text-2xl text-white leading-relaxed ${fontStyle}`}>
                “{quote}”
              </p>
              {author && (
                <p className="text-xs md:text-sm text-white/70 mt-6 font-semibold uppercase tracking-wider">
                  — {author}
                </p>
              )}
            </div>

            {/* Footer mark */}
            <div className="text-center relative z-10">
              <span className="text-[9px] font-black text-white/30 tracking-widest uppercase">
                DECKOVIZ ART LABS
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-400 mt-4">Poster Live Preview (1:1 Ratio)</span>
        </div>
      </div>
    </ToolLayout>
  );
};

export default QuotePosterTool;
