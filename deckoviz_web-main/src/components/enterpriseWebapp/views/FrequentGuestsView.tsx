import { Search, Plus, Edit2, Star } from "lucide-react";
import { frequentGuests } from "../enterpriseData";

export default function FrequentGuestsView() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Frequent Guests</h1>
          <p className="text-sm text-gray-400 mt-1">Manage guest profiles and personalization preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search guests..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
          </label>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20">
            <Plus size={16} /> Add Guest
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {frequentGuests.map((guest) => (
          <div key={guest.id} className="group rounded-2xl border border-[#e8eaef] bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img src={guest.photo} alt={guest.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-100" />
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
    </div>
  );
}
