import { useState, useRef, useCallback } from "react";
import type React from "react";
import {
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Film,
  FolderOpen,
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
  Upload,
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
const quickActions = [
  { icon: <Brush size={16} />, label: "Create Art", color: "from-blue-500 to-indigo-600" },
  { icon: <Layers size={16} />, label: "Create Poster", color: "from-cyan-500 to-blue-600" },
  { icon: <Sparkles size={16} />, label: "Sequential Art", color: "from-[#182a4a] to-[#2563eb]" },
  { icon: <ImagePlus size={16} />, label: "Change Collection", color: "from-blue-400 to-[#182a4a]" },
];

export default function DeckovizWebapp() {
  const [activeView, setActiveView] = useState<ViewType>("drawing_room");
  const [showMenu, setShowMenu] = useState(false);
  const [showVirtualFrameModal, setShowVirtualFrameModal] = useState(false);

  const handleMenuClick = (view: ViewType) => {
    if (view === "vgc") {
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

            {/* Right: Notifications + 3 bars */}
            <div className="flex items-center gap-3 pr-2 text-[#6b7280]">
              <button className="relative transition hover:scale-110 p-2 rounded-full hover:bg-white/40" aria-label="Notifications">
                <Bell size={19} strokeWidth={1.7} className="text-[#182a4a]" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm border border-white">2</span>
              </button>

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
                      <div className="px-4 py-2 border-b border-[#f0f0f4] mb-1">
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
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] font-semibold transition ${
                              item.view === activeView
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

            {/* Bottom — Settings */}
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
            {activeView === "drawing_room" && <DrawingRoomView onNavigate={setActiveView} onSendToFrame={() => setShowVirtualFrameModal(true)} />}
            {activeView === "vgc" && <VGCPlaceholder />}
            {activeView === "create_collection" && <CreateCollectionView />}
            {activeView === "vcc" && <VCCPlaceholder />}
            {activeView === "daily_queue" && <DailyQueuePlaceholder />}
            {activeView === "all_media" && <AllMediaPlaceholder />}
            {activeView === "explore_library" && <ExploreLibraryPlaceholder />}
            {activeView === "settings" && <SettingsPlaceholder />}
            {activeView === "all_collections" && <AIPhotoManagerView />}
            {activeView === "deep_profile" && <ProfileView onNavigate={setActiveView} />}
            {activeView === "events" && <EventsPlaceholder />}
            {activeView === "rituals" && <RitualsPlaceholder />}
            {activeView === "members" && <MembersPlaceholder />}
            {activeView === "curations" && <CurationsPlaceholder />}
            {activeView === "music_dashboard" && <MusicDashboardPlaceholder />}
            {activeView === "music_library" && <MusicLibraryPlaceholder />}
            {activeView === "narrations" && <NarrationsPlaceholder />}
            {activeView === "saved_notes" && <SavedNotesPlaceholder />}
            {activeView === "short_film" && <ShortFilmPlaceholder />}
            {activeView === "creative_journal" && <CreativeJournalPlaceholder />}
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
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    tab === t
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
                        className={`relative aspect-square rounded-xl overflow-hidden group transition-all duration-200 ${
                          selected === img
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
                className={`flex items-center gap-2.5 px-7 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  selected
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

        <div className="relative z-10">
          <p className="text-blue-200/80 text-[11px] font-bold uppercase tracking-[0.3em] mb-2">Your Deckoviz Home</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Drawing Room</h1>
          <p className="text-blue-100/70 text-sm max-w-lg leading-relaxed">Your creative command centre. Everything about your home's visual identity, collections, and experiences lives here.</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <button key={action.label} className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(24,42,74,0.12)] transition-all duration-300 hover:-translate-y-1">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#182a4a] transition-colors">{action.label}</span>
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

      {/* Current Collection + Favourites Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Collection */}
        <SectionCard title="Current Collection" subtitle="Morning Serenity" icon={<Layers size={18} />} accentColor="#182a4a">
          <div className="grid grid-cols-3 gap-3 mt-4">
            {["/images/herol (3).png", "/images/herol (5).png", "/images/herol (7).png"].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">12 artworks - Last updated 2 hours ago</p>
        </SectionCard>

        {/* Favourite Collections */}
        <SectionCard title="Favourite Collections" icon={<Heart size={18} />} accentColor="#e11d48">
          <div className="space-y-3 mt-4">
            {["Evening Ambiance", "Nature Escapes", "Abstract Dreams"].map((name, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0">
                  <img src={`/images/herol (${i + 10}).png`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-[#182a4a] transition-colors truncate">{name}</p>
                  <p className="text-[11px] text-gray-400">{8 + i * 3} artworks</p>
                </div>
                <Heart size={14} className="text-rose-400 fill-rose-400 shrink-0" />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Favourite Artworks */}
      <SectionCard title="Favourite Artworks" icon={<Star size={18} />} accentColor="#f59e0b" fullWidth>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {["/images/herol (1).png", "/images/herol (2).png", "/images/herol (4).png", "/images/herol (8).png"].map((img, i) => (
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
function VGCPlaceholder() {
  const subAgents = [
    { name: "Art Generator", desc: "Create unique artworks from text prompts", icon: <Brush size={20} /> },
    { name: "Poster Studio", desc: "Design stunning posters and typography art", icon: <Layers size={20} /> },
    { name: "Sequential Art", desc: "Generate comic strips and visual stories", icon: <Film size={20} /> },
    { name: "Music Composer", desc: "Compose ambient sounds and melodies", icon: <Music size={20} /> },
    { name: "Narration Studio", desc: "Create voiceovers and spoken content", icon: <Mic size={20} /> },
    { name: "Video Creator", desc: "Transform images into short animations", icon: <Eye size={20} /> },
    { name: "Style Advisor", desc: "Get recommendations for your space", icon: <Wand2 size={20} /> },
  ];
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="VGC - Generative Chat" subtitle="Create content and media with 7+ specialised AI sub-agents" icon={<MessageSquare size={24} />} />
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Sub-Agents</h2>
        <button className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 hover:underline">All Chats <ChevronRight size={14} /></button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {subAgents.map((agent) => (
          <button key={agent.name} className="group text-left p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 hover:shadow-[0_12px_30px_rgba(24,42,74,0.1)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform">{agent.icon}</div>
            <p className="text-sm font-bold text-gray-800 mb-1">{agent.name}</p>
            <p className="text-[11px] text-gray-400 leading-relaxed">{agent.desc}</p>
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
        {[
          { title: "Generate a sunrise over calm ocean", agent: "Art Generator", time: "2 hours ago" },
          { title: "Create ambient music for evening", agent: "Music Composer", time: "Yesterday" },
          { title: "Design a motivational poster", agent: "Poster Studio", time: "2 days ago" },
        ].map((chat, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-md transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shrink-0"><MessageSquare size={14} /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{chat.title}</p>
              <p className="text-[11px] text-gray-400">{chat.agent} - {chat.time}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-4 mt-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/70 shadow-[0_8px_30px_rgba(24,42,74,0.1)]">
          <input type="text" placeholder="Describe what you'd like to create..." className="flex-1 bg-transparent text-sm outline-none px-3 py-2 placeholder-gray-400" />
          <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"><Send size={16} /></button>
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
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="VCC - Visual Content Creator" subtitle="Your visual content creation studio for art, posters, and design" icon={<Palette size={24} />} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {tools.map((tool) => (
          <button key={tool.name} className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 border border-white/60 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white flex items-center justify-center group-hover:scale-110 transition-transform">{tool.icon}</div>
            <span className="text-xs font-semibold text-gray-700">{tool.name}</span>
          </button>
        ))}
      </div>
      {/* Canvas Area */}
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/30 p-12 text-center">
        <Upload size={32} className="mx-auto text-gray-300 mb-3" />
        <p className="text-sm font-semibold text-gray-500 mb-1">Drop an image or start from scratch</p>
        <p className="text-xs text-gray-400 mb-4">Upload reference images, or let Vizzy generate from your prompt</p>
        <button className="px-6 py-2.5 rounded-full text-sm font-semibold text-white shadow-lg bg-gradient-to-r from-[#182a4a] to-[#2563EB] hover:scale-105 transition-all">Start Creating</button>
      </div>
      {/* Recent Creations */}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Creations</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["/images/herol (1).png", "/images/herol (3).png", "/images/herol (5).png", "/images/herol (7).png"].map((img, i) => (
          <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
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
  return (
    <div className="space-y-6 pb-12">
      <ViewHeader title="All Media" subtitle="All your generated and uploaded media in one place" icon={<ImageIcon size={24} />} />
      <div className="flex gap-2 flex-wrap">
        {["Generated Images", "Generated Videos", "Generated Narrations", "Generated Music", "Uploaded Images", "Uploaded Videos", "Uploaded Music"].map((tab, i) => (
          <button key={tab} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${i === 0 ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg" : "bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border border-gray-100"}`}>
            {tab}
          </button>
        ))}
      </div>
      <MediaView />
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
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "images"
              ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
              : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
          }`}
        >
          <ImagePlus size={16} />
          Add Images
        </button>
        <button
          onClick={() => setSubTab("media")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "media"
              ? "bg-gradient-to-r from-[#182a4a] to-[#2563EB] text-white shadow-lg"
              : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
          }`}
        >
          <FolderOpen size={16} />
          Add Media
        </button>
        <button
          onClick={() => setSubTab("collection")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "collection"
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
