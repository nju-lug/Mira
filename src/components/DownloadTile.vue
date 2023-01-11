<script setup lang="ts">
import { reactive } from 'vue';
import { NCard } from 'naive-ui';

const props = defineProps<{
  item: {
    title: string;
    description: string;
    url: string;
  };
}>();

const { title, description, url } = reactive(props.item);
</script>

<template>
  <a class="download-tile" :href="url" target="_blank">
    <NCard size="small" :title="title" embedded hoverable>
      {{ description }}
    </NCard>
  </a>
</template>

<style scoped lang="less">
.download-tile {
  display: block;
  padding-bottom: 10px;
  break-inside: avoid;
  user-select: none;
  cursor: default;
  text-decoration: none;
}
</style>
