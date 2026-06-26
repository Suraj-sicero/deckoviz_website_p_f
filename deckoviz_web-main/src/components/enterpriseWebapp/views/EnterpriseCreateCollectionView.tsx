import { useState } from "react";
import { Plus, Check, Image as ImageIcon } from "lucide-react";

const availableImages = [
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

export default function CreateCollectionView() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const toggleImage = (index: number) => {
    setSelectedImages(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Create Collection</h1>
        <p className="text-sm text-gray-400 mt-1">Select images from your media library and create a new collection</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left — Form */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-[#e8eaef] bg-white p-6 sticky top-[70px]">
            <h3 className="mb-5 font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Collection Details</h3>
            
            <label className="block mb-4">
              <span className="text-xs font-bold text-gray-500 mb-1.5 block">Collection Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Lobby Art"
                className="h-10 w-full rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] px-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
              />
            </label>

            <label className="block mb-6">
              <span className="text-xs font-bold text-gray-500 mb-1.5 block">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this collection..."
                className="h-24 w-full rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] p-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white resize-none"
              />
            </label>

            <div className="rounded-lg bg-[#182a4a]/10 p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <ImageIcon size={14} className="text-[#182a4a]" />
                <p className="text-xs font-bold text-blue-600">{selectedImages.length} images selected</p>
              </div>
              <p className="text-[10px] text-blue-400">Click images on the right to add or remove</p>
            </div>

            <button className="w-full rounded-xl bg-gradient-to-r from-[#182a4a] to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" disabled={!name || selectedImages.length === 0}>
              <Plus size={14} className="inline mr-1" /> Create Collection
            </button>
          </div>
        </div>

        {/* Right — Image Selector */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-[#e8eaef] bg-white p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-[15px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Media Library</h3>
              <p className="text-[11px] text-gray-400">Click to select images</p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
              {availableImages.map((img, i) => {
                const selected = selectedImages.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleImage(i)}
                    className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${selected ? "border-[#182a4a] shadow-lg shadow-[#182a4a]/20" : "border-transparent hover:border-blue-200"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    {selected && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#182a4a] to-indigo-600 text-white shadow-lg">
                          <Check size={14} />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
