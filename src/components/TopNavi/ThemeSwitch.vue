<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { NSwitch, useMessage } from 'naive-ui'
import { useStore } from '@/store'

const store = useStore()
const message = useMessage()

function onUpdate(value: boolean) {
  store.setDarkMode(value)
  message.info(`Side of ${value ? 'Tairitsu' : 'Hikari'}`)
}

function railStyle({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) {
  const style: CSSProperties = {}
  if (checked) {
    style.background = '#138ff2'
    if (focused) {
      style.boxShadow = '0 0 0 2px #138ff240'
    }
  }
  else {
    style.background = '#c0203d'
    if (focused) {
      style.boxShadow = '0 0 0 2px #c0203d40'
    }
  }
  return style
}
</script>

<template>
  <NSwitch
    :default-value="store.darkMode"
    :on-update-value="onUpdate"
    :rail-style="railStyle"
    style="margin: 6px"
  >
    <template #checked>
      Conflict
    </template>
    <template #unchecked>
      Light
    </template>
  </NSwitch>
</template>
