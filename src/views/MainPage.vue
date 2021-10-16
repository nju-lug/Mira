<script setup lang="ts">
import { RouterView } from 'vue-router';
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter
} from 'naive-ui';

import { useStore } from '../store';
import Navi from '../components/Navi.vue';

const store = useStore();
</script>

<template>
  <n-space vertical size="large">
    <n-layout class="container">
      <n-layout-header>
        <Navi />
      </n-layout-header>
      <n-layout has-sider class="content">
        <n-layout-content content-style="padding: 24px;">
          <router-view />
        </n-layout-content>
        <n-layout-sider content-style="padding: 24px;" v-if="!store.state.isMobile">海淀桥</n-layout-sider>
      </n-layout>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-space>
</template>

<style scoped lang="less">
.container {
  .n-layout-header {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    text-align: center;
    z-index: 1500;
    backdrop-filter: blur(5px);
  }

  .content {
    padding-top: 60px;

    .n-layout-sider {
      background: rgba(128, 128, 128, 0.3);
    }

    .n-layout-content {
      background: rgba(128, 128, 128, 0.4);
    }
  }

  .n-layout-footer {
    background: rgba(128, 128, 128, 0.2);
    padding-top: 24px;
  }
}
</style>