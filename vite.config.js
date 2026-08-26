import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        inkTide: resolve(import.meta.dirname, 'ink-tide.html'),
        murmuration: resolve(import.meta.dirname, 'murmuration.html'),
        coralBloom: resolve(import.meta.dirname, 'coral-bloom.html'),
        reverie: resolve(import.meta.dirname, 'reverie.html'),
        auroraLedger: resolve(import.meta.dirname, 'aurora-ledger.html'),
        ripple: resolve(import.meta.dirname, 'ripple.html'),
        resonance: resolve(import.meta.dirname, 'resonance.html'),
        gravity: resolve(import.meta.dirname, 'gravity.html')
      }
    }
  }
})
