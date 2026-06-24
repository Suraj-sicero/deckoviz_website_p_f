import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  Sparkles,
  History,
  Plus,
  Send,
  ChevronRight,
  Image as ImageIcon,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Tv,
  Compass,
  Sliders,
  Smile,
  Save,
  HelpCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { StaticFilmCreator } from "./StaticFilmCreator";
import { ImageMontageCreator } from "./ImageMontageCreator";
import { SongVisualsCreator } from "./SongVisualsCreator";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com");

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  imageUrl?: string;
  imageDescription?: string;
}

interface Session {
  id: string;
  featureName: string | null;
  status: string;
  context: {
    importantContributions?: string;
    emotionalContext?: string;
    narrativeContext?: string;
  };
  progress: {
    activeStage?: string;
    completedStages?: string[];
    nextStep?: string;
  };
  updatedAt?: string;
}

const ALL_FEATURES = [
  // CREATIVE
  { category: "Creative", mood: "Creative", name: "Co-Written Story", icon: "✍️", desc: "Collaborate on a narrative where our lines intertwine." },
  { category: "Creative", mood: "Creative", name: "Writing Room", icon: "🚪", desc: "Enter a deep focus zone with prompts and writing sprints." },
  { category: "Creative", mood: "Creative", name: "Novella Workshop", icon: "📚", desc: "Formulate characters, outline chapters, and write a novella." },
  { category: "Creative", mood: "Creative", name: "Short Story Sprint", icon: "⏱️", desc: "Fast-paced session to get a short story written in 15 minutes." },
  { category: "Creative", mood: "Creative", name: "Poem In Conversation", icon: "📜", desc: "Exchange thoughts and feelings to weave a co-written poem." },
  { category: "Creative", mood: "Creative", name: "Visual Book", icon: "📖", desc: "Illustrate and write a narrative book companion." },
  { category: "Creative", mood: "Creative", name: "Persona Workshop", icon: "🎭", desc: "Build out custom character profiles for creative writing." },

  // REFLECTIVE
  { category: "Reflective", mood: "Reflective", name: "Daily Page", icon: "☀️", desc: "A morning/evening check-in to clear your mind and log your day." },
  { category: "Reflective", mood: "Reflective", name: "Prompted Journal", icon: "💭", desc: "Answer deep philosophical prompts to explore your inner landscape." },
  { category: "Reflective", mood: "Reflective", name: "Life Inventory", icon: "🗂️", desc: "Catalog major events, learnings, and phases of your journey." },
  { category: "Reflective", mood: "Reflective", name: "Time Capsule", icon: "🏺", desc: "Store thoughts, letters, and visions for your future self." },
  { category: "Reflective", mood: "Reflective", name: "Memory Gallery", icon: "🖼️", desc: "Recall core memories and render them into visual artifacts." },
  { category: "Reflective", mood: "Reflective", name: "Slow Letter", icon: "✉️", desc: "Craft thoughtful letters to someone you care about." },
  { category: "Reflective", mood: "Reflective", name: "Unsent Message", icon: "📤", desc: "Speak what is unsaid in a safe, unmailed creative workspace." },
  { category: "Reflective", mood: "Reflective", name: "Fear Drawer", icon: "🔒", desc: "A quiet space to name and unpack anxieties without judgment." },
  { category: "Reflective", mood: "Reflective", name: "Parallel Lives", icon: "🛣️", desc: "Explore alternate paths and choices you might have taken." },
  { category: "Reflective", mood: "Reflective", name: "Cultural Excavation", icon: "🔍", desc: "Unearth the books, art, and music that shaped your mind." },
  { category: "Reflective", mood: "Reflective", name: "Identity Map", icon: "🗺️", desc: "Chart your values, traits, and emerging desires." },

  // VISUAL CREATION
  { category: "Visual Creation", mood: "Creative", name: "Mood Canvas", icon: "🎨", desc: "Describe a complex emotion to see it rendered as abstract art." },
  { category: "Visual Creation", mood: "Creative", name: "Dream Artwork", icon: "🌙", desc: "Describe a dream and bring it to life as surreal visual art." },
  { category: "Visual Creation", mood: "Creative", name: "Conversation Artwork", icon: "💬", desc: "Generate a visual representation of our current conversation." },
  { category: "Visual Creation", mood: "Creative", name: "Duo Artwork", icon: "👥", desc: "Combine two contrasting concepts into a single visual composition." },
  { category: "Visual Creation", mood: "Creative", name: "Sound To Image", icon: "🎵", desc: "Select or describe a soundscape and paint it visually." },
  { category: "Visual Creation", mood: "Creative", name: "Comic Strip Journal", icon: "💥", desc: "Turn your day into an illustrated multi-panel comic layout." },
  { category: "Visual Creation", mood: "Creative", name: "Visual Journal", icon: "🌸", desc: "Create visual entries based on your daily reflections." },

  // IDEATION
  { category: "Ideation", mood: "Productive", name: "Idea Lab", icon: "⚡", desc: "Brainstorm concepts, troubleshoot roadblocks, and spark ideas." },
  { category: "Ideation", mood: "Productive", name: "Horizon Session", icon: "🌅", desc: "Look forward to your next goals and detail action steps." },
  { category: "Ideation", mood: "Productive", name: "Project War Room", icon: "⚔️", desc: "Map out key milestones, strategies, and challenges." },
  { category: "Ideation", mood: "Productive", name: "Manifesto Builder", icon: "📜", desc: "Draft a clear declaration of principles for your life or project." },
  { category: "Ideation", mood: "Curious", name: "Thought Experiment Engine", icon: "🧠", desc: "Explore ethical or philosophical scenarios through dialogue." },

  // CURATION
  { category: "Curation", mood: "Curious", name: "Curation Conversation", icon: "🏛️", desc: "Refine what displays on your Deckoviz frame based on your taste." },
  { category: "Curation", mood: "Curious", name: "Aesthetic Interrogation", icon: "🕵️", desc: "Unpack exactly why you find certain styles beautiful." },
  { category: "Curation", mood: "Curious", name: "Morning Brief", icon: "📰", desc: "Start your day with customized quotes, tasks, and reflections." },

  // SOLO GAMES
  { category: "Solo Games", mood: "Playful", name: "Oracle", icon: "🔮", desc: "Pose a question to a wise, cryptic conversational Oracle." },
  { category: "Solo Games", mood: "Playful", name: "Heist", icon: "🕵️‍♂️", desc: "Lead an interactive text adventure planning a daring museum heist." },
  { category: "Solo Games", mood: "Playful", name: "Mythmaker", icon: "🐉", desc: "Build a brand new mythology, pantheon, and creation story." },
  { category: "Solo Games", mood: "Playful", name: "Time Traveller's Notebook", icon: "🕰️", desc: "Document your travels through historical eras as a time traveller." },
  { category: "Solo Games", mood: "Playful", name: "Sensory Description Challenge", icon: "👁️", desc: "Describe rich sensory scenes and try to guess Vizzy's secret word." },

  // GROUP EXPERIENCES
  { category: "Group Experiences", mood: "Playful", name: "Exquisite Corpse", icon: "📝", desc: "A turn-based writing game where each player adds to a story." },
  { category: "Group Experiences", mood: "Playful", name: "Verdict", icon: "⚖️", desc: "Debate a scenario and have Vizzy act as the ultimate judge." },
  { category: "Group Experiences", mood: "Playful", name: "World They Left Behind", icon: "⏳", desc: "Cooperatively explore the relics of a vanished society." },
  { category: "Group Experiences", mood: "Playful", name: "Portrait Session", icon: "📸", desc: "Vizzy interviews a group to generate a collective visual profile." },
  { category: "Group Experiences", mood: "Playful", name: "Memory Clash", icon: "💥", desc: "Compare memories of the same event to weave a shared history." },

  // RITUALS
  { category: "Rituals", mood: "Reflective", name: "Ritual Maker", icon: "🕯️", desc: "Design a personal, repeatable ritual for focus, rest, or creativity." },
  { category: "Rituals", mood: "Reflective", name: "Gratitude Architecture", icon: "🏛️", desc: "Construct a digital monument built out of your gratitudes." },
  { category: "Rituals", mood: "Curious", name: "Inspiration Drop", icon: "💧", desc: "Receive a curated micro-dose of inspiration for immediate action." },
  { category: "Rituals", mood: "Reflective", name: "Lullaby Forge", icon: "💤", desc: "Draft a soothing bedtime story or spoken lullaby sequence." }
];

