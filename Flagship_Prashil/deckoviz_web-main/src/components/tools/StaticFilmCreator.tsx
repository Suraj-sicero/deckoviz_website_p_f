import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Play,
  Volume2,
  Download,
  Loader2,
  FileVideo,
  ChevronRight,
  Music,
  Mic,
  Maximize2
} from "lucide-react";

interface Scene {
  id: string;
  sceneNumber: number;
  prompt: string;
  generatedOptions: string[];
  selectedImage: string;
}

interface StaticFilmCreatorProps {
  onClose: () => void;
  backendUrl: string;
  token: string;
}

const STYLE_TEMPLATES = [
  { id: "anime", name: "Anime", desc: "Vibrant, cell-shaded Japanese style", icon: "🌸" },
  { id: "realistic", name: "Realistic", desc: "Hyper-detailed 8K photography style", icon: "📷" },
  { id: "watercolor", name: "Watercolor", desc: "Soft paint washes and organic textures", icon: "🎨" },
  { id: "oil painting", name: "Oil Painting", desc: "Classical brush strokes and canvas texture", icon: "🖼️" },
  { id: "comic book", name: "Comic Book", desc: "Bold lineart and retro halftone dots", icon: "💥" },
  { id: "cinematic", name: "Cinematic", desc: "35mm film still with dramatic lighting", icon: "🎬" },
  { id: "fantasy", name: "Fantasy", desc: "Magical illustration style", icon: "🐉" },
  { id: "sci-fi", name: "Sci-Fi", desc: "Futuristic, neon-lit cyberpunk aesthetics", icon: "🚀" }
];

