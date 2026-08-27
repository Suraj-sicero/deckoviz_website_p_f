import { useState, useEffect } from "react";
import type React from "react";
import { useAuth } from "../../context/AuthContext";
import { useWebSocket } from "../../hooks/useWebSocket";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Film,
  FolderOpen,
  FolderPlus,
  Check,
  Heart,
  Headphones,
  Home,
  Image as ImageIcon,
  ImagePlus,
  Layers,
  Library,
  Menu,
  MessageSquare,
  Mic,
  Monitor,
  Music,
  Palette,
  PenTool,
  Play,
  Plus,
  Send,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Upload,
  UploadCloud,
  Users,
  FileText,
  Repeat,
  Brush,
  Volume2,
  Wand2,
  X,
  CheckCircle2,
  Building2,
  Crown,
  Shield,
  Zap,
  Activity,
} from "lucide-react";

import AddImagesToCollectionView from "../webapp/views/AddImagesToCollectionView";
import AddMediaView from "../webapp/views/AddMediaView";
import AIPhotoManagerHomeView from "../webapp/views/AIPhotoManagerHomeView";
import AIPhotoManagerView from "../webapp/views/AIPhotoManagerView";
import ArtDrawerView from "../webapp/views/ArtDrawerView";
import CartView from "../webapp/views/CartView";
import ChoosePlanView from "../webapp/views/ChoosePlanView";
import CommentsView from "../webapp/views/CommentsView";
import FollowersFollowingView from "../webapp/views/FollowersFollowingView";
import MarketplaceView from "../webapp/views/MarketplaceView";
import MediaView from "../webapp/views/MediaView";
import PaymentDetailsView from "../webapp/views/PaymentDetailsView";
import PricingPlanView from "../webapp/views/PricingPlanView";
import ProductInfoView from "../webapp/views/ProductInfoView";
import SearchView from "../webapp/views/SearchView";
import { getUserAvatar } from "../../lib/userStorage";
import {
  HomeDailyQueueView,
  HomeEventsView,
  HomeRitualsView,
  HomeMembersView,
  HomeCurationsView,
  HomeMusicDashboardView,
  HomeMusicLibraryView,
  HomeNarrationsView,
  HomeSavedNotesView,
  HomeShortFilmView,
  HomeCreativeJournalView,
  HomeSettingsView,
} from "../webapp/HomeViews";

import EnterpriseProfileView from "./views/EnterpriseProfileView";
import EnterpriseDeepProfileView from "./views/EnterpriseDeepProfileView";
import EnterpriseCreateCollectionView from "./views/EnterpriseCreateCollectionView";
import {
  DrawingRoomView,
  VGCPlaceholder,
  VCCPlaceholder,
  DailyQueuePlaceholder,
  AllMediaPlaceholder,
  ExploreLibraryPlaceholder,
  VirtualFrameModal,
  AddContentTabs,
} from "../webapp/DeckovizWebapp";

type ViewType =
  | "drawing_room"
  | "vgc"
  | "create_collection"
  | "vcc"
  | "daily_queue"
  | "all_media"
  | "explore_library"
  | "settings"
  | "all_collections"
  | "deep_profile"
  | "events"
  | "rituals"
  | "members"
  | "curations"
  | "music_dashboard"
  | "music_library"
  | "narrations"
  | "saved_notes"
  | "short_film"
  | "creative_journal"
  | "profile"
  | "add"
  | "cart"
  | "pricing"
  | "payment"
  | "product_info"
  | "art_drawer"
  | "comments"
  | "subscription"
  | "marketplace"
  | "followers"
  | "following"
  | "ai_manager"
  | "collections"
  | "social"
  | "artists";

/* ── Sidebar items (7 main) ── */
const sidebarMain: { icon: React.ReactNode; label: string; view: ViewType }[] = [
  { icon: <Home size={20} />, label: "Enterprise Dashboard", view: "drawing_room" },
  { icon: <Brush size={20} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <PenTool size={20} />, label: "Create Enterprise Collection", view: "create_collection" },
  { icon: <Palette size={20} />, label: "VCC Studio", view: "vcc" },
  { icon: <Clock size={20} />, label: "Display Queue", view: "daily_queue" },
  { icon: <ImageIcon size={20} />, label: "Enterprise Media", view: "all_media" },
  { icon: <Library size={20} />, label: "Curated Library", view: "explore_library" },
];

