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

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  images?: GeneratedImage[]
  uploadedImages?: UploadedImage[]
  music?: MusicTrack[]
  isLoading?: boolean
  error?: string
  timestamp: number
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
