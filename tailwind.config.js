/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        success: "#138808",
        danger: {
          DEFAULT: "#FE0000",
        },
        domokun: "#3D2B1F",
        primary: {
          DEFAULT: "#ecc52c",
          bg: "#eecc4a"
        },
      }
    },
  },
  plugins: [],
}