/* ── Dropdown menu items (3 bars) ── */
const menuItems: { icon: React.ReactNode; label: string; view: ViewType; section?: string }[] = [
  { icon: <Home size={15} />, label: "Enterprise Suite", view: "drawing_room", section: "Core Platform" },
  { icon: <Brush size={15} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <FolderOpen size={15} />, label: "All Collections", view: "all_collections" },
  { icon: <ImageIcon size={15} />, label: "Enterprise Media", view: "all_media" },
  { icon: <Building2 size={15} />, label: "Company Profile & Identity", view: "profile" },
  { icon: <Settings size={15} />, label: "System Preferences", view: "settings", section: "Admin & Settings" },
  { icon: <Calendar size={15} />, label: "Scheduled Events", view: "events", section: "Displays & Automation" },
  { icon: <Repeat size={15} />, label: "Rituals & Schedules", view: "rituals" },
  { icon: <Clock size={15} />, label: "Display Queue (20 Max)", view: "daily_queue" },
  { icon: <Users size={15} />, label: "Members & Access Control", view: "members", section: "Organization" },
  { icon: <Library size={15} />, label: "Explore Deckoviz Library", view: "explore_library", section: "Content & Media" },
  { icon: <Star size={15} />, label: "Deckoviz Curations", view: "curations" },
  { icon: <Music size={15} />, label: "Music Dashboard", view: "music_dashboard", section: "Spatial Audio" },
  { icon: <Headphones size={15} />, label: "Music Library", view: "music_library" },
  { icon: <Mic size={15} />, label: "Voice Narrations", view: "narrations" },
  { icon: <FileText size={15} />, label: "Saved Templates & Notes", view: "saved_notes", section: "Enterprise Tools" },
  { icon: <Film size={15} />, label: "Short Film Suite", view: "short_film" },
  { icon: <PenTool size={15} />, label: "Create Collection", view: "create_collection" },
  { icon: <BookOpen size={15} />, label: "Creative Journal", view: "creative_journal" },
  { icon: <Shield size={15} />, label: "Master Admin Suite", view: "admin" as ViewType, section: "Admin" },
];

