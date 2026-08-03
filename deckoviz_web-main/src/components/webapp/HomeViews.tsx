import { useState, useEffect } from "react";
import type React from "react";
import {
  Calendar,
  Clock,
  Heart,
  Image as ImageIcon,
  Layers,
  Music,
  Play,
  Settings,
  Star,
  Users,
  Volume2,
  Mic,
  FileText,
  Film,
  BookOpen,
  Repeat,
  Plus,
  ChevronRight,
  Monitor,
  X,
  Trash2
} from "lucide-react";
import { homeApi } from "../../lib/homeApi";

/* ======================== MODAL ======================== */
function Modal({ title, isOpen, onClose, children, onSubmit, submitLabel = "Save" }: { title: string; isOpen: boolean; onClose: () => void; children: React.ReactNode; onSubmit: () => void; submitLabel?: string; }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><X size={20} className="text-gray-500" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="p-6 space-y-4">
            {children}
          </div>
          <div className="p-6 bg-gray-50 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#182a4a] to-[#2563EB] shadow-lg hover:scale-105 transition-transform">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ======================== EMPTY STATE ======================== */
function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white/50 border border-white/60 rounded-3xl mt-4 shadow-sm h-[300px]">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#182a4a]/10 to-blue-100 flex items-center justify-center text-[#182a4a] mb-5 shadow-inner">
        {icon}
      </div>
      <h3 className="text-[17px] font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && (
        <button onClick={onAction} className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#182a4a] to-[#2563EB] shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* ======================== SKELETON ======================== */
function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/40 border border-white/30 animate-pulse">
          <div className="w-12 h-12 rounded-xl bg-gray-200/60 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200/60 rounded-full w-1/3" />
            <div className="h-3 bg-gray-200/60 rounded-full w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ======================== VIEW HEADER ======================== */
export function ViewHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6" style={{ background: "linear-gradient(135deg, #182a4a 0%, #1e3a5f 50%, #2563EB 100%)", boxShadow: "0 12px 40px rgba(24,42,74,0.3)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">{icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h1>
          <p className="text-blue-200/70 text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

/* ======================== DAILY QUEUE ======================== */
export function HomeDailyQueueView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ startTime: "", collectionName: "" });

  const extractList = (res: any) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.queue)) return res.queue;
    if (Array.isArray(res.items)) return res.items;
    if (Array.isArray(res.rows)) return res.rows;
    if (Array.isArray(res.data)) return res.data;
    return [];
  };

  const fetchQueue = () => {
    setLoading(true);
    homeApi.getDailyQueue()
      .then((res) => {
        const apiItems = extractList(res);
        setData(apiItems);
      })
      .catch((err) => {
        console.error("[DailyQueue] Error fetching from Firebase:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchQueue(), []);

  const handleAddSlot = async () => {
    if (!formData.startTime) {
      alert("Please select a time for the slot.");
      return;
    }
    const title = formData.collectionName.trim() || `Daily Slot (${formData.startTime})`;
    const today = new Date();
    const [hours, minutes] = formData.startTime.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      today.setHours(hours, minutes, 0, 0);
    }

    const payload = {
      id: `slot-${Date.now()}`,
      title,
      collectionName: title,
      startTime: today.toISOString(),
      position: data.length + 1,
      active: true,
    };

    try {
      const res = await homeApi.addDailyQueueSlot(payload);
      const createdSlot = (res && res.id) ? res : payload;
      setData(prev => [...prev, createdSlot]);
      setShowModal(false);
      setFormData({ startTime: "", collectionName: "" });
    } catch (e) {
      console.error("[DailyQueue] Error saving slot to Firebase:", e);
      alert("Failed to save slot to Firebase.");
    }
  };

  const handleDeleteSlot = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await homeApi.deleteDailyQueueSlot(id);
      setData(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error("[DailyQueue] Error deleting slot from Firebase:", err);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Daily Queue" subtitle="Schedule collections throughout your day on Deckoviz" icon={<Clock size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Today's Schedule</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md hover:opacity-90 transition-opacity">Quick Display</button>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-full text-xs font-semibold bg-white/60 text-gray-600 border border-gray-200 hover:bg-white transition-colors"><Plus size={12} className="inline mr-1" />Add Slot</button>
        </div>
      </div>
      
      {loading ? (
        <SkeletonLoader />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Clock size={32} />} 
          title="No queue scheduled" 
          description="Your daily queue is currently empty. Schedule collections to automatically rotate artworks throughout your day." 
          actionLabel="Add Collection to Queue" 
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="space-y-3">
          {data.map((slot, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border transition-all bg-white/50 border-white/60 hover:bg-white hover:shadow-sm">
              <div className="w-2 h-2 rounded-full shrink-0 bg-blue-500" />
              <div className="w-40 shrink-0">
                <p className="text-sm font-bold text-gray-600">{slot.startTime ? new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Time not set"}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{slot.collectionName || "Collection Slot"}</p>
              </div>
              <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#182a4a] hover:border-[#182a4a] transition-colors"><Play size={12} /></button>
              <button onClick={(e) => handleDeleteSlot(slot.id, e)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      )}

      <Modal title="Add Daily Slot" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddSlot}>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Time</label>
          <input type="time" required value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Collection Name (Optional)</label>
          <input type="text" placeholder="e.g. Morning Zen" value={formData.collectionName} onChange={e => setFormData({...formData, collectionName: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </Modal>
    </div>
  );
}

/* ======================== EVENTS ======================== */
export function HomeEventsView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", date: "" });

  const fetchEvents = () => {
    setLoading(true);
    homeApi.getEvents()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchEvents(), []);

  const handleCreateEvent = async () => {
    try {
      await homeApi.createEvent(formData);
      setShowModal(false);
      setFormData({ title: "", date: "" });
      fetchEvents();
    } catch (e) {
      console.error(e);
      alert("Failed to create event");
    }
  };

  const handleDeleteEvent = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setData(data.filter(d => d.id !== id));
      await homeApi.deleteEvent(id);
    } catch (err) {
      console.error(err);
      fetchEvents();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Events" subtitle="Schedule collections for future occasions and special moments" icon={<Calendar size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Upcoming Events</h2>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1 hover:opacity-90 transition-opacity"><Plus size={12} /> New Event</button>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Calendar size={32} />} 
          title="No upcoming events" 
          description="Schedule a special art collection to display for your next birthday party, dinner, or gathering." 
          actionLabel="Create Event" 
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="space-y-3">
          {data.map((event, i) => {
            const parsedDate = event.date ? new Date(event.date) : null;
            const isValidDate = parsedDate && !isNaN(parsedDate.getTime());
            return (
              <div key={event.id || i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#182a4a]/10 to-blue-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#182a4a] leading-none">{isValidDate ? parsedDate.getDate() : "-"}</span>
                  <span className="text-[9px] font-bold text-blue-500 uppercase">{isValidDate ? parsedDate.toLocaleString('default', { month: 'short' }) : "TBD"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800">{event.title || event.name || "Event"}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={10} /> {isValidDate ? parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : event.date || "Time not set"}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteEvent(event.id, e)}
                  className="p-2 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <Modal title="Create New Event" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateEvent}>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Event Title</label>
          <input type="text" required placeholder="e.g. Dinner Party" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Date & Time</label>
          <input type="datetime-local" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </Modal>
    </div>
  );
}

/* ======================== RITUALS (No Backend API yet) ======================== */
export function HomeRitualsView() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Rituals" subtitle="Set recurring daily and weekly scheduled events" icon={<Repeat size={24} />} />
      <EmptyState 
        icon={<Repeat size={32} />} 
        title="No active rituals" 
        description="Rituals allow you to set recurring collections (e.g. Morning Zen every Monday at 7am). Start building your weekly ambiance!" 
        actionLabel="Create a Ritual" 
        onAction={() => setShowModal(true)}
      />
      <Modal title="Create Ritual" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={() => { alert("Rituals feature coming soon!"); setShowModal(false); }}>
        <p className="text-sm text-gray-600 text-center py-4">The Rituals automation engine is currently in development. Check back soon!</p>
      </Modal>
    </div>
  );
}

/* ======================== MEMBERS ======================== */
export function HomeMembersView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "Resident", preferences: "" });

  const fetchMembers = () => {
    setLoading(true);
    homeApi.getMembers()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchMembers(), []);

  const handleAddMember = async () => {
    try {
      await homeApi.createMember(formData);
      setShowModal(false);
      setFormData({ name: "", role: "Resident", preferences: "" });
      fetchMembers();
    } catch (e) {
      console.error(e);
      alert("Failed to add member");
    }
  };

  const handleDeleteMember = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setData(data.filter(d => d.id !== id));
      await homeApi.deleteMember(id);
    } catch (err) {
      console.error(err);
      fetchMembers();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Members of Home" subtitle="Manage household members, their preferences and notes" icon={<Users size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{data.length} Members</h2>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1 hover:opacity-90 transition-opacity"><Plus size={12} /> Add Member</button>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Users size={32} />} 
          title="No members added" 
          description="Add your family members or housemates to personalize Deckoviz to their art and music preferences." 
          actionLabel="Invite Member" 
          onAction={() => setShowModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all relative">
              <button onClick={(e) => handleDeleteMember(m.id, e)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white font-bold text-lg shadow-md">{m.name ? m.name[0] : "U"}</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{m.name || "Member"}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#182a4a] font-semibold">{m.role || "Resident"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preferences</span><p className="text-xs text-gray-600">{m.preferences || "None set"}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal title="Add Member" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddMember}>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
          <input type="text" required placeholder="e.g. Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Role</label>
          <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>Resident</option>
            <option>Guest</option>
            <option>Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Preferences</label>
          <textarea placeholder="e.g. Loves abstract art and jazz music" value={formData.preferences} onChange={e => setFormData({...formData, preferences: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-20" />
        </div>
      </Modal>
    </div>
  );
}

/* ======================== CURATIONS & COLLECTIONS ======================== */
export function HomeCurationsView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [curTab, setCurTab] = useState<"foryou" | "general" | "collections">("foryou");

  useEffect(() => {
    setLoading(true);
    if (curTab === "collections") {
      homeApi.getCollections()
        .then(setData)
        .catch(() => setData([]))
        .finally(() => setLoading(false));
    } else {
      homeApi.getCurations(curTab === "foryou" ? "vizzy" : "deckoviz")
        .then(setData)
        .catch(() => setData([]))
        .finally(() => setLoading(false));
    }
  }, [curTab]);

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Curations & Collections" subtitle="Explore curated art or manage your personal collections" icon={<Star size={24} />} />
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setCurTab("foryou")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${curTab === "foryou" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>
          Curated For You
        </button>
        <button onClick={() => setCurTab("general")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${curTab === "general" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>
          Deckoviz Curations
        </button>
        <button onClick={() => setCurTab("collections")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${curTab === "collections" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>
          My Collections
        </button>
      </div>

      {loading ? (
        <SkeletonLoader count={4} />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Star size={32} />} 
          title={curTab === "collections" ? "No collections found" : "No curations found"} 
          description={curTab === "collections" ? "You haven't created any personal collections yet." : "Check back later for newly curated collections from Deckoviz or tailored by Vizzy."} 
        />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-white/50 border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
              <div className="relative h-36 overflow-hidden">
                <img src={item.cover || item.imageUrl || "/images/webapp/figma/abstract-wave-wide.jpg"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-4"><p className="text-sm font-bold text-gray-800">{item.title || item.name}</p><p className="text-[11px] text-gray-400 mt-0.5">{item.items || 0} pieces</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================== MUSIC DASHBOARD ======================== */
export function HomeMusicDashboardView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    homeApi.getMusic()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Mocking generation since API endpoint isn't fully set up yet
    setTimeout(() => {
      alert(`AI is generating music based on: "${prompt}"\n(Backend endpoint coming soon!)`);
      setPrompt("");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Music Dashboard" subtitle="Generate music and songs, and manage your created music pieces" icon={<Music size={24} />} />
      <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">Generate New Music</h3>
        <div className="flex gap-3">
          <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleGenerate()} placeholder="Describe the music you'd like (e.g. relaxing piano with rain sounds)..." className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200" />
          <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100">
            {isGenerating ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Music size={14} />}
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
      
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-8">Previously Created</h3>
      {loading ? (
        <SkeletonLoader />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Music size={32} />} 
          title="No music created yet" 
          description="Use the input above to generate your first AI music track for your space." 
        />
      ) : (
        <div className="space-y-2">
          {data.map((track, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all group">
              <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"><Play size={14} className="ml-0.5" /></button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{track.title}</p>
                <p className="text-[11px] text-gray-400">{track.genre || track.category} - {track.duration}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-300 group-hover:text-blue-500 transition-colors"><Volume2 size={16} /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================== MUSIC LIBRARY ======================== */
export function HomeMusicLibraryView() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi.getMusic()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Music Library" subtitle="Explore the Deckoviz library of music and ambient sounds" icon={<Music size={24} />} />
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Deckoviz Tracks</h3>
      
      {loading ? (
        <SkeletonLoader count={4} />
      ) : data.length === 0 ? (
        <EmptyState 
          icon={<Music size={32} />} 
          title="Library empty" 
          description="No tracks found in the Deckoviz library at this moment." 
        />
      ) : (
        <div className="space-y-2">
          {data.map((track, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
              <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md"><Play size={12} className="ml-0.5" /></button>
              <p className="text-sm font-semibold text-gray-800 flex-1">{track.title}</p>
              <Plus size={16} className="text-gray-300 hover:text-[#2563EB] cursor-pointer transition-colors" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================== NARRATIONS ======================== */
export function HomeNarrationsView() {
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Narrations" subtitle="Generate narrations with many voice options, manage your recordings" icon={<Mic size={24} />} />
      <EmptyState 
        icon={<Mic size={32} />} 
        title="No narrations available" 
        description="The voice and narration generation feature is currently being updated. Please check back later." 
        actionLabel="Request Early Access"
        onAction={() => alert("Your request for early access has been recorded!")}
      />
    </div>
  );
}

/* ======================== SAVED NOTES ======================== */
export function HomeSavedNotesView() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Saved Notes & Templates" subtitle="AI workspace for content and text-based creation" icon={<FileText size={24} />} />
      <EmptyState 
        icon={<FileText size={32} />} 
        title="No notes or templates" 
        description="Your AI workspace is empty. Create templates to standardize your art generation prompts or write notes about your collections." 
        actionLabel="Create Note"
        onAction={() => setShowModal(true)}
      />
      <Modal title="Create Note" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={() => { alert("Note saved!"); setShowModal(false); }}>
        <textarea placeholder="Start typing your ideas here..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-32" />
      </Modal>
    </div>
  );
}

/* ======================== SHORT FILM SUITE ======================== */
export function HomeShortFilmView() {
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Short Film Suite" subtitle="Create short films using your collections, artwork, music, and narrations" icon={<Film size={24} />} />
      <EmptyState 
        icon={<Film size={32} />} 
        title="No films created yet" 
        description="Combine your generated art, music, and voiceovers into a breathtaking short film for your display." 
        actionLabel="Start New Project"
        onAction={() => alert("Opening Short Film Editor...")}
      />
    </div>
  );
}

/* ======================== CREATIVE JOURNAL ======================== */
export function HomeCreativeJournalView() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Creative Journal" subtitle="Document your creative journey, ideas, and reflections" icon={<BookOpen size={24} />} />
      <EmptyState 
        icon={<BookOpen size={32} />} 
        title="Journal is empty" 
        description="Write down your creative thoughts, art inspiration, or feedback from your guests about your displayed art." 
        actionLabel="Write First Entry"
        onAction={() => setShowModal(true)}
      />
      <Modal title="New Journal Entry" isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={() => { alert("Entry saved to your journal!"); setShowModal(false); }}>
        <input type="text" placeholder="Entry Title" className="w-full px-4 py-2 mb-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        <textarea placeholder="Dear journal..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-32" />
      </Modal>
    </div>
  );
}

/* ======================== SETTINGS ======================== */
export function HomeSettingsView() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    homeApi.getSettings()
      .then(setData)
      .catch(() => setData({})) // Default to empty object instead of null to prevent map errors
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (section: string, key: string, currentVal: boolean) => {
    const newVal = !currentVal;
    
    // Optimistic UI update
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: newVal
      }
    }));

    try {
      await homeApi.updateSettings({ section, settings: { [key]: newVal } });
    } catch (e) {
      console.error(e);
      // Revert on failure
      setData((prev: any) => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [key]: currentVal
        }
      }));
      alert("Failed to update setting");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Settings & Preferences" subtitle="Customise your Home preferences and Vizzy preferences" icon={<Settings size={24} />} />
      
      {loading ? (
        <SkeletonLoader count={5} />
      ) : !data || Object.keys(data).length === 0 ? (
        <EmptyState 
          icon={<Settings size={32} />} 
          title="Could not load settings" 
          description="We couldn't retrieve your settings from the server. Please check your connection." 
          actionLabel="Retry"
          onAction={() => { setLoading(true); homeApi.getSettings().then(setData).finally(() => setLoading(false)); }}
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(data).map(([section, settings]: [string, any]) => (
            <div key={section}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{section.replace(/_/g, ' ')}</h3>
              <div className="rounded-2xl bg-white/50 border border-white/60 divide-y divide-gray-100 overflow-hidden shadow-sm">
                {Object.entries(settings).map(([key, val]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between p-5 hover:bg-white/60 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 capitalize">{key.replace(/_/g, ' ')}</p>
                    </div>
                    {typeof val === "boolean" ? (
                      <div 
                        onClick={() => handleToggle(section, key, val)}
                        className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${val ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB]" : "bg-gray-300"}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${val ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">{val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
