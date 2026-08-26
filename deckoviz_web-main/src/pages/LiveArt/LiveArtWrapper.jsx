import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const MODES = [
  { path: '/ink-tide', name: 'Ink Tide' },
  { path: '/murmuration', name: 'Murmuration' },
  { path: '/coral-bloom', name: 'Coral Bloom' },
  { path: '/reverie', name: 'Reverie' },
  { path: '/aurora-ledger', name: 'Aurora Ledger' },
  { path: '/ripple', name: 'Ripple' },
  { path: '/resonance', name: 'Resonance' },
  { path: '/gravity', name: 'Gravity' }
];

export default function LiveArtWrapper() {
  const [isUiVisible, setIsUiVisible] = useState(true);
  const [isFrameMode, setIsFrameMode] = useState(false);
  const location = useLocation();

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

  return (
    <div className="live-art-container">
      <div className="canvas-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <Outlet context={{ isFrameMode }} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`ui-overlay ${(!isUiVisible || isFrameMode) ? 'hidden' : ''}`} style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {MODES.map((mode) => (
          <NavLink
            key={mode.path}
            to={mode.path}
            className={({ isActive }) => `mode-btn ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {mode.name}
          </NavLink>
        ))}
        <button 
          className={`mode-btn ${isFrameMode ? 'active' : ''}`}
          onClick={() => setIsFrameMode(!isFrameMode)}
          style={{ marginLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem' }}
        >
          [F] Frame Mode
        </button>
      </div>
    </div>
  );
}
