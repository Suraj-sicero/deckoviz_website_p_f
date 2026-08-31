# Static "10 Power Uses" data per vertical.
# Each vertical has exactly 10 items with id (stable slug), title, description.
# This file is the single source of truth for the Power Uses cards.
# Business logic lives in postgres_store.py / services/; route handlers are thin
# and import from here directly (no DB table for this feature).

from typing import Dict, List

HOME_POWER_USES: List[Dict[str, str]] = [
    {
        "id": "personal-art",
        "title": "Personal Art",
        "description": "Turn a feeling, a memory, or a single idea into an original piece of art made just for you. Vizzy asks what's on your mind and builds a piece around it, in whatever style genuinely fits. Never generic, always specific to the moment you brought it.",
        "depth": "deep",
    },
    {
        "id": "dream-decoder-visualiser",
        "title": "Dream Meaning Decoder & Visualiser",
        "description": "Describe a dream, however fragmented, and Vizzy helps you explore what it might mean while turning it into something you can actually see. Half reflection, half art project, entirely personal.",
        "depth": "deep",
    },
    {
        "id": "poster-creator",
        "title": "Poster Creator",
        "description": "From a favourite quote to a movie night to a vision for the year ahead, Vizzy turns the idea into a striking, ready-to-display poster in your style. A quick, satisfying creative win.",
        "depth": "quick",
    },
    {
        "id": "photo-montage-creator",
        "title": "Photo Montage Creator",
        "description": "Bring together a set of photos, a trip, a season, a person, and Vizzy weaves them into a beautiful, narrated montage. Your memories, given a second life.",
        "depth": "quick",
    },
    {
        "id": "storytelling-mode",
        "title": "Storytelling Mode",
        "description": "Turn a memory, an idea, or a passing thought into a story told your way. Vizzy collaborates scene by scene, building the narrative alongside you rather than handing you a finished draft.",
        "depth": "deep",
    },
    {
        "id": "muse-mode",
        "title": "Muse Mode",
        "description": "For when you're stuck, creatively or otherwise. Vizzy becomes a genuine creative sparring partner, offering ideas, angles, and provocations until something clicks.",
        "depth": "deep",
    },
    {
        "id": "creative-mode",
        "title": "Creative Mode",
        "description": "Open-ended co-creation for anything: a poem, a song idea, a sketch concept, a short script. Vizzy meets you wherever the idea starts and helps carry it further.",
        "depth": "deep",
    },
    {
        "id": "vision-goals-board",
        "title": "Vision & Goals Board Creator",
        "description": "Turn your hopes for the year, the month, or a specific goal into a living visual board. Revisited and refined as your goals evolve.",
        "depth": "deep",
    },
    {
        "id": "mood-ambiance-designer",
        "title": "Mood & Ambiance Designer",
        "description": "Describe how you want a room, or an evening, to feel, and Vizzy shapes the visuals, light, and sound to match. Immediate, sensory, and genuinely responsive.",
        "depth": "quick",
    },
    {
        "id": "family-ritual-builder",
        "title": "Family Ritual Builder",
        "description": "Design a recurring family moment, a Sunday wind-down, a birthday tradition, a bedtime story ritual, with Vizzy helping shape it and then automate it going forward.",
        "depth": "deep",
    },
]

