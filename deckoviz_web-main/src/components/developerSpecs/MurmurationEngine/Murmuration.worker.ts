
// Murmuration.worker.ts

const N = 10000; // Stabilize at 10k for performance
const GRID_SIZE = 40;
const BOUNDS = 100;

const positions = new Float32Array(N * 3);
const velocities = new Float32Array(N * 3);
const grid = new Int32Array(GRID_SIZE * GRID_SIZE * 50); // Max 50 boids per cell
const gridCounts = new Int32Array(GRID_SIZE * GRID_SIZE);

const params = {
  alignment: 0.05,
  cohesion: 0.02,
  separation: 0.1,
  maxSpeed: 0.5,
  friction: 0.99,
  predatorRepulsion: 1.5,
};

function init() {
  for (let i = 0; i < N; i++) {
    positions[i * 3] = (Math.random() - 0.5) * BOUNDS;
    positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }
}

init();

function update(predator: { x: number; y: number; active: boolean }) {
  // 1. Build Grid
  gridCounts.fill(0);
  for (let i = 0; i < N; i++) {
    const gx = Math.floor(((positions[i * 3] + BOUNDS / 2) / BOUNDS) * GRID_SIZE);
    const gy = Math.floor(((positions[i * 3 + 1] + BOUNDS / 2) / BOUNDS) * GRID_SIZE);
    
    if (gx >= 0 && gx < GRID_SIZE && gy >= 0 && gy < GRID_SIZE) {
      const idx = gy * GRID_SIZE + gx;
      if (gridCounts[idx] < 50) {
        grid[idx * 50 + gridCounts[idx]] = i;
        gridCounts[idx]++;
      }
    }
  }

  // 2. Compute Forces
  const newVelocities = new Float32Array(N * 3);
  
  for (let i = 0; i < N; i++) {
    const px = positions[i * 3];
    const py = positions[i * 3 + 1];
    const pz = positions[i * 3 + 2];
    
    let avgVX = 0, avgVY = 0, avgVZ = 0;
    let avgPX = 0, avgPY = 0, avgPZ = 0;
    let sepX = 0, sepY = 0, sepZ = 0;
    let count = 0;

    const gx = Math.floor(((px + BOUNDS / 2) / BOUNDS) * GRID_SIZE);
    const gy = Math.floor(((py + BOUNDS / 2) / BOUNDS) * GRID_SIZE);

    // Neighbor search (3x3 grid cells)
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const nx = gx + ox;
        const ny = gy + oy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          const idx = ny * GRID_SIZE + nx;
          for (let k = 0; k < gridCounts[idx]; k++) {
            const j = grid[idx * 50 + k];
            if (i === j) continue;

            const dx = positions[j * 3] - px;
            const dy = positions[j * 3 + 1] - py;
            const dz = positions[j * 3 + 2] - pz;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 25) { // Radius search
              avgVX += velocities[j * 3];
              avgVY += velocities[j * 3 + 1];
              avgVZ += velocities[j * 3 + 2];
              avgPX += positions[j * 3];
              avgPY += positions[j * 3 + 1];
              avgPZ += positions[j * 3 + 2];
              
              if (distSq < 4) {
                sepX -= dx / distSq;
                sepY -= dy / distSq;
                sepZ -= dz / distSq;
              }
              count++;
              if (count >= 8) break; // Limit to 8 neighbors
            }
          }
        }
        if (count >= 8) break;
      }
      if (count >= 8) break;
    }

    let vx = velocities[i * 3];
    let vy = velocities[i * 3 + 1];
    let vz = velocities[i * 3 + 2];

    if (count > 0) {
      avgVX /= count; avgVY /= count; avgVZ /= count;
      avgPX /= count; avgPY /= count; avgPZ /= count;
      
      // Alignment
      vx += (avgVX - vx) * params.alignment;
      vy += (avgVY - vy) * params.alignment;
      vz += (avgVZ - vz) * params.alignment;

      // Cohesion
      vx += (avgPX - px) * params.cohesion;
      vy += (avgPY - py) * params.cohesion;
      vz += (avgPZ - pz) * params.cohesion;

      // Separation
      vx += sepX * params.separation;
      vy += sepY * params.separation;
      vz += sepZ * params.separation;
    }

    // Global Coherence (Center pull)
    vx -= px * 0.0005;
    vy -= py * 0.0005;
    vz -= pz * 0.0005;

    // Predator Repulsion
    if (predator.active) {
      const dx = px - predator.x;
      const dy = py - predator.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 100) {
        const force = (1 - Math.sqrt(distSq) / 10) * params.predatorRepulsion;
        vx += (dx / Math.sqrt(distSq)) * force;
        vy += (dy / Math.sqrt(distSq)) * force;
      }
    }

    // Apply speed limits and update
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
    if (speed > params.maxSpeed) {
      vx = (vx / speed) * params.maxSpeed;
      vy = (vy / speed) * params.maxSpeed;
      vz = (vz / speed) * params.maxSpeed;
    }

    newVelocities[i * 3] = vx * params.friction;
    newVelocities[i * 3 + 1] = vy * params.friction;
    newVelocities[i * 3 + 2] = vz * params.friction;
  }

  // 3. Apply updates
  velocities.set(newVelocities);
  for (let i = 0; i < N; i++) {
    positions[i * 3] += velocities[i * 3];
    positions[i * 3 + 1] += velocities[i * 3 + 1];
    positions[i * 3 + 2] += velocities[i * 3 + 2];
    
    // Boundary wrap/bounce
    if (Math.abs(positions[i * 3]) > BOUNDS) velocities[i * 3] *= -1;
    if (Math.abs(positions[i * 3 + 1]) > BOUNDS) velocities[i * 3 + 1] *= -1;
    if (Math.abs(positions[i * 3 + 2]) > 20) velocities[i * 3 + 2] *= -1;
  }

  return { positions, velocities };
}

self.onmessage = (e) => {
  const { action, predator } = e.data;
  if (action === "update") {
    const result = update(predator);
    // @ts-expect-error - Buffer transfer is valid in workers but not always in DOM types
    self.postMessage({ action: "render", positions: result.positions, velocities: result.velocities }, [result.positions.buffer, result.velocities.buffer]);
  }
};
