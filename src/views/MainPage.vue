<script setup lang="ts">
import { computed, onMounted, nextTick, ref, onBeforeUnmount } from 'vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NBackTop,
  NDivider,
  useLoadingBar,
  useMessage
} from 'naive-ui';

import { useStore } from '../store';
import { loadRef } from '../routes';
import { fetchDocs } from '../models/documents';

import Navi from '../components/Navi.vue';
import Sider from './Sider.vue';
import Footer from '../components/Footer.vue';

const store = useStore();
const loadingBar = useLoadingBar();
const message = useMessage();
const isMobile = computed(() => store.state.isMobile);
const { locale } = useI18n();
const containerRef = ref<{ $el: HTMLDivElement } | null>(null);
let observer: ResizeObserver | undefined;

onMounted(() => (loadRef.value = loadingBar));

onMounted(() =>
  fetchDocs().then(
    res => store.commit('setDocs', res),
    err => message.error(err.message)
  )
);

onMounted(
  () => (locale.value = navigator.language.startsWith('zh') ? 'zh' : 'en')
);

nextTick(() => {
  window.onresize = () => store.commit('setWidth', document.body.clientWidth);
  if (containerRef.value?.$el) {
    observer = new ResizeObserver(width => {
      const newWidth = width[0].contentBoxSize[0].inlineSize;
      if (!store.state.isMobile) store.commit('setWidth', newWidth);
    });
    observer.observe(containerRef.value.$el, { box: 'content-box' });
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.onresize = null;
});
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header style="height: var(--header-height)">
      <Navi />
    </n-layout-header>
    <n-layout
      class="content-layout"
      position="absolute"
      :has-sider="true"
      sider-placement="left"
      style="top: var(--header-height)"
    >
      <n-layout-sider
        :native-scrollbar="false"
        :collapsed-width="0"
        width="320px"
        collapse-mode="transform"
        trigger-style="top: 50vh;"
        collapsed-trigger-style="top: 50vh; right: -24px;"
        bordered
        show-trigger="arrow-circle"
        v-if="!isMobile"
      >
        <Sider />
      </n-layout-sider>
      <n-layout
        ref="containerRef"
        :native-scrollbar="false"
        content-style="display: flex; flex-direction: column; padding: 24px"
      >
        <router-view />
        <n-back-top :right="50" style="z-index: 500" />
        <n-divider style="margin-bottom: 0" />
        <Footer />
      </n-layout>
    </n-layout>
  </n-layout>
</template>
