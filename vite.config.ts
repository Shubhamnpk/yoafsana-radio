import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/yoafsana-radio/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['image.png'],
      manifest: false,
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.radio-browser\.info\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'radio-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-icons',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
          'framer-motion': ['framer-motion'],
          'recharts': ['recharts'],
          'lucide-react': ['lucide-react'],
          'zustand': ['zustand'],
          'react-virtual': ['@tanstack/react-virtual'],
          'react-hook-form': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'date-fns': ['date-fns'],
          'embla-carousel': ['embla-carousel-react'],
          'input-otp': ['input-otp'],
          'sonner': ['sonner'],
          'vaul': ['vaul'],
          'next-themes': ['next-themes'],
          'tailwind-merge': ['tailwind-merge', 'clsx', 'class-variance-authority'],
        },
      },
    },
  },
});
