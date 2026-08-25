import React from 'react';
import ReactDOM from 'react-dom/client';
import Reverie from '../pages/LiveArt/modes/Reverie';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = (ctx) => {
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    const delay = ctx.createDelay();
    delay.delayTime.value = 0.3;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.5;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(masterGain);

    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    drone.type = 'sine';
    drone.frequency.value = 50;
    droneGain.gain.value = 0.3;
    drone.connect(droneGain);
    droneGain.connect(masterGain);
    drone.start();

    let isRunning = true;
    const spawnBubble = () => {
      if (!isRunning) return;
      if (ctx.state === 'running') {
        const currentVol = masterGain.gain.value;
        if (currentVol > 0.1) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const startFreq = 200 + Math.random() * 400;
          const endFreq = startFreq * (1.5 + Math.random());
          osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(currentVol * (0.4 + Math.random() * 0.4), ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08 + Math.random() * 0.05);
          osc.connect(gain);
          gain.connect(delay);
          gain.connect(masterGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }
      }
      const currentVol = masterGain.gain.value;
      const baseDelay = currentVol > 0.1 ? Math.max(15, 150 - (currentVol * 100)) : 100;
      setTimeout(spawnBubble, baseDelay + Math.random() * 50);
    };
    spawnBubble();
    return { osc: drone, gain: masterGain };
  };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <Reverie />
        <LiveArtControls title="Reverie" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
