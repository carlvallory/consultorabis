# Versiones v1 / v2 y cómo alternar grilla ↔ carrusel

El sitio tiene **dos variantes en vivo** para que el cliente compare, servidas como
rutas distintas en el mismo deploy:

| Ruta   | Variante | Quiénes Somos y Servicios          |
| ------ | -------- | ---------------------------------- |
| `/`    | **v1**   | grillas estáticas (sin slider)     |
| `/v2`  | **v2**   | carruseles (con slider)            |

Ambas comparten TODO lo demás (header, hero, contacto, formulario, footer, tipografía,
colores). `/v2` lleva `noindex` para que los buscadores no lo indexen como duplicado.

## Cómo está armado

- **`src/components/Home.astro`** — cuerpo completo de la página. Recibe una prop
  `variant` (`"static"` | `"slider"`) y decide qué componentes de sección renderiza:
  ```astro
  {variant === "slider" ? <QuienesSomosSlider /> : <QuienesSomos />}
  {variant === "slider" ? <ServiciosSlider />    : <Servicios />}
  ```
- **`src/pages/index.astro`** → `<Home variant="static" />`  (v1)
- **`src/pages/v2.astro`** → `<Home variant="slider" />`  (v2, con `noindex`)

Componentes de sección:

| Sección        | Grilla (estática)                   | Carrusel (slider)                               |
| -------------- | ----------------------------------- | ----------------------------------------------- |
| Quiénes Somos  | `src/components/QuienesSomos.astro` | `src/components/legacy/QuienesSomosSlider.astro`|
| Servicios      | `src/components/Servicios.astro`    | `src/components/legacy/ServiciosSlider.astro`   |

## Cuando el cliente decida

- **Si elige v1 (grillas):** borrar `src/pages/v2.astro`. (Opcional: mover los
  componentes `legacy/` fuera del proyecto si ya no se quieren conservar.)
- **Si elige v2 (carruseles):** cambiar la variante de la home a `slider`
  en `src/pages/index.astro` (`<Home variant="slider" />`) y borrar `src/pages/v2.astro`.

En cualquier caso, después de decidir queda una sola versión limpia en `/`.

## Notas

- Se pueden mezclar (p. ej. Quiénes Somos en grilla y Servicios en carrusel) editando el
  render condicional de `Home.astro`, o creando variantes adicionales.
- Si se edita el **texto** de una sección, aplicarlo en ambas versiones (grilla y
  carrusel) para que no se desincronicen.
- Los componentes en `legacy/` conservan el JS inline original de los carruseles
  (incluye algunos `console.log`); es la versión anterior tal cual.
