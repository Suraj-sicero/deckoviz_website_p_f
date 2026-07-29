import { useState, useEffect } from "react";
import { Search, BookOpen, Loader2 } from "lucide-react";
import { enterpriseApi } from "../../../lib/enterpriseApi";
import { EmptyState } from "./ui/EmptyState";

export default function ExploreLibraryView() {
  const [library, setLibrary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enterpriseApi.getLibrary().then((res) => {
      if (res && (res.art || res.photos || res.posters)) {
        setLibrary(res);
      } else {
        setLibrary(null);
      }
    }).catch((err) => {
      console.error("Library API error", err);
      setLibrary(null);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[24px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent">Explore Library</h1>
          <p className="text-sm text-gray-400 mt-1">Browse curated art collections, photos, and posters</p>
        </div>
        <label className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Search library..." className="h-9 w-[220px] rounded-lg border border-[#e2e4ea] bg-[#f8f9fb] pl-9 pr-4 text-[12px] outline-none transition focus:border-blue-300 focus:bg-white" />
        </label>
      </div>

      {loading ? (
        <div className="space-y-10">
          {[1, 2, 3].map((cat) => (
            <div key={cat}>
               <div className="mb-4 h-6 w-32 bg-gray-100 rounded animate-pulse" />
               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-50 animate-pulse border border-gray-100" />
                 ))}
               </div>
            </div>
          ))}
        </div>
      ) : library ? (
        <div className="space-y-10">
          {(["art", "photos", "posters"] as const).map((category) => {
            const items = library[category] || [];
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <h2 className="mb-4 font-serif text-[17px] font-bold bg-gradient-to-r from-[#182a4a] to-[#3b82f6] bg-clip-text text-transparent capitalize">{category}</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {items.map((item: any, i: number) => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl border border-[#e8eaef] bg-white transition-all hover:shadow-lg hover:-translate-y-0.5">
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                        <img src={item.cover} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-bold text-gray-800">{item.title}</p>
                        <p className="mt-1 text-[11px] text-gray-400 font-medium">{item.count} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Library unavailable"
          description="We couldn't load the art and media library at this time. Please try refreshing the page."
        />
      )}
    </div>
  );
}
