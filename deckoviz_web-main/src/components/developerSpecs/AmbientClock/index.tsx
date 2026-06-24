"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { 
  Clock as ClockIcon, Sparkles, Volume2, VolumeX, Maximize2, Minimize2, 
  Play, Pause, RotateCcw, Sliders, Grid, Camera, Tv, HelpCircle, 
  Heart, Share2, Compass, ArrowLeft, RefreshCw, Sun, Moon, 
  CloudRain, Wind, Trash2, Save, Download, ArrowRight, Eye, Upload
} from "lucide-react";

// Curated stock backgrounds for presets
const PRESET_BG = {
  cyberpunk: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600",
  minimal: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600",
  nature: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1600",
  luxury: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
  space: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1600",
  anime: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600",
  ocean: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600",
  retro: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600",
};

// Preset styling definitions
const STYLES_LIBRARY = [
  { id: "Minimal", name: "Scandinavian Minimal", desc: "Clean lines, natural beige textures", icon: "🌱" },
  { id: "Cyberpunk", name: "Cyberpunk Tokyo", desc: "Neon glows and dark rain streets", icon: "🏙️" },
  { id: "Luxury", name: "Modern Luxury", desc: "Black marble, brass and gold details", icon: "✨" },
  { id: "Nature", name: "Zen Forest", desc: "Organic wood, morning light rays", icon: "🌲" },
  { id: "Space", name: "Cosmic Space", desc: "Nebula gases and orbital energy", icon: "🌌" },
  { id: "Anime", name: "Ghibli Dreamscape", desc: "Vibrant stylized sky painting", icon: "🌸" },
  { id: "Ocean", name: "Bioluminescent Abyss", desc: "Glowing marine flora and deep water", icon: "🐙" },
  { id: "Retro", name: "Vaporwave Retro", desc: "Synthwave grid sunset gradients", icon: "🌴" }
];

const MOODS = [
  { id: "Focus", name: "Deep Work Focus", color: "from-blue-500/20 to-teal-500/20" },
  { id: "Calm", name: "Atmospheric Calm", color: "from-emerald-500/20 to-teal-500/20" },
  { id: "Meditation", name: "Zen Meditation", color: "from-purple-500/20 to-rose-500/20" },
  { id: "Creativity", name: "Creative Flow", color: "from-fuchsia-500/20 to-amber-500/20" },
  { id: "Sleep", name: "Deep Sleep Portal", color: "from-slate-900/60 to-indigo-950/60" }
];

