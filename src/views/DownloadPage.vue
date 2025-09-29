<script setup lang="ts">
import { NH2, NResult } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import DownloadList from '@/components/DownloadList'
import { usePromiseEffect } from '@/hooks'
import { fetchDownloads } from '@/models/downloads'
import { useStore } from '@/store'

const { t } = useI18n()
const store = useStore()
const route = useRoute()

usePromiseEffect(fetchDownloads, res => store.setDownloads(res))

const distro = computed(() =>
  store.downloadContents.find(
    value => value.distro === route.params.distro,
  ),
)
</script>

<template>
  <NH2 prefix="bar">
    {{ distro?.distro || t('header.downloads') }}
  </NH2>
  <DownloadList v-if="distro" :distro="distro" />
  <NResult
    v-else
    size="huge"
    status="info"
    :title="t('downloads.title')"
    :description="t('downloads.description')"
  />
</template>
