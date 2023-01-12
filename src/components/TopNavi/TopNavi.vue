<script setup lang="tsx">
import {
  MenuOption,
  NMenu,
  NText,
  NDropdown,
  NButton,
  NIcon,
  NSpace,
  NDrawer,
  NButtonGroup
} from 'naive-ui';
import { watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NewspaperOutline, MenuOutline } from '@vicons/ionicons5';

import { useMutableRef } from '@/hooks';
import { useStore } from '@/store';
import logo from '@/assets/nju.png';

import SideBar from '@/components/SideBar';
import ThemeSwitch from './ThemeSwitch.vue';

const { t, locale } = useI18n();
const store = useStore();
const route = useRoute();
const [active, setActive] = useMutableRef(false);

const createRoute = (to: string, name: string): MenuOption => ({
  label: () => <RouterLink to={to}>{t(`header.${name}`)}</RouterLink>,
  key: to
});

const darkMode: MenuOption = {
  label: () => <ThemeSwitch />,
  key: 'theme-switch'
};

const localeButton: MenuOption = {
  label: () => (
    <NButton
      text
      onClick={() => (locale.value = locale.value == 'zh' ? 'en' : 'zh')}
    >
      {t('locale')}
    </NButton>
  ),
  key: 'locale'
};

const options = [
  createRoute('/', 'mirrors'),
  createRoute('/download', 'downloads'),
  createRoute('/help', 'help'),
  createRoute('/news', 'news'),
  createRoute('/about', 'about'),
  localeButton,
  darkMode
];

watch(
  () => route.path,
  () => setActive(false)
);
</script>

<template>
  <NSpace
    class="navi-bar"
    justify="space-between"
    style="height: var(--header-height)"
  >
    <NText class="logo-container">
      <img :src="logo" alt="Mirror Logo" />
      <span>NJU Mirror</span>
    </NText>

    <NButtonGroup style="height: 100%">
      <NButton
        text
        class="collapse-button"
        v-if="store.state.isMobile"
        @click="setActive(true)"
      >
        <NIcon>
          <NewspaperOutline />
        </NIcon>
      </NButton>
      <NMenu
        :value="route.path"
        :options="options"
        mode="horizontal"
        class="navi-menu"
        v-if="!store.state.isMobile"
      />
      <NDropdown
        :options="options"
        placement="bottom-end"
        trigger="click"
        v-else
      >
        <NButton text class="collapse-button">
          <NIcon>
            <MenuOutline />
          </NIcon>
        </NButton>
      </NDropdown>
    </NButtonGroup>
  </NSpace>
  <NDrawer
    placement="right"
    v-model:show="active"
    width="min(360px, 80%)"
    :native-scrollbar="false"
    v-if="store.state.isMobile"
  >
    <SideBar />
  </NDrawer>
</template>

<style scoped lang="less">
.navi-bar {
  background-color: rgba(216, 216, 216, 0.13);
}

.n-menu {
  text-align: center;
  padding-right: 24px;
}

.collapse-button {
  font-size: 24px;
  height: var(--header-height);
  padding-right: 16px;
}

.logo-container {
  height: var(--header-height);
  display: flex;
  justify-content: left;
  padding-left: 16px;
  align-items: center;
  user-select: none;

  span {
    padding: 0 10px;
    font-size: large;
  }

  img {
    height: 35px;
    width: 35px;
  }
}
</style>

<style>
.navi-menu .n-menu-item {
  height: calc(100% - 1px) !important;
}
</style>
