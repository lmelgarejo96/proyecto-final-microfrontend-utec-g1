import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  
  // Configuración HTML
  html: {
    title: 'Dashboard de Siniestros Vehiculares',
  },
  
  // Configuración del servidor
  server: {
    port: 3001,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  
  // Definir variables globales
  source: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
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
