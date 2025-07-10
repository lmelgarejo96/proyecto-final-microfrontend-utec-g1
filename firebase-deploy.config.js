// Configuración de despliegue para Firebase
const environments = {
    development: {
        shell: {
            projectId: 'shell-dev-proyecto',
            url: 'https://shell-dev-proyecto.web.app'
        },
        dashboard: {
            projectId: 'dashboard-dev-proyecto',
            url: 'https://dashboard-dev-proyecto.web.app'
        }
    },
    production: {
        shell: {
            projectId: 'shell-prod-proyecto',
            url: 'https://shell-prod-proyecto.web.app'
        },
        dashboard: {
            projectId: 'dashboard-prod-proyecto',
            url: 'https://dashboard-prod-proyecto.web.app'
        }
    }
};

module.exports = { environments };