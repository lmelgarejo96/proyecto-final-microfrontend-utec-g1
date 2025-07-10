import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'dashboard',
  exposes: {
    '.': './src/App.tsx',
    './MicroApp': './src/MicroApp.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
  // dts: false,
});
