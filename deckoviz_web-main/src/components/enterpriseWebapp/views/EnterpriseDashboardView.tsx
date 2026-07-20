import { useState, useEffect, useRef, useCallback } from "react";
import type React from "react";
import {
  Monitor, Calendar, Image as ImageIcon, Sparkles, PenTool,
  FileImage, RefreshCw, ArrowUpRight, Clock, Layers, Play,
  Upload, X, CheckCircle2,
} from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { setFrameImage } from "../../../lib/frameStore";

interface DashboardData {
  profile: { name: string; subtitle: string; location: string; units: number; activeFrames: number };
  stats: { label: string; value: string; delta: string; color: string }[];
  units: { id: string; name: string; frames: number; status: string; collectionName: string }[];
  events: { id: string; title: string; date: string; time: string; collectionName: string; recurring: boolean; frequency: string }[];
}

/* ======================== MEDIA SAMPLES ======================== */
const ENT_MEDIA_SAMPLES = [
  "/images/herol (1).png",
  "/images/herol (2).png",
  "/images/herol (3).png",
  "/images/herol (4).png",
  "/images/herol (5).png",
  "/images/herol (6).png",
  "/images/herol (7).png",
  "/images/herol (8).png",
  "/images/herol (9).png",
  "/images/herol (10).png",
  "/images/herol (12).png",
  "/images/herol (13).png",
];

