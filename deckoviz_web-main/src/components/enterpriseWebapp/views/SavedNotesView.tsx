import { useState, useEffect } from "react";
import { FileText, Plus, Edit2, Trash2, Tag } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";

export default function SavedNotesView() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    enterpriseApi.getTemplates().then(setTemplates).catch(console.error);
  }, []);

  const categories = ["All", ...new Set(templates.map(t => t.category))];
  const filtered = activeTab === "All" ? templates : templates.filter(t => t.category === activeTab);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Saved Notes & Templates</h1>
          <p className="text-sm text-gray-400 mt-1">{templates.length} templates</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
          <Plus size={16} /> New Template
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {categories.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-xl px-6 py-2.5 text-sm font-bold capitalize transition ${activeTab === tab ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
            {tab}
          </button>
        ))}
      </div>

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
    </div>
  );
}
