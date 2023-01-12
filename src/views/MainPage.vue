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
import {
  useElementRef,
  useWidth,
  useWidthObserver,
  useLoadingBar,
  usePromiseEffect
} from '@/hooks';

import TopNavi from '@/components/TopNavi.vue';
import PageFooter from '@/components/PageFooter.vue';
import SiderView from '@/views/SiderView.vue';

const store = useStore();
const { isMobile } = useWidth();
const boxRef = useElementRef<ComponentPublicInstance>();
const el = computed(() => boxRef.value?.$el);

useWidthObserver(el);
useLoadingBar();
usePromiseEffect(fetchDocs, res => store.commit('setDocs', res));
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
        <SiderView />
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
