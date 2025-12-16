import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  server: {
    port: 5173,
    proxy: {}
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks grandes
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'socket': ['@stomp/stompjs', 'socket.io-client', 'sockjs-client'],
          'ui-vendor': ['framer-motion', 'lucide-react', 'react-toastify']
        }
      }
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild'
  }
})