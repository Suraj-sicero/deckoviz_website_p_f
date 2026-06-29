import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Building2,
  BookOpen,
  Dna,
  UsersRound,
  Landmark,
  Palette,
  Brush,
  Camera,
  Music,
  Video,
  Mic,
  Package,
  Users,
  Target,
  BarChart3,
  Heart,
  MapPin,
  FolderUp,
  Bot,
  RefreshCw,
  Brain,
  Upload,
  Save,
  ChevronDown,
  ChevronRight,
  Check,
  Info,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ════════════════════════════════════════════════════════ */

interface FieldDef {
  id: string;
  label: string;
  hint?: string;
  type: "text" | "textarea" | "tags" | "upload" | "select";
  placeholder?: string;
  options?: string[];
  examples?: string[];
}

interface SectionDef {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  fields: FieldDef[];
}

/* ════════════════════════════════════════════════════════
   SECTION DATA  (21 sections, all fields)
   ════════════════════════════════════════════════════════ */

const sections: SectionDef[] = [
  {
    id: "identity",
    number: 1,
    title: "Enterprise Identity",
    icon: <Building2 size={16} />,
    description: "Foundational information about your organization.",
    fields: [
      { id: "ent_name", label: "Enterprise Name", hint: "Enter your official company, brand, venue, property, or organization name.", type: "text", placeholder: "e.g. Grand Metropolitan Hotels" },
      { id: "ent_type", label: "Enterprise Type", hint: "Describe what type of organization you are.", type: "text", placeholder: "e.g. Hotel, Restaurant, Retail Store, Corporate Office…", examples: ["Hotel", "Restaurant", "Retail Store", "Shopping Centre", "Corporate Office", "School", "University", "Museum", "Healthcare Facility", "Fitness Centre", "Real Estate Development", "Co-working Space"] },
      { id: "industry", label: "Industry", hint: "Describe your primary industry and any secondary industries you operate within.", type: "textarea", placeholder: "e.g. Luxury Hospitality, Real Estate Development" },
      { id: "headquarters", label: "Headquarters", hint: "Enter your headquarters location and important operating locations.", type: "text", placeholder: "e.g. London, United Kingdom" },
      { id: "website", label: "Website", hint: "Provide your primary website and relevant digital properties.", type: "text", placeholder: "https://" },
      { id: "social_presence", label: "Social Presence", hint: "List social media channels and important online communities.", type: "tags", placeholder: "Add a channel…" },
      { id: "years_in_operation", label: "Years in Operation", hint: "Describe your history and how long you have been operating.", type: "textarea", placeholder: "e.g. Founded in 1987, 37 years of operation…" },
    ],
  },
  {
    id: "story",
    number: 2,
    title: "Enterprise Story",
    icon: <BookOpen size={16} />,
    description: "The narrative and purpose behind your organization.",
    fields: [
      { id: "origin_story", label: "Origin Story", hint: "Describe how the organization was founded and why it exists.", type: "textarea", placeholder: "Tell the founding story…" },
      { id: "why_we_exist", label: "Why We Exist", hint: "Explain the deeper purpose of your organization beyond making money.", type: "textarea", placeholder: "Our deeper purpose is…" },
      { id: "mission", label: "Mission", hint: "Describe the mission your organization is pursuing.", type: "textarea", placeholder: "Our mission is to…" },
      { id: "vision", label: "Vision", hint: "Describe the future your organization hopes to help create.", type: "textarea", placeholder: "We envision a world where…" },
      { id: "legacy", label: "Legacy", hint: "Describe the legacy you want to leave behind over decades.", type: "textarea", placeholder: "Over the next century, we want to be remembered for…" },
      { id: "refuse_to_become", label: "What We Refuse To Become", hint: "Describe behaviors, business models, or outcomes you never want associated with your organization.", type: "textarea", placeholder: "We will never…" },
    ],
  },
  {
    id: "brand_dna",
    number: 3,
    title: "Brand DNA",
    icon: <Dna size={16} />,
    description: "The genetic code of your brand — values, personality, and voice.",
    fields: [
      { id: "core_values", label: "Core Values", hint: "List and explain the values guiding decisions across the organization.", type: "textarea", placeholder: "e.g. Integrity — We do what's right…" },
      { id: "personality", label: "Personality", hint: "Describe your brand personality.", type: "tags", placeholder: "Add a trait…", examples: ["Warm", "Sophisticated", "Playful", "Minimalist", "Luxurious", "Innovative", "Family-oriented", "Futuristic"] },
      { id: "tone_of_voice", label: "Tone Of Voice", hint: "Describe how your brand communicates.", type: "tags", placeholder: "Add a tone…", examples: ["Friendly", "Educational", "Inspirational", "Professional", "Elegant", "Humorous"] },
      { id: "emotional_objectives", label: "Emotional Objectives", hint: "Describe what emotions customers should experience.", type: "tags", placeholder: "Add an emotion…", examples: ["Trust", "Wonder", "Comfort", "Delight", "Curiosity", "Excitement"] },
      { id: "brand_associations", label: "Desired Brand Associations", hint: "Describe what people should think of immediately when they think about your brand.", type: "textarea", placeholder: "When people think of us, they think of…" },
    ],
  },
  {
    id: "audience",
    number: 4,
    title: "Audience Intelligence",
    icon: <UsersRound size={16} />,
    description: "Deep understanding of the people you serve.",
    fields: [
      { id: "primary_audience", label: "Primary Audience", hint: "Describe your most important customers.", type: "textarea", placeholder: "Our primary customers are…" },
      { id: "secondary_audiences", label: "Secondary Audiences", hint: "Describe additional customer groups.", type: "textarea", placeholder: "We also serve…" },
      { id: "demographics", label: "Demographics", hint: "Describe age ranges, locations, income levels, occupations, and household information.", type: "textarea", placeholder: "Age: 25-55, Income: …" },
      { id: "psychographics", label: "Psychographics", hint: "Describe beliefs, values, lifestyles, motivations, fears, aspirations, and identities.", type: "textarea", placeholder: "Our customers believe in…" },
      { id: "customer_archetypes", label: "Customer Archetypes", hint: "Describe key customer personas.", type: "textarea", placeholder: "Persona 1: The Discerning Traveller…" },
      { id: "customer_expectations", label: "Customer Expectations", hint: "Describe what customers expect when interacting with your business.", type: "textarea", placeholder: "Customers expect…" },
    ],
  },
  {
    id: "physical_space",
    number: 5,
    title: "Physical Space Profile",
    icon: <Landmark size={16} />,
    description: "Your physical environment and how it should function.",
    fields: [
      { id: "space_type", label: "Space Type", hint: "Describe the physical environment.", type: "textarea", placeholder: "e.g. Luxury hotel lobby, boutique retail store…" },
      { id: "space_objectives", label: "Space Objectives", hint: "Describe what the space is intended to accomplish.", type: "textarea", placeholder: "The space should…" },
      { id: "desired_behaviours", label: "Desired Customer Behaviours", hint: "Describe how visitors should behave in the space.", type: "textarea", placeholder: "We want visitors to…" },
      { id: "traffic_patterns", label: "Traffic Patterns", hint: "Describe visitor flow throughout the environment.", type: "textarea", placeholder: "Visitors typically enter through…" },
      { id: "dwell_time", label: "Dwell Time Objectives", hint: "Describe desired visit duration.", type: "text", placeholder: "e.g. Average 45 minutes per visit" },
      { id: "high_priority_areas", label: "High Priority Areas", hint: "Identify spaces requiring enhanced experiences.", type: "textarea", placeholder: "Lobby, main dining area, conference rooms…" },
    ],
  },
  {
    id: "visual_identity",
    number: 6,
    title: "Visual Identity",
    icon: <Palette size={16} />,
    description: "Your brand's visual language and design system.",
    fields: [
      { id: "brand_guidelines_upload", label: "Brand Guidelines Upload", hint: "Upload official brand guidelines.", type: "upload" },
      { id: "logo_assets_upload", label: "Logo Assets Upload", hint: "Upload logo files and logo usage documentation.", type: "upload" },
      { id: "brand_colours", label: "Brand Colours", hint: "List primary, secondary, tertiary colours.", type: "tags", placeholder: "Add a colour…" },
      { id: "typography", label: "Typography", hint: "List approved fonts and usage guidance.", type: "textarea", placeholder: "Primary: Playfair Display, Secondary: Inter…" },
      { id: "visual_language", label: "Visual Language", hint: "Describe preferred visual style.", type: "tags", placeholder: "Add a style…", examples: ["Modern", "Luxury", "Organic", "Minimal", "Futuristic", "Traditional"] },
      { id: "visual_prohibitions", label: "Visual Prohibitions", hint: "Describe visual styles that should never appear.", type: "textarea", placeholder: "We never use…" },
    ],
  },
  {
    id: "art_preferences",
    number: 7,
    title: "Art Preferences",
    icon: <Brush size={16} />,
    description: "Art styles, moods, and subjects aligned with your brand.",
    fields: [
      { id: "preferred_art_styles", label: "Preferred Art Styles", hint: "Describe art styles aligned with your brand.", type: "tags", placeholder: "Add a style…" },
      { id: "forbidden_art_styles", label: "Forbidden Art Styles", hint: "Describe styles that should never appear.", type: "tags", placeholder: "Add a style…" },
      { id: "preferred_artists", label: "Preferred Artists", hint: "List artists or artistic movements you admire.", type: "textarea", placeholder: "e.g. Monet, Rothko, Bauhaus movement…" },
      { id: "art_colour_preferences", label: "Colour Preferences", hint: "Describe preferred palettes.", type: "textarea", placeholder: "e.g. Earth tones, muted pastels, deep blues…" },
      { id: "mood_preferences", label: "Mood Preferences", hint: "Describe moods the artwork should evoke.", type: "tags", placeholder: "Add a mood…" },
      { id: "subject_preferences", label: "Subject Preferences", hint: "Describe desired subjects.", type: "textarea", placeholder: "e.g. Abstract landscapes, architectural forms…" },
      { id: "seasonal_art", label: "Seasonal Art Preferences", hint: "Describe how art should evolve through the year.", type: "textarea", placeholder: "Spring: Light florals, Summer: Ocean themes…" },
    ],
  },
  {
    id: "photography",
    number: 8,
    title: "Photography Preferences",
    icon: <Camera size={16} />,
    description: "Photography aesthetics and guidelines.",
    fields: [
      { id: "photo_styles", label: "Preferred Photography Styles", hint: "Describe photography aesthetics.", type: "tags", placeholder: "Add a style…" },
      { id: "photo_subjects", label: "Preferred Subjects", hint: "Describe ideal photographic subjects.", type: "textarea", placeholder: "e.g. Architecture, landscapes, people in motion…" },
      { id: "photo_restrictions", label: "Photography Restrictions", hint: "Describe what should never be shown.", type: "textarea", placeholder: "We avoid showing…" },
    ],
  },
  {
    id: "music",
    number: 9,
    title: "Music Profile",
    icon: <Music size={16} />,
    description: "Music strategy, genres, and energy throughout the day.",
    fields: [
      { id: "music_objectives", label: "Music Objectives", hint: "Describe why music exists within your experience.", type: "textarea", placeholder: "Music in our space serves to…" },
      { id: "preferred_genres", label: "Preferred Genres", hint: "Describe preferred genres.", type: "tags", placeholder: "Add a genre…" },
      { id: "restricted_genres", label: "Restricted Genres", hint: "Describe genres that should never be played.", type: "tags", placeholder: "Add a genre…" },
      { id: "energy_profile", label: "Energy Profile", hint: "Describe desired energy throughout the day.", type: "textarea", placeholder: "Morning: Calm and warm, Midday: Uplifting…" },
      { id: "daypart_morning", label: "Daypart — Morning", hint: "Desired atmosphere.", type: "textarea", placeholder: "Soft ambient, gentle piano…" },
      { id: "daypart_afternoon", label: "Daypart — Afternoon", hint: "Desired atmosphere.", type: "textarea", placeholder: "Upbeat contemporary, light jazz…" },
      { id: "daypart_evening", label: "Daypart — Evening", hint: "Desired atmosphere.", type: "textarea", placeholder: "Sophisticated lounge, deep house…" },
    ],
  },
  {
    id: "video",
    number: 10,
    title: "Video Preferences",
    icon: <Video size={16} />,
    description: "Video aesthetics, motion, and content categories.",
    fields: [
      { id: "video_styles", label: "Preferred Video Styles", hint: "Describe acceptable video aesthetics.", type: "tags", placeholder: "Add a style…" },
      { id: "motion_intensity", label: "Motion Intensity", hint: "Describe desired level of motion.", type: "select", options: ["Very Low — Near-static", "Low — Gentle movement", "Medium — Moderate motion", "High — Dynamic and energetic"] },
      { id: "content_categories", label: "Content Categories", hint: "Describe desired video content categories.", type: "tags", placeholder: "Add a category…" },
    ],
  },
  {
    id: "narration",
    number: 11,
    title: "Narration & Voice",
    icon: <Mic size={16} />,
    description: "How your brand sounds when it speaks.",
    fields: [
      { id: "voice_personality", label: "Brand Voice Personality", hint: "Describe how narration should sound.", type: "textarea", placeholder: "Our brand voice is…" },
      { id: "narrator_chars", label: "Preferred Narrator Characteristics", hint: "Describe preferred narrator traits.", type: "textarea", placeholder: "Warm, authoritative, mid-range pitch…" },
      { id: "languages", label: "Languages", hint: "List supported languages.", type: "tags", placeholder: "Add a language…" },
      { id: "accent_prefs", label: "Accent Preferences", hint: "Describe preferred accents.", type: "textarea", placeholder: "e.g. British RP, neutral American…" },
    ],
  },
  {
    id: "products",
    number: 12,
    title: "Product & Service Intelligence",
    icon: <Package size={16} />,
    description: "Products, services, and strategic priorities.",
    fields: [
      { id: "products_offered", label: "Products", hint: "Describe products offered.", type: "textarea", placeholder: "Our products include…" },
      { id: "services_offered", label: "Services", hint: "Describe services offered.", type: "textarea", placeholder: "Our services include…" },
      { id: "premium_offerings", label: "Premium Offerings", hint: "Describe premium experiences.", type: "textarea", placeholder: "Our premium offerings include…" },
      { id: "best_sellers", label: "Best Sellers", hint: "Describe top offerings.", type: "textarea", placeholder: "Our most popular items…" },
      { id: "strategic_priorities", label: "Strategic Priorities", hint: "Describe offerings you want emphasized.", type: "textarea", placeholder: "We want to emphasize…" },
    ],
  },
  {
    id: "team_culture",
    number: 13,
    title: "Team & Culture",
    icon: <Users size={16} />,
    description: "Your people, leadership, and internal culture.",
    fields: [
      { id: "leadership_team", label: "Leadership Team", hint: "Describe leadership structure.", type: "textarea", placeholder: "CEO: …, CTO: …" },
      { id: "employee_culture", label: "Employee Culture", hint: "Describe internal culture.", type: "textarea", placeholder: "Our culture is characterized by…" },
      { id: "employee_experience", label: "Employee Experience Goals", hint: "Describe desired employee experience.", type: "textarea", placeholder: "We want every employee to feel…" },
      { id: "internal_values", label: "Internal Values", hint: "Describe cultural values.", type: "tags", placeholder: "Add a value…" },
    ],
  },
  {
    id: "strategy",
    number: 14,
    title: "Business Strategy",
    icon: <Target size={16} />,
    description: "North star, objectives, goals, and opportunities.",
    fields: [
      { id: "north_star", label: "North Star", hint: "Describe the most important long-term objective.", type: "textarea", placeholder: "Our north star is…" },
      { id: "strategic_objectives", label: "Strategic Objectives", hint: "Describe key strategic objectives.", type: "textarea", placeholder: "1. … 2. … 3. …" },
      { id: "business_goals", label: "Business Goals", hint: "Describe short-term and long-term goals.", type: "textarea", placeholder: "Short-term: … Long-term: …" },
      { id: "key_challenges", label: "Key Challenges", hint: "Describe major business challenges.", type: "textarea", placeholder: "Our biggest challenges are…" },
      { id: "opportunities", label: "Opportunities", hint: "Describe major growth opportunities.", type: "textarea", placeholder: "We see opportunities in…" },
    ],
  },
  {
    id: "metrics",
    number: 15,
    title: "Metrics & Intelligence",
    icon: <BarChart3 size={16} />,
    description: "KPIs, OKRs, and how you measure success.",
    fields: [
      { id: "kpis", label: "KPIs", hint: "List critical KPIs.", type: "textarea", placeholder: "Revenue growth, Customer satisfaction score…" },
      { id: "okrs", label: "OKRs", hint: "List current OKRs.", type: "textarea", placeholder: "Objective 1: … Key Result: …" },
      { id: "success_metrics", label: "Success Metrics", hint: "Describe how success is measured.", type: "textarea", placeholder: "We measure success by…" },
      { id: "cx_metrics", label: "Customer Experience Metrics", hint: "Describe customer satisfaction measures.", type: "textarea", placeholder: "NPS, CSAT, retention rate…" },
    ],
  },
  {
    id: "experience",
    number: 16,
    title: "Customer Experience Profile",
    icon: <Heart size={16} />,
    description: "The ideal journey and emotional arc for your customers.",
    fields: [
      { id: "ideal_experience", label: "Ideal Experience", hint: "Describe the perfect customer journey.", type: "textarea", placeholder: "From the moment they arrive…" },
      { id: "desired_memories", label: "Desired Memories", hint: "Describe what customers should remember.", type: "textarea", placeholder: "We want customers to remember…" },
      { id: "signature_moments", label: "Signature Moments", hint: "Describe unforgettable moments you want guests to experience.", type: "textarea", placeholder: "The moment when…" },
      { id: "emotional_journey", label: "Emotional Journey", hint: "Describe emotional progression throughout the visit.", type: "textarea", placeholder: "Arrival: Anticipation → Check-in: Welcome…" },
    ],
  },
  {
    id: "local_context",
    number: 17,
    title: "Local Context",
    icon: <MapPin size={16} />,
    description: "Location-specific culture, community, and sensitivities.",
    fields: [
      { id: "location_context", label: "Location Context", hint: "Describe local culture and geography.", type: "textarea", placeholder: "We are located in…" },
      { id: "community_connections", label: "Community Connections", hint: "Describe community involvement.", type: "textarea", placeholder: "We support and engage with…" },
      { id: "cultural_considerations", label: "Cultural Considerations", hint: "Describe cultural sensitivities and preferences.", type: "textarea", placeholder: "Important cultural factors include…" },
    ],
  },
  {
    id: "knowledge_uploads",
    number: 18,
    title: "Enterprise Knowledge Uploads",
    icon: <FolderUp size={16} />,
    description: "Upload documents that help Vizzy understand your organization.",
    fields: [
      { id: "upload_brand_guidelines", label: "Brand Guidelines", hint: "Upload files.", type: "upload" },
      { id: "upload_marketing", label: "Marketing Playbooks", hint: "Upload files.", type: "upload" },
      { id: "upload_catalogues", label: "Product Catalogues", hint: "Upload files.", type: "upload" },
      { id: "upload_service", label: "Service Handbooks", hint: "Upload files.", type: "upload" },
      { id: "upload_sops", label: "SOPs", hint: "Upload files.", type: "upload" },
      { id: "upload_training", label: "Training Materials", hint: "Upload files.", type: "upload" },
      { id: "upload_investor", label: "Investor Materials", hint: "Upload files.", type: "upload" },
      { id: "upload_annual", label: "Annual Reports", hint: "Upload files.", type: "upload" },
      { id: "upload_research", label: "Customer Research", hint: "Upload files.", type: "upload" },
      { id: "upload_architecture", label: "Architecture & Interior Design Assets", hint: "Upload files.", type: "upload" },
    ],
  },
  {
    id: "ai_rules",
    number: 19,
    title: "AI Personalization Rules",
    icon: <Bot size={16} />,
    description: "Guide Vizzy's behaviour, priorities, and boundaries.",
    fields: [
      { id: "vizzy_prioritize", label: "Things Vizzy Should Prioritize", hint: "Describe what Vizzy should consistently optimize for.", type: "textarea", placeholder: "Vizzy should always…" },
      { id: "vizzy_avoid", label: "Things Vizzy Should Avoid", hint: "Describe what Vizzy should never do.", type: "textarea", placeholder: "Vizzy must never…" },
      { id: "escalation_rules", label: "Escalation Rules", hint: "Describe situations requiring human approval.", type: "textarea", placeholder: "Vizzy should escalate when…" },
      { id: "creativity_level", label: "Creativity Level", hint: "Describe acceptable experimentation level.", type: "select", options: ["Conservative — Stay very close to guidelines", "Moderate — Some creative freedom within brand", "Adventurous — Experiment within brand boundaries", "Bold — Push creative boundaries"] },
    ],
  },
  {
    id: "evolving_context",
    number: 20,
    title: "Evolving Context Layer",
    icon: <RefreshCw size={16} />,
    description: "Recent changes, campaigns, and evolving priorities.",
    fields: [
      { id: "recent_updates", label: "Recent Updates", hint: "Describe recent developments.", type: "textarea", placeholder: "Recently we…" },
      { id: "upcoming_campaigns", label: "Upcoming Campaigns", hint: "Describe future campaigns.", type: "textarea", placeholder: "Our upcoming campaigns include…" },
      { id: "seasonal_priorities", label: "Seasonal Priorities", hint: "Describe seasonal objectives.", type: "textarea", placeholder: "This season we're focused on…" },
      { id: "new_products", label: "New Products", hint: "Describe new launches.", type: "textarea", placeholder: "We're launching…" },
      { id: "business_changes", label: "Business Changes", hint: "Describe organizational changes.", type: "textarea", placeholder: "Key changes include…" },
      { id: "lessons_learned", label: "Lessons Learned", hint: "Describe insights and learnings.", type: "textarea", placeholder: "We've learned that…" },
      { id: "future_vision_updates", label: "Future Vision Updates", hint: "Describe changes in long-term vision.", type: "textarea", placeholder: "Our updated vision is…" },
    ],
  },
  {
    id: "memory_layer",
    number: 21,
    title: "Enterprise Memory Layer",
    icon: <Brain size={16} />,
    description: "AI-generated organizational intelligence — continuously updated by Vizzy.",
    fields: [],
  },
];

