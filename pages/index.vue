<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const videoUrl = ref('')
const loading = ref(false)
const showVideoWithAudio = ref(false)
const errorMessage = ref<string | undefined>('')

const results = ref<DownloadResponse | undefined>()

async function downloadVideo() {
  try {
    results.value = undefined
    errorMessage.value = undefined
    loading.value = true
    const body = JSON.stringify({ url: videoUrl.value })
    const downloadData = await $fetch('/api/download', { method: 'POST', body })

    results.value = downloadData
  } catch (error: any) {
    if (error.statusMessage === 'invalid download url') {
      errorMessage.value = 'رابط التنزيل غير صالح'
    }
  } finally {
    loading.value = false
  }
}

const videos = computed(
  () =>
    results.value?.results.video.filter((video) => {
      if (showVideoWithAudio.value) return video.hasSound
      return true
    }) || []
)
</script>

<template>
  <section
    class="flex flex-col pt-44 justify-center items-center gap-10 max-w-7xl mx-auto font-ibm-plex-sans-arabic px-5">
    <div class="">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
        {{ $t('home.hero.main-text') }}
      </h1>
    </div>

    <form :aria-disabled="loading" dir="auto" class="w-full max-w-3xl" @submit.prevent="downloadVideo">
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          :aria-label="loading ? 'disabled input' : ''"
          v-model="videoUrl"
          :disabled="loading"
          type="url"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          :placeholder="$t('home.hero.download-link')"
          required />
        <button
          type="submit"
          :disabled="loading"
          :class="{}"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg
            v-if="loading"
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor" />
          </svg>
          {{ $t('home.hero.download') }}
        </button>
      </div>
      <p v-if="errorMessage" class="mt-2 text-sm text-end text-red-600 dark:text-red-500">
        <span class="font-medium">{{ errorMessage }}</span>
      </p>

      <div class="text-end">
        <label class="relative inline-flex items-center cursor-pointer my-10 text-white">
          <input v-model="showVideoWithAudio" type="checkbox" value="" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium dark:text-gray-300">عرض الفيديو الذي يحتوي على صوت فقط</span>
        </label>
      </div>
    </form>

    <!-- result -->
    <div class="text-white space-y-7 max-w-2xl xl:max-w-3xl" v-if="results">
      <img :src="results.art" alt="" srcset="" />
      <h2 class="text-3xl">{{ results.title }}</h2>

      <div class="w-full h-px bg-gray-500" role="divider"></div>
      <!-- videos -->
      <h1 class="text-2xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-white">الفيديو</h1>
      <div class="grid md:grid-cols-2 gap-5">
        <!-- video card -->
        <div dir="auto" class="bg-white p-5 flex flex-col rounded-md text-black" v-for="video in videos">
          <div class="grid grid-cols-2 gap-2 mb-3 text-gray-600">
            <span class="font-bold flex items-center gap-2">
              <Icon icon="mdi:file-outline"></Icon>
              {{ video.ext }}
            </span>
            <span class="font-bold flex items-center gap-2">
              <Icon icon="mdi:video-outline"></Icon>
              {{ video.resolution }}
            </span>
            <span class="font-bold flex items-center gap-2">
              <Icon icon="iconoir:keyframes"></Icon>
              <span>{{ video.fps.toFixed(1) }} fps </span>
            </span>
            <span class="font-bold flex items-center gap-2">
              <Icon icon="icon-park-outline:solid-state-disk" /> {{ video.filesize }}
            </span>
            <span
              v-if="!showVideoWithAudio"
              :class="{ 'text-green-500': video.hasSound, 'text-red-500': !video.hasSound }"
              class="font-bold flex items-center gap-2 col-span-2 justify-end">
              {{ video.hasSound ? 'يحتوي على صوت' : 'بدون صوت' }}
            </span>
          </div>

          <a
            download
            :href="video.url"
            class="text-white text-center right-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
            {{ $t('home.hero.download') }}</a
          >
        </div>
      </div>
      <div class="w-full h-px bg-gray-500" role="divider"></div>
      <!-- audio -->
      <h1 class="text-2xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-white">الصوت</h1>
      <div class="grid md:grid-cols-2 gap-5">
        <!-- audio card -->
        <div dir="auto" class="bg-white p-5 flex flex-col rounded-md text-black" v-for="audio in results.results.audio">
          <div class="grid grid-cols-2 gap-2 mb-3 text-gray-600">
            <span class="font-bold flex items-center gap-2">
              <Icon icon="mdi:file-outline"></Icon>
              {{ audio.ext }}
            </span>

            <span class="font-bold flex items-center gap-2">
              <Icon icon="icon-park-outline:solid-state-disk" /> {{ audio.filesize }}
            </span>
          </div>

          <a
            download
            :href="audio.url"
            class="text-white text-center right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {{ $t('home.hero.download') }}</a
          >
        </div>
      </div>
    </div>
  </section>
</template>
