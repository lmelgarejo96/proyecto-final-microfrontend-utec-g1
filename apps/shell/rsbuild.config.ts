import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    host: 'localhost',
  },
  
  // Configuración HTML (usar template por defecto)
  html: {
    title: 'Microfrontend Shell',
  },
  
  // Definir variables globales para evitar errores de process
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_APP_STAGE': JSON.stringify(process.env.REACT_APP_STAGE || 'development'),
    },
  },
  
  // Configuración de build
  output: {
    distPath: {
      root: 'dist',
    },
  },
  
  // Configuración de desarrollo
  dev: {
    hmr: true,
    liveReload: true,
  },
  
  // Configuración de performance
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
});
