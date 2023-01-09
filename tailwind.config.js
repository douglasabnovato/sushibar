/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#22c55e",
        tahiti: {
          100: "#000000",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",        
          42: "#BFBFBF",          
          44: "#DADADA",
          46: "#EFEFEF",
          48: "#E9E9E9",
          52: "#E5E5E5",
          54: "#ED6F32",
          56: "#4D4D4D",
          58: "rgba(77, 77, 77, 0.5)",
          60: "#f58853"
        },
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        xl2: '1.563rem',
        xl3: '1.953rem',
        xl4: '2.441rem',
        xl5: '3.052rem',
      },
      backgroundImage: {
        'sushibar': "url('/img/hero-pattern.svg')",
      }
    },
  },
  plugins: [],
};
