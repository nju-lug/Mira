<script setup lang="ts">
import { computed, defineCustomElement } from 'vue';

import { useStore } from '@/store';

import CustomSelectCe from './CustomSelect.ce.vue';

defineProps<{ content: string }>();

const store = useStore();
const theme = computed(() =>
  store.state.darkMode ? 'dark-scheme' : 'light-scheme'
);

const CustomSelect = defineCustomElement(CustomSelectCe);

if (customElements.get('mira-select') == undefined) {
  customElements.define('mira-select', CustomSelect);
}
</script>

<template>
  <div v-html="content" class="markdown-body" :class="theme" />
</template>
