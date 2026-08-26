import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ImageIcon,
  Tv,
  CreditCard,
  Settings,
  Shield,
  ArrowLeft,
  Lock,
  Key,
  LogOut,
  Sparkles,
  Server,
  Activity,
  ChevronRight,
  Database
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import MasterAdminDashboard from "./MasterAdminDashboard";
import MasterAdminUsers from "./MasterAdminUsers";
import MasterAdminLibrary from "./MasterAdminLibrary";
import MasterAdminDevices from "./MasterAdminDevices";
import MasterAdminSettings from "./MasterAdminSettings";

export const MasterAdminSuite: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication State (Passcode: admin / deckoviz / deckoviz2026)
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("deckoviz_admin_auth") === "true";
  });
  const [authError, setAuthError] = useState("");

  // Determine current view from route path
  const getViewFromPath = (): "dashboard" | "users" | "library" | "devices" | "settings" => {
    const path = location.pathname;
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/library")) return "library";
    if (path.includes("/admin/devices")) return "devices";
    if (path.includes("/admin/subscriptions") || path.includes("/admin/settings")) return "settings";
    return "dashboard";
  };

  const [currentView, setCurrentView] = useState<"dashboard" | "users" | "library" | "devices" | "settings">(
    getViewFromPath()
  );

  // Sync state when route changes
  React.useEffect(() => {
    setCurrentView(getViewFromPath());
  }, [location.pathname]);

  const handleNavigateView = (view: "dashboard" | "users" | "library" | "devices" | "settings") => {
    setCurrentView(view);
    if (view === "dashboard") navigate("/admin");
    else navigate(`/admin/${view}`);
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validCodes = ["deckovizadmin123"];
    if (validCodes.includes(passcode.trim())) {
      setIsAuthenticated(true);
      localStorage.setItem("deckoviz_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Security Passcode. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("deckoviz_admin_auth");
    navigate("/");
  };

  // Shared platform stats
  const stats = {
    totalUsers: 1420,
    activeFrames: 38,
    globalArtworks: 2450,
    cloudStorageGb: 184,
    monthlyRevenue: 28450
  };

  // ──────────────── LOCK SCREEN (Webapp Brand Theme) ────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#182A4A] via-[#1e3a6e] to-[#2563EB] flex items-center justify-center p-4 text-white font-sans">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 shadow-2xl space-y-6 border border-white/60 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#182A4A] to-[#2563EB] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#2563EB]/30">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#182A4A]">DECKOVIZ MASTER ADMIN</h1>
            <p className="text-xs text-slate-500">Enter security credentials to access global management suite.</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Admin Passcode
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. admin)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all font-mono"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-600 text-center font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] hover:opacity-95 text-white font-extrabold text-sm transition-all shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Unlock Admin Suite
            </button>
          </form>


        </div>
      </div>
    );
  }

  // ──────────────── MAIN ADMIN SUITE INTERFACE (Webapp Brand Theme) ────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row relative font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between space-y-6 flex-shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#182A4A] to-[#2563EB] flex items-center justify-center font-black text-white text-base shadow-md shadow-[#2563EB]/20">
                D
              </div>
              <div>
                <span className="font-black text-[#182A4A] text-sm tracking-tight block">DECKOVIZ</span>
                <span className="text-[10px] text-cyan-600 font-extrabold tracking-wider uppercase block">Master Admin</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-colors"
              title="Return to Main Webapp"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => handleNavigateView("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentView === "dashboard"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20"
                  : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Overview
            </button>

            <button
              onClick={() => handleNavigateView("users")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentView === "users"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20"
                  : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
              }`}
            >
              <Users className="w-4 h-4" />
              User Directory
            </button>

            <button
              onClick={() => handleNavigateView("library")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentView === "library"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20"
                  : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Global Media Library
            </button>

            <button
              onClick={() => handleNavigateView("devices")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentView === "devices"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20"
                  : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
              }`}
            >
              <Tv className="w-4 h-4" />
              Smart Frame Devices
            </button>

            <button
              onClick={() => handleNavigateView("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentView === "settings"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-bold shadow-md shadow-[#2563EB]/20"
                  : "text-slate-600 hover:text-[#2563EB] hover:bg-slate-50"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Subscriptions & Settings
            </button>
          </nav>
        </div>

        {/* Footer Info & Logout */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Deckoviz Network Online
            </div>
            <div className="text-slate-400 font-mono text-[10px]">Version 4.2.0 • Secure</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Lock Admin Console
          </button>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full min-w-0">
        {currentView === "dashboard" && (
          <MasterAdminDashboard onNavigate={handleNavigateView} stats={stats} />
        )}
        {currentView === "users" && (
          <MasterAdminUsers selectedUserId={location.pathname.split("/admin/users/")[1]} onSelectUser={(id) => id ? navigate(`/admin/users/${id}`) : navigate("/admin/users")} />
        )}
        {currentView === "library" && <MasterAdminLibrary />}
        {currentView === "devices" && <MasterAdminDevices />}
        {currentView === "settings" && <MasterAdminSettings />}
      </main>
    </div>
  );
};

export default MasterAdminSuite;
