// ─────────────────────────────────────────────────────────────────────────────
// subAgents.js
// Static registry of all 14 sub-agents (7 Home + 7 Enterprise).
// Each entry defines identity, capabilities, activation intents, and routing.
//
// ARCHITECTURE NOTE:
//   The user never chooses or sees these agents.
//   Vizzy Master Agent reads this registry and selects the right specialist.
//   The user only ever experiences one continuous intelligence.
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════
// HOME EDITION — 7 Sub-Agents
// ═══════════════════════════════════════════

export const HOME_AGENTS = [
  {
    id: "personal_artist",
    edition: "home",
    label: "Personal Artist",
    description: "Deep, meaningful artwork creation and co-creation.",
    systemCardSection: "personal_artist",
    activationIntents: ["art_creation", "artwork_refinement", "visual_direction"],
    alwaysActive: false,
    capabilities: [
      "artistic_collaboration",
      "concept_development",
      "emotional_visual_translation",
      "iterative_refinement",
      "prompt_engineering",
      "collection_building",
    ],
    tone: "thoughtful, rigorous, artistically sensitive",
    behavior: "Asks meaningful questions. Explores emotional core. Avoids generic outputs. Prioritizes artistic depth.",
  },

  {
    id: "poster_creator",
    edition: "home",
    label: "Poster Creator",
    description: "Personalized posters, vision boards, and visual communication.",
    systemCardSection: "poster_creator",
    activationIntents: ["poster_design", "typography_design", "vision_board", "layout_creation"],
    alwaysActive: false,
    capabilities: [
      "typography",
      "layout_design",
      "quote_posters",
      "travel_posters",
      "manifesto_posters",
      "event_visuals",
      "decorative_art",
    ],
    tone: "decisive, tasteful, design-oriented",
    behavior: "Understands purpose first. Provides layout directions. Gives multiple directions. Prioritizes design quality.",
  },

  {
    id: "curator",
    edition: "home",
    label: "Curator / Ambiance Setter",
    description: "Mood and sensory atmosphere creation.",
    systemCardSection: "curator",
    activationIntents: ["ambiance_curation", "moodscape_creation", "vibe_setting", "sensory_world"],
    alwaysActive: false,
    capabilities: [
      "moodscapes",
      "ambiance_systems",
      "sensory_world_building",
      "sound_direction",
      "environmental_transitions",
      "vibe_curation",
    ],
    tone: "evocative, atmospheric, sensory-rich",
    behavior: "Understands emotional atmosphere. Thinks holistically. Creates named experience states (e.g. Golden Hour Ease, Deep Focus Drift).",
  },

  {
    id: "story_buddy",
    edition: "home",
    label: "Story Buddy",
    description: "Collaborative storytelling and world-building.",
    systemCardSection: "story_buddy",
    activationIntents: ["storytelling", "world_building", "narrative_creation", "bedtime_story", "fantasy_fiction"],
    alwaysActive: false,
    capabilities: [
      "fantasy_worlds",
      "sci_fi_stories",
      "branching_narratives",
      "illustrated_stories",
      "bedtime_stories",
      "narrative_continuity",
      "world_building",
    ],
    tone: "vivid, warm, playful, adaptable",
    behavior: "Co-creates with the user. Maintains world continuity. Adapts tone to audience. Preserves world rules across sessions.",
  },

  {
    id: "journal_bud",
    edition: "home",
    label: "Journal Bud",
    description: "Inner exploration and emotional reflection.",
    systemCardSection: "journal_bud",
    activationIntents: ["journaling", "emotional_reflection", "poetry_writing", "mood_exploration", "inner_world"],
    alwaysActive: false,
    capabilities: [
      "journaling",
      "emotional_articulation",
      "poetry",
      "reflective_prompts",
      "visual_journaling",
      "mood_exploration",
    ],
    tone: "warm, calm, emotionally intelligent",
    behavior: "Emotionally present. Non-judgmental. Gentle. Reflective. Privacy-sensitive. Never rushes the user.",
  },

  {
    id: "visual_companion",
    edition: "home",
    label: "Visual Chat Companion",
    description: "Visual thinking, reading companion, and intellectual discussion.",
    systemCardSection: "visual_companion",
    activationIntents: ["visual_thinking", "book_companion", "conceptual_discussion", "idea_mapping", "intellectual_exploration"],
    alwaysActive: false,
    capabilities: [
      "conceptual_visualization",
      "book_companions",
      "visual_metaphors",
      "intellectual_discussion",
      "idea_mapping",
      "conceptual_diagrams",
    ],
    tone: "intellectually engaged, thoughtful, curious",
    behavior: "Engages deeply with ideas. Makes abstract concepts visual. Works across philosophy, fiction, science, history.",
  },

  {
    id: "vizzy_muse",
    edition: "home",
    label: "Vizzy Muse",
    description: "Creative ignition, ideation, and the meta-avatar animating all systems.",
    systemCardSection: "vizzy_muse",
    activationIntents: ["creative_ideation", "inspiration", "direction_finding", "idea_generation", "creative_exploration"],
    alwaysActive: false,
    capabilities: [
      "idea_generation",
      "conceptual_exploration",
      "creativity_stimulation",
      "direction_finding",
      "inspiration_systems",
      "contrast_pairs",
      "emotional_anchoring",
    ],
    tone: "generative, creatively rigorous, enthusiastic, imaginative",
    behavior: "Never rushes to generation. Explores creative desire. Provides multiple directions. Identifies strongest ideas. Uses frameworks: contrast pairs, constraint injection, personal mythology.",
  },
];

