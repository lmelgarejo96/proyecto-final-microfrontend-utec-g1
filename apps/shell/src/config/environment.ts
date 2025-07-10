// Función segura para acceder a variables de entorno
const getEnvVar = (key: string): string | undefined => {
  if (typeof window !== 'undefined') {
    // En el navegador, usar window si está disponible
    return (window as any)._env?.[key] || undefined;
  }
  // En Node.js o durante el build
  return typeof process !== 'undefined' ? process.env[key] : undefined;
};

// Configuración de URLs por ambiente
const developmentUrls = {
  dashboard: 'http://localhost:3001',
  auth: 'http://localhost:3002',
  calificacion: 'http://localhost:3003',
};

const productionUrls = {
  dashboard: getEnvVar('REACT_APP_DASHBOARD_URL') || 'https://g1-dashboard.web.app',
  auth: getEnvVar('REACT_APP_AUTH_URL') || 'https://auth-prod-proyecto.web.app', 
  calificacion: getEnvVar('REACT_APP_CALIFICACION_URL') || 'https://g1-evaluacion.web.app',
};

const stagingUrls = {
  dashboard: getEnvVar('REACT_APP_DASHBOARD_URL') || 'https://g1-dashboard.web.app',
  auth: getEnvVar('REACT_APP_AUTH_URL') || 'https://auth-dev-proyecto.web.app',
  calificacion: getEnvVar('REACT_APP_CALIFICACION_URL') || 'https://g1-evaluacion.web.app',
};

// Detectar ambiente de forma segura
const getEnvironment = (): 'development' | 'staging' | 'production' => {
  const nodeEnv = getEnvVar('NODE_ENV');
  const stage = getEnvVar('REACT_APP_STAGE');
  
  // Si estamos en desarrollo local (puerto 3000)
  if (typeof window !== 'undefined' && window.location.port === '3000') {
    return 'development';
  }
  
  // Si NODE_ENV es production
  if (nodeEnv === 'production') {
    return stage === 'staging' ? 'staging' : 'production';
  }
  
  // Fallback a development
  return 'development';
};

const currentEnv = getEnvironment();

const environmentUrls = {
  development: developmentUrls,
  staging: stagingUrls,
  production: productionUrls,
};

export const environment = {
  production: currentEnv === 'production',
  development: currentEnv === 'development',
  staging: currentEnv === 'staging',
  currentEnvironment: currentEnv,
  
  // URLs base para los microfrontends
  microfrontendUrls: environmentUrls[currentEnv],
  
  // Configuración de Firebase
  firebase: {
    projectId: 'utec-app-3238d',
  }
}; 