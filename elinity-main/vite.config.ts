import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 🔥 Important for correct routing on Netlify
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
