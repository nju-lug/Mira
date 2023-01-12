<script setup lang="ts">
import { NSpace, NDivider } from 'naive-ui';
import { useI18n } from 'vue-i18n';

import cards, { CardItem } from '@/models/cards';
import { useMutableRef, usePromiseEffect } from '@/hooks';

import SideCard from './SideCard.vue';
import SidePanel from './SidePanel.vue';

const { t } = useI18n();
const [entries, setEntries] = useMutableRef([] as CardItem[]);

usePromiseEffect(() => Promise.all(cards.map(f => f())), setEntries);
</script>

<template>
  <NSpace style="overflow-x: hidden; padding-bottom: 12px" vertical>
    <SidePanel />
    <NDivider title-placement="left">{{ t('sider.links') }}</NDivider>
    <SideCard v-for="card in entries" :key="card.title" :entry="card" />
  </NSpace>
</template>
