import React from 'react';
import ReactDOM from 'react-dom/client';
import AuroraField from '../pages/LiveArt/modes/AuroraField';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = (ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      return { osc, gain };
    };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <AuroraField />
        <LiveArtControls title="Aurora Field" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
