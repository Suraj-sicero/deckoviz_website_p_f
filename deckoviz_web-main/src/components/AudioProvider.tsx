import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  toggle: () => {}
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;

    const saved = localStorage.getItem("deckoviz-audio");

    if (saved !== "paused") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay blocked"));
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
      localStorage.setItem("deckoviz-audio", "playing");
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("deckoviz-audio", "paused");
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggle }}>
      {children}
    </AudioContext.Provider>
  );
};
