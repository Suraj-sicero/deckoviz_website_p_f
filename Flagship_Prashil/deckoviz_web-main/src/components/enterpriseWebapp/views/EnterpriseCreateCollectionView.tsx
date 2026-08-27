import { useState, useEffect } from "react";
import { Plus, Check, Image as ImageIcon, Clock, Loader2, RefreshCw, Upload, Sparkles } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { getVizzyGenerativeImages } from "../../../lib/webappApi";
import { webappApi } from "../../../lib/webappApi";

const FALLBACK_IMAGES = [
  "/images/webapp/figma/spiral-ocean.jpg",
  "/images/webapp/figma/solo-rafting-card.jpg",
  "/images/webapp/figma/violin-art.jpg",
  "/images/webapp/figma/abstract-wave-wide.jpg",
  "/images/webapp/figma/interior-tech.jpg",
  "/images/webapp/figma/aurora-lake.jpg",
  "/images/webapp/figma/boat-pond.jpg",
  "/images/webapp/nature_garden.png",
  "/images/webapp/digital_plants.png",
  "/images/webapp/vibrant_face_art.png",
  "/images/webapp/city_fire_reflection.png",
  "/images/webapp/abstract_landscape.png",
];

interface MediaItem {
  id: string;
  url: string;
  prompt?: string;
  title?: string;
  createdAt?: string;
  source?: "generated" | "uploaded" | "static";
}

