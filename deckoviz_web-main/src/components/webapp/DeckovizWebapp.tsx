import { useState } from "react";
import type React from "react";
import {
  Bell,
  ClipboardCheck,
  CreditCard,
  FolderOpen,
  Grid3X3,
  Headphones,
  ImagePlus,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Package,
  PanelTopOpen,
  ReceiptText,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
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
import PaymentDetailsView from "./views/PaymentDetailsView";
import PricingPlanView from "./views/PricingPlanView";
import ProductInfoView from "./views/ProductInfoView";
import ProfileView from "./views/ProfileView";
import SearchView from "./views/SearchView";
import { figmaAssets } from "./webappData";



type ViewType =
  | "marketplace"
  | "artists"
  | "ai_manager"
  | "collections"
  | "create_collection"
  | "add"
  | "social"
  | "profile"
  | "followers"
  | "following"
  | "cart"
  | "pricing"
  | "payment"
  | "product_info"
  | "art_drawer"
  | "comments"
  | "subscription";

const navItems: { icon: React.ReactNode; label: string; view: ViewType }[] = [
  { icon: <ClipboardCheck size={21} />, label: "Create Collection", view: "create_collection" },
  { icon: <PanelTopOpen size={20} />, label: "Social feed", view: "social" },
  { icon: <Sparkles size={24} />, label: "Add Content", view: "add" },
  { icon: <ShoppingBag size={20} />, label: "Cart", view: "cart" },
  { icon: <Grid3X3 size={20} />, label: "Art drawer", view: "art_drawer" },
];

const menuItems: { icon: React.ReactNode; label: string; view?: ViewType }[] = [
  { icon: <User size={16} />, label: "Account", view: "profile" },
  { icon: <User size={16} />, label: "Followers", view: "followers" },
  { icon: <User size={16} />, label: "Following", view: "following" },
  { icon: <CreditCard size={16} />, label: "Subscription", view: "subscription" },
  { icon: <CreditCard size={16} />, label: "Payment", view: "payment" },
  { icon: <ReceiptText size={16} />, label: "Billing" },
  { icon: <Headphones size={16} />, label: "Saved Music" },
  { icon: <Package size={16} />, label: "Pricing Page", view: "pricing" },
  { icon: <Sparkles size={16} />, label: "AI Photo Manager", view: "ai_manager" },
  { icon: <ImagePlus size={16} />, label: "Create Collection", view: "create_collection" },
  { icon: <ImagePlus size={16} />, label: "Add Media", view: "add" },
  { icon: <Mail size={16} />, label: "Inbox & Message" },
  { icon: <ShoppingBag size={16} />, label: "Market place", view: "marketplace" },
  { icon: <MessageSquare size={16} />, label: "Comments", view: "comments" },
  { icon: <Settings size={16} />, label: "Settings" },
  { icon: <Headphones size={16} />, label: "Support" },
  { icon: <LogOut size={16} />, label: "Sign out" },
];

export default function DeckovizWebapp() {
  const [activeView, setActiveView] = useState<ViewType>("marketplace");
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (view?: ViewType) => {
    if (view) setActiveView(view);
    setShowMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f4] text-[#111827]">
      <header className="sticky top-0 z-40 flex h-[54px] items-center justify-between border-b border-[#e4e4e7] bg-white px-8 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <div className="flex min-w-0 items-center gap-7">
          <button
            onClick={() => setActiveView("marketplace")}
            className="flex items-center gap-1"
            aria-label="Open marketplace"
          >
            <img src="/images/deckoviz-space-labs-icon.png" alt="Deckoviz Icon" className="h-[34px] w-[34px] object-contain drop-shadow-sm" />
            <img src="/images/deckoviz-space-labs.png" alt="Deckoviz Space Labs" className="h-[38px] w-auto object-contain" />
          </button>

          <label className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#80848c]" size={14} />
            <input
              type="search"
              placeholder="Search..."
              className="h-7 w-[310px] rounded-[5px] border border-[#e2e2e4] bg-[#f5f5f6] pl-9 pr-3 text-[12px] outline-none transition focus:border-[#b9d8ff] focus:bg-white"
            />
          </label>
        </div>


        <div className="flex items-center gap-7 text-[#484c55]">
          <button onClick={() => setActiveView("profile")} aria-label="Open profile">
            <img
              src={figmaAssets.surajAvatar}
              alt="Suraj Pandya"
              className="h-[27px] w-[27px] rounded-full object-cover ring-2 ring-[#355cdb]/20"
            />
          </button>
          <Bell size={20} strokeWidth={1.65} />
          <Settings size={20} strokeWidth={1.65} />
          <div className="relative">
            <button
              onClick={() => setShowMenu((open) => !open)}
              className="text-[#8d68ff]"
              aria-label="Open account menu"
            >
              <Menu size={26} strokeWidth={1.7} />
            </button>

            {showMenu && (
              <>
                <button
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowMenu(false)}
                  aria-label="Close menu"
                />
                <div className="absolute right-0 top-[42px] z-50 w-[220px] rounded-[8px] border border-[#e7e0ef] bg-white py-4">
                  {menuItems.map((item, index) => (
                    <button
                      key={`${item.label}-${index}`}
                      onClick={() => handleMenuClick(item.view)}
                      className={`flex w-full items-center justify-between border-b border-[#ece8f3] px-6 py-[11px] text-left text-[14px] last:border-b-0 ${
                        item.view === activeView
                          ? "bg-gradient-to-r from-[#b7d7ff] to-transparent font-semibold text-[#111827]"
                          : "text-black hover:bg-[#f4f7ff]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-black">{item.icon}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative flex min-h-[calc(100vh-54px)]">
        <aside className="sticky top-[54px] z-20 flex h-[calc(100vh-54px)] w-[157px] shrink-0 items-start justify-center py-10">
          <nav className="flex h-auto w-[99px] flex-col items-center rounded-[9px] bg-white px-4 py-7 shadow-[0_18px_34px_rgba(15,23,42,0.17)]">
            <button onClick={() => setActiveView("marketplace")} className="mb-10">
              <img src="/images/deckoviz-space-labs-icon.png" alt="Deckoviz Space Labs" className="h-[60px] w-[60px] object-contain drop-shadow-md" />
            </button>

            <div className="flex flex-col items-center gap-[32px]">
              {navItems.map((item) => {
                const active = item.view === activeView;
                const isPrimary = item.view === "add";

                return (
                  <button
                    key={item.view}
                    onClick={() => setActiveView(item.view)}
                    className={`group relative flex h-[50px] w-[50px] items-center justify-center rounded-full transition ${
                      isPrimary
                        ? "bg-[#2d7fd8] text-white shadow-[0_11px_20px_rgba(45,127,216,0.34)] hover:scale-105"
                        : active
                          ? "bg-white text-[#363a40] shadow-[0_10px_22px_rgba(15,23,42,0.16)]"
                          : "bg-white text-[#363a40] shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:scale-105"
                    }`}
                    aria-label={item.label}
                  >
                    {item.icon}
                    <span className="pointer-events-none absolute left-[62px] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 h-px w-[70px] bg-[#dbdde3]" />
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-5 pl-0">
          <div className="min-h-full rounded-[2px] bg-white/70">
            {activeView === "marketplace" && <MarketplaceView mode="home" />}
            {activeView === "artists" && <MarketplaceView mode="artists" />}
            {activeView === "ai_manager" && <AIPhotoManagerHomeView />}
            {activeView === "collections" && <AIPhotoManagerView />}
            {activeView === "create_collection" && <CreateCollectionView />}
            {activeView === "add" && <AddContentTabs />}
            {activeView === "social" && <SearchView />}
            {activeView === "profile" && <ProfileView onNavigate={setActiveView} />}
            {activeView === "followers" && <FollowersFollowingView mode="followers" onNavigate={setActiveView} />}
            {activeView === "following" && <FollowersFollowingView mode="following" onNavigate={setActiveView} />}
            {activeView === "cart" && <CartView />}
            {activeView === "pricing" && <ChoosePlanView />}
            {activeView === "payment" && <PaymentDetailsView />}
            {activeView === "product_info" && <ProductInfoView />}
            {activeView === "art_drawer" && <ArtDrawerView />}
            {activeView === "comments" && <CommentsView />}
            {activeView === "subscription" && <PricingPlanView onNavigate={setActiveView} />}
          </div>
        </section>
      </main>
    </div>
  );
}

function AddContentTabs() {
  const [subTab, setSubTab] = useState<"images" | "media" | "collection">("images");

  return (
    <div className="mx-auto w-full max-w-[1094px] px-8 py-10">
      <div className="mb-7 flex items-center gap-3">
        <button
          onClick={() => setSubTab("images")}
          className={`inline-flex items-center gap-2 rounded-[7px] px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "images"
              ? "bg-[#2f7bd0] text-white"
              : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
          }`}
        >
          <ImagePlus size={16} />
          Add Images
        </button>
        <button
          onClick={() => setSubTab("media")}
          className={`inline-flex items-center gap-2 rounded-[7px] px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "media"
              ? "bg-[#2f7bd0] text-white"
              : "bg-white text-[#4b5563] ring-1 ring-[#e5e7eb] hover:bg-[#f7f8fb]"
          }`}
        >
          <FolderOpen size={16} />
          Add Media
        </button>
        <button
          onClick={() => setSubTab("collection")}
          className={`inline-flex items-center gap-2 rounded-[7px] px-5 py-2 text-sm font-semibold shadow-sm transition ${
            subTab === "collection"
              ? "bg-[#2f7bd0] text-white"
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
