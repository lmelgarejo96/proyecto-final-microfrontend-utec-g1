# Guía de Despliegue - Microfrontends con Firebase Hosting

## 🏗️ Arquitectura de Despliegue

```
microfrontend-grupo1/
├── shell/              # Shell principal (host)
├── dashboard/          # Microfrontend del dashboard
├── deploy.bat         # Script de despliegue (Windows)
├── deploy.sh          # Script de despliegue (Unix)
├── package.json       # Gestión centralizada
└── firebase-deploy.config.js  # Configuración de ambientes
```

## 🚀 Despliegue Automatizado (Recomendado)

### Instalación de dependencias
```bash
npm run install:all
```

### Despliegue con un comando
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

## 🏭 Configuración de Ambientes

### Desarrollo (dev)
- **Shell**: `https://shell-dev-proyecto.web.app`
- **Dashboard**: `https://dashboard-dev-proyecto.web.app`

### Producción (prod)  
- **Shell**: `https://shell-prod-proyecto.web.app`
- **Dashboard**: `https://dashboard-prod-proyecto.web.app`

## 📋 Configuración Inicial

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

### 2. Crear proyectos de Firebase
Crear 4 proyectos en [Firebase Console](https://console.firebase.google.com):
- `shell-dev-proyecto` (Shell staging)
- `shell-prod-proyecto` (Shell producción)
- `dashboard-dev-proyecto` (Dashboard staging)
- `dashboard-prod-proyecto` (Dashboard producción)

### 3. Inicializar Firebase en cada app
```bash
# Ejecutar desde la raíz del proyecto
npm run firebase:init
```

### 4. Configurar variables de entorno
Actualizar URLs en:
- `shell/config/env.production.js`
- `shell/config/env.staging.js`
- `firebase-deploy.config.js`

## 🔧 Mejores Prácticas para URLs

### 1. Sistema de configuración por capas
```javascript
// Prioridad: Variables de entorno > Configuración por defecto
const productionUrls = {
  dashboard: process.env.REACT_APP_DASHBOARD_URL || 'https://dashboard-prod-proyecto.web.app'
};
```

### 2. Separación por ambientes
- **Variables de entorno**: Para CI/CD y configuración dinámica
- **Archivos de config**: Para valores por defecto
- **Detección automática**: Basada en `NODE_ENV` y `REACT_APP_STAGE`

### 3. Fallback robusto
```javascript
// Si falla la detección de ambiente, usar desarrollo
const currentEnv = getEnvironment() || 'development';
```

## 🎯 Proceso de Despliegue Manual

### 1. Construir todo
```bash
npm run build:all
```

### 2. Desplegar microfrontends primero
```bash
npm run deploy:dashboard
```

### 3. Desplegar shell al final
```bash
npm run deploy:shell
```

## 🔄 Desarrollo Local

### Opción 1: Todo junto
```bash
npm run dev
```

### Opción 2: Por separado
```bash
# Terminal 1
npm run dev:dashboard

# Terminal 2  
npm run dev:shell
```

## 📦 Agregar Nuevos Microfrontends

### 1. Crear estructura
```bash
mkdir nueva-app
cd nueva-app
# Configurar module federation
```

### 2. Actualizar configuración central
```javascript
// En shell/src/config/microfrontends.ts
{
  name: 'nueva-app',
  url: `${environment.microfrontendUrls.nuevaApp}/mf-manifest.json`,
  route: '/nueva-app',
  title: 'Nueva App',
  description: 'Descripción de la nueva app'
}
```

### 3. Actualizar variables de entorno
```javascript
// En shell/src/config/environment.ts
const productionUrls = {
  // ... otros
  nuevaApp: process.env.REACT_APP_NUEVA_APP_URL || 'https://nueva-app-prod.web.app'
};
```

### 4. Actualizar scripts de despliegue
```bash
# Agregar a package.json
"build:nueva-app": "cd nueva-app && npm run build:prod",
"deploy:nueva-app": "cd nueva-app && npm run deploy"
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev                    # Levantar todo
npm run dev:dashboard         # Solo dashboard
npm run dev:shell            # Solo shell

# Build
npm run build:all            # Construir todo
npm run build:dashboard      # Solo dashboard
npm run build:shell         # Solo shell

# Despliegue
npm run deploy:all          # Desplegar todo
npm run deploy:dashboard    # Solo dashboard
npm run deploy:shell       # Solo shell

# Instalación
npm run install:all         # Instalar dependencias de todo
```

## 🔍 Monitoreo y Debugging

### URLs de monitoreo:
- **Desarrollo**: 
  - Shell: https://shell-dev-proyecto.web.app
  - Dashboard: https://dashboard-dev-proyecto.web.app
- **Producción**:
  - Shell: https://shell-prod-proyecto.web.app
  - Dashboard: https://dashboard-prod-proyecto.web.app

### Debugging:
```bash
# Ver manifests
curl https://dashboard-prod-proyecto.web.app/mf-manifest.json

# Ver logs de Firebase
firebase functions:log --project shell-prod-proyecto
```

## ⚠️ Consideraciones Importantes

### 1. Orden de despliegue
```bash
# ✅ CORRECTO
Dashboard → Shell

# ❌ INCORRECTO  
Shell → Dashboard
```

### 2. Gestión de cache
- **Manifests**: Cache deshabilitado
- **Assets estáticos**: Cache largo (1 año)
- **HTML**: Cache corto (sin cache)

### 3. CORS y seguridad
- Headers CORS configurados automáticamente
- URLs permitidas configuradas en Firebase

### 4. Estrategia de rollback
```bash
# Ver versiones disponibles
firebase hosting:versions:list --project shell-prod-proyecto

# Rollback rápido
firebase hosting:versions:clone SOURCE_VERSION --project shell-prod-proyecto
```

## 🎓 Tips y Trucos

1. **Variables de entorno dinámicas**: Usar `REACT_APP_` prefix
2. **Testing de producción**: Usar ambiente staging primero
3. **Debugging**: Set `FEDERATION_DEBUG=true` para más logs
4. **Performance**: Preload de microfrontends críticos
5. **Monitoreo**: Firebase Analytics habilitado por defecto 