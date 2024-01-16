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
        type: {
          DEFAULT: "#1E2329",
          100: "#4F5D6D",
          200: "#ABAFAF",
          300: "#A1ACAF",
        },
        neutral: {
          DEFAULT: "#899598",
          100: "#E1E7EC",
          200: "#EDEFF2",
          300: "#F6F7F9",
        },
      }
    },
  },
  plugins: [],
}

