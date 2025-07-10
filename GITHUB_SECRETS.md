# 🔐 Configuración de Secrets de GitHub

Para que el pipeline de despliegue funcione correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub.

## 📍 Cómo configurar los secrets

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** > **Actions**
4. Click en **New repository secret**
5. Agrega cada uno de los siguientes secrets:

## 🔑 Secrets requeridos

Solo necesitas configurar estos **2 secrets** en GitHub:

| Secret Name | Descripción | Ejemplo |
|-------------|-------------|---------|
| `FIREBASE_TOKEN` | Token de Firebase CLI | `1//abcd1234...` |
| `FIREBASE_PROJECT_ID` | ID del proyecto Firebase | `utec-app` |

## 🔧 Configuración paso a paso

### 1. Crear UN proyecto de Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea 1 proyecto nuevo: `utec-app`
3. Habilita **Firebase Hosting**
4. Crea 3 sites en el proyecto:
   - Site principal: `utec-app-32384` (para Shell)
   - Site adicional: `g1-dashboard`
   - Site adicional: `g1-evaluacion`

### 2. Configurar Firebase CLI
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Obtener el token para GitHub Actions
firebase login:ci
```

### 3. Configurar cada microfrontend
```bash
# En cada carpeta (apps/shell, apps/dashboard, apps/evaluacion)
cd apps/shell
firebase init hosting --project utec-app
# Selecciona el site: utec-app-32384

cd ../dashboard
firebase init hosting --project utec-app
# Selecciona el site: g1-dashboard

cd ../evaluacion
firebase init hosting --project utec-app
# Selecciona el site: g1-evaluacion
```

### 4. Obtener Service Account Key
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona cualquier proyecto
3. Ve a **Project Settings** > **Service Accounts**
4. Click en **Generate New Private Key**
5. Descarga el archivo JSON
6. Copia todo el contenido del archivo JSON

## 🚀 Cómo funciona

**Un solo pipeline** (`.github/workflows/deploy.yml`) que:
- **Se ejecuta:** Cuando haces push a la rama `main`
- **Hace:** Construye y despliega todos los microfrontends a producción
- **Orden:** Dashboard → Evaluación → Shell (Shell al final porque consume a los demás)

## 🚀 Activar el pipeline

Una vez configurados los secrets:

1. Haz un commit y push a la rama `main`
2. El pipeline se ejecuta automáticamente
3. ¡Listo!

## 🔍 Verificar el despliegue

Después de que el pipeline termine exitosamente, puedes verificar:

- **Shell**: `https://utec-app-32384.web.app`
- **Dashboard**: `https://g1-dashboard.web.app`
- **Evaluación**: `https://g1-evaluacion.web.app`

## 🔒 Seguridad

- **Nunca** commits secrets o claves privadas en tu código
- Usa siempre GitHub Secrets para información sensible 