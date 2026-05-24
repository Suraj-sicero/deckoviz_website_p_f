import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  Play,
  Pause,
  RotateCcw,
  LayoutGrid,
  Heart,
  HelpCircle,
} from "lucide-react";
import { VortexSimulation } from "./VortexSimulation";
import { useAuth } from "../../../context/AuthContext";

interface Preset {
  id?: string;
  name: string;
  shapeType: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  spinSpeed: number;
  ditherLevels: number;
  starDensity: number;
  shapeScale: number;
  shapeDensity: number;
  shapeParam: number;
  gridOpacity: number;
  isPublic?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com";

const SHAPES = [
  { id: 0, key: "galaxy", name: "Galaxy Spiral" },
  { id: 1, key: "rings", name: "Concentric Waves" },
  { id: 2, key: "spirograph", name: "Spirograph Gear" },
  { id: 3, key: "rose", name: "Rose Curve" },
  { id: 4, key: "starburst", name: "Starburst Rays" },
  { id: 5, key: "superformula", name: "Superformula Star" },
];

const COLOR_THEMES = [
  { name: "Agentic Green", primary: "#2ee06a", secondary: "#ffffff", bg: "#030303" },
  { name: "Cosmic Purple", primary: "#b000ff", secondary: "#00e1ff", bg: "#020108" },
  { name: "Solar Flare", primary: "#ff4e00", secondary: "#f9d423", bg: "#080100" },
  { name: "Cyberpunk Neon", primary: "#ff007f", secondary: "#00f2fe", bg: "#05020a" },
  { name: "Deep Abyss", primary: "#0052d4", secondary: "#4364f7", bg: "#000511" },
  { name: "Retro Amber", primary: "#ffb347", secondary: "#ffcc33", bg: "#0d0900" },
  { name: "Ghost White", primary: "#ffffff", secondary: "#444444", bg: "#000000" },
];

const AgenticShapeVortex: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, openAuthModal } = useAuth();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<VortexSimulation | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Simulation Parameters
  const [shapeType, setShapeType] = useState<number>(0);
  const [primaryColor, setPrimaryColor] = useState<string>("#2ee06a");
  const [secondaryColor, setSecondaryColor] = useState<string>("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState<string>("#030303");
  const [spinSpeed, setSpinSpeed] = useState<number>(0.08);
  const [ditherLevels, setDitherLevels] = useState<number>(6);
  const [starDensity, setStarDensity] = useState<number>(0.5);
  const [shapeScale, setShapeScale] = useState<number>(1.0);
  const [shapeDensity, setShapeDensity] = useState<number>(5.5);
  const [shapeParam, setShapeParam] = useState<number>(2.0);
  const [gridOpacity, setGridOpacity] = useState<number>(0.15);

  // UI state
  const [showUI, setShowUI] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [timeOffset, setTimeOffset] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const pausedTimeRef = useRef<number>(0);

  // Presets from server
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("default-0");
  const [newPresetName, setNewPresetName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Fetch presets
  const fetchPresets = async () => {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(`${API_BASE}/api/agentic-presets`, { headers });
      if (response.ok) {
        const data = await response.json();
        setPresets(data);
      }
    } catch (error) {
      console.error("Error fetching presets:", error);
    }
  };

  useEffect(() => {
    fetchPresets();
  }, [token]);

  // Handle preset selection
  const applyPreset = (preset: Preset, id: string) => {
    const shapeObj = SHAPES.find(s => s.key === preset.shapeType);
    if (shapeObj) setShapeType(shapeObj.id);
    setPrimaryColor(preset.primaryColor);
    setSecondaryColor(preset.secondaryColor);
    setBackgroundColor(preset.backgroundColor);
    setSpinSpeed(preset.spinSpeed);
    setDitherLevels(preset.ditherLevels);
    setStarDensity(preset.starDensity);
    setShapeScale(preset.shapeScale);
    setShapeDensity(preset.shapeDensity);
    setShapeParam(preset.shapeParam);
    setGridOpacity(preset.gridOpacity);
    setSelectedPresetId(id);
  };

  // WebGL Render Loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const gl = canvasRef.current.getContext("webgl2");
    if (!gl) {
      console.error("WebGL 2 not supported in this browser");
      return;
    }

    const sim = new VortexSimulation(gl);
    simulationRef.current = sim;

    const render = () => {
      if (!canvasRef.current || !simulationRef.current) return;

      let currentTime = 0;
      if (isRotating) {
        currentTime = (Date.now() - startTimeRef.current) * 0.001 + timeOffset;
      } else {
        currentTime = timeOffset;
      }

      simulationRef.current.render(
        currentTime,
        canvasRef.current.width,
        canvasRef.current.height,
        {
          shapeType,
          primaryColor,
          secondaryColor,
          backgroundColor,
          spinSpeed,
          ditherLevels,
          starDensity,
          shapeScale,
          shapeDensity,
          shapeParam,
          gridOpacity,
        }
      );

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [
    shapeType,
    primaryColor,
    secondaryColor,
    backgroundColor,
    spinSpeed,
    ditherLevels,
    starDensity,
    shapeScale,
    shapeDensity,
    shapeParam,
    gridOpacity,
    isRotating,
    timeOffset,
  ]);

  // Toggle rotation
  const handleToggleRotation = () => {
    if (isRotating) {
      // Pause
      pausedTimeRef.current = Date.now();
      setIsRotating(false);
    } else {
      // Resume
      const elapsedPaused = (Date.now() - pausedTimeRef.current) * 0.001;
      startTimeRef.current += elapsedPaused * 1000;
      setIsRotating(true);
    }
  };

  // Reset time
  const handleResetRotation = () => {
    startTimeRef.current = Date.now();
    setTimeOffset(0);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Save preset to DB
  const handleSavePreset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      openAuthModal();
      return;
    }

    if (!newPresetName.trim()) {
      setSaveError("Please enter a name for the preset.");
      return;
    }

    setIsSaving(true);
    setSaveError("");

    const shapeKey = SHAPES.find(s => s.id === shapeType)?.key || "galaxy";

    const presetData: Preset = {
      name: newPresetName,
      shapeType: shapeKey,
      primaryColor,
      secondaryColor,
      backgroundColor,
      spinSpeed,
      ditherLevels,
      starDensity,
      shapeScale,
      shapeDensity,
      shapeParam,
      gridOpacity,
    };

    try {
      const response = await fetch(`${API_BASE}/api/agentic-presets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(presetData),
      });

      if (response.ok) {
        const saved = await response.json();
        setNewPresetName("");
        await fetchPresets();
        setSelectedPresetId(saved.id);
      } else {
        const data = await response.json();
        setSaveError(data.error || "Failed to save preset.");
      }
    } catch (err) {
      console.error(err);
      setSaveError("Server error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete preset
  const handleDeletePreset = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this preset?")) return;

    try {
      const response = await fetch(`${API_BASE}/api/agentic-presets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchPresets();
        setSelectedPresetId("default-0");
      }
    } catch (err) {
      console.error("Error deleting preset:", err);
    }
  };

  // Apply colors from predefined themes
  const applyColorTheme = (theme: typeof COLOR_THEMES[0]) => {
    setPrimaryColor(theme.primary);
    setSecondaryColor(theme.secondary);
    setBackgroundColor(theme.bg);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating UI Container */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          showUI ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header */}
        <div className="absolute top-8 left-8 flex items-center space-x-4 pointer-events-auto">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Agentic Shape Vortex
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Dithered Generative Geometry & Halftones
            </p>
          </div>
        </div>

        {/* Floating Controls Sidebar - Left Side */}
        <div className="absolute top-28 left-8 bottom-8 w-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-y-auto flex flex-col space-y-6 pointer-events-auto scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Presets Library */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-white/50 border-b border-white/10 pb-2">
              <LayoutGrid size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Presets Library
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
              {presets.map((preset, index) => {
                const presetId = preset.id || `default-${index}`;
                const isActive = selectedPresetId === presetId;
                return (
                  <div
                    key={presetId}
                    onClick={() => applyPreset(preset, presetId)}
                    className={`group w-full flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 border-emerald-500/50 text-white scale-[1.01]"
                        : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: preset.primaryColor }}
                      />
                      <span className="text-xs font-semibold tracking-wide truncate">
                        {preset.name}
                      </span>
                    </div>

                    {!preset.isPublic && (
                      <button
                        onClick={(e) => handleDeletePreset(presetId, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-white/40 hover:text-red-400 transition-all rounded-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Geometry Shape Selection */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-white/50 border-b border-white/10 pb-2">
              <Sparkles size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Shape Geometry
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SHAPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setShapeType(s.id);
                    setSelectedPresetId("");
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    shapeType === s.id
                      ? "bg-emerald-500 text-black border-emerald-500"
                      : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-white/50 border-b border-white/10 pb-2">
              <Heart size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Color Palettes
              </span>
            </div>

            {/* Quick Themes */}
            <div className="flex flex-wrap gap-1.5 pb-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => {
                    applyColorTheme(theme);
                    setSelectedPresetId("");
                  }}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white/70 flex items-center space-x-1.5 transition-all"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{theme.name.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            {/* Advanced Pickers */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                  Primary
                </span>
                <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-white/10">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setSelectedPresetId("");
                    }}
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                  Secondary
                </span>
                <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-white/10">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      setSelectedPresetId("");
                    }}
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
                  Background
                </span>
                <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-white/10">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => {
                      setBackgroundColor(e.target.value);
                      setSelectedPresetId("");
                    }}
                    className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer bg-transparent scale-150"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical Sliders */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-white/50 border-b border-white/10 pb-2">
              <Settings size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Math Controls
              </span>
            </div>

            {/* Slider: Speed */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>ROTATION SPEED</span>
                <span className="text-emerald-400">
                  {spinSpeed.toFixed(2)}x
                </span>
              </div>
              <input
                type="range"
                min="-0.4"
                max="0.4"
                step="0.01"
                value={spinSpeed}
                onChange={(e) => {
                  setSpinSpeed(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Shape Scale */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>SHAPE SCALE</span>
                <span className="text-emerald-400">
                  {shapeScale.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.5"
                step="0.05"
                value={shapeScale}
                onChange={(e) => {
                  setShapeScale(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Shape Density */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>TIGHTNESS (DENSITY)</span>
                <span className="text-emerald-400">
                  {shapeDensity.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="18.0"
                step="0.1"
                value={shapeDensity}
                onChange={(e) => {
                  setShapeDensity(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Shape Parameter (Arms/Petals/Rays) */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>ARMS / PETALS / RAYS</span>
                <span className="text-emerald-400">
                  {shapeParam.toFixed(0)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={shapeParam}
                onChange={(e) => {
                  setShapeParam(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Dither quantization */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>DITHER LEVELS</span>
                <span className="text-emerald-400">{ditherLevels}</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={ditherLevels}
                onChange={(e) => {
                  setDitherLevels(parseInt(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Star Density */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>STAR BACKGROUND DENSITY</span>
                <span className="text-emerald-400">
                  {(starDensity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={starDensity}
                onChange={(e) => {
                  setStarDensity(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>

            {/* Slider: Grid Opacity */}
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-[10px] font-bold tracking-wide text-white/70">
                <span>GRID OVERLAY OPACITY</span>
                <span className="text-emerald-400">
                  {(gridOpacity * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.01"
                value={gridOpacity}
                onChange={(e) => {
                  setGridOpacity(parseFloat(e.target.value));
                  setSelectedPresetId("");
                }}
                className="w-full accent-emerald-500 bg-white/5 h-1 rounded"
              />
            </div>
          </div>

          {/* Cloud Database Integration: Save Preset Form */}
          <div className="flex flex-col space-y-3 pt-2">
            <div className="flex items-center space-x-2 text-white/50 border-b border-white/10 pb-2">
              <Heart size={16} />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                Cloud Presets
              </span>
            </div>

            {user ? (
              <form onSubmit={handleSavePreset} className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Preset Name..."
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-50 text-black font-bold rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-lg"
                >
                  <Plus size={14} />
                  <span>{isSaving ? "Saving..." : "Save to Cloud"}</span>
                </button>
                {saveError && (
                  <p className="text-[10px] font-semibold text-red-400 text-center">
                    {saveError}
                  </p>
                )}
              </form>
            ) : (
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                <HelpCircle size={22} className="text-emerald-400/80" />
                <div>
                  <p className="text-white text-xs font-bold leading-normal">
                    Cloud Storage Locked
                  </p>
                  <p className="text-gray-400 text-[10px] leading-relaxed mt-1">
                    Sign in to save and sync your customized dithered backgrounds to our PostgreSQL database.
                  </p>
                </div>
                <button
                  onClick={() => openAuthModal()}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-md"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Top Right Action Area: Fullscreen, Rotation state, Settings toggle */}
        <div className="absolute top-8 right-24 flex items-center space-x-3 pointer-events-auto">
          {/* Pause / Play */}
          <button
            onClick={handleToggleRotation}
            className="p-3.5 bg-black/40 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 text-white/70 hover:text-white transition-all shadow-xl flex items-center justify-center"
            title={isRotating ? "Pause Rotation" : "Play Rotation"}
          >
            {isRotating ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Reset Rotation Frame */}
          <button
            onClick={handleResetRotation}
            className="p-3.5 bg-black/40 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 text-white/70 hover:text-white transition-all shadow-xl flex items-center justify-center"
            title="Reset Spin Timeline"
          >
            <RotateCcw size={18} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-3.5 bg-black/40 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 text-white/70 hover:text-white transition-all shadow-xl flex items-center justify-center"
            title={isFullscreen ? "Exit Immersive View" : "Immersive View"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          {/* Settings Collapse Toggle */}
          <button
            onClick={() => setShowUI(!showUI)}
            className="p-3.5 bg-black/40 hover:bg-white/15 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-white/20 transition-all shadow-xl"
            title={showUI ? "Collapse Controls" : "Expand Controls"}
          >
            <Settings
              className={`w-[18px] h-[18px] text-white transition-transform duration-500 ${
                showUI ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        {/* Immersive HUD trigger when UI is hidden */}
        {!showUI && (
          <button
            onClick={() => setShowUI(true)}
            className="absolute bottom-8 left-8 p-4 bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-xl rounded-full text-white/70 hover:text-white transition-all shadow-2xl pointer-events-auto flex items-center space-x-2"
          >
            <Settings size={18} className="animate-spin-slow" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Show Controls
            </span>
          </button>
        )}
      </div>

      {/* ALWAYS VISIBLE EXIT BUTTON */}
      <div className="absolute top-8 right-8 pointer-events-auto z-[9999]">
        <button
          onClick={() => {
            navigate("/experimental-art-modes");
          }}
          className="p-3.5 bg-black/20 hover:bg-rose-500/20 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-rose-400 transition-all shadow-xl flex items-center justify-center"
          title="Exit to Art Modes"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          input[type='range'] {
            -webkit-appearance: none;
            background: rgba(255, 255, 255, 0.05);
            height: 4px;
            border-radius: 2px;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #2ee06a;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(46,224,106,0.3);
            border: 2px solid white;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
        `,
      }} />
    </div>
  );
};

export default AgenticShapeVortex;
