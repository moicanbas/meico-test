/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Puedes extender los colores para tu tema oscuro si deseas personalizar los colores
        darkText: "#E5E5E5",  // Color de texto para el modo oscuro
        lightText: "#1a1a1a", // Color de texto para el modo claro
      },
    },
  },
  darkMode: 'class',  // Esto habilita el modo oscuro mediante una clase 'dark' en el contenedor principal
  plugins: [],
}
