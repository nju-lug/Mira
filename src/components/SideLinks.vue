<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { NSpace, NDivider } from 'naive-ui';
import cards, { CardItem } from '../models/cards';
import Card from './Card.vue';
import Panel from './Panel.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const entries = reactive([] as CardItem[]);

onMounted(() => {
  cards.forEach(fetch => fetch().then(item => entries.push(item)));
});
</script>

<template>
  <n-space style="overflow-x: hidden; padding-bottom: 12px" vertical>
    <Panel />
    <n-divider title-placement="left">{{ t('sider.links') }}</n-divider>
    <Card v-for="card in entries" :key="card.title" :entry="card" />
  </n-space>
</template>
