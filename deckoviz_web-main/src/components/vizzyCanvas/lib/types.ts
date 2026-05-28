export interface GeneratedImage {
  url: string
  prompt: string
  seed?: number
  isUploaded?: boolean
  uploadedAt?: number
}

export interface MusicTrack {
  id: string
  title: string
  audioUrl?: string
  prompt: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  createdAt: number
}

export interface VideoClip {
  id: string
  requestId: string
  model: string
  videoUrl?: string
  prompt: string
  sourceImageUrl?: string
  status: 'in_queue' | 'in_progress' | 'completed' | 'failed'
  createdAt: number
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  images?: GeneratedImage[]
  uploadedImages?: UploadedImage[]
  music?: MusicTrack[]
  videos?: VideoClip[]
  isLoading?: boolean
  error?: string
  timestamp: number
  // Vizzy 2.0 — agentic metadata (transparent to the user, available for dev tooling)
  agentUsed?: string   // e.g. 'personal_artist', 'curator', 'vizzy_muse'
  intent?: string      // e.g. 'art_creation', 'ambiance_curation', 'storytelling'
}

export interface UploadedImage {
  id: string
  url: string
  fileName: string
  fileSize: number
  uploadedAt: number
}

export type CreativeMode = "home" | "business"

export interface SuggestionCategory {
  id: string
  label: string
  icon: string
  mode: CreativeMode
  suggestions: string[]
}
