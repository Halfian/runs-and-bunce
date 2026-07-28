import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: process.env.DEPLOY_ENV === 'vercel' || process.env.NODE_ENV === 'development'
  ? '/' // Vercel serves the app from the root path asset/ path
  : '/runs-and-bunce/', // GitHub Pages serves the app from the /runs-and-bunce/ path
});