<script setup lang="ts">
import { NH2 } from 'naive-ui';
import { useI18n } from 'vue-i18n';

import MirrorList from '../components/MirrorList.vue';

const { t } = useI18n();
</script>

<template>
  <n-h2 prefix="bar">{{ t('header.mirrors') }}</n-h2>
  <MirrorList />
</template>