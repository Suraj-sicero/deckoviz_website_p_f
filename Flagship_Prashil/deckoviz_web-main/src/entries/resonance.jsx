import React from 'react';
import ReactDOM from 'react-dom/client';
import Resonance from '../pages/LiveArt/modes/Resonance';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = (ctx) => {
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    let isRunning = true;
    const spawnCrackle = () => {
      if (!isRunning) return;
      if (ctx.state === 'running') {
        const currentVol = masterGain.gain.value;
        if (currentVol > 0.05) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(3000 + Math.random() * 2000, ctx.currentTime);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(currentVol * (0.1 + Math.random() * 0.2), ctx.currentTime + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
          
          osc.connect(gain);
          gain.connect(masterGain);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
      }
      const currentVol = masterGain.gain.value;
      const baseDelay = currentVol > 0.1 ? Math.max(5, 50 - (currentVol * 40)) : 100;
      setTimeout(spawnCrackle, baseDelay + Math.random() * 20);
    };
    spawnCrackle();
    
    const bufferSize = ctx.sampleRate * 1;
    const droneBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = droneBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const droneSource = ctx.createBufferSource();
    droneSource.buffer = droneBuffer;
    droneSource.loop = true;
    
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 100;
    
    droneSource.connect(droneFilter);
    droneFilter.connect(masterGain);
    droneSource.start();

    return { osc: droneSource, gain: masterGain, filter: droneFilter };
  };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <Resonance />
        <LiveArtControls title="Resonance" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
