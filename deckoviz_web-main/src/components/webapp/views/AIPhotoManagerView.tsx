import { useState, useEffect } from "react";
import { artistAvatars, figmaAssets } from "../webappData";
import { webappApi } from "../../../lib/webappApi";
import { Loader2, Eye, Monitor, Check, X, FolderPlus } from "lucide-react";
import { setFrameImage } from "../../../lib/frameStore";

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

  // Collection modal & lightbox state
  const [selectedColModal, setSelectedColModal] = useState<any | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [frameToast, setFrameToast] = useState<string | null>(null);

  const handleSendToFrame = (imgUrl: string, title?: string) => {
    if (!imgUrl) return;
    setFrameImage(imgUrl);
    setFrameToast(title ? `Sent "${title}" to Virtual Frame!` : "Sent image to Virtual Frame!");
    setTimeout(() => setFrameToast(null), 3000);
    window.open("/webframe", "_blank");
  };

  useEffect(() => {
    const extractList = (res: any) => {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (Array.isArray(res.collections)) return res.collections;
      if (Array.isArray(res.artworks)) return res.artworks;
      if (Array.isArray(res.items)) return res.items;
      if (Array.isArray(res.rows)) return res.rows;
      if (Array.isArray(res.data)) return res.data;
      return [];
    };

    Promise.all([
      webappApi.getCollections().catch(() => []),
      webappApi.getArtworks({ limit: 12 }).catch(() => [])
    ]).then(([colRes, artRes]) => {
      const realCols = extractList(colRes);
      const realArts = extractList(artRes);
      const savedCols = JSON.parse(localStorage.getItem("deckoviz_user_collections") || "[]");
      const combinedColsMap = new Map();
      [...savedCols, ...realCols].forEach(c => {
        const k = c.id || c.name || c.title;
        if (k) combinedColsMap.set(k, c);
      });
      const mergedCols = Array.from(combinedColsMap.values());

      setCollections(mergedCols.length > 0 ? mergedCols : fallbackCollections);
      setArtworks(realArts.length > 0 ? realArts : fallbackArtworks);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative flex w-full justify-center pb-20 pt-9 font-sans">
      {/* Toast Notification */}
      {frameToast && (
        <div className="fixed top-6 right-6 z-[350] flex items-center gap-2 bg-[#182a4a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <Check size={16} className="text-emerald-400" />
          <span>{frameToast}</span>
        </div>
      )}

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
                 {collections.map((col, idx) => {
                    const cover = col.coverUrl || col.image || (Array.isArray(col.items) && col.items[0]?.url) || (Array.isArray(col.items) && col.items[0]?.mediaUrl) || figmaAssets.collectionCollage;
                    const count = Array.isArray(col.items) ? col.items.length : (typeof col.items === "number" ? col.items : col.itemCount || 0);

                    return (
                      <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition group cursor-pointer" onClick={() => setSelectedColModal(col)}>
                         {/* Image Collage with Hover Actions */}
                         <div className="h-[211px] overflow-hidden relative">
                            <img
                              src={cover}
                              alt=""
                              className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.src = `https://picsum.photos/seed/${encodeURIComponent(col.title || col.name || "col")}/800/800`;
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); setSelectedColModal(col); }}
                                className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:scale-110 transition"
                                title="View Collection Images"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const targetUrl = cover || (Array.isArray(col.items) && (col.items[0]?.url || col.items[0]?.mediaUrl));
                                  if (targetUrl) handleSendToFrame(targetUrl, col.title || col.name);
                                }}
                                className="w-10 h-10 rounded-full bg-[#3f5fe0] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                                title="Cast to Virtual Frame"
                              >
                                <Monitor size={18} />
                              </button>
                            </div>
                         </div>
                         
                         {/* Content */}
                         <div className="p-4 flex flex-col relative h-[100px] bg-white">
                            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{col.title || col.name}</h3>
                            <p className="text-sm font-medium text-gray-800">Shared with {col.sharedWith || 0} People</p>
                            <p className="text-xs text-gray-500 font-medium mt-1">- {count} items</p>
                            
                            <div className="absolute bottom-4 right-4 flex -space-x-2">
                               {(col.avatars || [figmaAssets.emmaAvatar]).map((av: string, avIdx: number) => (
                                  <img key={avIdx} src={av} alt="participant" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-blue-500" />
                               ))}
                            </div>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Individual Artwork Section */}
            <div className="px-2">
               <div className="flex items-center justify-between mb-4">
                  <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold ">Individual Artwork</h2>
                  <button className="text-[#3b5bdb] text-sm font-bold hover:underline transition">View all</button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {artworks.map((art, idx) => {
                    const artImg = art.image || art.imageUrl || art.url || figmaAssets.soloRafting;
                    return (
                      <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition group">
                         <div className="h-[220px] w-full relative">
                            <img
                              src={artImg}
                              alt={art.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(art.title || "art")}/800/800`;
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                              <button
                                onClick={() => setLightboxImg(artImg)}
                                className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:scale-110 transition"
                                title="View Image"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => handleSendToFrame(artImg, art.title)}
                                className="w-10 h-10 rounded-full bg-[#3f5fe0] text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                                title="Send to Virtual Frame"
                              >
                                <Monitor size={18} />
                              </button>
                            </div>
                         </div>
                         <div className="p-4 flex flex-col relative bg-white">
                            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{art.title || "Shared Artwork"}</h3>
                            <p className="text-sm font-medium text-gray-800">Shared with {art.sharedWithUser || "Someone"}</p>
                            <p className="text-xs text-gray-500 font-medium mt-1 mb-2">- {art.items || 1} items</p>
                            
                            <div className="absolute bottom-4 right-4">
                              <img src={art.avatar || (art.artist && art.artist.avatar) || figmaAssets.surajAvatar} alt="user" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-orange-400" />
                            </div>
                         </div>
                      </div>
                    );
                 })}
               </div>
            </div>
          </>
        )}
      </div>

      {/* Interactive Collection Detail View Modal */}
      {selectedColModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in-0 duration-200" onClick={() => setSelectedColModal(null)}>
          <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100 text-gray-900" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
}
