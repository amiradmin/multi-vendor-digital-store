// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scans all files inside the app folder
    "./pages/**/*.{js,ts,jsx,tsx}", // Scans all files inside the pages folder (if applicable)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};