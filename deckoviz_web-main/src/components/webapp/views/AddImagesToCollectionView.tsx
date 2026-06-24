import { useState } from "react";
import { Search, Camera } from "lucide-react";

const categories = [
  "Landscape", "Portrait", "Abstract", "Digital Art", "Minimalist", "Nature"
];

const recentSearches = [
  { title: "Abstract", image: "/images/webapp/abstract_landscape.png" },
  { title: "Minmalistic", image: "/images/webapp/minimalistic_night.png" },
  { title: "Nature", image: "/images/webapp/nature_garden.png" },
  { title: "Digital", image: "/images/webapp/digital_plants.png" },
  { title: "Abstract", image: "/images/webapp/abstract_landscape.png" },
  { title: "Minmalistic", image: "/images/webapp/minimalistic_night.png" },
  { title: "Nature", image: "/images/webapp/nature_garden.png" },
  { title: "Digital", image: "/images/webapp/digital_plants.png" },
];

export default function AddImagesToCollectionView() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 px-2">
          <div>
            <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-3xl font-bold  mb-1">Add Images to collection</h1>
            <p className="text-gray-800 text-sm font-medium">Find and add Images to collection</p>
          </div>
          <button className="bg-[#4b7ce6] hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/30 transition-colors">
            + Create Collection
          </button>
        </div>

        {/* Search Panel Box */}
        <div className="/95 rounded-[24px] p-6 border border-white mb-10 relative">
           
           <div className="flex gap-4 mb-6">
             {/* Text Search */}
             <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search Images by keyboard" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-full pl-6 pr-12 py-3 text-sm text-gray-600 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 shadow-sm shadow-gray-100/50"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                   <Search size={16} strokeWidth={2} />
                </button>
             </div>
             
             {/* Image Search Button */}
             <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm shadow-gray-100/50 transition">
                <Camera size={18} className="text-gray-700" strokeWidth={2} /> Search by Images
             </button>
           </div>

           {/* Filter Pills */}
           <div className="flex flex-wrap gap-3">
             {categories.map((cat, i) => (
               <button 
                 key={i} 
                 className="bg-white border border-[#e2e8f0] px-5 py-2 rounded-full text-xs font-bold text-[#1e293b] shadow-[0_2px_8px_rgb(0,0,0,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all"
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        {/* Recent Searches */}
        <div className="px-2">
           <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-5">Recent Searches</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
             {recentSearches.map((item, idx) => (
               <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer">
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent"></div>
                 <div className="absolute bottom-4 inset-x-0 w-full text-center">
                    <span className="text-white text-base font-bold tracking-wide drop-shadow-md">{item.title}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
