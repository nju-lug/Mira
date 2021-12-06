<script setup lang="ts">
import { computed } from 'vue';
import {
  GlobalThemeOverrides,
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  darkTheme
} from 'naive-ui';

import { useStore } from './store';
import MainPage from './views/MainPage.vue';

const store = useStore();
const theme = computed(() => (store.state.darkMode ? darkTheme : null));
const override = computed(
  () =>
    ({
      common: {
        primaryColor: store.state.darkMode ? '#ffffff' : '#6f106e',
        primaryColorHover: store.state.darkMode ? '#fcfcfc' : '#6f106e',
        primaryColorPressed: store.state.darkMode ? 'd4d4d4' : '#560c56',
        primaryColorSuppl: '#6f106e'
      }
    } as GlobalThemeOverrides)
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="override">
    <n-loading-bar-provider>
      <n-message-provider>
        <MainPage />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="less">
body {
  overflow: hidden;
  --header-height: 60px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
