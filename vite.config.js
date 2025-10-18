// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://magnetico-server-1.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
