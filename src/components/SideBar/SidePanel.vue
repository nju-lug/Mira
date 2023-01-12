<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NCard, NTabs, NTabPane, NDivider, NRow, NButton } from 'naive-ui';

import { useStore } from '@/store';
import { useMutableRef, usePromiseEffect } from '@/hooks';
import { fetchJokes, JokeEntry } from '@/models/news';
import { convertTimestamp } from '@/utils/time';

const store = useStore();
const { t, locale } = useI18n();
const [jokes, setJokes] = useMutableRef([] as JokeEntry[]);
const router = useRouter();

const panelLimit = 6;
const entries = computed(() => store.state.newsEntries.slice(0, panelLimit));
usePromiseEffect(() => fetchJokes(panelLimit), setJokes);

const handleClick = (index: number) => router.push(`/news/${index}`);
</script>

<template>
  <NDivider title-placement="left">{{ t('sider.news') }}</NDivider>
  <NCard content-style="padding: 0 20px;" :bordered="false">
    <NTabs type="segment" size="small" pane-class="tab-pane">
      <NTabPane name="Mirror">
        <NRow v-for="(entry, index) in entries" :key="entry.content">
          <NButton text tag="a" @click="handleClick(index)">
            <span class="link-title">
              {{ convertTimestamp(entry.time, locale) + ' - ' + entry.name }}
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
