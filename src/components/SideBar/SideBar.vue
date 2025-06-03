<script setup lang="ts">
import type { MenuCaller } from '@/routes'
import { NDivider, NInput, NMenu, NSpace } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRoute } from 'vue-router'
import { useDebounce, useMutableRef } from '@/hooks'
import { useStore } from '@/store'

import SideLinks from './SideLinks.vue'

const route = useRoute()
const store = useStore()
const { t } = useI18n()
const [filter, setFilter] = useMutableRef('')

const options = computed(() => {
  const sider = route.meta?.sider as MenuCaller | undefined
  return sider?.(store, filter.value)
})

const onInput = useDebounce(setFilter)
</script>

<template>
  <SideLinks v-if="!options" />
  <NSpace v-else style="overflow-x: hidden; padding: 0" vertical>
    <NDivider title-placement="left" style="margin-bottom: 12px">
      {{
        t('sider.entries')
      }}
    </NDivider>
    <NSpace vertical style="padding: 0 12px">
      <NInput :placeholder="t('sider.searchText')" @input="onInput" />
    </NSpace>
    <NMenu :options="options" :value="route.path" />
  </NSpace>
</template>
