// Configuración de variables de entorno para PRODUCCIÓN
module.exports = {
    NODE_ENV: 'production',
    REACT_APP_STAGE: 'production',

    // URLs de los microfrontends en producción
    REACT_APP_DASHBOARD_URL: 'https://dashboard-prod-proyecto.web.app',
    REACT_APP_AUTH_URL: 'https://auth-prod-proyecto.web.app',
    REACT_APP_CALIFICACION_URL: 'https://calificacion-prod-proyecto.web.app',

    // Firebase Configuration
    REACT_APP_FIREBASE_PROJECT_ID: 'shell-prod-proyecto'
};