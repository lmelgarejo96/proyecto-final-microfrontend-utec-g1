# 🔥 Configurar Firebase CLI - Pasos exactos para tus sites

## 📋 Tienes estos sites creados:

- **g1-dashboard** → Para Dashboard
- **g1-evaluacion** → Para Evaluación
- **utec-app-32384** → Para Shell (site principal)
- **Proyecto**: `utec-app-3238d`

## 🚀 Pasos para configurar Firebase CLI:

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión
```bash
firebase login
```

### 3. Configurar Shell (apps/shell)
```bash
cd apps/shell
firebase init hosting --project utec-app-3238d
```

**Cuando pregunte por el site, selecciona:** `utec-app-32384`

### 4. Configurar Dashboard (apps/dashboard)
```bash
cd ../dashboard
firebase init hosting --project utec-app-3238d
```

**Cuando pregunte por el site, selecciona:** `g1-dashboard`

### 5. Configurar Evaluación (apps/evaluacion)
```bash
cd ../evaluacion
firebase init hosting --project utec-app-3238d
```

**Cuando pregunte por el site, selecciona:** `g1-evaluacion`

### 6. Obtener token para GitHub
```bash
firebase login:ci
```

**Guarda el token** que aparece.

## 📄 Archivos firebase.json resultantes:

### apps/shell/firebase.json
```json
{
  "hosting": {
    "site": "utec-app-32384",
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

### apps/dashboard/firebase.json
```json
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

### apps/evaluacion/firebase.json
```json
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

## 🔑 Secrets para GitHub:

Ve a tu repositorio → Settings → Secrets → Actions → New repository secret:

1. **FIREBASE_TOKEN** → El token de `firebase login:ci`
2. **FIREBASE_PROJECT_ID** → `utec-app-3238d`

## 🌐 URLs después del despliegue:

- **Shell**: https://utec-app-32384.web.app
- **Dashboard**: https://g1-dashboard.web.app
- **Evaluación**: https://g1-evaluacion.web.app

## ✅ Verificar configuración:

```bash
# Probar que todo funciona
firebase projects:list
firebase hosting:sites:list --project utec-app-3238d
```

## 🚀 Probar despliegue manual:

```bash
# Construir todo
npm run build:all

# Desplegar Dashboard
cd apps/dashboard
firebase deploy --project utec-app-3238d

# Desplegar Evaluación
cd ../evaluacion
firebase deploy --project utec-app-3238d

# Desplegar Shell
cd ../shell
firebase deploy --project utec-app-3238d
```

## 🎉 ¡Listo!

Una vez configurado todo, haz push a `main` y el pipeline se ejecutará automáticamente. 