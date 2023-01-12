<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NH2, NResult, NSpace, NTag } from 'naive-ui';

import { useMutableRef, usePromiseWatch } from '@/hooks';
import { useStore } from '@/store';
import { fetchNews } from '@/models/news';
import { convertTimestamp } from '@/utils/time';

import MarkdownContainer from '@/components/MarkdownContainer';

const { t } = useI18n();
const route = useRoute();
const store = useStore();
const [content, setContent] = useMutableRef('');

const news = computed(() => {
  const name = route.params.title;
  if (typeof name != 'string') {
    return undefined;
  }
  return store.state.newsEntries[parseInt(name)];
});

usePromiseWatch(() => fetchNews(news.value), setContent);
</script>

<template>
  <div v-if="news">
    <NSpace align="center" justify="space-between">
      <NSpace>
        <span class="detail-title">{{ t('news.date') }}</span>
        <span>{{ convertTimestamp(news.time, 'en') }}</span>
        <span class="detail-title">{{ t('news.author') }}</span>
        <span>{{ news.author ?? 'Mira' }}</span>
      </NSpace>
      <NSpace>
        <NTag v-for="(tag, index) in news.tags ?? []" :key="index">
          {{ tag }}
        </NTag>
      </NSpace>
    </NSpace>
    <MarkdownContainer :content="content" />
  </div>
  <div v-else>
    <NH2 prefix="bar">{{ t('header.news') }}</NH2>
    <NResult
      size="huge"
      status="info"
      :title="t('news.title')"
      :description="t('news.description')"
    />
  </div>
</template>

<style scoped lang="less">
.detail-title {
  font-weight: bold;
}
</style>
