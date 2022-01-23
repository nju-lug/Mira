<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import { NCard } from 'naive-ui';

const { item } = defineProps<{
  item: {
    title: string;
    description: string;
    url: string;
  };
}>();

const { title, description, url } = reactive(item);

const download = () => window.open(url);
</script>

<template>
  <div class="download-tile">
    <n-card @click="download()" size="small" :title="title" embedded hoverable>
      {{ description }}
    </n-card>
  </div>
</template>

<style scoped lang="less">
.download-tile {
  padding-bottom: 10px;
  break-inside: avoid;
}
</style>
