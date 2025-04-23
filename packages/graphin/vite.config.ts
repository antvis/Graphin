import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './demo',
  server: {
    port: 8000,
    open: '/',
  },
  plugins: [react()],
});
