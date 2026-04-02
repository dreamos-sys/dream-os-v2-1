/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dream: {
          900: '#022c22', 800: '#064e3b', 700: '#047857',
          600: '#059669', 500: '#10b981', 400: '#34d399',
        },
      },
    },
  },
  plugins: [],
}
