<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NH2, NResult } from 'naive-ui';

import { usePromiseEffect } from '@/hooks';
import { fetchDownloads } from '@/models/downloads';
import { useStore } from '@/store';

import DownloadList from '@/components/DownloadList';

const { t } = useI18n();
const store = useStore();
const route = useRoute();

usePromiseEffect(fetchDownloads, res => store.commit('setDownloads', res));

const distro = computed(() =>
  store.state.downloadContents.find(
    value => value.distro == route.params.distro
  )
);
</script>

<template>
  <NH2 prefix="bar">{{ distro?.distro || t('header.downloads') }}</NH2>
  <DownloadList v-if="distro" :distro="distro" />
  <NResult
    size="huge"
    status="info"
    :title="t('downloads.title')"
    :description="t('downloads.description')"
    v-else
  />
</template>
