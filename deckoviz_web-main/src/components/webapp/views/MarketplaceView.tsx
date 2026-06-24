import { Heart } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { artworkCard, figmaAssets, topArtists } from "../webappData";

const filterTabs = ["Filters", "Price", "Medium", "Style", "More..."];

type MarketplaceMode = "home" | "artists" | "grid";

export default function MarketplaceView({ mode = "home" }: { mode?: MarketplaceMode }) {
  const artistGrid = Array.from({ length: mode === "artists" ? 40 : 10 }, (_, index) => {
    return topArtists[index % topArtists.length];
  });

  if (mode === "artists") {
    return (
      <PageShell>
        <MarketplaceHeader />
        <section className="rounded-[5px] px-9 py-8">
          <SectionTitle title="Top Artist & Trending Artist" />
          <div className="grid grid-cols-5 gap-x-7 gap-y-8 sm:grid-cols-6 lg:grid-cols-10">
            {artistGrid.map((artist, index) => (
              <ArtistBubble key={`${artist.name}-${index}`} artist={artist} />
            ))}
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <MarketplaceHeader />
      <section className="rounded-[5px] px-9 py-6">
        <SectionTitle title="Trending Artworks and artworks for you" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArtworkCard key={`trending-${index}`} />
          ))}
        </div>

        <SectionTitle title="Artworks for you" className="mt-7" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArtworkCard key={`for-you-${index}`} />
          ))}
        </div>

        <SectionTitle title="Top Artworks" className="mt-8" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WideArtwork image={figmaAssets.violinArt} />
          <WideArtwork image={figmaAssets.abstractWaveWide} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[figmaAssets.interiorTech, figmaAssets.auroraLake, figmaAssets.interiorTech, figmaAssets.auroraLake].map(
            (image, index) => (
              <SmallArtwork key={`${image}-${index}`} image={image} />
            ),
          )}
        </div>

        <SectionTitle title="Top Artist & Trending Artist" className="mt-10" />
        <div className="grid grid-cols-5 gap-x-5 gap-y-5 lg:grid-cols-10">
          {artistGrid.map((artist, index) => (
            <ArtistBubble key={`${artist.name}-${index}`} artist={artist} compact />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1090px] px-3 py-9">{children}</div>;
}

function MarketplaceHeader() {
  const [activeFilter, setActiveFilter] = useState("Filters");

  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[25px] font-semibold tracking-[0.01em] ">Marketplace</h1>
      <div className="flex items-center overflow-hidden rounded-[8px] bg-[#e8f0fe]">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`h-[38px] min-w-[100px] px-5 text-[14px] font-semibold leading-none transition-all duration-200 ${
              activeFilter === tab
                ? "text-white shadow-[0_2px_10px_rgba(37,99,235,0.35)]"
                : "text-[#4b5563] hover:bg-white/40 hover:text-[#1d4ed8]"
            }`}
            style={
              activeFilter === tab
                ? { background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)" }
                : undefined
            }
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`}>
      <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[19px] font-medium ">{title}</h2>
      <button className="text-[15px] font-medium text-[#2673bd]">see all</button>
    </div>
  );
}

function ArtworkCard() {
  return (
    <article className="overflow-hidden rounded-[7px] ring-1 ring-[#ded9f8]">
      <img src={artworkCard.image} alt={artworkCard.title} className="h-[193px] w-full object-cover" />
      <div className="px-4 pb-3 pt-3">
        <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-2 text-[15px] font-bold ">{artworkCard.title}</h3>
        <p className="mb-3 max-w-[245px] text-[10px] font-medium leading-[1.45] text-[#686b73]">
          {artworkCard.description}
        </p>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <img src={artworkCard.avatar} alt="" className="h-[22px] w-[22px] rounded-full object-cover" />
            <div>
              <p className="text-[8px] text-[#8b8d93]">Artist</p>
              <p className="text-[9px] font-bold text-[#24272d]">{artworkCard.artist}</p>
            </div>
          </div>
          <p className="text-[12px] font-bold text-black">${artworkCard.price}</p>
        </div>
      </div>
    </article>
  );
}

function WideArtwork({ image }: { image: string }) {
  return (
    <div className="group relative h-[213px] overflow-hidden rounded-[7px] bg-[#e5e7eb]">
      <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      <button className="absolute right-5 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#ffffff99] text-[#ef4462] shadow">
        <Heart size={15} fill="currentColor" />
      </button>
    </div>
  );
}

function SmallArtwork({ image }: { image: string }) {
  return (
    <div className="group relative h-[170px] overflow-hidden rounded-[7px] bg-[#e5e7eb]">
      <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      <button className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffffffb8] text-[#ef4462] shadow">
        <Heart size={13} fill="currentColor" />
      </button>
    </div>
  );
}

function ArtistBubble({
  artist,
  compact = false,
}: {
  artist: (typeof topArtists)[number];
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <img
        src={artist.avatar}
        alt={artist.name}
        className={`${compact ? "h-[75px] w-[75px]" : "h-[88px] w-[88px]"} rounded-full object-cover`}
      />
      <span className="max-w-full truncate text-center text-[15px] font-medium text-black">{artist.name}</span>
    </div>
  );
}
