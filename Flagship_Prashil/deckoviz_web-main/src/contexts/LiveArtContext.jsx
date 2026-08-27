import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const LiveArtContext = createContext(null);

export function useLiveArt() {
  return useContext(LiveArtContext);
}

export function LiveArtProvider({ children, audioGenerator }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [intensity, setIntensity] = useState(0.5); // 0.0 to 1.0
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isFrameMode, setIsFrameMode] = useState(false);
  const [isMouseIdle, setIsMouseIdle] = useState(true);
  const [activeStyle, setActiveStyle] = useState(0); // 0=Vivid, 1=Topographical, 2=Original
  const isMouseIdleRef = useRef(true);
  
  const isTVMode = new URLSearchParams(window.location.search).get('mode') === 'tv';

  useEffect(() => {
    let timeout;
    const handleActivity = () => {
      setIsMouseIdle(false);
      isMouseIdleRef.current = false;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMouseIdle(true);
        isMouseIdleRef.current = true;
      }, 2000);
    };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchmove', handleActivity);
    
    // Start initial timer
    handleActivity();
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      clearTimeout(timeout);
    };
  }, []);
  
  const audioContextRef = useRef(null);
  const audioNodesRef = useRef(null);

  const togglePlay = () => setIsPlaying(p => !p);
  const triggerReset = () => setResetTrigger(prev => prev + 1);
  
  const toggleAudio = async () => {
    if (!isAudioEnabled) {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        if (audioGenerator) {
          audioNodesRef.current = audioGenerator(audioContextRef.current);
        }
      }
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      setIsAudioEnabled(true);
    } else {
      if (audioContextRef.current) {
        await audioContextRef.current.suspend();
      }
      setIsAudioEnabled(false);
    }
  };

  // Interactive Fluid Audio Modulation
  useEffect(() => {
    if (!isAudioEnabled) return;

    let lastTime = performance.now();
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let smoothedSpeed = 0;
    let targetSpeed = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt; // pixels per ms
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
      
      targetSpeed = speed;
    };

    const loop = () => {
      if (isMouseIdleRef.current || isTVMode) {
        // Auto-pilot sound! Make it gracefully swell and breathe.
        const now = performance.now();
        targetSpeed = 0.6 + Math.sin(now * 0.001) * 0.3;
      } else {
        targetSpeed *= 0.92; // rapid decay of target speed
      }
      
      smoothedSpeed += (targetSpeed - smoothedSpeed) * 0.1; // smooth interpolation

      if (audioNodesRef.current) {
        const { gain } = audioNodesRef.current;
        if (gain) {
          const clampedSpeed = Math.min(2.0, smoothedSpeed); // max speed 2.0
          const targetVolume = 0.0 + clampedSpeed * 0.45; // Idle is totally silent
          
          gain.gain.value += (targetVolume - gain.gain.value) * 0.1;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioEnabled]);

  const value = {
    isPlaying,
    togglePlay,
    intensity,
    setIntensity,
    resetTrigger,
    triggerReset,
    isAudioEnabled,
    toggleAudio,
    isFrameMode,
    setIsFrameMode,
    isTVMode,
    isMouseIdle,
    activeStyle,
    setActiveStyle,
    audioContext: audioContextRef.current
  };

  return (
    <LiveArtContext.Provider value={value}>
      {children}
    </LiveArtContext.Provider>
  );
}
