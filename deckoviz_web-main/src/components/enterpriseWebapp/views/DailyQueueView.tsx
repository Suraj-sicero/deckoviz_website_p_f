import { useState } from "react";
import { Clock, Play, Pause, Trash2, Plus, ChevronDown, GripVertical } from "lucide-react";
import { dailyQueueCollections, sampleCollections } from "../enterpriseData";

export default function DailyQueueView() {
  const [queue] = useState(dailyQueueCollections);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Daily Queue</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your daily display schedule across all units</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02]">
            <Plus size={16} /> Add to Queue
          </button>
        </div>
      </div>

      {/* Timeline Overview */}
      <div className="mb-8 rounded-xl border border-[#e8eaef] bg-white p-6">
        <h3 className="mb-4 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent flex items-center gap-2">
          <Clock size={16} className="text-[#182a4a]" /> Today's Timeline
        </h3>
        {/* Visual timeline bar */}
        <div className="relative h-14 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
          <div className="absolute flex h-full w-full">
            {queue.map((item, i) => {
              const start = parseInt(item.startTime.split(":")[0]);
              const end = parseInt(item.endTime.split(":")[0]);
              const left = (start / 24) * 100;
              const width = ((end - start) / 24) * 100;
              const colors = ["bg-blue-500", "bg-emerald-500", "bg-[#2563EB]", "bg-amber-500", "bg-rose-500"];
              return (
                <div
                  key={item.id}
                  className={`absolute h-full ${colors[i % colors.length]} flex items-center justify-center text-[10px] font-bold text-white transition-all hover:opacity-90`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${item.collection} — ${item.startTime}–${item.endTime}`}
                >
                  <span className="truncate px-2">{item.collection}</span>
                </div>
              );
            })}
          </div>
          {/* Time markers */}
          <div className="absolute bottom-0 flex w-full justify-between px-1 text-[8px] text-gray-300 font-semibold">
            {Array.from({length: 13}, (_, i) => <span key={i}>{`${(i*2).toString().padStart(2,'0')}:00`}</span>)}
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="rounded-xl border border-[#e8eaef] bg-white">
        <div className="border-b border-[#f0f0f4] px-6 py-4 flex items-center justify-between">
          <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Scheduled Collections</h3>
          <button className="text-xs font-semibold text-gray-400 flex items-center gap-1 hover:text-gray-600">
            Sort by <ChevronDown size={12} />
          </button>
        </div>
        <div className="divide-y divide-[#f5f5f8]">
          {queue.map((item) => {
            const collection = sampleCollections.find(c => c.title === item.collection);
            return (
              <div key={item.id} className="flex items-center gap-5 px-6 py-4 transition hover:bg-blue-50/30 group">
                <GripVertical size={16} className="text-gray-300 cursor-grab" />
                
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <img src={collection?.cover || "/images/webapp/figma/spiral-ocean.jpg"} alt="" className="h-full w-full object-cover" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-800">{item.collection}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.unit} · {item.startTime} — {item.endTime}</p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
