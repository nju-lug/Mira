<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import { LanguageOutline } from '@vicons/ionicons5'
import { NButton, NIcon, NPopselect } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

const { locale } = useI18n()
const store = useStore()

const localeOptions = computed<SelectOption[]>(() => [
  {
    label: '简体中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
])
</script>

<template>
  <NPopselect
    v-model:value="locale"
    :options="localeOptions"
    :trigger="!store.isMobile ? 'hover' : 'click'"
  >
    <NButton
      quaternary
      :size="store.isMobile ? 'medium' : 'small'"
      :style="{ padding: store.isMobile ? '0 8px' : '0 6px' }"
      :focusable="false"
    >
      <template #icon>
        <NIcon :size="20">
          <LanguageOutline />
        </NIcon>
      </template>
    </NButton>
  </NPopselect>
</template>
