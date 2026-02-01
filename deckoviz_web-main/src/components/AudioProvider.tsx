"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const tracks = [
  "/sounds/ambient.mp3",
  "/sounds/ambient2.mp3",
  "/sounds/ambient3.mp3",
  // add more here later
];

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(tracks[0]));
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (i: number) => {
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[i]);
    audioRef.current.loop = true;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const toggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const next = () => {
    const newIndex = (index + 1) % tracks.length;
    setIndex(newIndex);
    playTrack(newIndex);
  };

  const prev = () => {
    const newIndex = (index - 1 + tracks.length) % tracks.length;
    setIndex(newIndex);
    playTrack(newIndex);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggle, next, prev }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
};
