<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, NConfigProvider, NLoadingBarProvider, NMessageProvider } from 'naive-ui'
import Tiny from 'tinycolor2'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'

import MainPage from '@/views/MainPage.vue'

const { locale } = useI18n()
const store = useStore()

const theme = computed(() => (store.darkMode ? darkTheme : null))
const override = computed(
  () => {
    const themeColor = store.darkMode ? '#a879db' : '#6f106e'
    return ({
      common: {
        primaryColor: Tiny(themeColor).toHex8String(),
        primaryColorSecondary: Tiny(themeColor).setAlpha(0.16).toHex8String(),
        primaryColorHover: Tiny(themeColor).lighten(7.5).brighten(1).desaturate(20).spin(-2).toHex8String(),
        primaryColorPressed: Tiny(themeColor).darken(10).saturate(8).spin(2).toHex8String(),
        primaryColorSuppl: Tiny(themeColor).lighten(7.5).brighten(1).desaturate(20).spin(-2).toHex8String(),
      },
    } as GlobalThemeOverrides)
  },

)

onMounted(
  () => (locale.value = navigator.language.startsWith('zh') ? 'zh' : 'en'),
)
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="override">
    <NLoadingBarProvider>
      <NMessageProvider>
        <MainPage />
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style lang="less">
body {
  overflow: hidden;
  --header-height: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
