/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin.html",
    "./post.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'], // Set Josefin Sans as the default sans font
      },
    },
  },
  plugins: [],
};
