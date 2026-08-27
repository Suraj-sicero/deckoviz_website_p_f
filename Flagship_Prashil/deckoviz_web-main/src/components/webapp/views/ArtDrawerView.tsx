import { ChevronDown, Search } from "lucide-react";
import { recentSearches } from "../webappData";

const filterButtons = [
  { label: "Type", active: true },
  { label: "Size", active: false },
  { label: "Date", active: false },
  { label: "Tags", active: false },
];

const popularSearches = [
  "Landscape",
  "Portrait",
  "Abstract",
  "Digital Art",
  "Minimalist",
  "Nature",
  "Space",
];

export default function ArtDrawerView() {
  return (
    <div className="flex w-full justify-center pb-20 pt-8 font-sans">
      <div className="w-full max-w-[1056px]">
        {/* Search Bar */}
        <div className="relative mb-5">
          <input
            type="text"
            placeholder="Search Images & Collection"
            className="h-[48px] w-full rounded-[10px] border border-[#e5e7eb] bg-white px-5 pr-12 text-[15px] font-medium text-[#1f2937] shadow-[0_3px_10px_rgba(15,23,42,0.08)] outline-none transition focus:border-[#b9d8ff] focus:shadow-[0_3px_14px_rgba(45,127,216,0.12)]"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex items-center gap-3">
          {filterButtons.map((filter) => (
            <button
              key={filter.label}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                filter.active
                  ? "bg-[#4657bd] text-white shadow-sm"
                  : "border border-[#e5e7eb] bg-white text-[#374151] hover:bg-gray-50"
              }`}
            >
              {filter.label}
              <ChevronDown size={14} />
            </button>
          ))}
        </div>

        {/* Popular Searches */}
        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-4 text-[18px] font-bold ">
          Popular Searches
        </h2>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {popularSearches.map((tag) => (
            <button
              key={tag}
              className="rounded-full border border-[#e5e7eb] bg-white px-5 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition hover:bg-gray-50 hover:shadow-md"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Recent Searches Grid */}
        <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif mb-5 text-[18px] font-bold ">
          Recent Searches
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recentSearches.map((item, idx) => (
            <div key={idx} className="group relative h-[160px] overflow-hidden rounded-[10px] transition hover:">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="text-[14px] font-semibold text-white">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
