import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // PDF libraries
          'pdf-vendor': ['react-pdf'],
          // UI libraries
          'ui-vendor': ['framer-motion', 'lucide-react', '@radix-ui/react-slider', '@radix-ui/react-tooltip'],
          // Utility libraries
          'utils-vendor': ['axios', 'date-fns'],
          // AI/API libraries
          'ai-vendor': ['openai', '@pinecone-database/pinecone'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
