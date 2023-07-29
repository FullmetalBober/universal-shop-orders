import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://electrical-engineering-orders-api.vercel.app',
        changeOrigin: true,
      },
    },
  },
});
