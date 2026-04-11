import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
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
            './expanded-articles.ts',
            './articles-march-2026.ts',
            './articles-missing-2026.ts'
          ]
        }
      }
    }
  }
});
