
// NeuralSimulation.worker.ts

const N = 2000;
const MAX_CONNS = 60; // Max connections per neuron (~3% density)

// State arrays
const potentials = new Float32Array(N);
const thresholds = new Float32Array(N).fill(1.0);
const refractory = new Int32Array(N);
const types = new Int8Array(N); // 1 for excitatory, -1 for inhibitory

// Connection data
const connections = new Int32Array(N * MAX_CONNS).fill(-1);
const weights = new Float32Array(N * MAX_CONNS);

let state = "DEFAULT";
const params = {
  leak: 0.02,
  noise: 0.005,
  inhibition: 1.0,
  speed: 1.0,
};

// Transmission delay queue
const delays: { target: number; weight: number; time: number }[] = [];

function init() {
  for (let i = 0; i < N; i++) {
    // 80% excitatory, 20% inhibitory
    types[i] = Math.random() > 0.2 ? 1 : -1;
    
    // Random sparse connections
    for (let j = 0; j < MAX_CONNS; j++) {
      if (Math.random() < 0.8) {
        const target = Math.floor(Math.random() * N);
        if (target !== i) {
          connections[i * MAX_CONNS + j] = target;
          // Weights: excitatory is positive, inhibitory is negative
          weights[i * MAX_CONNS + j] = types[i] * (0.1 + Math.random() * 0.2);
        }
      }
    }
  }
}

init();

function update(externalStimulus: Float32Array, currentTime: number) {
  const fired = new Uint8Array(N);
  
  // Update state-specific params
  let currentLeak = params.leak;
  let currentNoise = params.noise;
  let currentInhibition = params.inhibition;

  if (state === "FOCUS") {
    currentInhibition = 1.8;
    currentNoise = 0.002;
  } else if (state === "SLEEP") {
    // Slow wave oscillation (1-2 Hz)
    const wave = Math.sin(currentTime * 0.005) * 0.5 + 0.5;
    currentNoise = 0.001 + wave * 0.02;
    currentLeak = 0.01;
  } else if (state === "CREATIVE") {
    currentInhibition = 0.6;
    currentNoise = 0.015;
  }

  // Global inhibition pool
  let totalFiring = 0;

  // Process delays
  for (let i = delays.length - 1; i >= 0; i--) {
    if (delays[i].time <= currentTime) {
      potentials[delays[i].target] += delays[i].weight;
      delays.splice(i, 1);
    }
  }

  for (let i = 0; i < N; i++) {
    if (refractory[i] > 0) {
      refractory[i]--;
      potentials[i] = 0;
      continue;
    }

    // Apply leak
    potentials[i] *= (1.0 - currentLeak);
    
    // Apply noise
    potentials[i] += (Math.random() - 0.5) * currentNoise;
    
    // Apply external stimulus (mouse)
    potentials[i] += externalStimulus[i];

    // Global inhibition scaling
    if (types[i] === -1) {
      // Inhibitory neurons are more active if network is over-excited
      potentials[i] += totalFiring * 0.05;
    }

    // Check for spike
    if (potentials[i] >= thresholds[i]) {
      fired[i] = 1;
      potentials[i] = 0;
      refractory[i] = 5; // 5 steps refractory
      totalFiring++;

      // Send signals to neighbors
      for (let j = 0; j < MAX_CONNS; j++) {
        const target = connections[i * MAX_CONNS + j];
        if (target === -1) break;
        
        let weight = weights[i * MAX_CONNS + j];
        if (types[i] === -1) weight *= currentInhibition;

        delays.push({
          target,
          weight,
          time: currentTime + 1 + Math.floor(Math.random() * 3)
        });
      }
    }
  }

  return { potentials, fired };
}

self.onmessage = (e) => {
  const { action, data, time } = e.data;
  if (action === "update") {
    const result = update(data.stimulus, time);
    // @ts-expect-error - Buffer transfer is valid in workers but not always in DOM types
    self.postMessage({ action: "render", potentials: result.potentials, fired: result.fired }, [result.potentials.buffer, result.fired.buffer]);
  } else if (action === "setState") {
    state = data.state;
  }
};
