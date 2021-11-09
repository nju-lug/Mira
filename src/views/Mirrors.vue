<script setup lang="ts">
import { onMounted } from 'vue';
import { NH2, useMessage } from 'naive-ui';

import { fetchDocs } from '../models/documents';
import { useStore } from '../store';

import MirrorList from '../components/MirrorList.vue';

const store = useStore();
const message = useMessage();

onMounted(() => fetchDocs().then(
  res => store.commit('setDocs', res),
  err => message.error(err.message)
));
</script>

<template>
  <n-h2 prefix="bar">Mirrors</n-h2>
  <MirrorList />
</template>