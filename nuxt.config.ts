// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['assets/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ],
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    'nuxt-headlessui'
  ],
  headlessui: {
    prefix: 'Headless'
  },
  tailwindcss: {
    configPath: 'tailwind.config.js'
  },
  i18n: {
    lazy: false,
    langDir: 'locales',
    locales: [
      { code: 'ar', file: 'ar.json' },
      { code: 'en', file: 'en.json' }
    ],
    defaultLocale: 'ar',
    strategy: 'no_prefix'
  }
})
