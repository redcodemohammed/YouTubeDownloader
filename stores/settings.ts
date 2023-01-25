import { defineStore } from 'pinia'

export enum THEME {
  Dark = 'dark',
  Light = 'light'
}

export enum LOCALE {
  Ar = 'ar',
  En = 'en'
}
export const useSettingsStore = defineStore('settings', () => {
  // locale
  const { locale, setLocale } = useI18n()
  const dir = computed(() => (locale.value === LOCALE.Ar ? 'rtl' : 'ltr'))

  // theme
  const themeCookie = useCookie('theme', { default: () => THEME.Light })
  const theme = ref(themeCookie.value || THEME.Light)
  function changeTheme(_theme: THEME) {
    theme.value = _theme
    themeCookie.value = _theme
  }
  return { dir, setLocale, locale, theme, changeTheme }
})
