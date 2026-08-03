import { useState, useRef, useCallback, useEffect } from "react";
import type React from "react";
import { useAuth } from "../../context/AuthContext";
import { useWebSocket } from "../../hooks/useWebSocket";
import { getAgents, getChats, sendMessage, createChat, getChat } from "../../lib/vgcApi";
import type { VGCAgent, VGCChatSummary, VGCMessage } from "../../lib/vgcApi";
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
} from "lucide-react";

import AddImagesToCollectionView from "./views/AddImagesToCollectionView";
import AddMediaView from "./views/AddMediaView";
import AIPhotoManagerHomeView from "./views/AIPhotoManagerHomeView";
import AIPhotoManagerView from "./views/AIPhotoManagerView";
import ArtDrawerView from "./views/ArtDrawerView";
import CartView from "./views/CartView";
import ChoosePlanView from "./views/ChoosePlanView";
import CommentsView from "./views/CommentsView";
import CreateCollectionView from "./views/CreateCollectionView";
import FollowersFollowingView from "./views/FollowersFollowingView";
import MarketplaceView from "./views/MarketplaceView";
import MediaView from "./views/MediaView";
import PaymentDetailsView from "./views/PaymentDetailsView";
import PricingPlanView from "./views/PricingPlanView";
import ProductInfoView from "./views/ProductInfoView";
import ProfileView from "./views/ProfileView";
import SearchView from "./views/SearchView";
import { setFrameImage } from "../../lib/frameStore";
import { webappApi } from "../../lib/webappApi";
import { homeApi } from "../../lib/homeApi";
import { getUserCollections, saveUserCollections, getUserMedia, saveUserMedia, getUserAvatar } from "../../lib/userStorage";
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
} from "./HomeViews";

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

/* ── Sidebar items (8 main) ── */
const sidebarMain: { icon: React.ReactNode; label: string; view: ViewType }[] = [
  { icon: <Home size={20} />, label: "Drawing Room", view: "drawing_room" },
  { icon: <Brush size={20} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <PenTool size={20} />, label: "Create Collection", view: "create_collection" },
  { icon: <Palette size={20} />, label: "VCC", view: "vcc" },
  { icon: <Clock size={20} />, label: "Daily Queue", view: "daily_queue" },
  { icon: <ImageIcon size={20} />, label: "All Media", view: "all_media" },
  { icon: <Library size={20} />, label: "Explore Library", view: "explore_library" },
];

/* ── Dropdown menu items (3 bars) ── */
const menuItems: { icon: React.ReactNode; label: string; view: ViewType; section?: string }[] = [
  { icon: <Home size={15} />, label: "Drawing Room", view: "drawing_room", section: "Core" },
  { icon: <Brush size={15} />, label: "Vizzy Creation Canvas", view: "vgc" },
  { icon: <FolderOpen size={15} />, label: "All Collections", view: "all_collections" },
  { icon: <ImageIcon size={15} />, label: "All Media", view: "all_media" },
  { icon: <Users size={15} />, label: "Deep User Profile", view: "deep_profile" },
  { icon: <Settings size={15} />, label: "Preferences & Settings", view: "settings", section: "Settings" },
  { icon: <Calendar size={15} />, label: "Events", view: "events", section: "Scheduling" },
  { icon: <Repeat size={15} />, label: "Rituals", view: "rituals" },
  { icon: <Clock size={15} />, label: "Daily Queue", view: "daily_queue" },
  { icon: <Users size={15} />, label: "Members of Home", view: "members", section: "People" },
  { icon: <Library size={15} />, label: "Explore Deckoviz Library", view: "explore_library", section: "Library" },
  { icon: <Star size={15} />, label: "Deckoviz Curations", view: "curations" },
  { icon: <Music size={15} />, label: "Music Dashboard", view: "music_dashboard", section: "Audio" },
  { icon: <Headphones size={15} />, label: "Music Library", view: "music_library" },
  { icon: <Mic size={15} />, label: "Narrations", view: "narrations" },
  { icon: <FileText size={15} />, label: "Saved Notes & Templates", view: "saved_notes", section: "Creative" },
  { icon: <Film size={15} />, label: "Short Film Suite", view: "short_film" },
  { icon: <PenTool size={15} />, label: "Create Collection", view: "create_collection" },
  { icon: <BookOpen size={15} />, label: "Creative Journal", view: "creative_journal" },
];

/* ── Drawing Room Quick Actions ── */
const quickActions: { icon: React.ReactNode; label: string; color: string; view: ViewType }[] = [
  { icon: <Brush size={16} />, label: "Create Art", color: "from-blue-500 to-indigo-600", view: "vgc" },
  { icon: <Layers size={16} />, label: "Create Poster", color: "from-cyan-500 to-blue-600", view: "vgc" },
  { icon: <Sparkles size={16} />, label: "Sequential Art", color: "from-[#182a4a] to-[#2563eb]", view: "creative_journal" },
  { icon: <ImagePlus size={16} />, label: "Change Collection", color: "from-blue-400 to-[#182a4a]", view: "all_collections" },
];

