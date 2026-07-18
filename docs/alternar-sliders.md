# Alternar Quiénes Somos / Servicios: grilla ↔ carrusel

Las secciones **Quiénes Somos** y **Nuestros Servicios** tienen dos presentaciones
intercambiables, y cambiar entre ellas es **una sola línea** por sección (no hace
falta volver atrás en los commits).

## Los componentes

| Sección        | Versión ACTUAL (grilla estática)      | Versión ANTERIOR (carrusel)                     |
| -------------- | ------------------------------------- | ----------------------------------------------- |
| Quiénes Somos  | `src/components/QuienesSomos.astro`   | `src/components/legacy/QuienesSomosSlider.astro`|
| Servicios      | `src/components/Servicios.astro`      | `src/components/legacy/ServiciosSlider.astro`   |

- **Grilla (actual):** contenido siempre visible, sin JavaScript. Quiénes Somos en 3
  columnas; Servicios en cuadrícula 2×2.
- **Carrusel (anterior):** un ítem por vez con flechas, dots y autoplay; usa
  `<script is:inline>`. Ambas versiones comparten el mismo contenido de texto y el
  mismo `id` de sección (`#quienes-somos`, `#servicios`), así que el menú sigue
  funcionando en cualquiera de los dos modos.

## Cómo cambiar (en `src/pages/index.astro`)

En el bloque de imports de arriba, cambiá **solo la ruta del import**. El nombre local
y la etiqueta `<QuienesSomos />` / `<Servicios />` no se tocan.

### Quiénes Somos

```diff
- import QuienesSomos from "../components/QuienesSomos.astro";
+ import QuienesSomos from "../components/legacy/QuienesSomosSlider.astro";
```

### Servicios

```diff
- import Servicios from "../components/Servicios.astro";
+ import Servicios from "../components/legacy/ServiciosSlider.astro";
```

Para volver a la grilla, revertí la ruta. Guardá y `npm run build` (o el deploy de
Vercel) toma el cambio. Se pueden alternar de forma independiente (una en grilla y la
otra en carrusel, si se quisiera).

## Notas

- Si en el futuro se edita el **texto** de alguna sección, conviene aplicarlo en ambas
  versiones (grilla y carrusel) para que queden sincronizadas.
- Los componentes de `legacy/` no se compilan mientras no se importen; no afectan el
  peso del sitio hasta que se usan.
