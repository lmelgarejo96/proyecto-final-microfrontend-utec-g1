import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  mode: 'development',
  plugins: [
    react(),
    federation({
      name: 'customer',
      filename: 'remoteEntry.js',
      exposes: {
        './MicroApp': './src/MicroApp.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        minifyInternalExports: false,
      },
    },
  },
  server: {
    port: 3003,
    cors: true,
    origin: 'http://localhost:3003',
  },
});