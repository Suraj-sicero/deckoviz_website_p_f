import { useState } from "react";
import { artistAvatars, figmaAssets } from "../webappData";

const collections = [
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[1], artistAvatars[2], figmaAssets.emmaAvatar]
  },
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[0], figmaAssets.emmaAvatar]
  },
  {
    title: "Abstract Expressions",
    sharedWith: 3,
    items: 4,
    images: [
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
      figmaAssets.collectionCollage,
    ],
    avatars: [artistAvatars[3], artistAvatars[1], figmaAssets.emmaAvatar]
  }
];

const individualArtworks = [
  {
    title: "Vibrant Attraction",
    sharedWithUser: "James martini",
    items: 4,
    image: figmaAssets.soloRafting,
    avatar: figmaAssets.surajAvatar
  },
  {
    title: "Vibrant Attraction",
    sharedWithUser: "James martini",
    items: 4,
    image: figmaAssets.soloRafting,
    avatar: figmaAssets.emmaAvatar
  }
];

export default function AIPhotoManagerView() {
  const [activeTab, setActiveTab] = useState("Shared with me");

  return (
    <div className="relative flex w-full justify-center pb-20 pt-9 font-sans">
      <div className="w-full max-w-[1090px]">
        
        {/* Header */}
        <div className="mb-6 px-2">
          <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-2xl font-bold  mb-1">Shared Images & Collections</h1>
          <p className="text-sm text-gray-500 font-medium">View and manage all your shared artworks and collections</p>
        </div>

        {/* Global Tabs */}
        <div className="mb-8 flex w-full overflow-hidden rounded-[5px] border border-gray-100 p-0">
          {["Shared with me", "Shared by me"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === tab 
                  ? "border-[#1a237e] text-[#1a237e]" 
                  : "border-transparent text-gray-500 hover:text-gray-800 bg-gray-50/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Collections Section */}
        <div className="mb-10 px-2">
           <div className="flex items-center justify-between mb-4">
              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold ">Collections</h2>
              <button className="text-[#3b5bdb] text-sm font-bold hover:underline transition">View all</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {collections.map((col, idx) => (
                <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover: transition">
                   {/* Grid 2x2 Image Collage */}
                   <div className="h-[211px] overflow-hidden">
                      <img src={figmaAssets.collectionCollage} alt="" className="h-full w-full object-cover" />
                   </div>
                   <div className="hidden">
                   <div className="grid grid-cols-2 grid-rows-2 h-[180px]">
                      {col.images.map((img, i) => (
                         <div key={i} className="w-full h-full relative">
                            <img src={img} alt="Collection part" className="w-full h-full object-cover" />
                            {i === 3 && (
                               <div className="absolute inset-0 flex items-center justify-center bg-red-600/60 p-4">
                                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center pl-1">
                                     <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                  </div>
                               </div>
                            )}
                         </div>
                      ))}
                   </div>
                   </div>
                   {/* Content */}
                   <div className="p-4 flex flex-col relative h-[100px]">
                      <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{col.title}</h3>
                      <p className="text-sm font-medium text-gray-800">Shared with {col.sharedWith} People</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">- {col.items} items</p>
                      
                      <div className="absolute bottom-4 right-4 flex -space-x-2">
                         {col.avatars.map((av, avIdx) => (
                            <img key={avIdx} src={av} alt="participant" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-blue-500" />
                         ))}
                      </div>
                   </div>
                </div>
             ))}
           </div>
        </div>

        {/* Individual Artwork Section */}
        <div className="px-2">
           <div className="flex items-center justify-between mb-4">
              <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold ">Individual Artwork</h2>
              <button className="text-[#3b5bdb] text-sm font-bold hover:underline transition">View all</button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {individualArtworks.map((art, idx) => (
                <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden hover: transition">
                   <div className="h-[220px] w-full">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="p-4 flex flex-col relative">
                      <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif font-bold  text-[15px] mb-1">{art.title}</h3>
                      <p className="text-sm font-medium text-gray-800">Shared with {art.sharedWithUser}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1 mb-2">- {art.items} items</p>
                      
                      <div className="absolute bottom-4 right-4">
                        <img src={art.avatar} alt="user" className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-2 ring-orange-400" />
                      </div>
                   </div>
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
