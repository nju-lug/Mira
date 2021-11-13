<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { NH2, NResult, useMessage } from 'naive-ui';

import { useStore } from '../store';
import { fetchDoc } from '../models/documents';

import Markdown from '../components/common/Markdown.vue';

const route = useRoute();
const store = useStore();
const message = useMessage();

const doc = ref('');
const distro = computed(() => {
  const name = route.params.distro;
  if (name == undefined) {
    return undefined;
  }
  return store.state.docItems.find(value => value.name == name);
});

watchEffect(() => {
  if (distro.value) {
    fetchDoc(distro.value).then(
      res => doc.value = res,
      err => message.error(err.message)
    );
  }
});
</script>

<template>
  <n-h2 prefix="bar">{{ distro?.name || 'Help' }}</n-h2>
  <Markdown :content="doc" v-if="distro" />
  <n-result size="huge" status="info" title="RTFM" description="Select menu to view help" v-else />
</template>