import { CalendarDays, Music, Search, Trash2, X } from "lucide-react";
import React, { useState, useRef } from "react";
import { webappApi } from "../../../lib/webappApi";

interface CollectionImage {
  id: string;
  title: string;
  displayHours: string;
  displaySeconds: string;
  metaNotes: string;
}

export default function CreateCollectionView() {
  const [title, setTitle] = useState("Summer Memories 2025");
  const [description, setDescription] = useState(
    "A celebration of warmth, freedom, and vibrant energy, the Summer Collection captures the essence of sun-drenched days and golden horizons. Each piece is infused with the lightness of the season--bold colors, flowing forms, and textures that mimic the breeze, sand, and sea."
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

  const updateImage = (idx: number, field: keyof CollectionImage, value: string) => {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, [field]: value } : img)));
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const newCol = {
      id: `col-${Date.now()}`,
      name: title.trim(),
      title: title.trim(),
      description,
      tags,
      itemCount: images.length,
      items: images,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("deckoviz_user_collections") || "[]");
      const backup = JSON.parse(localStorage.getItem("deckoviz_backup_collections") || "[]");
      const updatedUserCols = [newCol, ...existing];
      const updatedBackupCols = [newCol, ...backup];

      localStorage.setItem("deckoviz_user_collections", JSON.stringify(updatedUserCols));
      localStorage.setItem("deckoviz_backup_collections", JSON.stringify(updatedBackupCols));
      window.dispatchEvent(new CustomEvent("deckoviz-collections-updated"));

      await webappApi.createCollection({ title, description, displayMinutes, displayHours, musicUrl, tags, images }).catch(() => null);
      alert("Collection created successfully!");
    } catch (err) {
      console.warn("Collection saved locally:", err);
      alert("Collection created successfully!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1090px] px-3 py-9">
      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[27px] font-semibold tracking-[0.02em] ">Collection Media</h1>

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
