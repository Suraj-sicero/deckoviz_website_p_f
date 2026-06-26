/* ── Enterprise Webapp – shared mock data ── */

export const enterpriseProfile = {
  name: "The Grand Metropolitan",
  subtitle: "Luxury Hotel & Residences",
  location: "London, United Kingdom",
  avatar: "/images/deckoviz-space-labs-icon.png",
  banner: "/images/webapp/figma/profile-banner.jpg",
  units: 48,
  activeFrames: 124,
  collections: 37,
  upcomingEvents: 8,
};

export const dashboardStats = [
  { label: "Active Frames", value: "124", delta: "+3 today", color: "#3b82f6" },
  { label: "Collections", value: "37", delta: "+2 this week", color: "#8b5cf6" },
  { label: "Upcoming Events", value: "8", delta: "Next in 2h", color: "#f59e0b" },
  { label: "Media Assets", value: "2,461", delta: "+58 this month", color: "#10b981" },
];

export const unitsList = [
  { id: 1, name: "Grand Lobby", frames: 6, status: "active", collection: "Impressionist Masters" },
  { id: 2, name: "Sky Lounge", frames: 4, status: "active", collection: "Abstract Horizons" },
  { id: 3, name: "Restaurant Azura", frames: 8, status: "active", collection: "Mediterranean Dreams" },
  { id: 4, name: "Penthouse Suite A", frames: 3, status: "scheduled", collection: "Modern Portraits" },
  { id: 5, name: "Spa & Wellness", frames: 5, status: "active", collection: "Nature Serenity" },
  { id: 6, name: "Conference Room 1", frames: 2, status: "paused", collection: "Corporate Elegance" },
  { id: 7, name: "Garden Terrace", frames: 4, status: "active", collection: "Botanical Art" },
  { id: 8, name: "Executive Boardroom", frames: 3, status: "active", collection: "Minimalist Focus" },
];

export const upcomingEvents = [
  { id: 1, title: "Wine & Art Evening", date: "2025-07-15", time: "19:00", collection: "Impressionist Masters", recurring: false },
  { id: 2, title: "Morning Zen Lobby", date: "2025-07-16", time: "06:00", collection: "Nature Serenity", recurring: true, frequency: "Daily" },
  { id: 3, title: "Corporate Mixer", date: "2025-07-18", time: "17:30", collection: "Corporate Elegance", recurring: false },
  { id: 4, title: "Weekend Jazz Ambiance", date: "2025-07-19", time: "20:00", collection: "Abstract Horizons", recurring: true, frequency: "Weekly" },
  { id: 5, title: "Sunset Gallery Night", date: "2025-07-20", time: "18:00", collection: "Mediterranean Dreams", recurring: false },
];

