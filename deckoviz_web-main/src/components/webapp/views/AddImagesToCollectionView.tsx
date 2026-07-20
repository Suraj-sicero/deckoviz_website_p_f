import { useState, useEffect, useCallback } from "react";
import { Search, Camera, CheckCircle2, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { webappApi } from "../../../lib/webappApi";

const categories = [
  "Landscape", "Portrait", "Abstract", "Digital Art", "Minimalist", "Nature"
];

interface MediaItem {
  id: string;
  mediaUrl: string;
  fileName: string;
  mediaType: string;
}

interface Collection {
  id: string;
  name: string;
}

export default function AddImagesToCollectionView() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const fetchMedia = useCallback(async () => {
    if (!token) return;
    try {
      const data = await webappApi.getMedia({ limit: 50 }, token);
      setMedia(data.items || []);
    } catch { /* ignore */ }
  }, [token]);

  const fetchCollections = useCallback(async () => {
    if (!token) return;
    try {
      const data = await webappApi.getCollections(token);
      setCollections(Array.isArray(data) ? data : []);
    } catch { /* ignore */ }
  }, [token]);

  useEffect(() => { fetchMedia(); fetchCollections(); }, [fetchMedia, fetchCollections]);

  const toggleMedia = (id: string) => {
    setSelectedMedia(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredMedia = media.filter(m =>
    !searchQuery || m.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCollection = async () => {
    if (!token || !selectedCollection || selectedMedia.size === 0) return;
    setAdding(true);
    setMessage("");
    let added = 0;
    for (const mediaId of selectedMedia) {
      try {
        await webappApi.addCollectionItem(selectedCollection, { itemId: mediaId, itemType: "image" }, token);
        added++;
      } catch { /* skip */ }
    }
    setMessage(`Added ${added} item${added !== 1 ? "s" : ""} to collection`);
    setSelectedMedia(new Set());
    setAdding(false);
  };

  const selectedCollectionName = collections.find(c => c.id === selectedCollection)?.name || "Select Collection";

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 px-2">
          <div>
            <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-3xl font-bold  mb-1">Add Images to collection</h1>
            <p className="text-gray-800 text-sm font-medium">Find and add Images to collection</p>
          </div>
          <button className="bg-[#4b7ce6] hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/30 transition-colors">
            + Create Collection
          </button>
        </div>

        {/* Search Panel Box */}
        <div className="/95 rounded-[24px] p-6 border border-white mb-10 relative">
           
           <div className="flex gap-4 mb-6">
             {/* Text Search */}
             <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search Images by keyboard" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-full pl-6 pr-12 py-3 text-sm text-gray-600 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 shadow-sm shadow-gray-100/50"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                   <Search size={16} strokeWidth={2} />
                </button>
             </div>
             
             {/* Image Search Button */}
             <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm shadow-gray-100/50 transition">
                <Camera size={18} className="text-gray-700" strokeWidth={2} /> Search by Images
             </button>
           </div>

           {/* Filter Pills */}
           <div className="flex flex-wrap gap-3">
             {categories.map((cat, i) => (
               <button 
                 key={i} 
                 className="bg-white border border-[#e2e8f0] px-5 py-2 rounded-full text-xs font-bold text-[#1e293b] shadow-[0_2px_8px_rgb(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all"
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        {/* Collection Selector + Add Button */}
        {selectedMedia.size > 0 && (
          <div className="flex items-center gap-4 mb-6 px-2">
            <div className="relative">
              <button
                onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition"
              >
                {selectedCollectionName}
                <ChevronDown size={16} />
              </button>
              {showCollectionDropdown && (
                <div className="absolute z-20 top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg w-56 max-h-48 overflow-y-auto">
                  {collections.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-400">No collections yet</div>
                  )}
                  {collections.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCollection(c.id); setShowCollectionDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition ${selectedCollection === c.id ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCollection}
              disabled={!selectedCollection || adding}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {adding ? "Adding..." : `Add to Collection (${selectedMedia.size})`}
            </button>
          </div>
        )}

        {message && (
          <div className="mb-4 px-2 text-sm text-green-600 font-medium">{message}</div>
        )}

        {/* Media Grid */}
        <div className="px-2">
           <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-5">
             {searchQuery ? `Search Results (${filteredMedia.length})` : `Your Media (${media.length})`}
           </h2>
           {filteredMedia.length === 0 ? (
             <div className="text-center py-12 text-gray-400 text-sm">No media found. Upload some media first.</div>
           ) : (
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
               {filteredMedia.map((item) => (
                 <div
                   key={item.id}
                   onClick={() => toggleMedia(item.id)}
                   className={`relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border-2 transition-all ${
                     selectedMedia.has(item.id) ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"
                   }`}
                 >
                   <img src={item.mediaUrl} alt={item.fileName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent"></div>
                   <div className="absolute bottom-4 inset-x-0 w-full text-center">
                      <span className="text-white text-base font-bold tracking-wide drop-shadow-md">{item.fileName}</span>
                   </div>
                   {selectedMedia.has(item.id) && (
                     <div className="absolute top-3 right-3">
                       <CheckCircle2 size={24} className="text-blue-500 fill-white" />
                     </div>
                   )}
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
