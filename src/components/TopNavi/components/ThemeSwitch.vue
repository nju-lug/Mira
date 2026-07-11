<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import type { ThemeMode } from '@/store'
import { DesktopOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { NButton, NIcon, NPopselect, useOsTheme } from 'naive-ui'
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

const { t } = useI18n()
const store = useStore()
const osTheme = useOsTheme()

// 通过全局 pointerdown 捕获最近点击坐标，用于 startViewTransition 动画原点
const clickX = ref(0)
const clickY = ref(0)
function onPointerDown(e: PointerEvent) {
  clickX.value = e.clientX
  clickY.value = e.clientY
}
onMounted(() => document.addEventListener('pointerdown', onPointerDown, true))
onUnmounted(() => document.removeEventListener('pointerdown', onPointerDown, true))

function renderIcon(icon: typeof SunnyOutline) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const options = computed<DropdownOption[]>(() => {
  return [
    {
      label: t('theme.system'),
      value: 'system',
      icon: renderIcon(DesktopOutline),
    },
    {
      label: t('theme.light'),
      value: 'light',
      icon: renderIcon(SunnyOutline),
    },
    {
      label: t('theme.dark'),
      value: 'dark',
      icon: renderIcon(MoonOutline),
    },
  ]
})

const currentIcon = computed<ThemeMode>(() => {
  if (store.themeMode !== 'system')
    return store.themeMode
  return osTheme.value === 'dark' ? 'dark' : 'light'
})

function handleSelect(key: string) {
  store.setThemeMode(key as ThemeMode, clickX.value, clickY.value)
}
</script>

<template>
  <NPopselect
    :options="options"
    :value="store.themeMode"
    @update:value="handleSelect"
  >
    <NButton
      quaternary
      :size="store.isMobile ? 'medium' : 'small'"
      :style="{ padding: store.isMobile ? '0 8px' : '0 6px' }"
      :focusable="false"
    >
      <template #icon>
        <NIcon>
          <SunnyOutline v-if="currentIcon === 'light'" />
          <MoonOutline v-else-if="currentIcon === 'dark'" />
          <DesktopOutline v-else />
        </NIcon>
      </template>
    </NButton>
  </NPopselect>
</template>
