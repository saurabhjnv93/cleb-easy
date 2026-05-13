import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['cleb-easy.onrender.com'],
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
  },
})
