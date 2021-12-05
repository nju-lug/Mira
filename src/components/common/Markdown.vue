<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useStore } from '../../store';

const { content } = defineProps<{ content: string }>();

const store = useStore();
const theme = computed(() =>
  store.state.darkMode ? 'dark-scheme' : 'light-scheme'
);
</script>

<template>
  <div v-html="content" class="markdown-body" :class="theme" />
</template>
