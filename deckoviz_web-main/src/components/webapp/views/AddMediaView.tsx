import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Video, Palette, Music, Eye, Trash2, UploadCloud, Plus, AlertCircle } from "lucide-react";
import { homeApi } from "../../../lib/homeApi";
import { getUserMedia, saveUserMedia, getActiveUserKey, compressImageFile } from "../../../lib/userStorage";

const mediaTypes = [
  { icon: <ImageIcon size={14} />, label: "Images" },
  { icon: <Video size={14} />, label: "Videos" },
  { icon: <Palette size={14} />, label: "Artworks" },
  { icon: <Music size={14} />, label: "Audio" },
];

export default function AddMediaView() {
  const [files, setFiles] = useState<any[]>([]);
  const [hoveredFile, setHoveredFile] = useState<string | number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    const userMedia = getUserMedia();
    setFiles(userMedia);
  };

  useEffect(() => {
    fetchMedia();
    const handleUpdate = () => fetchMedia();
    window.addEventListener("deckoviz-media-updated", handleUpdate);
    window.addEventListener("deckoviz-user-changed", handleUpdate);
    return () => {
      window.removeEventListener("deckoviz-media-updated", handleUpdate);
      window.removeEventListener("deckoviz-user-changed", handleUpdate);
    };
  }, []);

  const handleUpload = async (uploadFiles: FileList | null) => {
    if (!uploadFiles || uploadFiles.length === 0) return;
    setIsUploading(true);
    setErrorMessage(null);

    const activeUser = getActiveUserKey();
    const newItems: any[] = [];

    try {
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i];

        const dataUrl = await compressImageFile(file).catch(() => null);

        if (!dataUrl) {
          throw new Error(`Failed to read file ${file.name}`);
        }

        const mediaType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("audio/")
          ? "music"
          : "other";

        const localMediaItem = {
          id: `media-${Date.now()}-${i}`,
          userId: activeUser,
          url: dataUrl,
          mediaUrl: dataUrl,
          filename: file.name,
          name: file.name,
          size: file.size,
          type: file.type,
          mediaType: mediaType,
          createdAt: new Date().toISOString(),
          isUploaded: true,
        };

        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await Promise.race([
            homeApi.uploadMedia(formData),
            new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
          ]).catch(() => null);

          if (res && (res.url || res.id)) {
            localMediaItem.url = res.url || res.mediaUrl || dataUrl;
            localMediaItem.mediaUrl = res.url || res.mediaUrl || dataUrl;
            if (res.id) localMediaItem.id = res.id;
          }
        } catch {
          /* Fallback gracefully */
        }

        newItems.push(localMediaItem);
      }

      const existing = getUserMedia();
      const nextList = [...newItems, ...existing];
      saveUserMedia(nextList);
      setFiles(nextList);
    } catch (e) {
      console.error("[AddMediaView] Upload error:", e);
      setErrorMessage("Unable to upload media. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = async (id: string | number) => {
    try {
      const nextList = files.filter(f => f.id !== id);
      saveUserMedia(nextList);
      setFiles(nextList);
      await homeApi.deleteMedia(id).catch(() => {});
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6 px-2">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-3xl font-bold mb-1">
            Add Media
          </h1>
          <p className="text-gray-500 text-sm font-medium">Add images, videos, audio or artworks to your media library.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Upload Zone */}
        <div 
          className={`bg-white/95 backdrop-blur-sm rounded-[24px] p-8 shadow-[0_10px_40px_rgb(0,0,0,0.06)] border-2 border-dashed transition-all duration-300 mb-10 ${
            isDragActive 
              ? "border-blue-400 bg-blue-50/50 shadow-blue-500/10" 
              : "border-gray-200 hover:border-blue-300"
          } ${isUploading ? "opacity-50 pointer-events-none cursor-wait" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={(e) => { 
            e.preventDefault(); 
            setIsDragActive(false); 
            handleUpload(e.dataTransfer.files); 
          }}
        >
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
              <UploadCloud size={28} className="text-blue-500" />
            </div>
            
            <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold mb-2">
              {isUploading ? "Uploading files..." : (
                <>
                  Drag and drop files here, or{" "}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
                  >
                    Browse
                  </button>
                </>
              )}
            </h3>
            <p className="text-gray-400 text-sm mb-5">{isUploading ? "Processing..." : "Upload artworks, photos, audio or videos to your library."}</p>
            
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
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>

        {/* Upload Files Grid */}
        {files.length > 0 ? (
          <div className="px-2">
            <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-[#182a4a] to-[#3b82f6] font-serif text-lg font-bold mb-5">
              Your Uploaded Media ({files.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
              {files.map((file) => (
                <div key={file.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredFile(file.id)}
                  onMouseLeave={() => setHoveredFile(null)}
                >
                  {file.mediaType === "video" || file.type?.startsWith('video') ? (
                    <video src={file.url || file.mediaUrl} className="w-full h-full object-cover" />
                  ) : (
                    <img 
                      src={file.url || file.mediaUrl} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(file.filename || file.name || "art")}/800/800`;
                      }}
                    />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-200 ${
                    hoveredFile === file.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <button onClick={() => window.open(file.url || file.mediaUrl, '_blank')} className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-white transition shadow-md">
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(file.id); }}
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
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            No media uploaded yet. Upload files above to build your library.
          </div>
        )}
      </div>
    </div>
  );
}
