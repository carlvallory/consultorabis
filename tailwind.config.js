/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Open Sans"', 'sans-serif'], // Para encabezados
        'body': ['"Source Sans Pro"', 'sans-serif'],   // Para el texto del cuerpo
      },
      colors: {
        'logo-principal': '#db4f58', // Reemplaza con el color principal de tu logo
        'logo-secundario': '#e55e4b', // Reemplaza con el color secundario
        'logo-acento': '#fbc8b0',   // Reemplaza con un color de acento (opcional)
      },
    },
  },
  plugins: [],
}