export default function CreateCollectionView() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayHours, setDisplayHours] = useState("00:00:00");
  const [displaySeconds, setDisplaySeconds] = useState("00:30");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "generated" | "uploaded">("all");

  const loadUserMedia = async () => {
    setLoadingMedia(true);
    const allMedia: MediaItem[] = [];
    const seenUrls = new Set<string>();

    try {
      const vizzyImages = await getVizzyGenerativeImages();
      vizzyImages.forEach((img) => {
        if (img.url && !seenUrls.has(img.url)) {
          seenUrls.add(img.url);
          allMedia.push({
            id: img.id,
            url: img.url,
            prompt: img.prompt,
            title: img.prompt || "Generated Artwork",
            createdAt: img.createdAt,
            source: "generated",
          });
        }
      });
    } catch (err) {
      console.warn("[CreateCollection] Vizzy images fallback:", err);
    }

    try {
      const enterpriseMedia = await enterpriseApi.getMedia();
      const list = Array.isArray(enterpriseMedia) ? enterpriseMedia : (enterpriseMedia?.items || enterpriseMedia?.data || []);
      list.forEach((m: any) => {
        const url = m.url || m.mediaUrl || m.media_url;
        if (url && !seenUrls.has(url)) {
          seenUrls.add(url);
          allMedia.push({
            id: m.id || `ent-${Date.now()}-${Math.random()}`,
            url,
            title: m.fileName || m.title || m.prompt || "Uploaded Media",
            prompt: m.prompt,
            createdAt: m.createdAt,
            source: m.isGenerated ? "generated" : "uploaded",
          });
        }
      });
    } catch (err) {
      console.warn("[CreateCollection] Enterprise media fallback:", err);
    }

    try {
      const homeMedia = await webappApi.getMedia({ limit: 100 });
      const list = Array.isArray(homeMedia) ? homeMedia : (homeMedia?.items || homeMedia?.data || homeMedia?.media || []);
      list.forEach((m: any) => {
        const url = m.url || m.mediaUrl || m.media_url;
        if (url && !seenUrls.has(url)) {
          seenUrls.add(url);
          allMedia.push({
            id: m.id || `home-${Date.now()}-${Math.random()}`,
            url,
            title: m.fileName || m.title || m.prompt || "Media",
            prompt: m.prompt,
            createdAt: m.createdAt,
            source: m.isGenerated ? "generated" : "uploaded",
          });
        }
      });
    } catch (err) {
      console.warn("[CreateCollection] Home media fallback:", err);
    }

    if (allMedia.length === 0) {
      FALLBACK_IMAGES.forEach((url, idx) => {
        allMedia.push({
          id: `static-${idx}`,
          url,
          title: `Sample Artwork ${idx + 1}`,
          source: "static",
        });
      });
    }

    setMediaItems(allMedia);
    setLoadingMedia(false);
  };

  useEffect(() => {
    loadUserMedia();
  }, []);

  const filteredMedia = mediaItems.filter((m) => {
    if (activeTab === "all") return true;
    if (activeTab === "generated") return m.source === "generated";
    if (activeTab === "uploaded") return m.source === "uploaded" || m.source === "static";
    return true;
  });

  const toggleImage = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreate = async () => {
    if (!name || selectedIds.size === 0) return;
    setSaving(true);
    try {
      const selectedMedia = mediaItems.filter((m) => selectedIds.has(m.id));
      const items = selectedMedia.map((m, i) => ({
        id: m.id || `img-${Date.now()}-${i}`,
        title: m.title || m.prompt || `${name} #${i + 1}`,
        url: m.url,
        mediaUrl: m.url,
        itemType: "image",
        displayHours,
        displaySeconds,
      }));

      await enterpriseApi.createCollection({
        name,
        title: name,
        description,
        displayHours,
        displaySeconds,
        itemCount: items.length,
        items,
      });

      setSuccessMsg(`Collection "${name}" saved to Firebase with ${items.length} artworks!`);
      setName("");
      setDescription("");
      setSelectedIds(new Set());
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Failed to create collection", err);
      alert("Failed to save collection to Firebase. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const genCount = mediaItems.filter((m) => m.source === "generated").length;
  const uploadCount = mediaItems.filter((m) => m.source === "uploaded" || m.source === "static").length;

  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 py-6 text-slate-800">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#0f172a] tracking-tight flex items-center gap-2">
          <Sparkles className="text-blue-600" size={24} /> Create Enterprise Collection
        </h1>
        <p className="text-xs text-slate-500 mt-1">Configure title, artwork display timing, and save directly to Firebase Cloud Firestore</p>
      </div>

      {successMsg && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700 text-sm font-semibold flex items-center gap-2 shadow-sm">
          <Check size={18} /> {successMsg}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — Form (Light Executive Styling) */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sticky top-[80px] shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
            <h3 className="mb-5 text-[15px] font-bold text-[#0f172a] border-b border-slate-100 pb-3">Collection Details</h3>
            
            <label className="block mb-4">
              <span className="text-xs font-bold text-slate-500 mb-1.5 block">Collection Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Executive Suite Art Array"
                className="h-11 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>

            <label className="block mb-4">
              <span className="text-xs font-bold text-slate-500 mb-1.5 block">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this collection..."
                className="h-20 w-full rounded-xl border border-slate-200 bg-[#f8fafc] p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white resize-none"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <label>
                <span className="text-[11px] font-bold text-slate-500 mb-1 block flex items-center gap-1">
                  <Clock size={11} /> Display Hours
                </span>
                <input
                  type="text"
                  value={displayHours}
                  onChange={(e) => setDisplayHours(e.target.value)}
                  placeholder="00:00:00"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                />
              </label>
              <label>
                <span className="text-[11px] font-bold text-slate-500 mb-1 block flex items-center gap-1">
                  <Clock size={11} /> Display Seconds
                </span>
                <input
                  type="text"
                  value={displaySeconds}
                  onChange={(e) => setDisplaySeconds(e.target.value)}
                  placeholder="00:30"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-3 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                />
              </label>
            </div>

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <ImageIcon size={14} className="text-blue-600" />
                <p className="text-xs font-bold text-blue-700">{selectedIds.size} artworks selected</p>
              </div>
              <p className="text-[10px] text-blue-600/80">Click images on the right to select artwork items</p>
            </div>

            <button 
              onClick={handleCreate}
              disabled={!name || selectedIds.size === 0 || saving}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#182a4a] hover:bg-blue-600 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={14} />} 
              {saving ? "Saving to Firebase..." : "Save Collection to Firebase"}
            </button>
          </div>
        </div>

        {/* Right — Image Selector (Light Executive Styling) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-[#0f172a]">Your Media Gallery (Firebase)</h3>
              <button 
                onClick={loadUserMedia}
                disabled={loadingMedia}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-500 hover:bg-slate-100 transition"
              >
                <RefreshCw size={12} className={loadingMedia ? "animate-spin" : ""} /> Refresh
              </button>
            </div>

            {/* Tabs for Generated / Uploaded */}
            <div className="flex items-center gap-2 mb-5">
              {[
                { key: "all" as const, label: `All (${mediaItems.length})`, icon: ImageIcon },
                { key: "generated" as const, label: `VGC Generated (${genCount})`, icon: Sparkles },
                { key: "uploaded" as const, label: `Uploaded (${uploadCount})`, icon: Upload },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === tab.key
                      ? "bg-[#182a4a] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <tab.icon size={12} /> {tab.label}
                </button>
              ))}
            </div>

            {loadingMedia ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 size={24} className="animate-spin text-blue-600" />
                <span className="ml-3 text-sm text-slate-500 font-medium">Loading your media from Firebase...</span>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-500">No media found</p>
                <p className="text-xs text-slate-400 mt-1">Generate images in Vizzy Canvas or upload media to see them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
                {filteredMedia.map((item) => {
                  const selected = selectedIds.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleImage(item.id)}
                      className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${selected ? "border-blue-600 shadow-lg ring-2 ring-blue-500/30" : "border-slate-100 hover:border-slate-300"}`}
                    >
                      <img 
                        src={item.url} 
                        alt={item.title || ""} 
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title || "Art")}&background=2563eb&color=fff&size=256`;
                        }}
                      />
                      {item.source === "generated" && (
                        <div className="absolute top-1.5 left-1.5 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                          <Sparkles size={8} /> VGC
                        </div>
                      )}
                      {item.source === "uploaded" && (
                        <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-sm">
                          <Upload size={8} /> Uploaded
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-[9px] text-white font-semibold truncate">{item.title || item.prompt || "Artwork"}</p>
                      </div>
                      {selected && (
                        <div className="absolute inset-0 bg-[#182a4a]/50 flex items-center justify-center">
                          <Check size={22} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
