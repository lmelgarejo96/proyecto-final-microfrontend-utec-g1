# 🏗️ Microfrontend Sistema - Grupo 1

Sistema escalable de microfrontends usando **Module Federation** con **React**, **TypeScript** y despliegue en **Firebase Hosting**.

## 🚀 Inicio Rápido

```bash
# Setup completo (todo en uno)
setup-dev.bat

# O manualmente
npm run install:all
npm run dev
```

## 📋 Características

- ✅ **Arquitectura de Microfrontends** con Module Federation
- ✅ **Routing dinámico** y navegación centralizada  
- ✅ **Despliegue automatizado** a Firebase Hosting
- ✅ **Multi-ambiente** (desarrollo, staging, producción)
- ✅ **Gestión centralizada** de configuración
- ✅ **TypeScript** en toda la aplicación
- ✅ **Error Boundaries** y manejo de errores
- ✅ **Hot Reload** en desarrollo

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Shell App     │    │  Dashboard App  │    │  Future Apps    │
│  (Host/Router)  │◄──►│ (Microfrontend) │    │ (Auth, etc.)    │
│                 │    │                 │    │                 │
│ - Navigation    │    │ - KPIs         │    │ - Auth          │
│ - Routing       │    │ - DataTables   │    │ - Calificación  │
│ - Layout        │    │ - Filters      │    │ - ...           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Microfrontends Actuales

| App | Puerto | Ruta | Descripción |
|-----|--------|------|-------------|
| **Shell** | 3000 | `/` | Host principal y navegación |
| **Dashboard** | 3001 | `/dashboard` | Dashboard de siniestros vehiculares |

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Module Federation**: RSBuild + Module Federation Plugin
- **UI Components**: PrimeReact + PrimeFlex
- **Routing**: React Router DOM v7
- **Build Tool**: RSBuild (Rust-based, fast)
- **Hosting**: Firebase Hosting
- **Development**: Concurrently para múltiples apps

## 📦 Estructura del Proyecto

```
microfrontend-grupo1/
├── 📁 apps/                    # Aplicaciones
│   ├── 📁 shell/               # Host principal
│   │   ├── src/
│   │   │   ├── components/     # Navegación, Home, etc.
│   │   │   ├── config/         # Configuración de MFs
│   │   │   └── types/          # Tipos para módulos federados
│   │   ├── firebase.json
│   │   └── module-federation.config.ts
│   └── 📁 dashboard/           # Microfrontend Dashboard
│       ├── src/
│       │   ├── components/     # KPIs, DataTables, etc.
│       │   ├── hooks/          # Custom hooks
│       │   ├── services/       # API services
│       │   ├── App.tsx         # App standalone
│       │   └── MicroApp.tsx    # App para microfrontend
│       ├── firebase.json
│       └── module-federation.config.ts
├── 📄 package.json             # Scripts centralizados
├── 📄 setup-dev.bat            # Setup completo
├── 📄 firebase-deploy.config.js # Config de ambientes
└── 📄 DEPLOYMENT.md            # Guía detallada
```

## 🔧 Configuración de Desarrollo

### Requisitos Previos

- Node.js 18+
- npm 9+
- Firebase CLI
- Git

### Instalación

```bash
# Clonar repositorio
git clone <tu-repo>
cd microfrontend-grupo1

# Setup completo (instala dependencias y configura)
setup-dev.bat

# O manualmente
npm run install:all
```

## 🎯 Comandos Principales

### Desarrollo
```bash
# Opción 1: Setup automático
setup-dev.bat

# Opción 2: Manual
npm run dev

# Apps individuales
npm run dev:shell      # Solo shell (puerto 3000)
npm run dev:dashboard  # Solo dashboard (puerto 3001)
```

### Build y Despliegue
```bash
# Build de todo
npm run build:all

# Despliegue completo
npm run deploy:all

# Despliegue individual
npm run deploy:shell
npm run deploy:dashboard
```

## 🌐 URLs y Ambientes

### Desarrollo Local
- **Shell**: http://localhost:3000
- **Dashboard**: http://localhost:3001

### Staging
- **Shell**: https://shell-dev-proyecto.web.app
- **Dashboard**: https://dashboard-dev-proyecto.web.app

### Producción
- **Shell**: https://shell-prod-proyecto.web.app
- **Dashboard**: https://dashboard-prod-proyecto.web.app

