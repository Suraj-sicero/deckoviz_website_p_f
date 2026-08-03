import { useState, useEffect, useRef } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  Phone,
  Shield,
  Users,
  Monitor,
  Calendar,
  Edit2,
  Loader2,
  Camera,
  Save,
  X,
  Check,
  Brain,
  Zap,
  TrendingUp,
  Crown,
  Layers,
  Wifi,
  Activity,
  Plus,
  Trash2,
  UserPlus,
} from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { useAuth } from "../../../context/AuthContext";
import { getUserAvatar } from "../../../lib/userStorage";
import { webappApi } from "../../../lib/webappApi";

export default function EnterpriseProfileView({ onEditProfile }: { onEditProfile?: () => void }) {
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState<any>({
    name: "Enterprise Space Labs",
    subtitle: "Enterprise Suite Headquarters",
    location: "Global Headquarters",
    industry: "Enterprise Technology & Art",
    website: "",
    contactEmail: "",
    contactPhone: "",
    units: 14,
    activeFrames: 56,
    upcomingEvents: 8,
    tier: "Enterprise Premium",
    storage: "500 GB",
    renewalDate: "Aug 15, 2026",
    avatar: "/images/deckoviz-space-labs-icon.png",
    banner: "/images/webapp/figma/profile-banner.jpg",
    about: "Enterprise digital art installation powered by Deckoviz with live Firebase Firestore sync.",
  });
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState<any>({});
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Fetch 100% real data from Firebase Firestore (NO default hardcoded team fallback!)
  const loadFirebaseProfile = async () => {
    setLoading(true);
    try {
      const [profileRes, guestsRes] = await Promise.allSettled([
        enterpriseApi.getProfile(),
        enterpriseApi.getGuests(),
      ]);

      let fbProfile: any = {};
      if (profileRes.status === "fulfilled" && profileRes.value) {
        fbProfile = profileRes.value;
      }

      let fbGuests: any[] = [];
      if (guestsRes.status === "fulfilled" && Array.isArray(guestsRes.value)) {
        fbGuests = guestsRes.value;
      } else if (Array.isArray(fbProfile.teamMembers)) {
        fbGuests = fbProfile.teamMembers;
      }

      const mergedProfile = {
        name: fbProfile.name || fbProfile.displayName || fbProfile.company || user?.name || "Enterprise Space Labs",
        subtitle: fbProfile.subtitle || fbProfile.title || "Enterprise Suite Headquarters",
        location: fbProfile.location || "Global Headquarters",
        industry: fbProfile.industry || "Enterprise Technology",
        website: fbProfile.website || "grandmetropolitan.deckoviz.com",
        contactEmail: fbProfile.contactEmail || user?.email || "concierge@deckoviz.com",
        contactPhone: fbProfile.contactPhone || "+1 (800) 555-DECKO",
        units: fbProfile.units || 14,
        activeFrames: fbProfile.activeFrames || 56,
        upcomingEvents: fbProfile.upcomingEvents || 8,
        tier: fbProfile.tier || "Enterprise Premium",
        storage: fbProfile.storage || "500 GB",
        renewalDate: fbProfile.renewalDate || "Aug 15, 2026",
        avatar: fbProfile.avatar || getUserAvatar() || user?.avatar || "/images/deckoviz-space-labs-icon.png",
        banner: fbProfile.banner || "/images/webapp/figma/profile-banner.jpg",
        about: fbProfile.about || "Enterprise digital art installation powered by Deckoviz with live Firebase Firestore sync.",
      };

      setProfile(mergedProfile);
      setEditForm(mergedProfile);
      setTeamMembers(fbGuests);
    } catch (err) {
      console.error("[EnterpriseProfile] Failed to load Firebase profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFirebaseProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const inputEl = e.target;
    if (!file) return;
    inputEl.value = "";
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setProfile((prev: any) => ({ ...prev, avatar: dataUrl }));
        setEditForm((prev: any) => ({ ...prev, avatar: dataUrl }));
        localStorage.setItem("deckoviz_user_avatar", dataUrl);
        window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
        try {
          const res = await webappApi.uploadMedia(file, token || undefined);
          if (res?.url) {
            setProfile((prev: any) => ({ ...prev, avatar: res.url }));
            setEditForm((prev: any) => ({ ...prev, avatar: res.url }));
            localStorage.setItem("deckoviz_user_avatar", res.url);
            await enterpriseApi.updateProfile({ avatar: res.url });
            updateUser({ avatar: res.url });
            window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
          }
        } catch {
          await enterpriseApi.updateProfile({ avatar: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("[EnterpriseProfile] Avatar upload error", err);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const inputEl = e.target;
    if (!file) return;
    inputEl.value = "";
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setProfile((prev: any) => ({ ...prev, banner: dataUrl }));
        setEditForm((prev: any) => ({ ...prev, banner: dataUrl }));
        try {
          const res = await webappApi.uploadMedia(file, token || undefined);
          if (res?.url) {
            setProfile((prev: any) => ({ ...prev, banner: res.url }));
            setEditForm((prev: any) => ({ ...prev, banner: res.url }));
            await enterpriseApi.updateProfile({ banner: res.url });
          }
        } catch {
          await enterpriseApi.updateProfile({ banner: dataUrl });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("[EnterpriseProfile] Banner upload error", err);
    }
  };

  const handleAddTeamMember = async () => {
    if (!newMemberName.trim()) return;
    setAddingMember(true);
    try {
      const newGuest = {
        name: newMemberName.trim(),
        role: newMemberRole.trim() || "Team Member",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newMemberName.trim())}&background=2563eb&color=fff&size=256`,
        status: "online",
      };
      const created = await enterpriseApi.createGuest(newGuest);
      const updatedList = [...teamMembers, created];
      setTeamMembers(updatedList);
      setNewMemberName("");
      setNewMemberRole("");

      await enterpriseApi.updateProfile({ teamMembers: updatedList });
    } catch (err) {
      console.error("[EnterpriseProfile] Failed to add team member:", err);
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveTeamMember = async (id: string) => {
    try {
      await enterpriseApi.deleteGuest(id);
      const updatedList = teamMembers.filter((m) => m.id !== id);
      setTeamMembers(updatedList);
      await enterpriseApi.updateProfile({ teamMembers: updatedList });
    } catch (err) {
      console.error("[EnterpriseProfile] Failed to delete team member:", err);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updated = {
        ...editForm,
        name: editForm.name,
        company: editForm.name,
        displayName: editForm.name,
        subtitle: editForm.subtitle,
        title: editForm.subtitle,
        teamMembers,
      };
      await enterpriseApi.updateProfile(updated);
      setProfile(updated);
      setIsEditing(false);
      setSaveSuccessToast(true);
      setTimeout(() => setSaveSuccessToast(false), 3000);
      window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
      updateUser({ name: updated.name, displayName: updated.name, avatar: updated.avatar });
    } catch (err) {
      console.error("Save profile error", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="relative h-[260px] rounded-3xl bg-slate-200" />
          <div className="relative -mt-20 mx-8 flex items-end gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="h-24 w-24 rounded-2xl bg-slate-200 -mt-14" />
            <div className="space-y-2 flex-1">
              <div className="h-6 w-56 bg-slate-200 rounded-lg" />
              <div className="h-4 w-40 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 py-6 relative text-slate-800">
      {/* Success Toast */}
      {saveSuccessToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs font-bold text-white shadow-2xl border border-emerald-400/40 bg-[#0f172a] animate-in fade-in slide-in-from-top-4">
          <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check size={14} className="text-emerald-400" />
          </div>
          <span>Enterprise Profile &amp; Team synced live to Firebase Firestore!</span>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />

      {/* ═══════════════ BANNER & AVATAR HEADER (LIGHT LUXURY ENTERPRISE UI) ═══════════════ */}
      <div className="relative mb-6">
        <div className="overflow-hidden rounded-3xl h-[260px] relative group border border-slate-200 shadow-md">
          <img src={profile.banner || "/images/webapp/figma/profile-banner.jpg"} alt="Banner" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/20 to-transparent" />

          <button
            onClick={() => bannerInputRef.current?.click()}
            className="absolute top-5 right-5 bg-white/20 hover:bg-white/40 backdrop-blur-xl text-white px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 transition-all duration-300 border border-white/30 shadow-lg"
          >
            <Camera size={14} /> Change Banner
          </button>

          <div className="absolute bottom-5 left-8 flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-xl border border-white text-[#182a4a] text-[10px] font-extrabold flex items-center gap-1.5 shadow-md">
              <Crown size={12} className="text-amber-500" /> {profile.tier || "Enterprise Premium"}
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-400/40 text-emerald-200 text-[10px] font-bold flex items-center gap-1.5 shadow-md">
              <Activity size={12} /> Firestore Live Sync
            </div>
          </div>
        </div>

        {/* Profile Card overlay (Light Porcelain Executive Style) */}
        <div className="relative -mt-20 mx-4 rounded-2xl border border-white bg-white/95 backdrop-blur-2xl px-8 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border-[3px] border-white bg-white shadow-xl -mt-14 overflow-hidden ring-4 ring-blue-500/10">
                  <img
                    src={profile.avatar || "/images/deckoviz-space-labs-icon.png"}
                    alt="Avatar"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "Enterprise")}&background=2563eb&color=fff&size=256`;
                    }}
                  />
                </div>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg transition-all duration-300 hover:scale-110 border-2 border-white"
                  title="Upload Profile Photo"
                >
                  <Camera size={12} />
                </button>
              </div>
              <div className="pt-1">
                <h1 className="text-[22px] font-bold text-[#0f172a] tracking-tight leading-tight">{profile.name}</h1>
                <p className="text-[13px] text-slate-500 font-medium mt-0.5">{profile.subtitle}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                    <MapPin size={11} className="text-blue-600" /> {profile.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                    <Building2 size={11} className="text-indigo-600" /> {profile.industry}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {onEditProfile && (
                <button
                  onClick={onEditProfile}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-white hover:border-blue-300 transition-all duration-300"
                >
                  <Brain size={14} className="text-blue-600" /> Deep Intelligence
                </button>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02]"
                style={{ background: isEditing ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)" : "linear-gradient(135deg, #182a4a 0%, #2563EB 100%)" }}
              >
                {isEditing ? <X size={14} /> : <Edit2 size={14} />} {isEditing ? "Close Edit" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ EDIT PROFILE FORM (LIGHT UI) ═══════════════ */}
      {isEditing && (
        <div className="mb-6 rounded-2xl bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] border border-slate-200/80">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-[#0f172a] flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                <Edit2 size={15} className="text-blue-600" />
              </div>
              Edit Enterprise Profile (Synced to Firebase)
            </h3>
            <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-full">Firebase Firestore Live</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {[
              { label: "Company / Display Name", key: "name", placeholder: "e.g. Grand Metropolitan Space" },
              { label: "Title / Subtitle", key: "subtitle", placeholder: "e.g. Enterprise Suite Headquarters" },
              { label: "Location", key: "location", placeholder: "e.g. New York & London" },
              { label: "Industry", key: "industry", placeholder: "e.g. Luxury Hospitality & Corporate" },
              { label: "Website", key: "website", placeholder: "e.g. grandmetropolitan.deckoviz.com" },
              { label: "Contact Email", key: "contactEmail", placeholder: "e.g. concierge@grandmetropolitan.com", type: "email" },
              { label: "Plan Tier", key: "tier", placeholder: "e.g. Enterprise Premium" },
              { label: "Cloud Storage Capacity", key: "storage", placeholder: "e.g. 500 GB" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">{field.label}</label>
                <input
                  type={field.type || "text"}
                  value={(editForm as any)[field.key] || ""}
                  onChange={(e) => setEditForm({ ...editForm, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white bg-[#f8fafc] text-slate-800"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">About / Bio Description</label>
              <textarea
                value={editForm.about || ""}
                onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white bg-[#f8fafc] text-slate-800 resize-none"
                placeholder="Describe your enterprise digital art setup..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg bg-[#182a4a] hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? "Syncing..." : "Save Profile to Firebase"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ STAT CARDS ROW (LIGHT EXECUTIVE UI) ═══════════════ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
        {[
          { icon: Monitor, label: "Active Units", value: profile.units || 14, iconColor: "text-blue-600", bg: "bg-blue-50", trend: "100% Operational" },
          { icon: Layers, label: "Active Frames", value: profile.activeFrames || 56, iconColor: "text-indigo-600", bg: "bg-indigo-50", trend: "Live Streaming" },
          { icon: Calendar, label: "Scheduled Events", value: profile.upcomingEvents || 8, iconColor: "text-amber-600", bg: "bg-amber-50", trend: "Upcoming" },
          { icon: Users, label: "Team Members", value: teamMembers.length, iconColor: "text-emerald-600", bg: "bg-emerald-50", trend: "Firebase Synced" },
        ].map((stat) => (
          <div key={stat.label} className="group rounded-2xl border border-slate-200/80 bg-white p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-default">
            <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            <p className="text-[28px] font-bold text-[#0f172a] leading-tight">{stat.value}</p>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{stat.label}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={10} className="text-emerald-500" />
              <span className="text-[9px] text-emerald-600 font-bold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════ MAIN CONTENT GRID (LIGHT EXECUTIVE UI) ═══════════════ */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-5">
          {/* Company Details Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-8 w-8 rounded-lg bg-[#182a4a] flex items-center justify-center shadow-md">
                <Building2 size={14} className="text-white" />
              </div>
              <h3 className="text-[14px] font-bold text-[#0f172a]">Company Details</h3>
            </div>
            <div className="space-y-3.5">
              {[
                { icon: Building2, label: "Company Name", value: profile.name || "Enterprise Space", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Building2, label: "Industry", value: profile.industry || "Enterprise Tech", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: MapPin, label: "Location", value: profile.location || "Global", color: "text-rose-500", bg: "bg-rose-50" },
                { icon: Globe, label: "Website", value: profile.website || "deckoviz.com", color: "text-teal-600", bg: "bg-teal-50" },
                { icon: Mail, label: "Contact", value: profile.contactEmail || "concierge@deckoviz.com", color: "text-violet-600", bg: "bg-violet-50" },
                { icon: Phone, label: "Phone", value: profile.contactPhone || "+1 (800) 555-DECKO", color: "text-orange-500", bg: "bg-orange-50" },
                { icon: Shield, label: "Plan Tier", value: profile.tier || "Enterprise Premium", color: "text-amber-600", bg: "bg-amber-50" },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-3 group">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${info.bg} transition-transform duration-200 group-hover:scale-110`}>
                    <info.icon size={15} className={info.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{info.label}</p>
                    <p className="text-[13px] font-semibold text-slate-700 truncate">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members Card — 100% Fetched from Firebase Firestore */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-md">
                  <Users size={14} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-[#0f172a]">Team Members</h3>
                  <p className="text-[9px] text-slate-400 font-medium">Synced live to Firebase</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">{teamMembers.length} Members</span>
            </div>

            {/* Form to Add New Team Member directly to Firebase */}
            <div className="mb-4 bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 space-y-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <UserPlus size={11} className="text-blue-600" /> Add Team Member
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Member Full Name"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="Role (e.g. Art Director)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  disabled={!newMemberName.trim() || addingMember}
                  className="w-full flex items-center justify-center gap-1 py-2 bg-[#182a4a] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition disabled:opacity-50 shadow-md"
                >
                  {addingMember ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                  <span>{addingMember ? "Saving..." : "Save Member to Firebase"}</span>
                </button>
              </div>
            </div>

            {/* List of Team Members from Firebase */}
            {teamMembers.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <Users size={24} className="mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-semibold text-slate-600">No team members added yet</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Use the form above to save team members to Firebase</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {teamMembers.map((member: any) => (
                  <div key={member.id || member.name} className="flex items-center justify-between bg-[#f8fafc] px-3.5 py-2.5 rounded-xl border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || "User")}&background=2563eb&color=fff`}
                        alt=""
                        className="h-9 w-9 rounded-xl object-cover border border-slate-200 shadow-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-bold text-slate-800 truncate">{member.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{member.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Remove Member from Firebase"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-5">
          {/* About Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-sky-600 flex items-center justify-center shadow-md">
                <Zap size={14} className="text-white" />
              </div>
              <h3 className="text-[14px] font-bold text-[#0f172a]">About</h3>
            </div>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              {profile.about || `The ${profile.name || 'Enterprise Space'} is a distinguished luxury space powered by Deckoviz digital art frames with real-time Firebase Firestore synchronization.`}
            </p>
          </div>

          {/* System Status Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Uptime", value: "99.9%", sub: "30-day average", icon: Activity, gradient: "from-emerald-500 to-teal-600" },
              { label: "Network", value: "Active", sub: "All units connected", icon: Wifi, gradient: "from-blue-600 to-indigo-600" },
              { label: "Storage", value: profile.storage || "500 GB", sub: "Cloud Storage", icon: Layers, gradient: "from-violet-600 to-purple-600" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-md transition-all duration-300 group">
                <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={16} className="text-white" />
                </div>
                <p className="text-[18px] font-bold text-[#0f172a]">{item.value}</p>
                <p className="text-[10px] text-slate-500 font-semibold">{item.label}</p>
                <p className="text-[9px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Enterprise Plan Card — Light Luxury Theme */}
          <div className="rounded-2xl p-[1px] overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #182a4a, #2563EB, #4f46e5)" }}>
            <div className="rounded-[15px] p-7 relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Crown size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-300/70 font-bold uppercase tracking-widest">CURRENT PLAN</p>
                      <h3 className="text-lg font-bold text-white">{profile.tier || "Enterprise Premium"}</h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-[11px] font-bold text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "CONTENT GENERATIONS", value: "Unlimited", icon: "∞" },
                    { label: "CLOUD STORAGE", value: profile.storage || "500 GB", icon: "☁️" },
                    { label: "RENEWAL", value: profile.renewalDate || "Aug 15, 2026", icon: "📅" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">{item.icon}</span>
                        <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">{item.label}</p>
                      </div>
                      <p className="text-[15px] font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
