import { useState, useEffect } from "react";
import { Plus, MoreVertical, Search, Play, Clock, LayoutGrid, Loader2, ChevronDown, GripVertical, Trash2, Pause } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

const DEFAULT_QUEUE = [
  { id: "q-1", collectionName: "Morning Lobby Ambient Art", startTime: "08:00", endTime: "12:00", status: "active", units: "All Atrium Displays", duration: "4 hrs" },
  { id: "q-2", collectionName: "Metropolitan Abstract Masterpieces", startTime: "12:00", endTime: "16:00", status: "queued", units: "Executive Lounge Array", duration: "4 hrs" },
  { id: "q-3", collectionName: "Evening Aurora & Soundscapes", startTime: "16:00", endTime: "20:00", status: "queued", units: "Skyline Terrace Array", duration: "4 hrs" },
  { id: "q-4", collectionName: "Classical Renaissance Night Gallery", startTime: "20:00", endTime: "24:00", status: "queued", units: "Presidential Gallery Suite", duration: "4 hrs" },
];

export default function DailyQueueView() {
  const [queue, setQueue] = useState<any[]>(DEFAULT_QUEUE);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newColName, setNewColName] = useState("");
  const [newStart, setNewStart] = useState("09:00");
  const [newEnd, setNewEnd] = useState("13:00");

  useEffect(() => {
    enterpriseApi.getDailyQueue().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setQueue(res);
      }
    }).catch((err) => {
      console.error("Queue API error", err);
    }).finally(() => setLoading(false));
  }, []);

  const handleAddQueueSlot = async () => {
    if (!newColName) return;
    const newSlot = {
      id: `slot-${Date.now()}`,
      collectionName: newColName,
      startTime: newStart,
      endTime: newEnd,
      status: "queued",
      units: "All Units",
      duration: "4 hrs"
    };

    setQueue(prev => [newSlot, ...prev]);
    setShowAddModal(false);
    setNewColName("");

    try {
      await enterpriseApi.createDailyQueue(newSlot);
    } catch (err) {
      console.error("Failed to save daily queue slot to Firebase", err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Daily Queue</h1>
          <p className="text-sm text-gray-400 mt-1">{queue.length} collections scheduled today</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search schedule..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Plus size={16} /> Schedule
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-full rounded-2xl border border-gray-100 bg-gray-50/50 animate-pulse" />
          ))}
        </div>
      ) : queue.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title="No daily queue scheduled"
          description="Schedule collections to play across your units throughout the day."
          action={
            <button className="flex items-center gap-2 rounded-xl bg-[#182a4a] px-5 py-2.5 text-sm font-bold text-white shadow-md">
              <Plus size={16} /> Schedule First Collection
            </button>
          }
        />
      ) : (
        <>
          <div className="mb-8 rounded-xl border border-[#e8eaef] bg-white p-6">
            <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent flex items-center gap-2">
              <Clock size={16} className="text-[#182a4a]" /> Today's Timeline
            </h3>
            <div className="relative h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
              <div className="absolute flex h-full w-full">
                {queue.map((item, i) => {
                  const start = parseInt(item.startTime?.split(":")[0] || "0");
                  const end = parseInt(item.endTime?.split(":")[0] || "0");
                  const left = (start / 24) * 100;
                  const width = ((end < start ? end + 24 : end) - start) / 24 * 100;
                  const colors = ["bg-blue-500", "bg-emerald-500", "bg-[#2563EB]", "bg-amber-500", "bg-rose-500"];
                  return (
                    <div key={item.id} className={`absolute h-full ${colors[i % colors.length]} flex items-center justify-center text-[10px] font-bold text-white transition-all hover:opacity-90`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${item.collectionName} — ${item.startTime}–${item.endTime}`}>
                      <span className="truncate px-2">{item.collectionName}</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute bottom-0 flex w-full justify-between px-1 text-[8px] text-gray-300 font-semibold">
                {Array.from({length: 13}, (_, i) => <span key={i}>{`${(i*2).toString().padStart(2,'0')}:00`}</span>)}
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-[#e8eaef] bg-white">
            <div className="border-b border-[#f0f0f4] px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Scheduled Collections</h3>
          <button className="text-xs font-semibold text-gray-400 flex items-center gap-1 hover:text-gray-600">
            Sort by <ChevronDown size={12} />
          </button>
        </div>
        <div className="divide-y divide-[#f5f5f8]">
          {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin text-blue-500 w-8 h-8" /></div>
          ) : queue.map((item) => (
            <div key={item.id} className="flex items-center gap-5 px-6 py-4 transition hover:bg-blue-50/30 group">
              <GripVertical size={16} className="text-gray-300 cursor-grab" />
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
                {item.collectionName?.charAt(0) || "C"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-800">{item.collectionName}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.unitName || "General"} · {item.startTime} — {item.endTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100" title="Quick Display">
                  <Play size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100" title="Pause">
                  <Pause size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 opacity-0 group-hover:opacity-100" title="Remove">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
          </div>
        </>
      )}
    </div>
  );
}
