<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NH2, NResult, useMessage } from 'naive-ui';

import { fetchDownloads } from '../models/downloads';
import { useStore } from '../store';

import DownloadList from '../components/DownloadList.vue';

const { t } = useI18n();
const store = useStore();
const route = useRoute();
const message = useMessage();

onMounted(() =>
  fetchDownloads().then(
    res => store.commit('setDownloads', res),
    err => message.error(err.message)
  )
);

const distro = computed(() =>
  store.state.downloadContents.find(
    value => value.distro == route.params.distro
  )
);
</script>

<template>
  <n-h2 prefix="bar">{{ distro?.distro || t('header.downloads') }}</n-h2>
  <DownloadList v-if="distro" :distro="distro" />
  <n-result
    size="huge"
    status="info"
    :title="t('downloads.title')"
    :description="t('downloads.description')"
    v-else
  />
</template>
