import { useState, useEffect, useRef } from "react";
import {
  User,
  Image as ImageIcon,
  Users,
  Search,
  ChevronDown,
  Heart,
  Star,
  Sparkles,
  Pencil,
  Save,
  X,
  Camera,
  Share2,
  FolderPlus,
  Check,
  Eye,
  Monitor,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { webappApi, getVizzyGenerativeImages } from "../../../lib/webappApi";
import { figmaAssets } from "../webappData";
import { setFrameImage } from "../../../lib/frameStore";
import { getUserCollections, getUserProfile, saveUserProfile, getUserStorageKey, getUserFavouriteArtworks, saveUserFavouriteArtworks } from "../../../lib/userStorage";

/* ───────── Types ───────── */

interface ProfileData {
  displayName: string;
  username: string;
  title: string;
  bio: string;
  location: string;
  avatar: string;
  banner: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  favoriteArtStyles: string[];
}

interface ArtworkData {
  id: string;
  title: string;
  subtitle?: string;
  rating?: number;
  tags: string[];
  quote?: string;
  date?: string;
  image: string;
  isFav?: boolean;
}

function createInitialProfile(user: any): ProfileData {
  const name = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "Creative Creator");
  const username = user?.username || (user?.email ? user.email.split('@')[0] : "creator");
  const avatar = user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3f5fe0&color=fff&size=500`;

  return {
    displayName: name,
    username: username,
    title: "Lead AI Creator",
    bio: "Passionate about AI-generated art and creative exploration on Deckoviz.",
    location: "Global Creator",
    avatar: avatar,
    banner: "https://picsum.photos/seed/deckoviz-banner/1200/400",
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
    favoriteArtStyles: ["Surrealism", "Abstract Expressionism", "Conceptual Portraits", "Minimalism"],
  };
}

export default function ProfileView({
  onNavigate,
}: {
  onNavigate?: (view: "profile" | "social" | "followers" | "following" | "ai_manager") => void;
}) {
  const { token, user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");
  const [activeRightTab, setActiveRightTab] = useState("Favourite Artworks");
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = getUserProfile();
      if (saved) {
        return {
          ...createInitialProfile(user),
          ...saved,
        };
      }
    } catch { /* ignore */ }
    return createInitialProfile(user);
  });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(profile);
  const [saving, setSaving] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const [favArtworks, setFavArtworks] = useState<ArtworkData[]>([]);
  const [favCollections, setFavCollections] = useState<any[]>([]);

  // Collection modal & lightbox state
  const [selectedColModal, setSelectedColModal] = useState<any | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [frameToast, setFrameToast] = useState<string | null>(null);

  // User Search & WhatsApp state
  const [showUserSearchModal, setShowUserSearchModal] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");

  const sampleUsersList = [
    { id: "u-1", name: "Kishore M", username: "kishore.mlhk", title: "Lead AI Creator", followers: "12.4k", phone: "919876543210", avatar: "https://ui-avatars.com/api/?name=Kishore+M&background=3f5fe0&color=fff" },
    { id: "u-2", name: "Suraj Pandya", username: "suraj.pandya", title: "Principal Generative Artist", followers: "48.2k", phone: "919876543211", avatar: "https://ui-avatars.com/api/?name=Suraj+Pandya&background=2563eb&color=fff" },
    { id: "u-3", name: "Emma Watson", username: "emma_art", title: "3D Visual Sculptor", followers: "31.9k", phone: "919876543212", avatar: "https://ui-avatars.com/api/?name=Emma+Watson&background=ec4899&color=fff" },
    { id: "u-4", name: "Alex Rivers", username: "alex.rivers", title: "Cyberpunk Designer", followers: "19.5k", phone: "919876543213", avatar: "https://ui-avatars.com/api/?name=Alex+Rivers&background=10b981&color=fff" },
    { id: "u-5", name: "Sophia Chen", username: "sophiachen", title: "Prompt Engineer & Curator", followers: "27.8k", phone: "919876543214", avatar: "https://ui-avatars.com/api/?name=Sophia+Chen&background=8b5cf6&color=fff" },
  ];

  const handleSendToFrame = (imgUrl: string, title?: string) => {
    if (!imgUrl) return;
    setFrameImage(imgUrl);
    setFrameToast(title ? `Sent "${title}" to Virtual Frame!` : "Sent image to Virtual Frame!");
    setTimeout(() => setFrameToast(null), 3000);
    window.open("/webframe", "_blank");
  };

  const handleConnectWhatsApp = (userName?: string, phoneNum?: string) => {
    const targetName = userName || displayName;
    const msg = encodeURIComponent(`Hi ${targetName}! I saw your creative AI portfolio on Deckoviz and would love to connect.`);
    const cleanPhone = phoneNum ? phoneNum.replace(/[^0-9]/g, "") : "";
    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${msg}` : `https://wa.me/?text=${msg}`;
    window.open(waUrl, "_blank");
  };

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const baseInitial = createInitialProfile(user);
    if (!token) {
      setProfile(prev => ({ ...baseInitial, ...prev }));
      return;
    }
    webappApi.getProfile(token).then((data: any) => {
      if (!data) return;
      const styles = Array.isArray(data.favoriteArtStyles)
        ? data.favoriteArtStyles
        : typeof data.favoriteArtStyles === "string"
        ? data.favoriteArtStyles.split(",").map((s: string) => s.trim())
        : baseInitial.favoriteArtStyles;

      const p: ProfileData = {
        displayName: data.displayName || data.display_name || user?.name || user?.displayName || baseInitial.displayName,
        username: data.username || user?.username || (user?.email ? user.email.split('@')[0] : baseInitial.username),
        title: data.title || baseInitial.title,
        bio: data.bio || baseInitial.bio,
        location: data.location || baseInitial.location,
        avatar: data.avatar || user?.avatar || baseInitial.avatar,
        banner: data.banner || baseInitial.banner,
        postCount: typeof data.postCount === "number" ? data.postCount : 0,
        followerCount: typeof data.followerCount === "number" ? data.followerCount : 0,
        followingCount: typeof data.followingCount === "number" ? data.followingCount : 0,
        favoriteArtStyles: styles,
      };
      setProfile(p);
      setEditForm(p);
      saveUserProfile(p);
      updateUser({ name: p.displayName, displayName: p.displayName, avatar: p.avatar });
    }).catch(() => {
      setProfile(prev => ({ ...baseInitial, ...prev }));
    });

    const handleUserChanged = () => {
      const freshInitial = createInitialProfile(user);
      const savedP = getUserProfile();
      setProfile(savedP || freshInitial);
      setEditForm(savedP || freshInitial);
    };
    window.addEventListener("deckoviz-user-changed", handleUserChanged);
    return () => {
      window.removeEventListener("deckoviz-user-changed", handleUserChanged);
    };
  }, [token, user]);

  useEffect(() => {
    // Load User Collections & User Favourites (isolated per authenticated user)
    const savedCols = getUserCollections();
    const savedFavs = getUserFavouriteArtworks();
    setFavArtworks(savedFavs);

    webappApi.getCollections(token || undefined).then((res) => {
      const list = Array.isArray(res) ? res : (res?.collections || res?.items || []);
      const combinedColsMap = new Map();
      [...savedCols, ...list].forEach((c: any) => {
        const k = c.id || c.name || c.title;
        if (k && c.isFav !== false) combinedColsMap.set(k, { ...c, isFav: true });
      });
      const allCollections = Array.from(combinedColsMap.values());
      setFavCollections(allCollections);
    }).catch(() => {
      setFavCollections(savedCols.map((c: any) => ({ ...c, isFav: true })));
    });

    const handleFavsUpdated = () => {
      setFavArtworks(getUserFavouriteArtworks());
    };
    window.addEventListener("deckoviz-favourites-updated", handleFavsUpdated);
    window.addEventListener("deckoviz-user-changed", handleFavsUpdated);

    return () => {
      window.removeEventListener("deckoviz-favourites-updated", handleFavsUpdated);
      window.removeEventListener("deckoviz-user-changed", handleFavsUpdated);
    };
  }, [token, user]);

  const startEditing = () => {
    setEditForm(profile);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditForm(profile);
    setEditing(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setEditForm(prev => ({ ...prev, avatar: dataUrl }));
        setProfile(prev => ({ ...prev, avatar: dataUrl }));
        localStorage.setItem(`deckoviz_user_avatar_${userKey}`, dataUrl);
        localStorage.setItem("deckoviz_user_avatar", dataUrl);
        try {
          const currentP = getUserProfile() || {};
          saveUserProfile({ ...currentP, avatar: dataUrl });
        } catch { /* ignore */ }
        window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));

        try {
          const res = await webappApi.uploadMedia(file, token || undefined);
          if (res?.url) {
            setEditForm(prev => ({ ...prev, avatar: res.url }));
            setProfile(prev => ({ ...prev, avatar: res.url }));
            localStorage.setItem(`deckoviz_user_avatar_${userKey}`, res.url);
            localStorage.setItem("deckoviz_user_avatar", res.url);
            window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
          }
        } catch { /* use base64 dataUrl */ }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("[ProfileView] Avatar upload error:", err);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        setEditForm(prev => ({ ...prev, banner: dataUrl }));
        setProfile(prev => ({ ...prev, banner: dataUrl }));
        localStorage.setItem(`deckoviz_user_banner_${userKey}`, dataUrl);
        localStorage.setItem("deckoviz_user_banner", dataUrl);
        try {
          const res = await webappApi.uploadMedia(file, token || undefined);
          if (res?.url) {
            setEditForm(prev => ({ ...prev, banner: res.url }));
            setProfile(prev => ({ ...prev, banner: res.url }));
            localStorage.setItem(`deckoviz_user_banner_${userKey}`, res.url);
            localStorage.setItem("deckoviz_user_banner", res.url);
          }
        } catch { /* use base64 dataUrl */ }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("[ProfileView] Banner upload error:", err);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const payload = {
        displayName: editForm.displayName,
        username: editForm.username,
        title: editForm.title,
        bio: editForm.bio,
        location: editForm.location,
        avatar: editForm.avatar,
        banner: editForm.banner,
        favoriteArtStyles: editForm.favoriteArtStyles.join(", "),
      };

      if (editForm.avatar) {
        localStorage.setItem(`deckoviz_user_avatar_${userKey}`, editForm.avatar);
        localStorage.setItem("deckoviz_user_avatar", editForm.avatar);
      }
      if (editForm.banner) {
        localStorage.setItem(`deckoviz_user_banner_${userKey}`, editForm.banner);
        localStorage.setItem("deckoviz_user_banner", editForm.banner);
      }

      const updated = await webappApi.updateProfile(payload, token || undefined).catch(() => editForm);

      const p: ProfileData = {
        displayName: updated?.displayName || editForm.displayName,
        username: updated?.username || editForm.username,
        title: updated?.title || editForm.title,
        bio: updated?.bio || editForm.bio,
        location: updated?.location || editForm.location,
        avatar: updated?.avatar || editForm.avatar,
        banner: updated?.banner || editForm.banner,
        postCount: updated?.postCount ?? editForm.postCount,
        followerCount: updated?.followerCount ?? editForm.followerCount,
        followingCount: updated?.followingCount ?? editForm.followingCount,
        favoriteArtStyles: Array.isArray(updated?.favoriteArtStyles)
          ? updated.favoriteArtStyles
          : typeof updated?.favoriteArtStyles === "string"
          ? updated.favoriteArtStyles.split(",").map((s: string) => s.trim())
          : editForm.favoriteArtStyles,
      };

      setProfile(p);
      saveUserProfile(p);
      updateUser({ name: p.displayName, displayName: p.displayName, avatar: p.avatar });
      setEditing(false);
    } catch (err) {
      console.error("[ProfileView] Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleShareProfile = async () => {
    const shareData = {
      title: `${displayName}'s Deckoviz Profile`,
      text: `Check out ${displayName}'s creative AI portfolio on Deckoviz!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch { /* fallback */ }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    } catch { alert("Profile link copied!"); }
  };

  const toggleFavArtwork = (art: ArtworkData) => {
    setFavArtworks(prev => {
      const exists = prev.some(a => a.id === art.id || a.image === art.image);
      let next: ArtworkData[];
      if (exists) {
        next = prev.filter(a => a.id !== art.id && a.image !== art.image);
      } else {
        next = [{ ...art, isFav: true }, ...prev];
      }
      saveUserFavouriteArtworks(next);
      return next;
    });
  };

  const toggleFavCollection = (colId: string) => {
    setFavCollections(prev => {
      const next = prev.map(c => (c.id === colId || c.name === colId) ? { ...c, isFav: !c.isFav } : c);
      return next;
    });
  };

  const userKey = user?.id || user?.email || user?.name || "guest";
  const rawName = user?.name || user?.displayName || (user?.email ? user.email.split("@")[0] : "");
  const displayName = profile.displayName || rawName || "Creative Creator";
  const usernameHandle = profile.username || (rawName ? rawName.toLowerCase().replace(/[^a-z0-9._]/g, "") : "creator");

  const savedUserAvatar = localStorage.getItem(`deckoviz_user_avatar_${userKey}`);
  const savedUserBanner = localStorage.getItem(`deckoviz_user_banner_${userKey}`);
  
  // Unique personalized photo per user based on user key/name so every user gets their own profile picture!
  const uniqueSeedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3f5fe0&color=fff&size=500`;
  const avatarSrc = savedUserAvatar || profile.avatar || user?.avatar || uniqueSeedAvatar;
  const bannerSrc = savedUserBanner || profile.banner || "https://picsum.photos/seed/deckoviz-banner/1200/400";

  const formatCount = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  };

  return (
    <div className="relative flex w-full justify-center pb-20 pt-4 font-sans">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
      <input ref={bannerInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />

      {shareToast && (
        <div className="fixed bottom-6 right-6 z-[300] flex items-center gap-2 bg-[#182a4a] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-bold animate-bounce">
          <Check size={18} className="text-emerald-400" /> Profile link copied to clipboard!
        </div>
      )}

      <div className="w-full max-w-[1094px]">
        {/* ─── Banner Area ─── */}
        <div className="relative mb-[82px]">
          <div className="h-[280px] w-full overflow-hidden rounded-[7px] relative group">
            <img
              src={editing ? editForm.banner : bannerSrc}
              alt="Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/deckoviz-banner/1200/400";
              }}
            />
            {editing && (
              <button
                onClick={() => bannerInputRef.current?.click()}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg backdrop-blur-md transition"
              >
                <Camera size={16} /> Change Cover Banner
              </button>
            )}
          </div>

          {/* Floating Profile Strip */}
          <div className="absolute -bottom-[84px] left-1/2 flex min-h-[148px] w-[92%] -translate-x-1/2 items-center justify-between gap-6 rounded-[18px] bg-white/90 px-6 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl border border-white/50 lg:px-[36px]">
            {/* Left: Avatar + User Info */}
            <div className="flex items-center gap-4 shrink-0">
              <div
                onClick={() => avatarInputRef.current?.click()}
                className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full border-[4px] border-white shadow-md relative group cursor-pointer"
                title="Click to change profile picture"
              >
                <img
                  src={editing ? editForm.avatar : avatarSrc}
                  alt={displayName}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultArtistAvatar;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
                  <Camera size={20} />
                  <span className="text-[9px] font-bold mt-0.5">Upload</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          const val = nameInput.trim() || displayName;
                          setProfile(prev => ({ ...prev, displayName: val }));
                          setEditForm(prev => ({ ...prev, displayName: val }));
                          setIsEditingName(false);
                          saveUserProfile({ ...profile, displayName: val });
                          updateUser({ name: val, displayName: val, avatar: profile.avatar });
                          await webappApi.updateProfile({ displayName: val }, token || undefined).catch(() => null);
                          window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
                          window.dispatchEvent(new CustomEvent("deckoviz-user-changed"));
                        } else if (e.key === "Escape") {
                          setIsEditingName(false);
                        }
                      }}
                      onBlur={async () => {
                        const val = nameInput.trim() || displayName;
                        setProfile(prev => ({ ...prev, displayName: val }));
                        setEditForm(prev => ({ ...prev, displayName: val }));
                        setIsEditingName(false);
                        saveUserProfile({ ...profile, displayName: val });
                        updateUser({ name: val, displayName: val, avatar: profile.avatar });
                        await webappApi.updateProfile({ displayName: val }, token || undefined).catch(() => null);
                        window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
                        window.dispatchEvent(new CustomEvent("deckoviz-user-changed"));
                      }}
                      className="text-[#182a4a] bg-white font-serif text-[20px] font-bold px-3 py-1 rounded-xl border-2 border-blue-500 shadow-lg outline-none max-w-[260px]"
                      placeholder="Enter your name"
                    />
                    <button
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        const val = nameInput.trim() || displayName;
                        setProfile(prev => ({ ...prev, displayName: val }));
                        setEditForm(prev => ({ ...prev, displayName: val }));
                        setIsEditingName(false);
                        saveUserProfile({ ...profile, displayName: val });
                        updateUser({ name: val, displayName: val, avatar: profile.avatar });
                        await webappApi.updateProfile({ displayName: val }, token || undefined).catch(() => null);
                        window.dispatchEvent(new CustomEvent("deckoviz-profile-updated"));
                        window.dispatchEvent(new CustomEvent("deckoviz-user-changed"));
                      }}
                      className="h-8 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition flex items-center gap-1 shrink-0"
                    >
                      <Check size={14} /> Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap group/name">
                    <h1
                      onClick={() => {
                        setNameInput(profile.displayName || displayName);
                        setIsEditingName(true);
                      }}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[22px] font-bold leading-tight whitespace-nowrap cursor-pointer hover:opacity-80 flex items-center gap-2"
                      title="Click to edit display name"
                    >
                      {profile.displayName || displayName}
                      <Pencil size={15} className="text-blue-500 hover:scale-125 transition shrink-0" />
                    </h1>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/80 whitespace-nowrap">
                      @{profile.username || displayName.toLowerCase().replace(/[^a-z0-9._]/g, "")}
                    </span>
                  </div>
                )}

                <p className="text-[13px] font-medium leading-tight text-[#70737b] mt-1 whitespace-nowrap">
                  {editing ? (
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Title (e.g. Lead AI Creator)"
                      className="bg-transparent border-b border-gray-300 outline-none text-[13px] font-medium leading-tight text-[#70737b]"
                    />
                  ) : (
                    <span className="cursor-pointer hover:text-blue-600" onClick={startEditing}>{profile.title || "Lead AI Creator"}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Middle: Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {editing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="h-[40px] px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                  >
                    <Save size={15} /> {saving ? "Saving..." : "Save Profile"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="h-[40px] px-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold transition flex items-center gap-1"
                  >
                    <X size={15} /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={startEditing}
                  className="h-[40px] shrink-0 whitespace-nowrap rounded-full bg-blue-50 hover:bg-blue-100 px-4 text-[13px] font-bold text-blue-700 border border-blue-200 transition flex items-center gap-1.5 shadow-sm"
                >
                  <Pencil size={15} /> Edit Profile
                </button>
              )}
              <button
                onClick={() => setShowUserSearchModal(true)}
                className="h-[40px] shrink-0 whitespace-nowrap rounded-full bg-blue-50 hover:bg-blue-100 px-3.5 text-[13px] font-bold text-blue-700 transition flex items-center gap-1.5 border border-blue-200/80"
              >
                <Users size={15} /> Search Creators
              </button>
              <button
                onClick={() => handleConnectWhatsApp(displayName)}
                className="h-[40px] shrink-0 whitespace-nowrap rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-3.5 text-[13px] font-bold text-white shadow-[0_6px_14px_rgba(37,211,102,0.25)] transition flex items-center gap-1.5"
                title="Connect via WhatsApp"
              >
                <MessageCircle size={15} /> WhatsApp
              </button>
              <button
                onClick={handleShareProfile}
                className="h-[40px] shrink-0 whitespace-nowrap rounded-full bg-gray-100 hover:bg-gray-200 px-3.5 text-[13px] font-bold text-gray-700 transition flex items-center gap-1.5"
              >
                <Share2 size={15} /> Share
              </button>
              <button
                onClick={() => onNavigate?.("ai_manager")}
                className="h-[40px] shrink-0 whitespace-nowrap rounded-full bg-[#3f5fe0] px-5 text-[13px] font-bold text-white shadow-[0_8px_16px_rgba(63,95,224,0.25)] transition hover:bg-[#344fd0]"
              >
                + AI Photo Manager
              </button>
            </div>

            {/* Right: Stats */}
            <div className="hidden items-center gap-5 pl-4 border-l border-gray-200 xl:flex shrink-0">
              <div className="text-center">
                <div className="text-[15px] font-bold leading-tight text-black">
                  {formatCount(profile.postCount)}
                </div>
                <div className="text-[12px] font-medium text-gray-500">Post</div>
              </div>
              <div className="border-l border-gray-200 pl-5 text-center cursor-pointer hover:opacity-80" onClick={() => onNavigate?.("followers")}>
                <div className="text-[15px] font-bold leading-tight text-black">
                  {formatCount(profile.followerCount)}
                </div>
                <div className="text-[12px] font-medium text-gray-500">
                  Followers
                </div>
              </div>
              <div className="border-l border-gray-200 pl-5 text-center cursor-pointer hover:opacity-80" onClick={() => onNavigate?.("following")}>
                <div className="text-[15px] font-bold leading-tight text-black">
                  {formatCount(profile.followingCount)}
                </div>
                <div className="text-[12px] font-medium text-gray-500">
                  Following
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Profile Navigation ─── */}
        <div className="mb-6 flex min-h-[68px] items-center justify-between rounded-[4px] border border-gray-100 px-3 py-2">
          <div className="flex items-center gap-2 lg:gap-4">
            {[
              { id: "Profile", icon: <User size={18} /> },
              { id: "Post", icon: <ImageIcon size={18} /> },
              { id: "Followers", icon: <Users size={18} /> },
              { id: "Following", icon: <User size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "Post") onNavigate?.("social");
                  if (tab.id === "Followers") onNavigate?.("followers");
                  if (tab.id === "Following") onNavigate?.("following");
                }}
                className={`flex h-[46px] items-center gap-2 whitespace-nowrap rounded-[12px] px-5 text-[15px] font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#eef2ff] text-[#3f5fe0]"
                    : "text-[#676a72] hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {tab.icon}
                <span>{tab.id}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button onClick={cancelEditing} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition">
                  <X size={14} /> Cancel
                </button>
                <button onClick={saveProfile} disabled={saving} className="flex items-center gap-1.5 rounded-full bg-[#3f5fe0] px-4 py-2 text-[13px] font-bold text-white shadow-md hover:bg-[#344fd0] transition disabled:opacity-50">
                  <Save size={14} /> {saving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button onClick={startEditing} className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition">
                <Pencil size={14} /> Edit Profile
              </button>
            )}
            <div className="relative mr-2">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Followers ...."
                className="h-[30px] w-64 rounded-[4px] border border-gray-100 bg-gray-50 pl-9 pr-4 text-[11px] font-medium text-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* ─── Grid Area ─── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - About */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            <div className="rounded-[24px] p-8 border border-gray-100 flex flex-col items-center">
              <div className="relative mb-4">
                <div
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-28 h-28 rounded-full overflow-hidden border-[5px] border-[#3b5bdb] relative group cursor-pointer shadow-md"
                  title="Click to change profile picture"
                >
                  <img
                    src={editing ? editForm.avatar : avatarSrc}
                    alt={displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = uniqueSeedAvatar;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold mt-1">Upload Photo</span>
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#2563eb] rounded-full border-2 border-white"></div>
              </div>

              {editing ? (
                <input
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-xl font-bold mb-0.5 border-b border-[#3b82f6] outline-none bg-transparent text-center w-full"
                />
              ) : (
                <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-xl font-bold  mb-0.5">
                  {displayName}
                </h2>
              )}
              <p className="text-gray-500 text-sm font-medium mb-1">
                {editing ? (
                  <input
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    placeholder="username"
                    className="bg-transparent border-b border-gray-300 outline-none text-center text-gray-500 text-sm font-medium w-full"
                  />
                ) : (
                  profile.username ? `@${profile.username}` : "@username"
                )}
              </p>
              <p className="text-gray-500 text-xs font-medium mb-8">
                {editing ? (
                  <input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="Location"
                    className="bg-transparent border-b border-gray-300 outline-none text-center text-gray-500 text-xs font-medium w-full"
                  />
                ) : (
                  profile.location || "Add your location"
                )}
              </p>

              <div className="flex items-center gap-10 w-full justify-center border-b border-gray-100 pb-8 mb-8">
                <div className="text-center cursor-pointer hover:opacity-80" onClick={() => onNavigate?.("social")}>
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    {formatCount(profile.postCount)}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">Post</div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80" onClick={() => onNavigate?.("followers")}>
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    {formatCount(profile.followerCount)}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    Followers
                  </div>
                </div>
                <div className="text-center cursor-pointer hover:opacity-80" onClick={() => onNavigate?.("following")}>
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    {formatCount(profile.followingCount)}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    Following
                  </div>
                </div>
              </div>

              <div className="w-full text-left">
                <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[17px] font-bold  mb-3">
                  About me
                </h3>
                {editing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Write something about yourself..."
                    rows={4}
                    className="w-full text-gray-500 text-[13px] leading-relaxed font-medium mb-4 text-justify border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3b82f6] resize-none"
                  />
                ) : (
                  <p className="text-gray-500 text-[13px] leading-relaxed font-medium mb-4 text-justify">
                    {profile.bio || "Tell the world about yourself..."}
                  </p>
                )}

                <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[17px] font-bold  mb-4">
                  My Favourite Art Styles
                </h3>
                {editing ? (
                  <input
                    value={Array.isArray(editForm?.favoriteArtStyles) ? editForm.favoriteArtStyles.join(", ") : ""}
                    onChange={(e) => setEditForm({ ...editForm, favoriteArtStyles: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    placeholder="Surrealism, Abstract Expressionism, Minimalism"
                    className="w-full text-gray-700 text-[13px] font-medium border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3b82f6]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {(Array.isArray(profile?.favoriteArtStyles) && profile.favoriteArtStyles.length > 0
                      ? profile.favoriteArtStyles
                      : defaultProfile.favoriteArtStyles
                    ).map((style, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                        <Sparkles size={14} className="text-[#2563eb]" />
                        <span className="text-[13px] font-bold text-gray-600">
                          {style}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Artworks & Collections */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="rounded-[24px] border border-gray-100 h-full overflow-hidden flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {["Favourite Artworks", "Favourite Collections"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveRightTab(tab)}
                    className={`flex-1 py-4 text-sm font-bold transition border-b-2 ${
                      activeRightTab === tab
                        ? "border-[#1a237e] text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content List */}
              <div className="flex flex-col p-6 gap-6 h-[800px] overflow-y-auto custom-scrollbar">
                {activeRightTab === "Favourite Artworks" ? (
                  favArtworks.length > 0 ? (
                    favArtworks.map((art, idx) => (
                      <div key={art.id || idx} className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0 relative group">
                        <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
                          <button
                            onClick={() => setLightboxImg(art.image)}
                            className="text-gray-400 hover:text-blue-600 hover:scale-110 transition p-1.5 rounded-full hover:bg-gray-100"
                            title="View Full Image"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleSendToFrame(art.image, art.title)}
                            className="text-gray-400 hover:text-[#3f5fe0] hover:scale-110 transition p-1.5 rounded-full hover:bg-blue-50"
                            title="Send to Virtual Frame"
                          >
                            <Monitor size={16} />
                          </button>
                          <button
                            onClick={() => handleShareProfile()}
                            className="text-gray-400 hover:text-blue-600 hover:scale-110 transition p-1.5 rounded-full hover:bg-gray-100"
                            title="Share Artwork"
                          >
                            <Share2 size={16} />
                          </button>
                          <button
                            onClick={() => toggleFavArtwork(art)}
                            className="text-red-500 hover:scale-110 transition p-1.5 rounded-full hover:bg-red-50"
                            title={art.isFav ? "Remove from favourites" : "Add to favourites"}
                          >
                            <Heart size={16} fill={art.isFav ? "currentColor" : "none"} />
                          </button>
                        </div>

                        <div className="flex gap-5 cursor-pointer" onClick={() => setLightboxImg(art.image)}>
                          <div className="w-44 h-[110px] rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50 flex items-center justify-center relative group">
                            <img
                              src={art.image}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(art.title || "art")}/800/800`;
                              }}
                            />
                          </div>
                          <div className="flex flex-col pt-1 min-w-0 pr-24">
                            <h4 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-base mb-1 truncate">
                              {art.title}
                            </h4>
                            <p className="text-xs text-gray-500 mb-3 truncate">
                              {art.subtitle || "Deckoviz AI Art"}
                            </p>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className={i < 4 ? "text-yellow-400" : "text-gray-300"} fill={i < 4 ? "currentColor" : "none"} />
                              ))}
                              <span className="text-xs font-bold text-gray-700 ml-1 mt-0.5">{art.rating || 4.8}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              {(art.tags || ["AI Art", "Generative"]).map(tag => (
                                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-500 text-[11px] font-bold rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {art.quote && (
                          <div className="relative pt-2 pl-4 border-l-[3px] border-[#2563eb]/30 ml-2">
                            <span className="absolute -top-1 left-1 text-2xl text-[#2563eb] font-serif leading-none">"</span>
                            <p className="text-[13px] text-blue-600 font-medium leading-relaxed mb-1 mt-1">
                              {art.quote}
                            </p>
                            {art.date && <p className="text-[10px] text-gray-400 font-medium">{art.date}</p>}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
                      <FolderPlus size={36} className="text-gray-300 mb-3" />
                      <p className="text-gray-600 font-bold text-base mb-1">No collection artworks found</p>
                      <p className="text-gray-400 text-xs max-w-sm">
                        Add generated images to your Collections from Vizzy Generative Chat or AI Photo Manager to view them here.
                      </p>
                    </div>
                  )
                ) : (
                  /* Favourite Collections Tab */
                  favCollections.length > 0 ? (
                    favCollections.map((col, idx) => {
                      const cover = col.coverUrl || col.image || (Array.isArray(col.items) && col.items[0]?.url) || (Array.isArray(col.items) && col.items[0]?.mediaUrl) || figmaAssets.collectionCollage;
                      const count = Array.isArray(col.items) ? col.items.length : (typeof col.items === "number" ? col.items : col.itemCount || 0);

                      return (
                        <div key={col.id || idx} className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0 relative group">
                          <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
                            <button
                              onClick={() => setSelectedColModal(col)}
                              className="text-gray-400 hover:text-blue-600 hover:scale-110 transition p-1.5 rounded-full hover:bg-gray-100 flex items-center gap-1 text-xs font-bold"
                              title="View Collection Images"
                            >
                              <Eye size={16} /> View Images
                            </button>
                            <button
                              onClick={() => handleShareProfile()}
                              className="text-gray-400 hover:text-blue-600 hover:scale-110 transition p-1.5 rounded-full hover:bg-gray-100"
                              title="Share Collection"
                            >
                              <Share2 size={16} />
                            </button>
                            <button
                              onClick={() => toggleFavCollection(col.id || col.name)}
                              className="text-red-500 hover:scale-110 transition p-1.5 rounded-full hover:bg-red-50"
                              title={col.isFav ? "Remove from favourites" : "Add to favourites"}
                            >
                              <Heart size={16} fill={col.isFav !== false ? "currentColor" : "none"} />
                            </button>
                          </div>

                          <div className="flex gap-5 cursor-pointer" onClick={() => setSelectedColModal(col)}>
                            <div className="w-44 h-[110px] rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-50">
                              <img
                                src={cover}
                                alt={col.name || col.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  const seed = encodeURIComponent(col.name || col.title || "collection");
                                  target.src = `https://picsum.photos/seed/${seed}/1024/1024`;
                                }}
                              />
                            </div>
                            <div className="flex flex-col pt-1 min-w-0 pr-32">
                              <h4 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-base mb-1 truncate">
                                {col.name || col.title || "Custom Collection"}
                              </h4>
                              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                                {col.description || "Personal collection of fine digital artworks."}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-md">
                                  {count} Items
                                </span>
                                <span className="text-[11px] text-blue-600 font-semibold underline">Click to view & cast</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-20 text-center text-gray-400 font-medium">No favourite collections yet.</div>
                  )
                )}
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-center bg-gray-50">
                <button className="flex items-center gap-2 text-gray-500 text-sm font-bold hover:text-gray-800 transition">
                  <ChevronDown size={16} />
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Toast Notification */}
      {frameToast && (
        <div className="fixed top-6 right-6 z-[350] flex items-center gap-2 bg-[#182a4a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check size={16} className="text-emerald-400" />
          <span>{frameToast}</span>
        </div>
      )}

      {/* Interactive Collection Detail View Modal */}
      {selectedColModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in-0 duration-200" onClick={() => setSelectedColModal(null)}>
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-gray-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3f5fe0] flex items-center justify-center font-bold">
                  <FolderPlus size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{selectedColModal.name || selectedColModal.title || "Collection Images"}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedColModal.description || "Collection items library"} • {selectedColModal.items?.length || 0} items</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {Array.isArray(selectedColModal.items) && selectedColModal.items.length > 0 && (
                  <button
                    onClick={() => {
                      const firstImg = selectedColModal.items[0]?.url || selectedColModal.items[0]?.mediaUrl;
                      if (firstImg) handleSendToFrame(firstImg, selectedColModal.name || selectedColModal.title);
                    }}
                    className="px-4 py-2 rounded-full bg-[#3f5fe0] hover:bg-[#344fd0] text-white text-xs font-bold flex items-center gap-2 shadow-md transition"
                  >
                    <Monitor size={15} /> Cast to Virtual Frame
                  </button>
                )}
                <button onClick={() => setSelectedColModal(null)} className="w-9 h-9 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Collection Items Grid */}
            <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
              {Array.isArray(selectedColModal.items) && selectedColModal.items.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedColModal.items.map((item: any, idx: number) => {
                    const itemUrl = item.url || item.mediaUrl || item.imageUrl || item.image;
                    const itemTitle = item.title || item.fileName || `Artwork #${idx + 1}`;
                    return (
                      <div key={item.id || idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition duration-300">
                        <img
                          src={itemUrl}
                          alt={itemTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(itemTitle)}/800/800`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => setLightboxImg(itemUrl)}
                            className="w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white transition shadow-md"
                            title="View Full Size Image"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleSendToFrame(itemUrl, itemTitle)}
                            className="w-9 h-9 rounded-full bg-[#3f5fe0] text-white flex items-center justify-center hover:bg-[#344fd0] transition shadow-md"
                            title="Send to Virtual Frame"
                          >
                            <Monitor size={16} />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
                          <p className="text-[11px] font-semibold text-white truncate">{itemTitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400 font-medium">
                  No images in this collection yet. Add images to this collection from Vizzy Generative Chat or All Media.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Image View Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/85 backdrop-blur-md p-4" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-black" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => handleSendToFrame(lightboxImg)}
                className="px-4 py-2 rounded-full bg-[#3f5fe0] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:bg-[#344fd0]"
              >
                <Monitor size={15} /> Send to Virtual Frame
              </button>
              <button onClick={() => setLightboxImg(null)} className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90">
                <X size={18} />
              </button>
            </div>
            <img src={lightboxImg} alt="Full View" className="max-w-full max-h-[85vh] object-contain mx-auto" />
          </div>
        </div>
      )}

      {/* Search Creators & Connect via WhatsApp Modal */}
      {showUserSearchModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in-0 duration-200" onClick={() => setShowUserSearchModal(false)}>
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100 text-gray-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-gray-50/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3f5fe0] flex items-center justify-center font-bold">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">Search Creators</h3>
                  <p className="text-xs text-gray-500 font-medium">Find artists & connect directly via WhatsApp</p>
                </div>
              </div>
              <button onClick={() => setShowUserSearchModal(false)} className="w-9 h-9 rounded-full bg-gray-200/80 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search by name, @username, or role..."
                  className="w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-[#3f5fe0] focus:ring-2 focus:ring-blue-100"
                  autoFocus
                />
              </div>

              <div className="max-h-80 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {sampleUsersList
                  .filter(u => 
                    !userSearchQuery.trim() ||
                    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                    u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                    u.title.toLowerCase().includes(userSearchQuery.toLowerCase())
                  )
                  .map((u) => (
                    <div key={u.id} className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={u.avatar} alt={u.name} className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{u.name}</h4>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">@{u.username}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-medium truncate">{u.title} • {u.followers} followers</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleConnectWhatsApp(u.name, u.phone)}
                        className="px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition shrink-0 ml-2"
                        title={`Connect with ${u.name} on WhatsApp`}
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
