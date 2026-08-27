import React from 'react';
import ReactDOM from 'react-dom/client';
import LivingInk from '../pages/LiveArt/modes/LivingInk';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      return { osc, gain };
    };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <LivingInk />
        <LiveArtControls title="Living Ink" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
