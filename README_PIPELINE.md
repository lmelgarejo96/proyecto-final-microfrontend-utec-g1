# 🚀 Pipeline de GitHub Actions - Simple

## 📁 Un solo archivo

```
.github/workflows/deploy.yml    # Despliega a producción cuando haces push a main
```

## 🔄 Flujo de trabajo

```
Push a main → Build → Deploy a Firebase
```

## 🏗️ Orden de despliegue

1. **Dashboard** (primero)
2. **Evaluación** (segundo)
3. **Shell** (último - consume los otros)

## 🔑 Secrets necesarios

Solo 2 secrets en GitHub:
- `FIREBASE_TOKEN`
- `FIREBASE_PROJECT_ID` → `utec-app`

## 🚀 Activar

1. Configura los secrets en GitHub
2. Haz push a `main`
3. ¡El pipeline se ejecuta automáticamente! 