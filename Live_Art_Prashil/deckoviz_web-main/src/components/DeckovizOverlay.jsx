import React, { useState, useEffect } from 'react';
import './DeckovizOverlay.css';

export default function DeckovizOverlay({ title, description }) {
  const [isUiVisible, setIsUiVisible] = useState(true);
  const [isFrameMode, setIsFrameMode] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleMouseMove = () => {
      setIsUiVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsUiVisible(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timeoutId = setTimeout(() => setIsUiVisible(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setIsFrameMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsFrameMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine if the UI should be hidden
  const hideUi = !isUiVisible || isFrameMode;

  return (
    <div className={`deckoviz-overlay ${hideUi ? 'hidden' : ''}`}>
      <div className="deckoviz-branding">
        <div className="deckoviz-logo"></div>
        <span>DECKOVIZ PORTAL</span>
      </div>
      
      <div className="deckoviz-info">
        <h1>{title}</h1>
        <p>{description}</p>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#888' }}>
          Press [F] to toggle Frame Mode
        </div>
      </div>

      <a href="/" className="deckoviz-back-btn">
        <span>←</span> Return to Portal
      </a>
    </div>
  );
}
