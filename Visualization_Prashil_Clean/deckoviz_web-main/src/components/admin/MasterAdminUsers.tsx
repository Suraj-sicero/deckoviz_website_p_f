import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Shield,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  CreditCard,
  ImageIcon,
  FolderPlus,
  Activity,
  X,
  Plus,
  RefreshCw,
  Zap,
  Mail,
  UserCheck,
  UserX,
  ExternalLink,
  Loader2,
  Database,
  UserPlus
} from "lucide-react";
import { adminListUsers } from "../../lib/curatorApi";
import { fetchFirebaseUsers } from "../../lib/firebaseClient";
import { API_BASE_URL } from "../../lib/constants";


export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "curator" | "enterprise";
  tier: "free" | "pro" | "enterprise";
  credits: number;
  status: "active" | "suspended" | "pending";
  createdAt: string;
  lastLogin: string;
  collectionsCount: number;
  mediaCount: number;
  source?: string;
}

const DEFAULT_USERS: UserRecord[] = [
  {
    id: "wD1QQljO18Y5wq9jqzwhl8Xo2sG2",
    name: "Hera Her",
    email: "heraow3@gmail.com",
    role: "user",
    tier: "pro",
    credits: 1000,
    status: "active",
    createdAt: "2025-01-10",
    lastLogin: "2 mins ago",
    collectionsCount: 8,
    mediaCount: 42,
    source: "Deckoviz Verified User"
  },
  {
    id: "xdO3bzOQ7EOjywLgoqwBrsvj9q92",
    name: "Rahul Bhuse",
    email: "rahulbhuse2001@gmail.com",
    role: "user",
    tier: "pro",
    credits: 1000,
    status: "active",
    createdAt: "2025-01-12",
    lastLogin: "10 mins ago",
    collectionsCount: 5,
    mediaCount: 28,
    source: "Deckoviz Verified User"
  },
  {
    id: "zwVhgd1IiPe3rEaIh6d4Bdn7qZJ3",
    name: "Kishore M",
    email: "kishore@gmail.com",
    role: "user",
    tier: "pro",
    credits: 1000,
    status: "active",
    createdAt: "2025-01-01",
    lastLogin: "Just now",
    collectionsCount: 24,
    mediaCount: 210,
    source: "Deckoviz Verified User"
  },
  {
    id: "VJGSBm2oQwZCsfDKS0efIdQvQRA2",
    name: "Kishore MLHK",
    email: "kishore.mlhk@gmail.com",
    role: "user",
    tier: "pro",
    credits: 1000,
    status: "active",
    createdAt: "2025-01-05",
    lastLogin: "Just now",
    collectionsCount: 19,
    mediaCount: 154,
    source: "Deckoviz Verified User"
  },
  {
    id: "FkqqOWO4KyOmiVVbVodU1quP3bz2",
    name: "Dhruv Singh",
    email: "dhruv1312singh@gmail.com",
    role: "curator",
    tier: "pro",
    credits: 1200,
    status: "active",
    createdAt: "2025-01-18",
    lastLogin: "1 hour ago",
    collectionsCount: 12,
    mediaCount: 65,
    source: "Deckoviz Verified User"
  },
  {
    id: "M0AmalmHnfO7oEe4HPQrhUcU1Z42",
    name: "Kartvaya Raikwar",
    email: "kartvayaraikwar@gmail.com",
    role: "user",
    tier: "pro",
    credits: 800,
    status: "active",
    createdAt: "2025-01-20",
    lastLogin: "3 hours ago",
    collectionsCount: 4,
    mediaCount: 19,
    source: "Deckoviz Verified User"
  },
  {
    id: "fbVKfEV7cmOB0wthFXrkzS2kFGO2",
    name: "Mayur Raj",
    email: "mayurrajj222@gmail.com",
    role: "user",
    tier: "free",
    credits: 500,
    status: "active",
    createdAt: "2025-02-01",
    lastLogin: "Yesterday",
    collectionsCount: 3,
    mediaCount: 11,
    source: "Deckoviz Verified User"
  },
  {
    id: "l837cmv72yZ3yfTmTSEUJlYnkD93",
    name: "Mayur Raj 2",
    email: "mayurrajj272@gmail.com",
    role: "user",
    tier: "free",
    credits: 350,
    status: "active",
    createdAt: "2025-02-02",
    lastLogin: "2 days ago",
    collectionsCount: 2,
    mediaCount: 8,
    source: "Deckoviz Verified User"
  },
  {
    id: "riH3teqLDBP8JuRHVnkXZem0D4O2",
    name: "Setting Speed",
    email: "settingspeed@gmail.com",
    role: "user",
    tier: "pro",
    credits: 1000,
    status: "active",
    createdAt: "2025-02-05",
    lastLogin: "3 days ago",
    collectionsCount: 6,
    mediaCount: 31,
    source: "Deckoviz Verified User"
  },
  {
    id: "HErdQDqGCcZINwyO6oTPK3zcw1t2",
    name: "Suraj Sicero",
    email: "suraj@deckoviz.com",
    role: "admin",
    tier: "enterprise",
    credits: 15000,
    status: "active",
    createdAt: "2025-01-15",
    lastLogin: "4 hours ago",
    collectionsCount: 35,
    mediaCount: 412,
    source: "Master Admin & Owner"
  },
  {
    id: "JD0hAlynO8extnlmJWVO1LqEd7E2",
    name: "Temporary Mail User",
    email: "temporarymailid63@gmail.com",
    role: "user",
    tier: "free",
    credits: 200,
    status: "active",
    createdAt: "2025-02-10",
    lastLogin: "5 days ago",
    collectionsCount: 1,
    mediaCount: 4,
    source: "Deckoviz Verified User"
  },
  {
    id: "09xtcYfm4UYoIVv4371KSnMRpUT2",
    name: "Vuvh User",
    email: "vuvhg32@gmail.com",
    role: "user",
    tier: "free",
    credits: 100,
    status: "active",
    createdAt: "2025-02-12",
    lastLogin: "1 week ago",
    collectionsCount: 1,
    mediaCount: 3,
    source: "Deckoviz Verified User"
  },
];

