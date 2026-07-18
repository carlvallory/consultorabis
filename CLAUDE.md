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
4. **`#quienes-somos`** — slider de 3 slides (Empresa / Misión / Visión), JS inline con autoplay.
5. **`#servicios`** — slider de 6 servicios en tarjetas (Asesoramiento Financiero, Legal, Investigación, Estudios de Mercado, Elaboración y Evaluación de Proyectos, Capacitación), JS inline responsive.
6. **`#contactanos`** — botones a Instagram y Facebook.
7. **`#contacto`** — `FormularioContacto` (datos + form).
8. **`#maps`** — iframe de Google Maps embebido.
9. **Footer** — copyright + WhatsApp/LinkedIn.

## Convenciones de diseño

- **Paleta y tipografías documentadas en `paleta-de-colores.md`.** Colores de marca en `tailwind.config.js`:
  `logo-principal #db4f58`, `logo-secundario #e55e4b`, `logo-acento #fbc8b0`.
- Gradiente de marca recurrente: `bg-gradient-to-r from-logo-principal to-logo-secundario`.
- `global.css` fuerza un look rectilíneo: elimina `box-shadow` de `.shadow-*` y `border-radius` de `.rounded-lg` con `!important`. Tenerlo presente al añadir sombras/bordes redondeados: pueden ser anulados globalmente.
- Los sliders están implementados a mano con **JavaScript `<script is:inline>`** dentro de `index.astro` (no hay librería de carrusel). Cada uno maneja dots, flechas, autoplay y resize.

## Trabajo reciente (git)

Commits recientes se han centrado en el **hero / splash screen animado** (`RevolutionSliderAstro`, hasta v2.1 con layers 4 y 5) y en el **slider de Servicios** (hasta v1.1). El área más activa/frágil es la animación GSAP del hero.

## Gotchas / deuda técnica (verificar antes de asumir)

- **Formulario sin backend:** `FormularioContacto.astro` no tiene `action`, `method` ni handler JS. No envía nada. Si se pide "que el formulario funcione", hay que implementar el envío desde cero.
- **Dependencia Tailwind mixta:** además de `tailwindcss@3` (el que realmente se usa vía PostCSS), está instalado `@tailwindcss/vite@^4` que **no está conectado** en `astro.config.mjs`. Es una dependencia huérfana; no migrar a v4 sin decisión explícita.
- **Clase inexistente:** en `#contactanos` los botones usan `hover:bg-logo-acento-darker`, color que no existe en `tailwind.config.js` (no hace nada).
- **Clases de color duplicadas/contradictorias** en algunos títulos de `index.astro` (p. ej. `text-logo-secundario ... text-blue-800`). Gana la última que Tailwind emita; limpiar si se tocan.
- **`console.log` de depuración** presentes en los scripts de los sliders.
- **`README.md` es el starter por defecto de Astro** (no describe este proyecto). La documentación real es este `CLAUDE.md`.
- **`src/utils/helpers.js` está vacío** (reservado para uso futuro; se conserva a propósito).

## Por dónde empezar según la tarea

- **Contenido/textos, secciones, orden** → `src/pages/index.astro`.
- **Animación del hero** → `src/components/RevolutionSliderAstro.astro` (GSAP timeline).
- **Menú / navegación** → `src/components/NavMenu.astro`.
- **Formulario y datos de contacto** → `src/components/FormularioContacto.astro`.
- **Colores, fuentes, look global** → `tailwind.config.js` + `src/styles/global.css` (+ `paleta-de-colores.md`).
- **`<head>`, meta, SEO, fuentes** → `src/layouts/Layout.astro`.
