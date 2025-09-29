<script setup lang="tsx">
import type { SyncEntry } from '@/models/mirrors'
import { HelpCircleOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const props = defineProps<{ data: SyncEntry }>()
const router = useRouter()
const { docItems } = storeToRefs(useStore())

const doc = computed(() =>
  docItems.value.find(value => value.name === props.data.name),
)
const docHelpHref = computed(() =>
  doc.value?.redirect
    ? doc.value.redirect
    : `${window.location.href}/help/${doc.value?.name}` || '',
)
const linkHref = computed(() =>
  getAbsolutePath(props.data.route ? props.data.route : (props.data.path ? props.data.path : `/${props.data.name}`)),
)

function getAbsolutePath(path: string) {
  if (path.startsWith('http')) {
    return path
  }
  else if (path.startsWith('/')) {
    return window.location.href.replace(/\/$/, '') + path
  }
  return `${window.location.href.replace(/\/$/, '')}/${path}`
}

function handleClick() {
  if (props.data.route) {
    router.push(props.data.route)
  }
  else {
    window.location.href = props.data.path || `/${props.data.name}`
  }
}

function handleHelpClick() {
  if (doc.value?.redirect) {
    window.location.href = doc.value.redirect
  }
  else {
    router.push(`/help/${doc.value?.name}` || '')
  }
}
</script>

<template>
  <div class="route-button-group">
    <NButton tag="a" text :href="linkHref" @click="handleClick">
      {{ props.data.name }}
    </NButton>
    <NButton
      v-if="doc"
      tag="a"
      text
      :href="docHelpHref"
      @click="handleHelpClick"
    >
      <NIcon>
        <HelpCircleOutline />
      </NIcon>
    </NButton>
  </div>
</template>

<style scoped lang="less">
.route-button-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
