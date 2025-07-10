// Configuración de despliegue para Firebase - UN SOLO PROYECTO
const environments = {
    production: {
        projectId: 'utec-app',
        shell: {
            url: 'https://utec-app-32384.web.app'
        },
        dashboard: {
            url: 'https://g1-dashboard.web.app'
        },
        evaluacion: {
            url: 'https://g1-evaluacion.web.app'
        }
    }
};

module.exports = { environments };