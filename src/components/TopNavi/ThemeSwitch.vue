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
    size="small"
    :focusable="false"
    style="padding: 0 6px"
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
