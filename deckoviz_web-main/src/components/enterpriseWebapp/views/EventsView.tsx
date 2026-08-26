import { useState, useEffect } from "react";
import { Plus, Search, Calendar as CalendarIcon, Clock, MoreVertical, Image as ImageIcon, Repeat } from "lucide-react";
import { enterpriseApi, EnterpriseEvent } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

const DEFAULT_EVENTS: EnterpriseEvent[] = [
  { id: "ev-1", title: "Global Art Collectors Summit", date: "Aug 15, 2026", time: "18:00 EST", collectionName: "High-Curative Modernist Art", recurring: false, frequency: "One-Time", description: "Exclusive evening exhibition across all main lobby display arrays." },
  { id: "ev-2", title: "Evening Atmospheric Ambient Audio", date: "Daily", time: "20:00 - 23:00", collectionName: "Deckoviz Curated Chill & Classical", recurring: true, frequency: "Daily", description: "Automated spatial audio synchronization for corporate dining halls." },
  { id: "ev-3", title: "VIP Executive Retreat Showcase", date: "Sep 02, 2026", time: "10:00 EST", collectionName: "Metropolitan Abstract Masterpieces", recurring: false, frequency: "One-Time", description: "High-resolution corporate gallery broadcast." }
];

export default function EventsView() {
  const [events, setEvents] = useState<EnterpriseEvent[]>(DEFAULT_EVENTS);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    enterpriseApi.getEvents().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setEvents(res);
      }
    }).catch((err) => {
      console.error("Events API error", err);
    }).finally(() => setLoading(false));
  }, []);

  const handleCreateEvent = async () => {
    if (!title) return;
    const newEv: EnterpriseEvent = {
      id: `ev-${Date.now()}`,
      title,
      date: date || "Tomorrow",
      time: time || "14:00 EST",
      collectionName: collectionName || "Default Collection",
      recurring: false,
      frequency: "One-Time"
    };

    setEvents(prev => [newEv, ...prev]);
    setShowModal(false);
    setTitle("");
    setDate("");
    setTime("");
    setCollectionName("");

    try {
      await enterpriseApi.createEvent(newEv);
    } catch (err) {
      console.error("Failed to save event to Firebase", err);
    }
  };

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
