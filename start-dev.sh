#!/bin/bash

echo "Iniciando desarrollo local de microfrontends..."
echo ""

echo "Instalando dependencias del dashboard..."
cd dashboard
npm install

echo ""
echo "Iniciando dashboard en background..."
npm run dev &

echo ""
echo "Instalando dependencias del shell..."
cd ../shell
npm install

echo ""
echo "Iniciando shell..."
echo "Dashboard: http://localhost:3001"
echo "Shell: http://localhost:3000"
echo ""

npm run dev 