/** @type {import('tailwindcss').Config} */
const formsPlugin = require('@tailwindcss/forms')
const scrollBarPlugin = require('tailwind-scrollbar')
const flowbitePlugin = require('flowbite')
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './node_modules/flowbite.{js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'ibm-plex-sans-arabic': ['IBM Plex Sans Arabic', 'sans-serif']
      }
    }
  },
  plugins: [formsPlugin({ strategy: 'class' }), scrollBarPlugin, flowbitePlugin]
}
