/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          light: '#FFF2F2',    // Light pink/cream
          medium: '#A9B5DF',   // Light lavender
          primary: '#7886C7',  // Medium purple
          dark: '#2D336B',     // Deep navy
        },
        custom: {
          teal: {
            light: '#66D2CE',  // Light teal
            DEFAULT: '#2DAA9E' // Medium teal
          },
          gray: '#EAEAEA',     // Light gray
          beige: '#E3D2C3'     // Beige/tan
        },
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        }
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"]
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}