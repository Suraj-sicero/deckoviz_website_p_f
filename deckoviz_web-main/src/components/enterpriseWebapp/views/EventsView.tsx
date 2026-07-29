import { useState, useEffect } from "react";
import { Plus, Search, Calendar as CalendarIcon, Clock, MoreVertical, Image as ImageIcon, Repeat } from "lucide-react";
import { enterpriseApi, EnterpriseEvent } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

export default function EventsView() {
  const [events, setEvents] = useState<EnterpriseEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enterpriseApi.getEvents().then((res) => {
      setEvents(res);
    }).catch((err) => {
      console.error("Events API error", err);
      setEvents([]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Events & Campaigns</h1>
          <p className="text-sm text-gray-400 mt-1">{events.length} upcoming events scheduled</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search events..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Plus size={16} /> Create Event
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarIcon}
          title="No upcoming events"
          description="Schedule events, promotions, or special campaigns to display unique content across your units."
          action={
            <button className="flex items-center gap-2 rounded-xl bg-[#182a4a] px-5 py-2.5 text-sm font-bold text-white shadow-md">
              <Plus size={16} /> Create First Event
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((ev) => (
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
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#182a4a]/10 flex items-center justify-center text-[#182a4a]">
                  <ImageIcon size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 flex items-center gap-1"><ImageIcon size={11} /> {ev.collectionName || "General"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
