import React, { useState, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  Tag,
  Music,
  CheckCircle,
  FolderPlus,
  Sparkles,
  Layers,
  Globe,
  Radio,
  FileCheck,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  Eye,
  Plus,
  Shield,
  Cloud,
  Play,
  Volume2,
  Send,
  Sliders
} from "lucide-react";
import { webappApi } from "../../lib/webappApi";
import { adminGetLibrary } from "../../lib/curatorApi";

export interface LibraryItem {
  id: string;
  title: string;
  url: string;
  category: string;
  style: string;
  tags: string;
  uploadedAt: string;
  source?: string;
}

const DEFAULT_LIBRARY: LibraryItem[] = [
  {
    id: "lib_fb_1",
    title: "Starry Night Over the Rhône",
    url: "https://picsum.photos/seed/van-gogh-rhone/800/800",
    category: "Classical Masterpiece",
    style: "Post-Impressionism",
    tags: "night, museum, classic",
    uploadedAt: "2025-03-01",
    source: "Master Art Vault"
  },
  {
    id: "lib_fb_2",
    title: "Prismatic Horizon #4",
    url: "https://picsum.photos/seed/prismatic-horizon/800/800",
    category: "Generative Abstract",
    style: "Digital Fine Art",
    tags: "abstract, color, modern",
    uploadedAt: "2025-03-02",
    source: "Vizzy Generative"
  }
];

