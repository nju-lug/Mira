<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { NIcon, NButton, NList, NListItem, NThing } from 'naive-ui';
import { DownloadOutline } from '@vicons/ionicons5';

import { DownloadContent } from '../models/downloads';

const props = defineProps<{ distro: DownloadContent }>();

const urls = computed(() => props.distro.urls.map(
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
  <n-list bordered style="margin: auto 0;">
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
</template>