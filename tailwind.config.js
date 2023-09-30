/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      lightBg: "hsl(0, 0%, 98%)",
      lightEl: "hsl(0, 0%, 100%)",
      darkBg: "hsl(207, 26%, 17%)",
      darkEl: "hsl(209, 23%, 22%)",
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        country: "0.6fr 1fr",
      },
    },
  },
  plugins: [],
};
