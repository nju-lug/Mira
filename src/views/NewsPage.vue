<script setup lang="ts">
import { NH2, NResult, NSpace, NTag } from 'naive-ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import MarkdownContainer from '@/components/MarkdownContainer'
import { useMutableRef, usePromiseWatch } from '@/hooks'
import { fetchNews } from '@/models/news'
import { useStore } from '@/store'

import { convertTimestamp } from '@/utils/time'

const { t } = useI18n()
const route = useRoute()
const store = useStore()
const [content, setContent] = useMutableRef('')

const news = computed(() => {
  const name = route.params.title
  if (typeof name != 'string') {
    return undefined
  }
  return store.state.newsEntries[Number.parseInt(name)]
})

usePromiseWatch(() => fetchNews(news.value), setContent)
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
    <NH2 prefix="bar">
      {{ t('header.news') }}
    </NH2>
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
