import React, { useState } from "react";
import {
  CreditCard,
  Bell,
  Shield,
  Sliders,
  Users,
  CheckCircle,
  Zap,
  Save,
  Radio,
  Send,
  Lock,
  Globe,
  Database
} from "lucide-react";

export const MasterAdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"subscriptions" | "broadcasts" | "team">("subscriptions");

  // Broadcast state
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMsg, setAnnouncementMsg] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Subscription Limits
  const [proPrice, setProPrice] = useState("19");
  const [enterprisePrice, setEnterprisePrice] = useState("99");
  const [freeCreditLimit, setFreeCreditLimit] = useState("100");

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementMsg.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
    setAnnouncementTitle("");
    setAnnouncementMsg("");
  };

  return (
    <div className="space-y-8 animate-fadeIn font-sans pt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 flex items-center gap-1.5 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              Platform Configuration Console
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#182A4A] tracking-tight">Subscriptions & System Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure global tier pricing, broadcast system announcements, and team access.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-1.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm inline-flex flex-wrap items-center gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-5 py-2.5 rounded-xl transition-all ${
            activeTab === "subscriptions"
              ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          Subscription Tiers & Credits
        </button>

        <button
          onClick={() => setActiveTab("broadcasts")}
          className={`px-5 py-2.5 rounded-xl transition-all ${
            activeTab === "broadcasts"
              ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          System Announcements
        </button>

        <button
          onClick={() => setActiveTab("team")}
          className={`px-5 py-2.5 rounded-xl transition-all ${
            activeTab === "team"
              ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white shadow-md"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          Master Admin Team
        </button>
      </div>

      {/* Tab 1: Subscriptions */}
      {activeTab === "subscriptions" && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#182a4a] text-white flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Tier Pricing & Credit Allocations</h3>
                <p className="text-xs text-slate-500">Manage monthly subscription rates and generative AI quotas.</p>
              </div>
            </div>

            <button
              onClick={() => alert("Subscription parameters saved!")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Pricing Config
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">Free Tier</span>
              <div>
                <span className="text-3xl font-black text-slate-900">$0</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly AI Credits</label>
                <input
                  type="number"
                  value={freeCreditLimit}
                  onChange={(e) => setFreeCreditLimit(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-mono"
                />
              </div>
            </div>

            {/* Pro Tier */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Pro Tier</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-500">$</span>
                <input
                  type="number"
                  value={proPrice}
                  onChange={(e) => setProPrice(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-2xl font-black text-slate-900"
                />
                <span className="text-xs text-slate-500"> / month</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly AI Credits</label>
                <input
                  type="number"
                  defaultValue={2000}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-mono"
                />
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="p-5 rounded-2xl bg-[#182a4a] text-white space-y-4 shadow-md">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">Enterprise Tier</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-300">$</span>
                <input
                  type="number"
                  value={enterprisePrice}
                  onChange={(e) => setEnterprisePrice(e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-2xl font-black text-white"
                />
                <span className="text-xs text-slate-300"> / month</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">Monthly AI Credits</label>
                <input
                  type="number"
                  defaultValue={25000}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: System Announcements */}
      {activeTab === "broadcasts" && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#182a4a] text-white flex items-center justify-center font-bold">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Broadcast Announcement</h3>
                <p className="text-xs text-slate-500">Send live system notifications to all connected user webapps and Smart Frames.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title</label>
              <input
                type="text"
                value={announcementTitle}
                onChange={(e) => setAnnouncementTitle(e.target.value)}
                placeholder="e.g. Scheduled System Maintenance / New Artwork Drop"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-[#182a4a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Broadcast Message</label>
              <textarea
                rows={4}
                value={announcementMsg}
                onChange={(e) => setAnnouncementMsg(e.target.value)}
                placeholder="Type global notification message..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-[#182a4a]"
              />
            </div>

            {broadcastSent && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Live broadcast sent successfully across network!
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#182a4a] via-[#1e345d] to-[#254174] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#182a4a]/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Broadcast Notification
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Master Admin Team Roles */}
      {activeTab === "team" && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-[#182a4a] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#182a4a]" />
            Master Admin Team Directory
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/20">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Suraj Sicero</h4>
                <span className="text-xs text-slate-500">suraj@deckoviz.com • Master Admin & Owner</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#182A4A] text-white shadow-sm">Sole Master Admin</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterAdminSettings;
