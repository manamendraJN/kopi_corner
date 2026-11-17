// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // [placeholder] Replace with the live domain (used for canonical URLs and the social preview image).
  site: 'https://kopi-corner.example',
  output: 'static',
  trailingSlash: 'ignore',
  redirects: {
    '/contact': '/visit#contact',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--ff-fraunces',
      weights: ['300 700'],
      styles: ['normal', 'italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Hanken Grotesk',
      cssVariable: '--ff-hanken',
      weights: ['400 700'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Caveat',
      cssVariable: '--ff-caveat',
      weights: ['500 700'],
      styles: ['normal'],
      fallbacks: ['cursive'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
