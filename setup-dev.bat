@echo off
echo ================================================
echo    CONFIGURACION Y DESARROLLO - MICROFRONTENDS
echo ================================================
echo.

echo [1/4] Configurando variables de entorno...
echo NODE_ENV=development > apps\shell\.env.local
echo REACT_APP_STAGE=development >> apps\shell\.env.local
echo REACT_APP_DASHBOARD_URL=http://localhost:3001 >> apps\shell\.env.local
echo REACT_APP_CALIFICACION_URL=http://localhost:3003 >> apps\shell\.env.local
echo NODE_ENV=development > apps\dashboard\.env.local
echo REACT_APP_STAGE=development >> apps\dashboard\.env.local
echo NODE_ENV=development > apps\evaluacion\.env.local
echo REACT_APP_STAGE=development >> apps\evaluacion\.env.local
echo ✓ Variables de entorno configuradas

echo.
echo [2/4] Verificando dependencias...
if not exist "apps\shell\node_modules" (
    echo Instalando dependencias del shell...
    cd apps\shell
    call npm install
    cd ..\..
)

if not exist "apps\dashboard\node_modules" (
    echo Instalando dependencias del dashboard...
    cd apps\dashboard
    call npm install
    cd ..\..
)

if not exist "apps\evaluacion\node_modules" (
    echo Instalando dependencias de evaluacion...
    cd apps\evaluacion
    call npm install
    cd ..\..
)
echo ✓ Dependencias verificadas

echo.
echo [3/4] Iniciando servidores...
echo.
echo ================================================
echo  INSTRUCCIONES PARA DESARROLLO
echo ================================================
echo.
echo 1. Abre una nueva terminal y ejecuta:
echo    cd apps\dashboard ^&^& npm run dev
echo.
echo 2. Abre otra terminal y ejecuta:
echo    cd apps\shell ^&^& npm run dev
echo.
echo 3. Abre otra terminal y ejecuta:
echo    cd apps\evaluacion ^&^& npm run dev
echo.
echo 4. Accede a: http://localhost:3000
echo.
echo NOTA: Los servidores DEBEN ejecutarse en terminales separadas
echo       para que funcionen correctamente.
echo.
echo ================================================
echo  COMANDOS UTILES
echo ================================================
echo.
echo - Reinstalar dependencias: npm run install:all
echo - Solo dashboard: cd apps\dashboard ^&^& npm run dev
echo - Solo shell: cd apps\shell ^&^& npm run dev
echo - Solo evaluacion: cd apps\evaluacion ^&^& npm run dev
echo - Debugging: Busca el botón 🐛 en la app
echo.
echo ================================================

set /p choice="¿Quieres que abra las terminales automáticamente? (s/n): "
if /i "%choice%"=="s" (
    echo.
    echo Abriendo terminales...
    start cmd /k "cd apps\dashboard && echo === DASHBOARD SERVER === && npm run dev"
    timeout /t 3 /nobreak > nul
    start cmd /k "cd apps\shell && echo === SHELL SERVER === && npm run dev"
    timeout /t 3 /nobreak > nul
    start cmd /k "cd apps\evaluacion && echo === EVALUACION SERVER === && npm run dev"
    echo.
    echo ✓ Terminales abiertas
    echo ✓ Espera unos segundos y ve a: http://localhost:3000
) else (
    echo.
    echo Ejecuta manualmente:
    echo 1. cd apps\dashboard ^&^& npm run dev
    echo 2. cd apps\shell ^&^& npm run dev
    echo 3. cd apps\evaluacion ^&^& npm run dev
)

echo.
pause 