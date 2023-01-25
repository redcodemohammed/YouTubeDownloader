<script lang="ts" setup>
import { LOCALE, useSettingsStore } from '@/stores/settings'
const settingsStore = useSettingsStore()

settingsStore.setLocale(LOCALE.Ar)
</script>

<template>
  <main
    :data-theme="settingsStore.theme"
    class="select-none min-h-screen"
    :class="{
      'font-ibm-plex-sans-arabic': settingsStore.locale === LOCALE.Ar,
      'font-poppins': settingsStore.locale === LOCALE.En
    }"
    :dir="settingsStore.dir">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </main>
</template>
