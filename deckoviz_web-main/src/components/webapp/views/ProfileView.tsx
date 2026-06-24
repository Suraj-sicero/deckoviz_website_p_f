import { useState } from "react";
import {
  User,
  Image as ImageIcon,
  Users,
  Search,
  ChevronDown,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";
import { figmaAssets } from "../webappData";

/* ───────── DATA ───────── */

const favoriteArtStyles = [
  "Surrealism",
  "Abstract Expressionism",
  "Conceptual Portraits",
  "Minimalism",
];

const favoriteArtworks = [
  {
    title: "Boot in Pond",
    subtitle: "Ux Pilot Monet, 1919",
    rating: 4.5,
    tags: ["Abstract Artcrafts", "Contemporary"],
    quote:
      "I love the dreamy quality and use of light in this piece. The way light dances through it feels like quite magic.",
    date: "Rated on March 15, 2025",
    image: figmaAssets.boatPond,
  },
  {
    title: "Boot in Pond",
    subtitle: "Ux Pilot Monet, 1919",
    rating: 4.5,
    tags: ["Abstract Artcrafts", "Contemporary"],
    quote:
      "I love the dreamy quality and use of light in this piece. The way light dances through it feels like quite magic.",
    date: "Rated on March 15, 2025",
    image: figmaAssets.boatPond,
  },
  {
    title: "Boot in Pond",
    subtitle: "Ux Pilot Monet, 1919",
    rating: 4.5,
    tags: ["Abstract Artcrafts", "Contemporary"],
    quote:
      "I love the dreamy quality and use of light in this piece. The way light dances through it feels like quite magic.",
    date: "Rated on March 15, 2025",
    image: figmaAssets.boatPond,
  },
];

export default function ProfileView({
  onNavigate,
}: {
  onNavigate?: (view: "profile" | "social" | "followers" | "following" | "ai_manager") => void;
}) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [activeRightTab, setActiveRightTab] = useState("Favourite Artworks");

  return (
    <div className="relative flex w-full justify-center pb-20 pt-4 font-sans">
      <div className="w-full max-w-[1094px]">
        {/* ─── Banner Area ─── */}
        <div className="relative mb-[82px]">
          <div className="h-[280px] w-full overflow-hidden rounded-[7px]">
            <img
              src={figmaAssets.profileBanner}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Profile Strip */}
          <div className="absolute -bottom-[84px] left-1/2 flex h-[148px] w-[89%] -translate-x-1/2 items-center justify-between rounded-[18px] bg-white/90 px-8 py-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl border border-white/50 lg:px-[42px]">
            <div className="flex min-w-0 items-center gap-5">
              <div className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-sm">
                <img
                  src={figmaAssets.surajAvatar}
                  alt="Suraj Pandya"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-0.5 text-[22px] font-bold leading-tight ">
                  Suraj Pandya
                </h1>
                <p className="text-[15px] font-medium leading-tight text-[#70737b]">
                  AI Enthusiast
                </p>
              </div>
              <button
                onClick={() => onNavigate?.("ai_manager")}
                className="ml-2 h-[44px] shrink-0 whitespace-nowrap rounded-full bg-[#3f5fe0] px-6 text-[14px] font-bold text-white shadow-[0_10px_18px_rgba(63,95,224,0.28)] transition hover:bg-[#344fd0]"
              >
                + AI Photo Manager
              </button>
            </div>

            <div className="hidden items-center gap-6 pr-2 lg:flex">
              <div className="border-l border-[#c8c8cc] pl-6 text-center first:border-l-0 first:pl-0">
                <div className="text-[16px] font-bold leading-tight text-black">
                  548
                </div>
                <div className="text-[13px] font-medium text-black">Post</div>
              </div>
              <div className="border-l border-[#c8c8cc] pl-6 text-center">
                <div className="text-[16px] font-bold leading-tight text-black">
                  12.7k
                </div>
                <div className="text-[13px] font-medium text-black">
                  Followers
                </div>
              </div>
              <div className="border-l border-[#c8c8cc] pl-6 text-center">
                <div className="text-[16px] font-bold leading-tight text-black">
                  221
                </div>
                <div className="text-[13px] font-medium text-black">
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

        {/* ─── Grid Area ─── */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - About */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            <div className="rounded-[24px] p-8 border border-gray-100 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full overflow-hidden border-[5px] border-[#3b5bdb]">
                  <img
                    src={figmaAssets.surajAvatar}
                    alt="Suraj Pandya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[#2563eb] rounded-full border-2"></div>
              </div>

              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-xl font-bold  mb-0.5">
                Suraj Pandya
              </h2>
              <p className="text-gray-500 text-sm font-medium mb-1">
                @suraj pandya_123
              </p>
              <p className="text-gray-500 text-xs font-medium mb-8">
                UK, London Metropolitan
              </p>

              <div className="flex items-center gap-10 w-full justify-center border-b border-gray-100 pb-8 mb-8">
                <div className="text-center">
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    548
                  </div>
                  <div className="text-gray-500 text-xs font-medium">Post</div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    12.7k
                  </div>
                  <div className="text-gray-500 text-xs font-medium">
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[20px] font-bold text-gray-900 leading-tight">
                    221
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
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium mb-4 text-justify">
                  Hi there! I'm Suraj Pandya - an AI enthusiast, deep thinker, artist at heart, and passionate content creator. I thrive at the intersection of technology and creativity, constantly exploring how artificial intelligence can amplify human expression and storytelling.
                </p>
                <p className="text-gray-500 text-[13px] leading-relaxed font-medium text-justify mb-8">
                  Whether it's translating complex ideas into compelling words, creating thought-provoking art, or diving into the possibilities of AI, my work is driven by curiosity, emotion, and purpose.
                </p>

                <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[17px] font-bold  mb-4">
                  My Favourite Art Styles
                </h3>
                <div className="flex flex-wrap gap-3">
                  {favoriteArtStyles.map((style, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 rounded-full border border-gray-100"
                    >
                      <Sparkles size={14} className="text-[#2563eb]" />
                      <span className="text-[13px] font-bold text-gray-600">
                        {style}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Artworks */}
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

              {/* List */}
              <div className="flex flex-col p-6 gap-6 h-[800px] overflow-y-auto custom-scrollbar">
                {favoriteArtworks.map((art, idx) => (
                  <div key={idx} className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0 relative group"
                  >
                    <button className="absolute top-0 right-0 text-red-500 hover:scale-110 transition z-10 p-2">
                       <Heart size={16} fill="currentColor" />
                    </button>
                    
                    <div className="flex gap-5">
                      <div className="w-44 h-[110px] rounded-xl overflow-hidden shrink-0">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col pt-1">
                        <h4 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-base mb-1">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-3">
                          {art.subtitle}
                        </p>
                        <div className="flex items-center gap-1 mb-3">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < 4 ? "text-yellow-400" : "text-gray-300"} fill={i < 4 ? "currentColor" : "none"} />
                           ))}
                           <span className="text-xs font-bold text-gray-700 ml-1 mt-0.5">{art.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           {art.tags.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-500 text-[11px] font-bold rounded-md">
                               {tag}
                             </span>
                           ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pt-2 pl-4 border-l-[3px] border-[#2563eb]/30 ml-2">
                       <span className="absolute -top-1 left-1 text-2xl text-[#2563eb] font-serif leading-none">"</span>
                       <p className="text-[13px] text-blue-500 font-medium leading-relaxed mb-3 mt-1">
                         {art.quote}
                       </p>
                       <p className="text-[10px] text-gray-400 font-medium">
                         {art.date}
                       </p>
                       <span className="absolute bottom-2 right-12 text-2xl text-[#2563eb] font-serif leading-none">"</span>
                    </div>
                  </div>
                ))}
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
    </div>
  );
}
