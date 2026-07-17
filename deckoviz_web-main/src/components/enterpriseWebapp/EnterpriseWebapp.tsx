import { useState } from "react";
import type React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  Brush,
  Building2,
  Calendar,
  Clock,
  Film,
  FolderOpen,
  Headphones,
  Home,
  Image as ImageIcon,
  Library,
  Menu,
  MessageSquare,
  Mic,
  Music,
  Palette,
  PenTool,
  Search,
  Settings,
  Star,
  Users,
  FileText,
} from "lucide-react";

import EnterpriseDashboardView from "./views/EnterpriseDashboardView";
import VGCView from "./views/VGCView";
import DailyQueueView from "./views/DailyQueueView";
import AllMediaView from "./views/AllMediaView";
import ExploreLibraryView from "./views/ExploreLibraryView";
import AllCollectionsView from "./views/AllCollectionsView";
import EnterpriseProfileView from "./views/EnterpriseProfileView";
import SettingsPreferencesView from "./views/SettingsPreferencesView";
import EventsView from "./views/EventsView";
import FrequentGuestsView from "./views/FrequentGuestsView";
import CMOCanvasView from "./views/CMOCanvasView";
import MusicDashboardView from "./views/MusicDashboardView";
import MusicLibraryView from "./views/MusicLibraryView";
import NarrationsView from "./views/NarrationsView";
import SavedNotesView from "./views/SavedNotesView";
import CurationsView from "./views/CurationsView";
import ShortFilmView from "./views/ShortFilmView";
import EnterpriseCreateCollectionView from "./views/EnterpriseCreateCollectionView";
import EnterpriseDeepProfileView from "./views/EnterpriseDeepProfileView";

type ViewType =
  | "dashboard"
  | "vgc"
  | "daily_queue"
  | "all_media"
  | "explore_library"
  | "all_collections"
  | "profile"
  | "settings"
  | "events"
  | "frequent_guests"
  | "cmo_canvas"
  | "music_dashboard"
  | "music_library"
  | "narrations"
  | "saved_notes"
  | "curations"
  | "short_film"
  | "create_collection"
  | "deep_profile";

/* ── Sidebar quick-access items (5 main + 2 bottom) ── */
const sidebarMain: { icon: React.ReactNode; label: string; view: ViewType }[] = [
  { icon: <Home size={20} />, label: "Dashboard", view: "dashboard" },
  { icon: <Brush size={20} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <Clock size={20} />, label: "Daily Queue", view: "daily_queue" },
  { icon: <ImageIcon size={20} />, label: "All Media", view: "all_media" },
  { icon: <Library size={20} />, label: "Explore Library", view: "explore_library" },
];

/* ── Dropdown menu items ── */
const menuItems: { icon: React.ReactNode; label: string; view: ViewType }[] = [
  { icon: <Home size={15} />, label: "Enterprise Dashboard", view: "dashboard" },
  { icon: <Brush size={15} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <Palette size={15} />, label: "CMO Canvas", view: "cmo_canvas" },
  { icon: <FolderOpen size={15} />, label: "All Collections", view: "all_collections" },
  { icon: <ImageIcon size={15} />, label: "All Media", view: "all_media" },
  { icon: <Building2 size={15} />, label: "Enterprise Profile", view: "profile" },
  { icon: <Settings size={15} />, label: "Preferences & Settings", view: "settings" },
  { icon: <Calendar size={15} />, label: "Events", view: "events" },
  { icon: <Clock size={15} />, label: "Daily Queue", view: "daily_queue" },
  { icon: <Users size={15} />, label: "Frequent Guests", view: "frequent_guests" },
  { icon: <Library size={15} />, label: "Explore Deckoviz Library", view: "explore_library" },
  { icon: <Star size={15} />, label: "Deckoviz Curations", view: "curations" },
  { icon: <Music size={15} />, label: "Music Dashboard", view: "music_dashboard" },
  { icon: <Headphones size={15} />, label: "Music Library", view: "music_library" },
  { icon: <Mic size={15} />, label: "Narrations", view: "narrations" },
  { icon: <FileText size={15} />, label: "Saved Notes & Templates", view: "saved_notes" },
  { icon: <Film size={15} />, label: "Short Film Suite", view: "short_film" },
  { icon: <PenTool size={15} />, label: "Create Collection", view: "create_collection" },
];

