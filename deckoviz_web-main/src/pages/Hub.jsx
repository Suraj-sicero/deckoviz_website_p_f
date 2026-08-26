import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hub.css';

const MODES = [
  { path: '/ink-tide', name: 'Ink Tide', desc: 'Real-time fluid dynamics simulation.', color: 'linear-gradient(135deg, #010a15, #004d7a)' },
  { path: '/murmuration', name: 'Murmuration', desc: 'GPU-instanced flocking simulation.', color: 'linear-gradient(135deg, #020508, #1a365d)' },
  { path: '/coral-bloom', name: 'Coral Bloom', desc: 'Reaction-diffusion organic growth.', color: 'linear-gradient(135deg, #120210, #801336)' },
  { path: '/reverie', name: 'Reverie', desc: 'Latent-space morphing color field.', color: 'linear-gradient(135deg, #1f1c18, #8e6e53)' },
  { path: '/aurora-ledger', name: 'Aurora Ledger', desc: 'Simulated weather-driven flow field.', color: 'linear-gradient(135deg, #010514, #0099ff)' },
  { path: '/ripple', name: 'Ripple', desc: 'Presence-reactive ambient fluid.', color: 'linear-gradient(135deg, #000000, #134e5e)' },
  { path: '/resonance', name: 'Resonance', desc: 'Audio-reactive standing waves.', color: 'linear-gradient(135deg, #020005, #4a00e0)' },
  { path: '/gravity', name: 'Gravity', desc: 'N-body gravitational simulation.', color: 'linear-gradient(135deg, #000205, #d38312)' }
];

export default function Hub() {
  return (
    <div className="hub-container">
      <motion.div 
        className="hub-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Deckoviz Portal</h1>
        <p>Select a Live Art Experience</p>
      </motion.div>

      <div className="hub-grid">
        {MODES.map((mode, i) => (
          <Link to={mode.path} key={mode.path} style={{ textDecoration: 'none' }}>
            <motion.div 
              className="hub-card"
              style={{ background: mode.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2>{mode.name}</h2>
              <p>{mode.desc}</p>
              <div className="card-glow" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