export const sampleCollections = [
  { id: 1, title: "Impressionist Masters", description: "Curated selection of impressionist-style AI art inspired by Monet, Renoir, and Degas.", count: 24, cover: "/images/webapp/figma/spiral-ocean.jpg" },
  { id: 2, title: "Abstract Horizons", description: "Bold abstract landscapes with vibrant gradients and geometric forms.", count: 18, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
  { id: 3, title: "Mediterranean Dreams", description: "Warm coastal scenes, terracotta tones, and sunlit architecture.", count: 32, cover: "/images/webapp/figma/aurora-lake.jpg" },
  { id: 4, title: "Nature Serenity", description: "Calming nature scenes for wellness and relaxation spaces.", count: 21, cover: "/images/webapp/nature_garden.png" },
  { id: 5, title: "Modern Portraits", description: "Contemporary portrait art blending realism with digital aesthetics.", count: 15, cover: "/images/webapp/vibrant_face_art.png" },
  { id: 6, title: "Corporate Elegance", description: "Sophisticated, minimal artwork designed for professional environments.", count: 12, cover: "/images/webapp/minimalistic_night.png" },
  { id: 7, title: "Botanical Art", description: "Lush botanical illustrations and floral compositions.", count: 28, cover: "/images/webapp/digital_plants.png" },
  { id: 8, title: "City Reflections", description: "Urban cityscapes with dramatic lighting and reflections.", count: 19, cover: "/images/webapp/city_fire_reflection.png" },
];

export const frequentGuests = [
  { id: 1, name: "Alexandra Chen", photo: "/images/webapp/figma/artist-1.jpg", preferences: "Prefers abstract art, ambient jazz", notes: "VIP — Suite 1201 regular" },
  { id: 2, name: "Marcus Williams", photo: "/images/webapp/figma/artist-2.jpg", preferences: "Nature scenes, classical music", notes: "Anniversary visit every June" },
  { id: 3, name: "Sophia Laurent", photo: "/images/webapp/figma/artist-3.jpg", preferences: "Modern portraits, lo-fi beats", notes: "Interior designer — sends referrals" },
  { id: 4, name: "James Hartley", photo: "/images/webapp/figma/artist-4.jpg", preferences: "Minimalist, silence preferred", notes: "Board member — quarterly stay" },
  { id: 5, name: "Priya Sharma", photo: "/images/webapp/figma/artist-1.jpg", preferences: "Botanical art, Indian classical", notes: "Spa package regular" },
  { id: 6, name: "Robert Tanaka", photo: "/images/webapp/figma/artist-2.jpg", preferences: "City art, electronic ambient", notes: "Business traveler — monthly" },
];

export const dailyQueueCollections = [
  { id: 1, collection: "Impressionist Masters", startTime: "06:00", endTime: "10:00", unit: "Grand Lobby" },
  { id: 2, collection: "Nature Serenity", startTime: "10:00", endTime: "14:00", unit: "Spa & Wellness" },
  { id: 3, collection: "Abstract Horizons", startTime: "14:00", endTime: "18:00", unit: "Sky Lounge" },
  { id: 4, collection: "Mediterranean Dreams", startTime: "18:00", endTime: "22:00", unit: "Restaurant Azura" },
  { id: 5, collection: "Corporate Elegance", startTime: "08:00", endTime: "18:00", unit: "Conference Room 1" },
];

export const musicPieces = [
  { id: 1, title: "Ambient Sunrise", duration: "3:42", genre: "Ambient", createdAt: "2025-06-20" },
  { id: 2, title: "Jazz Lounge Evening", duration: "4:15", genre: "Jazz", createdAt: "2025-06-18" },
  { id: 3, title: "Ocean Whispers", duration: "5:01", genre: "Nature", createdAt: "2025-06-15" },
  { id: 4, title: "Corporate Focus", duration: "3:30", genre: "Electronic", createdAt: "2025-06-12" },
  { id: 5, title: "Garden Meditation", duration: "6:20", genre: "Wellness", createdAt: "2025-06-10" },
];

export const narrationVoices = [
  "Emily — Warm British",
  "James — Deep American",
  "Aria — Soft French",
  "Kai — Calm Japanese",
  "Sofia — Elegant Italian",
  "Oliver — Classic British",
  "Maya — Energetic Indian",
  "Liam — Friendly Irish",
];

export const savedTemplates = [
  { id: 1, title: "Welcome Guest Message", category: "Hospitality", lastEdited: "2025-06-24" },
  { id: 2, title: "Event Announcement", category: "Marketing", lastEdited: "2025-06-22" },
  { id: 3, title: "Spa Experience Brief", category: "Wellness", lastEdited: "2025-06-20" },
  { id: 4, title: "Art Collection Overview", category: "Content", lastEdited: "2025-06-18" },
  { id: 5, title: "Social Media Caption Pack", category: "Marketing", lastEdited: "2025-06-16" },
];

export const vgcAgents = [
  { name: "Art Creator", icon: "🎨", description: "Generate stunning AI artworks and visuals", color: "#3b82f6" },
  { name: "Poster Designer", icon: "📐", description: "Create professional posters and signage", color: "#8b5cf6" },
  { name: "Copy Writer", icon: "✍️", description: "Craft compelling copy for any purpose", color: "#f59e0b" },
  { name: "Music Composer", icon: "🎵", description: "Generate ambient music and soundscapes", color: "#10b981" },
  { name: "Video Editor", icon: "🎬", description: "Create and edit short-form videos", color: "#ef4444" },
  { name: "Campaign Planner", icon: "📊", description: "Plan and strategize marketing campaigns", color: "#ec4899" },
  { name: "Narration Studio", icon: "🎙️", description: "Generate voiceovers with AI narrators", color: "#06b6d4" },
];

export const libraryCategories = {
  art: [
    { title: "Renaissance Revival", count: 120, cover: "/images/webapp/figma/spiral-ocean.jpg" },
    { title: "Pop Art Collection", count: 85, cover: "/images/webapp/vibrant_face_art.png" },
    { title: "Japanese Ukiyo-e", count: 64, cover: "/images/webapp/figma/aurora-lake.jpg" },
    { title: "Surrealist Dreams", count: 92, cover: "/images/webapp/figma/abstract-wave-wide.jpg" },
  ],
  photos: [
    { title: "Urban Architecture", count: 200, cover: "/images/webapp/city_fire_reflection.png" },
    { title: "Nature Landscapes", count: 340, cover: "/images/webapp/nature_garden.png" },
    { title: "Macro Photography", count: 156, cover: "/images/webapp/digital_plants.png" },
    { title: "Aerial Views", count: 88, cover: "/images/webapp/minimalistic_night.png" },
  ],
  posters: [
    { title: "Motivational Quotes", count: 75, cover: "/images/webapp/figma/violin-art.jpg" },
    { title: "Event Templates", count: 44, cover: "/images/webapp/figma/interior-tech.jpg" },
    { title: "Holiday Specials", count: 62, cover: "/images/webapp/figma/boat-pond.jpg" },
    { title: "Brand Signage", count: 38, cover: "/images/webapp/abstract_landscape.png" },
  ],
};