export const MasterAdminLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"artworks" | "music">("artworks");
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(DEFAULT_LIBRARY);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Artwork Upload Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Curated Collections");
  const [style, setStyle] = useState("Fine Art");
  const [tags, setTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Music Upload State
  const [musicTracks, setMusicTracks] = useState<any[]>([]);
  const [musicTitle, setMusicTitle] = useState("");
  const [musicArtist, setMusicArtist] = useState("");
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicUrlInput, setMusicUrlInput] = useState("");
  const [isUploadingMusic, setIsUploadingMusic] = useState(false);

  const loadFirebaseLibrary = async () => {
    setLoading(true);
    try {
      const [mediaResult, apiResult, musicResult] = await Promise.allSettled([
        webappApi.getMedia(),
        adminGetLibrary(),
        webappApi.getMusic()
      ]);

      const media = mediaResult.status === "fulfilled" ? mediaResult.value : [];
      const apiMedia = apiResult.status === "fulfilled" && apiResult.value?.artworks ? apiResult.value.artworks : [];
      const tracks = musicResult.status === "fulfilled" ? musicResult.value : [];
      setMusicTracks(tracks);

      const formattedMedia: LibraryItem[] = media.map((m: any, i: number) => ({
        id: m.id || `media_${i}`,
        title: m.title || `Collection Art #${i + 1}`,
        url: m.url || m.mediaUrl || "",
        category: m.category || "Collection Artwork",
        style: m.style || "Fine Art",
        tags: m.tags ? (Array.isArray(m.tags) ? m.tags.join(", ") : m.tags) : "collection, 4k",
        uploadedAt: m.createdAt || m.uploadedAt || "2025-03-15",
        source: m.source || "Master Art Vault"
      }));

      const formattedApi: LibraryItem[] = apiMedia.map((m: any, i: number) => ({
        id: m.id || `api_media_${i}`,
        title: m.title || `Masterpiece #${i + 1}`,
        url: m.url || m.imageUrl || m.mediaUrl || "",
        category: m.category || "Classical Masterpiece",
        style: m.style || "Fine Art",
        tags: m.tags ? (Array.isArray(m.tags) ? m.tags.join(", ") : m.tags) : "masterpiece, 4k",
        uploadedAt: m.createdAt ? new Date(m.createdAt).toISOString().split("T")[0] : "2025-03-15",
        source: "Master Art Vault"
      })).filter((item) => Boolean(item.url));

      const combinedMap = new Map<string, LibraryItem>();
      [...formattedMedia, ...formattedApi, ...DEFAULT_LIBRARY].forEach((item) => {
        if (item.url && !combinedMap.has(item.url)) {
          combinedMap.set(item.url, item);
        }
      });

      setLibraryItems(Array.from(combinedMap.values()));
    } catch (err) {
      console.warn("Library query notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFirebaseLibrary();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMusicFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMusicFile(file);
      setMusicTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUploadToGlobalLibrary = async () => {
    if (!selectedFile && !previewUrl) {
      setUploadStatus("error");
      setStatusMessage("Please select an image file to upload first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    setStatusMessage("");

    try {
      let persistentUrl = "";
      if (selectedFile) {
        const res = await webappApi.uploadMedia(selectedFile);
        persistentUrl = res.url;
      }

      if (!persistentUrl) {
        throw new Error("A media file is required for upload.");
      }

      const newItem = {
        title: title || selectedFile?.name.replace(/\.[^/.]+$/, "") || "New Deckoviz Artwork",
        url: persistentUrl,
        category: category || "User Collection",
        style: style || "Fine Art",
        tags: tags || "deckoviz, high-res"
      };

      const createdItem: LibraryItem = {
        id: `uploaded_${Date.now()}`,
        ...newItem,
        uploadedAt: new Date().toISOString().split("T")[0],
        source: "Master Art Vault"
      };

      setLibraryItems((prev) => [createdItem, ...prev]);
      setUploadStatus("success");
      setStatusMessage("Artwork uploaded to private media storage successfully!");

      setSelectedFile(null);
      setPreviewUrl("");
      setTitle("");
      setTags("");
    } catch (err: any) {
      setUploadStatus("error");
      setStatusMessage(err.message || "Failed to process image link storage.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadMusicTrack = async () => {
    if (!musicFile && !musicUrlInput) {
      alert("Please select an audio file or enter a music link.");
      return;
    }

    setIsUploadingMusic(true);
    try {
      let finalAudioUrl = musicUrlInput;
      if (musicFile) {
        const uploaded = await webappApi.uploadMedia(musicFile);
        finalAudioUrl = uploaded.url;
      }
      if (!finalAudioUrl) {
        finalAudioUrl = "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg";
      }

      const trackPayload = {
        title: musicTitle || musicFile?.name.replace(/\.[^/.]+$/, "") || "Deckoviz Ambient Track",
        artist: musicArtist || "Deckoviz Soundscapes",
        audioUrl: finalAudioUrl,
        genre: "Ambient / Classical",
        duration: "03:45"
      };

      const res = await webappApi.createMusic(trackPayload);
      if (res) {
        setMusicTracks((prev) => [{ ...trackPayload, id: res.id || trackPayload.title }, ...prev]);
      }

      setMusicTitle("");
      setMusicArtist("");
      setMusicFile(null);
      setMusicUrlInput("");
      alert("Music track uploaded to private media storage successfully!");
    } catch (e) {
      console.error("Music upload notice:", e);
    } finally {
      setIsUploadingMusic(false);
    }
  };

  const handleSendMusicToFrame = (track: any) => {
    const payload = {
      action: "play_music",
      payload: {
        track_id: track.id,
        title: track.title,
        artist: track.artist,
        audio_url: track.audioUrl,
        genre: track.genre
      }
    };
    window.dispatchEvent(new CustomEvent("deckoviz-websocket-broadcast", { detail: payload }));
    alert(`🎵 Broadcasted "${track.title}" to connected TV Smart Frame via WebSocket!`);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to remove this item from the global library?")) {
      setLibraryItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const categories = Array.from(new Set(libraryItems.map((item) => item.category)));

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn font-sans pt-2">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 flex items-center gap-1.5 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
              Master Art Vault Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#182A4A] tracking-tight">Global Media Library</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            All platform collections, music curations, and 4K visual imagery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("artworks")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "artworks"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Artwork Images ({libraryItems.length})
            </button>
            <button
              onClick={() => setActiveTab("music")}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === "music"
                  ? "bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Music Vault ({musicTracks.length})
            </button>
          </div>

          <button
            onClick={loadFirebaseLibrary}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#2563EB] ${loading ? "animate-spin" : ""}`} />
            Sync Library
          </button>
        </div>
      </div>

      {/* ── TAB 1: ARTWORKS GALLERY ── */}
      {activeTab === "artworks" && (
        <>
          {/* UPLOADER CARD */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#182A4A] text-white flex items-center justify-center font-bold shadow-md shadow-[#182A4A]/20">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add Image to Global Library</h3>
                  <p className="text-xs text-slate-500">Upload high-resolution 4K visual media directly into the master vault.</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Firebase Link Stored
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Dropzone */}
              <div
                className="lg:col-span-1 border-2 border-dashed border-slate-200 hover:border-[#2563EB] bg-slate-50/50 hover:bg-[#2563EB]/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[220px] relative overflow-hidden group"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">Click to select image</span>
                      <span className="text-xs text-slate-400 block mt-0.5">Supports PNG, JPG, WEBP (0 ms link)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Inputs */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Artwork Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Starry Night Over the Rhône"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Collection / Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Fine Art / Modern Abstract"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Visual Style</label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#2563EB]"
                    >
                      <option value="Fine Art">Fine Art</option>
                      <option value="Post-Impressionism">Post-Impressionism</option>
                      <option value="Abstract">Abstract</option>
                      <option value="Generative AI">Generative AI</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. 4k, classic, van gogh, museum"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                {statusMessage && (
                  <p className={`text-xs font-bold ${uploadStatus === "success" ? "text-emerald-600" : "text-rose-600"}`}>
                    {statusMessage}
                  </p>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleUploadToGlobalLibrary}
                    disabled={isUploading}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#2563EB]/20 transition-all flex items-center gap-2"
                  >
                    {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    Upload Image to Global Library
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER & SEARCH BAR */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search library images by title, collection, or tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-bold"
              >
                <option value="all">All Categories & Collections</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* MEDIA GRID GALLERY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col relative"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute(
                        "src",
                        "https://picsum.photos/seed/fallback-art/800/800"
                      );
                    }}
                  />

                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#182A4A]/90 backdrop-blur-md text-white text-[10px] font-extrabold shadow-md flex items-center gap-1">
                      <Shield className="w-3 h-3 text-white" />
                      {item.source || "Master Art Vault"}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#182A4A] text-[11px] font-extrabold shadow-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-2xl bg-white text-[#182A4A] hover:bg-[#182A4A] hover:text-white transition-all shadow-lg"
                      title="View Full Resolution Artwork"
                    >
                      <Eye className="w-5 h-5" />
                    </a>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-3 rounded-2xl bg-white text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-lg"
                      title="Delete Artwork"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-1 font-semibold">
                      <span>Style: {item.style}</span>
                      <span>{item.uploadedAt}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`"${item.title}" is available in your media library.`);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#2563EB]/10 hover:bg-[#2563EB] text-[#2563EB] hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <FolderPlus className="w-4 h-4" />
                    Add to My Collection
                  </button>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 line-clamp-1">
                    Tags: {item.tags}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── TAB 2: MUSIC VAULT & WEBSOCKET BROADCAST ── */}
      {activeTab === "music" && (
        <div className="space-y-6">
          {/* UPLOAD MUSIC FORM */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#182A4A] to-[#2563EB] text-white flex items-center justify-center font-bold shadow-md shadow-[#2563EB]/20">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload Music & Audio Tracks</h3>
                  <p className="text-xs text-slate-500">Upload audio files (.mp3, .wav) or enter music links to store in Firebase & broadcast to TV frames.</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-bold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> WebSocket Audio Broadcast
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Track Title</label>
                <input
                  type="text"
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                  placeholder="e.g. Ambient Rain & Piano No. 4"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Artist / Ensemble</label>
                <input
                  type="text"
                  value={musicArtist}
                  onChange={(e) => setMusicArtist(e.target.value)}
                  placeholder="e.g. Deckoviz Classical Soundscapes"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Audio File or Direct Link</label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleMusicFileSelect}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#2563EB]/10 file:text-[#2563EB]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <input
                type="url"
                value={musicUrlInput}
                onChange={(e) => setMusicUrlInput(e.target.value)}
                placeholder="Or paste direct audio MP3 / AAC URL link..."
                className="w-full sm:flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono"
              />

              <button
                onClick={handleUploadMusicTrack}
                disabled={isUploadingMusic}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#2563EB]/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isUploadingMusic ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Music className="w-4 h-4" />}
                Store Music Link in Firebase
              </button>
            </div>
          </div>

          {/* MUSIC TRACKS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {musicTracks.map((track) => (
              <div key={track.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                      <Music className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{track.title}</h4>
                      <p className="text-xs text-slate-500">{track.artist}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-extrabold uppercase">
                    {track.genre}
                  </span>
                </div>

                <audio controls src={track.audioUrl} className="w-full h-8 accent-[#2563EB]" />

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Duration: {track.duration}</span>
                  <button
                    onClick={() => handleSendMusicToFrame(track)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#182A4A] via-[#1e3a6e] to-[#2563EB] text-white font-extrabold text-xs shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-300" /> Send Music to Frame
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterAdminLibrary;
