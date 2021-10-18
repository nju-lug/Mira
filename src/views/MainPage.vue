<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NBackTop,
  NDivider,
  useLoadingBar
} from 'naive-ui';

import { useStore } from '../store';
import { loadRef } from '../routes';
import Navi from '../components/Navi.vue';
import Sider from '../components/Sider.vue';
import Footer from '../components/Footer.vue';

const store = useStore();
const route = useRoute();
const loadingBar = useLoadingBar();
const showSider = computed(() => route.meta?.useSider as boolean);
const isMobile = computed(() => store.state.isMobile);

onMounted(() => loadRef.value = loadingBar);
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header style="height: var(--header-height);">
      <Navi />
    </n-layout-header>
    <n-layout
      class="content-layout"
      position="absolute"
      :has-sider="true"
      sider-placement="right"
      style="top: var(--header-height);"
    >
      <n-layout
        :native-scrollbar="false"
        content-style="display: flex; flex-direction: column; padding: 24px"
      >
        <router-view />
        <n-back-top :right="50" style="z-index: 500;" />
        <n-divider/>
        <Footer />
      </n-layout>
      <n-layout-sider
        :native-scrollbar="false"
        :collapsed-width="0"
        width="320px"
        collapse-mode="transform"
        trigger-style="top: 50vh;"
        collapsed-trigger-style="top: 50vh; left: -24px;"
        bordered
        show-trigger="arrow-circle"
        v-if="showSider && !isMobile"
      >
        <Sider />
      </n-layout-sider>
    </n-layout>
  </n-layout>
</template>