import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path matches the GitHub Pages repo name so asset URLs resolve at
// https://<user>.github.io/TR001/.
export default defineConfig({
  plugins: [react()],
  base: '/TR001/',
});
