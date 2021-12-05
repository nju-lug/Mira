<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NCard,
  NTabs,
  NTabPane,
  NDivider,
  NRow,
  NButton,
  NModal
} from 'naive-ui';

import {
  fetchNewsList,
  fetchJokes,
  JokeEntry,
  NewsEntry,
  fetchNews
} from '../models/news';
import { convertTimestamp } from '../utils/time';

import Markdown from './common/Markdown.vue';

const { t, locale } = useI18n();
const news = ref([] as NewsEntry[]);
const jokes = ref([] as JokeEntry[]);
const selected = ref(undefined as NewsEntry | undefined);
const show = ref(false);
const content = ref('');

onMounted(() => fetchNewsList().then(res => (news.value = res)));

onMounted(() => fetchJokes().then(res => (jokes.value = res)));

async function handleClick(link: NewsEntry) {
  content.value = await fetchNews(link);
  selected.value = link;
  show.value = true;
}
</script>

<template>
  <n-card content-style="padding: 0;" :bordered="false">
    <n-divider title-placement="left">{{ t('sider.news') }}</n-divider>
    <n-tabs
      type="line"
      size="small"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <n-tab-pane name="Mirror">
        <n-row v-for="link in news" :key="link.content">
          <n-button
            text
            tag="a"
            @click="handleClick(link)"
            >{{ convertTimestamp(link.time, locale as 'zh' | 'en') + ' - ' + link.name }}</n-button
          >
        </n-row>
      </n-tab-pane>
      <n-tab-pane name="LUG Jokes">
        <n-row v-for="link in jokes" :key="link.title">
          <n-button text tag="a" :href="link.web_url" target="_blank">{{
            link.title
          }}</n-button>
        </n-row>
      </n-tab-pane>
    </n-tabs>
  </n-card>
  <n-modal
    style="width: min(600px, 90%)"
    preset="card"
    size="huge"
    :bordered="true"
    :title="selected?.name || 'Null'"
    v-model:show="show"
  >
    <Markdown :content="content" />
  </n-modal>
</template>

<style scoped lang="less">
.n-row {
  padding: 8px 0;
}
</style>
