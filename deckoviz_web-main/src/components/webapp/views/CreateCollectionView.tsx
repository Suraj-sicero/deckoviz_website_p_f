import { CalendarDays, Camera, Check, Image as ImageIcon, Loader2, Music, RefreshCw, Search, Sparkles, Trash2, Upload, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { webappApi, getVizzyGenerativeImages } from "../../../lib/webappApi";

interface CollectionImage {
  id: string;
  url?: string;
  title: string;
  displayHours: string;
  displaySeconds: string;
  metaNotes: string;
}

// Fallback images if no user media exists
const FALLBACK_IMAGES = [
  "/images/webapp/figma/spiral-ocean.jpg",
  "/images/webapp/figma/solo-rafting-card.jpg",
  "/images/webapp/figma/violin-art.jpg",
  "/images/webapp/figma/abstract-wave-wide.jpg",
  "/images/webapp/figma/interior-tech.jpg",
  "/images/webapp/figma/aurora-lake.jpg",
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
  const [title, setTitle] = useState("Summer Memories 2025");
  const [description, setDescription] = useState(
    "A celebration of warmth, freedom, and vibrant energy, the Summer Collection captures the essence of sun-drenched days and golden horizons."
  );
  const [displayMinutes, setDisplayMinutes] = useState(30);
  const [displayHours, setDisplayHours] = useState(1);
  const [musicUrl, setMusicUrl] = useState("https://music.youtube.com/watch?v=UceaB4DOjpo");
  const [tags, setTags] = useState<string[]>(["Minimalistic", "Portrait"]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<CollectionImage[]>([
    { id: "1", title: "Golden Sunset", displayHours: "00:00:00", displaySeconds: "00:30", metaNotes: "Warm tones" },
  ]);
  const [saving, setSaving] = useState(false);
  const musicFileRef = useRef<HTMLInputElement>(null);

  // --- Media gallery state ---
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [selectedMediaIds, setSelectedMediaIds] = useState<Set<string>>(new Set());
  const [activeMediaTab, setActiveMediaTab] = useState<"all" | "generated" | "uploaded">("all");

  // Load user's real media from Firebase + VGC
  const loadUserMedia = async () => {
    setLoadingMedia(true);
    const allMedia: MediaItem[] = [];
    const seenUrls = new Set<string>();

    // 1. Fetch Vizzy Generative Canvas images
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

    // 2. Fetch home media from Firebase
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

    // 3. Add fallback static images if nothing loaded
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
    if (activeMediaTab === "all") return true;
    if (activeMediaTab === "generated") return m.source === "generated";
    if (activeMediaTab === "uploaded") return m.source === "uploaded" || m.source === "static";
    return true;
  });

  const toggleMediaSelect = (item: MediaItem) => {
    setSelectedMediaIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
        // Remove from images list
        setImages((imgs) => imgs.filter((i) => i.id !== item.id));
      } else {
        next.add(item.id);
        // Add to images list
        setImages((imgs) => [
          ...imgs,
          {
            id: item.id,
            url: item.url,
            title: item.title || item.prompt || "Artwork",
            displayHours: "00:00:00",
            displaySeconds: "00:30",
            metaNotes: item.prompt || "",
          },
        ]);
      }
      return next;
    });
  };

  const genCount = mediaItems.filter((m) => m.source === "generated").length;
  const uploadCount = mediaItems.filter((m) => m.source === "uploaded" || m.source === "static").length;

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleMusicFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMusicUrl(file.name);
    }
  };

  const addImage = () => {
    setImages((prev) => [
      ...prev,
      { id: String(Date.now()), title: "", displayHours: "00:00:00", displaySeconds: "00:30", metaNotes: "" },
    ]);
  };

  const updateImage = (idx: number, field: keyof CollectionImage | "url", value: string) => {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, [field]: value } : img)));
  };

  const removeImage = (idx: number) => {
    const img = images[idx];
    setImages((prev) => prev.filter((_, i) => i !== idx));
    if (img) {
      setSelectedMediaIds((prev) => {
        const next = new Set(prev);
        next.delete(img.id);
        return next;
      });
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);

    try {
      await webappApi.createCollection({
        name: title.trim(),
        title: title.trim(),
        description,
        displayMinutes,
        displayHours,
        musicUrl,
        tags,
        images,
        items: images,
      });
      window.dispatchEvent(new CustomEvent("deckoviz-collections-updated"));
      alert("Collection created in Firebase successfully!");
    } catch (err) {
      console.error("[CreateCollection] Failed to save in Firebase:", err);
      alert("Failed to create collection in Firebase.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1090px] px-3 py-9">
      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[27px] font-semibold tracking-[0.02em] ">Collection Media</h1>

      {/* ═══ Media Gallery from Firebase + VGC ═══ */}
      <section className="mb-10 rounded-xl border border-[#e8eaef] bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Your Media Gallery</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Select artworks from your generated &amp; uploaded media to add to this collection</p>
          </div>
          <button
            onClick={loadUserMedia}
            disabled={loadingMedia}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-500 hover:bg-gray-100 transition"
          >
            <RefreshCw size={12} className={loadingMedia ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-5">
          {[
            { key: "all" as const, label: `All (${mediaItems.length})`, icon: ImageIcon },
            { key: "generated" as const, label: `VGC Generated (${genCount})`, icon: Sparkles },
            { key: "uploaded" as const, label: `Uploaded (${uploadCount})`, icon: Upload },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveMediaTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                activeMediaTab === tab.key
                  ? "bg-[#182a4a] text-white shadow-md"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <tab.icon size={12} /> {tab.label}
            </button>
          ))}
        </div>

        {loadingMedia ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={20} className="animate-spin text-blue-500" />
            <span className="ml-3 text-sm text-gray-400">Loading your media from Firebase...</span>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-400">No media found</p>
            <p className="text-xs text-gray-300 mt-1">Generate images in Vizzy Canvas or upload media to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8">
            {filteredMedia.map((item) => {
              const selected = selectedMediaIds.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleMediaSelect(item)}
                  className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                    selected ? "border-[#182a4a] shadow-lg shadow-[#182a4a]/20 ring-2 ring-blue-400" : "border-transparent hover:border-blue-200"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title || ""}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title || "Art")}&background=3f5fe0&color=fff&size=256`;
                    }}
                  />
                  {item.source === "generated" && (
                    <div className="absolute top-1 left-1 bg-purple-600/80 backdrop-blur-sm text-white text-[7px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5">
                      <Sparkles size={7} /> VGC
                    </div>
                  )}
                  {selected && (
                    <div className="absolute inset-0 bg-[#182a4a]/40 flex items-center justify-center">
                      <Check size={18} className="text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {selectedMediaIds.size > 0 && (
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 px-4 py-2.5 flex items-center justify-between">
            <p className="text-xs font-bold text-blue-700">{selectedMediaIds.size} artworks selected from gallery — they'll be added to the collection</p>
          </div>
        )}
      </section>

      <section className="rounded-[4px] px-6 py-7">
        <Field label="Collection Title*">
          <input className="h-[48px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-5 text-[17px] shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[112px] w-full resize-none rounded-[8px] border border-[#e5e7eb] bg-white px-5 py-4 text-[16px] leading-relaxed shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none"
          />
        </Field>
        <div className="mb-8 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-5 text-[16px] font-medium text-black">Time of display</p>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectBox label="Minutes" value={displayMinutes} onChange={setDisplayMinutes} />
            <SelectBox label="Hours" value={displayHours} onChange={setDisplayHours} />
          </div>
        </div>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[19px] font-medium ">Background Music</h2>
        <div className="mb-8 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-4 text-[15px] font-medium text-black">
            Upload Music File <span className="ml-2 text-[11px] text-[#6b7280]">(MP3,WAV)</span>
          </p>
          <div className="mb-6 flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-[4px] bg-[#eeeeef] px-4 py-2 text-[13px] font-medium text-[#3f4148]" onClick={() => musicFileRef.current?.click()}>
              <Music size={17} />
              Choose File
            </button>
            <span className="text-[12px] text-[#555963]">{musicUrl ? "File uploaded" : "No File Chosen"}</span>
            <input ref={musicFileRef} type="file" accept="audio/*" className="hidden" onChange={handleMusicFile} />
          </div>
          <p className="mb-4 text-[15px] font-medium text-black">Or Add Music URL</p>
          <input className="h-[48px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-5 text-[15px] shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none" value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} />
        </div>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[19px] font-medium ">Tags and Labels</h2>
        <div className="mb-10 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-5 text-[15px] font-medium text-black">Collection Tags</p>
          <div className="mb-7 flex gap-4">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-2 rounded-full bg-[#6babee] px-5 py-2 text-[14px] font-medium text-white shadow-md cursor-pointer" onClick={() => removeTag(tag)}>
                {tag}
                <X size={15} className="cursor-pointer" onClick={() => removeTag(tag)} />
              </span>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-[8px] border border-[#e5e7eb]">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7a7f89]" size={20} />
              <input className="h-[54px] w-full pl-14 text-[15px] outline-none" placeholder="Search Tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTag()} />
            </div>
            <button className="w-[130px] bg-[#182a4a] hover:bg-blue-600 transition-colors text-[16px] font-medium text-white" onClick={addTag}>Add Tags</button>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[19px] font-medium ">Collection Images</h2>
          <button className="rounded-[7px] bg-[#182a4a] hover:bg-blue-600 transition-colors px-10 py-3 text-[15px] font-medium text-white shadow-md" onClick={addImage}>Add More+</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {images.map((img, idx) => (
            <CollectionImageCard key={img.id} image={img} index={idx} onUpdate={updateImage} onRemove={removeImage} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button className="rounded-[7px] bg-[#182a4a] hover:bg-blue-600 transition-colors px-12 py-3 text-[15px] font-medium text-white shadow-md disabled:opacity-50" onClick={handleSave} disabled={saving || !title.trim()}>
          {saving ? "Saving..." : "Create Collection"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-7 block">
      <span className="mb-3 block text-[15px] font-medium text-[#555963]">{label}</span>
      {children}
    </label>
  );
}

function SelectBox({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex h-[52px] items-center justify-between rounded-[5px] bg-[#eeeeef] px-4 text-[15px] text-black">
      <span className="flex items-center gap-3">
        <CalendarDays size={18} />
        {label}
      </span>
      <input type="number" min={0} className="w-16 bg-transparent text-right outline-none" value={value} onChange={(e) => onChange(parseInt(e.target.value) || 0)} />
    </div>
  );
}

function CollectionImageCard({ image, index, onUpdate, onRemove }: { image: CollectionImage & { url?: string }; index: number; onUpdate: (idx: number, field: keyof CollectionImage | "url", value: string) => void; onRemove: (idx: number) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onUpdate(index, "url", dataUrl);
        if (!image.title) {
          onUpdate(index, "title", file.name.replace(/\.[^/.]+$/, ""));
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  return (
    <article className="overflow-hidden rounded-[8px] bg-[#eeeeef] border border-gray-200">
      <div className="relative h-[160px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden group">
        {image.url ? (
          <img src={image.url} alt={image.title || "Collection item"} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Camera size={28} className="text-blue-500" />
            <span className="text-xs font-bold text-blue-600">Click to Upload Image</span>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        
        <button
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-500 shadow hover:bg-red-50 transition"
          onClick={() => onRemove(index)}
        >
          <Trash2 size={15} />
        </button>
        
        {image.url && (
          <button
            className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md transition"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Image
          </button>
        )}
      </div>
      <div className="space-y-4 p-4">
        <input className="h-[36px] w-full rounded-[4px] border border-[#b8bbc2] bg-white px-3 text-[14px] outline-none focus:border-blue-500" value={image.title} onChange={(e) => onUpdate(index, "title", e.target.value)} placeholder="Image title" />
        <div className="grid grid-cols-2 gap-4">
          <SmallInput label="Display in Hours" placeholder="HH:MM:SS" value={image.displayHours} onChange={(v) => onUpdate(index, "displayHours", v)} />
          <SmallInput label="Display in Seconds" placeholder="MM:SS" value={image.displaySeconds} onChange={(v) => onUpdate(index, "displaySeconds", v)} />
        </div>
        <label className="block">
          <span className="mb-2 block text-[12px] font-medium text-black">Meta Notes</span>
          <textarea
            className="min-h-[62px] w-full resize-none rounded-[4px] border border-[#b8bbc2] bg-white px-3 py-2 text-[12px] leading-relaxed outline-none focus:border-blue-500"
            value={image.metaNotes}
            onChange={(e) => onUpdate(index, "metaNotes", e.target.value)}
            placeholder="Meta notes for this artwork..."
          />
        </label>
      </div>
    </article>
  );
}

function SmallInput({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <label>
      <span className="mb-2 block text-[12px] font-medium text-black">{label}</span>
      <input className="h-[36px] w-full rounded-[4px] border border-[#b8bbc2] bg-white px-3 text-[12px]" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
