import react from '@vitejs/plugin-react';
import { join } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './docs',
  server: {
    port: 8002,
    open: '/',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@antv/gi-core-assets': join(__dirname, './src'),
    },
  },
});
