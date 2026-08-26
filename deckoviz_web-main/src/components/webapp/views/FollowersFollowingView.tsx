import { Search, User, Users, Image as ImageIcon } from "lucide-react";
import { figmaAssets } from "../webappData";
import { useState, useEffect } from "react";
import { webappApi } from "../../../lib/webappApi";
import { useAuth } from "../../../context/AuthContext";
import { getUserProfile, saveUserProfile, getUserAvatar, getUserBanner } from "../../../lib/userStorage";

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
  | "art_drawer";

export default function FollowersFollowingView({
  mode,
  onNavigate,
}: {
  mode: "followers" | "following";
  onNavigate?: (view: ViewType) => void;
}) {
  const activeLabel = mode === "followers" ? "Followers" : "Following";
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (mode === "followers") {
      webappApi.getFollowers().then((res) => {
        const list = Array.isArray(res) ? res : (res?.followers || res?.users || []);
        setUsers(list);
      }).catch(() => setUsers([])).finally(() => setLoading(false));
    } else {
      webappApi.getFollowing().then((res) => {
        const list = Array.isArray(res) ? res : (res?.following || res?.users || []);
        setUsers(list);
      }).catch(() => setUsers([])).finally(() => setLoading(false));
    }
  }, [mode]);

  const handleTabClick = (label: string) => {
    if (label === "Profile") onNavigate?.("profile");
    if (label === "Post") onNavigate?.("social");
    if (label === "Followers") onNavigate?.("followers");
    if (label === "Following") onNavigate?.("following");
  };

  const handleFollowToggle = async (userId: string, isFollowing: boolean) => {
    try {
      if (isFollowing) {
        await webappApi.unfollow(userId);
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, isFollowing: false } : u));
      } else {
        await webappApi.follow(userId);
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, isFollowing: true } : u));
      }
    } catch (err) {
      console.error("Toggle follow failed", err);
    }
  };

  return (
    <div className="relative flex w-full justify-center pb-20 pt-4 font-sans">
      <div className="w-full max-w-[1094px]">
        <ProfileHero onNavigate={onNavigate} />

        <div className="mb-0 flex min-h-[68px] items-center justify-between rounded-t-[4px] border border-gray-100 px-3 py-2">
          <div className="flex items-center gap-2 lg:gap-4">
            {[
              { label: "Profile", icon: <User size={18} /> },
              { label: "Post", icon: <ImageIcon size={18} /> },
              { label: "Followers", icon: <Users size={18} /> },
              { label: "Following", icon: <User size={18} /> },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab.label)}
                className={`flex h-[46px] items-center gap-2 whitespace-nowrap rounded-[12px] px-5 text-[15px] font-bold transition-all ${
                  tab.label === activeLabel
                    ? "bg-[#eef2ff] text-[#3f5fe0] shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
                    : "text-[#676a72] hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" size={14} />
            <input
              placeholder={`Search ${activeLabel} ....`}
              className="h-[30px] w-64 rounded-[4px] border border-[#eeeeef] bg-[#f6f6f7] pl-9 pr-3 text-[11px] outline-none"
            />
          </label>
        </div>

        <section className="min-h-[460px] rounded-b-[4px] border border-t-0 border-gray-100 px-9 py-8">
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[14px] font-semibold ">{activeLabel}</h2>
          {loading ? (
            <div className="py-16 text-center text-gray-400 font-medium">Loading {activeLabel.toLowerCase()}...</div>
          ) : users.length > 0 ? (
            <div className="space-y-4">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                  <div className="flex items-center gap-4">
                    <img src={u.avatar || figmaAssets.surajAvatar} alt="" className="h-[40px] w-[40px] rounded-full object-cover border border-gray-100" />
                    <div>
                      <p className="text-[16px] font-medium text-black">{u.username || u.name || "User"}</p>
                      <p className="text-[13px] text-[#555963]">{u.displayName || u.email || ""}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFollowToggle(u.id, u.isFollowing !== false)}
                    className={`h-[29px] min-w-[90px] px-4 rounded-[5px] text-[13px] font-bold transition ${
                      u.isFollowing !== false ? "bg-[#eeeeef] text-black hover:bg-gray-200" : "bg-[#3f5fe0] text-white hover:bg-[#344fd0]"
                    }`}
                  >
                    {u.isFollowing !== false ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 font-medium">
              No {activeLabel.toLowerCase()} found.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ProfileHero({ onNavigate }: { onNavigate?: (view: ViewType) => void }) {
  const { token, user } = useAuth();
  const [profile, setProfile] = useState<any>(() => {
    return getUserProfile();
  });

  useEffect(() => {
    webappApi.getProfile(token || undefined).then((data) => {
      if (data) {
        setProfile(data);
        saveUserProfile(data);
      }
    }).catch(console.warn);
  }, [token]);

  const userKey = user?.id || user?.email || user?.name || "guest";
  const rawName = user?.name || user?.displayName || (user?.email ? user.email.split('@')[0] : "");
  const displayName = profile?.displayName || rawName || "Creative Creator";
  const savedUserAvatar = getUserAvatar();
  const savedUserBanner = getUserBanner();
  const avatarSrc = savedUserAvatar || profile?.avatar || user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3f5fe0&color=fff&size=500`;
  const bannerSrc = savedUserBanner || profile?.banner || "https://picsum.photos/seed/deckoviz-banner/1200/400";

  return (
    <div className="relative mb-[82px]">
      <div className="h-[280px] w-full overflow-hidden rounded-[7px]">
        <img
          src={bannerSrc}
          alt="Banner"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/deckoviz-banner/1200/400";
          }}
        />
      </div>
      <div className="absolute -bottom-[84px] left-1/2 flex h-[148px] w-[89%] -translate-x-1/2 items-center justify-between rounded-[18px] bg-white px-8 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:px-[42px]">
        <div className="flex min-w-0 items-center gap-5">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-[86px] w-[86px] shrink-0 rounded-full border-[5px] border-white object-cover shadow-[0_3px_8px_rgba(15,23,42,0.15)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3f5fe0&color=fff&size=200`;
            }}
          />
          <div className="min-w-0">
            <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-0.5 text-[22px] font-bold leading-tight ">{displayName}</h1>
            <p className="text-[15px] font-medium leading-tight text-[#70737b]">{profile?.bio || profile?.title || "AI Artist & Creative Explorer"}</p>
          </div>
          <button
            onClick={() => onNavigate?.("ai_manager")}
            className="ml-2 h-[44px] shrink-0 whitespace-nowrap rounded-full bg-[#3f5fe0] px-6 text-[14px] font-bold text-white shadow-[0_10px_18px_rgba(63,95,224,0.28)] transition hover:bg-[#344fd0]"
          >
            + AI Photo Manager
          </button>
        </div>
        <div className="hidden items-center gap-6 pr-2 lg:flex">
          <Stat value={String(profile?.postCount ?? 548)} label="Post" />
          <Stat value={String(profile?.followerCount ?? 0)} label="Followers" />
          <Stat value={String(profile?.followingCount ?? 0)} label="Following" />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-[#c8c8cc] pl-6 text-center first:border-l-0 first:pl-0">
      <p className="text-[16px] font-bold text-black">{value}</p>
      <p className="text-[13px] text-black">{label}</p>
    </div>
  );
}
