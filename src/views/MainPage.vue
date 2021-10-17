<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider
} from 'naive-ui';

import { useStore } from '../store';
import Navi from '../components/Navi.vue';
import Sider from '../components/Sider.vue';

const store = useStore();
const route = useRoute();

const showSider = computed(() => route.meta?.useSider as boolean);
const isMobile = computed(() => store.state.isMobile);
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header>
      <Navi />
    </n-layout-header>
    <n-layout
      class="content-layout"
      position="absolute"
      :has-sider="true"
      sider-placement="right"
      style="top: 60px;"
    >
      <n-layout
        :native-scrollbar="false"
        content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column; padding: 0 24px"
      >
        <router-view />
        <div>
          <h2>Footer</h2>
        </div>
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

<style scoped lang="less">
</style>