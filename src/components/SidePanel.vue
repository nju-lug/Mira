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
} from '@/models/news';
import { convertTimestamp } from '@/utils/time';

import MarkdownContainer from '@/components/MarkdownContainer.vue';
import { useMutableRef } from '@/hooks';

const { t, locale } = useI18n();
const [news, setNews] = useMutableRef([] as NewsEntry[]);
const [jokes, setJokes] = useMutableRef([] as JokeEntry[]);
const selected = ref(undefined as NewsEntry | undefined);
const show = ref(false);
const content = ref('');

onMounted(() => fetchNewsList().then(setNews));
onMounted(() => fetchJokes().then(setJokes));

async function handleClick(link: NewsEntry) {
  content.value = await fetchNews(link);
  selected.value = link;
  show.value = true;
}
</script>

<template>
  <NDivider title-placement="left">{{ t('sider.news') }}</NDivider>
  <NCard content-style="padding: 0 20px;" :bordered="false">
    <NTabs type="segment" size="small" pane-class="tab-pane">
      <NTabPane name="Mirror">
        <NRow v-for="link in news" :key="link.content">
          <NButton text tag="a" @click="handleClick(link)">
            <span class="link-title">
              {{
                convertTimestamp(link.time, locale as 'zh' | 'en') +
                ' - ' +
                link.name
              }}
            </span>
          </NButton>
        </NRow>
      </NTabPane>
      <NTabPane name="LUG Jokes">
        <NRow v-for="link in jokes" :key="link.title">
          <NButton text tag="a" :href="link.web_url" target="_blank">
            <span class="link-title">
              {{ link.title }}
            </span>
          </NButton>
        </NRow>
      </NTabPane>
    </NTabs>
  </NCard>
  <NModal
    style="width: min(600px, 90%)"
    preset="card"
    size="huge"
    :bordered="true"
    :title="selected?.name"
    v-model:show="show"
  >
    <MarkdownContainer :content="content" />
  </NModal>
</template>

<style scoped lang="less">
.n-row {
  padding: 8px 0;
}

a.n-button {
  max-width: 100%;
}

span.link-title {
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
