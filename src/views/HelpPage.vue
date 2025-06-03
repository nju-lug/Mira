<script setup lang="ts">
import { NH2, NResult } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import MarkdownContainer from '@/components/MarkdownContainer'
import { useMutableRef, usePromiseWatch } from '@/hooks'
import { fetchDoc } from '@/models/documents'

import { useStore } from '@/store'

const { t } = useI18n()
const route = useRoute()
const store = useStore()
const [doc, setDoc] = useMutableRef('')

const distro = computed(() => {
  const name = route.params.distro
  if (name === undefined) {
    return undefined
  }
  return store.state.docItems.find(value => value.name === name)
})

usePromiseWatch(() => fetchDoc(distro.value), setDoc)
</script>

<template>
  <NH2 prefix="bar">
    {{ `${distro?.name || ''} ${t('header.doc')}` }}
  </NH2>
  <MarkdownContainer v-if="distro" :content="doc" />
  <NResult
    v-else
    size="huge"
    status="info"
    :title="t('help.title')"
    :description="t('help.description')"
  />
</template>
