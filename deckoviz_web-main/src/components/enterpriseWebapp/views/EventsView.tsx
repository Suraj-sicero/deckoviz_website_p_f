import { useState } from "react";
import { Calendar, Plus, Clock, Repeat, Image as ImageIcon } from "lucide-react";
import { upcomingEvents, sampleCollections } from "../enterpriseData";

export default function EventsView() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "recurring">("all");
  const filtered = filter === "recurring" ? upcomingEvents.filter(e => e.recurring) : upcomingEvents;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Events</h1>
          <p className="text-sm text-gray-400 mt-1">Schedule and manage future collection events</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02]">
          <Plus size={16} /> New Event
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {(["all", "upcoming", "recurring"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-4 py-2 text-xs font-bold capitalize transition ${filter === f ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow" : "bg-white text-gray-500 border border-[#e8eaef] hover:border-blue-200"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Events Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((ev) => {
          const col = sampleCollections.find(c => c.title === ev.collection);
          return (
            <div key={ev.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#182a4a]/10 text-[#182a4a]">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800">{ev.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Clock size={11} /> {ev.time}</span>
                      <span>{ev.date}</span>
                    </div>
                  </div>
                </div>
                {ev.recurring && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-[#2563EB]">
                    <Repeat size={10} /> {ev.frequency}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <img src={col?.cover || "/images/webapp/figma/spiral-ocean.jpg"} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 flex items-center gap-1"><ImageIcon size={11} /> {ev.collection}</p>
                  <p className="text-[10px] text-gray-400">{col?.count || 0} artworks</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
