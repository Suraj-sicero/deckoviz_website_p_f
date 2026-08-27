/** Sample images already shipped under public/blogs — no upload pipeline. */
export const SAMPLE_DISPLAY_IMAGES = [
  { id: "blog-cities", name: "Greatest Cities", path: "/blogs/100-greatest-cities.png" },
  { id: "blog-fiction", name: "Greatest Fiction", path: "/blogs/100-greatest-fiction.png" },
  { id: "blog-songs", name: "Greatest Songs", path: "/blogs/100-greatest-songs.png" },
  { id: "blog-nature", name: "Wonders of Nature", path: "/blogs/100-greatest-wonders-nature.png" },
  { id: "blog-abstract", name: "Abstract Prompts", path: "/blogs/abstract-prompts.jpg" },
  { id: "blog-ai-art", name: "AI and Art", path: "/blogs/ai-and-art.png" },
  { id: "blog-story", name: "Art of Storytelling", path: "/blogs/art-of-storytelling.png" },
  { id: "blog-structures", name: "Beautiful Structures", path: "/blogs/beautiful-structures.jpg" },
  { id: "blog-home", name: "Home Inspiration", path: "/blogs/home-inspiration.jpg" },
  { id: "blog-paintings", name: "Iconic Paintings", path: "/blogs/iconic-paintings.jpg" },
  { id: "blog-philosophy", name: "Philosophy Space", path: "/blogs/philosophy-space.jpg" },
  { id: "blog-golden", name: "Golden Age", path: "/blogs/golden-age.jpg" },
] as const;

export function absoluteSampleUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).href;
}
