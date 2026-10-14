# Pendientes

Cambios pedidos el 2026-10-13.

## Quiénes Somos (`src/components/QuienesSomos.astro`)
- [ ] Borrar las columnas **Misión** y **Visión** (queda solo Empresa).
- [ ] Escribir **BIS** siempre en mayúsculas ("Consultora BIS").

## Contacto
- [ ] Agregar el enlace a LinkedIn: `https://lnkd.in/p/dS3vk89E` (enviado por el cliente).
  - Ojo: el footer de `Home.astro` usa otro enlace (`https://py.linkedin.com/company/consultora-bis`). Confirmar si se unifican.

## Dónde Encontrarnos (`#ubicacion` en `Home.astro`)
- [ ] Borrar la sección completa (y su enlace en `NavMenu.astro`, si tiene uno).

## Animación del hero (`src/components/RevolutionSliderAstro.astro`)
- [ ] Reemplazar la imagen que se ve pixelada.
- [ ] Mejorar la animación.

## Favicon
- [ ] Agregar el favicon de la marca. Hoy `public/favicon.svg` es el logo por defecto de Astro.

> Los cambios de componentes aplican a `/` y a `/v2`. Si alguno toca las versiones en carrusel, revisar también `src/components/legacy/`.
