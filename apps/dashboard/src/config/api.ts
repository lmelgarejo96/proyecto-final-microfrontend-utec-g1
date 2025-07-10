// Configuración de la API - centralizamos aquí todas las URLs
export const API_CONFIG = {
  // Por ahora usamos directamente la URL de producción
  // TODO: Configurar variables de entorno en Rsbuild
  BASE_URL: 'https://1s2nxrgxqc.execute-api.us-east-1.amazonaws.com/prod',
  ENDPOINTS: {
    DASHBOARD_ESTADO: '/dashboard/estado',
    DASHBOARD_TOP_CATEGORIAS: '/dashboard/top-categorias',
    DASHBOARD_TOP_CLIENTES: '/dashboard/top-clientes',
    DASHBOARD_PAGO: '/dashboard/pago',
    SINIESTRO: '/siniestro',
  }
} as const; 