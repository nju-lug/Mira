<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NH2, NResult } from 'naive-ui';

import { useMutableRef, usePromiseWatch } from '@/hooks';
import { useStore } from '@/store';
import { fetchDoc } from '@/models/documents';

import MarkdownContainer from '@/components/MarkdownContainer';

const { t } = useI18n();
const route = useRoute();
const store = useStore();
const [doc, setDoc] = useMutableRef('');

const distro = computed(() => {
  const name = route.params.distro;
  if (name == undefined) {
    return undefined;
  }
  return store.state.docItems.find(value => value.name == name);
});

usePromiseWatch(() => fetchDoc(distro.value), setDoc);
</script>

<template>
  <NH2 prefix="bar">{{ (distro?.name || '') + ' ' + t('header.doc') }}</NH2>
  <MarkdownContainer :content="doc" v-if="distro" />
  <NResult
    size="huge"
    status="info"
    :title="t('help.title')"
    :description="t('help.description')"
    v-else
  />
</template>
