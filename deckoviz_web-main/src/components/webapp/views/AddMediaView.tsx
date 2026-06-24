import { useRef, useState } from "react";
import { Image as ImageIcon, Video, Palette, Music, Eye, Trash2, UploadCloud, Plus } from "lucide-react";

const mediaTypes = [
  { icon: <ImageIcon size={14} />, label: "Images" },
  { icon: <Video size={14} />, label: "Videos" },
  { icon: <Palette size={14} />, label: "Artworks" },
  { icon: <Music size={14} />, label: "Audio" },
];

const uploadedFiles = [
  { id: 1, image: "/images/webapp/vibrant_face_art.png", name: "face_art_01.png" },
  { id: 2, image: "/images/webapp/city_fire_reflection.png", name: "city_reflection.png" },
  { id: 3, image: "/images/webapp/vibrant_face_art.png", name: "cosmic_portrait.png" },
];

export default function AddMediaView() {
  const [files, setFiles] = useState(uploadedFiles);
  const [hoveredFile, setHoveredFile] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6 px-2">
          <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-3xl font-bold  mb-1">Add Media</h1>
          <p className="text-gray-500 text-sm font-medium">Add images, videos or artworks and many more...</p>
        </div>

        {/* Upload Zone */}
        <div 
          className={`bg-white/95 backdrop-blur-sm rounded-[24px] p-8 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border-2 border-dashed transition-all duration-300 mb-10 ${
            isDragActive 
              ? "border-blue-400 bg-blue-50/50 shadow-blue-500/10" 
              : "border-gray-200 hover:border-blue-300"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragActive(false); }}
        >
          <div className="flex flex-col items-center py-8">
            {/* Upload Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <UploadCloud size={28} className="text-blue-500" />
            </div>
            
            <h3 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-2">
              Drag and drop files here, or{" "}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
              >
                Browse
              </button>
            </h3>
            <p className="text-gray-400 text-sm mb-5">Upload multiple artworks at once. Max file size of 20MB per file.</p>
            
            {/* Media Type Icons */}
            <div className="flex items-center gap-6">
              {mediaTypes.map((type, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <span className="text-gray-400">{type.icon}</span> {type.label}
                </span>
              ))}
            </div>
          </div>

          <input 
            ref={fileInputRef}
            type="file" 
            multiple 
            accept="image/*,video/*,audio/*"
            className="hidden" 
          />
        </div>

        {/* Upload Files Grid */}
        {files.length > 0 && (
          <div className="px-2">
            <h2 className=" bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold  mb-5">Upload Files ({files.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
              {files.map((file) => (
                <div key={file.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredFile(file.id)}
                  onMouseLeave={() => setHoveredFile(null)}
                >
                  <img 
                    src={file.image} 
                    alt={file.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-200 ${
                    hoveredFile === file.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition shadow-md">
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleRemoveFile(file.id)}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-500 transition shadow-md"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Card */}
              <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus size={24} className="text-gray-400 group-hover:text-blue-500 mb-2 transition" />
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition">Add More +</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
