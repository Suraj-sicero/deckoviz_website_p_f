import {
  Monitor,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  PenTool,
  FileImage,
  RefreshCw,
  ArrowUpRight,
  Clock,
  Layers,
  Play,
} from "lucide-react";
import { dashboardStats, unitsList, upcomingEvents, enterpriseProfile } from "../enterpriseData";

export default function EnterpriseDashboardView() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Welcome Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%)" }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-blue-300/80">Good evening</p>
            <h1 className="mb-2 text-[28px] font-bold text-white tracking-tight">{enterpriseProfile.name}</h1>
            <p className="text-sm text-white/50">{enterpriseProfile.subtitle} · {enterpriseProfile.location}</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm border border-white/10">
              <Monitor size={14} /> {enterpriseProfile.units} Units Active
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm border border-white/10">
              <Layers size={14} /> {enterpriseProfile.activeFrames} Frames Live
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-[#e8eaef] bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-[#182a4a]/5 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 right-0 h-20 w-20 rounded-full opacity-[0.06]" style={{ background: stat.color, transform: "translate(30%, -30%)" }} />
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className="text-[26px] font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-[11px] font-semibold" style={{ color: stat.color }}>{stat.delta}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 font-serif text-lg font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Create Art", icon: Sparkles, gradient: "from-[#182a4a] to-indigo-600" },
            { label: "Create Poster", icon: FileImage, gradient: "from-violet-500 to-purple-600" },
            { label: "Create Signage", icon: PenTool, gradient: "from-amber-500 to-orange-600" },
            { label: "Change Collection", icon: RefreshCw, gradient: "from-emerald-500 to-teal-600" },
          ].map((act) => (
            <button
              key={act.label}
              className={`group flex items-center gap-3 rounded-xl bg-gradient-to-br ${act.gradient} px-5 py-4 text-left text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <act.icon size={18} />
              </div>
              {act.label}
              <ArrowUpRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Units & Frames — Left */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-[#e8eaef] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
              <h2 className="font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Units & Active Frames</h2>
              <button className="text-xs font-semibold text-[#182a4a] hover:underline">View all</button>
            </div>
            <div className="divide-y divide-[#f5f5f8]">
              {unitsList.map((unit) => (
                <div key={unit.id} className="group flex items-center justify-between px-6 py-3.5 transition hover:bg-blue-50/40">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white ${unit.status === "active" ? "bg-emerald-500" : unit.status === "scheduled" ? "bg-amber-500" : "bg-gray-400"}`}>
                      {unit.frames}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{unit.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{unit.collection}</p>
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

        {/* Upcoming Events — Right */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[#e8eaef] bg-white">
            <div className="flex items-center justify-between border-b border-[#f0f0f4] px-6 py-4">
              <h2 className="font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Upcoming Events</h2>
              <Calendar size={16} className="text-gray-400" />
            </div>
            <div className="divide-y divide-[#f5f5f8] max-h-[400px] overflow-y-auto">
              {upcomingEvents.map((ev) => (
                <div key={ev.id} className="group px-6 py-4 transition hover:bg-blue-50/40">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-bold text-gray-800">{ev.title}</p>
                    {ev.recurring && (
                      <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[9px] font-bold text-violet-600 uppercase">{ev.frequency}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>
                    <span>{ev.date}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-gray-400 font-medium flex items-center gap-1">
                    <ImageIcon size={11} /> {ev.collection}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule Quick Look */}
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
