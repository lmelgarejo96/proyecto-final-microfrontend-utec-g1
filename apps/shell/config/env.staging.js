// Configuración de variables de entorno para STAGING/DESARROLLO
module.exports = {
    NODE_ENV: 'production',
    REACT_APP_STAGE: 'staging',

    // URLs de los microfrontends en staging
    REACT_APP_DASHBOARD_URL: 'https://dashboard-dev-proyecto.web.app',
    REACT_APP_AUTH_URL: 'https://auth-dev-proyecto.web.app',
    REACT_APP_CALIFICACION_URL: 'https://calificacion-dev-proyecto.web.app',

    // Firebase Configuration
    REACT_APP_FIREBASE_PROJECT_ID: 'shell-dev-proyecto'
};