import { useState, useEffect } from "react";
import { artistAvatars, figmaAssets } from "../webappData";
import { webappApi } from "../../../lib/webappApi";
import { Loader2 } from "lucide-react";

const fallbackCollections = [
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[1], artistAvatars[2], figmaAssets.emmaAvatar]
  },
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[0], figmaAssets.emmaAvatar]
  },
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[3], artistAvatars[1], figmaAssets.emmaAvatar]
  }
];

const fallbackArtworks = [
  {
    title: "Vibrant Attraction",
    sharedWithUser: "James martini",
    items: 4,
    image: figmaAssets.soloRafting,
    avatar: figmaAssets.surajAvatar
  },
  {
    title: "Vibrant Attraction",
    sharedWithUser: "James martini",
    items: 4,
    image: figmaAssets.soloRafting,
    avatar: figmaAssets.emmaAvatar
  }
];

export default function AIPhotoManagerView() {
  const [activeTab, setActiveTab] = useState("Shared with me");
  const [collections, setCollections] = useState<any[]>([]);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      webappApi.getCollections().catch(() => []),
      webappApi.getArtworks({ limit: 6 }).catch(() => ({ items: [] }))
    ]).then(([colRes, artRes]) => {
      setCollections(colRes.length ? colRes : fallbackCollections);
      setArtworks(artRes.items?.length ? artRes.items : fallbackArtworks);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative flex w-full justify-center pb-20 pt-9 font-sans">
      <div className="w-full max-w-[1090px]">
        
        {/* Header */}
        <div className="mb-6 px-2">
          <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold  mb-1">Shared Images & Collections</h1>
          <p className="text-sm text-gray-500 font-medium">View and manage all your shared artworks and collections</p>
        </div>

        {/* Global Tabs */}
        <div className="mb-8 flex w-full overflow-hidden rounded-[5px] border border-gray-100 p-0">
          {["Shared with me", "Shared by me"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === tab 
                  ? "border-[#1a237e] text-[#1a237e]" 
                  : "border-transparent text-gray-500 hover:text-gray-800 bg-gray-50/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>
        ) : (
          <>
            {/* Collections Section */}
            <div className="mb-10 px-2">
               <div className="flex items-center justify-between mb-4">
                  <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold ">Collections</h2>
                  <button className="text-[#3b5bdb] text-sm font-bold hover:underline transition">View all</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {collections.map((col, idx) => (
                    <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover: transition">
                       {/* Grid 2x2 Image Collage */}
                       <div className="h-[211px] overflow-hidden">
                          <img src={col.coverUrl || figmaAssets.collectionCollage} alt="" className="h-full w-full object-cover" />
                       </div>
                       
                       {/* Content */}
                       <div className="p-4 flex flex-col relative h-[100px]">
                          <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{col.title || col.name}</h3>
                          <p className="text-sm font-medium text-gray-800">Shared with {col.sharedWith || 0} People</p>
                          <p className="text-xs text-gray-500 font-medium mt-1">- {col.items || 0} items</p>
                          
                          <div className="absolute bottom-4 right-4 flex -space-x-2">
                             {(col.avatars || [figmaAssets.emmaAvatar]).map((av: string, avIdx: number) => (
                                <img key={avIdx} src={av} alt="participant" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-blue-500" />
                             ))}
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>

            {/* Individual Artwork Section */}
            <div className="px-2">
               <div className="flex items-center justify-between mb-4">
                  <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold ">Individual Artwork</h2>
                  <button className="text-[#3b5bdb] text-sm font-bold hover:underline transition">View all</button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {artworks.map((art, idx) => (
                    <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover: transition">
                       <div className="h-[220px] w-full">
                          <img src={art.image || art.imageUrl || figmaAssets.soloRafting} alt={art.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-4 flex flex-col relative">
                          <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{art.title}</h3>
                          <p className="text-sm font-medium text-gray-800">Shared with {art.sharedWithUser || "Someone"}</p>
                          <p className="text-xs text-gray-500 font-medium mt-1 mb-2">- {art.items || 1} items</p>
                          
                          <div className="absolute bottom-4 right-4">
                            <img src={art.avatar || (art.artist && art.artist.avatar) || figmaAssets.surajAvatar} alt="user" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-orange-400" />
                          </div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
