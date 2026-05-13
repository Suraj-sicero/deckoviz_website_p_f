import type { SuggestionCategory } from "@/lib/types"

export const HOME_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: "personal-painter",
    label: "Personal Painter",
    icon: "palette",
    mode: "home",
    suggestions: [
      "Paint something that feels like how my last year felt",
      "Create a dreamlike version of a childhood memory",
      "Show me my inner emotional landscape right now",
      "Create an abstract artwork that represents growth and change",
    ],
  },
  {
    id: "photo-reimagination",
    label: "Photo Reimagination",
    icon: "camera",
    mode: "home",
    suggestions: [
      "Turn this photo into a renaissance-style oil painting",
      "Reimagine this scene in a Studio Ghibli anime style",
      "Transform this portrait into a pop art masterpiece",
      "Create a watercolor version of this landscape photo",
    ],
  },
  {
    id: "vision-boards",
    label: "Moodboards & Vision",
    icon: "layout",
    mode: "home",
    suggestions: [
      "Make a vision board with my goals for the next 3 years",
      "Create a moodboard for a calm, minimal living room",
      "Design an aesthetic collage for my travel bucket list",
      "Build a style board for a bohemian wedding theme",
    ],
  },
  {
    id: "stories-books",
    label: "Stories & Storybooks",
    icon: "book",
    mode: "home",
    suggestions: [
      "Generate a story for my kids, then visualize it scene by scene",
      "Create a 4-panel comic strip about a space adventure",
      "Illustrate a bedtime story about a brave little fox",
      "Design a storybook cover for a magical underwater world",
    ],
  },
  {
    id: "quotes-posters",
    label: "Quotes & Posters",
    icon: "type",
    mode: "home",
    suggestions: [
      "Help me design a quote poster for my living room",
      "Turn this poem into a beautiful visual artwork",
      "Create a motivational affirmation poster in gold and black",
      "Design a minimalist poster with my favorite lyrics",
    ],
  },
  {
    id: "style-transfer",
    label: "Style Transfer & Art",
    icon: "wand",
    mode: "home",
    suggestions: [
      "Create a Van Gogh Starry Night version of a city skyline",
      "Generate an art deco illustration of a jazz musician",
      "Paint a surrealist landscape inspired by Dali",
      "Design a Japanese ukiyo-e style illustration of a koi pond",
    ],
  },
  {
    id: "sketch-enhance",
    label: "Sketch Enhancement",
    icon: "pencil",
    mode: "home",
    suggestions: [
      "Turn my rough sketch into a polished digital illustration",
      "Enhance this doodle into a professional logo concept",
      "Transform my pencil drawing into a vibrant painting",
      "Render this wireframe sketch as a photorealistic scene",
    ],
  },
  {
    id: "symbolic-abstract",
    label: "Symbolic & Abstract",
    icon: "sparkles",
    mode: "home",
    suggestions: [
      "Visualize the concept of time as an abstract artwork",
      "Create a symbolic representation of resilience and hope",
      "Design an abstract piece using sacred geometry patterns",
      "Generate a fractal-inspired artwork in deep ocean colors",
    ],
  },
]

export const BUSINESS_SUGGESTIONS: SuggestionCategory[] = [
  {
    id: "brand-artwork",
    label: "Brand Artwork",
    icon: "badge",
    mode: "business",
    suggestions: [
      "Generate a brand-themed artwork using our values and colors",
      "Create premium-looking visuals that feel luxurious but approachable",
      "Design an artistic brand identity piece for social media",
      "Create a series of on-brand abstract visuals for our website",
    ],
  },
  {
    id: "marketing",
    label: "Marketing Materials",
    icon: "megaphone",
    mode: "business",
    suggestions: [
      "Create a sale poster that looks premium, not cheap",
      "Design a seasonal campaign visual for summer collection",
      "Generate an email hero banner for our product launch",
      "Create eye-catching social media visuals for our new line",
    ],
  },
  {
    id: "product-photo",
    label: "Product Photography",
    icon: "camera",
    mode: "business",
    suggestions: [
      "Show this dish as indulgent but refined for a menu card",
      "Create an Apple-style minimal product shot on white",
      "Generate a lifestyle product photo with natural lighting",
      "Design a flat lay composition for our skincare products",
    ],
  },
  {
    id: "signage",
    label: "Signage & Displays",
    icon: "monitor",
    mode: "business",
    suggestions: [
      "Generate signage for a slow-moving menu item",
      "Design in-store visuals for rainy days to boost mood",
      "Create digital display artwork for our restaurant entrance",
      "Design a welcome sign for our hotel lobby display",
    ],
  },
  {
    id: "seasonal",
    label: "Seasonal & Events",
    icon: "calendar",
    mode: "business",
    suggestions: [
      "Design a seasonal ambiance visual for cozy evenings",
      "Create holiday-themed decorations for our storefront",
      "Generate event posters for our anniversary celebration",
      "Design a festive visual for our winter menu launch",
    ],
  },
  {
    id: "memento",
    label: "Custom Mementos",
    icon: "gift",
    mode: "business",
    suggestions: [
      "Create a memento artwork for a couple celebrating their anniversary",
      "Design a personalized thank-you visual for loyal customers",
      "Generate a commemorative poster for a business milestone",
      "Create a custom guest appreciation artwork",
    ],
  },
  {
    id: "campaign",
    label: "Campaign Ideation",
    icon: "lightbulb",
    mode: "business",
    suggestions: [
      "Brainstorm 4 visual concepts for a new brand campaign",
      "Create ad visuals for a health-conscious food line",
      "Design before/after transformation visuals for our service",
      "Generate A/B test variations for our hero image",
    ],
  },
  {
    id: "video-loops",
    label: "Visual Loops & Video",
    icon: "play",
    mode: "business",
    suggestions: [
      "Create an Apple-esque product video loop concept",
      "Design a cinemagraph-style visual for our storefront display",
      "Generate a seamless looping background for our digital menu",
      "Create a motion graphics concept for our social reels",
    ],
  },
]

export function getAllSuggestions(mode: "home" | "business"): SuggestionCategory[] {
  return mode === "home" ? HOME_SUGGESTIONS : BUSINESS_SUGGESTIONS
}
