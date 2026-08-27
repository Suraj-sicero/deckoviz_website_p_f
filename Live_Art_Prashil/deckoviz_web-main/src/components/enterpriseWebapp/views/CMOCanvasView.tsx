import { useState } from "react";
import { Send, Sparkles, Image as ImageIcon, FileText, Megaphone, Lightbulb, PenTool } from "lucide-react";

const cmoModes = [
  { id: "campaign", label: "Campaign Builder", icon: Megaphone, desc: "Plan & launch marketing campaigns" },
  { id: "content", label: "Content Studio", icon: FileText, desc: "Create posts, copy & captions" },
  { id: "visual", label: "Visual Creator", icon: ImageIcon, desc: "Design graphics & hero images" },
  { id: "ideate", label: "Ideation Lab", icon: Lightbulb, desc: "Brainstorm & strategize ideas" },
  { id: "brand", label: "Brand Voice", icon: PenTool, desc: "Maintain brand consistency" },
];

export default function CMOCanvasView() {
  const [activeMode, setActiveMode] = useState("campaign");
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-54px)]">
      {/* Mode Sidebar */}
      <div className="w-[220px] shrink-0 border-r border-[#ebedf2] bg-[#f8f9fb] flex flex-col">
        <div className="px-5 py-5 border-b border-[#ebedf2]">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">CMO Canvas</h3>
          <p className="text-[10px] text-gray-400 mt-1">Create campaigns & content</p>
        </div>
        <div className="flex-1 py-3 space-y-1 px-3">
          {cmoModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                activeMode === mode.id ? "bg-white shadow-md border border-blue-100" : "hover:bg-white/60"
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeMode === mode.id ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white" : "bg-gray-100 text-gray-400"}`}>
                <mode.icon size={14} />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold ${activeMode === mode.id ? "text-gray-800" : "text-gray-500"}`}>{mode.label}</p>
                <p className="text-[9px] text-gray-400 truncate">{mode.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Templates */}
        <div className="border-t border-[#ebedf2] px-4 py-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Templates</p>
          <div className="space-y-2">
            {["Social Media Post", "Email Newsletter", "Event Flyer", "Brand Story"].map((t) => (
              <button key={t} className="w-full text-left rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-gray-500 border border-[#e8eaef] hover:border-blue-200 hover:text-[#182a4a] transition">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b border-[#ebedf2] px-8 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {cmoModes.find(m => m.id === activeMode)?.label}
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {cmoModes.find(m => m.id === activeMode)?.desc}
          </p>
        </div>

        {/* Canvas Content — Placeholder */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-[720px]">
            {/* Welcome */}
            <div className="flex gap-3 items-start mb-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white">
                <Sparkles size={14} />
              </div>
              <div className="rounded-2xl rounded-tl-md bg-gray-50 px-5 py-3.5 text-sm text-gray-600 leading-relaxed border border-gray-100">
                Welcome to the <strong>{cmoModes.find(m => m.id === activeMode)?.label}</strong>! Describe what you'd like to create — a campaign, social post, email copy, visual asset, or brainstorm ideas. I'll help you craft premium content for your brand.
              </div>
            </div>

            {/* Example output cards */}
            <div className="grid gap-3 md:grid-cols-2 mt-6">
              {["Create a summer art event campaign", "Draft Instagram carousel copy", "Design welcome email for VIP guests", "Brainstorm lobby art rotation themes"].map((suggestion, i) => (
                <button key={i} className="group rounded-xl border border-[#e8eaef] bg-white p-4 text-left transition hover:shadow-md hover:border-blue-200">
                  <p className="text-xs font-bold text-gray-600 group-hover:text-[#182a4a] transition">{suggestion}</p>
                  <p className="text-[10px] text-gray-300 mt-1 flex items-center gap-1">
                    <Sparkles size={9} /> Click to try
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#ebedf2] px-8 py-4">
          <div className="mx-auto max-w-[720px] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Describe what you'd like to create..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#e2e4ea] bg-[#f8f9fb] pl-5 pr-14 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:shadow-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white transition hover:bg-[#182a4a] shadow-sm">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
