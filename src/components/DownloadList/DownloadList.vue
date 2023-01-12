<script setup lang="ts">
import { computed } from 'vue';

import { useWidth } from '@/hooks';
import { DownloadContent } from '@/models/downloads';

import DownloadTile from './DownloadTile.vue';

const props = defineProps<{ distro: DownloadContent }>();

const { isMobile } = useWidth();

const urls = computed(
  () =>
    props.distro.urls.map(item => {
      const match = item.name.match(/(.*?) \((.*)\)/);
      return {
        title: match ? match[1] : 'null',
        description: match ? match[2] : 'null',
        url: item.url
      };
    }) || []
);
</script>

<template>
  <div :style="{ columnCount: isMobile ? 2 : 4 }" class="tiles">
    <DownloadTile v-for="item in urls" :key="item.url" :item="item" />
  </div>
</template>

<style scoped lang="less">
.tiles {
  min-height: 100%;
  column-gap: 10px;
}
</style>
