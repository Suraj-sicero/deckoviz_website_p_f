import { useState } from "react";
import { FileText, Plus, Clock, Tag, Edit2, Trash2 } from "lucide-react";
import { savedTemplates } from "../enterpriseData";

export default function SavedNotesView() {
  const [activeTab, setActiveTab] = useState<"templates" | "content">("templates");

  const savedContent = [
    { id: 1, title: "Summer 2025 Event Descriptions", category: "Events", lastEdited: "Jun 24", excerpt: "A curated evening of impressionist art and fine wine..." },
    { id: 2, title: "Lobby Display Rotation Strategy", category: "Strategy", lastEdited: "Jun 22", excerpt: "Our lobby art rotation follows a seasonal approach..." },
    { id: 3, title: "Guest Personalization Guidelines", category: "Operations", lastEdited: "Jun 20", excerpt: "VIP guests receive personalized art selections based on..." },
    { id: 4, title: "Art-first Marketing Brief", category: "Marketing", lastEdited: "Jun 18", excerpt: "Position The Grand Metropolitan as the pioneer of..." },
  ];

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Notes, Content & Templates</h1>
          <p className="text-sm text-gray-400 mt-1">AI workspace for content and text-based assets</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
          <Plus size={16} /> New Document
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {(["templates", "content"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition ${activeTab === tab ? "bg-gradient-to-r from-[#182a4a] to-indigo-600 text-white shadow" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
            {tab === "templates" ? "Saved Templates" : "Saved Content"}
          </button>
        ))}
      </div>

      {activeTab === "templates" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedTemplates.map((t) => (
            <div key={t.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#182a4a]/10 text-[#182a4a]">
                  <FileText size={18} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:text-[#182a4a]"><Edit2 size={12} /></button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
              <h3 className="text-[14px] font-bold text-gray-800 mb-1.5">{t.title}</h3>
              <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1"><Tag size={10} /> {t.category}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {t.lastEdited}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {savedContent.map((c) => (
            <div key={c.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[15px] font-bold text-gray-800">{c.title}</h3>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Tag size={10} /> {c.category}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {c.lastEdited}</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{c.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
