import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/blog': {
        target: 'https://mint-quick-manager.glitch.me',
        changeOrigin: true,
      },
    },
  },
});
