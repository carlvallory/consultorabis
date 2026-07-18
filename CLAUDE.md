# CLAUDE.md — Consultora Bis

Guía para cualquier IA que trabaje en este repositorio. Léela antes de tocar código.

## Qué es el proyecto

Sitio web **one-page** (landing) de **Consultora Bis**, una consultora de servicios empresariales y financieros ubicada en Asunción, Paraguay (Av. Gral. Máximo Santos / General Santos N° 2016). El sitio es principalmente informativo/institucional: presenta la empresa, sus servicios y sus canales de contacto.

- **Idioma del sitio:** español (`<html lang="es">`).
- **Naturaleza:** marketing estático. No hay backend, base de datos, ni autenticación.
- **Contacto real:** tel `+595 992 097 568`, `info@consultorabis.com`, WhatsApp, LinkedIn, Instagram, Facebook.

## Stack

- **Astro `^5.9.2`** — framework, salida estática (SSG). `astro.config.mjs` está vacío (config por defecto, sin integraciones).
- **Tailwind CSS `3.4.17`** vía **PostCSS** (`postcss.config.js` + `autoprefixer`). El CSS global usa sintaxis v3 (`@tailwind base/components/utilities`, `@apply`, `theme()`).
- **GSAP `^3.13.0`** — anima el hero (Revolution Slider).
- **Google Fonts:** Open Sans (títulos) + Source Sans Pro (cuerpo), cargadas en `Layout.astro`.

## Comandos

```sh
npm install       # instalar dependencias
npm run dev       # dev server → localhost:4321
npm run build     # build de producción → ./dist/
npm run preview   # previsualizar el build
```

## Estructura

```
src/
├── layouts/
│   └── Layout.astro          # <html>, <head>, fuentes, ViewTransitions, slot
├── pages/
│   └── index.astro           # ÚNICA página. Contiene todas las secciones + JS inline de los sliders
├── components/
│   ├── NavMenu.astro         # nav desktop + menú hamburguesa mobile (JS inline)
│   ├── RevolutionSliderAstro.astro  # hero animado con GSAP (6 capas/layers)
│   └── FormularioContacto.astro     # datos de contacto + formulario
├── styles/
│   └── global.css            # estilos base, tipografías, overrides de Tailwind
└── utils/
    └── helpers.js            # vacío (solo un comentario), reservado para uso futuro
public/
├── content/                  # imágenes del hero (corporate-*, arrow-*, logo-rows, consultoratexto) y cosultora-bis.png
├── logo.png, favicon.svg
└── icons8-*.{png,svg}        # íconos de redes sociales / contacto
```

## Secciones de `index.astro` (en orden)

1. **Header** — logo + `NavMenu`, sticky.
2. **`RevolutionSliderAstro`** — hero animado con GSAP (splash screen).
3. **Banner hero** — frase de valor sobre gradiente de marca.
4. **`#quienes-somos`** — grilla de 3 columnas (Empresa / Misión / Visión) con filete de acento superior. Contenido estático, sin JS.
5. **`#servicios`** — grilla 2×2 de 4 servicios en tarjetas (Asesoramiento Financiero, Estudios de Mercado, Elaboración y Evaluación de Proyectos, Capacitación). Contenido estático, sin JS.
6. **`#contactanos`** — `FormularioContacto` (heading + CTA, datos de contacto, redes "Seguinos" y formulario Web3Forms). Es el destino del enlace "Contáctanos" del menú.
7. **`#ubicacion`** — bloque de texto con dirección y teléfono (antes era un iframe de Google Maps, retirado a pedido del cliente).
8. **Footer** — copyright + WhatsApp/LinkedIn.

## Convenciones de diseño

- **Paleta y tipografías documentadas en `paleta-de-colores.md`.** Colores de marca en `tailwind.config.js`:
  `logo-principal #db4f58`, `logo-secundario #e55e4b`, `logo-acento #fbc8b0`.
- Gradiente de marca recurrente: `bg-gradient-to-r from-logo-principal to-logo-secundario`.
- **Sin sombras en todo el sitio** y esquinas redondeadas coherentes (decisión de diseño del cliente). No usar clases `shadow-*`; para separar zonas usar bordes sutiles (`border-b`/`border-t`).
- **Único JS de UI:** la animación GSAP del hero (`RevolutionSliderAstro`), que respeta `prefers-reduced-motion`. Las secciones Quiénes Somos y Servicios son grillas estáticas (ya no hay carruseles ni JS inline).

## Trabajo reciente (git)

Commits recientes se han centrado en el **hero / splash screen animado** (`RevolutionSliderAstro`, hasta v2.1 con layers 4 y 5) y en el **slider de Servicios** (hasta v1.1). El área más activa/frágil es la animación GSAP del hero.

## Gotchas / deuda técnica (verificar antes de asumir)

- **Formulario:** `FormularioContacto.astro` envía vía **Web3Forms** (fetch a `api.web3forms.com/submit`) con estados Enviando/Enviado/Error y honeypot anti-spam. Requiere la env var `PUBLIC_WEB3FORMS_KEY` (ver `.env.example`); configurarla en Vercel y en `.env` local. El access key es público por diseño. Los mensajes llegan al correo con el que se registró el key (previsto: `info@consultorabis.com.py`).
- **Dependencia Tailwind mixta:** además de `tailwindcss@3` (el que realmente se usa vía PostCSS), está instalado `@tailwindcss/vite@^4` que **no está conectado** en `astro.config.mjs`. Es una dependencia huérfana; no migrar a v4 sin decisión explícita.
- **`README.md` es el starter por defecto de Astro** (no describe este proyecto). La documentación real es este `CLAUDE.md`.
- **`src/utils/helpers.js` está vacío** (reservado para uso futuro; se conserva a propósito).

## Por dónde empezar según la tarea

- **Contenido/textos, secciones, orden** → `src/pages/index.astro`.
- **Animación del hero** → `src/components/RevolutionSliderAstro.astro` (GSAP timeline).
- **Menú / navegación** → `src/components/NavMenu.astro`.
- **Formulario y datos de contacto** → `src/components/FormularioContacto.astro`.
- **Colores, fuentes, look global** → `tailwind.config.js` + `src/styles/global.css` (+ `paleta-de-colores.md`).
- **`<head>`, meta, SEO, fuentes** → `src/layouts/Layout.astro`.
