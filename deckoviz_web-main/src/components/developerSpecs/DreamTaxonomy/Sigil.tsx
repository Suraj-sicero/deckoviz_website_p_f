
import React from 'react';
import { DreamData, Emotion } from './dreamEngine';

const EMOTION_PALETTES: Record<Emotion, string> = {
  fear: '#4a3b4f', // Deep violet
  joy: '#f7e1a0',  // Muted gold
  sadness: '#5e7b8c', // Desaturated blue
  anger: '#8c4b4b', // Muted red
  wonder: '#a0f7e1', // Pale teal
  neutral: '#7d7d7d' // Grey
};

export const Sigil: React.FC<{ dream: DreamData, size?: number }> = ({ dream, size = 40 }) => {
  const { category, emotion, intensity, text } = dream;
  const color = EMOTION_PALETTES[emotion];
  const complexity = Math.floor(intensity * 5) + 1;
  
  // Deterministic random numbers from text hash
  const seed = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (i: number) => {
    const x = Math.sin(seed + i) * 10000;
    return x - Math.floor(x);
  };

  const renderContent = () => {
    switch (category) {
      case 'pursuit':
        return Array.from({ length: complexity }).map((_, i) => (
          <line 
            key={i} 
            x1={10 + random(i) * 20} y1={10 + random(i+1) * 20}
            x2={30 + random(i+2) * 20} y2={30 + random(i+3) * 20}
            stroke={color} strokeWidth="1.5" strokeLinecap="round"
          />
        ));
      case 'falling':
        return <rect x="15" y="10" width="10" height="20" fill={`url(#grad-${dream.id})`} />;
      case 'water':
        return Array.from({ length: complexity }).map((_, i) => (
          <path 
            key={i}
            d={`M 10 ${15+i*3} Q 20 ${10+random(i)*10} 30 ${15+i*3}`}
            fill="none" stroke={color} strokeWidth="1.5"
          />
        ));
      case 'transformation':
        return <path d="M 20 20 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2,2" />;
      case 'social':
        return Array.from({ length: complexity }).map((_, i) => (
          <circle key={i} cx={15 + random(i)*10} cy={15 + random(i+1)*10} r="2" fill={color} />
        ));
      case 'childhood':
        return <polygon points="20,10 30,30 10,30" fill="none" stroke={color} strokeWidth="1.5" />;
      default:
        return <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4,2" />;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
      <defs>
        <linearGradient id={`grad-${dream.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {renderContent()}
    </svg>
  );
};
