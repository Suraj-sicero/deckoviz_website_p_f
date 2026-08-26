import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        inkTide: resolve(__dirname, 'ink-tide.html'),
        murmuration: resolve(__dirname, 'murmuration.html'),
        coralBloom: resolve(__dirname, 'coral-bloom.html'),
        reverie: resolve(__dirname, 'reverie.html'),
        auroraLedger: resolve(__dirname, 'aurora-ledger.html'),
        ripple: resolve(__dirname, 'ripple.html'),
        resonance: resolve(__dirname, 'resonance.html'),
        gravity: resolve(__dirname, 'gravity.html'),
        cosmicFluid: resolve(__dirname, '01-cosmic-fluid.html'),
        livingInk: resolve(__dirname, '02-living-ink.html'),
        auroraField: resolve(__dirname, '03-aurora-field.html'),
        digitalGarden: resolve(__dirname, '04-digital-garden.html'),
        lightArchitecture: resolve(__dirname, '05-light-architecture.html'),
        oceanicBioluminescence: resolve(__dirname, '06-oceanic-bioluminescence.html'),
        crystallineGrowth: resolve(__dirname, '07-crystalline-growth.html'),
        kineticSculpture: resolve(__dirname, '08-kinetic-sculpture.html')
      }
    }
  }
});
