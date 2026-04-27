# Mercado Play — Social Feature
## Proyecto generado desde Figma Make · Abril 2026

### Stack
- **React 18** + **TypeScript**
- **Vite 5** (bundler)
- **Tailwind CSS 3** (estilos)
- **React Router v6** (navegación)

---

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

---

## Build para producción

```bash
npm run build
```

Los archivos listos para subir quedan en la carpeta `dist/`.

---

## Deploy en servidor

### Opción A — Servidor estático (Nginx / Apache)

1. Corre `npm run build`
2. Sube el contenido de `dist/` al servidor
3. Configura el servidor para redirigir todas las rutas a `index.html`

**Nginx config mínima:**
```nginx
server {
    listen 80;
    root /var/www/mercado-play;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Opción B — Vercel (recomendado)
```bash
npx vercel --prod
```

### Opción C — Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### Opción D — GitHub Pages
```bash
npm run build && npx gh-pages -d dist
```

---

## Estructura del proyecto

```
src/
  app/
    App.tsx              ← Router principal
    context.tsx          ← Estado global (perfil, ratings, recomendaciones)
    data/
      content.ts         ← Catálogo de contenido y contactos
    components/
      Navbar.tsx         ← Barra de navegación MELI
      HeroBanner.tsx     ← Banner principal del home
      ContentCard.tsx    ← Cards (estándar, Para vos, landscape, top10)
      ContentRow.tsx     ← Filas de carousels
    pages/
      SplashPage.tsx     ← Pantalla inicial
      OnboardingPage.tsx ← Flujo de onboarding (4 pasos)  ← /onboarding
      LoginPage.tsx      ← Login con cuenta ML
      ProfilePage.tsx    ← Creación de perfil y grupos
      HomePage.tsx       ← Home con bandeja "Para vos"
      ContentDetailPage.tsx ← Ficha de contenido + rating
      VideoPlayerPage.tsx   ← Reproductor + flujo post-consumo
      RecommendPage.tsx     ← Selector de contactos para recomendar
  styles/
    index.css            ← Tailwind + tokens CSS custom
```

---

## Rutas disponibles

| Ruta | Página |
|------|--------|
| `/` | Splash (redirige a /onboarding) |
| `/onboarding` | Onboarding 4 pasos ← **URL del Figma site** |
| `/login` | Login Mercado Libre |
| `/profile` | Crear perfil de comunidad y grupos |
| `/home` | Home con bandeja "Para vos" |
| `/content/:id` | Ficha de contenido |
| `/player/:id` | Reproductor + post-consumo |
| `/recommend/:id` | Enviar recomendación |

---

## Design System

Tokens fiel al MELI Streaming DS (Andes UI):

| Token | Valor |
|-------|-------|
| Amarillo primario | `#FFE600` |
| Fondo página | `#0A0A0A` |
| Surface 1 | `#141414` |
| Surface 2 | `#1C1C1C` |
| Texto muted | `#B0B0B0` |
| Border default | `#2E2E2E` |

---

*Generado por Claude · MELI UX Challenge · Sprint 2 días*
