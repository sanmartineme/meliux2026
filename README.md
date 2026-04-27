# Mercado Play — Social Feature
> Prototipo funcional · Figma Make → Producción · Abril 2026

---

## Arranque rápido (servidor local)

### Mac / Linux
Doble clic en `iniciar.sh`  — o desde terminal:
```bash
chmod +x iniciar.sh && ./iniciar.sh
```

### Windows
Doble clic en `iniciar.bat`

### Manual
```bash
npm install --legacy-peer-deps
npm run dev
```
Abre **http://localhost:5173** en tu navegador.

---

## Rutas

| Ruta | Pantalla |
|------|----------|
| `/` | Splash screen |
| `/onboarding` | Onboarding 4 pasos |
| `/login` | Login Mercado Libre |
| `/perfil` | Perfil de comunidad y grupos |
| `/home` | Home con bandeja "Para vos" |
| `/contenido/:id` | Ficha de contenido |
| `/reproducir/:id` | Reproductor + post-consumo |
| `/recomendar/:id` | Enviar recomendación |

---

## Deploy

```bash
npm run build   # genera dist/
```

Sube `dist/` a tu servidor y configura redireccion a `index.html`.

## Requisitos

- Node.js 18+  →  https://nodejs.org
