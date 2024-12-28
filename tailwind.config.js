/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nord: {
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          snow0: '#D8DEE9',
          frost0: '#8FBCBB',
          frost1: '#88C0D0',
          frost2: '#81A1C1',
          frost3: '#5E81AC',
        }
      }
    },
  },
  plugins: [],
}