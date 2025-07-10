@echo off
echo Iniciando desarrollo local de microfrontends...
echo.

echo Instalando dependencias del dashboard...
cd dashboard
call npm install
start cmd /k "npm run dev"

echo.
echo Instalando dependencias del shell...
cd ../shell
call npm install
start cmd /k "npm run dev"

echo.
echo Aplicaciones iniciadas:
echo - Dashboard: http://localhost:3001
echo - Shell: http://localhost:3000
echo.
echo Presiona cualquier tecla para salir...
pause >nul 