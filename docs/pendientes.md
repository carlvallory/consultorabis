# Pendientes — handoff para otra sesión de Claude

> **Para la IA que lea esto:** este archivo es autocontenido. Leé primero `CLAUDE.md`
> (stack, estructura, convenciones) y después seguí esta lista. Los cambios los pidió
> el cliente el **2026-10-13**; al **2026-10-15** no hay nada implementado.
> Las rutas y números de línea se verificaron contra el commit `a42f9d2` (rama `main`);
> confirmalos con `grep` antes de editar por si el código cambió.

## Antes de empezar

```sh
git pull                 # traer lo último de origin/main
npm install
npm run dev              # localhost:4321 → revisar "/" (v1) y "/v2" (sliders)
```

- `Home.astro` es compartido por `/` y `/v2`, así que casi todo cambio aplica a ambas.
- Convenciones a respetar: **sin `shadow-*`**, separar zonas con bordes sutiles, colores
  de marca de `tailwind.config.js` (`logo-principal`, `logo-secundario`, `logo-acento`).
- Al terminar cada tarea: `npm run build` sin errores, marcar el checkbox acá y hacer un
  commit chico con mensaje en español estilo convencional (`feat:`, `fix:`, `chore:`…).

## Preguntas abiertas (hacérselas al usuario ANTES de implementar)

1. **BIS en mayúsculas:** ¿solo en Quiénes Somos o en todo el sitio (títulos `<title>`,
   footer, `alt` del logo, asunto del formulario)? Ver la lista de ocurrencias abajo.
2. **LinkedIn:** ¿el enlace nuevo `https://lnkd.in/p/dS3vk89E` reemplaza al del footer o
   se agrega en otro lugar (p. ej. junto a Instagram/Facebook en `#contactanos`)?
3. **Imagen pixelada del hero:** ¿cuál de las 6 capas es? ¿Hay un archivo nuevo en mejor
   resolución (ideal SVG)?
4. **Animación del hero:** ¿qué hay que mejorar concretamente (velocidad, orden, efecto,
   duración)?
5. **Favicon:** ¿qué archivo usar? ¿Lo entrega el cliente o se deriva del logo?

Las tareas que no dependen de respuestas (borrar Misión/Visión y borrar `#ubicacion`) se
pueden hacer de entrada.

---

## 1. Quiénes Somos — `src/components/QuienesSomos.astro`

