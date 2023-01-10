<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';

defineProps<{ content: string }>();

const store = useStore();
const theme = computed(() =>
  store.state.darkMode ? 'dark-scheme' : 'light-scheme'
);
</script>

<template>
  <div v-html="content" class="markdown-body" :class="theme" />
</template>
