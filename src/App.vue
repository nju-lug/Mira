<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui';
import { lightTheme } from 'naive-ui/lib/themes/light';
import { useStore } from './store';

import MainPage from './views/MainPage.vue';

const store = useStore();
const theme = computed(() => store.state.darkmode ? darkTheme : lightTheme);

onMounted(() => {
  window.onresize = () => {
    store.commit('setWidth', document.body.clientWidth);
  };
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <MainPage />
    </n-message-provider>
  </n-config-provider>
</template>

<style lang="less">
body {
  overflow: hidden;
  --header-height: 60px;
}
</style>