- [x] **Borrar las columnas Misión y Visión.** _(hecho 2026-10-15; v2 también usa el bloque único)_ Queda solo el bloque "Consultora Bis".
  - Los bloques están marcados con `<!-- Misión -->` y `<!-- Visión -->`.
  - Al quedar una sola columna, cambiar la grilla `grid-cols-1 md:grid-cols-3` por un
    layout de una columna centrado (p. ej. `max-w-3xl mx-auto`) para que el texto no
    quede pegado a la izquierda ocupando un tercio del ancho.
  - Actualizar en `CLAUDE.md` la descripción de la sección 4 ("grilla de 3 columnas
    (Empresa / Misión / Visión)").
  - La versión en carrusel `src/components/legacy/QuienesSomosSlider.astro` (usada por
    `/v2`) también tiene slides de Misión y Visión: preguntar si se borran ahí también
    (lo lógico es que sí, para que v1 y v2 muestren el mismo contenido).
- [x] _(hecho 2026-10-15, en todo el sitio)_ **Escribir "BIS" en mayúsculas** ("Consultora BIS"). Ocurrencias visibles hoy:
  - `src/components/QuienesSomos.astro` — `<h3>` "Consultora Bis".
  - `src/components/legacy/QuienesSomosSlider.astro:34` — `<h3>` del slide.
  - `src/components/Home.astro:22` — `alt="Logo Consultora Bis"`.
  - `src/components/Home.astro:158` — footer "© … Consultora Bis".
  - `src/pages/index.astro:7-8` y `src/pages/v2.astro:9-10` — `title` y `description`.
  - `src/components/FormularioContacto.astro:102,107` — asunto/remitente del mail (no lo
    ve el visitante, pero sí el cliente al recibir consultas).
  - **No tocar** URLs ni emails (`consultorabis.com.py`, `instagram.com/consultorabis/`,
    `facebook.com/consultoraBis/`, `linkedin.com/company/consultora-bis`).

## 2. Contacto — enlace a LinkedIn

- [x] _(hecho 2026-10-15: botón en `#contactanos`; el footer no se tocó)_ Agregar el enlace de LinkedIn que mandó el cliente: `https://lnkd.in/p/dS3vk89E`.
  - Hoy hay **un solo** LinkedIn en el sitio: footer, `src/components/Home.astro:175`,
    apuntando a `https://py.linkedin.com/company/consultora-bis`.
  - Depende de la pregunta 2. Si se agrega en `#contactanos`, copiar el estilo de los
    botones de Instagram/Facebook (`Home.astro` ~líneas 76-100) y usar el ícono
    existente `public/icons8-linkedin.svg`.
  - Enlaces externos con `target="_blank" rel="noopener noreferrer"`, como los demás.

## 3. Borrar "Dónde Encontrarnos" — `#ubicacion`

- [x] _(hecho 2026-10-15; también se quitó el `border-b` de `#contacto`)_ Borrar la `<section id="ubicacion">` completa de `src/components/Home.astro`
  (~líneas 111-149, desde `<section id="ubicacion"` hasta su `</section>`, justo antes de
  `</main>`).
  - `NavMenu.astro` **no** tiene enlace a `#ubicacion` (solo Quiénes Somos, Servicios,
    Contáctanos), así que no hay que tocar el menú.
  - La dirección y el teléfono siguen visibles en `FormularioContacto.astro` (la
    dirección en ~línea 85), así que no se pierde información de contacto.
  - Actualizar `CLAUDE.md`: quitar el ítem 8 de "Secciones de la página".
  - Revisar que la sección `#contacto` (que queda última antes del footer) siga viéndose
    bien: tiene `border-b border-gray-100`, que contra el footer puede sobrar.

## 4. Hero animado — `src/components/RevolutionSliderAstro.astro`

Es el área más frágil del sitio (timeline GSAP). Respetar `prefers-reduced-motion`.

- [x] _(resuelto 2026-10-15: era `consultoratexto-06.png`; el archivo está bien, el pixelado venía de `image-rendering: crisp-edges` en `.slider-layer`, que se quitó)_ **Reemplazar la imagen pixelada** (pregunta 3). Capas e imágenes actuales:

  | Línea | Archivo (`public/content/`) | Tamaño real |
  |---|---|---|
  | 11 | `corporate-03.png` | 1935×239 |
  | 22 | `corporate-02.png` | 1938×259 |
  | 33 | `arrow-black-01.png` | 459×1300 |
  | 44 | `arrow-red-01.png` | 459×542 |
  | 55 | `logo-rows-05.png` | 792×817 |
  | 66 | `consultoratexto-06.png` | 2338×525 |

  Sospechosa probable: `logo-rows-05.png` (792 px, la de menor resolución) si se muestra
  grande en desktop/retina. Confirmar con el usuario o comparar tamaño renderizado vs.
  real en DevTools. Ojo: también existe `public/content/cosultora-bis.png` (1536×1024,
  2.3 MB, con typo en el nombre), usada en `Home.astro:49` fuera del hero; no confundir.
- [ ] **Mejorar la animación** (pregunta 4). No cambiar nada sin una indicación concreta
  del usuario. Probar en desktop y mobile, y con reduced-motion activado.

## 5. Favicon

- [x] _(hecho 2026-10-15: favicon.ico/PNG + apple-touch-icon derivados de `public/exports/logo-web-02.png`)_ Reemplazar `public/favicon.svg`, que hoy es **el logo por defecto de Astro**.
  - Se referencia en `src/layouts/Layout.astro:19`
    (`<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`).
  - Depende de la pregunta 5. El único logo disponible es `public/logo.png` (269×65,
    horizontal, no sirve tal cual como ícono cuadrado).
  - Ideal: SVG cuadrado + `apple-touch-icon` PNG 180×180, agregando el `<link>`
    correspondiente en `Layout.astro`.

---

## Al terminar todo

- [ ] `npm run build` sin errores y revisión visual de `/` y `/v2` (desktop y mobile).
- [ ] `CLAUDE.md` actualizado (secciones 4 y 8, y cualquier otra cosa que haya cambiado).
- [ ] Borrar o vaciar este archivo cuando no queden pendientes.
- [ ] `git push` a `origin/main` — confirmar con el usuario
  antes de pushear.
