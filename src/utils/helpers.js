// src/utils/helpers.js
export function getAbsoluteUrl(relativePath) {
    // En un entorno de desarrollo, Astro sirve desde la raíz.
    // En producción, si tu base path no es '/', necesitarías ajustarlo.
    return new URL(relativePath, import.meta.env.BASE_URL).href;
}