export default function EnterpriseWebapp() {
  const { user, openAuthModal } = useAuth();
  const [activeView, setActiveView] = useState<ViewType>("drawing_room");
  const [showMenu, setShowMenu] = useState(false);
  const [showVirtualFrameModal, setShowVirtualFrameModal] = useState(false);
  const [profileTick, setProfileTick] = useState(0);
  const ws = useWebSocket();

  useEffect(() => {
    const handleProfileUpdate = () => setProfileTick(t => t + 1);
    window.addEventListener("deckoviz-profile-updated", handleProfileUpdate);
    window.addEventListener("deckoviz-user-changed", handleProfileUpdate);
    return () => {
      window.removeEventListener("deckoviz-profile-updated", handleProfileUpdate);
      window.removeEventListener("deckoviz-user-changed", handleProfileUpdate);
    };
  }, []);

  const handleMenuClick = (view: ViewType) => {
    if (view === ("admin" as any)) {
      window.location.href = "/admin";
      return;
    }
    if (view === "vgc" || view === "vcc") {
      window.location.href = "/vizzy-canvas";
      return;
    }
    setActiveView(view);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f9] text-[#0f172a] font-sans selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient Lighting Gradients */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[160px] pointer-events-none" />

      {/* ── Spacious, Uncongested Glassmorphic Top Nav Header ── */}
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 md:px-8 pointer-events-none">
        <header
          className="pointer-events-auto flex items-center justify-between w-full max-w-[1440px] h-16 rounded-full px-5 md:px-8 transition-all duration-500 relative border border-white/90 shadow-[0_12px_40px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)]"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.6) 50%, rgba(255, 255, 255, 0.8) 100%)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
          }}
        >
          {/* Glass specular curved highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, transparent 45%)" }} />

          <div className="flex min-w-0 items-center justify-between relative z-10 w-full">
            {/* Left: Logo + Enterprise Badge */}
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-1.5 hover:opacity-90 transition-opacity" aria-label="Go to main landing page">
                <img src="/images/deckovizlogo.png" alt="Deckoviz Symbol" className="h-9 sm:h-10 w-auto object-contain" />
                <img src="/images/bg_removed_logo.png" alt="Deckoviz Space Labs" className="h-9 sm:h-10 w-auto object-contain -ml-2" />
              </a>

              <div className="hidden sm:flex items-center pl-4 border-l border-slate-200/90 h-7">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-blue-500/20">
                  <Crown size={13} className="text-amber-300" /> Enterprise Suite
                </span>
              </div>
            </div>

            {/* Right: Virtual Frame + Notifications + User Avatar DP + Menu */}
            <div className="flex items-center gap-4 text-slate-700">
              <button 
                onClick={() => setShowVirtualFrameModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-bold hover:bg-blue-100 transition shadow-sm"
              >
                <Monitor size={14} /> Virtual Frame
              </button>

              <button className="relative transition hover:scale-110 p-2.5 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 shadow-sm" aria-label="Notifications">
                <Bell size={18} strokeWidth={1.8} className="text-slate-700" />
                <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm ring-2 ring-white">2</span>
              </button>

              {/* User Avatar Badge */}
              {(() => {
                const headerUserName = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "Enterprise");
                const savedAvatar = getUserAvatar();
                const defaultInitialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(headerUserName)}&background=2563eb&color=fff&size=500`;
                const avatarSrc = savedAvatar || user?.avatar || defaultInitialsAvatar;

                return (
                  <button
                    onClick={() => {
                      if (user) {
                        setActiveView("profile");
                      } else {
                        openAuthModal();
                      }
                    }}
                    className="relative transition hover:scale-105 flex items-center justify-center rounded-full p-0.5 group focus:outline-none ring-2 ring-blue-500/30 hover:ring-blue-600 shadow-md"
                    title={user ? `Logged in as ${headerUserName}` : "Click to log in"}
                    aria-label="User Profile"
                  >
                    <img
                      src={avatarSrc}
                      alt={headerUserName}
                      className="h-9 w-9 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultInitialsAvatar;
                      }}
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </button>
                );
              })()}

              {/* Curvy Dropdown Menu Button */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="transition-all duration-300 p-2.5 rounded-full border border-slate-200 shadow-sm flex items-center justify-center bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 ml-1"
                  aria-label="Open menu"
                >
                  <Menu size={19} />
                </button>

                {showMenu && (
                  <>
                    <button className="fixed inset-0 z-40 cursor-default" onClick={() => setShowMenu(false)} aria-label="Close menu" />
                    <div className="absolute right-0 top-[54px] z-50 w-[300px] max-h-[82vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white/95 py-2 shadow-2xl backdrop-blur-2xl">
                      {/* Profile Banner */}
                      <div className="px-4 py-3.5 border-b border-slate-100 mb-1 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-t-3xl">
                        {(() => {
                          const headerUserName = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "Enterprise User");
                          const savedAvatar = getUserAvatar();
                          const defaultInitialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(headerUserName)}&background=2563eb&color=fff&size=500`;
                          const avatarSrc = savedAvatar || user?.avatar || defaultInitialsAvatar;

                          return (
                            <div className="flex items-center gap-3">
                              <img
                                src={avatarSrc}
                                alt={headerUserName}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/30"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = defaultInitialsAvatar;
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-slate-800 truncate">{headerUserName}</p>
                                <p className="text-[11px] text-slate-500 truncate">{user?.email || "concierge@deckoviz.com"}</p>
                              </div>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200">Enterprise</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                          <Crown size={10} /> Deckoviz Enterprise Platform
                        </p>
                      </div>
                      {menuItems.map((item, index) => (
                        <div key={`${item.label}-${index}`}>
                          {item.section && index > 0 && (
                            <div className="px-4 pt-3 pb-1 border-t border-slate-100 mt-1">
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.section}</p>
                            </div>
                          )}
                          <button
                            onClick={() => handleMenuClick(item.view)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold transition-all duration-200 ${
                              item.view === activeView
                                ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                          >
                            <span className={item.view === activeView ? "text-blue-600" : "text-slate-400"}>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ── Main Layout (pt-[105px] ensures clear vertical separation below top header) ── */}
      <main className="relative flex min-h-screen pt-[105px] px-4 w-full max-w-[1440px] mx-auto gap-6 pb-12">
        {/* Curvy Floating Sidebar (Positioned explicitly below header with top-[105px]) */}
        <aside className="sticky top-[105px] z-20 flex h-[calc(100vh-130px)] w-[78px] shrink-0 flex-col items-center justify-start pt-2">
          <div className="flex flex-col items-center gap-3 rounded-[32px] bg-white/80 p-3 shadow-[0_8px_30px_rgba(15,23,42,0.06)] border border-white/90 backdrop-blur-2xl ring-1 ring-black/5">
            {/* Main Nav — 7 items */}
            {sidebarMain.map((item) => {
              const isActive = item.view === activeView;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    if (item.view === "vgc") {
                      window.location.href = "/vizzy-canvas";
                    } else {
                      setActiveView(item.view);
                    }
                  }}
                  className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-blue-500/30 scale-105 ring-4 ring-blue-500/10"
                      : "bg-transparent text-slate-400 hover:bg-white hover:text-[#182a4a] hover:shadow-md"
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-[#0f172a] px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-2xl transition-all group-hover:opacity-100 group-hover:translate-x-1">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Divider */}
            <div className="my-1 h-[2px] w-[22px] rounded-full bg-slate-200" />

            {/* Bottom — Settings */}
            <button
              onClick={() => setActiveView("settings")}
              className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${
                activeView === "settings"
                  ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-blue-500/30 scale-105 ring-4 ring-blue-500/10"
                  : "bg-transparent text-slate-400 hover:bg-white hover:text-[#182a4a] hover:shadow-md"
              }`}
              aria-label="Settings & Preferences"
            >
              <Settings size={18} />
              <span className="pointer-events-none absolute left-[60px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-[#0f172a] px-3.5 py-2 text-[12px] font-bold text-white opacity-0 shadow-2xl transition-all group-hover:opacity-100 group-hover:translate-x-1">
                System Settings
              </span>
            </button>
          </div>
        </aside>

        {/* Content Area Container */}
        <section className="min-w-0 flex-1">
          <div className="min-h-full rounded-[2.5rem] border border-slate-200/80 bg-white/75 p-2 backdrop-blur-2xl shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
            {activeView === "drawing_room" && <DrawingRoomView onNavigate={setActiveView} onSendToFrame={() => setShowVirtualFrameModal(true)} />}
            {activeView === "vgc" && <VGCPlaceholder />}
            {activeView === "create_collection" && <EnterpriseCreateCollectionView />}
            {activeView === "vcc" && <VCCPlaceholder />}
            {activeView === "daily_queue" && <HomeDailyQueueView />}
            {activeView === "all_media" && <AllMediaPlaceholder />}
            {activeView === "explore_library" && <ExploreLibraryPlaceholder />}
            {activeView === "settings" && <HomeSettingsView />}
            {activeView === "all_collections" && <AIPhotoManagerView />}
            {activeView === "deep_profile" && <EnterpriseDeepProfileView onBack={() => setActiveView("profile")} />}
            {activeView === "events" && <HomeEventsView />}
            {activeView === "rituals" && <HomeRitualsView />}
            {activeView === "members" && <HomeMembersView />}
            {activeView === "curations" && <HomeCurationsView />}
            {activeView === "music_dashboard" && <HomeMusicDashboardView />}
            {activeView === "music_library" && <HomeMusicLibraryView />}
            {activeView === "narrations" && <HomeNarrationsView />}
            {activeView === "saved_notes" && <HomeSavedNotesView />}
            {activeView === "short_film" && <HomeShortFilmView />}
            {activeView === "creative_journal" && <HomeCreativeJournalView />}
            {activeView === "profile" && <EnterpriseProfileView onEditProfile={() => setActiveView("deep_profile")} />}
            {activeView === "marketplace" && <MarketplaceView mode="home" />}
            {activeView === "add" && <AddContentTabs />}
            {activeView === "cart" && <CartView />}
            {activeView === "pricing" && <ChoosePlanView />}
            {activeView === "payment" && <PaymentDetailsView />}
            {activeView === "product_info" && <ProductInfoView />}
            {activeView === "art_drawer" && <ArtDrawerView />}
            {activeView === "comments" && <CommentsView />}
            {activeView === "subscription" && <PricingPlanView onNavigate={setActiveView} />}
            {activeView === "ai_manager" && <AIPhotoManagerHomeView />}
            {activeView === "collections" && <AIPhotoManagerView />}
            {activeView === "followers" && <FollowersFollowingView mode="followers" onNavigate={setActiveView} />}
            {activeView === "following" && <FollowersFollowingView mode="following" onNavigate={setActiveView} />}
          </div>
        </section>
      </main>

      {/* Virtual Frame Modal */}
      {showVirtualFrameModal && (
        <VirtualFrameModal onClose={() => setShowVirtualFrameModal(false)} />
      )}
    </div>
  );
}