const ConversationalStudio: React.FC = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"lobby" | "studio">("lobby");
  
  // Special Features Integration
  const [activeSpecialFeature, setActiveSpecialFeature] = useState<"film_creator" | "montage_creator" | "song_visuals_creator" | null>(null);
  const [showCoreFeaturesDropdown, setShowCoreFeaturesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation filters
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [frameSuccessMessage, setFrameSuccessMessage] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside the core features dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCoreFeaturesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch past sessions
  const fetchSessions = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/vizzy-studio/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error("Failed to load VCS sessions", err);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [token]);

  useEffect(() => {
    if (activeTab === "studio") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  // Start feature session
  const startSession = async (featureName: string) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/vizzy-studio/sessions/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ featureName })
      });
      if (res.ok) {
        const sessionData = await res.json();
        setActiveSession(sessionData);
        setMessages([]);
        setActiveTab("studio");

        // Send first prompt automatically to boot the feature onboarding
        await handleSendMessage(`Let's start the ${featureName} experience.`, sessionData.id, featureName);
      }
    } catch (err) {
      console.error("Failed to start session", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Restore existing session
  const resumeSession = async (session: Session) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/vizzy-studio/sessions/${session.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setActiveSession(data);
        setMessages(data.messages || []);
        setActiveTab("studio");
      }
    } catch (err) {
      console.error("Failed to load session history", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
  const handleSendMessage = async (text: string, currentSessionId?: string, featureName?: string) => {
    const sId = currentSessionId || activeSession?.id;
    if (!sId || !token) return;

    const userMessage: Message = { role: "user", content: text };
    if (!currentSessionId) {
      setMessages(prev => [...prev, userMessage]);
      setInput("");
    }
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/vizzy-studio/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId: sId,
          userInput: text,
          featureName: featureName || activeSession?.featureName
        })
      });

      if (res.ok) {
        const data = await res.json();
        setActiveSession({
          id: data.sessionId,
          featureName: data.featureName,
          status: data.status,
          context: data.context,
          progress: data.progress
        });
        setMessages(data.messages || []);
        fetchSessions(); // refresh lobby list
      }
    } catch (err) {
      console.error("Chat error", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send image to Frame
  const sendToFrame = (imageUrl: string) => {
    setFrameSuccessMessage("Artwork queued! Pushed successfully to your Deckoviz Living Frame.");
    setTimeout(() => setFrameSuccessMessage(null), 5000);
  };

  // Filter features
  const filteredFeatures = ALL_FEATURES.filter(f => {
    if (selectedMood && f.mood !== selectedMood) return false;
    if (selectedCategory && f.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className={`bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-fuchsia-600 selection:text-white ${
      activeSpecialFeature ? "h-screen overflow-hidden" : "min-h-screen overflow-x-hidden"
    }`}>
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 via-indigo-900/5 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-slate-900/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">Conversational Studio</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Vizzy creative suite</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Core Features Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowCoreFeaturesDropdown(!showCoreFeaturesDropdown)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <span>Some Core Features</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showCoreFeaturesDropdown ? "rotate-90" : ""}`} />
            </button>

            {showCoreFeaturesDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-white/5">
                <div className="p-2 space-y-1">
                  <p className="px-3 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Generative Video</p>
                  <button
                    onClick={() => {
                      setActiveSpecialFeature("film_creator");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-fuchsia-400 font-bold transition-all"
                  >
                    🎬 Static Image Film Creator
                  </button>
                  <button
                    onClick={() => {
                      setActiveSpecialFeature("montage_creator");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-indigo-400 font-bold transition-all"
                  >
                    🎞️ Image Montage Video Creator
                  </button>
                  <button
                    onClick={() => {
                      setActiveSpecialFeature("song_visuals_creator");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-indigo-400 font-bold transition-all"
                  >
                    🎵 Song with Visuals Creator
                  </button>
                </div>

                <div className="p-2 space-y-1">
                  <p className="px-3 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Commonly Used Tools</p>
                  <button
                    onClick={() => {
                      startSession("Co-Written Story");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-slate-100 transition-all"
                  >
                    ✍️ Co-Written Story
                  </button>
                  <button
                    onClick={() => {
                      startSession("Daily Page");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-slate-100 transition-all"
                  >
                    ☀️ Daily Page
                  </button>
                  <button
                    onClick={() => {
                      startSession("Mood Canvas");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-slate-100 transition-all"
                  >
                    🎨 Mood Canvas
                  </button>
                  <button
                    onClick={() => {
                      startSession("Oracle");
                      setShowCoreFeaturesDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-xs text-slate-300 hover:text-slate-100 transition-all"
                  >
                    🔮 Oracle
                  </button>
                </div>
              </div>
            )}
          </div>

          {activeTab === "studio" && activeSession && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeSession.featureName || "Lobby"}
              </span>
              <button
                onClick={() => {
                  setActiveTab("lobby");
                  setActiveSession(null);
                  setMessages([]);
                }}
                className="text-xs font-bold text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              >
                Exit Studio
              </button>
            </div>
          )}

          {activeSpecialFeature && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {activeSpecialFeature === "film_creator" ? "Static Film Creator" : activeSpecialFeature === "montage_creator" ? "Image Montage Creator" : "Song Visuals Creator"}
              </span>
              <button
                onClick={() => {
                  setActiveSpecialFeature(null);
                  setActiveTab("lobby");
                }}
                className="text-xs font-bold text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              >
                Exit Feature
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {activeSpecialFeature === "film_creator" ? (
          <StaticFilmCreator
            onClose={() => {
              setActiveSpecialFeature(null);
              setActiveTab("lobby");
            }}
            backendUrl={BACKEND_URL}
            token={token || ""}
          />
        ) : activeSpecialFeature === "montage_creator" ? (
          <ImageMontageCreator
            onClose={() => {
              setActiveSpecialFeature(null);
              setActiveTab("lobby");
            }}
            backendUrl={BACKEND_URL}
            token={token || ""}
          />
        ) : activeSpecialFeature === "song_visuals_creator" ? (
          <SongVisualsCreator
            onClose={() => {
              setActiveSpecialFeature(null);
              setActiveTab("lobby");
            }}
            backendUrl={BACKEND_URL}
            token={token || ""}
          />
        ) : activeTab === "lobby" ? (
          <div className="flex-1 max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
            {/* Sidebar with Sessions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm tracking-wide uppercase text-slate-400 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Creative Sessions
                  </h3>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {sessions.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs leading-relaxed">
                      No previous sessions. Start a new experience from the grid.
                    </div>
                  ) : (
                    sessions.map(s => (
                      <button
                        key={s.id}
                        onClick={() => resumeSession(s)}
                        className="w-full text-left p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all flex flex-col gap-1 group"
                      >
                        <span className="font-semibold text-sm text-slate-200 group-hover:text-fuchsia-400 transition-colors">
                          {s.featureName || "Incomplete Session"}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          Stage: {s.progress?.activeStage || "Initiation"}
                        </span>
                        <span className="text-[10px] text-slate-400 italic line-clamp-1 mt-1">
                          {s.context?.emotionalContext && `Mood: ${s.context.emotionalContext}`}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Creative Guidance */}
              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-purple-500/10 rounded-3xl p-6">
                <h4 className="font-bold text-sm text-slate-200 flex items-center gap-1.5 mb-2">
                  <HelpCircle className="w-4.5 h-4.5 text-fuchsia-400" />
                  What is this?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conversational Studio holds 50 sub-features and rituals designed to spark creativity, reflect, or paint worlds in real time. Choose any experience and Vizzy will guide you through the creative stages.
                </p>
              </div>
            </div>

            {/* Feature explorer */}
            <div className="lg:col-span-3 space-y-8">
              {/* Welcome text */}
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Vizzy Creative Workspace
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                  "Hello. I'm Vizzy - I live inside your Deckoviz frame, and I've been waiting for something interesting to happen. This is the Studio: a space where we can write, create, play, dream, build, and make things together."
                </p>
              </div>

              {/* Mood filters */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" /> Filter by Mood
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Creative", "Reflective", "Curious", "Productive", "Playful"].map(mood => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        selectedMood === mood
                          ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg shadow-fuchsia-600/20"
                          : "bg-slate-900/60 border-white/5 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filters */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" /> Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Creative",
                    "Reflective",
                    "Visual Creation",
                    "Ideation",
                    "Curation",
                    "Solo Games",
                    "Group Experiences",
                    "Rituals"
                  ].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedCategory === cat
                          ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                          : "bg-slate-900/60 border-white/5 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of features */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredFeatures.map(f => (
                  <div
                    key={f.name}
                    className="group bg-slate-900/40 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/80 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                        {f.icon}
                      </div>
                      <h4 className="font-bold text-slate-200 text-base mb-1.5 group-hover:text-fuchsia-400 transition-colors">
                        {f.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {f.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {f.category}
                      </span>
                      <button
                        onClick={() => startSession(f.name)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                      >
                        Enter Studio <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Split studio workspace */
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Side-panel state monitor */}
            <div className="w-full lg:w-[350px] border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-900/20 p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Active Workspace</h3>
                <h2 className="text-lg font-black text-slate-100">{activeSession?.featureName}</h2>
                <p className="text-xs text-slate-500">Continuous context sync enabled</p>
              </div>

              {/* Progress Stage */}
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4.5 space-y-3">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Active Phase
                </p>
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 text-xs font-bold capitalize">
                    {activeSession?.progress?.activeStage || "Active Mode"}
                  </div>
                </div>
                {activeSession?.progress?.nextStep && (
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Next target</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeSession.progress.nextStep}</p>
                  </div>
                )}
              </div>

              {/* Extracted Context */}
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4.5 space-y-4">
                <p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5" /> Core Context & Mood
                </p>

                {activeSession?.context?.emotionalContext && (
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">User Mood</p>
                    <p className="text-xs text-slate-300 capitalize">{activeSession.context.emotionalContext}</p>
                  </div>
                )}

                {activeSession?.context?.importantContributions && (
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Key Contributions</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeSession.context.importantContributions}</p>
                  </div>
                )}

                {activeSession?.context?.narrativeContext && (
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Narrative Log</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeSession.context.narrativeContext}</p>
                  </div>
                )}
              </div>

              {/* Session Control */}
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-4.5 space-y-3">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" /> Continuity Save
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your progress is captured on every exchange. You can safely return to this feature from the Lobby menu anytime.
                </p>
              </div>
            </div>

            {/* Chat core workspace */}
            <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
              {/* Frame Alert banner */}
              {frameSuccessMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/90 border border-emerald-500/30 text-white font-semibold text-xs px-5 py-3 rounded-full backdrop-blur flex items-center gap-2 shadow-2xl animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  {frameSuccessMessage}
                </div>
              )}

              {/* Messages feed */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[80%] space-y-3.5">
                      <div
                        className={`px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-lg ${
                          m.role === "user"
                            ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-tr-md"
                            : "bg-white/5 border border-white/10 text-slate-100 rounded-tl-md"
                        }`}
                      >
                        <div className="whitespace-pre-line">
                          {m.content}
                        </div>
                      </div>

                      {/* AI Generated image payload */}
                      {m.imageUrl && (
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group max-w-md bg-slate-900/60 p-2">
                          <img
                            src={m.imageUrl}
                            alt="Vizzy generated artwork"
                            className="rounded-2xl w-full object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500"
                          />
                          {m.imageDescription && (
                            <p className="text-xs text-slate-400 leading-relaxed p-3 italic">
                              "{m.imageDescription}"
                            </p>
                          )}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              onClick={() => sendToFrame(m.imageUrl!)}
                              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white shadow-xl flex items-center gap-1.5 transition-all"
                            >
                              <Tv className="w-3.5 h-3.5" /> Send to Frame
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-3xl rounded-tl-md shadow-md">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-white/5 bg-slate-900/20 backdrop-blur-md">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim() || isLoading) return;
                    handleSendMessage(input.trim());
                  }}
                  className="flex gap-3 max-w-4xl mx-auto"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Contribute your part of the experience..."
                    disabled={isLoading}
                    className="flex-1 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" /> Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConversationalStudio;
