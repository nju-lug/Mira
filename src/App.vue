<script setup lang="ts">
import { onMounted } from 'vue';
import { darkTheme, NConfigProvider } from 'naive-ui';
import { useStore } from './store';

import MainPage from './views/MainPage.vue';

const store = useStore();
const theme = store.state.darkmode ? darkTheme : undefined;

onMounted(() => {
  window.onresize = () => {
    store.commit('setWidth', document.body.clientWidth);
  };
});
</script>

<template>
  <n-config-provider :theme="theme">
    <MainPage />
  </n-config-provider>
</template>
