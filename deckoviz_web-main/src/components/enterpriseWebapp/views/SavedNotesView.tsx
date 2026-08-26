import { useState, useEffect } from "react";
import { Plus, Search, FileText, Edit2, Trash2, Tag, Loader2 } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

const DEFAULT_TEMPLATES = [
  { id: "t-1", title: "Lobby Display Morning Orientation", category: "Displays", content: "Set atrium displays to Metropolitan Abstract Masterpieces with 30s display intervals and ambient spatial audio.", updated: "2 hours ago" },
  { id: "t-2", title: "VIP Executive Evening Welcome", category: "VIP Lounge", content: "Activate classical oil masterpieces and soft lighting for evening corporate guests.", updated: "Yesterday" },
  { id: "t-3", title: "Weekend Art Rotation Protocol", category: "Scheduling", content: "Automated rotation between botanical living nature and modernist photography.", updated: "3 days ago" }
];

export default function SavedNotesView() {
  const [templates, setTemplates] = useState<any[]>(DEFAULT_TEMPLATES);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enterpriseApi.getTemplates().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setTemplates(res);
      }
    }).catch((err) => {
      console.error("Templates API error", err);
    }).finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(templates.map(t => t.category))];
  const filtered = activeTab === "All" ? templates : templates.filter(t => t.category === activeTab);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Saved Notes & Templates</h1>
          <p className="text-sm text-gray-400 mt-1">{templates.length} templates available</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search templates..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Plus size={16} /> New Template
          </button>
        </div>
      </div>
      
      {templates.length > 0 && (
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {categories.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition ${activeTab === tab ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
              {tab}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 animate-pulse" />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No templates found"
          description="Create saved notes and templates for quick access when curating collections."
          action={
            <button className="flex items-center gap-2 rounded-xl bg-[#182a4a] px-5 py-2.5 text-sm font-bold text-white shadow-md">
              <Plus size={16} /> Create Template
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <div key={template.id} className="group relative rounded-2xl border border-[#e8eaef] bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#182a4a]/10 text-[#182a4a]">
                  <FileText size={18} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-[#182a4a]"><Edit2 size={12} /></button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
              <h3 className="text-[15px] font-bold text-gray-800 mb-1">{template.title}</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium"><Tag size={10} />{template.category}</span>
                {template.lastEdited && <span className="text-[10px] text-gray-400">· {template.lastEdited}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
