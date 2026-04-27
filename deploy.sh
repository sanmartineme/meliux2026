#!/bin/bash
# Mercado Play — Deploy Script
set -e

echo "📦 Mercado Play — Build & Deploy"
echo "================================="

echo "📥 Instalando dependencias..."
npm install

echo "🏗️  Construyendo para producción..."
npm run build

echo ""
echo "✅ Build completado! Los archivos están en ./dist/"
echo ""
echo "Para subir a un servidor estático, copia el contenido de dist/ a tu servidor."
echo "Recuerda configurar el servidor para redirigir todas las rutas a index.html"
echo ""
echo "Deploy rápido con Vercel:"
echo "  npx vercel dist/ --prod"
echo ""
echo "Deploy rápido con Netlify:"
echo "  npx netlify deploy --prod --dir=dist"
