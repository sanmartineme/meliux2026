@echo off
chcp 65001 >nul
echo.
echo ▶ Mercado Play — Social Feature
echo   Servidor local de desarrollo
echo   ────────────────────────────────

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ✗ Node.js no encontrado.
    echo    Descargalo en: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=1" %%v in ('node -v') do set NODE_VER=%%v
echo  ✓ Node.js %NODE_VER%

:: Install if needed
if not exist "node_modules\" (
    echo.
    echo   Instalando dependencias (primera vez, puede tardar ~1 min)...
    call npm install --legacy-peer-deps
    echo  ✓ Dependencias instaladas
) else (
    echo  ✓ Dependencias ya instaladas
)

echo.
echo   Iniciando servidor en http://localhost:5173
echo   Presiona Ctrl+C para detener
echo   ────────────────────────────────
echo.

npm run dev
pause
