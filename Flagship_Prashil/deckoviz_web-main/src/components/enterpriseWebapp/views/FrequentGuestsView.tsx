import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Star, Users } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

const DEFAULT_GUESTS = [
  { id: "g-1", name: "Alexander Vance", title: "Global Managing Director", room: "Penthouse Suite 804", preferredArtStyle: "Abstract Expressionism & Modernist Blue", photo: "/images/webapp/figma/artist-1.jpg" },
  { id: "g-2", name: "Elena Rostova", title: "Principal Architect", room: "Presidential Gallery 402", preferredArtStyle: "Minimalist Geometry & Spatial Sound", photo: "/images/webapp/figma/artist-2.jpg" },
  { id: "g-3", name: "Marcus Thorne", title: "Senior Partner", room: "Executive Corner 610", preferredArtStyle: "Classical Oil Masterpieces & Ambient Audio", photo: "/images/webapp/figma/artist-3.jpg" }
];

export default function FrequentGuestsView() {
  const [guests, setGuests] = useState<any[]>(DEFAULT_GUESTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enterpriseApi.getGuests().then((res) => {
      if (Array.isArray(res) && res.length > 0) {
        setGuests(res);
      }
    }).catch((err) => {
      console.error("Guests API error", err);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Frequent Guests</h1>
          <p className="text-sm text-gray-400 mt-1">{guests.length} guest profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search guests..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Plus size={16} /> Add Guest
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 animate-pulse" />
          ))}
        </div>
      ) : guests.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No frequent guests yet"
          description="Build out profiles for your VIP guests and recurring visitors to personalize their experience."
          action={
            <button className="flex items-center gap-2 rounded-xl bg-[#182a4a] px-5 py-2.5 text-sm font-bold text-white shadow-md">
              <Plus size={16} /> Create First Profile
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guests.map((guest) => (
            <div key={guest.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img src={guest.photo || "/images/webapp/figma/artist-1.jpg"} alt={guest.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-100" />
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-white">
                    <Star size={10} fill="currentColor" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-gray-800">{guest.name}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{guest.notes}</p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400 opacity-0 group-hover:opacity-100 transition hover:bg-[#182a4a]/10 hover:text-[#182a4a]">
                  <Edit2 size={13} />
                </button>
              </div>
              <div className="rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Preferences</p>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{guest.preferences}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
