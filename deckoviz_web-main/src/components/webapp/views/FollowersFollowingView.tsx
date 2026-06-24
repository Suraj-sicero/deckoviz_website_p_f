import { Search, User, Users, Image as ImageIcon } from "lucide-react";
import { figmaAssets } from "../webappData";

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
  const rows = Array.from({ length: 7 }, (_, index) => index);

  const handleTabClick = (label: string) => {
    if (label === "Profile") onNavigate?.("profile");
    if (label === "Post") onNavigate?.("social");
    if (label === "Followers") onNavigate?.("followers");
    if (label === "Following") onNavigate?.("following");
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
              placeholder="Search Followers ...."
              className="h-[30px] w-64 rounded-[4px] border border-[#eeeeef] bg-[#f6f6f7] pl-9 pr-3 text-[11px] outline-none"
            />
          </label>
        </div>

        <section className="min-h-[460px] rounded-b-[4px] border border-t-0 border-gray-100 px-9 py-8">
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[14px] font-semibold ">{activeLabel}</h2>
          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={figmaAssets.emmaAvatar} alt="" className="h-[40px] w-[40px] rounded-full object-cover" />
                  <div>
                    <p className="text-[16px] font-medium text-black">emma_ 25</p>
                    <p className="text-[13px] text-[#555963]">Emma Wilson</p>
                  </div>
                </div>
                <button className="h-[29px] w-[101px] rounded-[5px] bg-[#eeeeef] text-[14px] font-medium text-black">
                  Following
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileHero({ onNavigate }: { onNavigate?: (view: ViewType) => void }) {
  return (
    <div className="relative mb-[82px]">
      <div className="h-[280px] w-full overflow-hidden rounded-[7px]">
        <img src={figmaAssets.profileBanner} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute -bottom-[84px] left-1/2 flex h-[148px] w-[89%] -translate-x-1/2 items-center justify-between rounded-[18px] bg-white px-8 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:px-[42px]">
        <div className="flex min-w-0 items-center gap-5">
          <img src={figmaAssets.surajAvatar} alt="" className="h-[86px] w-[86px] shrink-0 rounded-full border-[5px] border-white object-cover shadow-[0_3px_8px_rgba(15,23,42,0.15)]" />
          <div className="min-w-0">
            <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-0.5 text-[22px] font-bold leading-tight ">Suraj Pandya</h1>
            <p className="text-[15px] font-medium leading-tight text-[#70737b]">AI Enthusiast</p>
          </div>
          <button
            onClick={() => onNavigate?.("ai_manager")}
            className="ml-2 h-[44px] shrink-0 whitespace-nowrap rounded-full bg-[#3f5fe0] px-6 text-[14px] font-bold text-white shadow-[0_10px_18px_rgba(63,95,224,0.28)] transition hover:bg-[#344fd0]"
          >
            + AI Photo Manager
          </button>
        </div>
        <div className="hidden items-center gap-6 pr-2 lg:flex">
          <Stat value="548" label="Post" />
          <Stat value="12.7k" label="Followers" />
          <Stat value="221" label="Following" />
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