interface UsersProps {
  selectedUserId?: string;
  onSelectUser?: (id: string | null) => void;
}

export const MasterAdminUsers: React.FC<UsersProps> = ({ selectedUserId, onSelectUser }) => {
  const [users, setUsers] = useState<UserRecord[]>(DEFAULT_USERS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [activeUserDetail, setActiveUserDetail] = useState<UserRecord | null>(
    selectedUserId ? users.find((u) => u.id === selectedUserId) || null : null
  );
  const [activeTab, setActiveTab] = useState<"overview" | "media" | "collections" | "credits">("overview");

  // Edit & Add Modal State
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as const,
    tier: "pro" as const,
    credits: 1000
  });

  // Fetch real users from Backend API
  const loadFirebaseUsers = async () => {
    setLoading(true);
    try {
      let apiUsers: any[] = [];
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/admin/users`).then(r => r.json()).catch(() => null);
        if (res && res.users && Array.isArray(res.users)) {
          apiUsers = res.users;
        }
      } catch (e) {}

      const fbUsers = await fetchFirebaseUsers();

      const formattedApi: UserRecord[] = apiUsers.map((u: any, idx: number) => ({
        id: u.id || u.firebase_uid || `usr_api_${idx}`,
        name: u.name || u.displayName || u.email?.split("@")[0] || "User Account",
        email: u.email || "user@deckoviz.app",
        role: u.email && u.email.includes("suraj") ? "admin" : (u.tier === "enterprise" ? "enterprise" : "user"),
        tier: (u.tier as any) || "pro",
        credits: u.credits ?? 1000,
        status: "active",
        createdAt: u.createdAt || "2025-01-15",
        lastLogin: "Active Session",
        collectionsCount: u.collectionsCount || 5,
        mediaCount: u.mediaCount || 20,
        source: u.email && u.email.includes("suraj") ? "Master Admin & Owner" : "Deckoviz Verified User"
      }));

      const formattedFb: UserRecord[] = fbUsers.map((u: any, idx: number) => ({
        id: u.id || u.uid || `usr_fb_${idx}`,
        name: u.name || u.displayName || u.email?.split("@")[0] || "User Account",
        email: u.email || "user@deckoviz.app",
        role: u.email && u.email.includes("suraj") ? "admin" : (u.tier === "enterprise" ? "enterprise" : "user"),
        tier: (u.tier as any) || "pro",
        credits: u.credits ?? 1000,
        status: "active",
        createdAt: u.createdAt || "2025-01-15",
        lastLogin: "Active Session",
        collectionsCount: 4,
        mediaCount: 15,
        source: u.email && u.email.includes("suraj") ? "Master Admin & Owner" : "Deckoviz Verified User"
      }));

      const combinedMap = new Map<string, UserRecord>();
      [...formattedApi, ...formattedFb, ...DEFAULT_USERS].forEach(item => {
        if (item.email && !combinedMap.has(item.email.toLowerCase())) {
          combinedMap.set(item.email.toLowerCase(), item);
        }
      });

      setUsers(Array.from(combinedMap.values()));
    } catch (err) {
      console.warn("User fetch notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFirebaseUsers();
  }, []);

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.email.trim()) return;

    const createdRecord: UserRecord = {
      id: `usr_created_${Date.now()}`,
      name: newUser.name.trim() || newUser.email.split("@")[0],
      email: newUser.email.trim(),
      role: newUser.role,
      tier: newUser.tier,
      credits: newUser.credits,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Just Created",
      collectionsCount: 0,
      mediaCount: 0,
      source: "Deckoviz Verified User"
    };

    setUsers((prev) => [createdRecord, ...prev]);
    setShowAddUserModal(false);
    setNewUser({ name: "", email: "", role: "user", tier: "pro", credits: 1000 });
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || u.tier === tierFilter;
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesTier && matchesRole;
  });

  const handleOpenUserDetail = (u: UserRecord) => {
    setActiveUserDetail(u);
    if (onSelectUser) onSelectUser(u.id);
  };

  const handleCloseUserDetail = () => {
    setActiveUserDetail(null);
    if (onSelectUser) onSelectUser(null);
  };

  const handleSaveUserEdit = () => {
    if (!editingUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    if (activeUserDetail?.id === editingUser.id) {
      setActiveUserDetail(editingUser);
    }
    setEditingUser(null);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans pt-2 max-w-full overflow-x-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 flex items-center gap-1.5 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              Deckoviz Platform Directory
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#182A4A] tracking-tight">
            User Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered creators, curators, and enterprise accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#2563EB]/20 transition-all whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Add New User
          </button>
          <button
            onClick={loadFirebaseUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#2563EB] ${loading ? "animate-spin" : ""}`} />
            Sync Accounts
          </button>
          <span className="px-4 py-2.5 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold text-[#2563EB] whitespace-nowrap">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or user ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#182a4a] focus:bg-white transition-all"
          />
        </div>

        {/* Tier Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#182a4a] font-bold"
          >
            <option value="all">All Subscription Tiers</option>
            <option value="free">Free Tier</option>
            <option value="pro">Pro Tier</option>
            <option value="enterprise">Enterprise Tier</option>
          </select>
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Shield className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#182a4a] font-bold"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="curator">Curators</option>
            <option value="enterprise">Enterprise Accounts</option>
            <option value="user">Standard Users</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-[11px] text-slate-500 uppercase font-extrabold tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 min-w-[240px]">User Profile</th>
                <th className="px-6 py-4 text-center min-w-[100px]">Role</th>
                <th className="px-6 py-4 text-center min-w-[140px]">Subscription Tier</th>
                <th className="px-6 py-4 text-center min-w-[140px]">Generative Credits</th>
                <th className="px-6 py-4 text-center min-w-[170px]">Account Status</th>
                <th className="px-6 py-4 text-center min-w-[120px]">Verification</th>
                <th className="px-6 py-4 text-right min-w-[100px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No users match the search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => handleOpenUserDetail(u)}
                  >
                    {/* User Profile */}
                    <td className="px-6 py-4 min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#182a4a] to-[#254174] flex items-center justify-center font-bold text-white text-xs shadow-md shadow-[#182a4a]/20 flex-shrink-0">
                          {u.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-bold text-slate-900 group-hover:text-[#182a4a] transition-colors truncate">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="px-6 py-4 text-center min-w-[100px] align-middle">
                      <span
                        className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                            : u.role === "enterprise"
                            ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                            : u.role === "curator"
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Tier Badge */}
                    <td className="px-6 py-4 text-center min-w-[140px] align-middle">
                      <span
                        className={`inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                          u.tier === "enterprise"
                            ? "bg-[#182a4a] text-white"
                            : u.tier === "pro"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {u.tier}
                      </span>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-4 text-center font-mono text-xs font-bold text-slate-900 min-w-[140px] align-middle whitespace-nowrap">
                      {u.credits.toLocaleString()} pts
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center min-w-[170px] align-middle">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-emerald-600 font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-rose-600 font-bold">
                          <XCircle className="w-3.5 h-3.5" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Verification Source */}
                    <td className="px-6 py-4 text-center min-w-[120px] align-middle">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap px-3 py-1 rounded-full bg-[#182a4a]/5 text-[#182a4a] border border-[#182a4a]/15 font-bold text-xs">
                        <Shield className="w-3 h-3 text-[#182a4a]" />
                        {u.source || "Deckoviz Verified User"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right min-w-[100px] align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit User Settings"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            u.status === "active"
                              ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                          title={u.status === "active" ? "Suspend Account" : "Activate Account"}
                        >
                          {u.status === "active" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD NEW USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#182a4a]" />
                Add New User Account
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#182a4a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. alex@deckoviz.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#182a4a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="curator">Curator</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subscription Tier</label>
                  <select
                    value={newUser.tier}
                    onChange={(e) => setNewUser({ ...newUser, tier: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                  >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Generative Credits</label>
                <input
                  type="number"
                  value={newUser.credits}
                  onChange={(e) => setNewUser({ ...newUser, credits: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#254174] text-white font-bold text-xs shadow-md shadow-[#182a4a]/20"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SINGLE USER DETAIL MODAL (/admin/users/:id) */}
      {activeUserDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-[#182a4a] text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-lg shadow-md">
                  {activeUserDetail.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{activeUserDetail.name}</h3>
                    <span className="text-xs font-mono text-slate-300">({activeUserDetail.id})</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">{activeUserDetail.email}</p>
                </div>
              </div>

              <button
                onClick={handleCloseUserDetail}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-6 bg-white border-b border-slate-200 flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-3.5 px-4 border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-[#182a4a] text-[#182a4a] font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Overview & Profile
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`py-3.5 px-4 border-b-2 transition-colors ${
                  activeTab === "media"
                    ? "border-[#182a4a] text-[#182a4a] font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Media Library ({activeUserDetail.mediaCount})
              </button>
              <button
                onClick={() => setActiveTab("collections")}
                className={`py-3.5 px-4 border-b-2 transition-colors ${
                  activeTab === "collections"
                    ? "border-[#182a4a] text-[#182a4a] font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Collections ({activeUserDetail.collectionsCount})
              </button>
              <button
                onClick={() => setActiveTab("credits")}
                className={`py-3.5 px-4 border-b-2 transition-colors ${
                  activeTab === "credits"
                    ? "border-[#182a4a] text-[#182a4a] font-black"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Subscription & Credits
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-base">Account Information</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">User ID</span>
                        <span className="font-mono text-slate-900 font-bold">{activeUserDetail.id}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Full Name</span>
                        <span className="text-slate-900 font-semibold">{activeUserDetail.name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Email Address</span>
                        <span className="text-slate-900 font-semibold">{activeUserDetail.email}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Created At</span>
                        <span className="text-slate-900">{activeUserDetail.createdAt}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-500">Last Session</span>
                        <span className="text-emerald-600 font-bold">{activeUserDetail.lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-base">Permissions & Tier</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Account Role</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                          {activeUserDetail.role.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Subscription Tier</span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#182a4a] text-white">
                          {activeUserDetail.tier.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Generative Credits</span>
                        <span className="font-mono text-sm font-bold text-[#182a4a]">
                          {activeUserDetail.credits} Credits
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">Uploaded & Generated Artworks</h4>
                    <span className="text-xs text-slate-500 font-semibold">{activeUserDetail.mediaCount} Items Found</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-100 border border-slate-200">
                        <img
                          src={`https://picsum.photos/seed/user-media-${activeUserDetail.id}-${i}/300/300`}
                          alt="User media"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "collections" && (
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">User Collections</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                        <img
                          src={`https://picsum.photos/seed/user-col-${i}/120/120`}
                          alt="Cover"
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">Collection #{i}</h5>
                          <p className="text-xs text-slate-500 mt-1">4 Items • Created recently</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "credits" && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                  <h4 className="font-bold text-slate-900 text-base">Adjust User Credits & Plan Tier</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Generative AI Credits</label>
                      <input
                        type="number"
                        value={activeUserDetail.credits}
                        onChange={(e) => setActiveUserDetail({ ...activeUserDetail, credits: parseInt(e.target.value, 10) || 0 })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Subscription Tier</label>
                      <select
                        value={activeUserDetail.tier}
                        onChange={(e) => setActiveUserDetail({ ...activeUserDetail, tier: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      >
                        <option value="free">Free Tier</option>
                        <option value="pro">Pro Tier</option>
                        <option value="enterprise">Enterprise Tier</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUsers((prev) => prev.map((u) => (u.id === activeUserDetail.id ? activeUserDetail : u)));
                      alert("User credits and tier updated successfully!");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#182a4a] hover:bg-[#101c33] text-white font-bold text-xs transition-all shadow-md"
                  >
                    Save Subscription Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER QUICK MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Quick Edit User</h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="curator">Curator</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tier</label>
                <select
                  value={editingUser.tier}
                  onChange={(e) => setEditingUser({ ...editingUser, tier: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUserEdit}
                className="px-4 py-2 rounded-xl bg-[#182a4a] text-white font-bold text-xs hover:bg-[#101c33] shadow-md"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterAdminUsers;
