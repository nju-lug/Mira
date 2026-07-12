<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, NConfigProvider, NGlobalStyle, NLoadingBarProvider, NMessageProvider, useOsTheme } from 'naive-ui'
import Tiny from 'tinycolor2'
import { computed, nextTick, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '@/store'

import MainPage from '@/views/MainPage.vue'

const { locale } = useI18n()
const store = useStore()
const osTheme = useOsTheme()

const theme = computed(() => {
  if (store.themeMode === 'system')
    return osTheme.value === 'dark' ? darkTheme : null
  return store.themeMode === 'dark' ? darkTheme : null
})

function disableTransitionsTemporarily() {
  const { classList } = document.documentElement
  classList.add('disable-theme-transition')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      classList.remove('disable-theme-transition')
    })
  })
}

watch(theme, () => {
  if (!document.startViewTransition) {
    disableTransitionsTemporarily()
    return
  }

  const x = store._tx
  const y = store._ty
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  const transition = document.startViewTransition(() => {
    disableTransitionsTemporarily()
    return nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: transition.transitionDirection === 'back'
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in-out',
        pseudoElement:
          transition.transitionDirection === 'back'
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
      },
    )
  })
})

const isDark = computed(() => theme.value === darkTheme)

const override = computed(
  () => {
    const themeColor = isDark.value ? '#a879db' : '#6f106e'
    const popoverColor = isDark.value ? 'rgb(29, 30, 31)' : 'rgb(255, 255, 255)'
    return ({
      common: {
        primaryColor: Tiny(themeColor).toHex8String(),
        primaryColorSecondary: Tiny(themeColor).setAlpha(0.16).toHex8String(),
        primaryColorHover: Tiny(themeColor).lighten(7.5).brighten(1).desaturate(20).spin(-2).toHex8String(),
        primaryColorPressed: Tiny(themeColor).darken(10).saturate(8).spin(2).toHex8String(),
        primaryColorSuppl: Tiny(themeColor).lighten(7.5).brighten(1).desaturate(20).spin(-2).toHex8String(),
        borderRadius: '5px',
        popoverColor,
      },
      Alert: {
        borderRadius: '6px',
      },
      Checkbox: {
        borderRadius: '4px',
      },
      DatePicker: {
        itemBorderRadius: '4px',
      },
      Dialog: {
        borderRadius: '10px',
        actionSpace: '6px',
        titleFontWeight: '550',
      },
      Drawer: {
        borderRadius: '0',
      },
      Dropdown: {
        borderRadius: '8px',
      },
      InternalSelectMenu: {
        borderRadius: '6px',
        peers: {
          Scrollbar: {
            width: '4px',
            railInsetVerticalRight: '2px 0 2px auto',
            railInsetHorizontalBottom: 'auto 2px 0 2px',
          },
        },
      },
      InternalSelection: {
        peers: {
          Popover: {
            peers: {
              Scrollbar: {
                width: '4px',
                railInsetVerticalRight: '2px 0 2px auto',
                railInsetHorizontalBottom: 'auto 2px 0 2px',
              },
            },
          },
        },
      },
      Message: {
        padding: '8px 12px',
        borderRadius: '8px',
      },
      Notification: {
        borderRadius: '12px',
      },
      Popover: {
        borderRadius: '8px',
      },
      Scrollbar: {
        railInsetVerticalRight: '2px 1px 2px auto',
        railInsetHorizontalBottom: 'auto 2px 1px 2px',
      },
      Tag: {
        borderRadius: '4px',
      },
      Tooltip: {
        padding: '6px 10px',
      },
      Tree: {
        nodeWrapperPadding: '2px 0px',
        nodeBorderRadius: '4px',
      },
      TreeSelect: {
        menuBorderRadius: '6px',
        peers: {
          Tree: {
            nodeBorderRadius: '4px',
          },
        },
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
    <NGlobalStyle />
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

.disable-theme-transition,
.disable-theme-transition * {
  transition: none !important;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
