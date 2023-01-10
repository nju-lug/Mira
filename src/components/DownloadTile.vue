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

const download = () => window.open(url);
</script>

<template>
  <div class="download-tile">
    <NCard @click="download()" size="small" :title="title" embedded hoverable>
      {{ description }}
    </NCard>
  </div>
</template>

<style scoped lang="less">
.download-tile {
  padding-bottom: 10px;
  break-inside: avoid;
}
</style>
