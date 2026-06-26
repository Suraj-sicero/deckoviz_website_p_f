import { useState } from "react";
import { X, Eye, Search } from "lucide-react";
import { sampleCollections } from "../enterpriseData";

const placeholderImages = [
  "/images/webapp/figma/spiral-ocean.jpg",
  "/images/webapp/figma/solo-rafting-card.jpg",
  "/images/webapp/figma/violin-art.jpg",
  "/images/webapp/figma/abstract-wave-wide.jpg",
  "/images/webapp/figma/interior-tech.jpg",
  "/images/webapp/figma/aurora-lake.jpg",
  "/images/webapp/figma/boat-pond.jpg",
  "/images/webapp/nature_garden.png",
];

export default function AllCollectionsView() {
  const [selectedCollection, setSelectedCollection] = useState<typeof sampleCollections[0] | null>(null);

  if (selectedCollection) {
    return (
      <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
        <button
          onClick={() => setSelectedCollection(null)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#182a4a] hover:underline"
        >
          ← Back to Collections
        </button>

        {/* Collection Detail Header */}
        <div className="relative mb-8 overflow-hidden rounded-2xl h-[220px]">
          <img src={selectedCollection.cover} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-2xl font-bold text-white mb-1">{selectedCollection.title}</h1>
            <p className="text-sm text-white/70">{selectedCollection.description}</p>
            <p className="text-xs text-white/50 mt-2">{selectedCollection.count} artworks</p>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {placeholderImages.concat(placeholderImages).slice(0, selectedCollection.count > 16 ? 16 : selectedCollection.count).map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-[#e8eaef] transition-all hover:shadow-lg hover:-translate-y-0.5">
              <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition">
                  <Eye size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">All Collections</h1>
          <p className="text-sm text-gray-400 mt-1">Browse and manage your curated art collections</p>
        </div>
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search collections..."
            className="h-9 w-[240px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white"
          />
        </label>
      </div>

      {/* Collections Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sampleCollections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => setSelectedCollection(collection)}
            className="group overflow-hidden rounded-2xl border border-[#e8eaef] bg-white text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-[180px] overflow-hidden relative">
              <img
                src={collection.cover}
                alt={collection.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-gray-600 backdrop-blur-sm shadow-sm">
                {collection.count} items
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-[15px] font-bold text-gray-800 mb-1.5">{collection.title}</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{collection.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
