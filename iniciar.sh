#!/bin/bash
# =============================================
# Mercado Play — Social Feature
# Script de arranque para servidor local
# =============================================

set -e

CYAN='\033[0;36m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}▶ Mercado Play — Social Feature${NC}"
echo -e "${CYAN}  Servidor local de desarrollo${NC}"
echo "  ────────────────────────────────"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js no encontrado.${NC}"
  echo "  Descárgalo en: https://nodejs.org (versión 18 o superior)"
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo -e "${RED}✗ Node.js versión mínima requerida: 18. Tienes: $(node -v)${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm no encontrado.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo ""
  echo "  Instalando dependencias (primera vez, puede tardar ~1 min)..."
  npm install --legacy-peer-deps
  echo -e "${GREEN}✓ Dependencias instaladas${NC}"
else
  echo -e "${GREEN}✓ Dependencias ya instaladas${NC}"
fi

echo ""
echo -e "${YELLOW}  Iniciando servidor en http://localhost:5173${NC}"
echo -e "  Presiona ${CYAN}Ctrl+C${NC} para detener"
echo "  ────────────────────────────────"
echo ""

npm run dev