export default function EnterpriseWebapp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const pathParts = location.pathname.split("/");
  let currentSegment = pathParts[pathParts.length - 1];
  if (currentSegment === "enterprise-webapp" || currentSegment === "") {
    currentSegment = "dashboard";
  }
  const activeView = currentSegment as ViewType;

  const setActiveView = (view: ViewType) => {
    if (view === "vgc") {
      window.location.href = "/vizzy-canvas";
      return;
    }
    navigate(`/enterprise-webapp/${view}`);
  };

  const handleMenuClick = (view: ViewType) => {
    setActiveView(view);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111827]">
      {/* ── Floating Top Header (Uniform) ── */}
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <header
          className="pointer-events-auto flex items-center justify-between w-full max-w-7xl h-14 rounded-full px-2 md:px-4 transition-all duration-700 relative"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.5) 100%)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.9)",
          }}
        >
          {/* Glass specular highlight shine overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 40%)" }} />

          <div className="flex min-w-0 items-center gap-6 relative z-10 w-full justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-1.5 pl-2 hover:opacity-80 transition-opacity" aria-label="Go to main landing page">
                <img src="/images/deckovizlogo.png" alt="Deckoviz Symbol" className="h-9 sm:h-10 md:h-11 w-auto object-contain" />
                <img src="/images/bg_removed_logo.png" alt="Deckoviz Space Labs" className="h-9 sm:h-10 md:h-11 w-auto object-contain -ml-2" />
              </a>
              <button 
                onClick={() => setActiveView("dashboard")} 
                className="hidden sm:flex items-center ml-2 border-l-[1.5px] border-gray-400 pl-3 h-6 hover:opacity-80 transition-opacity"
                aria-label="Go to Enterprise Home"
              >
                <span className="text-[12px] font-black uppercase tracking-widest mt-0.5 text-[#182a4a]">Enterprise Suite</span>
              </button>
            </div>

            <div className="flex-1 flex justify-center hidden md:flex mx-4">
              <label className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={14} />
                <input
                  type="search"
                  placeholder="Search anything..."
                  className="h-[34px] w-full rounded-full border border-white/60 bg-white/50 backdrop-blur-md pl-9 pr-4 text-[12px] font-medium outline-none transition focus:border-blue-300 focus:bg-white/80 focus:shadow-[0_0_15px_rgba(37,99,235,0.15)] placeholder-gray-500 shadow-inner"
                />
              </label>
            </div>

            <div className="flex items-center gap-3 pr-2 text-[#6b7280]">
              <button className="relative transition hover:scale-110 p-2 rounded-full hover:bg-white/40" aria-label="Notifications">
                <Bell size={19} strokeWidth={1.7} className="text-[#182a4a]" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm border border-white">3</span>
              </button>

              <button onClick={() => setActiveView("profile")} className="flex items-center gap-2 transition hover:scale-110 p-1" aria-label="Profile">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-[0_2px_10px_rgba(37,99,235,0.3)]">
                  <Building2 size={15} />
                </div>
              </button>

              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="transition-all duration-300 p-2 rounded-xl border border-white/30 shadow-sm flex items-center justify-center bg-white/20 backdrop-blur-sm text-[#2563EB] hover:text-cyan-500 hover:bg-white/40 hover:border-white/50 ml-1"
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>

                {showMenu && (
                  <>
                    <button className="fixed inset-0 z-40 cursor-default" onClick={() => setShowMenu(false)} aria-label="Close menu" />
                    <div className="absolute right-0 top-[44px] z-50 w-[260px] max-h-[75vh] overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-2 shadow-2xl shadow-black/10">
                      <div className="px-4 py-2 border-b border-[#f0f0f4] mb-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Navigation</p>
                      </div>
                      {menuItems.map((item, index) => (
                        <button
                          key={`${item.label}-${index}`}
                          onClick={() => handleMenuClick(item.view)}
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold transition ${
                            item.view === activeView
                              ? "bg-[#182a4a]/10 text-blue-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                          }`}
                        >
                          <span className={item.view === activeView ? "text-[#182a4a]" : "text-gray-400"}>{item.icon}</span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ── Main Layout ── */}
      <main className="relative flex min-h-screen pt-24 px-4 w-full max-w-[1400px] mx-auto gap-6 pb-12">
        {/* Sidebar */}
        <aside className="sticky top-24 z-20 flex h-[calc(100vh-120px)] w-[80px] shrink-0 flex-col items-center justify-center bg-transparent">
          <div className="flex flex-col items-center gap-2.5 rounded-[32px] bg-white/70 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur-xl transition-all hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] border border-white/60">
            {/* Logo placeholder if needed or just padding */}
            <div className="h-2" />

            {/* Main Nav — 5 items */}
            {sidebarMain.map((item) => {
              const isActive = item.view === activeView;
              return (
                <button
                  key={item.view}
                  onClick={() => setActiveView(item.view)}
                  className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/30 scale-105 ring-4 ring-[#182a4a]/10"
                      : "bg-transparent text-[#9ca3af] hover:bg-white hover:text-[#182a4a] hover:shadow-md"
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0f172a] px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="my-1.5 h-[2px] w-[20px] rounded-full bg-[#e2e4ea]" />

            {/* Bottom — Profile & Settings */}
            <button
              onClick={() => setActiveView("profile")}
              className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${
                activeView === "profile"
                  ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/30 scale-105 ring-4 ring-[#182a4a]/10"
                  : "bg-transparent text-[#9ca3af] hover:bg-white hover:text-[#182a4a] hover:shadow-md"
              }`}
              aria-label="Enterprise Profile"
            >
              <Building2 size={18} />
              <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0f172a] px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl transition-all group-hover:opacity-100 group-hover:translate-x-1">
                Enterprise Profile
              </span>
            </button>
            <button
              onClick={() => setActiveView("settings")}
              className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${
                activeView === "settings"
                  ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/30 scale-105 ring-4 ring-[#182a4a]/10"
                  : "bg-transparent text-[#9ca3af] hover:bg-white hover:text-[#182a4a] hover:shadow-md"
              }`}
              aria-label="Settings & Preferences"
            >
              <Settings size={18} />
              <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0f172a] px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-xl transition-all group-hover:opacity-100 group-hover:translate-x-1">
                Settings & Preferences
              </span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <section className="min-w-0 flex-1">
          <div className="min-h-full">
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<EnterpriseDashboardView />} />
              <Route path="vgc" element={<VGCView />} />
              <Route path="daily_queue" element={<DailyQueueView />} />
              <Route path="all_media" element={<AllMediaView />} />
              <Route path="explore_library" element={<ExploreLibraryView />} />
              <Route path="all_collections" element={<AllCollectionsView />} />
              <Route path="profile" element={<EnterpriseProfileView onEditProfile={() => setActiveView("deep_profile")} />} />
              <Route path="settings" element={<SettingsPreferencesView />} />
              <Route path="events" element={<EventsView />} />
              <Route path="frequent_guests" element={<FrequentGuestsView />} />
              <Route path="cmo_canvas" element={<CMOCanvasView />} />
              <Route path="music_dashboard" element={<MusicDashboardView />} />
              <Route path="music_library" element={<MusicLibraryView />} />
              <Route path="narrations" element={<NarrationsView />} />
              <Route path="saved_notes" element={<SavedNotesView />} />
              <Route path="curations" element={<CurationsView />} />
              <Route path="short_film" element={<ShortFilmView />} />
              <Route path="create_collection" element={<EnterpriseCreateCollectionView />} />
              <Route path="deep_profile" element={<EnterpriseDeepProfileView onBack={() => setActiveView("profile")} />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </section>
      </main>
    </div>
  );
}
