
// emotionEngine.ts

export interface EmotionalState {
  intensity: number;
  recency: number;
  ambivalence: number;
  gratitude: number;
}

export const analyzeText = (text: string): EmotionalState => {
  if (!text || text.trim().length === 0) {
    return { intensity: 0.2, recency: 0.2, ambivalence: 0.1, gratitude: 0.3 };
  }

  const t = text.toLowerCase();
  
  // 1. Intensity
  const intensityWords = ['deep', 'sharp', 'heavy', 'huge', 'very', 'extremely', 'loss', 'pain', 'missing', 'ache', 'forever', 'never'];
  let intensity = 0.2;
  intensityWords.forEach(w => { if (t.includes(w)) intensity += 0.15; });
  if (text.includes('!') || text.includes('?')) intensity += 0.1;
  intensity = Math.min(Math.max(intensity, 0.1), 1.0);

  // 2. Recency
  const recencyWords = ['now', 'today', 'just', 'recently', 'yesterday', 'this morning', 'current', 'still'];
  const distantWords = ['long ago', 'years', 'then', 'before', 'used to', 'past', 'history'];
  let recency = 0.5;
  recencyWords.forEach(w => { if (t.includes(w)) recency += 0.2; });
  distantWords.forEach(w => { if (t.includes(w)) recency -= 0.2; });
  recency = Math.min(Math.max(recency, 0.1), 1.0);

  // 3. Ambivalence
  const ambivalenceWords = ['but', 'yet', 'though', 'maybe', 'perhaps', 'sometimes', 'however', 'confused', 'weird', 'middle'];
  let ambivalence = 0.1;
  ambivalenceWords.forEach(w => { if (t.includes(w)) ambivalence += 0.25; });
  ambivalence = Math.min(Math.max(ambivalence, 0.0), 1.0);

  // 4. Gratitude
  const gratitudeWords = ['thank', 'grateful', 'blessed', 'gift', 'light', 'warm', 'hope', 'kind', 'love', 'smile', 'peace'];
  let gratitude = 0.1;
  gratitudeWords.forEach(w => { if (t.includes(w)) gratitude += 0.2; });
  gratitude = Math.min(Math.max(gratitude, 0.0), 1.0);

  return { intensity, recency, ambivalence, gratitude };
};
