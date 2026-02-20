import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-helmet': ['react-helmet-async'],
          'vendor-icons': ['lucide-react'],
          // Split article content (the heaviest data)
          'content-articles': [
            './new-articles.ts',
            './new-articles-part2.ts',
            './new-articles-part3.ts',
            './new-articles-part4.ts',
            './new-articles-2026-02-18.ts',
            './articles-feb17.ts',
            './expanded-articles.ts'
          ]
        }
      }
    }
  }
});
