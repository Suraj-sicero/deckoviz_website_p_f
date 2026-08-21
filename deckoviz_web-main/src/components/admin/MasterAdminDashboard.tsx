import React from "react";
import {
  Users,
  ImageIcon,
  Tv,
  HardDrive,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Zap,
  Plus,
  RefreshCw,
  Clock,
  Sparkles,
  Shield,
  Layers
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: "dashboard" | "users" | "library" | "devices" | "settings") => void;
  stats: {
    totalUsers: number;
    activeFrames: number;
    globalArtworks: number;
    cloudStorageGb: number;
    monthlyRevenue: number;
  };
}

export const MasterAdminDashboard: React.FC<DashboardProps> = ({ onNavigate, stats }) => {
  return (
    <div className="space-y-8 animate-fadeIn font-sans pt-2">
      {/* Top Banner Gradient (Home Webapp Brand: #182A4A via #1e3a6e to #2563EB) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] p-8 text-white shadow-xl shadow-[#2563EB]/20 border border-white/20">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Master Control Active
            </span>
            <span className="text-xs text-blue-200 font-bold">• Deckoviz Enterprise</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            Master Admin <span className="text-cyan-400">Suite</span>
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
            Central control operations for Deckoviz Smart Frames, member subscriptions, visual content curation, and media vault storage.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("library")}
              className="px-5 py-2.5 rounded-xl bg-white text-[#182A4A] hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-[#2563EB]" /> Upload Global Artwork
            </button>
            <button
              onClick={() => onNavigate("users")}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs transition-all border border-white/20 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-cyan-300" /> Manage Member Directory
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Total Users */}
        <div
          onClick={() => onNavigate("users")}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Registered Users</span>
            <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14% from last month
            </div>
          </div>
        </div>

        {/* Active Smart Frames */}
        <div
          onClick={() => onNavigate("devices")}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Frames</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <Tv className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.activeFrames}</div>
            <div className="text-[11px] text-cyan-600 font-bold flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" /> Live Stream Sync
            </div>
          </div>
        </div>

        {/* Global Artworks */}
        <div
          onClick={() => onNavigate("library")}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Global Artworks</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.globalArtworks.toLocaleString()}</div>
            <div className="text-[11px] text-purple-600 font-bold flex items-center gap-1 mt-1">
              <Layers className="w-3 h-3" /> Master Art Vault
            </div>
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cloud Storage</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.cloudStorageGb} GB</div>
            <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-1">
              High-Capacity Storage
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div
          onClick={() => onNavigate("settings")}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">${stats.monthlyRevenue.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Active Subscriptions
            </div>
          </div>
        </div>
      </div>

      {/* QUICK OPERATIONS & SYSTEM HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operations Panel */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-[#182A4A] text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Master Operations Shortcuts
            </h3>
            <span className="text-xs text-slate-400 font-bold">1-Click Management</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate("library")}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors">
                  Upload Visual Artwork
                </div>
                <div className="text-xs text-slate-500">Add 4K imagery to platform library</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            </button>

            <button
              onClick={() => onNavigate("users")}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors">
                  User Directory
                </div>
                <div className="text-xs text-slate-500">Manage user accounts & tiers</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            </button>

            <button
              onClick={() => onNavigate("devices")}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors">
                  Remote Frame Control
                </div>
                <div className="text-xs text-slate-500">Pair & push media to Smart Frames</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            </button>

            <button
              onClick={() => onNavigate("settings")}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 text-left transition-all group flex items-start justify-between"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 text-sm group-hover:text-[#2563EB] transition-colors">
                  Platform Subscriptions
                </div>
                <div className="text-xs text-slate-500">Configure tier limits & pricing</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] transition-colors" />
            </button>
          </div>
        </div>

        {/* System Health Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#182A4A] to-[#1e3a6e] text-white shadow-lg space-y-5 flex flex-col justify-between border border-white/10">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">Master Admin Privileges</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              You are logged into the central operational dashboard. All actions are logged and synchronized across the network.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-slate-300">System Operator</span>
              <span className="font-bold text-amber-400">Suraj Sicero</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/10">
              <span className="text-slate-300">Security Layer</span>
              <span className="font-bold text-emerald-400">Encrypted</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-300">Network Latency</span>
              <span className="font-bold text-white">12 ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterAdminDashboard;
