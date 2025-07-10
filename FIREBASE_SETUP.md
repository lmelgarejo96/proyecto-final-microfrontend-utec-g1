# 🔥 Configuración de Firebase - UN SOLO PROYECTO

## 🎯 Ventajas de usar un solo proyecto:

- ✅ **Más simple**: 1 proyecto vs 3 proyectos
- ✅ **Menos secrets**: Solo 2 secrets vs 4 secrets
- ✅ **Más económico**: Firebase cobra por proyecto
- ✅ **Fácil de gestionar**: Todo en un lugar

## 📋 Configuración paso a paso

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Click en **"Agregar proyecto"** o **"Add project"**
3. Nombre del proyecto: `utec-app-3238d`
4. Acepta los términos y crea el proyecto

### 2. Habilitar Firebase Hosting

1. En el proyecto, ve a **"Hosting"** en el menú lateral
2. Click en **"Comenzar"** o **"Get started"**
3. Sigue los pasos básicos (no te preocupes por los detalles ahora)

### 3. Crear sites adicionales

Firebase permite múltiples sites en un proyecto:

1. En **Hosting**, click en **"Agregar otro sitio"**
2. Crea estos sites:
   - `dashboard` (para el microfrontend de dashboard)
   - `evaluacion` (para el microfrontend de evaluación)
3. El site principal será para el Shell

### 4. Configurar Firebase CLI

```bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Obtener token para GitHub Actions
firebase login:ci
```

**Guarda el token** que aparece, lo necesitarás para GitHub Secrets.

### 5. Configurar cada microfrontend

```bash
# Configurar Shell (site principal)
cd apps/shell
firebase init hosting --project utec-app-3238d
# Cuando pregunte por el site, selecciona: utec-app-32384

# Configurar Dashboard (site adicional)
cd ../dashboard
firebase init hosting --project utec-app-3238d
# Cuando pregunte por el site, selecciona: g1-dashboard

# Configurar Evaluación (site adicional)
cd ../evaluacion
firebase init hosting --project utec-app-3238d
# Cuando pregunte por el site, selecciona: g1-evaluacion
```

### 6. Verificar configuración

Cada microfrontend debe tener su `firebase.json`:

```json
// apps/shell/firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

```json
// apps/dashboard/firebase.json
{
  "hosting": {
    "site": "g1-dashboard",
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

```json
// apps/evaluacion/firebase.json
{
  "hosting": {
    "site": "g1-evaluacion",
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 🌐 URLs resultantes

Después del despliegue tendrás:

- **Shell**: `https://utec-app-32384d.web.app`
- **Dashboard**: `https://g1-dashboard.web.app`
- **Evaluación**: `https://g1-evaluacion.web.app`

## 🔑 Secrets para GitHub

Solo necesitas configurar 2 secrets:

1. `FIREBASE_TOKEN` → El token de `firebase login:ci`
2. `FIREBASE_PROJECT_ID` → `utec-app-3238d`

## 🚀 Probar localmente

```bash
# Probar Shell
cd apps/shell
npm run build:prod
firebase serve --project utec-app-3238d

# Probar Dashboard
cd apps/dashboard
npm run build:prod
firebase serve --project utec-app-3238d

# Probar Evaluación
cd apps/evaluacion
npm run build:prod
firebase serve --project utec-app-3238d
```

## 🎉 ¡Listo!

Una vez configurado todo:

1. Configura los 2 secrets en GitHub
2. Haz push a `main`
3. El pipeline desplegará automáticamente los 3 microfrontends 