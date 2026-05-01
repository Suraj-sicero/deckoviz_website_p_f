import re

file_path = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/components/tools/CreativeStudio.tsx"

with open(file_path, "r") as f:
    content = f.read()

# 1. Add import
content = content.replace('import { Link } from "react-router-dom";', 'import { Link } from "react-router-dom";\nimport { CreditSystemModal } from "./CreditSystem";')

# 2. Add creditCost to toolCategories (using regex or simple replace)
# We can just replace the whole array since it's hardcoded.

new_categories = """const toolCategories = [
  {
    id: "audio-story",
    label: "Audio & Story Creation",
    emoji: "🎙️",
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    tools: [
      {
        id: "audiobook",
        title: "Audiobook Creator",
        description: "Upload any PDF and transform it into a rich, listenable audiobook with natural AI voice narration.",
        icon: "🎧",
        route: "/tools/audiobook",
        badge: "Live",
        accent: "violet",
        creditCost: "5 credits / hr",
      },
      {
        id: "visual-audiobook",
        title: "Visual Audiobook",
        description: "PDF to scene-by-scene visual audiobook with AI narration and synchronized illustrations.",
        icon: "🎬",
        route: "/tools/visual-audiobook",
        badge: "New",
        accent: "violet",
        creditCost: "10 credits / hr",
      },
      {
        id: "storybook",
        title: "Storybook Creator",
        description: "Type your story idea and watch Gemini craft illustrated pages with vivid AI-generated artwork.",
        icon: "📖",
        route: "/tools/storybook",
        badge: "Beta",
        accent: "purple",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "short-story",
        title: "Short Story Generator",
        description: "Describe an idea — Gemini writes a complete, engaging short story in your chosen genre.",
        icon: "✍️",
        route: "/tools/short-story",
        badge: "New",
        accent: "purple",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "comic",
        title: "Comic Book Creator",
        description: "Turn your story idea into a panel-by-panel comic with scene descriptions and AI illustrations.",
        icon: "💥",
        route: "/tools/comic",
        badge: "New",
        accent: "purple",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "storybook-studio",
        title: "Storybook Studio",
        description: "Create a storybook then edit any page text and regenerate individual illustrations.",
        icon: "🎨",
        route: "/tools/storybook-studio",
        badge: "New",
        accent: "violet",
        creditCost: "5 credits / 10 pages",
      },
    ],
  },
  {
    id: "personal-expression",
    label: "Personal Expression & Memory",
    emoji: "🖼️",
    color: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    tools: [
      {
        id: "visual-journal",
        title: "Visual Journal",
        description: "Write your thoughts, feelings and mood — Vizzy converts them into personalized AI visual art cards.",
        icon: "🌸",
        route: "/tools/visual-journal",
        badge: "Live",
        accent: "pink",
        creditCost: "2 credits / entry",
      },
      {
        id: "greeting-card",
        title: "Greeting Card Creator",
        description: "Create personalized, heartfelt greeting cards with AI-written messages and matching visuals.",
        icon: "💌",
        route: "/tools/greeting-card",
        badge: "New",
        accent: "pink",
        creditCost: "2 credits / card",
      },
      {
        id: "life-book",
        title: "Life Book",
        description: "Transform your memories into beautifully organised chapters of your life story.",
        icon: "📔",
        route: "/tools/life-book",
        badge: "New",
        accent: "pink",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "visual-book",
        title: "Visual Book Creator",
        description: "Upload your photos — Gemini creates captions and weaves them into a visual narrative story.",
        icon: "📸",
        route: "/tools/visual-book",
        badge: "New",
        accent: "pink",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "postcard",
        title: "Before & After Postcard",
        description: "Transform your business space — create high-quality before/after postcards with Deckoviz frames.",
        icon: "🎴",
        route: "/tools/postcard",
        badge: "New",
        accent: "pink",
        creditCost: "2 credits / card",
      },
    ],
  },
  {
    id: "sound-music",
    label: "Sound & Music",
    emoji: "🎵",
    color: "from-cyan-500 to-teal-600",
    bg: "from-cyan-50 to-teal-50",
    border: "border-cyan-200",
    tools: [
      {
        id: "music",
        title: "Music Creator",
        description: "Describe a mood or scene and let Vizzy compose an original AI music track just for you.",
        icon: "🎼",
        route: "/tools/music",
        badge: "Beta",
        accent: "cyan",
        creditCost: "5 credits / 5 mins",
      },
      {
        id: "song",
        title: "Personalized Song Creator",
        description: "Generate custom lyrics and an original song dedicated to someone special.",
        icon: "🎤",
        route: "/tools/song",
        badge: "New",
        accent: "cyan",
        creditCost: "5 credits / 5 mins",
      },
    ],
  },
  {
    id: "learning",
    label: "Learning & Education",
    emoji: "📘",
    color: "from-blue-500 to-indigo-600",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    tools: [
      {
        id: "learning-book",
        title: "Visual Learning Book",
        description: "Convert any topic into a structured, illustrated learning guide with chapters and key points.",
        icon: "📘",
        route: "/tools/learning-book",
        badge: "New",
        accent: "blue",
        creditCost: "5 credits / 10 pages",
      },
      {
        id: "learning-portal",
        title: "Learning Portal",
        description: "Chat with Vizzy AI tutor — get explanations, interactive quizzes, and a learning roadmap.",
        icon: "🎓",
        route: "/tools/learning-portal",
        badge: "New",
        accent: "blue",
        creditCost: "10 credits / hr",
      },
    ],
  },
  {
    id: "daily",
    label: "Daily Inspiration",
    emoji: "🌅",
    color: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    tools: [
      {
        id: "daily",
        title: "Daily Inspiration Engine",
        description: "Get your daily dose — quote, poem, book recommendation, and movie pick — all themed and visual.",
        icon: "🌅",
        route: "/tools/daily",
        badge: "New",
        accent: "amber",
        creditCost: "1 credit / day",
      },
    ],
  },
];"""