/* ======================== VIRTUAL FRAME MODAL ======================== */
function EnterpriseVirtualFrameModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Read as data-URL so it survives cross-route navigation
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setSelected(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSend = () => {
    if (!selected) return;
    setFrameImage(selected);
    setSent(true);
    setTimeout(() => {
      window.open("/webframe", "_blank");
      onClose();
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto flex items-start justify-center py-8 px-4"
      style={{ background: "rgba(10,15,30,0.75)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-auto"
        style={{
          background: "linear-gradient(145deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center shadow-lg">
              <Monitor size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-white">Send to Virtual Frame</h2>
              <p className="text-[11px] text-white/40">Replace the default artwork on your enterprise Deckoviz frames</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all">
            <X size={16} />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl mb-5 animate-bounce">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sent to Frame!</h3>
            <p className="text-white/50 text-sm text-center">Your image is now live on your enterprise Deckoviz Virtual Frame.</p>
          </div>
        ) : (
          <div className="px-7 pb-7">
            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {(["library", "upload"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); if (t === "library") setSelected(null); }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    tab === t
                      ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
                      : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {t === "library" ? "📁  Enterprise Media Library" : "⬆️  Upload from Device"}
                </button>
              ))}
            </div>

            <div className="flex gap-6">
              {/* Left panel */}
              <div className="flex-1 min-w-0">
                {tab === "library" ? (
                  <div className="grid grid-cols-4 gap-2.5 max-h-[280px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                    {ENT_MEDIA_SAMPLES.map((img) => (
                      <button
                        key={img}
                        onClick={() => setSelected(img)}
                        className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
                          selected === img
                            ? "ring-2 ring-[#2563EB] ring-offset-2 ring-offset-[#0f172a] scale-105"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {selected === img && (
                          <div className="absolute inset-0 bg-[#2563EB]/20 flex items-center justify-center">
                            <CheckCircle2 size={20} className="text-white drop-shadow-lg" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center h-[200px] rounded-2xl border-2 border-dashed border-white/20 hover:border-[#2563EB]/60 cursor-pointer transition-all hover:bg-white/5 group"
                  >
                    <Upload size={28} className="text-white/30 group-hover:text-[#2563EB] mb-3 transition-colors" />
                    <p className="text-white/50 text-sm font-semibold group-hover:text-white/70 transition-colors">Click to choose an image</p>
                    <p className="text-white/30 text-[11px] mt-1">JPG, PNG, WebP supported</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </div>
                )}
              </div>

              {/* Preview panel */}
              <div className="w-[180px] shrink-0">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">Frame Preview</p>
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "#111",
                    border: "2px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 40px rgba(37,99,235,0.15)",
                    aspectRatio: "9/16",
                  }}
                >
                  {selected ? (
                    <img src={selected} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Monitor size={24} className="text-white/15 mb-2" />
                      <p className="text-[10px] text-white/20 text-center px-3">Select an image to preview</p>
                    </div>
                  )}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.06)" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="w-1 h-1 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-white/25 text-center mt-2">Virtual Frame</p>
              </div>
            </div>

            {/* Send button */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-[11px] text-white/30">
                {selected ? "Ready to send to your frame" : "No image selected yet"}
              </p>
              <button
                onClick={handleSend}
                disabled={!selected}
                className={`flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  selected
                    ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                <Monitor size={15} />
                Send to Frame
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EnterpriseDashboardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [showVirtualFrameModal, setShowVirtualFrameModal] = useState(false);

  useEffect(() => {
    enterpriseApi.getDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Loading dashboard...</div>
      </div>
    );
  }

  const { profile, stats, units, events } = data;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 80%, #2563EB 0%, transparent 50%)" }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-300/80">Good evening</p>
            <h1 className="mb-2 text-[28px] font-bold text-white tracking-tight">{profile.name}</h1>
            <p className="text-sm text-white/50">{profile.subtitle} · {profile.location}</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm border border-white/10">
              <Monitor size={14} /> {profile.units} Units Active
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm border border-white/10">
              <Layers size={14} /> {profile.activeFrames} Frames Live
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="group relative overflow-hidden rounded-xl border border-[#e8eaef] bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-[#182a4a]/5 hover:-translate-y-0.5">
            <div className="absolute top-0 right-0 h-20 w-20 rounded-full opacity-[0.06]" style={{ background: stat.color, transform: "translate(30%, -30%)" }} />
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className="text-[26px] font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-[11px] font-semibold" style={{ color: stat.color }}>{stat.delta}</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="mb-4 font-serif text-lg font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { label: "Create Art", icon: Sparkles, gradient: "from-[#182a4a] to-[#2563EB]" },
            { label: "Create Poster", icon: FileImage, gradient: "from-[#182a4a] to-[#2563EB]" },
            { label: "Create Signage", icon: PenTool, gradient: "from-amber-500 to-orange-600" },
            { label: "Change Collection", icon: RefreshCw, gradient: "from-emerald-500 to-teal-600" },
          ].map((act) => (
            <button key={act.label} className={`group flex items-center gap-3 rounded-xl bg-gradient-to-br ${act.gradient} px-5 py-4 text-left text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm"><act.icon size={18} /></div>
              {act.label}
              <ArrowUpRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
          {/* Send to Virtual Frame */}
          <button
            id="send-to-virtual-frame-enterprise"
            onClick={() => setShowVirtualFrameModal(true)}
            className="group relative flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e40af] px-5 py-4 text-left text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(37,99,235,0.35)] overflow-hidden border border-blue-900/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB]/80 backdrop-blur-sm relative z-10 shrink-0">
              <Monitor size={18} />
            </div>
            <span className="relative z-10">Send to Virtual Frame</span>
            <ArrowUpRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100 relative z-10" />
          </button>
        </div>
      </div>

      {/* Virtual Frame Modal */}
      {showVirtualFrameModal && (
        <EnterpriseVirtualFrameModal onClose={() => setShowVirtualFrameModal(false)} />
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-[#e8eaef] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
              <h2 className="font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Units & Active Frames</h2>
              <button className="text-xs font-semibold text-[#182a4a] hover:underline">View all</button>
            </div>
            <div className="divide-y divide-[#f5f5f8]">
              {units.map((unit) => (
                <div key={unit.id} className="group flex items-center justify-between px-6 py-3.5 transition hover:bg-blue-50/40">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${unit.status === "active" ? "bg-emerald-500" : unit.status === "scheduled" ? "bg-amber-500" : "bg-gray-400"}`}>
                      {unit.frames}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{unit.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{unit.collectionName}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${unit.status === "active" ? "bg-emerald-50 text-emerald-600" : unit.status === "scheduled" ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                    {unit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[#e8eaef] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
              <h2 className="font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Upcoming Events</h2>
              <Calendar size={16} className="text-gray-400" />
            </div>
            <div className="divide-y divide-[#f5f5f8] max-h-[400px] overflow-y-auto">
              {events.map((ev) => (
                <div key={ev.id} className="group px-6 py-4 transition hover:bg-blue-50/40">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-gray-800">{ev.title}</p>
                    {ev.recurring && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold text-[#2563EB] uppercase">{ev.frequency}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>
                    <span>{ev.date}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-gray-400 font-medium flex items-center gap-1">
                    <ImageIcon size={11} /> {ev.collectionName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#e8eaef] bg-white p-5">
            <h3 className="mb-3 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Today's Schedule</h3>
            <div className="space-y-2.5">
              {[
                { time: "06:00 – 10:00", label: "Morning Zen", collection: "Nature Serenity" },
                { time: "10:00 – 14:00", label: "Midday Gallery", collection: "Impressionist Masters" },
                { time: "18:00 – 22:00", label: "Evening Ambiance", collection: "Abstract Horizons" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2.5">
                  <Play size={12} className="text-[#182a4a]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-700">{s.label}</p>
                    <p className="text-[10px] text-gray-400">{s.time} · {s.collection}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
