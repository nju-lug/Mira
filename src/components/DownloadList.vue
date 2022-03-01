<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from '../store';
import { DownloadContent } from '../models/downloads';
import DownloadTile from './DownloadTile.vue';

const store = useStore();

const props = defineProps<{ distro: DownloadContent }>();

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

const columns = computed(() => (store.state.isMobile ? 2 : 4));
</script>

<template>
  <div :style="{ columnCount: columns }" class="tiles">
    <download-tile v-for="item in urls" :key="item.url" :item="item" />
  </div>
</template>

<style scoped lang="less">
.tiles {
  min-height: 100%;
  column-gap: 10px;
}
</style>