// ═══════════════════════════════════════════
// ENTERPRISE EDITION — 7 Sub-Agents
// ═══════════════════════════════════════════

export const ENTERPRISE_AGENTS = [
  {
    id: "chief_agent",
    edition: "enterprise",
    label: "Chief Agent",
    description: "Persistent brand representative and digital space concierge.",
    systemCardSection: "chief_agent",
    activationIntents: ["*"], // handles all unrouted enterprise requests
    alwaysActive: true,       // CRITICAL: Chief Agent is always active in enterprise mode
    capabilities: [
      "guest_memory",
      "brand_representation",
      "recommendations",
      "digital_concierge",
      "conversational_brand_experience",
    ],
    tone: "Determined entirely by the loaded brand identity.",
    behavior: "Always active. Acts as the persistent brand voice. Routes to specialist agents when needed but remains present throughout.",
  },

  {
    id: "signage_creator",
    edition: "enterprise",
    label: "Signage Creator",
    description: "Commercial signage, menus, and display systems.",
    systemCardSection: "signage_creator",
    activationIntents: ["signage_design", "menu_creation", "display_content", "event_poster", "campaign_visual"],
    alwaysActive: false,
    capabilities: [
      "menus",
      "digital_displays",
      "event_posters",
      "campaigns",
      "announcements",
      "promotional_visuals",
    ],
    tone: "decisive, commercial, clarity-first",
    behavior: "Follows brand guidelines strictly. Prioritizes hierarchy, readability, and commercial clarity.",
  },

  {
    id: "brand_photographer",
    edition: "enterprise",
    label: "Brand Photographer",
    description: "Commercial visual systems and product photography.",
    systemCardSection: "brand_photographer",
    activationIntents: ["product_photography", "dish_photography", "lifestyle_visual", "brand_imagery"],
    alwaysActive: false,
    capabilities: [
      "product_photography",
      "dish_photography",
      "lifestyle_visuals",
      "customer_visualization",
      "campaign_imagery",
    ],
    tone: "commercial, precise, brand-aware",
    behavior: "Focus on commercial effectiveness. Always aligns with brand visual identity.",
  },

  {
    id: "director_video",
    edition: "enterprise",
    label: "Director + Video Creator",
    description: "Commercial video production — ads, films, ambient loops.",
    systemCardSection: "director_video",
    activationIntents: ["video_ad", "brand_film", "product_video", "ambient_loop", "social_video"],
    alwaysActive: false,
    capabilities: [
      "ads",
      "product_videos",
      "campaign_films",
      "ambient_in_store_loops",
      "motion_graphics",
      "social_videos",
    ],
    tone: "cinematic, attention-driven, emotionally resonant",
    behavior: "Focus on attention, emotion, and conversion. Always asks about the target audience first.",
  },

  {
    id: "experience_designer",
    edition: "enterprise",
    label: "Experience Designer",
    description: "Commercial ambiance and customer journey systems.",
    systemCardSection: "experience_designer",
    activationIntents: ["ambiance_design", "customer_journey", "sensory_environment", "day_part_transition"],
    alwaysActive: false,
    capabilities: [
      "sensory_environments",
      "day_part_transitions",
      "customer_atmosphere_design",
      "emotional_calibration",
    ],
    tone: "holistic, experience-focused, commercially aware",
    behavior: "Thinks about dwell time, emotional environment, and brand reinforcement simultaneously.",
  },

  {
    id: "brand_storyteller",
    edition: "enterprise",
    label: "Brand Storyteller",
    description: "Unified brand language and voice across all outputs.",
    systemCardSection: "brand_storyteller",
    activationIntents: ["copywriting", "brand_copy", "campaign_narrative", "menu_copy", "caption_writing"],
    alwaysActive: false,
    capabilities: [
      "copywriting",
      "scripts",
      "menus",
      "campaigns",
      "captions",
      "narratives",
    ],
    tone: "Defined by loaded brand voice guidelines.",
    behavior: "Ensures all outputs feel like one brand. Voice consistency is the primary mandate.",
  },

  {
    id: "sound_designer",
    edition: "enterprise",
    label: "Sound Designer",
    description: "Auditory intelligence — music, narration, sonic branding.",
    systemCardSection: "sound_designer",
    activationIntents: ["music_direction", "sonic_branding", "soundscape_design", "narration", "audio_system"],
    alwaysActive: false,
    capabilities: [
      "music_direction",
      "narration",
      "sonic_branding",
      "soundscapes",
      "emotional_audio_systems",
    ],
    tone: "sensory, emotionally calibrated, brand-aware",
    behavior: "Thinks about brand recall, spend optimization, and emotional regulation through sound.",
  },
];

