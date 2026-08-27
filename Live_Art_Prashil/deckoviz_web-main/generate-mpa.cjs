const fs = require('fs');
const path = require('path');

// 1. Water / Fluid Audio (For Ink Tide)
function getWaterAudioString() {
  return `(ctx) => {
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
  }`;
}

// 2. Wind Audio (For Murmuration, Aurora Ledger, Reverie)
function getWindAudioString() {
  return `(ctx) => {
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 800;
    windFilter.Q.value = 3.0; 
    
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2; 
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 400;
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    noiseSource.connect(windFilter);
    windFilter.connect(masterGain);
    
    noiseSource.start();
    lfo.start();

    return { osc: noiseSource, gain: masterGain, filter: windFilter };
  }`;
}

// 3. Crackle/Organic Audio (For Coral Bloom, Ripple, Resonance)
function getCrackleAudioString() {
  return `(ctx) => {
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
  }`;
}

// 4. Rumble Audio (For Gravity)
function getRumbleAudioString() {
  return `(ctx) => {
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(ctx.destination);

    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.value = 150;
    rumbleFilter.Q.value = 1.0; 
    
    noiseSource.connect(rumbleFilter);
    rumbleFilter.connect(masterGain);
    noiseSource.start();

    return { osc: noiseSource, gain: masterGain, filter: rumbleFilter };
  }`;
}

const modes = [
  { 
    id: 'ink-tide', 
    comp: 'InkTide', 
    name: 'Ink Tide', 
    desc: 'Interactive fluid dynamics. Play with the mouse to create vortices.',
    audio: getWaterAudioString()
  },
  { 
    id: 'murmuration', 
    comp: 'Murmuration', 
    name: 'Murmuration', 
    desc: 'GPU-instanced flocking simulation. Guide the boids with your mouse.',
    audio: getWindAudioString()
  },
  { 
    id: 'coral-bloom', 
    comp: 'CoralBloom', 
    name: 'Coral Bloom', 
    desc: 'Reaction-Diffusion. Click to seed new growth.',
    audio: getCrackleAudioString()
  },
  { 
    id: 'reverie', 
    comp: 'Reverie', 
    name: 'Reverie', 
    desc: 'Latent-space morphing. Move mouse to shift the latent vectors.',
    audio: getWindAudioString()
  },
  { 
    id: 'aurora-ledger', 
    comp: 'AuroraLedger', 
    name: 'Aurora Ledger', 
    desc: 'Weather-driven flow field. Move mouse to create wind turbulence.',
    audio: getWindAudioString()
  },
  { 
    id: 'ripple', 
    comp: 'Ripple', 
    name: 'Ripple', 
    desc: 'Presence-reactive. Move mouse to spawn expanding ripples.',
    audio: getCrackleAudioString() // Alternatively water, but crackles fit raindrops
  },
  { 
    id: 'resonance', 
    comp: 'Resonance', 
    name: 'Resonance', 
    desc: 'Audio-reactive standing waves.',
    audio: getCrackleAudioString()
  },
  { 
    id: 'gravity', 
    comp: 'Gravity', 
    name: 'Gravity', 
    desc: 'N-body simulation. Mouse attracts the celestial bodies.',
    audio: getRumbleAudioString()
  }
];

const entriesDir = path.join(__dirname, 'src', 'entries');
if (!fs.existsSync(entriesDir)) fs.mkdirSync(entriesDir, { recursive: true });

modes.forEach(mode => {
  const jsxContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import ${mode.comp} from '../pages/LiveArt/modes/${mode.comp}';
import LiveArtControls from '../components/LiveArtControls';
import { LiveArtProvider } from '../contexts/LiveArtContext';
import '../index.css';

const generateAudio = ${mode.audio};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LiveArtProvider audioGenerator={generateAudio}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'black', overflow: 'hidden' }}>
        <${mode.comp} />
        <LiveArtControls title="${mode.name}" />
      </div>
    </LiveArtProvider>
  </React.StrictMode>,
);
`;
  fs.writeFileSync(path.join(entriesDir, `${mode.id}.jsx`), jsxContent);

  const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deckoviz - ${mode.name}</title>
  </head>
  <body style="margin: 0; overflow: hidden; background: black;">
    <div id="root"></div>
    <script type="module" src="/src/entries/${mode.id}.jsx"></script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(__dirname, `${mode.id}.html`), htmlContent);
});

console.log('Successfully generated 8 HTML files and 8 JSX entry points for old art.');
