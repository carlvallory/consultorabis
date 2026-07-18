# Paleta de colores — Consultora BIS

Paleta extraída del código del sitio (Astro + Tailwind CSS). Las variables de marca están definidas en `tailwind.config.js` y se usan a lo largo de `index.astro`, `NavMenu.astro` y `FormularioContacto.astro`.

## Colores de marca

Definidos como colores personalizados en `tailwind.config.js` → `theme.extend.colors`.

| Nombre           | HEX       | Muestra                                                              | Uso principal |
|------------------|-----------|---------------------------------------------------------------------|---------------|
| `logo-principal` | `#db4f58` | ![#db4f58](https://placehold.co/15x15/db4f58/db4f58.png) coral rojo | Color primario: enlaces, títulos, botones del slider, gradiente hero |
| `logo-secundario`| `#e55e4b` | ![#e55e4b](https://placehold.co/15x15/e55e4b/e55e4b.png) coral naranja | Hover de enlaces, subtítulos de servicios, cierre del gradiente hero |
| `logo-acento`    | `#fbc8b0` | ![#fbc8b0](https://placehold.co/15x15/fbc8b0/fbc8b0.png) durazno claro | Títulos sobre fondos oscuros, dots activos, estados hover suaves |

**Gradiente principal (hero / secciones destacadas):**
`bg-gradient-to-r from-logo-principal to-logo-secundario` → de `#db4f58` a `#e55e4b`.

## Colores funcionales / de acento

Utilidades de Tailwind usadas directamente en las plantillas.

| Token Tailwind | HEX aprox. | Uso |
|----------------|-----------|-----|
| `teal-600`     | `#0d9488` | Anillo de foco en inputs del formulario (`focus:ring-teal-600`) |
| `teal-800`     | `#115e59` | Hover del botón de envío del formulario |
| `orange-700`   | `#c2410c` | Fondo del botón de envío del formulario |
| `blue-800`     | `#1e40af` | Título de sección de servicios |

## Neutros

| Token Tailwind | HEX       | Uso |
|----------------|-----------|-----|
| `white`        | `#ffffff` | Texto sobre fondos de marca, fondos de tarjetas |
| `gray-50`      | `#f9fafb` | Fondos sutiles |
| `gray-100`     | `#f3f4f6` | Bordes divisores |
| `gray-300`     | `#d1d5db` | Bordes de inputs, dots inactivos |
| `gray-700`     | `#374151` | Texto de párrafos |
| `gray-800`     | `#1f2937` | Color de texto base del `body` |
| `gray-900`     | `#111827` | Texto de inputs, títulos oscuros |

## Tipografía asociada

| Rol            | Fuente             | Definición |
|----------------|--------------------|------------|
| Encabezados    | **Archivo**        | `fontFamily.heading` — `h1`–`h6`, enlaces (estándar corporativo) |
| Cuerpo         | **Inter**          | `fontFamily.body` — texto general |

## Nota

El componente `src/components/Welcome.astro` es la plantilla de inicio de Astro y contiene colores ajenos a la identidad del sitio (`#3245ff`, `#bc52ee`, `#d83333`, `#f041ff`, `#f5cee7`, etc.). **No forman parte de la paleta del proyecto** y pueden ignorarse o eliminarse.
