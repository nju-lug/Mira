<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NBackTop,
  NDivider,
  useLoadingBar,
  useMessage,
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

onMounted(() => loadRef.value = loadingBar);

onMounted(() => fetchDocs().then(
  res => store.commit('setDocs', res),
  err => message.error(err.message)
));
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
      sider-placement="left"
      style="top: var(--header-height);"
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
        :native-scrollbar="false"
        content-style="display: flex; flex-direction: column; padding: 24px"
      >
        <router-view />
        <n-back-top :right="50" style="z-index: 500;" />
        <n-divider />
        <div>
          <Footer />
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>