import { CalendarDays, Music, Search, Trash2, X } from "lucide-react";
import type React from "react";
import { figmaAssets } from "../webappData";

const tags = ["Minimalistic", "Portrait"];

export default function CreateCollectionView() {
  return (
    <div className="mx-auto w-full max-w-[1090px] px-3 py-9">
      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[27px] font-semibold tracking-[0.02em] ">Collection Media</h1>

      <section className="rounded-[4px] px-6 py-7">
        <Field label="Collection Title*">
          <input className="h-[48px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-5 text-[17px] shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none" defaultValue="Summer Memories 2025" />
        </Field>

        <Field label="Description">
          <textarea
            className="min-h-[112px] w-full resize-none rounded-[8px] border border-[#e5e7eb] bg-white px-5 py-4 text-[16px] leading-relaxed shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none"
            defaultValue="A celebration of warmth, freedom, and vibrant energy, the Summer Collection captures the essence of sun-drenched days and golden horizons. Each piece is infused with the lightness of the season--bold colors, flowing forms, and textures that mimic the breeze, sand, and sea."
          />
        </Field>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 mt-7 text-[19px] font-medium ">Collection Display Period</h2>
        <div className="mb-8 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-5 text-[16px] font-medium text-black">Time of display</p>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectBox label="Minutes" />
            <SelectBox label="Hours" />
          </div>
        </div>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[19px] font-medium ">Background Music</h2>
        <div className="mb-8 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-4 text-[15px] font-medium text-black">
            Upload Music File <span className="ml-2 text-[11px] text-[#6b7280]">(MP3,WAV)</span>
          </p>
          <div className="mb-6 flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-[4px] bg-[#eeeeef] px-4 py-2 text-[13px] font-medium text-[#3f4148]">
              <Music size={17} />
              Choose File
            </button>
            <span className="text-[12px] text-[#555963]">No File Chosen</span>
          </div>
          <p className="mb-4 text-[15px] font-medium text-black">Or Add Music URL</p>
          <input className="h-[48px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-5 text-[15px] shadow-[0_3px_10px_rgba(15,23,42,0.12)] outline-none" defaultValue="https://music.youtube.com/watch?v=UceaB4DOjpo" />
        </div>

        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[19px] font-medium ">Tags and Labels</h2>
        <div className="mb-10 rounded-[14px] border border-[#e5e7eb] p-5">
          <p className="mb-5 text-[15px] font-medium text-black">Collection Tags</p>
          <div className="mb-7 flex gap-4">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-2 rounded-full bg-[#6babee] px-5 py-2 text-[14px] font-medium text-white shadow-md">
                {tag}
                <X size={15} />
              </span>
            ))}
          </div>
          <div className="flex overflow-hidden rounded-[8px] border border-[#e5e7eb]">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7a7f89]" size={20} />
              <input className="h-[54px] w-full pl-14 text-[15px] outline-none" placeholder="Search Tags" />
            </div>
            <button className="w-[130px] bg-[#182a4a] hover:bg-blue-600 transition-colors text-[16px] font-medium text-white">Add Tags</button>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-[19px] font-medium ">Collection Images</h2>
          <button className="rounded-[7px] bg-[#182a4a] hover:bg-blue-600 transition-colors px-10 py-3 text-[15px] font-medium text-white shadow-md">Add More+</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((item) => (
            <CollectionImageCard key={item} />
          ))}
        </div>
      </section>
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

function SelectBox({ label }: { label: string }) {
  return (
    <div className="flex h-[52px] items-center justify-between rounded-[5px] bg-[#eeeeef] px-4 text-[15px] text-black">
      <span className="flex items-center gap-3">
        <CalendarDays size={18} />
        {label}
      </span>
      <span>v</span>
    </div>
  );
}

function CollectionImageCard() {
  return (
    <article className="overflow-hidden rounded-[8px] bg-[#eeeeef]">
      <div className="relative h-[157px]">
        <img src={figmaAssets.cityFire} alt="" className="h-full w-full object-cover" />
        <button className="absolute right-3 top-3 flex h-[27px] w-[27px] items-center justify-center rounded-full bg-white text-[#ef4444] shadow">
          <Trash2 size={17} />
        </button>
      </div>
      <div className="space-y-4 p-4">
        <input className="h-[36px] w-full rounded-[4px] border border-[#b8bbc2] bg-white px-3 text-[14px]" defaultValue="Sunset at the beach" />
        <div className="grid grid-cols-2 gap-4">
          <SmallInput label="Display in Hours" placeholder="HH:MM:SS" />
          <SmallInput label="Display in Seconds" placeholder="MM:SS" />
        </div>
        <label className="block">
          <span className="mb-2 block text-[12px] font-medium text-black">Meta Notes</span>
          <textarea
            className="min-h-[62px] w-full resize-none rounded-[4px] border border-[#b8bbc2] bg-white px-3 py-2 text-[12px] leading-relaxed"
            defaultValue="meta notes template for an artwork, ideal for websites, digital galleries, NFTs, portfolios,"
          />
        </label>
      </div>
    </article>
  );
}

function SmallInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label>
      <span className="mb-2 block text-[12px] font-medium text-black">{label}</span>
      <input className="h-[36px] w-full rounded-[4px] border border-[#b8bbc2] bg-white px-3 text-[12px]" placeholder={placeholder} />
    </label>
  );
}
