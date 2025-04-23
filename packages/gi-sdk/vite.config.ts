import { join } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './docs',
  server: {
    port: 8001,
    open: '/',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@antv/gi-sdk': join(__dirname, './src'),
    },
  },
});
