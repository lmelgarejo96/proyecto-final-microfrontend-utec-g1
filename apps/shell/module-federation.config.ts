import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
import { generateRemotes } from './src/config/microfrontends';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: generateRemotes(),
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    'react-router-dom': { singleton: true },
  },
});
