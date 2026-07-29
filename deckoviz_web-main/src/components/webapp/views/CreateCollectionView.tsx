import { useState, useRef } from "react";
import { CalendarDays, Music, Search, Trash2, X, Loader2 } from "lucide-react";
import type React from "react";
import { useAuth } from "../../../context/AuthContext";
import { webappApi } from "../../../lib/webappApi";

interface CollectionImage {
  id: string;
  itemId: string;
  itemType: string;
  title: string;
  displayHours: string;
  displaySeconds: string;
  metaNotes: string;
}

export default function CreateCollectionView() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displayHours, setDisplayHours] = useState(0);
  const [musicUrl, setMusicUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<CollectionImage[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const musicFileRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const addImage = () => {
    setImages([...images, {
      id: crypto.randomUUID(),
      itemId: crypto.randomUUID(),
      itemType: "image",
      title: "",
      displayHours: "",
      displaySeconds: "",
      metaNotes: "",
    }]);
  };

  const updateImage = (idx: number, field: keyof CollectionImage, value: string) => {
    setImages(images.map((img, i) => i === idx ? { ...img, [field]: value } : img));
  };

  const removeImage = (idx: number) => setImages(images.filter((_, i) => i !== idx));

  const handleSave = async () => {
    if (!token || !title.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        name: title,
        description,
        musicUrl,
        tags,
        displayMinutes,
        displayHours,
        images: images.map(img => ({
          itemId: img.itemId,
          itemType: img.itemType,
          title: img.title,
          displayHours: img.displayHours,
          displaySeconds: img.displaySeconds,
          metaNotes: img.metaNotes,
        })),
      };
      await webappApi.createCollection(payload, token);
      setMessage("Collection created successfully!");
      setTitle(""); setDescription(""); setMusicUrl(""); setTags([]); setImages([]);
      setDisplayMinutes(0); setDisplayHours(0);
    } catch {
      setMessage("Failed to create collection");
    }
    setSaving(false);
  };

  const handleMusicFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    try {
      const result = await webappApi.uploadMedia(file, token);
      setMusicUrl(result.url);
    } catch { /* ignore */ }
    if (musicFileRef.current) musicFileRef.current.value = "";
  };

  return (
    <div className="mx-auto w-full max-w-[1090px] px-3 py-9">
      <div className="flex items-center justify-between mb-5">
        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[27px] font-semibold tracking-[0.02em] ">Collection Media</h1>
        <button 
          onClick={handleSave}
          disabled={saving || !title.trim()}
          className="flex items-center gap-2 rounded-[7px] bg-[#182a4a] hover:bg-blue-600 transition-colors px-8 py-3 text-[15px] font-medium text-white shadow-md disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : null}
          {saving ? "Saving..." : "Create Collection"}
        </button>
      </div>

      {message && <div className={`mb-4 text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>{message}</div>}

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
          <input className="h-[48px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-5 text-[15px] shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none" value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="https://..." />
        </div>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[19px] font-medium ">Tags and Labels</h2>
        <div className="mb-10 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-5 text-[15px] font-medium text-black">Collection Tags</p>
          <div className="mb-7 flex gap-4 flex-wrap">
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
              <input className="h-[54px] w-full pl-14 text-[15px] outline-none" placeholder="Search Tags or type and press Enter" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} />
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

function CollectionImageCard({ image, index, onUpdate, onRemove }: { image: CollectionImage; index: number; onUpdate: (idx: number, field: keyof CollectionImage, value: string) => void; onRemove: (idx: number) => void }) {
  return (
    <article className="overflow-hidden rounded-[8px] bg-[#eeeeef]">
      <div className="relative h-[157px] bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        <span className="text-sm text-gray-400">Image {index + 1}</span>
        <button className="absolute right-3 top-3 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white text-[#ef4444] shadow" onClick={() => onRemove(index)}>
          <Trash2 size={17} />
        </button>
      </div>
      <div className="space-y-4 p-4">
        <input className="h-[36px] w-full rounded-[4px] border border-[#b8bbc2] bg-white px-3 text-[14px]" value={image.title} onChange={(e) => onUpdate(index, "title", e.target.value)} placeholder="Image title" />
        <div className="grid grid-cols-2 gap-4">
          <SmallInput label="Display in Hours" placeholder="HH:MM:SS" value={image.displayHours} onChange={(v) => onUpdate(index, "displayHours", v)} />
          <SmallInput label="Display in Seconds" placeholder="MM:SS" value={image.displaySeconds} onChange={(v) => onUpdate(index, "displaySeconds", v)} />
        </div>
        <label className="block">
          <span className="mb-2 block text-[12px] font-medium text-black">Meta Notes</span>
          <textarea
            className="min-h-[62px] w-full resize-none rounded-[4px] border border-[#b8bbc2] bg-white px-3 py-2 text-[12px] leading-relaxed"
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