content = re.sub(r'const toolCategories = \[.*?\];', new_categories, content, flags=re.DOTALL)

# 3. ToolCardProps
content = content.replace('index: number;', 'index: number;\n  creditCost: string;')

content = content.replace('index,\n}) => {', 'index,\n  creditCost,\n}) => {')

# 4. ToolCard Content
content = content.replace('<p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>', '<p className="text-sm text-gray-500 leading-relaxed mb-3">{description}</p>\n        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100/80 backdrop-blur text-gray-600 text-xs font-bold mb-5 border border-gray-200">\n          <span>🪙</span> {creditCost}\n        </div>')

# 5. ToolCard instantiation
content = content.replace('index={idx}\n                  />', 'index={idx}\n                    creditCost={tool.creditCost}\n                  />')

# 6. Component State
content = content.replace('const [mousePos, setMousePos] = useState({ x: 0, y: 0 });', 'const [mousePos, setMousePos] = useState({ x: 0, y: 0 });\n  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);\n  const [credits, setCredits] = useState(120);')

# 7. Hero CTAs
old_hero_cta = """          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#tools"
              className="px-8 py-4 rounded-2xl text-white font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
              }}
            >
              🚀 Start Creating
            </a>
            <a
              href="#tools"
              className="px-8 py-4 rounded-2xl font-bold text-base border-2 border-purple-200 text-purple-700 bg-white/70 backdrop-blur hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105"
            >
              🔭 Explore Tools
            </a>
          </div>"""

new_hero_cta = """          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#tools"
              className="px-8 py-4 rounded-2xl text-white font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)",
                boxShadow: "0 8px 32px rgba(124,58,237,0.35)",
              }}
            >
              🚀 Start Creating
            </a>
            <button
              onClick={() => setIsCreditModalOpen(true)}
              className="px-8 py-4 rounded-2xl font-bold text-base border-2 border-purple-200 text-purple-700 bg-white/70 backdrop-blur hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <span className="text-xl">🪙</span> {credits} Credits
            </button>
          </div>"""
content = content.replace(old_hero_cta, new_hero_cta)

# 8. Footer CTA
old_footer_cta = """            <a
              href="#tools"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold text-base hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              ✨ Start Creating Now
            </a>"""

new_footer_cta = """            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-purple-700 font-bold text-base hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                ✨ Start Creating Now
              </a>
              <button
                onClick={() => setIsCreditModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-purple-800/80 text-white font-bold text-base hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                🪙 Top Up Credits
              </button>
            </div>"""
content = content.replace(old_footer_cta, new_footer_cta)

# 9. Add modal at the end
content = content.replace('    </div>\n  );\n};\n\nexport default CreativeStudio;', '      <CreditSystemModal \n        isOpen={isCreditModalOpen} \n        onClose={() => setIsCreditModalOpen(false)} \n        credits={credits}\n        onRecharge={(amount) => {\n          setCredits(prev => prev + amount);\n        }}\n      />\n    </div>\n  );\n};\n\nexport default CreativeStudio;')

with open(file_path, "w") as f:
    f.write(content)