const SOUNDS = [
  { id: "none", name: "Silent", url: "" },
  { id: "rain", name: "Cozy Rain", url: "https://www.soundjay.com/nature/sounds/rain-07.mp3" },
  { id: "forest", name: "Zen Forest Birds", url: "https://www.soundjay.com/nature/sounds/forest-wind-1.mp3" },
  { id: "waves", name: "Ocean Waves", url: "https://www.soundjay.com/nature/sounds/ocean-wave-1.mp3" },
  { id: "fireplace", name: "Crackling Fire", url: "https://www.soundjay.com/nature/sounds/fire-1.mp3" },
  { id: "wind", name: "Soft Wind Gusts", url: "https://www.soundjay.com/nature/sounds/wind-weather-01.mp3" },
  { id: "lo-fi", name: "Lofi Ambient beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "vinyl", name: "Vinyl Crackle Static", url: "https://www.soundjay.com/misc/sounds/record-player-static-1.mp3" },
  { id: "piano", name: "Slow Piano Melodies", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "city", name: "Paris Cafe Ambience", url: "https://www.soundjay.com/misc/sounds/street-traffic-1.mp3" }
];

const CITIES = [
  { id: "none", name: "Local System Time", tz: "", desc: "Uses your current clock" },
  { id: "tokyo", name: "Tokyo Live", tz: "Asia/Tokyo", desc: "Neon & Midnight rain atmosphere" },
  { id: "london", name: "London Live", tz: "Europe/London", desc: "Mist & Rainy afternoon comfort" },
  { id: "paris", name: "Paris Live", tz: "Europe/Paris", desc: "Golden hour sunset details" },
  { id: "newyork", name: "New York Live", tz: "America/New_York", desc: "Midtown skylight and jazz vibes" }
];

const SURPRISE_PROMPTS = [
  "Moody jazz café at midnight with warm glowing lanterns",
  "Cyberpunk Seoul with neon holographic rain and towering skyscrapers",
  "Minimalist Scandinavian cozy lounge with warm fireplace shadows",
  "Dreamy cosmic galaxy with a giant bioluminescent whale floating",
  "Ancient Indian temple courtyard at warm amber sunrise",
  "Luxury gold and white marble slab with shimmering metallic grains",
  "Ghibli-style floating meadow in a sky filled with massive clouds",
  "Bioluminescent underwater coral reef shimmering in deep blue darkness",
  "Zen Japanese moss garden with a small stone bridge and foggy light",
  "Dark academia library with rain hitting the gothic arched windows"
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://deckoviz-demo.onrender.com";

interface ClockPreset {
  id?: string;
  name: string;
  prompt: string;
  imageUrl: string;
  style: string;
  mood: string;
  handColor: string;
  secondHandColor: string;
  dialColor: string;
  numeralStyle: string; // minimal | roman | arabic | none | abstract
  handStyle: string; // wooden | neon | metallic | glowing | fluid | cosmic | minimal
  accentColor: string;
  ambientSound: string;
  lore: string;
  animationType: string; // rain | fog | particles | stars | flowing-ink | breathing-gradient
  isPublic?: boolean;
  // AI-generated clock identity fields
  handTheme?: string;
  markerTheme?: string;
  pivotTheme?: string;
}

const AmbientClock: React.FC = () => {
  const { token } = useAuth();
  
  // App views: 'studio' | 'fullscreen'
  const [view, setView] = useState<'studio' | 'fullscreen'>('studio');
  const [activeTab, setActiveTab] = useState<'generate' | 'design' | 'gallery'>('generate');

  // Clock configuration state
  const [currentClock, setCurrentClock] = useState<ClockPreset>({
    name: "Cyberpunk Tokyo 2AM",
    prompt: "Cyberpunk Tokyo at 2AM with neon rain and holographic billboards",
    imageUrl: PRESET_BG.cyberpunk,
    style: "Cyberpunk",
    mood: "Creativity",
    handColor: "#00ffcc",
    secondHandColor: "#ff0077",
    dialColor: "#00ffff",
    numeralStyle: "none",
    handStyle: "neon",
    accentColor: "#7000ff",
    ambientSound: "rain",
    lore: "Time flows like neon rain through the concrete canyons of Shinjuku. The city whispers in code at 2 AM.",
    animationType: "rain"
  });

  // Time & Clock Engine state
  const [time, setTime] = useState<Date>(new Date());
  const [clockMode, setClockMode] = useState<'analog' | 'digital' | 'hybrid' | 'abstract'>('analog');
  const [selectedCity, setSelectedCity] = useState<string>("none");

  // User input fields
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("Minimal");
  const [selectedMood, setSelectedMood] = useState<string>("Calm");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [remixPrompt, setRemixPrompt] = useState<string>("");
  const [isRemixing, setIsRemixing] = useState<boolean>(false);

  // Gallery and custom presets list
  const [galleryClocks, setGalleryClocks] = useState<ClockPreset[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Audio elements
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fullscreen UI autohide
  const [showControls, setShowControls] = useState<boolean>(true);
  const lastMouseMoveRef = useRef<number>(Date.now());

  // Canvas context ref for backgrounds
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Fetch presets on mount
  const fetchClocks = async () => {
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const res = await fetch(`${BACKEND_URL}/api/ambient-clock`, { headers });
      if (res.ok) {
        const data = await res.json();
        setGalleryClocks(data);
      }
    } catch (err) {
      console.error("Failed to load gallery clocks:", err);
    }
  };

  useEffect(() => {
    fetchClocks();
  }, [token]);

  // 2. Local Time ticking sweep animation loop (60 FPS smooth sweep second hand)
  useEffect(() => {
    let animFrameId: number;
    
    const tick = () => {
      // Handle timezone offset if city live clock is active
      const now = new Date();
      const cityObj = CITIES.find(c => c.id === selectedCity);
      
      if (cityObj && cityObj.tz) {
        // Convert local system time to target timezone
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: cityObj.tz,
          year: "numeric", month: "numeric", day: "numeric",
          hour: "numeric", minute: "numeric", second: "numeric",
          hour12: false
        });
        const parts = formatter.formatToParts(now);
        
        const year = parseInt(parts.find(p => p.type === 'year')?.value || "0");
        const month = parseInt(parts.find(p => p.type === 'month')?.value || "1") - 1;
        const day = parseInt(parts.find(p => p.type === 'day')?.value || "1");
        const hour = parseInt(parts.find(p => p.type === 'hour')?.value || "0");
        const minute = parseInt(parts.find(p => p.type === 'minute')?.value || "0");
        const second = parseInt(parts.find(p => p.type === 'second')?.value || "0");
        
        // Add milliseconds from system clock to keep it sweeping smoothly
        const ms = now.getMilliseconds();
        const tzDate = new Date(year, month, day, hour, minute, second, ms);
        setTime(tzDate);
      } else {
        setTime(now);
      }
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [selectedCity]);

  // 3. Ambient Audio controller
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const soundObj = SOUNDS.find(s => s.id === currentClock.ambientSound);
    if (soundObj && soundObj.url && audioPlaying) {
      const audio = new Audio(soundObj.url);
      audio.loop = true;
      audio.volume = volume;
      audio.play().catch(e => console.log("Audio play deferred till user interaction", e));
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentClock.ambientSound, audioPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 4. Background Canvas Micro-animations System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool
    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    const particleDensity = 40;
    
    // Star pool
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5,
        alpha: Math.random(),
        speed: 0.005 + Math.random() * 0.01
      });
    }

    // Rain drops
    const raindrops: { x: number; y: number; len: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        len: 10 + Math.random() * 20,
        speed: 8 + Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.4
      });
    }

    // Conway's Game of Life grid (for Abstract cellular automata)
    const cellSize = 10;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);
    let grid = Array(cols).fill(null).map(() => Array(rows).fill(null).map(() => Math.random() > 0.90 ? 1 : 0));
    let lastGridUpdate = 0;

    const computeNextGeneration = () => {
      const next = grid.map(arr => [...arr]);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              const colIdx = (c + i + cols) % cols;
              const rowIdx = (r + j + rows) % rows;
              neighbors += grid[colIdx][rowIdx];
            }
          }
          // Conway rules
          if (grid[c][r] === 1 && (neighbors < 2 || neighbors > 3)) next[c][r] = 0;
          else if (grid[c][r] === 0 && neighbors === 3) next[c][r] = 1;
        }
      }
      grid = next;
    };

    // Render loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // Animation type logic
      if (currentClock.animationType === "rain") {
        ctx.strokeStyle = "rgba(100, 200, 255, 0.4)";
        ctx.lineWidth = 1;
        for (let i = 0; i < raindrops.length; i++) {
          const r = raindrops[i];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(120, 220, 255, ${r.opacity})`;
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x - 2, r.y + r.len);
          ctx.stroke();

          r.y += r.speed;
          r.x -= 0.5;
          if (r.y > height) {
            r.y = -r.len;
            r.x = Math.random() * width;
          }
        }
      } 
      else if (currentClock.animationType === "particles") {
        // floating dust particles
        if (particles.length < particleDensity) {
          particles.push({
            x: Math.random() * width,
            y: height + 10,
            r: 1 + Math.random() * 4,
            vx: -0.5 + Math.random() * 1,
            vy: -0.2 - Math.random() * 0.8,
            alpha: Math.random() * 0.6,
            color: currentClock.handColor || "#ffffff"
          });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) {
            particles.splice(i, 1);
          }
        }
      } 
      else if (currentClock.animationType === "stars") {
        // twinkling cosmic dust stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = currentClock.secondHandColor || "#ffffff";
          ctx.globalAlpha = Math.abs(Math.sin(s.alpha));
          ctx.fill();
          ctx.globalAlpha = 1.0;

          s.alpha += s.speed;
          s.x += 0.05;
          if (s.x > width) s.x = 0;
        }
      } 
      else if (currentClock.animationType === "fog") {
        // moving white fog waves
        const timeVal = timestamp * 0.0005;
        ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const y = height - 150 + Math.sin(x * 0.005 + timeVal) * 40 + Math.cos(x * 0.01 - timeVal) * 20;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }
      else if (currentClock.animationType === "breathing-gradient") {
        // glowing background pulse overlay
        const pulse = Math.abs(Math.sin(timestamp * 0.001)) * 0.15;
        const grad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, width * 0.8);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0, 0, 0, ${0.4 + pulse})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // If abstract mode: render cellular automata on top
      if (clockMode === "abstract" || currentClock.animationType === "flowing-ink") {
        ctx.fillStyle = `${currentClock.dialColor}15`;
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            if (grid[c][r] === 1) {
              ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
            }
          }
        }
        if (timestamp - lastGridUpdate > 150) {
          computeNextGeneration();
          lastGridUpdate = timestamp;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentClock.animationType, clockMode]);

  // 5. Hide mouse cursor & dashboard panel in Fullscreen Mode on inactivity
  useEffect(() => {
    if (view !== 'fullscreen') return;

    const handleMouseMove = () => {
      lastMouseMoveRef.current = Date.now();
      setShowControls(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseMove);

    const interval = setInterval(() => {
      if (Date.now() - lastMouseMoveRef.current > 4000) {
        setShowControls(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseMove);
      clearInterval(interval);
    };
  }, [view]);

  // 6. Generate Clock Core API
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !uploadedPhoto) return;

    setIsGenerating(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ambient-clock/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          style: selectedStyle,
          mood: selectedMood,
          city: selectedCity !== "none" ? selectedCity : "",
          uploadedPhotoUrl: uploadedPhoto
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentClock(data);
        setActiveTab("design");
        // Auto start audio if generated sound matches
        if (data.ambientSound && data.ambientSound !== "none") {
          setAudioPlaying(true);
        }
      } else {
        const err = await res.json();
        alert("Failed to generate clock face: " + err.error);
      }
    } catch (err) {
      console.error(err);
      alert("API request failed. Falling back to local styles design.");
    } finally {
      setIsGenerating(false);
    }
  };

  // 7. Remix Clock Core API
  const handleRemix = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remixPrompt.trim()) return;

    setIsRemixing(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ambient-clock/remix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clock: currentClock,
          remixPrompt: remixPrompt
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentClock(data);
        setRemixPrompt("");
      } else {
        alert("Remix failed. Please check logs.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRemixing(false);
    }
  };

  // 8. Save Clock Preset Core API
  const saveClockPreset = async () => {
    setIsSaving(true);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${BACKEND_URL}/api/ambient-clock`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ...currentClock, isPublic: !token }) // default public if guest
      });

      if (res.ok) {
        const saved = await res.json();
        setGalleryClocks([saved, ...galleryClocks]);
        alert("TimeScape saved successfully! You can find it in the Explore Gallery.");
      } else {
        alert("Save failed. Try logging in to save custom clocks permanently.");
      }
    } catch (err) {
      console.error("Save preset error:", err);
      // fallback local storage save
      const savedLocallyStr = localStorage.getItem("local_clocks") || "[]";
      const localClocks = JSON.parse(savedLocallyStr);
      localClocks.unshift({ ...currentClock, id: Math.random().toString(36).substr(2, 9) });
      localStorage.setItem("local_clocks", JSON.stringify(localClocks));
      alert("Saved locally to your browser!");
      fetchClocks();
    } finally {
      setIsSaving(false);
    }
  };

  // 9. Surprise Me generator trigger
  const triggerSurpriseMe = () => {
    const randomPrompt = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    const randomStyle = STYLES_LIBRARY[Math.floor(Math.random() * STYLES_LIBRARY.length)].id;
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)].id;
    
    setPrompt(randomPrompt);
    setSelectedStyle(randomStyle);
    setSelectedMood(randomMood);
  };

  // 10. Photo Upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrompt("");
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedPhoto(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDirectPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result as string;
        
        const newClock: ClockPreset = {
          name: "My Custom Backdrop",
          prompt: "User uploaded background image",
          imageUrl: base64Url,
          style: "Personal",
          mood: "Calm",
          handColor: "#ffffff",
          secondHandColor: "#ff0077",
          dialColor: "#ffffff",
          numeralStyle: "minimal",
          handStyle: "minimal",
          accentColor: "#ffffff",
          ambientSound: "none",
          lore: "A beautiful personal moment framed in ambient time.",
          animationType: "particles"
        };
        
        setCurrentClock(newClock);
        setGalleryClocks(prev => [newClock, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate clock hand coordinates (angles)
  const getHandAngles = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ms = time.getMilliseconds();

    // Smooth sweep angles
    const secondAngle = ((seconds + ms / 1000) * 6) * Math.PI / 180;
    const minuteAngle = ((minutes + seconds / 60) * 6) * Math.PI / 180;
    const hourAngle = (((hours % 12) + minutes / 60) * 30) * Math.PI / 180;

    return { hourAngle, minuteAngle, secondAngle };
  };

  const { hourAngle, minuteAngle, secondAngle } = getHandAngles();

  // SVG coordinates for analog clock hands
  const getHandCoords = (angle: number, length: number) => {
    const x = 200 + length * Math.sin(angle);
    const y = 200 - length * Math.cos(angle);
    return { x, y };
  };

  const hrHand = getHandCoords(hourAngle, 60);
  const minHand = getHandCoords(minuteAngle, 90);
  const secHand = getHandCoords(secondAngle, 105);

  // SVG Dial Tick Marks - themed per handStyle
  const renderDialTicks = () => {
    const ticks: React.ReactNode[] = [];
    const count = currentClock.numeralStyle === "roman" || currentClock.numeralStyle === "arabic" ? 12 : 60;
    const style = currentClock.handStyle;

    for (let i = 0; i < count; i++) {
      const angle = (i * (360 / count)) * Math.PI / 180;
      const angleDeg = i * (360 / count);
      const isMajor = i % (count === 60 ? 5 : 1) === 0;
      const rOuter = 175;

      if (isMajor) {
        const mr = 162; // major marker radius (expanded from 124)
        const mx = 200 + mr * Math.sin(angle);
        const my = 200 - mr * Math.cos(angle);

        if (style === "glowing") {
          // 4-point diamond rune marker (slightly scaled up)
          ticks.push(
            <polygon key={`m${i}`}
              points={`${mx},${my - 8} ${mx + 5},${my} ${mx},${my + 8} ${mx - 5},${my}`}
              fill={currentClock.dialColor} opacity={0.85}
              style={{ filter: `drop-shadow(0 0 6px ${currentClock.dialColor})` }}
            />
          );
        } else if (style === "neon" || style === "cosmic") {
          // Glowing circle dot
          ticks.push(
            <circle key={`m${i}`} cx={mx} cy={my} r={5.5}
              fill={currentClock.dialColor} opacity={0.9}
              style={{ filter: `drop-shadow(0 0 8px ${currentClock.dialColor})` }}
            />
          );
        } else if (style === "fluid") {
          // Organic teardrop aligned to dial
          ticks.push(
            <ellipse key={`m${i}`} cx={mx} cy={my} rx={3.5} ry={7.5}
              fill={currentClock.dialColor} opacity={0.75}
              transform={`rotate(${angleDeg}, ${mx}, ${my})`}
            />
          );
        } else if (style === "wooden") {
          // Rounded pill
          ticks.push(
            <rect key={`m${i}`} x={mx - 3} y={my - 7} width={6} height={14} rx={3}
              fill={currentClock.dialColor} opacity={0.75}
              transform={`rotate(${angleDeg}, ${mx}, ${my})`}
            />
          );
        } else if (style === "metallic") {
          // Thin precision rectangle
          ticks.push(
            <rect key={`m${i}`} x={mx - 2} y={my - 10} width={4} height={20} rx={0}
              fill={currentClock.dialColor} opacity={0.9}
              transform={`rotate(${angleDeg}, ${mx}, ${my})`}
              style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }}
            />
          );
        } else {
          // Default tick line
          const x1 = 200 + rOuter * Math.sin(angle);
          const y1 = 200 - rOuter * Math.cos(angle);
          const x2 = 200 + 155 * Math.sin(angle);
          const y2 = 200 - 155 * Math.cos(angle);
          ticks.push(
            <line key={`m${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={currentClock.dialColor} strokeWidth={2.5} opacity={0.8}
            />
          );
        }
      } else {
        // Minor tick - always a short thin line
        if (currentClock.numeralStyle !== "roman" && currentClock.numeralStyle !== "arabic") {
          const x1 = 200 + rOuter * Math.sin(angle);
          const y1 = 200 - rOuter * Math.cos(angle);
          const x2 = 200 + 167 * Math.sin(angle);
          const y2 = 200 - 167 * Math.cos(angle);
          ticks.push(
            <line key={`t${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={currentClock.dialColor} strokeWidth={1} opacity={0.3}
            />
          );
        }
      }

      // Numerals overlay for roman/arabic
      if (isMajor && (currentClock.numeralStyle === "roman" || currentClock.numeralStyle === "arabic")) {
        const romanNumbers = ["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];
        const arabicNumbers = ["12","1","2","3","4","5","6","7","8","9","10","11"];
        const textRadius = 105;
        const tx = 200 + textRadius * Math.sin(angle);
        const ty = 200 - textRadius * Math.cos(angle) + 4;
        ticks.push(
          <text key={`num-${i}`} x={tx} y={ty} fill={currentClock.dialColor}
            fontSize="12" fontWeight="bold" textAnchor="middle" opacity="0.65"
            className="select-none font-mono"
          >
            {currentClock.numeralStyle === "roman" ? romanNumbers[i] : arabicNumbers[i]}
          </text>
        );
      }
    }
    return ticks;
  };

  // Clock Dial styles for specific themes
  const getHandStyleProps = (style: string) => {
    switch (style) {
      case "wooden":
        return {
          strokeLinecap: "round" as const,
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
        };
      case "neon":
        return {
          strokeLinecap: "round" as const,
          filter: `drop-shadow(0 0 8px ${currentClock.handColor})`
        };
      case "metallic":
        return {
          strokeLinecap: "butt" as const,
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))"
        };
      case "fluid":
        return {
          strokeLinecap: "round" as const,
          filter: `blur(1px) drop-shadow(0 0 6px ${currentClock.accentColor})`
        };
      case "cosmic":
        return {
          strokeLinecap: "round" as const,
          filter: `drop-shadow(0 0 10px ${currentClock.handColor})`
        };
      default: // minimal
        return {
          strokeLinecap: "round" as const
        };
    }
  };

  const handProps = getHandStyleProps(currentClock.handStyle);

  // Time adaptations depending on local hour (City simulation)
  const getCityAdaptations = () => {
    const hour = time.getHours();
    let themeOverlay = "bg-transparent";
    let statusText = "System Synced";

    if (selectedCity !== "none") {
      if (hour >= 5 && hour < 8) {
        themeOverlay = "bg-amber-500/10 backdrop-brightness-105"; // Sunrise
        statusText = "Warm Sunrise Atmosphere";
      } else if (hour >= 8 && hour < 17) {
        themeOverlay = "bg-sky-500/5"; // Afternoon
        statusText = "Brighter Daylight View";
      } else if (hour >= 17 && hour < 20) {
        themeOverlay = "bg-orange-600/15 backdrop-brightness-95"; // Sunset
        statusText = "Golden Hour Active";
      } else {
        themeOverlay = "bg-indigo-950/25 backdrop-brightness-75"; // Night
        statusText = "Ambient Night Mode Glow";
      }
    }
    return { themeOverlay, statusText };
  };

  const { themeOverlay, statusText } = getCityAdaptations();

  return (
    <div className="relative h-full w-full bg-[#050505] text-white overflow-hidden flex flex-col font-sans">
      
      {/* 1. Live Background Wallpaper layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out z-0" 
        style={{ 
          backgroundImage: `url(${currentClock.imageUrl})`,
          filter: `brightness(${view === 'fullscreen' ? 0.75 : 0.95})`
        }} 
      />

      {/* Dynamic environmental shading for live city clocks */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out z-1 pointer-events-none ${themeOverlay}`} />

      {/* 2. Micro-animation Overlay Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-2 pointer-events-none" />

      {/* Header bar (only shown in Studio) */}
      {view === 'studio' && (
        <header className="relative w-full z-10 px-8 py-5 border-b border-white/5 backdrop-blur-md bg-black/30 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
              <ClockIcon size={22} className="text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                Ambient TimeScapes
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">Generative Clock Studio</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                setView('fullscreen');
                setShowControls(true);
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all"
            >
              <Eye size={14} />
              <span>Full Screen</span>
            </button>
            <a 
              href="/experimental-art-modes"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all"
            >
              <ArrowLeft size={18} />
            </a>
          </div>
        </header>
      )}

      {/* MAIN CONTAINER */}
      <div className="relative flex-1 w-full z-10 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        
        {/* LEFT COLUMN: The Clock Display Portal */}
        <div className={`flex-1 flex flex-col items-center justify-center p-6 transition-all duration-1000 ${view === 'fullscreen' ? 'w-full' : 'lg:w-[60%]'}`}>
          
          {/* Clock lore banner */}
          {currentClock.lore && view === 'studio' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mb-8 text-center px-5 py-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md"
            >
              <p className="text-xs italic text-gray-300 leading-relaxed">
                "{currentClock.lore}"
              </p>
            </motion.div>
          )}

          {/* CLOCK PORTAL INNER CONTAINER */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center">
            
            {/* Subtle color glow ring - NO dark fill, clock is transparent on the image */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none" 
              style={{
                boxShadow: `0 0 80px ${currentClock.handColor}18, 0 0 30px ${currentClock.accentColor}10`
              }}
            />

            {/* ANALOG CLOCK MODE */}
            {(clockMode === "analog" || clockMode === "hybrid") && (
              <svg className="w-full h-full z-10 relative" viewBox="0 0 400 400">
                {/* Themed hour markers */}
                {renderDialTicks()}

                 {/* Outer dial ring */}
                <circle cx="200" cy="200" r="178" fill="none"
                  stroke={currentClock.dialColor} strokeWidth="0.5" opacity="0.2"
                />

                {/* Glowing accent pivot ring */}
                <circle cx="200" cy="200" r="26" fill="none"
                  stroke={currentClock.accentColor} strokeWidth="1.5" opacity="0.35"
                  style={{ filter: `drop-shadow(0 0 6px ${currentClock.accentColor})` }}
                />

                {/* ── THEMED HOUR HAND ── */}
                {currentClock.handStyle === "glowing" ? (
                  // Wand - tapered elegant shape, wide at base narrowing to a tip
                  <path
                    d="M200,215 C198.5,202 197,162 197.5,138 C198,124 199,114 200,110 C201,114 202,124 202.5,138 C203,162 201.5,202 200,215 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `drop-shadow(0 0 10px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "neon" ? (
                  // Sharp diamond blade - aggressive point
                  <path
                    d="M200,215 L196,195 L200,110 L204,195 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `drop-shadow(0 0 10px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "cosmic" ? (
                  // Long needle with small orbiting accent circle
                  <g transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}>
                    <line x1="200" y1="215" x2="200" y2="110" stroke={currentClock.handColor} strokeWidth="2.5"
                      style={{ filter: `drop-shadow(0 0 8px ${currentClock.handColor})` }} strokeLinecap="round"
                    />
                    <circle cx="200" cy="135" r="6" fill="none" stroke={currentClock.accentColor} strokeWidth="1.5"
                      style={{ filter: `drop-shadow(0 0 6px ${currentClock.accentColor})` }}
                    />
                  </g>
                ) : currentClock.handStyle === "fluid" ? (
                  // Wide organic blob - like coral or seaweed
                  <path
                    d="M200,215 C196,200 192,165 193,138 C194,122 197,113 200,108 C203,113 206,122 207,138 C208,165 204,200 200,215 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `blur(1.5px) drop-shadow(0 0 8px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "wooden" ? (
                  // Rounded paddle - wide at tip, rounded ends
                  <path
                    d="M197,215 L196,180 C196,160 198,135 200,110 C202,135 204,160 204,180 L203,215 Q200,218 197,215 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.6))' }}
                  />
                ) : currentClock.handStyle === "metallic" ? (
                  // Precision double-line with specular highlight
                  <g transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}>
                    <line x1="200" y1="215" x2="200" y2="110" stroke={currentClock.handColor} strokeWidth="5" strokeLinecap="butt"
                      style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.7))' }}
                    />
                    <line x1="200" y1="212" x2="200" y2="112" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="butt"/>
                  </g>
                ) : (
                  // Minimal clean line
                  <line x1="200" y1="215" x2="200" y2="110"
                    stroke={currentClock.handColor} strokeWidth="3" strokeLinecap="round"
                    transform={`rotate(${(hourAngle * 180) / Math.PI}, 200, 200)`}
                  />
                )}

                {/* ── THEMED MINUTE HAND ── */}
                {currentClock.handStyle === "glowing" ? (
                  <path
                    d="M200,218 C199.2,204 198.5,150 199,112 C199.3,95 199.7,78 200,70 C200.3,78 200.7,95 201,112 C201.5,150 200.8,204 200,218 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `drop-shadow(0 0 8px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "neon" ? (
                  <path
                    d="M200,218 L197.5,195 L200,70 L202.5,195 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `drop-shadow(0 0 8px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "cosmic" ? (
                  <g transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}>
                    <line x1="200" y1="218" x2="200" y2="72" stroke={currentClock.handColor} strokeWidth="2.0"
                      style={{ filter: `drop-shadow(0 0 8px ${currentClock.handColor})` }} strokeLinecap="round"
                    />
                    <circle cx="200" cy="95" r="4.5" fill="none" stroke={currentClock.accentColor} strokeWidth="1.2"
                      style={{ filter: `drop-shadow(0 0 5px ${currentClock.accentColor})` }}
                    />
                  </g>
                ) : currentClock.handStyle === "fluid" ? (
                  <path
                    d="M200,218 C198,202 197,150 197.5,115 C198,95 199,78 200,70 C201,78 202,95 202.5,115 C203,150 202,202 200,218 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: `blur(1px) drop-shadow(0 0 6px ${currentClock.handColor})` }}
                  />
                ) : currentClock.handStyle === "wooden" ? (
                  <path
                    d="M198.5,218 L198,175 C198,145 199,105 200,70 C201,105 202,145 202,175 L201.5,218 Q200,221 198.5,218 Z"
                    fill={currentClock.handColor}
                    transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}
                    style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.5))' }}
                  />
                ) : currentClock.handStyle === "metallic" ? (
                  <g transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}>
                    <line x1="200" y1="218" x2="200" y2="70" stroke={currentClock.handColor} strokeWidth="3.5" strokeLinecap="butt"
                      style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.6))' }}
                    />
                    <line x1="200" y1="215" x2="200" y2="72" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="butt"/>
                  </g>
                ) : (
                  <line x1="200" y1="218" x2="200" y2="70"
                    stroke={currentClock.handColor} strokeWidth="2" strokeLinecap="round"
                    transform={`rotate(${(minuteAngle * 180) / Math.PI}, 200, 200)`}
                  />
                )}

                {/* Second hand - slim sweep with counterweight */}
                <g transform={`rotate(${(secondAngle * 180) / Math.PI}, 200, 200)`}>
                  <line x1="200" y1="230" x2="200" y2="55"
                    stroke={currentClock.secondHandColor} strokeWidth="1.2" strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 5px ${currentClock.secondHandColor})` }}
                  />
                  {/* Counterweight tail */}
                  <circle cx="200" cy="225" r="4" fill={currentClock.secondHandColor}
                    style={{ filter: `drop-shadow(0 0 4px ${currentClock.secondHandColor})` }}
                  />
                </g>

                {/* Center cap with glow */}
                <circle cx="200" cy="200" r="7.5" fill={currentClock.accentColor}
                  style={{ filter: `drop-shadow(0 0 10px ${currentClock.accentColor})` }}
                />
                <circle cx="200" cy="200" r="3" fill="rgba(255,255,255,0.7)" />
              </svg>
            )}


            {/* DIGITAL CLOCK MODE */}
            {(clockMode === "digital" || clockMode === "hybrid") && (
              <div 
                className={`absolute z-10 flex flex-col items-center justify-center font-mono ${clockMode === 'hybrid' ? 'bottom-20' : ''}`}
                style={{ textShadow: `0 0 20px ${currentClock.handColor}50` }}
              >
                <div className="text-4xl sm:text-6xl font-black tracking-widest fill-none" style={{ color: currentClock.handColor }}>
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </div>
                <div className="text-[10px] tracking-[0.25em] text-gray-400 mt-2 uppercase font-semibold">
                  {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}

            {/* ABSTRACT CLOCK MODE: concentric glowing progress rings */}
            {clockMode === "abstract" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-4/5 h-4/5 relative z-10" viewBox="0 0 200 200">
                  {/* Seconds progress circle */}
                  <circle 
                    cx="100" cy="100" r="85" 
                    fill="none" 
                    stroke={`${currentClock.secondHandColor}10`} 
                    strokeWidth="4" 
                  />
                  <circle 
                    cx="100" cy="100" r="85" 
                    fill="none" 
                    stroke={currentClock.secondHandColor} 
                    strokeWidth="4"
                    strokeDasharray="534"
                    strokeDashoffset={534 - (534 * (time.getSeconds() + time.getMilliseconds() / 1000)) / 60}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ filter: `drop-shadow(0 0 5px ${currentClock.secondHandColor})` }}
                  />

                  {/* Minutes progress circle */}
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="none" 
                    stroke={`${currentClock.handColor}10`} 
                    strokeWidth="6" 
                  />
                  <circle 
                    cx="100" cy="100" r="70" 
                    fill="none" 
                    stroke={currentClock.handColor} 
                    strokeWidth="6"
                    strokeDasharray="440"
                    strokeDashoffset={440 - (440 * time.getMinutes()) / 60}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ filter: `drop-shadow(0 0 6px ${currentClock.handColor})` }}
                  />

                  {/* Hours progress circle */}
                  <circle 
                    cx="100" cy="100" r="55" 
                    fill="none" 
                    stroke={`${currentClock.accentColor}20`} 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="100" cy="100" r="55" 
                    fill="none" 
                    stroke={currentClock.accentColor} 
                    strokeWidth="8"
                    strokeDasharray="345"
                    strokeDashoffset={345 - (345 * (time.getHours() % 12)) / 12}
                    strokeLinecap="round"
                    transform="rotate(-90 100 100)"
                    style={{ filter: `drop-shadow(0 0 8px ${currentClock.accentColor})` }}
                  />
                </svg>

                {/* Micro numerical indicator inside progress circles */}
                <div className="absolute flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-bold" style={{ color: currentClock.handColor }}>
                    {String(time.getHours()).padStart(2, '0')}:{String(time.getMinutes()).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-gray-400 mt-1">Evolving Art</span>
                </div>
              </div>
            )}

          </div>

          {/* Clock identity badges - shown when AI has generated clock themes */}
          {(currentClock.handTheme || currentClock.markerTheme || currentClock.pivotTheme) && view === 'studio' && (
            <div className="mt-5 max-w-md w-full z-10">
              <div className="bg-black/50 border border-white/5 backdrop-blur-md rounded-2xl p-3 flex flex-col gap-1.5">
                <p className="text-[9px] uppercase tracking-widest text-indigo-400 font-bold mb-0.5">Generated Clock Identity</p>
                {currentClock.handTheme && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-wider w-14 shrink-0">Hands</span>
                    <span className="text-[9px] text-gray-300 leading-relaxed">{currentClock.handTheme}</span>
                  </div>
                )}
                {currentClock.markerTheme && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-wider w-14 shrink-0">Markers</span>
                    <span className="text-[9px] text-gray-300 leading-relaxed">{currentClock.markerTheme}</span>
                  </div>
                )}
                {currentClock.pivotTheme && (
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-wider w-14 shrink-0">Center</span>
                    <span className="text-[9px] text-gray-300 leading-relaxed">{currentClock.pivotTheme}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick status bar */}
          <div className="mt-5 flex items-center space-x-4 z-10">
            <div className="text-xs bg-black/40 border border-white/5 px-4 py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-md text-gray-300">
              <span className={`w-2.5 h-2.5 rounded-full ${audioPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`} />
              <span>Audio: {SOUNDS.find(s => s.id === currentClock.ambientSound)?.name || "Silent"}</span>
            </div>
            <div className="text-xs bg-black/40 border border-white/5 px-4 py-1.5 rounded-full flex items-center space-x-2 backdrop-blur-md text-gray-300">
              <Compass size={14} className="text-indigo-400" />
              <span>{statusText}</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Studio Dashboard Panel (only shown in Studio view) */}
        {view === 'studio' && (
          <div className="w-full lg:w-[40%] bg-black/50 border-l border-white/5 backdrop-blur-xl overflow-y-auto px-6 py-6 flex flex-col gap-6 scrollbar-thin">
            
            {/* Switch tabs */}
            <div className="grid grid-cols-3 bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setActiveTab("generate")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'generate' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                1. AI Generator
              </button>
              <button 
                onClick={() => setActiveTab("design")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'design' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                2. Design & Dial
              </button>
              <button 
                onClick={() => setActiveTab("gallery")}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'gallery' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                3. Explore Gallery
              </button>
            </div>

            {/* TAB CONTENT: 1. AI GENERATOR */}
            {activeTab === "generate" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-bold flex items-center space-x-2">
                    <Sparkles size={16} className="text-indigo-400" />
                    <span>Generate a Clock Identity</span>
                  </h2>
                  <div className="mt-1.5 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/15">
                    <p className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider mb-1">Not just a background - a whole clock world</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                      Describe any theme - fantasy, architecture, nature, sci-fi. AI generates the entire clock identity: the hands, markers, dial, materials, atmosphere, and soundscape as one cohesive living artwork.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                  
                  {/* Prompt Textarea */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-300">Prompt Idea</label>
                      <button 
                        type="button"
                        onClick={triggerSurpriseMe}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold uppercase tracking-wider flex items-center space-x-1"
                      >
                        <RefreshCw size={10} />
                        <span>Surprise Me</span>
                      </button>
                    </div>
                    <textarea
                      value={prompt}
                      onChange={(e) => {
                        setPrompt(e.target.value);
                        if (e.target.value.trim() !== "") {
                          setUploadedPhoto(null);
                        }
                      }}
                      placeholder='e.g., "Harry Potter magical gothic castle" or "Cyberpunk Tokyo 2AM" or "Deep ocean bioluminescent coral reef"'
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder-gray-500 resize-none"
                    />
                  </div>

                  {/* Aesthetic style presets */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Aesthetic Style Presets</label>
                    <div className="grid grid-cols-2 gap-2">
                      {STYLES_LIBRARY.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => {
                            setSelectedStyle(style.id);
                            // Auto select simple description if empty
                            if (!prompt) {
                              setPrompt(style.name + " aesthetic scenery");
                            }
                          }}
                          className={`p-3 rounded-xl border text-left flex items-start space-x-2.5 transition-all ${
                            selectedStyle === style.id 
                              ? 'bg-indigo-600/25 border-indigo-500 shadow-md' 
                              : 'bg-white/5 border-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-base">{style.icon}</span>
                          <div>
                            <p className="text-xs font-bold">{style.name}</p>
                            <p className="text-[10px] text-gray-400 line-clamp-1">{style.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mood based selectors */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Mood Atmosphere</label>
                    <div className="flex flex-wrap gap-2">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.id}
                          type="button"
                          onClick={() => setSelectedMood(mood.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            selectedMood === mood.id 
                              ? 'bg-indigo-500 border-indigo-400' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                          }`}
                        >
                          {mood.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Upload reference photo */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Reference / Personal Photo (Optional)</label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer flex items-center justify-center space-x-2 bg-white/5 border border-dashed border-white/15 px-4 py-3 rounded-xl hover:bg-white/10 transition-all text-xs font-semibold text-gray-300 flex-1">
                        <Camera size={16} className="text-indigo-400" />
                        <span>Upload Custom Photo</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoUpload} 
                          className="hidden" 
                        />
                      </label>
                      {uploadedPhoto && (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20">
                          <img src={uploadedPhoto} className="w-full h-full object-cover" alt="ref" />
                          <button 
                            type="button"
                            onClick={() => setUploadedPhoto(null)}
                            className="absolute inset-0 bg-red-600/70 opacity-0 hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition-opacity"
                          >
                            DEL
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action submit button */}
                  <button
                    type="submit"
                    disabled={isGenerating || (!prompt.trim() && !uploadedPhoto)}
                    className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/10 flex items-center justify-center space-x-2 text-xs uppercase tracking-wider disabled:opacity-50 transition-all"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Wizzy AI Crafting Your Clock...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Generate Living Art Clock</span>
                      </>
                    )}
                  </button>

                </form>

                {/* Surprise Preset Showcase Quick Access */}
                <div className="mt-2 border-t border-white/5 pt-4">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Or select a Quick Scenery</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setCurrentClock({
                        name: "Scandi Minimal Forest",
                        prompt: "Minimal Scandinavian forest trees in fog",
                        imageUrl: PRESET_BG.nature,
                        style: "Scandinavian",
                        mood: "Calm",
                        handColor: "#e6dfd5",
                        secondHandColor: "#c2b280",
                        dialColor: "#d2c9bd",
                        numeralStyle: "minimal",
                        handStyle: "wooden",
                        accentColor: "#a89f91",
                        ambientSound: "forest",
                        lore: "Breathe in the calm silence of mist floating over the pine forests.",
                        animationType: "fog"
                      })}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 flex items-center space-x-2 text-xs transition-all"
                    >
                      <span className="text-lg">🌲</span>
                      <span className="font-semibold text-gray-300">Zen Woodland</span>
                    </button>
                    <button 
                      onClick={() => setCurrentClock({
                        name: "Neon Cyberpunk Seoul",
                        prompt: "Seoul neon city at night",
                        imageUrl: PRESET_BG.cyberpunk,
                        style: "Cyberpunk",
                        mood: "Creativity",
                        handColor: "#00ffcc",
                        secondHandColor: "#ff0077",
                        dialColor: "#00ffff",
                        numeralStyle: "none",
                        handStyle: "neon",
                        accentColor: "#7000ff",
                        ambientSound: "rain",
                        lore: "Bustling neon grids and smooth electric rain falling down.",
                        animationType: "rain"
                      })}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left border border-white/5 flex items-center space-x-2 text-xs transition-all"
                    >
                      <span className="text-lg">⚡</span>
                      <span className="font-semibold text-gray-300">Seoul Midnight</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 2. DESIGN & DIAL CUSTOMIZER */}
            {activeTab === "design" && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-bold flex items-center space-x-2">
                    <Sliders size={16} className="text-indigo-400" />
                    <span>Dial Designer & Customizer</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Fine-tune the clock dials, hand structures, colors, ambient sound tracks, and animations to match your space perfectly.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  
                  {/* Clock face mode (analog, digital, etc.) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Display Layout Mode</label>
                    <div className="grid grid-cols-4 bg-white/5 p-1 rounded-xl border border-white/5 text-center">
                      {(['analog', 'digital', 'hybrid', 'abstract'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setClockMode(mode)}
                          className={`py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                            clockMode === mode ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live timezone / weather simulator cities */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300">Simulate Live City</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#151515]">{c.name} - {c.desc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Colors parameters */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Hands Color</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={currentClock.handColor} 
                          onChange={(e) => setCurrentClock({ ...currentClock, handColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-xs font-mono uppercase text-gray-300">{currentClock.handColor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Second Hand</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={currentClock.secondHandColor} 
                          onChange={(e) => setCurrentClock({ ...currentClock, secondHandColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-xs font-mono uppercase text-gray-300">{currentClock.secondHandColor}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Dial ticks</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={currentClock.dialColor} 
                          onChange={(e) => setCurrentClock({ ...currentClock, dialColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-xs font-mono uppercase text-gray-300">{currentClock.dialColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customizer: dial style, numerals, hands type */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-300">Clock Hand Style</label>
                      <select
                        value={currentClock.handStyle}
                        onChange={(e) => setCurrentClock({ ...currentClock, handStyle: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="minimal" className="bg-[#151515]">Thin Minimalist</option>
                        <option value="wooden" className="bg-[#151515]">Wooden Organic</option>
                        <option value="neon" className="bg-[#151515]">Neon Holographic</option>
                        <option value="metallic" className="bg-[#151515]">Gold Metallic</option>
                        <option value="fluid" className="bg-[#151515]">Fluid Glowing</option>
                        <option value="cosmic" className="bg-[#151515]">Cosmic Energy</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-300">Numeral Markers</label>
                      <select
                        value={currentClock.numeralStyle}
                        onChange={(e) => setCurrentClock({ ...currentClock, numeralStyle: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="none" className="bg-[#151515]">No Numbers</option>
                        <option value="minimal" className="bg-[#151515]">Minimal Ticks</option>
                        <option value="roman" className="bg-[#151515]">Classic Roman</option>
                        <option value="arabic" className="bg-[#151515]">Standard Arabic</option>
                        <option value="abstract" className="bg-[#151515]">Abstract Marks</option>
                      </select>
                    </div>
                  </div>

                  {/* Micro animation selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-300">Micro-Animation Effect</label>
                      <select
                        value={currentClock.animationType}
                        onChange={(e) => setCurrentClock({ ...currentClock, animationType: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="particles" className="bg-[#151515]">Floating Dust Particles</option>
                        <option value="rain" className="bg-[#151515]">Slow Midnight Rain</option>
                        <option value="stars" className="bg-[#151515]">Twinkling Cosmic Stars</option>
                        <option value="fog" className="bg-[#151515]">Drifting Valley Fog</option>
                        <option value="breathing-gradient" className="bg-[#151515]">Breathing Light Rays</option>
                        <option value="flowing-ink" className="bg-[#151515]">Flowing Cellular Ink</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-300">Ambient Sound Loop</label>
                      <select
                        value={currentClock.ambientSound}
                        onChange={(e) => setCurrentClock({ ...currentClock, ambientSound: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        {SOUNDS.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#151515]">{s.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sound controller */}
                  {currentClock.ambientSound !== "none" && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold">Sound Controls</span>
                        <button 
                          onClick={() => setAudioPlaying(!audioPlaying)}
                          className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all"
                        >
                          {audioPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <VolumeX size={14} className="text-gray-400" />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="flex-1 accent-indigo-500 bg-white/15 h-1 rounded-lg cursor-pointer"
                        />
                        <Volume2 size={14} className="text-gray-400" />
                      </div>
                    </div>
                  )}

                  {/* Evolve / Remix button */}
                  <div className="mt-2 border-t border-white/5 pt-4">
                    <label className="text-xs font-semibold text-gray-300">Evolve & Remix TimeScape</label>
                    <p className="text-[10px] text-gray-400 mt-0.5 mb-2">Provide instructions to morph current scenery colors/artwork.</p>
                    <form onSubmit={handleRemix} className="flex gap-2">
                      <input
                        value={remixPrompt}
                        onChange={(e) => setRemixPrompt(e.target.value)}
                        placeholder="e.g. Make it autumn with falling maple leaves"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="submit"
                        disabled={isRemixing || !remixPrompt.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1 disabled:opacity-50"
                      >
                        {isRemixing ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        <span>Remix</span>
                      </button>
                    </form>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={saveClockPreset}
                    disabled={isSaving}
                    className="w-full mt-4 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider transition-all"
                  >
                    {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} className="text-indigo-400" />}
                    <span>Save to My TimeScapes</span>
                  </button>

                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. EXPLORE GALLERY */}
            {activeTab === "gallery" && (
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-base font-bold flex items-center space-x-2">
                    <Grid size={16} className="text-indigo-400" />
                    <span>Explore Community Clocks</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Discover and activate living time masterpieces designed by the community. Click any card to apply.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  {/* Upload custom image directly card */}
                  <label className="group relative rounded-2xl overflow-hidden aspect-video border border-dashed border-white/10 hover:border-indigo-500/50 bg-white/5 hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center p-3 text-center transition-all duration-300">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all">
                      <Upload size={16} />
                    </div>
                    <span className="text-[10px] font-bold mt-2 text-white group-hover:text-indigo-300">Upload Artwork</span>
                    <span className="text-[8px] text-gray-400">Use custom image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleDirectPhotoUpload} 
                      className="hidden" 
                    />
                  </label>

                  {galleryClocks.length > 0 ? (
                    galleryClocks.map((clock, index) => (
                      <div
                        key={clock.id || index}
                        onClick={() => {
                          setCurrentClock(clock);
                          // Auto start sound if preset contains it
                          if (clock.ambientSound && clock.ambientSound !== "none") {
                            setAudioPlaying(true);
                          }
                        }}
                        className={`group relative rounded-2xl overflow-hidden aspect-video border cursor-pointer hover:scale-[1.03] transition-all duration-300 ${
                          currentClock.name === clock.name 
                            ? 'border-indigo-500 ring-2 ring-indigo-500/50 shadow-md' 
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <img 
                          src={clock.imageUrl} 
                          alt={clock.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                          <p className="text-[10px] font-bold truncate text-white">{clock.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[8px] text-indigo-400 font-semibold uppercase tracking-wider">{clock.style}</span>
                            <span className="text-[8px] text-gray-400 uppercase tracking-widest">{clock.mood}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-white/5 border border-white/5 rounded-2xl text-gray-400 text-[10px] flex items-center justify-center">
                      No saved clocks.
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-violet-950/20 border border-indigo-500/10">
                  <h4 className="text-xs font-bold text-indigo-400 flex items-center space-x-1.5">
                    <Tv size={14} />
                    <span>Displaying on External Screens</span>
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                    TimeScapes fits perfectly on tablet frames, kitchen displays, wall TVs, and monitors. Load fullscreen mode on any device browser and select auto-loop configs!
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 3. FULLSCREEN AMBIENT EXPERIENCE MODE OVERLAY */}
      <AnimatePresence>
        {view === 'fullscreen' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 z-30 flex flex-col justify-between p-8 pointer-events-none transition-all duration-1000 ${
              showControls ? 'bg-black/20' : 'bg-transparent cursor-none'
            }`}
          >
            
            {/* Top Bar controls and Lore subtitle */}
            <div className="w-full flex flex-col gap-4">
              <div className={`w-full flex justify-between items-center pointer-events-auto transition-all duration-700 ${
                showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
              }`}>
                <div className="flex items-center space-x-4 bg-black/40 border border-white/5 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
                    🕰️
                  </div>
                  <div>
                    <h3 className="text-xs font-bold">{currentClock.name}</h3>
                    <p className="text-[9px] text-gray-400 tracking-wider font-mono">
                      TimeScape synchronized • {selectedCity === 'none' ? 'Local' : CITIES.find(c=>c.id===selectedCity)?.name}
                    </p>
                  </div>
                </div>

                {/* Close / Fullscreen toggle buttons */}
                <div className="flex items-center space-x-3">
                  
                  {/* quick sound toggles */}
                  {currentClock.ambientSound !== 'none' && (
                    <button 
                      onClick={() => setAudioPlaying(!audioPlaying)}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all shadow-xl"
                    >
                      {audioPlaying ? <Volume2 size={16} className="text-indigo-400 animate-pulse" /> : <VolumeX size={16} />}
                    </button>
                  )}

                  {/* exit fullscreen */}
                  <button 
                    onClick={() => setView('studio')}
                    className="px-5 py-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xl"
                  >
                    <Minimize2 size={14} />
                    <span>Exit Ambient Mode</span>
                  </button>
                </div>
              </div>

              {/* Lore details (positioned at the top, out of the clock's way) */}
              {currentClock.lore && (
                <div className={`w-full max-w-lg mx-auto text-center transition-all duration-1000 pointer-events-none ${
                  showControls ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  <p className="text-xs italic font-light text-gray-300 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] bg-black/35 px-5 py-2.5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    "{currentClock.lore}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Bar indicators */}
            <div className={`w-full flex justify-between items-center pointer-events-auto transition-all duration-700 ${
              showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              
              {/* layout switcher options in fullscreen */}
              <div className="flex bg-black/40 border border-white/5 backdrop-blur-md p-1 rounded-2xl shadow-xl">
                {(['analog', 'digital', 'hybrid', 'abstract'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setClockMode(mode)}
                    className={`px-3 py-1.5 text-[9px] font-bold rounded-xl uppercase tracking-wider transition-all ${
                      clockMode === mode ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* quick city selection */}
              <div className="flex bg-black/40 border border-white/5 backdrop-blur-md p-1 rounded-2xl shadow-xl space-x-1 mr-36 sm:mr-44">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCity(c.id)}
                    className={`px-3 py-1.5 text-[9px] font-bold rounded-xl uppercase tracking-wider transition-all ${
                      selectedCity === c.id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {c.id === 'none' ? 'Local Time' : c.name.split(' ')[0]}
                  </button>
                ))}
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AmbientClock;
