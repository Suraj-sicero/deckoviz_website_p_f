import { Cloud, Plus, SlidersHorizontal } from "lucide-react";
import { figmaAssets } from "../webappData";

const collections = [
  { title: "Abstaract", count: "42 Images", image: figmaAssets.vibrantFace },
  { title: "Portrait", count: "42 Images", image: figmaAssets.cityFire },
  { title: "Abstaract", count: "42 Images", image: figmaAssets.vibrantFace },
];

const photos = [
  figmaAssets.vibrantFace,
  figmaAssets.cityFire,
  figmaAssets.vibrantFace,
  figmaAssets.cityFire,
  figmaAssets.vibrantFace,
  figmaAssets.cityFire,
  figmaAssets.vibrantFace,
  figmaAssets.cityFire,
];

export default function AIPhotoManagerHomeView() {
  return (
    <div className="mx-auto w-full max-w-[1090px] px-3 py-9">
      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[26px] font-semibold tracking-[0.02em] ">AI Photo Manger</h1>

      <section className="mb-9 rounded-[9px] border border-[#e7e7ea] p-7">
        <div className="flex items-center gap-5">
          <input
            type="search"
            placeholder="Search your photos..."
            className="h-[48px] flex-1 rounded-[8px] border border-[#dedfe3] bg-white px-5 text-[14px] shadow-[0_4px_10px_rgba(15,23,42,0.12)] outline-none"
          />
          <button className="flex h-[48px] w-[70px] items-center justify-center rounded-[8px] border border-[#dedfe3] bg-white text-[#2f7bd0] shadow-[0_4px_10px_rgba(15,23,42,0.12)]">
            <SlidersHorizontal size={22} />
          </button>
        </div>
        <button className="mt-5 rounded-[7px] bg-[#2f7bd0] px-6 py-3 text-[14px] font-medium text-white shadow-[0_5px_12px_rgba(47,123,208,0.35)]">
          Create New+
        </button>
      </section>

      <SectionTitle title="Recent Collections" />
      <div className="mb-9 grid grid-cols-1 gap-6 md:grid-cols-4">
        {collections.map((collection, index) => (
          <div key={`${collection.title}-${index}`} className="relative h-[187px] overflow-hidden rounded-[7px]">
            <img src={collection.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[22px] font-bold">{collection.title}</h2>
              <p className="text-[15px] font-semibold">{collection.count}</p>
            </div>
          </div>
        ))}
        <button className="flex h-[187px] flex-col items-center justify-center rounded-[7px] border border-[#cfcfd3] bg-[#f7f7f8] text-[#555963]">
          <span className="mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#9dccff] text-white shadow-md">
            <Plus size={28} />
          </span>
          <span className="text-[16px] font-semibold">New Collections</span>
        </button>
      </div>

      <SectionTitle title="Recent Photos" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {photos.map((photo, index) => (
          <img key={`${photo}-${index}`} src={photo} alt="" className="h-[187px] w-full rounded-[7px] object-cover" />
        ))}
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-[710px] items-center justify-between rounded-[16px] border border-[#dedfe3] px-8 py-4">
        <div className="flex items-center gap-4 text-[14px]">
          <Cloud className="text-[#2f7bd0]" size={34} fill="currentColor" />
          <span>Storage: 32.5 Gb / 100 Gb</span>
        </div>
        <button className="rounded-[7px] bg-[#b8d9fb] px-7 py-3 text-[14px] font-medium text-[#1f2937]">Upload Photos</button>
        <button className="rounded-[7px] bg-[#b8d9fb] px-7 py-3 text-[14px] font-medium text-[#1f2937]">Clean Storage</button>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[21px] font-semibold ">{title}</h2>;
}