ENTERPRISE_POWER_USES: List[Dict[str, str]] = [
    {
        "id": "art-creator",
        "title": "Art Creator",
        "description": "Generate original, on-brand artwork for your walls, restaurant-themed, location-themed, or tied to a specific campaign. Vizzy works from your brand context automatically.",
        "depth": "quick",
    },
    {
        "id": "loops-creator",
        "title": "Loops Creator",
        "description": "Build a looping ambient visual sequence for a specific space or moment, a lunch service, a lobby, a slow evening. Set once, runs beautifully on its own.",
        "depth": "quick",
    },
    {
        "id": "dish-product-visual-creator",
        "title": "Dish or Product Visual Creator",
        "description": "Turn a quick phone photo into professional, campaign-ready photography in seconds. No photographer, no reshoot needed.",
        "depth": "quick",
    },
    {
        "id": "menu-offerings-poster-creator",
        "title": "Menu & Offerings Poster Creator",
        "description": "Build or refresh a menu, specials board, or offerings display instantly. Updated the moment something changes, no reprinting.",
        "depth": "quick",
    },
    {
        "id": "guest-keepsake-creator",
        "title": "Guest Keepsake Creator",
        "description": "Design a personalised memento for a guest, a table portrait, a stay recap, something they'll actually want to keep and share.",
        "depth": "quick",
    },
    {
        "id": "seasonal-campaign-creator",
        "title": "Seasonal Campaign Creator",
        "description": "Build a full seasonal or occasion-based visual campaign, holidays, promotions, launches, from concept to finished assets in one session.",
        "depth": "deep",
    },
    {
        "id": "brand-storytelling-creator",
        "title": "Brand Storytelling Creator",
        "description": "Turn your history, legacy, or founding story into a visual piece worth displaying, chef's philosophy, property heritage, ingredient origin.",
        "depth": "deep",
    },
    {
        "id": "ambiance-mode-designer",
        "title": "Ambiance Mode Designer",
        "description": "Design a specific mood for a space, romantic, energetic, calm, celebratory, combining visuals, light, and sound into one coordinated setting.",
        "depth": "quick",
    },
    {
        "id": "short-video-creator",
        "title": "Short Video Creator",
        "description": "Build a short, story-driven video, the journey behind a dish, a room, or a brand moment, ready for in-space display or social sharing.",
        "depth": "deep",
    },
    {
        "id": "guest-recognition-builder",
        "title": "Guest Recognition Moment Builder",
        "description": "Design what happens when a returning guest is recognised, a subtle visual cue, a personalised touch, tailored to your brand's tone.",
        "depth": "deep",
    },
]

SCHOOLS_POWER_USES: List[Dict[str, str]] = [
    {
        "id": "personalised-testing",
        "title": "Start Personalised Testing",
        "description": "Launch an AI-guided evaluation calibrated to a student's level, with teacher-set feedback timing and a detailed analysis at the end.",
        "audience": "teacher",
        "depth": "deep",
    },
    {
        "id": "learning-poster-creator",
        "title": "Create a Learning-Themed Poster",
        "description": "Turn a concept, formula, or historical moment into a striking, classroom-ready reference poster in seconds.",
        "audience": "both",
        "depth": "quick",
    },
    {
        "id": "explain-concept-visually",
        "title": "Explain a Concept, Visually",
        "description": "Give Vizzy a topic that isn't landing, and it builds a live, visual explanation tailored to how the student actually learns.",
        "audience": "student",
        "depth": "quick",
    },
    {
        "id": "creative-session",
        "title": "Start a Creative Session",
        "description": "Begin a co-creation session, a poem, a story, a piece of art, with Vizzy coaching rather than producing on the student's behalf.",
        "audience": "student",
        "depth": "deep",
    },
    {
        "id": "learning-session",
        "title": "Start a Learning Session",
        "description": "Kick off a full interactive lesson on any topic, teacher-led or Vizzy-led, generating visuals and material as the discussion unfolds.",
        "audience": "both",
        "depth": "deep",
    },
    {
        "id": "narration-video-creator",
        "title": "Create a Narration or Video",
        "description": "Turn a lesson, story, or concept into a narrated visual sequence or short video, ready to play in class.",
        "audience": "both",
        "depth": "quick",
    },
    {
        "id": "study-plan-builder",
        "title": "Build a Study Plan",
        "description": "Vizzy maps out a personalised study plan based on a student's goals, current level, and upcoming assessments.",
        "audience": "student",
        "depth": "deep",
    },
    {
        "id": "life-skills-session",
        "title": "Start a Life Skills Session",
        "description": "Choose from 50+ structured courses, emotional intelligence, financial literacy, critical thinking, and more, and Vizzy picks up right where the last session left off.",
        "audience": "student",
        "depth": "deep",
    },
    {
        "id": "time-place-journey",
        "title": "Immersive Time & Place Journey",
        "description": "Step into a historical moment, a scientific process, or a literary setting as a first-person, explorable visual experience.",
        "audience": "both",
        "depth": "deep",
    },
    {
        "id": "group-learning-session",
        "title": "Group Learning Session",
        "description": "Start a facilitated session for a small group, Vizzy balances participation and keeps the whole group building on each other's thinking.",
        "audience": "teacher",
        "depth": "deep",
    },
]

POWER_USES_BY_VERTICAL: Dict[str, List[Dict[str, str]]] = {
    "home": HOME_POWER_USES,
    "enterprise": ENTERPRISE_POWER_USES,
    "schools": SCHOOLS_POWER_USES,
}

# Convenience alias matching spec's vertical keys exactly.
POWER_USES = POWER_USES_BY_VERTICAL
