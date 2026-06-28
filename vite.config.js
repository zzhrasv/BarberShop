import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // 1. Tambahkan logo.png di includeAssets agar di-cache oleh Service Worker
      includeAssets: ['favicon.svg', 'icons.svg', 'logo_circle.png'],
      manifest: {
        name: "Eg'nin Barbershop",
        short_name: "Eg'nin Barbershop",
        description: 'Aplikasi Barbershop',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        // 2. Ubah src pada icons ke logo-circle.png dengan type image/png
        icons: [
          {
            src: 'logo_circle.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo_circle.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
