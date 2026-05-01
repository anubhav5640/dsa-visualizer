// tailwind.config.js
export default {
  // "content" tells Tailwind WHICH files to scan for class names
  // It only includes CSS for classes it actually finds here (keeps bundle small)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class' means dark mode activates when you add class="dark" to <html>
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}