import { Film, Plus, Upload, Scissors, Music, Type, Sparkles } from "lucide-react";

export default function ShortFilmView() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Short Film Creation Suite</h1>
          <p className="text-sm text-gray-400 mt-1">Create cinematic short films for your enterprise</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition hover:scale-[1.02]">
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Creation Tools */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {[
          { icon: Upload, label: "Import Media", desc: "Upload videos, images, and audio", gradient: "from-[#182a4a] to-indigo-600" },
          { icon: Scissors, label: "Edit & Arrange", desc: "Cut, trim, and sequence your clips", gradient: "from-violet-500 to-purple-600" },
          { icon: Sparkles, label: "AI Enhancement", desc: "Auto-enhance with AI effects", gradient: "from-amber-500 to-orange-600" },
          { icon: Music, label: "Add Soundtrack", desc: "Select music or generate custom", gradient: "from-emerald-500 to-teal-600" },
          { icon: Type, label: "Add Text & Titles", desc: "Overlay text, credits, and titles", gradient: "from-pink-500 to-rose-600" },
          { icon: Film, label: "Export & Share", desc: "Render and share your short film", gradient: "from-cyan-500 to-blue-600" },
        ].map((tool) => (
          <button key={tool.label} className={`group flex items-center gap-4 rounded-xl bg-gradient-to-br ${tool.gradient} p-5 text-left text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <tool.icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">{tool.label}</p>
              <p className="text-[11px] text-white/70">{tool.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="rounded-xl border border-[#e8eaef] bg-white">
        <div className="border-b border-[#f0f0f4] px-6 py-4">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Recent Projects</h3>
        </div>
        <div className="grid gap-4 p-6 md:grid-cols-3">
          {[
            { title: "Welcome Film — Summer 2025", status: "Draft", duration: "2:30" },
            { title: "Art Collection Showcase", status: "Published", duration: "3:15" },
            { title: "Spa Experience Promo", status: "Rendering", duration: "1:45" },
          ].map((proj) => (
            <div key={proj.title} className="group rounded-xl border border-[#e8eaef] overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
              <div className="h-[140px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <Film size={32} className="text-white/20" />
                <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase ${proj.status === "Published" ? "bg-emerald-500/20 text-emerald-400" : proj.status === "Draft" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {proj.status}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-gray-700">{proj.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Duration: {proj.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
