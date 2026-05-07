
// dreamEngine.ts

export type SymbolCategory = 'pursuit' | 'falling' | 'water' | 'transformation' | 'social' | 'childhood' | 'abstract';
export type Emotion = 'fear' | 'joy' | 'sadness' | 'anger' | 'wonder' | 'neutral';

export interface DreamData {
  id: string;
  text: string;
  timestamp: number;
  emotion: Emotion;
  category: SymbolCategory;
  intensity: number;
  sigilData: unknown; // Deterministic random values
}

const SYMBOL_KEYWORDS: Record<SymbolCategory, string[]> = {
  pursuit: ['run', 'chase', 'escape', 'hide', 'fast', 'pursue', 'flight'],
  falling: ['fall', 'drop', 'cliff', 'gravity', 'down', 'plummet'],
  water: ['sea', 'ocean', 'river', 'swim', 'drown', 'rain', 'water', 'lake', 'wave'],
  transformation: ['change', 'grow', 'shift', 'turn', 'become', 'magic', 'evolve'],
  social: ['people', 'friend', 'family', 'crowd', 'talk', 'meet', 'party'],
  childhood: ['school', 'house', 'parent', 'kid', 'young', 'past', 'child'],
  abstract: []
};

const EMOTION_KEYWORDS: Record<Emotion, string[]> = {
  fear: ['dark', 'scary', 'anxious', 'afraid', 'nightmare', 'horror'],
  joy: ['happy', 'light', 'fly', 'sun', 'bright', 'laugh'],
  sadness: ['cry', 'alone', 'lost', 'blue', 'tear', 'grief'],
  anger: ['fire', 'red', 'fight', 'shout', 'mad', 'kill'],
  wonder: ['stars', 'space', 'new', 'strange', 'dream', 'weird'],
  neutral: []
};

export const analyzeDream = (text: string): { emotion: Emotion, category: SymbolCategory, intensity: number } => {
  const t = text.toLowerCase();
  
  // Detect Category
  let category: SymbolCategory = 'abstract';
  for (const [cat, keywords] of Object.entries(SYMBOL_KEYWORDS)) {
    if (keywords.some(k => t.includes(k))) {
      category = cat as SymbolCategory;
      break;
    }
  }

  // Detect Emotion
  let emotion: Emotion = 'neutral';
  for (const [emo, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    if (keywords.some(k => t.includes(k))) {
      emotion = emo as Emotion;
      break;
    }
  }

  // Intensity based on length and punctuation
  let intensity = Math.min(0.3 + (text.length / 300) * 0.7, 1.0);
  if (text.includes('!') || text.includes('?')) intensity = Math.min(intensity + 0.2, 1.0);

  return { emotion, category, intensity };
};

export const hashText = (text: string): number => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
};
