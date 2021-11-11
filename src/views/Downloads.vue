<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NH2, NIcon, NButton, NResult, NList, NListItem, NThing, useMessage } from 'naive-ui';
import { DownloadOutline } from '@vicons/ionicons5';
import { fetchDownloads } from '../models/downloads';
import { useStore } from '../store';

const store = useStore();
const route = useRoute();
const message = useMessage();

onMounted(() => fetchDownloads().then(
  res => store.commit('setDownloads', res),
  err => message.error(err.message)
));

const distro = computed(() => {
  const name = route.params.distro;
  if (name == undefined) {
    return undefined;
  }
  return store.state.downloadContents.find(value => value.distro == name);
});

const urls = computed(() => distro.value?.urls.map(
  item => {
    const match = item.name.match(/(.*?) \((.*)\)/);
    return {
      title: match ? match[1] : 'null',
      description: match ? match[2] : 'null',
      url: item.url
    };
  }
) || []);

const download = (url: string) => window.open(url);
</script>

<template>
  <n-h2 prefix="bar">{{ distro?.distro || 'Downloads' }}</n-h2>
  <n-list bordered v-if="distro">
    <template #header>Versions</template>
    <n-list-item v-for="(item, index) in urls" :key="index">
      <template #suffix>
        <n-button @click="download(item.url)">
          <template #icon>
            <n-icon>
              <download-outline />
            </n-icon>
          </template>
          Download
        </n-button>
      </template>
      <n-thing :title="item.title" :description="item.description" />
    </n-list-item>
  </n-list>
  <n-result
    size="huge"
    status="info"
    title="Distribute"
    description="Select menu to view downloads"
    v-else
  />
</template>