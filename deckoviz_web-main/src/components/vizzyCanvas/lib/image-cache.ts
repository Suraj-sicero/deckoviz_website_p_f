export interface CachedImage {
  id: string
  image_url: string
  prompt: string
  aspect_ratio: string
  created_at: string
  is_favorited: boolean
}

const CACHE_KEY = 'vizzy_generated_images'

export const imageCache = {
  getAll: () => {
    if (typeof window === 'undefined') return []
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      return cached ? JSON.parse(cached) : []
    } catch (error) {
      console.error('[v0] Error reading image cache:', error)
      return []
    }
  },

  save: (image: CachedImage) => {
    if (typeof window === 'undefined') return
    try {
      const cached = imageCache.getAll()
      // Prevent duplicates
      const filtered = cached.filter((img: CachedImage) => img.id !== image.id)
      filtered.unshift(image)
      // Keep only last 100 images
      localStorage.setItem(CACHE_KEY, JSON.stringify(filtered.slice(0, 100)))
      console.log("[v0] Image saved to cache. Total cached:", filtered.slice(0, 100).length)
    } catch (error) {
      console.error('[v0] Error saving to image cache:', error)
    }
  },

  delete: (imageId: string) => {
    if (typeof window === 'undefined') return
    try {
      const cached = imageCache.getAll()
      const filtered = cached.filter((img: CachedImage) => img.id !== imageId)
      localStorage.setItem(CACHE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('[v0] Error deleting from image cache:', error)
    }
  },

  toggleFavorite: (imageId: string) => {
    if (typeof window === 'undefined') return
    try {
      const cached = imageCache.getAll()
      const updated = cached.map((img: CachedImage) =>
        img.id === imageId ? { ...img, is_favorited: !img.is_favorited } : img
      )
      localStorage.setItem(CACHE_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('[v0] Error toggling favorite:', error)
    }
  },

  clear: () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.error('[v0] Error clearing image cache:', error)
    }
  },
}
