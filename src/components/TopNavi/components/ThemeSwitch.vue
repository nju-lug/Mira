<script setup lang="ts">
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'
import { useStore } from '@/store'

const store = useStore()

function onUpdate() {
  store.setDarkMode(!store.darkMode)
}
</script>

<template>
  <NButton
    quaternary
    :size="store.isMobile ? 'medium' : 'small'"
    :style="{ padding: store.isMobile ? '0 8px' : '0 6px' }"
    :focusable="false"
    @click="onUpdate"
  >
    <template #icon>
      <NIcon>
        <SunnyOutline v-if="store.darkMode" />
        <MoonOutline v-else />
      </NIcon>
    </template>
  </NButton>
</template>