export const StaticFilmCreator: React.FC<StaticFilmCreatorProps> = ({ onClose, backendUrl, token }) => {
  // Project state
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState<string | null>(null);
  
  // Style config
  const [styleReferenceImage, setStyleReferenceImage] = useState<string | null>(null);
  const [styleTemplate, setStyleTemplate] = useState<string | null>(null);
  const [isUploadingStyle, setIsUploadingStyle] = useState(false);
  
  // Scene generation
  const [scenePrompt, setScenePrompt] = useState("");
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Scene Queue
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Audio & Transitions
  const [transitionDuration, setTransitionDuration] = useState(5);
  const [narrationFile, setNarrationFile] = useState<string | null>(null);
  const [narrationName, setNarrationName] = useState<string | null>(null);
  const [isUploadingNarration, setIsUploadingNarration] = useState(false);
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [musicName, setMusicName] = useState<string | null>(null);
  const [isUploadingMusic, setIsUploadingMusic] = useState(false);
  
  const [narrationVolume, setNarrationVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(30); // Lower default music volume for better narration mixing

  // Render & Polling
  const [renderStatus, setRenderStatus] = useState<string>("draft"); // draft, rendering, completed, failed
  const [outputVideo, setOutputVideo] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize project in database
  const handleStartProject = async (type: string) => {
    setProjectType(type);
    let defaultTitle = "";
    if (type === "film") defaultTitle = "A Short Film by Vizzy";
    if (type === "comic") defaultTitle = "Conversational Comic Book";
    if (type === "marketing") defaultTitle = "Product Showcase Video";
    if (type === "story") defaultTitle = "Illustrated Story Video";
    
    setProjectTitle(defaultTitle);
  };

  const handleCreateProject = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${backendUrl}/api/vizzy-studio/films/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projectTitle,
          styleReferenceImage
        })
      });
      if (res.ok) {
        const data = await res.json();
        setProjectId(data.id);
        setRenderStatus(data.status);
        setScenes([]);
      }
    } catch (err) {
      console.error("Failed to start film project", err);
    }
  };

  // Upload style reference image
  const handleStyleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploadingStyle(true);
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
        setStyleReferenceImage(data.image.url);
        setStyleTemplate(null); // Clear template if image uploaded
      }
    } catch (err) {
      console.error("Failed to upload style image", err);
    } finally {
      setIsUploadingStyle(false);
    }
  };

  // Upload Audio files
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

  // Sync state to DB on updates
  const syncProjectState = async (updatedScenes = scenes, status = renderStatus, outVideo = outputVideo) => {
    if (!projectId || !token) return;
    try {
      await fetch(`${backendUrl}/api/vizzy-studio/films/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projectTitle,
          styleReferenceImage,
          scenes: updatedScenes,
          transitionDuration,
          narrationFile,
          musicFile,
          narrationVolume,
          musicVolume,
          status,
          outputVideo: outVideo
        })
      });
    } catch (err) {
      console.warn("Failed to sync project state to database", err);
    }
  };

  // Hook sync on relevant variables
  useEffect(() => {
    if (projectId) {
      syncProjectState();
    }
  }, [styleReferenceImage, transitionDuration, narrationFile, musicFile, narrationVolume, musicVolume]);

  // Scene generation
  const handleGenerateScene = async () => {
    if (!scenePrompt.trim() || !token) return;
    setIsGenerating(true);
    try {
      const previousSelectedImage = scenes.length > 0 ? scenes[scenes.length - 1].selectedImage : null;
      
      const res = await fetch(`${backendUrl}/api/vizzy-studio/films/generate-scene`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: scenePrompt,
          styleReferenceImage,
          styleTemplate,
          previousSelectedImage
        })
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedOptions(data.options || []);
      }
    } catch (err) {
      console.error("Scene generation failed", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Select scene image
  const handleSelectImage = (imgUrl: string) => {
    const newScene: Scene = {
      id: `scene-${Date.now()}-${Math.random().toString(36).substring(5)}`,
      sceneNumber: scenes.length + 1,
      prompt: scenePrompt,
      generatedOptions,
      selectedImage: imgUrl
    };
    
    const updatedScenes = [...scenes, newScene];
    setScenes(updatedScenes);
    
    // Reset generation state
    setScenePrompt("");
    setGeneratedOptions([]);
    
    syncProjectState(updatedScenes);
  };

  // Queue Operations
  const handleRemoveScene = (id: string) => {
    const updated = scenes
      .filter(s => s.id !== id)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
    setScenes(updated);
    syncProjectState(updated);
  };

  const handleMoveScene = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === scenes.length - 1) return;

    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...scenes];
    
    // Swap
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;

    // Correct scene numbers
    const finalScenes = updated.map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
    setScenes(finalScenes);
    syncProjectState(finalScenes);
  };

  const handleRegenerateRequest = (scene: Scene) => {
    setScenePrompt(scene.prompt);
    setGeneratedOptions(scene.generatedOptions);
    // Visual feedback scrolls back to input
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render video
  const handleRenderVideo = async () => {
    if (!projectId || !token || !scenes.length) return;
    setRenderStatus("rendering");
    syncProjectState(scenes, "rendering");

    try {
      const res = await fetch(`${backendUrl}/api/vizzy-studio/films/${projectId}/render`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setIsPolling(true);
      } else {
        setRenderStatus("failed");
      }
    } catch (err) {
      console.error("Failed to start video rendering", err);
      setRenderStatus("failed");
    }
  };

  // Polling logic for video status
  useEffect(() => {
    if (isPolling && projectId) {
      pollingIntervalRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${backendUrl}/api/vizzy-studio/films/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.status === "completed") {
              setRenderStatus("completed");
              setOutputVideo(data.outputVideo);
              setIsPolling(false);
              if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
            } else if (data.status === "failed") {
              setRenderStatus("failed");
              setIsPolling(false);
              if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
            }
          }
        } catch (err) {
          console.warn("Error polling video render status", err);
        }
      }, 3000);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [isPolling, projectId, token]);

  // Welcome selection view
  if (!projectType) {
    return (
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/20">
            <FileVideo className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Static Image Film Creator
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Stitch sequentially generated static images into a rich cinematic narrative. Control story structure, visual consistency, music overlays, and optional voice narrations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { id: "film", title: "Create Static Film", desc: "Produce short atmospheric film scenes", icon: "🎬" },
            { id: "comic", title: "Create Comic Book", desc: "Weave an illustrated multi-frame comic story", icon: "💥" },
            { id: "marketing", title: "Create Marketing Video", desc: "Design stunning digital product showcases", icon: "👔" },
            { id: "story", title: "Create Story Video", desc: "Develop animated visual book narratives", icon: "📖" }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => handleStartProject(opt.id)}
              className="group text-left p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/80 transition-all duration-300 flex items-center justify-between"
            >
              <div className="space-y-1.5 pr-4">
                <span className="text-2xl">{opt.icon}</span>
                <h4 className="font-bold text-slate-200 text-base group-hover:text-fuchsia-400 transition-colors">
                  {opt.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-fuchsia-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Setup / Style selection view
  if (!projectId) {
    return (
      <div className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setProjectType(null)}
            className="p-2.5 rounded-2xl hover:bg-white/5 border border-white/5 text-slate-400 hover:text-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold">Configure Style Reference</h2>
            <p className="text-xs text-slate-400">Set visual guide rails for story character and style consistency</p>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm font-semibold"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
            {/* Option A: Upload Reference */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-200 text-sm">Option A: Upload Style Reference</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Provide an artwork style, character sketch, or environment photograph</p>
              </div>

              <div className="relative border-2 border-dashed border-white/10 hover:border-purple-500/30 rounded-3xl p-6 text-center cursor-pointer transition-all bg-white/5 flex flex-col items-center justify-center min-h-[160px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleStyleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={isUploadingStyle}
                />
                {isUploadingStyle ? (
                  <Loader2 className="w-8 h-8 text-fuchsia-400 animate-spin" />
                ) : styleReferenceImage ? (
                  <div className="space-y-3">
                    <img
                      src={styleReferenceImage}
                      alt="Style reference"
                      className="w-20 h-20 rounded-xl object-cover mx-auto border border-white/15"
                    />
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      Loaded Reference
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-7 h-7 text-slate-400 mb-2 group-hover:text-purple-400" />
                    <span className="text-xs font-bold text-slate-300">Drag & drop or browse</span>
                    <span className="text-[10px] text-slate-500">Supports PNG, JPG, WebP up to 10MB</span>
                  </>
                )}
              </div>
            </div>

            {/* Option B: Style Templates */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-200 text-sm">Option B: Choose Style Template</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Apply a curated visual model style setting directly</p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                {STYLE_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setStyleTemplate(t.id);
                      setStyleReferenceImage(null); // Clear uploaded file
                    }}
                    className={`p-3 rounded-2xl text-left border text-xs transition-all flex flex-col gap-1 ${
                      styleTemplate === t.id
                        ? "bg-purple-600/30 border-purple-500 text-slate-100"
                        : "bg-white/5 border-white/5 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-base">{t.icon} {t.name}</span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateProject}
          disabled={!projectTitle.trim() || (!styleReferenceImage && !styleTemplate)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 text-white font-bold hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" /> Initialize Creator Suite
        </button>
      </div>
    );
  }

  // Active workspace (Dashboard)
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative font-sans">
      
      {/* LEFT PANEL: Scene Generation & Configuration */}
      <div className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-900/20 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setProjectId(null);
              setProjectType(null);
            }}
            className="p-1.5 rounded-xl hover:bg-white/5 border border-white/5 text-slate-400"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-slate-100 tracking-tight">{projectTitle}</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Static Film Board</p>
          </div>
        </div>

        {/* Scene Input */}
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4.5 space-y-4">
          <h3 className="font-bold text-slate-300 text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            Generate Scene Image
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Write a detailed prompt. Style guidelines will be appended automatically.
          </p>

          <textarea
            value={scenePrompt}
            onChange={(e) => setScenePrompt(e.target.value)}
            placeholder="Describe the scene detail (e.g. 'An astronaut walks into a massive neon temple...')"
            rows={3}
            className="w-full px-4.5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs"
          />

          <button
            onClick={handleGenerateScene}
            disabled={isGenerating || !scenePrompt.trim()}
            className="w-full py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-slate-800 disabled:text-slate-500 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Variations...
              </>
            ) : (
              <>
                Generate Scene Variations
              </>
            )}
          </button>
        </div>

        {/* Video Stitch Configuration */}
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4.5 space-y-4.5">
          <h3 className="font-bold text-slate-300 text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-indigo-400" />
            Stitch & Audio Mix
          </h3>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Transition Duration</label>
            <select
              value={transitionDuration}
              onChange={(e) => setTransitionDuration(parseInt(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none"
            >
              <option value={3} className="bg-slate-950">3 Seconds</option>
              <option value={5} className="bg-slate-950">5 Seconds</option>
              <option value={10} className="bg-slate-950">10 Seconds</option>
              <option value={15} className="bg-slate-950">15 Seconds</option>
              <option value={30} className="bg-slate-950">30 Seconds</option>
            </select>
          </div>

          {/* Narration Upload */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
              <span>Voice Narration</span>
              {narrationFile && <span className="text-[8px] text-emerald-400 font-bold">Loaded</span>}
            </label>
            <div className="relative border border-dashed border-white/10 rounded-xl p-2.5 bg-white/5 flex items-center justify-center gap-2 cursor-pointer min-h-[50px]">
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
                  {narrationName || "Upload narration file (mp3, wav, m4a)"}
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

          {/* Music Upload */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center justify-between">
              <span>Background Music</span>
              {musicFile && <span className="text-[8px] text-emerald-400 font-bold">Loaded</span>}
            </label>
            <div className="relative border border-dashed border-white/10 rounded-xl p-2.5 bg-white/5 flex items-center justify-center gap-2 cursor-pointer min-h-[50px]">
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
                  {musicName || "Upload music file (mp3, wav, m4a)"}
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

          {/* Export action */}
          <div className="pt-2 border-t border-white/5">
            {renderStatus === "rendering" ? (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 text-center">
                <Loader2 className="w-6 h-6 text-fuchsia-500 animate-spin" />
                <span className="text-xs font-bold text-slate-200">Rendering Video...</span>
                <span className="text-[10px] text-slate-400 leading-relaxed">
                  FFmpeg is compiling scene cards, fades, and audio overlays. This takes a brief moment.
                </span>
              </div>
            ) : renderStatus === "completed" && outputVideo ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col items-center gap-1.5 text-center">
                  <span className="text-xs font-bold text-emerald-400">Rendering Completed!</span>
                  <span className="text-[10px] text-slate-400">Your MP4 film project is ready to download.</span>
                </div>
                <a
                  href={`${backendUrl}${outputVideo}`}
                  download
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" /> Download Film MP4
                </a>
                <button
                  onClick={handleRenderVideo}
                  disabled={!scenes.length}
                  className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 font-bold text-xs text-slate-300 border border-white/10 transition-all"
                >
                  Re-Render / Re-compile
                </button>
              </div>
            ) : (
              <button
                onClick={handleRenderVideo}
                disabled={!scenes.length}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:opacity-95 font-bold text-xs text-white shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" /> Compile & Render Video
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE & RIGHT AREA: Main Creator Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        
        {/* UPPER PORTION: Generated options preview & selection */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {generatedOptions.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm tracking-wide text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                  Generated Image Options
                </h3>
                <button
                  onClick={() => setGeneratedOptions([])}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel Selection
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {generatedOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="group bg-slate-900/40 border border-white/5 hover:border-purple-500/20 rounded-3xl p-4 transition-all duration-300 flex flex-col gap-4 shadow-xl"
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                      <img
                        src={opt}
                        alt={`Option ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <button
                        onClick={() => setPreviewImage(opt)}
                        className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/80 hover:bg-slate-950 backdrop-blur border border-white/10 text-slate-300 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Maximize2 className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleSelectImage(opt)}
                      className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all"
                    >
                      Select & Add to Scene #{scenes.length + 1}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : scenes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                🔮
              </div>
              <h3 className="font-bold text-slate-200 text-sm">Your Film Board is empty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Start building your scene sequence. Write a prompt in the left panel to generate visual scenes, select the best frames, and build your queue.
              </p>
            </div>
          ) : (
            // Full Screen Preview player or Large Active Video Player
            <div className="h-full max-w-4xl mx-auto flex flex-col justify-center space-y-6">
              {renderStatus === "completed" && outputVideo ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-300 tracking-wide">Final Video Render Output</h3>
                  <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl relative">
                    <video
                      src={`${backendUrl}${outputVideo}`}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-slate-300 tracking-wide">Scene Sequence Preview</h3>
                    <span className="text-xs text-slate-400 font-semibold">{scenes.length} Scenes Total</span>
                  </div>
                  <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl flex items-center justify-center relative group">
                    <img
                      src={previewImage || scenes[scenes.length - 1].selectedImage}
                      alt="Active preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                        Active Scene Board
                      </p>
                      <p className="text-sm font-bold text-slate-200 line-clamp-2">
                        {scenes.find(s => s.selectedImage === (previewImage || scenes[scenes.length - 1].selectedImage))?.prompt || scenes[scenes.length - 1].prompt}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* LOWER PORTION: Horizontal Scroll Scene Queue */}
        <div className="border-t border-white/5 bg-slate-900/20 p-6 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs tracking-wider uppercase text-slate-400">
              Scene Timeline / Queue
            </h3>
            <span className="text-[10px] text-slate-500 font-bold">
              Est. Duration: {scenes.length * transitionDuration}s
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 pr-2">
            {scenes.map((scene, idx) => (
              <div
                key={scene.id}
                onClick={() => setPreviewImage(scene.selectedImage)}
                className={`flex-shrink-0 w-52 bg-slate-950/60 border rounded-2xl p-3.5 flex flex-col gap-3 cursor-pointer transition-all ${
                  (previewImage === scene.selectedImage || (!previewImage && idx === scenes.length - 1))
                    ? "border-fuchsia-500/50 shadow-md shadow-fuchsia-500/5 bg-slate-950"
                    : "border-white/5 hover:border-slate-800"
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={scene.selectedImage}
                    alt={`Scene ${scene.sceneNumber}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-950/80 border border-white/10 text-[9px] font-bold text-slate-300">
                    #{scene.sceneNumber}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-slate-300 font-semibold line-clamp-2 min-h-[30px]">
                    {scene.prompt}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveScene(idx, "up"); }}
                        disabled={idx === 0}
                        className="p-1 rounded hover:bg-white/5 text-slate-400 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveScene(idx, "down"); }}
                        disabled={idx === scenes.length - 1}
                        className="p-1 rounded hover:bg-white/5 text-slate-400 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRegenerateRequest(scene); }}
                        className="text-[9px] font-bold text-indigo-400 hover:text-indigo-300"
                      >
                        Re-roll
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveScene(scene.id); }}
                        className="p-1 rounded hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder Add Scene Button */}
            <div className="flex-shrink-0 w-52 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 gap-2 text-center text-slate-500 hover:border-slate-800 transition-all min-h-[178px]">
              <Plus className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Add Scene</span>
              <span className="text-[8px] leading-relaxed">Enter prompt in the left panel to add scene</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FULL PREVIEW */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10">
            <img
              src={previewImage}
              alt="Modal Preview"
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 px-4 py-2 bg-slate-900/80 hover:bg-slate-950 text-xs font-bold text-white rounded-xl border border-white/10"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
