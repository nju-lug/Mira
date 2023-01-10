<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { NSpace, NDivider } from 'naive-ui';
import { useI18n } from 'vue-i18n';

import cards, { CardItem } from '@/models/cards';

import SideCard from '@/components/SideCard.vue';
import SidePanel from '@/components/SidePanel.vue';

const { t } = useI18n();
const entries = reactive([] as CardItem[]);

onMounted(() => {
  cards.forEach(fetch => fetch().then(item => entries.push(item)));
});
</script>

<template>
  <NSpace style="overflow-x: hidden; padding-bottom: 12px" vertical>
    <SidePanel />
    <NDivider title-placement="left">{{ t('sider.links') }}</NDivider>
    <SideCard v-for="card in entries" :key="card.title" :entry="card" />
  </NSpace>
</template>