## 📋 Mejores Prácticas Implementadas

### 1. **Gestión de URLs**
```typescript
// Configuración por capas con fallbacks
const productionUrls = {
  dashboard: process.env.REACT_APP_DASHBOARD_URL || 'https://default-url.web.app'
};
```

### 2. **Separación de Concerns**
- **Shell**: Solo navegación y routing
- **Microfrontends**: Lógica de negocio específica
- **Shared**: Configuración y tipos comunes

### 3. **Error Handling**
```typescript
// Error boundaries en cada nivel
<Suspense fallback={<Loading />}>
  <MicrofrontendLoader />
</Suspense>
```

### 4. **Performance**
- Lazy loading de microfrontends
- Code splitting automático
- Shared dependencies optimizadas

## 🔄 Flujo de Desarrollo

### 1. **Desarrollo de Features**
```bash
# 1. Desarrollar en el microfrontend específico
cd apps/dashboard
npm run dev

# 2. Probar integración con shell
cd ../../
npm run dev
```

### 2. **Testing**
```bash
# Testing local
npm run dev

# Testing staging
npm run deploy:all  # Con ambiente "dev"
```

### 3. **Producción**
```bash
# Despliegue a producción
npm run deploy:all  # Con ambiente "prod"
```

## 🆕 Agregando Nuevos Microfrontends

### 1. Crear Nueva App
```bash
mkdir apps/nueva-app
cd apps/nueva-app
# Configurar RSBuild + Module Federation
```

### 2. Registrar en Shell
```typescript
// shell/src/config/microfrontends.ts
{
  name: 'nueva-app',
  url: `${environment.microfrontendUrls.nuevaApp}/mf-manifest.json`,
  route: '/nueva-app',
  title: 'Nueva App',
  description: 'Descripción'
}
```

### 3. Configurar URLs
```typescript
// shell/src/config/environment.ts
const productionUrls = {
  // ... existentes
  nuevaApp: process.env.REACT_APP_NUEVA_APP_URL || 'https://nueva-app-prod.web.app'
};
```

### 4. Actualizar Scripts
```json
// package.json
{
  "scripts": {
    "dev:nueva-app": "cd nueva-app && npm run dev",
    "build:nueva-app": "cd nueva-app && npm run build:prod",
    "deploy:nueva-app": "cd nueva-app && npm run deploy"
  }
}
```

## 🐛 Debugging

### Verificar Module Federation
```bash
# Ver manifests
curl http://localhost:3001/mf-manifest.json
curl https://dashboard-prod-proyecto.web.app/mf-manifest.json

# Debug de tipos
export FEDERATION_DEBUG=true
npm run dev
```

### Logs de Firebase
```bash
firebase functions:log --project shell-prod-proyecto
```

## 🔒 Seguridad

- **CORS** configurado automáticamente
- **Headers de seguridad** en Firebase
- **Variables de entorno** para URLs sensibles
- **Validation** de microfrontends cargados

## 📈 Performance

### Optimizaciones Implementadas
- **Lazy Loading**: Microfrontends se cargan bajo demanda
- **Code Splitting**: División automática por rutas
- **Shared Dependencies**: React compartido entre apps
- **Caching**: Estrategia optimizada para assets

### Métricas
- **First Load**: <3s
- **Route Changes**: <1s  
- **Bundle Size**: Shell ~125KB, Dashboard ~394KB

## 🤝 Contribución

### Proceso
1. Fork del repositorio
2. Crear feature branch
3. Desarrollar y probar localmente
4. Probar en staging
5. Pull request con descripción detallada

### Estándares
- TypeScript obligatorio
- Tests para features críticas
- Documentación actualizada
- Performance budget respetado

## 📚 Documentación Adicional

- [📖 Guía de Despliegue Completa](DEPLOYMENT.md)
- [🏗️ Arquitectura Detallada](docs/architecture.md)
- [🔧 Configuración Avanzada](docs/configuration.md)
- [🐛 Troubleshooting](docs/troubleshooting.md)

## 📞 Soporte

- **Issues**: [GitHub Issues](../../issues)
- **Documentación**: [Wiki del proyecto](../../wiki)
- **Chat**: [Discord/Slack del equipo]

---

### 🎉 ¡Proyecto listo para escalar!

Este setup te permite agregar fácilmente nuevos microfrontends manteniendo la independencia de desarrollo y despliegue de cada equipo. 