export default function DeckovizWebapp() {
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

  const getUserInitials = (u: any) => {
    const nameStr = u?.displayName || u?.name || u?.email;
    if (!nameStr) return "SP";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return nameStr.substring(0, 2).toUpperCase();
  };

  const handleMenuClick = (view: ViewType) => {
    if (view === "vgc" || view === "vcc") {
      window.location.href = "/vizzy-canvas";
      return;
    }
    setActiveView(view);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#111827]">
      {/* ── Floating Top Header ── */}
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
          {/* Glass specular highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-full" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 40%)" }} />

          <div className="flex min-w-0 items-center gap-6 relative z-10 w-full justify-between">
            {/* Left: Logo + Home Suite */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-1.5 pl-2 hover:opacity-80 transition-opacity" aria-label="Go to main landing page">
                <img src="/images/deckovizlogo.png" alt="Deckoviz Symbol" className="h-9 sm:h-10 md:h-11 w-auto object-contain" />
                <img src="/images/bg_removed_logo.png" alt="Deckoviz Space Labs" className="h-9 sm:h-10 md:h-11 w-auto object-contain -ml-2" />
              </a>
              <button
                onClick={() => setActiveView("drawing_room")}
                className="hidden sm:flex items-center ml-2 border-l-[1.5px] border-gray-400 pl-3 h-6 hover:opacity-80 transition-opacity"
                aria-label="Go to Home Suite"
              >
                <span className="text-[12px] font-black uppercase tracking-widest mt-0.5 text-[#182a4a]">Home Suite</span>
              </button>
            </div>

            {/* Right: Notifications + User Avatar DP + 3 bars */}
            <div className="flex items-center gap-3 pr-2 text-[#6b7280]">
              <button className="relative transition hover:scale-110 p-2 rounded-full hover:bg-white/40" aria-label="Notifications">
                <Bell size={19} strokeWidth={1.7} className="text-[#182a4a]" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm border border-white">2</span>
              </button>

              {/* User Display Picture Avatar Badge */}
              {(() => {
                const headerUserName = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "Creator");
                const savedAvatar = getUserAvatar();
                const defaultInitialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(headerUserName)}&background=3f5fe0&color=fff&size=500`;
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
                    className="relative transition hover:scale-105 flex items-center justify-center rounded-full p-0.5 group focus:outline-none"
                    title={user ? `Logged in as ${headerUserName}` : "Click to log in"}
                    aria-label="User Profile"
                  >
                    <img
                      src={avatarSrc}
                      alt={headerUserName}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-[#182a4a]/40 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultInitialsAvatar;
                      }}
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </button>
                );
              })()}

              {/* Dropdown Menu (3 bars) */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="transition-all duration-300 p-2 rounded-xl border border-white/30 shadow-sm flex items-center justify-center bg-white/20 backdrop-blur-sm text-[#182a4a] hover:text-blue-600 hover:bg-white/40 hover:border-white/50 ml-1"
                  aria-label="Open menu"
                >
                  <Menu size={18} />
                </button>

                {showMenu && (
                  <>
                    <button className="fixed inset-0 z-40 cursor-default" onClick={() => setShowMenu(false)} aria-label="Close menu" />
                    <div className="absolute right-0 top-[44px] z-50 w-[280px] max-h-[80vh] overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-2 shadow-2xl shadow-black/10">
                      {/* Logged-in User Profile Banner */}
                      <div className="px-4 py-3 border-b border-[#f0f0f4] mb-1 bg-gradient-to-br from-blue-50/80 to-indigo-50/40">
                        {(() => {
                          const headerUserName = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "Creator");
                          const savedAvatar = getUserAvatar();
                          const defaultInitialsAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(headerUserName)}&background=3f5fe0&color=fff&size=500`;
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
                                <p className="text-[13px] font-bold text-gray-800 truncate">{headerUserName}</p>
                                <p className="text-[11px] text-gray-500 truncate">{user?.email || "Logged in User"}</p>
                              </div>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold">Logged In</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="px-4 py-1.5 border-b border-[#f0f0f4] mb-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Deckoviz Home</p>
                      </div>
                      {menuItems.map((item, index) => (
                        <div key={`${item.label}-${index}`}>
                          {item.section && index > 0 && (
                            <div className="px-4 pt-3 pb-1 border-t border-gray-100 mt-1">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.section}</p>
                            </div>
                          )}
                          <button
                            onClick={() => handleMenuClick(item.view)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold transition ${item.view === activeView
                              ? "bg-[#182a4a]/10 text-[#182a4a]"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                              }`}
                          >
                            <span className={item.view === activeView ? "text-[#182a4a]" : "text-gray-400"}>{item.icon}</span>
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

      {/* ── Main Layout ── */}
      <main className="relative flex min-h-screen pt-24 px-4 w-full max-w-[1400px] mx-auto gap-6 pb-12">
        {/* Sidebar */}
        <aside className="sticky top-24 z-20 flex h-[calc(100vh-120px)] w-[80px] shrink-0 flex-col items-center justify-center bg-transparent">
          <div className="flex flex-col items-center gap-2.5 rounded-[32px] bg-white/70 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 backdrop-blur-xl transition-all hover:shadow-[0_8px_30px_rgba(24,42,74,0.12)] border border-white/60">
            <div className="h-2" />

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
                  className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${isActive
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

            {/* Bottom — Settings */}
            <button
              onClick={() => setActiveView("settings")}
              className={`group relative flex h-[44px] w-[44px] items-center justify-center rounded-[20px] transition-all duration-300 ${activeView === "settings"
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
            {activeView === "drawing_room" && <DrawingRoomView onNavigate={setActiveView} onSendToFrame={() => setShowVirtualFrameModal(true)} />}
            {activeView === "vgc" && <VGCPlaceholder />}
            {activeView === "create_collection" && <CreateCollectionView />}
            {activeView === "vcc" && <VCCPlaceholder />}
            {activeView === "daily_queue" && <HomeDailyQueueView />}
            {activeView === "all_media" && <AllMediaPlaceholder />}
            {activeView === "explore_library" && <ExploreLibraryPlaceholder />}
            {activeView === "settings" && <HomeSettingsView />}
            {activeView === "all_collections" && <AIPhotoManagerView />}
            {activeView === "deep_profile" && <ProfileView onNavigate={setActiveView} />}
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
            {activeView === "profile" && <ProfileView onNavigate={setActiveView} />}
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

/* ======================== VIRTUAL FRAME MODAL ======================== */
const MEDIA_SAMPLES = [
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

function VirtualFrameModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [selected, setSelected] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Read as data-URL so the image survives cross-route navigation
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setUploadPreview(dataUrl);
      setSelected(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleSend = () => {
    if (!selected) return;
    // Persist the image for the /webframe route
    setFrameImage(selected);
    setSent(true);
    // Open the webframe in a new tab so the user can see the result live
    setTimeout(() => {
      window.open("/webframe", "_blank");
      onClose();
    }, 1400);
  };

  const activeImage = selected;

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
              <p className="text-[11px] text-white/40">Replace the default artwork on your Deckoviz frame</p>
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
            <p className="text-white/50 text-sm text-center">Your image is now live on your Deckoviz Virtual Frame.</p>
          </div>
        ) : (
          <div className="px-7 pb-7">
            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {(["library", "upload"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); if (t === "library") { setUploadPreview(null); setSelected(null); } }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${tab === t
                    ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                    }`}
                >
                  {t === "library" ? "📁  My Media Library" : "⬆️  Upload from Device"}
                </button>
              ))}
            </div>

            <div className="flex gap-6">
              {/* Left panel */}
              <div className="flex-1 min-w-0">
                {tab === "library" ? (
                  <div className="grid grid-cols-4 gap-2.5 max-h-[280px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                    {MEDIA_SAMPLES.map((img) => (
                      <button
                        key={img}
                        onClick={() => setSelected(img)}
                        className={`relative aspect-square rounded-xl overflow-hidden group transition-all duration-200 ${selected === img
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
                  {activeImage ? (
                    <img src={activeImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Monitor size={24} className="text-white/15 mb-2" />
                      <p className="text-[10px] text-white/20 text-center px-3">Select an image to preview</p>
                    </div>
                  )}
                  {/* Frame overlay */}
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
                className={`flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ${selected
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

/* ======================== DRAWING ROOM VIEW ======================== */
function DrawingRoomView({ onNavigate, onSendToFrame }: { onNavigate: (v: ViewType) => void; onSendToFrame: () => void }) {
  const { user } = useAuth();
  const [userCollections, setUserCollections] = useState<any[]>([]);
  const [dailyQueue, setDailyQueue] = useState<any[]>([]);
  const [userArtworks, setUserArtworks] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const extractList = (res: any) => {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (Array.isArray(res.collections)) return res.collections;
      if (Array.isArray(res.artworks)) return res.artworks;
      if (Array.isArray(res.images)) return res.images;
      if (Array.isArray(res.items)) return res.items;
      if (Array.isArray(res.rows)) return res.rows;
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.queue)) return res.queue;
      return [];
    };

    async function loadData() {
      setLoadingData(true);
      try {
        const [colData, queueData, mediaData, vizzyData] = await Promise.allSettled([
          homeApi.getCollections(),
          homeApi.getDailyQueue(),
          webappApi.getMedia({ limit: 20 }),
          vizzyApi.getImages(),
        ]);
        if (isMounted) {
          let backendCols: any[] = [];
          if (colData.status === "fulfilled") {
            backendCols = extractList(colData.value);
          }
          setUserCollections(backendCols);

          if (queueData.status === "fulfilled") {
            const list = extractList(queueData.value);
            if (list.length > 0) setDailyQueue(list);
          }

          let fetchedImgs: string[] = [];
          if (vizzyData.status === "fulfilled") {
            const vList = extractList(vizzyData.value);
            vList.forEach((i: any) => {
              const url = i.url || i.imageUrl || i.mediaUrl;
              if (url) fetchedImgs.push(url);
            });
          }
          if (mediaData.status === "fulfilled") {
            const mList = extractList(mediaData.value);
            mList.forEach((i: any) => {
              const url = i.mediaUrl || i.url || i.imageUrl;
              if (url) fetchedImgs.push(url);
            });
          }

          const uniqueImgs = Array.from(new Set(fetchedImgs));
          if (uniqueImgs.length > 0) setUserArtworks(uniqueImgs);
        }
      } catch (err) {
        console.warn("[DrawingRoom] Failed to load home data", err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    }
    loadData();

    const handleCollectionsUpdated = () => {
      const updatedCols = getUserCollections();
      if (isMounted) setUserCollections(updatedCols);
    };
    window.addEventListener("deckoviz-collections-updated", handleCollectionsUpdated);
    window.addEventListener("deckoviz-user-changed", loadData);

    return () => {
      isMounted = false;
      window.removeEventListener("deckoviz-collections-updated", handleCollectionsUpdated);
      window.removeEventListener("deckoviz-user-changed", loadData);
    };
  }, [user]);

  const activeCollectionName = userCollections.length > 0 ? (userCollections[0]?.name || "My Personal Collection") : "Morning Serenity";

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-[2rem] p-8 md:p-10" style={{
        background: "linear-gradient(135deg, #182a4a 0%, #1e3a5f 40%, #2563EB 100%)",
        boxShadow: "0 20px 60px rgba(24,42,74,0.35)"
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 50%)" }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-blue-200/80 text-[11px] font-bold uppercase tracking-[0.3em] mb-2">
              {user ? `Logged in as ${user.name || user.email}` : "Your Deckoviz Home"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Drawing Room
            </h1>
            <p className="text-blue-100/70 text-sm max-w-lg leading-relaxed">
              Your creative command centre. Everything about your home's visual identity, collections, and experiences lives here.
            </p>
          </div>
          <button
            onClick={() => onNavigate("all_collections")}
            className="self-start md:self-center px-5 py-2.5 rounded-full text-xs font-bold text-[#182a4a] bg-white shadow-lg hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-2 shrink-0"
          >
            <FolderOpen size={15} />
            <span>Manage Collections</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                if (action.view === "vgc") {
                  window.location.href = "/vizzy-canvas";
                } else {
                  onNavigate(action.view);
                }
              }}
              className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(24,42,74,0.12)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#182a4a] transition-colors text-center">{action.label}</span>
            </button>
          ))}
          {/* Send to Virtual Frame */}
          <button
            id="send-to-virtual-frame-home"
            onClick={onSendToFrame}
            className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e40af] border border-blue-900/60 shadow-[0_4px_20px_rgba(37,99,235,0.15)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Monitor size={16} />
            </div>
            <span className="text-[13px] font-semibold text-blue-100 group-hover:text-white transition-colors relative z-10 text-center">Send to Virtual Frame</span>
          </button>
        </div>
      </div>

      {/* ── DAILY QUEUE SECTION ON HOME PAGE ── */}
      <SectionCard
        title="Today's Daily Queue"
        subtitle="Scheduled content rotating automatically on your Deckoviz displays"
        icon={<Clock size={18} />}
        accentColor="#2563EB"
        fullWidth
        onClick={() => onNavigate("daily_queue")}
      >
        <div className="mt-4">
          {dailyQueue.length === 0 ? (
            <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-blue-50/60 border border-blue-100/80 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">Your Daily Queue is Ready to Schedule</p>
                  <p className="text-xs text-gray-500">Auto-seeded queue active. Click to customize rotation times and collections.</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate("daily_queue"); }}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#182a4a] to-[#2563EB] shadow-md hover:scale-105 transition-all shrink-0"
              >
                Manage Queue Schedule →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {dailyQueue.slice(0, 3).map((slot: any, idx: number) => (
                <div key={slot.id || idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/70 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-blue-600">
                      {slot.startTime ? new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `Slot ${idx + 1}`}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{slot.title || slot.collectionName || "Active Artwork Rotation"}</p>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Play size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      {/* Current Collection + Favourites Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Collection */}
        <SectionCard
          title="Current Active Collection"
          subtitle={userCollections.length > 0 ? (userCollections[0]?.name || userCollections[0]?.title || "My Personal Collection") : "No Active Collection Yet"}
          icon={<Layers size={18} />}
          accentColor="#182a4a"
          onClick={() => onNavigate("all_collections")}
        >
          {userCollections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-gray-50/70 border border-dashed border-gray-200 mt-4 gap-3">
              <Layers className="size-8 text-blue-500/60" />
              <div>
                <p className="text-sm font-bold text-gray-800">No Collections Created</p>
                <p className="text-xs text-gray-500">Create your first personalized collection to start scheduling & displaying art.</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate("create_collection"); }}
                className="px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                + Create Collection
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {(() => {
                  const activeCol = userCollections[0];
                  const items: string[] = activeCol?.items?.map((i: any) => i.url || i.mediaUrl).filter(Boolean) || [];
                  const displayImgs = items.length >= 3 ? items.slice(0, 3) : items;

                  if (displayImgs.length === 0) {
                    return (
                      <div className="col-span-3 p-4 text-center text-xs text-gray-400 font-medium bg-gray-50 rounded-xl border border-gray-100">
                        Collection is empty. Add artworks to this collection!
                      </div>
                    );
                  }

                  return displayImgs.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-gray-100 bg-gray-100">
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ));
                })()}
              </div>
              <p className="text-xs text-gray-500 mt-3 font-medium">
                {userCollections[0]?.items?.length || userCollections[0]?.itemCount || 0} items in active collection • {userCollections.length} total collections
              </p>
            </>
          )}
        </SectionCard>

        {/* Favourite Collections */}
        <SectionCard title="Favourite Collections" icon={<Heart size={18} />} accentColor="#e11d48" onClick={() => onNavigate("all_collections")}>
          <div className="space-y-3 mt-4">
            {userCollections.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-gray-50/70 border border-dashed border-gray-200 gap-2">
                <Heart className="size-6 text-rose-400/60" />
                <p className="text-xs font-bold text-gray-700">No Favourite Collections</p>
                <p className="text-[11px] text-gray-400">Collections you create will be listed here for quick access.</p>
              </div>
            ) : (
              userCollections.slice(0, 3).map((col: any, i: number) => {
                const colName = col.name || col.title || "Untitled Collection";
                const count = col.items?.length || col.itemCount || 0;
                const thumbUrl = col.items?.[0]?.url || col.items?.[0]?.mediaUrl || "https://picsum.photos/seed/deckoviz-art/300/300";

                return (
                  <div key={col.id || i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                    <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                      <img src={thumbUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#182a4a] transition-colors truncate">{colName}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{count} artwork{count !== 1 ? "s" : ""}</p>
                    </div>
                    <Heart size={14} className="text-rose-400 fill-rose-400 shrink-0" />
                  </div>
                );
              })
            )}
          </div>
        </SectionCard>
      </div>

      {/* Favourite Artworks */}
      <SectionCard title="Favourite Artworks" icon={<Star size={18} />} accentColor="#f59e0b" fullWidth>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {(userArtworks.length > 0 ? userArtworks.slice(0, 4) : ["/images/herol (1).png", "/images/herol (2).png", "/images/herol (4).png", "/images/herol (8).png"]).map((img, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(24,42,74,0.2)] transition-all duration-500 hover:-translate-y-1">
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                <Heart size={14} className="text-rose-500 fill-rose-500" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* All Media Preview + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="All Media" icon={<ImageIcon size={18} />} accentColor="#2563EB" onClick={() => onNavigate("all_media")}>
          <div className="flex items-center gap-5 mt-4">
            {[
              { label: "Images", count: 142, color: "bg-blue-600" },
              { label: "Videos", count: 23, color: "bg-cyan-500" },
              { label: "Music", count: 38, color: "bg-indigo-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                <span className="text-xs text-gray-500">{stat.count} {stat.label}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {["/images/herol (9).png", "/images/herol (13).png", "/images/herol (15).png", "/images/herol (17).png"].map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Upcoming Events" icon={<Calendar size={18} />} accentColor="#059669" onClick={() => onNavigate("events")}>
          <div className="space-y-3 mt-4">
            {[
              { name: "Sunday Morning Jazz", date: "Jul 6, 2026 - 8:00 AM", collection: "Jazz Vibes" },
              { name: "Movie Night Setup", date: "Jul 8, 2026 - 7:00 PM", collection: "Cinema Classics" },
              { name: "Birthday Celebration", date: "Jul 12, 2026 - 6:00 PM", collection: "Celebration" },
            ].map((event, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                <p className="text-sm font-semibold text-gray-800">{event.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-[11px] text-gray-400">{event.date}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">{event.collection}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* ======================== SECTION CARD COMPONENT ======================== */
function SectionCard({
  title, subtitle, icon, accentColor, children, fullWidth, onClick,
}: {
  title: string; subtitle?: string; icon: React.ReactNode; accentColor: string;
  children: React.ReactNode; fullWidth?: boolean; onClick?: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(24,42,74,0.08)] transition-all duration-500 ${fullWidth ? 'col-span-full' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }} />

      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}>
            {icon}
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-gray-800">{title}</h3>
            {subtitle && <p className="text-[11px] text-gray-400 font-medium">{subtitle}</p>}
          </div>
        </div>
        {onClick && <span className="text-xs text-blue-500 font-semibold hover:underline">View all →</span>}
      </div>
      {children}
    </div>
  );
}

/* ======================== VIEW HEADER ======================== */
function ViewHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
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

/* ======================== VGC - GENERATIVE CHAT ======================== */
const VGC_AGENT_ICONS: Record<string, React.ReactNode> = {
  personal_artist: <Brush size={20} />,
  poster_creator: <Layers size={20} />,
  story_buddy: <Film size={20} />,
  curator: <Music size={20} />,
  journal_bud: <Mic size={20} />,
  visual_companion: <Eye size={20} />,
  vizzy_muse: <Wand2 size={20} />,
};

function VGCPlaceholder() {
  const { token, openAuthModal } = useAuth();
  const [agents, setAgents] = useState<VGCAgent[]>([]);
  const [chats, setChats] = useState<VGCChatSummary[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<VGCMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    getAgents(token).then(setAgents).catch(() => { });
    getChats(token).then(setChats).catch(() => { });
  }, [token]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!token) { openAuthModal(true); return; }
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg, timestamp: new Date().toISOString() }]);
    setIsLoading(true);
    try {
      const res = await sendMessage(token, userMsg, activeChatId ?? undefined);
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply, timestamp: new Date().toISOString() }]);
      if (!activeChatId && res.chatId) {
        setActiveChatId(res.chatId);
        getChats(token).then(setChats).catch(() => { });
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again.", timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentClick = async (agent: VGCAgent) => {
    setActiveChatId(null);
    setMessages([{ role: "assistant", content: `Hi! I'm your ${agent.name}. ${agent.description} How can I help you today?`, timestamp: new Date().toISOString() }]);
    setInput("");
  };

  const handleChatClick = async (chat: VGCChatSummary) => {
    if (!token) return;
    setActiveChatId(chat.id);
    setIsLoading(true);
    try {
      const detail = await getChat(token, chat.id);
      setMessages(JSON.parse(detail.messages || "[]"));
    } catch {
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayAgents = agents.length > 0
    ? agents.map((a) => ({ ...a, icon: VGC_AGENT_ICONS[a.id] || <Sparkles size={20} /> }))
    : [
      { id: "personal_artist", name: "Art Generator", description: "Create unique artworks from text prompts", icon: <Brush size={20} />, capabilities: [], tone: "" },
      { id: "poster_creator", name: "Poster Studio", description: "Design stunning posters and typography art", icon: <Layers size={20} />, capabilities: [], tone: "" },
      { id: "story_buddy", name: "Sequential Art", description: "Generate comic strips and visual stories", icon: <Film size={20} />, capabilities: [], tone: "" },
      { id: "curator", name: "Music Composer", description: "Compose ambient sounds and melodies", icon: <Music size={20} />, capabilities: [], tone: "" },
      { id: "journal_bud", name: "Narration Studio", description: "Create voiceovers and spoken content", icon: <Mic size={20} />, capabilities: [], tone: "" },
      { id: "visual_companion", name: "Video Creator", description: "Transform images into short animations", icon: <Eye size={20} />, capabilities: [], tone: "" },
      { id: "vizzy_muse", name: "Style Advisor", description: "Get recommendations for your space", icon: <Wand2 size={20} />, capabilities: [], tone: "" },
    ];

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="VGC - Generative Chat" subtitle="Create content and media with 7+ specialised AI sub-agents" icon={<MessageSquare size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Sub-Agents</h2>
        <button className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">All Chats <ChevronRight size={14} /></button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {displayAgents.map((agent) => (
          <button key={agent.id} onClick={() => handleAgentClick(agent)} className="group text-left p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 hover:shadow-[0_12px_30px_rgba(24,42,74,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform">{agent.icon}</div>
            <p className="text-sm font-bold text-gray-800 mb-1">{agent.name}</p>
            <p className="text-[11px] text-gray-400 leading-relaxed">{agent.description}</p>
          </button>
        ))}
        <button className="p-5 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
          <Plus size={24} className="mb-1" />
          <span className="text-xs font-semibold">More Coming</span>
        </button>
      </div>

      {/* Recent Chats */}
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mt-4">Recent Chats</h2>
      <div className="space-y-2">
        {chats.length > 0 ? chats.slice(0, 5).map((chat) => (
          <div key={chat.id} onClick={() => handleChatClick(chat)} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${activeChatId === chat.id ? "bg-white shadow-md border-[#2563EB]/30" : "bg-white/50 border-white/60 hover:bg-white hover:shadow-md"}`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shrink-0"><MessageSquare size={14} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{chat.title}</p>
              <p className="text-[11px] text-gray-400">{chat.activeAgent} &middot; {formatTime(chat.updatedAt)}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/50 border border-dashed border-gray-200 text-center gap-2">
            <MessageSquare className="size-6 text-blue-500/60" />
            <p className="text-xs font-bold text-gray-700">No Recent Generative Chats</p>
            <p className="text-[11px] text-gray-400">Select an AI Sub-Agent above to start generating art & music.</p>
          </div>
        )}
      </div>

      {/* Active Chat Messages */}
      {messages.length > 0 && (
        <div className="space-y-3 mt-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-[#2563EB] text-white rounded-br-md" : "bg-white/70 border border-white/60 text-gray-800 rounded-bl-md"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/70 border border-white/60 p-3 rounded-2xl rounded-bl-md text-sm text-gray-400">Thinking...</div>
            </div>
          )}
        </div>
      )}

      {/* Chat Input */}
      <div className="sticky bottom-4 mt-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_8px_30px_rgba(24,42,74,0.1)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Describe what you'd like to create..."
            className="flex-1 bg-transparent text-sm outline-none px-3 py-2 placeholder-gray-400"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}

/* ======================== VCC - VISUAL CONTENT CREATOR ======================== */
function VCCPlaceholder() {
  const tools = [
    { name: "Text to Art", icon: <Wand2 size={18} /> },
    { name: "Style Transfer", icon: <Palette size={18} /> },
    { name: "Image Enhance", icon: <Sparkles size={18} /> },
    { name: "Background Edit", icon: <ImageIcon size={18} /> },
    { name: "Poster Layout", icon: <Layers size={18} /> },
    { name: "Batch Create", icon: <ImagePlus size={18} /> },
  ];

  const handleOpenVizzyCanvas = (toolName?: string) => {
    const url = toolName ? `/vizzy-canvas?tool=${encodeURIComponent(toolName)}` : "/vizzy-canvas";
    window.location.href = url;
  };

  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="VCC - Visual Content Creator" subtitle="Your visual content creation studio for art, posters, and design" icon={<Palette size={24} />} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => handleOpenVizzyCanvas(tool.name)}
            className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 border border-white/60 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white flex items-center justify-center group-hover:scale-110 transition-transform">{tool.icon}</div>
            <span className="text-xs font-semibold text-gray-700">{tool.name}</span>
          </button>
        ))}
      </div>
      {/* Canvas Area */}
      <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-12 text-center">
        <Sparkles size={36} className="mx-auto text-blue-600 mb-3 animate-pulse" />
        <p className="text-base font-bold text-gray-800 mb-1">Vizzy Generative Chat Canvas</p>
        <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">Drop an image, upload reference files, or let Vizzy generate high-res art, posters, and designs from your prompts.</p>
        <button
          onClick={() => handleOpenVizzyCanvas()}
          className="px-8 py-3 rounded-full text-sm font-bold text-white shadow-xl bg-gradient-to-r from-[#182a4a] via-[#1e3a5f] to-[#2563EB] hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer"
        >
          <Wand2 size={16} />
          <span>Start Creating with Vizzy Generative Chat</span>
        </button>
      </div>
      {/* Recent Creations */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Creations</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["/images/herol (1).png", "/images/herol (3).png", "/images/herol (5).png", "/images/herol (7).png"].map((img, i) => (
          <div key={i} onClick={() => handleOpenVizzyCanvas()} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
            <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== DAILY QUEUE ======================== */
function DailyQueuePlaceholder() {
  const schedule = [
    { time: "6:00 AM - 9:00 AM", collection: "Morning Serenity", artworks: 12, status: "active" },
    { time: "9:00 AM - 12:00 PM", collection: "Nature Escapes", artworks: 8, status: "upcoming" },
    { time: "12:00 PM - 3:00 PM", collection: "Abstract Dreams", artworks: 15, status: "upcoming" },
    { time: "3:00 PM - 6:00 PM", collection: "Urban Photography", artworks: 10, status: "upcoming" },
    { time: "6:00 PM - 9:00 PM", collection: "Evening Ambiance", artworks: 9, status: "upcoming" },
    { time: "9:00 PM - 12:00 AM", collection: "Night Sky Collection", artworks: 7, status: "upcoming" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Daily Queue" subtitle="Schedule collections throughout your day on Deckoviz" icon={<Clock size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Today's Schedule</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md">Quick Display</button>
          <button className="px-4 py-2 rounded-full text-xs font-semibold bg-white/60 text-gray-600 border border-gray-200 hover:bg-white"><Plus size={12} className="inline mr-1" />Add Slot</button>
        </div>
      </div>
      <div className="space-y-3">
        {schedule.map((slot, i) => (
          <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${slot.status === "active" ? "bg-blue-50/80 border-blue-200 shadow-md" : "bg-white/50 border-white/60 hover:bg-white hover:shadow-sm"}`}>
            <div className={`w-2 h-2 rounded-full shrink-0 ${slot.status === "active" ? "bg-blue-500 animate-pulse" : "bg-gray-300"}`} />
            <div className="w-40 shrink-0">
              <p className={`text-sm font-bold ${slot.status === "active" ? "text-[#182a4a]" : "text-gray-600"}`}>{slot.time}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{slot.collection}</p>
              <p className="text-[11px] text-gray-400">{slot.artworks} artworks</p>
            </div>
            {slot.status === "active" && <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500 text-white">NOW PLAYING</span>}
            <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#182a4a] hover:border-[#182a4a] transition-colors"><Play size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== ALL MEDIA ======================== */
function AllMediaPlaceholder() {
  const { token, openAuthModal } = useAuth();
  const [mediaFiles, setMediaFiles] = useState<{ id: string; mediaUrl: string; fileName: string; mediaType: string; isGenerated?: boolean }[]>([]);
  const [activeTab, setActiveTab] = useState("Generated Images");
  const [uploading, setUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Collection Selection Modal State
  const [pickerModalFile, setPickerModalFile] = useState<any | null>(null);
  const [existingCols, setExistingCols] = useState<any[]>([]);
  const [targetColId, setTargetColId] = useState<string>("");
  const [newColTitle, setNewColTitle] = useState<string>("");
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  const tabs = ["Generated Images", "Generated Videos", "Generated Narrations", "Generated Music", "Uploaded Images", "Uploaded Videos", "Uploaded Music"];

  const fetchMedia = useCallback(async () => {
    try {
      const [mediaRes, vizzyImgsRes] = await Promise.allSettled([
        webappApi.getMedia({ limit: 100 }, token || undefined),
        vizzyApi.getImages(token || undefined),
      ]);

      let rawMedia: any[] = [];
      if (mediaRes.status === "fulfilled") {
        const data = mediaRes.value;
        rawMedia = Array.isArray(data) ? data : (data.items || data.rows || data.media || data.data || []);
      }

      let vizzyImgs: any[] = [];
      if (vizzyImgsRes.status === "fulfilled") {
        const vData = vizzyImgsRes.value;
        vizzyImgs = Array.isArray(vData) ? vData : (vData.images || vData.rows || vData.items || vData.data || []);
      }

      let localMedia: any[] = [];
      try {
        localMedia = getUserMedia();
      } catch { /* ignore */ }

      // Gather Collection Items
      let collectionMedia: any[] = [];
      try {
        const cols = getUserCollections();
        cols.forEach((col: any) => {
          if (Array.isArray(col.items)) {
            col.items.forEach((item: any) => {
              if (item.url || item.mediaUrl) {
                collectionMedia.push({
                  id: item.id || `colitem-${Date.now()}-${Math.random()}`,
                  mediaUrl: item.url || item.mediaUrl,
                  fileName: item.title || item.fileName || col.name || "Collection Artwork",
                  mediaType: "image/png",
                  isGenerated: true,
                });
              }
            });
          }
        });
      } catch { /* ignore */ }

      // Default high quality artworks if user history is brand new
      const defaultArtworks = [
        { id: "art-1", mediaUrl: "https://picsum.photos/seed/deckoviz-synth/1024/1024", fileName: "Synthwave Sunset", mediaType: "image/png", isGenerated: true },
        { id: "art-2", mediaUrl: "https://picsum.photos/seed/deckoviz-neon/1024/1024", fileName: "Neon Metropolis", mediaType: "image/png", isGenerated: true },
        { id: "art-3", mediaUrl: "https://picsum.photos/seed/deckoviz-emerald/1024/1024", fileName: "Emerald Forest Realm", mediaType: "image/png", isGenerated: true },
        { id: "art-4", mediaUrl: "https://picsum.photos/seed/deckoviz-cosmic/1024/1024", fileName: "Cosmic Nebula", mediaType: "image/png", isGenerated: true },
        { id: "art-5", mediaUrl: "https://picsum.photos/seed/deckoviz-abstract/1024/1024", fileName: "Prism Dynamics", mediaType: "image/png", isGenerated: true },
        { id: "art-6", mediaUrl: "https://picsum.photos/seed/deckoviz-cyber/1024/1024", fileName: "Cybernetic Horizon", mediaType: "image/png", isGenerated: true },
      ];

      const normalizedVizzy = vizzyImgs.map((img: any) => ({
        id: img.id || `vimg-${Date.now()}-${Math.random()}`,
        mediaUrl: img.url || img.imageUrl || img.mediaUrl || img.path || "",
        fileName: img.prompt || img.fileName || img.title || "Vizzy Generated Artwork",
        mediaType: "image/png",
        isGenerated: true,
      }));

      const normalizedMedia = rawMedia.map((m: any) => ({
        id: m.id || String(Date.now()),
        mediaUrl: m.mediaUrl || m.url || m.imageUrl || m.path || "",
        fileName: m.fileName || m.filename || m.name || m.title || "Media Item",
        mediaType: m.mediaType || m.type || "image/png",
        isGenerated: true,
      }));

      const normalizedLocal = localMedia.map((m: any) => ({
        id: m.id || String(Date.now()),
        mediaUrl: m.url || m.mediaUrl || "",
        fileName: m.fileName || m.name || "Uploaded Item",
        mediaType: m.type || m.mediaType || "image/png",
        isGenerated: m.isGenerated ?? true,
      }));

      const normalizedCollection = collectionMedia.map((m: any) => ({
        id: m.id,
        mediaUrl: m.mediaUrl,
        fileName: m.fileName,
        mediaType: m.mediaType,
        isGenerated: true,
      }));

      const allCombined = new Map();
      [...normalizedLocal, ...normalizedCollection, ...normalizedVizzy, ...normalizedMedia, ...defaultArtworks].forEach(item => {
        if (item.mediaUrl) allCombined.set(item.mediaUrl, item);
      });

      const combinedList = Array.from(allCombined.values());

      let filtered = combinedList;
      if (activeTab === "Generated Images") {
        filtered = combinedList.filter(m => (m.isGenerated || !m.mediaType || m.mediaType.startsWith("image/")) && !m.mediaType?.startsWith("video/") && !m.mediaType?.startsWith("audio/"));
      } else if (activeTab === "Uploaded Images") {
        filtered = combinedList.filter(m => m.mediaType?.startsWith("image/"));
      } else if (activeTab === "Generated Videos" || activeTab === "Uploaded Videos") {
        filtered = combinedList.filter(m => m.mediaType?.startsWith("video/") || m.fileName?.toLowerCase().endsWith(".mp4") || m.fileName?.toLowerCase().endsWith(".webm"));
      } else if (activeTab === "Generated Music" || activeTab === "Uploaded Music") {
        filtered = combinedList.filter(m => m.mediaType?.startsWith("audio/") || m.mediaType?.startsWith("music/") || m.fileName?.toLowerCase().endsWith(".mp3") || m.fileName?.toLowerCase().endsWith(".wav"));
      } else if (activeTab === "Generated Narrations") {
        filtered = combinedList.filter(m => m.mediaType?.includes("narration") || m.fileName?.toLowerCase().includes("narration"));
      }

      setMediaFiles(filtered);
    } catch (err: any) {
      console.error("[AllMedia] fetchMedia failed:", err);
    }
  }, [token, activeTab]);

  useEffect(() => {
    fetchMedia();
    const handleUpdate = () => fetchMedia();
    window.addEventListener("deckoviz-collections-updated", handleUpdate);
    window.addEventListener("deckoviz-media-updated", handleUpdate);
    return () => {
      window.removeEventListener("deckoviz-collections-updated", handleUpdate);
      window.removeEventListener("deckoviz-media-updated", handleUpdate);
    };
  }, [fetchMedia]);

  const uploadFiles = async (fileList: FileList | File[]) => {
    setUploading(true);
    setError("");
    let failed = 0;
    for (const file of Array.from(fileList)) {
      try {
        const previewUrl = URL.createObjectURL(file);
        const fileType = file.type || (file.name.endsWith(".mp4") ? "video/mp4" : file.name.endsWith(".mp3") ? "audio/mp3" : "image/png");
        
        let uploadedItem: any = null;
        try {
          uploadedItem = await webappApi.uploadMedia(file, token || undefined);
        } catch { /* fallback to previewUrl */ }

        const finalUrl = uploadedItem?.url || uploadedItem?.mediaUrl || previewUrl;
        const newMediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          url: finalUrl,
          mediaUrl: finalUrl,
          fileName: file.name,
          name: file.name,
          mediaType: fileType,
          type: fileType,
          isGenerated: false,
          createdAt: new Date().toISOString(),
        };

        let currentMedia = getUserMedia();
        currentMedia.unshift(newMediaItem);
        saveUserMedia(currentMedia);
      } catch (err: any) {
        console.error("[AllMedia] upload failed:", err);
        failed++;
      }
    }
    if (failed > 0) setError(`${failed} file(s) failed to upload.`);
    await fetchMedia();
    setUploading(false);
  };

  const handleDelete = async (id: string, url: string) => {
    if (token) {
      try { await webappApi.deleteMedia(id, token); } catch { /* ignore */ }
    }
    try {
      let list = getUserMedia();
      list = list.filter((m: any) => m.id !== id && m.url !== url && m.mediaUrl !== url);
      saveUserMedia(list);
    } catch { /* ignore */ }
    setMediaFiles(f => f.filter(m => m.id !== id && m.mediaUrl !== url));
  };

  const handleOpenPickerModal = (file: any) => {
    setPickerModalFile(file);
    const cols = getUserCollections();
    setExistingCols(cols);
    if (cols.length > 0) {
      setTargetColId(cols[0].id || cols[0].name);
      setIsCreatingNew(false);
    } else {
      setIsCreatingNew(true);
    }
  };

  const handleConfirmAddToCollection = () => {
    if (!pickerModalFile) return;
    const targetUrl = pickerModalFile.mediaUrl || pickerModalFile.url;
    if (!targetUrl) return;

    try {
      let mediaList = getUserMedia();
      mediaList = mediaList.filter((m: any) => m.url !== targetUrl && m.mediaUrl !== targetUrl);
      mediaList.unshift({
        id: `media-${Date.now()}-${Math.random()}`,
        url: targetUrl,
        mediaUrl: targetUrl,
        fileName: pickerModalFile.fileName || "Vizzy Artwork",
        mediaType: pickerModalFile.mediaType || "image/png",
        isGenerated: true,
        createdAt: new Date().toISOString(),
      });
      saveUserMedia(mediaList);

      let cols: any[] = getUserCollections();

      if (isCreatingNew || cols.length === 0 || !targetColId) {
        const colTitle = newColTitle.trim() || "My New Collection";
        const newCol = {
          id: `col-${Date.now()}`,
          name: colTitle,
          title: colTitle,
          description: "Created from All Media",
          itemCount: 1,
          items: [
            {
              id: `img-${Date.now()}`,
              title: pickerModalFile.fileName || "Vizzy Artwork",
              url: targetUrl,
              mediaUrl: targetUrl,
              displayHours: "00:00:00",
              displaySeconds: "00:30",
              createdAt: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
        };
        cols = [newCol, ...cols];
      } else {
        cols = cols.map((c: any) => {
          const key = c.id || c.name || c.title;
          if (key === targetColId || c.name === targetColId || c.title === targetColId) {
            const currentItems = Array.isArray(c.items) ? c.items : [];
            const exists = currentItems.some((i: any) => i.url === targetUrl || i.mediaUrl === targetUrl);
            if (!exists) {
              const updatedItems = [
                {
                  id: `img-${Date.now()}`,
                  title: pickerModalFile.fileName || "Vizzy Artwork",
                  url: targetUrl,
                  mediaUrl: targetUrl,
                  displayHours: "00:00:00",
                  displaySeconds: "00:30",
                  createdAt: new Date().toISOString(),
                },
                ...currentItems,
              ];
              return {
                ...c,
                items: updatedItems,
                itemCount: updatedItems.length,
              };
            }
          }
          return c;
        });
      }

      saveUserCollections(cols);

      setPickerModalFile(null);
      setAddedToast(`Added "${pickerModalFile.fileName}" to collection!`);
      setTimeout(() => setAddedToast(null), 3000);
      fetchMedia();
    } catch (err) {
      console.warn("Failed to add to collection", err);
    }
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {addedToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#182a4a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check size={16} className="text-emerald-400" />
          <span>{addedToast}</span>
        </div>
      )}

      <ViewHeader title="All Media" subtitle="All your generated and uploaded media in one place" icon={<ImageIcon size={24} />} />
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === tab ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border border-gray-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all ${isDragActive ? "border-blue-400 bg-blue-50/50" : "border-gray-300 bg-gray-50 hover:bg-blue-50/30"}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragActive(false); if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-50">
          <UploadCloud size={28} className="text-blue-600" />
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-1">{uploading ? "Uploading..." : "Drop your images here to automatically tag, enhance, and organize them using Vizzy AI."}</h3>
        <p className="text-gray-500 text-xs max-w-sm mx-auto mb-4">Support for JPG, PNG, MP4, and more up to 25MB</p>
        <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*" className="hidden" onChange={(e) => { if (e.target.files?.length) uploadFiles(e.target.files); e.target.value = ""; }} />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Media Grid */}
      {mediaFiles.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{activeTab} ({mediaFiles.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaFiles.map((file) => {
              const isVideo = file.mediaType?.startsWith("video/") || file.fileName?.toLowerCase().endsWith(".mp4");
              const isAudio = file.mediaType?.startsWith("audio/") || file.mediaType?.startsWith("music/") || file.fileName?.toLowerCase().endsWith(".mp3");

              return (
                <div key={file.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-300">
                  {isVideo ? (
                    <video src={file.mediaUrl} controls className="w-full h-full object-cover" />
                  ) : isAudio ? (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-[#182a4a] p-4 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between">
                        <Music size={24} className="text-cyan-400 animate-pulse" />
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono">Audio</span>
                      </div>
                      <p className="text-xs font-bold truncate">{file.fileName}</p>
                      <audio src={file.mediaUrl} controls className="w-full h-8 mt-2" />
                    </div>
                  ) : (
                    <img
                      src={file.mediaUrl}
                      alt={file.fileName}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(file.fileName || "art")}/800/800`;
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!isAudio && !isVideo && (
                      <button
                        onClick={() => setViewingImage(file.mediaUrl)}
                        className="w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white transition shadow-md"
                        title="View Image"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenPickerModal(file)}
                      className="w-9 h-9 rounded-full bg-[#3f5fe0] text-white flex items-center justify-center hover:bg-[#344fd0] transition shadow-md"
                      title="Add to Collection"
                    >
                      <FolderPlus size={16} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(file.id, file.mediaUrl); }}
                      className="w-9 h-9 rounded-full bg-white/90 text-gray-700 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition shadow-md"
                      title="Delete Media"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
                    <p className="text-[11px] font-semibold text-white truncate">{file.fileName}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mediaFiles.length === 0 && !uploading && (
        <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-3xl border border-dashed border-gray-200">
          No media found in <span className="font-bold text-gray-700">"{activeTab}"</span>. Drop files above to add new content.
        </div>
      )}

      {/* Collection Selection Modal */}
      {pickerModalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in-0 duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 text-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <FolderPlus size={20} className="text-[#3f5fe0]" />
                <h3 className="text-base font-bold text-gray-900">Add to Collection</h3>
              </div>
              <button onClick={() => setPickerModalFile(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-5 border border-gray-100">
              <img src={pickerModalFile.mediaUrl} alt="" className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{pickerModalFile.fileName || "Vizzy Artwork"}</p>
                <p className="text-[11px] text-gray-500">All Media Library</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-xs font-bold text-gray-700">Select Target Collection:</p>
              {existingCols.length > 0 && (
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {existingCols.map((col: any) => {
                    const idKey = col.id || col.name;
                    const isSelected = !isCreatingNew && targetColId === idKey;
                    return (
                      <div
                        key={idKey}
                        onClick={() => { setTargetColId(idKey); setIsCreatingNew(false); }}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                          isSelected ? "border-[#3f5fe0] bg-blue-50/50 text-[#3f5fe0]" : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input type="radio" checked={isSelected} onChange={() => {}} className="accent-[#3f5fe0]" />
                          <span className="text-xs font-bold">{col.name || col.title}</span>
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {col.items?.length || 0} items
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div
                onClick={() => setIsCreatingNew(true)}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                  isCreatingNew ? "border-[#3f5fe0] bg-blue-50/50" : "border-dashed border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input type="radio" checked={isCreatingNew} onChange={() => {}} className="accent-[#3f5fe0]" />
                <span className="text-xs font-bold text-gray-800">+ Create New Collection</span>
              </div>

              {isCreatingNew && (
                <input
                  type="text"
                  placeholder="Collection Title (e.g. My Favorites)"
                  value={newColTitle}
                  onChange={(e) => setNewColTitle(e.target.value)}
                  className="w-full text-xs font-medium px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:border-[#3f5fe0]"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => setPickerModalFile(null)}
                className="px-4 py-2 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddToCollection}
                className="px-5 py-2.5 rounded-full bg-[#3f5fe0] hover:bg-[#344fd0] text-xs font-bold text-white shadow-md transition"
              >
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full View Modal */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setViewingImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-black" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewingImage(null)} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80">
              <X size={18} />
            </button>
            <img src={viewingImage} alt="Full view" className="max-w-full max-h-[85vh] object-contain mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================== EXPLORE LIBRARY ======================== */
function ExploreLibraryPlaceholder() {
  const categories = ["Art", "Photos", "Posters", "Prompts", "Templates"];
  const items = [
    { title: "Renaissance Masters", type: "Art", count: "48 pieces", img: "/images/herol (2).png" },
    { title: "Impressionist Dreams", type: "Art", count: "36 pieces", img: "/images/herol (4).png" },
    { title: "Nature Photography", type: "Photos", count: "72 pieces", img: "/images/herol (6).png" },
    { title: "Minimalist Posters", type: "Posters", count: "24 designs", img: "/images/herol (8).png" },
    { title: "Abstract Expressionism", type: "Art", count: "42 pieces", img: "/images/herol (10).png" },
    { title: "Landscape Collection", type: "Photos", count: "56 pieces", img: "/images/herol (12).png" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Explore Deckoviz Library" subtitle="Browse art, photos, posters, prompts, templates, and inspiration" icon={<Library size={24} />} />
      <div className="flex gap-2">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${i === 0 ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border border-gray-100"}`}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden bg-white/50 border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
            <div className="relative h-40 overflow-hidden">
              <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white/80 uppercase tracking-wider bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">{item.type}</span>
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-gray-800">{item.title}</p>
              <p className="text-[11px] text-gray-400 mt-1">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== SETTINGS ======================== */
function SettingsPlaceholder() {
  const homePrefs = [
    { label: "Auto-rotate collections", desc: "Automatically cycle through daily queue", enabled: true },
    { label: "Ambient lighting sync", desc: "Sync artwork mood with room lighting", enabled: false },
    { label: "Transition effects", desc: "Smooth crossfade between artworks", enabled: true },
    { label: "Music auto-play", desc: "Play collection music when displayed", enabled: true },
  ];
  const vizzyPrefs = [
    { label: "Creative suggestions", desc: "Vizzy suggests new art based on preferences", enabled: true },
    { label: "Daily digest notifications", desc: "Receive daily art inspiration", enabled: false },
    { label: "Voice interaction", desc: "Enable voice commands for Vizzy", enabled: false },
    { label: "Art style learning", desc: "Vizzy learns your preferences over time", enabled: true },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Settings & Preferences" subtitle="Customise your Home preferences and Vizzy preferences" icon={<Settings size={24} />} />
      {[{ title: "Home Preferences", items: homePrefs }, { title: "Vizzy Preferences", items: vizzyPrefs }].map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
          <div className="rounded-2xl bg-white/50 border border-white/60 divide-y divide-gray-100">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-5 hover:bg-white/40 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <div className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${item.enabled ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB]" : "bg-gray-200"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${item.enabled ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ======================== EVENTS ======================== */
function EventsPlaceholder() {
  const events = [
    { name: "Sunday Morning Jazz", date: "Jul 6, 2026", time: "8:00 AM", collection: "Jazz Vibes", days: 3 },
    { name: "Movie Night Setup", date: "Jul 8, 2026", time: "7:00 PM", collection: "Cinema Classics", days: 5 },
    { name: "Birthday Celebration", date: "Jul 12, 2026", time: "6:00 PM", collection: "Celebration Art", days: 9 },
    { name: "Dinner Party Ambiance", date: "Jul 15, 2026", time: "7:30 PM", collection: "Elegant Evening", days: 12 },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Events" subtitle="Schedule collections for future occasions and special moments" icon={<Calendar size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Upcoming Events</h2>
        <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1"><Plus size={12} /> New Event</button>
      </div>
      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#182a4a]/10 to-blue-100 flex flex-col items-center justify-center shrink-0">
              <span className="text-lg font-bold text-[#182a4a] leading-none">{event.date.split(" ")[1].replace(",", "")}</span>
              <span className="text-[9px] font-bold text-blue-500 uppercase">{event.date.split(" ")[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800">{event.name}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-gray-400 flex items-center gap-1"><Clock size={10} /> {event.time}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#182a4a] font-semibold">{event.collection}</span>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">In {event.days} days</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== RITUALS ======================== */
function RitualsPlaceholder() {
  const daily = [
    { name: "Morning Meditation Art", time: "6:00 AM", collection: "Zen Collection", days: ["M", "T", "W", "T", "F", "S", "S"] },
    { name: "Work Focus Mode", time: "9:00 AM", collection: "Minimalist Focus", days: ["M", "T", "W", "T", "F"] },
    { name: "Evening Wind Down", time: "8:00 PM", collection: "Calm Evenings", days: ["M", "T", "W", "T", "F", "S", "S"] },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Rituals" subtitle="Set recurring daily and weekly scheduled events" icon={<Repeat size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Daily Rituals</h2>
        <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1"><Plus size={12} /> Add Ritual</button>
      </div>
      <div className="space-y-3">
        {daily.map((ritual, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-gray-800">{ritual.name}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1"><Clock size={10} /> {ritual.time} - {ritual.collection}</p>
              </div>
              <div className="w-11 h-6 rounded-full bg-gradient-to-r from-[#182a4a] to-[#2563EB] flex items-center px-0.5"><div className="w-5 h-5 rounded-full bg-white shadow-sm translate-x-5" /></div>
            </div>
            <div className="flex gap-2">
              {ritual.days.map((day, j) => (
                <span key={j} className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#182a4a]/10 to-blue-100 text-[10px] font-bold text-[#182a4a] flex items-center justify-center">{day}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== MEMBERS ======================== */
function MembersPlaceholder() {
  const members = [
    { name: "Alex", role: "Home Owner", pref: "Abstract, Nature", notes: "Prefers calm morning art", avatar: "A" },
    { name: "Priya", role: "Family", pref: "Impressionist, Music", notes: "Loves jazz ambiance", avatar: "P" },
    { name: "Sam", role: "Family", pref: "Photography, Modern", notes: "Enjoys vibrant colors", avatar: "S" },
    { name: "Mira", role: "Guest", pref: "Minimalist", notes: "Weekend visitor", avatar: "M" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Members of Home" subtitle="Manage household members, their preferences and notes" icon={<Users size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{members.length} Members</h2>
        <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1"><Plus size={12} /> Add Member</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white font-bold text-lg shadow-md">{m.avatar}</div>
              <div>
                <p className="text-sm font-bold text-gray-800">{m.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#182a4a] font-semibold">{m.role}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preferences</span><p className="text-xs text-gray-600">{m.pref}</p></div>
              <div><span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Notes</span><p className="text-xs text-gray-600">{m.notes}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== CURATIONS ======================== */
function CurationsPlaceholder() {
  const [curTab, setCurTab] = useState<"foryou" | "general">("foryou");
  const items = [
    { title: "Dreamscapes", pieces: 24, img: "/images/herol (1).png" },
    { title: "Ocean Whispers", pieces: 18, img: "/images/herol (3).png" },
    { title: "Urban Textures", pieces: 32, img: "/images/herol (5).png" },
    { title: "Golden Hour", pieces: 21, img: "/images/herol (7).png" },
    { title: "Midnight Blue", pieces: 15, img: "/images/herol (9).png" },
    { title: "Forest Canopy", pieces: 27, img: "/images/herol (11).png" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Deckoviz Curations" subtitle="Explore curated collections of art and posters" icon={<Star size={24} />} />
      <div className="flex gap-2">
        <button onClick={() => setCurTab("foryou")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${curTab === "foryou" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>
          <Sparkles size={12} className="inline mr-1" />Curated For You
        </button>
        <button onClick={() => setCurTab("general")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${curTab === "general" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>
          Deckoviz Curations
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden bg-white/50 border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">
            <div className="relative h-36 overflow-hidden">
              <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {curTab === "foryou" && <span className="absolute top-3 right-3 text-[9px] font-bold text-cyan-300 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/20"><Sparkles size={8} className="inline mr-0.5" />By Vizzy</span>}
            </div>
            <div className="p-4"><p className="text-sm font-bold text-gray-800">{item.title}</p><p className="text-[11px] text-gray-400 mt-0.5">{item.pieces} curated pieces</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== MUSIC DASHBOARD ======================== */
function MusicDashboardPlaceholder() {
  const tracks = [
    { title: "Sunrise Meditation", duration: "3:42", genre: "Ambient" },
    { title: "Evening Jazz Lounge", duration: "4:15", genre: "Jazz" },
    { title: "Calm Forest Rain", duration: "5:00", genre: "Nature" },
    { title: "Focus Flow State", duration: "3:28", genre: "Lo-fi" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Music Dashboard" subtitle="Generate music and songs, and manage your created music pieces" icon={<Music size={24} />} />
      {/* Generator */}
      <div className="p-6 rounded-2xl bg-white/50 border border-white/60">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><Wand2 size={14} className="text-[#2563EB]" /> Generate New Music</h3>
        <div className="flex gap-3">
          <input type="text" placeholder="Describe the music you'd like... (e.g., calm piano for evening relaxation)" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200" />
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"><Music size={14} /> Generate</button>
        </div>
      </div>
      {/* Created Tracks */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Previously Created</h3>
      <div className="space-y-2">
        {tracks.map((track, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all">
            <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"><Play size={14} /></button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{track.title}</p>
              <p className="text-[11px] text-gray-400">{track.genre} - {track.duration}</p>
            </div>
            <div className="flex items-center gap-3 text-gray-300"><Volume2 size={14} /> <span className="w-20 h-1.5 rounded-full bg-gray-100"><span className="block w-3/5 h-full rounded-full bg-gradient-to-r from-[#182a4a] to-[#2563EB]" /></span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== MUSIC LIBRARY ======================== */
function MusicLibraryPlaceholder() {
  const categories = [
    { name: "Ambient", count: 48, icon: <Volume2 size={18} /> },
    { name: "Classical", count: 36, icon: <Music size={18} /> },
    { name: "Jazz", count: 24, icon: <Headphones size={18} /> },
    { name: "Nature Sounds", count: 52, icon: <Eye size={18} /> },
    { name: "Lo-fi Beats", count: 30, icon: <Sparkles size={18} /> },
    { name: "World Music", count: 28, icon: <Star size={18} /> },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Music Library" subtitle="Explore the Deckoviz library of music and ambient sounds" icon={<Headphones size={24} />} />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <button key={i} className="group text-left p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
            <p className="text-sm font-bold text-gray-800">{cat.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{cat.count} tracks</p>
          </button>
        ))}
      </div>
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Featured Tracks</h3>
      <div className="space-y-2">
        {["Ocean Waves at Dusk", "Tibetan Singing Bowls", "Soft Piano Nocturne", "Rainforest Morning"].map((track, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md"><Play size={12} /></button>
            <p className="text-sm font-semibold text-gray-800 flex-1">{track}</p>
            <Plus size={16} className="text-gray-300 hover:text-[#2563EB] cursor-pointer transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== NARRATIONS ======================== */
function NarrationsPlaceholder() {
  const voices = ["Clara - Warm", "James - Deep", "Aria - Calm", "Leo - Energetic", "Maya - Soothing", "Kai - Neutral"];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Narrations" subtitle="Generate narrations with many voice options, manage your recordings" icon={<Mic size={24} />} />
      {/* Generator */}
      <div className="p-6 rounded-2xl bg-white/50 border border-white/60">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Create Narration</h3>
        <textarea placeholder="Enter the text you'd like narrated..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 min-h-[100px] mb-3" />
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Voice</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {voices.map((voice, i) => (
            <button key={voice} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${i === 0 ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-[#2563EB] hover:text-[#182a4a]"}`}>{voice}</button>
          ))}
        </div>
        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"><Mic size={14} /> Generate Narration</button>
      </div>
      {/* Previous */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Previously Created</h3>
      <div className="space-y-2">
        {[{ title: "Welcome to our home", voice: "Clara", dur: "0:32" }, { title: "Collection introduction", voice: "James", dur: "1:05" }, { title: "Evening greeting", voice: "Aria", dur: "0:18" }].map((n, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all">
            <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-md"><Play size={12} /></button>
            <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-800">{n.title}</p><p className="text-[11px] text-gray-400">Voice: {n.voice} - {n.dur}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== SAVED NOTES & TEMPLATES ======================== */
function SavedNotesPlaceholder() {
  const [notesTab, setNotesTab] = useState<"templates" | "content">("templates");
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Saved Notes & Templates" subtitle="AI workspace for content and text-based creation" icon={<FileText size={24} />} />
      <div className="flex gap-2">
        <button onClick={() => setNotesTab("templates")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${notesTab === "templates" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>Saved Templates</button>
        <button onClick={() => setNotesTab("content")} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${notesTab === "content" ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 border border-gray-100 hover:bg-white"}`}>Saved Content</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(notesTab === "templates" ? [
          { title: "Art Description Template", desc: "Standard format for describing generated artworks", date: "Jun 28, 2026" },
          { title: "Collection Brief", desc: "Template for planning new collections with themes", date: "Jun 25, 2026" },
          { title: "Event Invitation Copy", desc: "Template for event-specific narration scripts", date: "Jun 20, 2026" },
          { title: "Music Prompt Guide", desc: "Structured prompts for music generation", date: "Jun 15, 2026" },
        ] : [
          { title: "Summer Collection Notes", desc: "Ideas and references for the summer theme", date: "Jul 1, 2026" },
          { title: "Guest Preferences Log", desc: "Notes on visitor art preferences", date: "Jun 30, 2026" },
          { title: "Mood Board - Autumn", desc: "Color palette and style notes for autumn", date: "Jun 28, 2026" },
        ]).map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#182a4a]/10 to-blue-100 flex items-center justify-center"><FileText size={16} className="text-[#182a4a]" /></div>
              <span className="text-[10px] text-gray-400">{item.date}</span>
            </div>
            <p className="text-sm font-bold text-gray-800 mb-1">{item.title}</p>
            <p className="text-[11px] text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
      <button className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center justify-center gap-2 text-sm font-semibold"><Plus size={16} /> Create New {notesTab === "templates" ? "Template" : "Note"}</button>
    </div>
  );
}

/* ======================== SHORT FILM SUITE ======================== */
function ShortFilmPlaceholder() {
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Short Film Suite" subtitle="Create short films using your collections, artwork, music, and narrations" icon={<Film size={24} />} />
      {/* Quick Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{ name: "New Project", icon: <Plus size={16} /> }, { name: "Import Media", icon: <Upload size={16} /> }, { name: "Add Music", icon: <Music size={16} /> }, { name: "Add Narration", icon: <Mic size={16} /> }].map((tool) => (
          <button key={tool.name} className="group flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-white/60 hover:bg-white hover:shadow-md transition-all">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white flex items-center justify-center group-hover:scale-110 transition-transform">{tool.icon}</div>
            <span className="text-xs font-semibold text-gray-700">{tool.name}</span>
          </button>
        ))}
      </div>
      {/* Projects */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Morning Serenity Film", scenes: 8, dur: "2:30", status: "Draft" },
          { title: "Nature Journey", scenes: 12, dur: "4:15", status: "Completed" },
          { title: "Abstract Dreams Reel", scenes: 6, dur: "1:45", status: "In Progress" },
        ].map((proj, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">{proj.title}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${proj.status === "Completed" ? "bg-blue-50 text-[#182a4a]" : proj.status === "Draft" ? "bg-gray-100 text-gray-500" : "bg-cyan-50 text-cyan-600"}`}>{proj.status}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span>{proj.scenes} scenes</span>
              <span>{proj.dur}</span>
            </div>
            {/* Mini timeline */}
            <div className="flex gap-1 mt-3">
              {Array.from({ length: proj.scenes }).map((_, j) => (
                <div key={j} className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#182a4a]/20 to-blue-200/40" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== CREATIVE JOURNAL ======================== */
function CreativeJournalPlaceholder() {
  const entries = [
    { title: "Exploring new art styles for the living room", date: "Jul 3, 2026", excerpt: "Today I discovered that impressionist landscapes pair beautifully with ambient nature sounds...", mood: "Inspired" },
    { title: "Guest feedback on the evening collection", date: "Jul 1, 2026", excerpt: "Everyone loved the transition effects during dinner. The cinema classics collection was a hit...", mood: "Joyful" },
    { title: "Ideas for the autumn refresh", date: "Jun 29, 2026", excerpt: "Warm tones, golden gradients, and forest photography. Maybe pair with acoustic guitar...", mood: "Reflective" },
    { title: "First week with Deckoviz", date: "Jun 22, 2026", excerpt: "Set up the morning meditation ritual and it has transformed my mornings completely...", mood: "Grateful" },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="Creative Journal" subtitle="Document your creative journey, ideas, and reflections" icon={<BookOpen size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{entries.length} Entries</h2>
        <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-md flex items-center gap-1"><PenTool size={12} /> New Entry</button>
      </div>
      <div className="space-y-3">
        {entries.map((entry, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-gray-800">{entry.title}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#182a4a] font-semibold">{entry.mood}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-2">{entry.excerpt}</p>
            <p className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar size={10} /> {entry.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================== ADD CONTENT TABS ======================== */
function AddContentTabs() {
  const [subTab, setSubTab] = useState<"images" | "media" | "collection">("images");

  return (
    <div className="mx-auto w-full max-w-[1094px] px-8 py-10">
      <div className="mb-7 flex items-center gap-3">
        <button
          onClick={() => setSubTab("images")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${subTab === "images"
            ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
            : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
            }`}
        >
          <ImagePlus size={16} />
          Add Images
        </button>
        <button
          onClick={() => setSubTab("media")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${subTab === "media"
            ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
            : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
            }`}
        >
          <FolderOpen size={16} />
          Add Media
        </button>
        <button
          onClick={() => setSubTab("collection")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${subTab === "collection"
            ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
            : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
            }`}
        >
          <ImagePlus size={16} />
          Create Collection
        </button>
      </div>

      {subTab === "images" && <AddImagesToCollectionView />}
      {subTab === "media" && <AddMediaView />}
      {subTab === "collection" && <CreateCollectionView />}
    </div>
  );
}
