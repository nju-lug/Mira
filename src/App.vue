<script setup lang="ts">
import { onMounted } from 'vue';
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter
} from 'naive-ui';
import { useStore } from './store';

const store = useStore();

onMounted(() => {
  window.onresize = () => {
    store.commit('setWidth', document.body.clientWidth);
  };
});
</script>

<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">海淀桥</n-layout-sider>
        <n-layout-content content-style="padding: 24px;">平山道</n-layout-content>
      </n-layout>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-space>
</template>

<style scoped lang="less">
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
