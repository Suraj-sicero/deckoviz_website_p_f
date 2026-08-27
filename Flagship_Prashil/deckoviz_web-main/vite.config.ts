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
        gravity: resolve(__dirname, 'gravity.html')
      }
    }
  }
});