/* ════════════════════════════════════════════════════════
   FIELD COMPONENTS
   ════════════════════════════════════════════════════════ */

function TextField({ field, value, onChange }: { field: FieldDef; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-gray-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-gray-300"
    />
  );
}

function TextAreaField({ field, value, onChange }: { field: FieldDef; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={4}
      className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-gray-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-gray-300 resize-none"
    />
  );
}

function TagsField({ field, value, onChange }: { field: FieldDef; value: string[]; onChange: (v: string[]) => void }) {
  const [inputVal, setInputVal] = useState("");
  const add = () => {
    const trimmed = inputVal.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputVal("");
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#182a4a]/10 px-3 py-1.5 text-xs font-bold text-[#182a4a] transition hover:bg-[#182a4a]/20"
          >
            {tag}
            <button onClick={() => onChange(value.filter((t) => t !== tag))} className="ml-0.5 text-[#182a4a]/40 hover:text-red-500 transition">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={field.placeholder}
          className="flex-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-2.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] placeholder:text-gray-300"
        />
        <button
          onClick={add}
          className="rounded-xl bg-[#182a4a] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1e3a5f] shadow-sm"
        >
          Add
        </button>
      </div>
      {field.examples && field.examples.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {field.examples.filter((ex) => !value.includes(ex)).map((ex) => (
            <button
              key={ex}
              onClick={() => onChange([...value, ex])}
              className="rounded-lg border border-dashed border-gray-300 px-2.5 py-1 text-[11px] font-semibold text-gray-400 transition hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50"
            >
              + {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SelectField({ field, value, onChange }: { field: FieldDef; value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-medium text-gray-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] appearance-none cursor-pointer"
    >
      <option value="">Select an option…</option>
      {field.options?.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function UploadField({ field: _field }: { field: FieldDef }) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div>
      <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-[#f9fafb] py-8 px-6 cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/30 group">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#182a4a]/10 text-[#182a4a] transition group-hover:bg-blue-500/10 group-hover:text-blue-500">
          <Upload size={20} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition">
            Drop files here or <span className="text-blue-500">browse</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">PDF, DOCX, PNG, JPG up to 50 MB</p>
        </div>
        <input type="file" multiple className="hidden" onChange={(e) => {
          if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!).map((f) => f.name)]);
        }} />
      </label>
      {files.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
              <Check size={12} className="text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-700 truncate flex-1">{f}</span>
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-emerald-400 hover:text-red-500 text-xs font-bold transition">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MEMORY LAYER VISUALIZATION  (Section 21)
   ════════════════════════════════════════════════════════ */

const memoryInsights = [
  { label: "Customer behaviour insights", status: "Learning" },
  { label: "Best-performing content", status: "2 insights" },
  { label: "Best-performing artwork", status: "Learning" },
  { label: "Best-performing music", status: "Learning" },
  { label: "Space utilization insights", status: "Awaiting data" },
  { label: "Visitor engagement trends", status: "Awaiting data" },
  { label: "Seasonal discoveries", status: "Learning" },
  { label: "Emerging preferences", status: "Learning" },
  { label: "Successful experiments", status: "Awaiting data" },
  { label: "Failed experiments", status: "Awaiting data" },
  { label: "Brand evolution observations", status: "Learning" },
  { label: "Predictive recommendations", status: "Awaiting data" },
  { label: "Future opportunities", status: "Awaiting data" },
  { label: "Executive summaries", status: "Awaiting data" },
  { label: "Quarterly reviews", status: "Awaiting data" },
  { label: "Annual learning reports", status: "Awaiting data" },
];

function MemoryLayerSection() {
  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 relative overflow-hidden mb-6">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 70%, #2563EB 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-blue-400" />
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider">Continuously Updated By Vizzy</p>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            This section is AI-generated, built from enterprise interactions, uploads, and continuously updated. Most systems stop at a profile. Deckoviz maintains a <span className="text-white font-bold">living organizational memory</span> that grows smarter every week.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {memoryInsights.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-xl border border-[#e8eaef] bg-white px-4 py-3.5 transition hover:shadow-sm">
            <div className={`flex h-2 w-2 shrink-0 rounded-full ${item.status === "Learning" ? "bg-blue-500 animate-pulse" : item.status === "Awaiting data" ? "bg-gray-300" : "bg-emerald-500"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-700 truncate">{item.label}</p>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.status === "Learning" ? "bg-blue-50 text-blue-500" : item.status === "Awaiting data" ? "bg-gray-100 text-gray-400" : "bg-emerald-50 text-emerald-600"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex items-start gap-2">
          <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            Over time, Vizzy stops being a display system and becomes an <strong>institutional intelligence layer</strong> that understands how to make every space more aligned with your organization's identity, goals, customers, and evolving reality.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */

export default function EnterpriseDeepProfileView({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState("identity");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["identity"]));
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Track completion
  useEffect(() => {
    const completed = new Set<string>();
    sections.forEach((sec) => {
      if (sec.id === "memory_layer") return;
      const hasAnyValue = sec.fields.some((f) => {
        const val = formData[f.id];
        if (Array.isArray(val)) return val.length > 0;
        return val && String(val).trim().length > 0;
      });
      if (hasAnyValue) completed.add(sec.id);
    });
    setCompletedSections(completed);
  }, [formData]);

  const updateField = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setExpandedSections((prev) => new Set([...prev, sectionId]));
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
    setActiveSection(sectionId);
  };

  const completionPct = Math.round((completedSections.size / (sections.length - 1)) * 100); // -1 for memory_layer

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* ── LEFT SIDEBAR — Section Navigation ── */}
      <aside className="w-[280px] shrink-0 border-r border-[#e8eaef] bg-white overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#e8eaef] px-5 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#182a4a] transition mb-3 group"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-1" />
            Back to Profile
          </button>
          <h2 className="text-base font-bold text-gray-900">Enterprise Deep Profile</h2>
          <p className="text-xs text-gray-400 mt-0.5">21 sections · Strategic intelligence</p>

          {/* Completion Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completion</span>
              <span className="text-[11px] font-bold text-[#182a4a]">{completionPct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#182a4a] to-blue-500 transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section Nav */}
        <nav className="px-3 py-3 space-y-0.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isCompleted = completedSections.has(sec.id);
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-[#182a4a]/10 text-[#182a4a]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs transition ${
                  isActive
                    ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-sm"
                    : isCompleted
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                }`}>
                  {isCompleted && !isActive ? <Check size={12} /> : sec.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-[12px] font-bold truncate ${isActive ? "text-[#182a4a]" : ""}`}>
                    <span className="text-gray-300 mr-1">{sec.number}.</span>
                    {sec.title}
                  </p>
                </div>
                {isCompleted && (
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div ref={contentRef} className="flex-1 overflow-y-auto bg-[#f5f6f8] px-8 py-8" style={{ scrollbarWidth: "thin" }}>
        {/* Top Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Enterprise Deep Profile</h1>
            <p className="text-sm text-gray-400 mt-1">
              Build a comprehensive strategic intelligence profile for Vizzy.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#182a4a] to-[#2563EB] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#182a4a]/20 transition hover:scale-[1.02] hover:shadow-xl">
            <Save size={14} />
            Save Profile
          </button>
        </div>

        {/* Section Cards */}
        <div className="max-w-[900px] space-y-4">
          {sections.map((sec) => {
            const isExpanded = expandedSections.has(sec.id);
            const isCompleted = completedSections.has(sec.id);
            return (
              <div
                key={sec.id}
                ref={(el) => { sectionRefs.current[sec.id] = el; }}
                className={`rounded-2xl border bg-white transition-all duration-300 ${
                  activeSection === sec.id ? "border-blue-200 shadow-lg shadow-blue-500/5" : "border-[#e8eaef] shadow-sm"
                }`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left group"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    isExpanded
                      ? "bg-gradient-to-br from-[#182a4a] to-[#2563EB] text-white shadow-lg shadow-[#182a4a]/20"
                      : isCompleted
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  }`}>
                    {sec.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-300">Section {sec.number}</span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <Check size={10} /> Started
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mt-0.5">{sec.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{sec.description}</p>
                  </div>
                  <span className="text-gray-300 transition group-hover:text-gray-500">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-0 border-t border-[#f0f0f4]">
                    {sec.id === "memory_layer" ? (
                      <div className="pt-5">
                        <MemoryLayerSection />
                      </div>
                    ) : (
                      <div className="space-y-6 pt-5">
                        {sec.fields.map((field) => (
                          <div key={field.id}>
                            <label className="block mb-1.5">
                              <span className="text-sm font-bold text-gray-700">{field.label}</span>
                            </label>
                            {field.hint && (
                              <p className="text-xs text-gray-400 mb-2.5 leading-relaxed">{field.hint}</p>
                            )}
                            {field.type === "text" && (
                              <TextField field={field} value={formData[field.id] || ""} onChange={(v) => updateField(field.id, v)} />
                            )}
                            {field.type === "textarea" && (
                              <TextAreaField field={field} value={formData[field.id] || ""} onChange={(v) => updateField(field.id, v)} />
                            )}
                            {field.type === "tags" && (
                              <TagsField field={field} value={formData[field.id] || []} onChange={(v) => updateField(field.id, v)} />
                            )}
                            {field.type === "select" && (
                              <SelectField field={field} value={formData[field.id] || ""} onChange={(v) => updateField(field.id, v)} />
                            )}
                            {field.type === "upload" && (
                              <UploadField field={field} />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 relative overflow-hidden mt-8">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%)" }} />
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Profile Complete?</h3>
              <p className="text-sm text-white/60 mb-5 max-w-lg mx-auto">
                The more you share, the smarter Vizzy becomes. A complete profile transforms your space into a living, breathing extension of your brand.
              </p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#182a4a] shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
                <Save size={14} />
                Save Enterprise Deep Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