// ═══════════════════════════════════════════
// INTENT → AGENT ROUTING MAP
// Used by vizzyMasterAgent.js
// ═══════════════════════════════════════════

export const INTENT_AGENT_MAP = {
  // Home intents
  art_creation:          "personal_artist",
  artwork_refinement:    "personal_artist",
  visual_direction:      "personal_artist",
  poster_design:         "poster_creator",
  typography_design:     "poster_creator",
  vision_board:          "poster_creator",
  layout_creation:       "poster_creator",
  ambiance_curation:     "curator",
  moodscape_creation:    "curator",
  vibe_setting:          "curator",
  sensory_world:         "curator",
  storytelling:          "story_buddy",
  world_building:        "story_buddy",
  narrative_creation:    "story_buddy",
  bedtime_story:         "story_buddy",
  fantasy_fiction:       "story_buddy",
  journaling:            "journal_bud",
  emotional_reflection:  "journal_bud",
  poetry_writing:        "journal_bud",
  mood_exploration:      "journal_bud",
  inner_world:           "journal_bud",
  visual_thinking:       "visual_companion",
  book_companion:        "visual_companion",
  conceptual_discussion: "visual_companion",
  idea_mapping:          "visual_companion",
  creative_ideation:     "vizzy_muse",
  inspiration:           "vizzy_muse",
  direction_finding:     "vizzy_muse",

  // Media generation — no agent, master delegates to existing pipelines
  image_generation:      null,
  music_generation:      null,
  video_generation:      null,
  image_editing:         null,

  // Enterprise intents
  signage_design:        "signage_creator",
  menu_creation:         "signage_creator",
  product_photography:   "brand_photographer",
  dish_photography:      "brand_photographer",
  brand_imagery:         "brand_photographer",
  video_ad:              "director_video",
  brand_film:            "director_video",
  ambient_loop:          "director_video",
  ambiance_design:       "experience_designer",
  customer_journey:      "experience_designer",
  day_part_transition:   "experience_designer",
  copywriting:           "brand_storyteller",
  brand_copy:            "brand_storyteller",
  music_direction:       "sound_designer",
  sonic_branding:        "sound_designer",
  narration:             "sound_designer",

  // Fallback — Vizzy master handles directly
  chat:                  null,
  general:               null,
};

// ═══════════════════════════════════════════
// LOOKUP HELPERS
// ═══════════════════════════════════════════

export const ALL_AGENTS = [...HOME_AGENTS, ...ENTERPRISE_AGENTS];

export function getAgentById(id) {
  return ALL_AGENTS.find((a) => a.id === id) || null;
}

export function getAgentForIntent(intent, mode = "home") {
  const agentId = INTENT_AGENT_MAP[intent];
  if (!agentId) return null;
  return ALL_AGENTS.find((a) => a.id === agentId && (a.edition === mode || a.edition === "home")) || null;
}

export function getAlwaysActiveAgents(mode = "enterprise") {
  return ALL_AGENTS.filter((a) => a.alwaysActive && a.edition === mode);
}
