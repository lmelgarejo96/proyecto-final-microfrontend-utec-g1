export interface MicrofrontendConfig {
  name: string;
  url: string;
  route: string;
  title: string;
  description: string;
}

import { environment } from './environment';

export const microfrontends: MicrofrontendConfig[] = [
  {
    name: 'dashboard',
    url: `${environment.microfrontendUrls.dashboard}/mf-manifest.json`,
    route: '/dashboard',
    title: 'Dashboard',
    description: 'Dashboard de siniestros vehiculares'
  },
  {
    name: 'evaluacion',
    url: `${environment.microfrontendUrls.calificacion}/mf-manifest.json`,
    route: '/calificacion',
    title: 'Evaluación',
    description: 'Sistema de evaluación de clientes'
  },
  // Agregar más microfrontends aquí según necesites
  // {
  //   name: 'auth',
  //   url: process.env.NODE_ENV === 'production' 
  //     ? 'https://your-auth-url.web.app/mf-manifest.json'
  //     : 'http://localhost:3002/mf-manifest.json',
  //   route: '/auth',
  //   title: 'Authentication',
  //   description: 'Sistema de autenticación'
  // }
];

// Genera los remotes para module federation
export const generateRemotes = () => {
  const remotes: Record<string, string> = {
    'provider': 'rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json',
  };
  
  microfrontends.forEach(mf => {
    remotes[mf.name] = `${mf.name}@${mf.url}`;
  });
  
  return remotes;
}; 