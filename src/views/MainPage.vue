<script setup lang="ts">
import { ComponentPublicInstance, computed } from 'vue';
import { RouterView } from 'vue-router';
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NBackTop,
  NDivider
} from 'naive-ui';

import { useStore } from '@/store';
import { fetchDocs } from '@/models/documents';
import { fetchNewsList } from '@/models/news';
import {
  useElementRef,
  useWidth,
  useWidthObserver,
  useLoadingBar,
  usePromiseEffect
} from '@/hooks';

import TopNavi from '@/components/TopNavi';
import PageFooter from '@/components/PageFooter';
import SideBar from '@/components/SideBar';

const store = useStore();
const { isMobile } = useWidth();
const boxRef = useElementRef<ComponentPublicInstance>();
const el = computed(() => boxRef.value?.$el);

useWidthObserver(el);
useLoadingBar();
usePromiseEffect(fetchDocs, res => store.commit('setDocs', res));
usePromiseEffect(fetchNewsList, res => store.commit('setNews', res));
</script>

<template>
  <NLayout position="absolute">
    <NLayoutHeader style="height: var(--header-height)">
      <TopNavi />
    </NLayoutHeader>
    <NLayout
      position="absolute"
      sider-placement="left"
      ref="boxRef"
      style="top: var(--header-height)"
      has-sider
    >
      <NLayoutSider
        :native-scrollbar="false"
        :collapsed-width="0"
        width="320px"
        collapse-mode="transform"
        bordered
        show-trigger="bar"
        v-if="!isMobile"
      >
        <SideBar />
      </NLayoutSider>
      <NLayout
        :native-scrollbar="false"
        content-style="display: flex; flex-direction: column; padding: 24px"
      >
        <RouterView />
        <NBackTop :right="50" style="z-index: 500" />
        <NDivider style="margin-bottom: 0" />
        <PageFooter />
      </NLayout>
    </NLayout>
  </NLayout>
</template>
