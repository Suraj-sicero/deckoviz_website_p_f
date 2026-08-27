import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Play,
  Volume2,
  Download,
  Loader2,
  Music,
  Mic,
  Image as ImageIcon
} from "lucide-react";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

interface ImageMontageCreatorProps {
  onClose: () => void;
  backendUrl: string;
  token: string;
}

export const ImageMontageCreator: React.FC<ImageMontageCreatorProps> = ({ onClose, backendUrl, token }) => {
  // Montage Configuration
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  const [transitionDuration, setTransitionDuration] = useState(5);
  const [transitionEffect, setTransitionEffect] = useState("fade-black");
  
  // Audio Config
  const [narrationFile, setNarrationFile] = useState<string | null>(null);
  const [narrationName, setNarrationName] = useState<string | null>(null);
  const [isUploadingNarration, setIsUploadingNarration] = useState(false);
  
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string | null>(null);
  const [isUploadingMusic, setIsUploadingMusic] = useState(false);

  const [narrationVolume, setNarrationVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(30);

  // Rendering State
  const [isRendering, setIsRendering] = useState(false);
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  // Upload image handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !token) return;

    setIsUploadingImage(true);
    
    // Upload files sequentially or in parallel
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${backendUrl}/api/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
        if (res.ok) {
          const data = await res.json();
          setImages(prev => [
            ...prev,
            {
              id: `img-${Date.now()}-${Math.random().toString(36).substring(5)}`,
              url: data.image.url,
              name: file.name
            }
          ]);
        }
      } catch (err) {
        console.error("Failed to upload image", err);
      }
    }
    
    setIsUploadingImage(false);
  };

  // Upload Audio tracks
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "narration" | "music") => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    if (type === "narration") setIsUploadingNarration(true);
    else setIsUploadingMusic(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (type === "narration") {
          setNarrationFile(data.image.url);
          setNarrationName(file.name);
        } else {
          setMusicFile(data.image.url);
          setMusicName(file.name);
        }
      }
    } catch (err) {
      console.error(`Failed to upload ${type}`, err);
    } finally {
      if (type === "narration") setIsUploadingNarration(false);
      else setIsUploadingMusic(false);
    }
  };

  // Timeline operations
  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === images.length - 1) return;

    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setImages(updated);
  };
  // Trigger montage render
  const handleRenderMontage = async () => {
    if (images.length === 0 || !token) return;
    setIsRendering(true);
    setOutputVideo(null);

    try {
      const res = await fetch(`${backendUrl}/api/vizzy-studio/render-montage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          images: images.map(img => img.url),
          transitionDuration,
          transitionEffect,
          narration: narrationFile,
          music: musicFile,
          narrationVolume,
          musicVolume
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setOutputVideo(data.videoUrl);
        }
      }
    } catch (err) {
      console.error("Rendering montage video failed", err);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8 font-sans">
      
      {/* HEADER ROW */}
      <div className="lg:col-span-12 flex items-center justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl hover:bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-100">Image Montage Video Creator</h2>
            <p className="text-xs text-slate-400">Compile multiple custom images into a beautiful video sequence</p>
          </div>
        </div>
      </div>

      {/* LEFT COLUMN: Uploads & Timeline (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-fuchsia-400" />
              Upload Images Timeline
            </h3>
            <span className="text-[10px] text-slate-500 font-bold">{images.length} Images Uploaded</span>
          </div>

          {/* Upload Button */}
          <div className="relative border-2 border-dashed border-white/10 hover:border-purple-500/30 rounded-2xl p-6 text-center cursor-pointer transition-all bg-white/5 flex flex-col items-center justify-center min-h-[120px]">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploadingImage}
            />
            {isUploadingImage ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-fuchsia-400 animate-spin" />
                <span className="text-xs text-slate-400 font-semibold">Uploading & Syncing Media...</span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-300">Click to upload multiple images</span>
                <span className="text-[10px] text-slate-500">Arrange images in sequence on upload</span>
              </>
            )}
          </div>

          {/* Timeline list */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {images.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-white/5 rounded-2xl text-slate-500 text-xs">
                No images added yet. Upload files above to build your video timeline.
              </div>
            ) : (
              images.map((img, idx) => (
                <div
                  key={img.id}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group"
                >
                  <div className="relative w-20 aspect-[16/10] rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-slate-950">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1.5 px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[8px] font-bold text-slate-300">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200 truncate">{img.name}</p>
                    <p className="text-[9px] text-slate-500">Source: Uploaded Media</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleMoveImage(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 rounded hover:bg-white/5 text-slate-400 disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveImage(idx, "down")}
                      disabled={idx === images.length - 1}
                      className="p-1.5 rounded hover:bg-white/5 text-slate-400 disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveImage(img.id)}
                      className="p-1.5 rounded hover:bg-red-500/10 text-red-400 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Configuration & Rendering (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 space-y-6">
          <h3 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-indigo-400" />
            Config & Mixing Room
          </h3>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Transition Duration</label>
            <select
              value={transitionDuration}
              onChange={(e) => setTransitionDuration(parseInt(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
            >
              <option value={3} className="bg-slate-950">3 Seconds per card</option>
              <option value={5} className="bg-slate-950">5 Seconds per card</option>
              <option value={10} className="bg-slate-950">10 Seconds per card</option>
              <option value={15} className="bg-slate-950">15 Seconds per card</option>
              <option value={30} className="bg-slate-950">30 Seconds per card</option>
            </select>
          </div>

          {/* Transition Effect */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Transition Effect</label>
            <select
              value={transitionEffect}
              onChange={(e) => setTransitionEffect(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
            >
              <option value="fade-black" className="bg-slate-950">Fade to Black</option>
              <option value="fade-white" className="bg-slate-950">Fade to White</option>
              <option value="fade-red" className="bg-slate-950">Fade to Red (Dramatic)</option>
              <option value="fade-blue" className="bg-slate-950">Fade to Blue (Corporate)</option>
              <option value="fade-green" className="bg-slate-950">Fade to Green (Fresh)</option>
              <option value="fade-purple" className="bg-slate-950">Fade to Purple (Creative)</option>
              <option value="fade-yellow" className="bg-slate-950">Fade to Yellow (Warm)</option>
              <option value="none" className="bg-slate-950">None (Direct Cut)</option>
            </select>
          </div>

          {/* Narration */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
              <span>Narration Overlay (Optional)</span>
              {narrationFile && <span className="text-[8px] text-emerald-400 font-bold font-mono">OK</span>}</label>
            <div className="relative border border-dashed border-white/10 rounded-xl p-3 bg-white/5 flex items-center justify-center gap-2 cursor-pointer min-h-[50px]">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleAudioUpload(e, "narration")}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploadingNarration}
              />
              {isUploadingNarration ? (
                <Loader2 className="w-4 h-4 text-fuchsia-400 animate-spin" />
              ) : (
                <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5" />
                  {narrationName || "Upload narration file"}
                </span>
              )}
            </div>
            {narrationFile && (
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                  <span>Narration Volume</span>
                  <span>{narrationVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={narrationVolume}
                  onChange={(e) => setNarrationVolume(parseInt(e.target.value))}
                  className="w-full accent-fuchsia-600 bg-white/5"
                />
              </div>
            )}
          </div>

          {/* Music */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
              <span>Background Soundtrack (Optional)</span>
              {musicFile && <span className="text-[8px] text-emerald-400 font-bold font-mono">OK</span>}
            </label>
            <div className="relative border border-dashed border-white/10 rounded-xl p-3 bg-white/5 flex items-center justify-center gap-2 cursor-pointer min-h-[50px]">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleAudioUpload(e, "music")}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploadingMusic}
              />
              {isUploadingMusic ? (
                <Loader2 className="w-4 h-4 text-fuchsia-400 animate-spin" />
              ) : (
                <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  {musicName || "Upload background music"}
                </span>
              )}
            </div>
            {musicFile && (
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-slate-500 font-bold">
                  <span>Music Volume</span>
                  <span>{musicVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 bg-white/5"
                />
              </div>
            )}
          </div>

          {/* Render Action & Output */}
          <div className="pt-4 border-t border-white/5">
            {isRendering ? (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 text-center">
                <Loader2 className="w-6 h-6 text-fuchsia-500 animate-spin" />
                <span className="text-xs font-bold text-slate-200">Rendering Video...</span>
                <span className="text-[10px] text-slate-400">FFmpeg is merging images, transitions, and audio.</span>
              </div>
            ) : outputVideo ? (
              <div className="space-y-3">
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                  <video src={`${backendUrl}${outputVideo}`} controls className="w-full h-full object-contain" />
                </div>
                <a
                  href={`${backendUrl}${outputVideo}`}
                  download
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" /> Download Montage MP4
                </a>
                <button
                  onClick={handleRenderMontage}
                  className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 font-bold text-xs text-slate-300 border border-white/10 transition-all"
                >
                  Render Again
                </button>
              </div>
            ) : (
              <button
                onClick={handleRenderMontage}
                disabled={images.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:opacity-95 font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" /> Compile & Render Montage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
