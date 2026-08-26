import React from 'react';
import ReactDOM from 'react-dom/client';
import OceanicBioluminescence from '../pages/LiveArt/modes/OceanicBioluminescence';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      return { osc, gain };
    };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <OceanicBioluminescence />
        <LiveArtControls title="Oceanic Bioluminescence" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
