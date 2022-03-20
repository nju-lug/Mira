<script setup lang="tsx">
import {
  MenuOption,
  NMenu,
  NText,
  NDropdown,
  NButton,
  NIcon,
  NSwitch,
  NSpace,
  NDrawer,
  NButtonGroup,
  useMessage
} from 'naive-ui';
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NewspaperOutline, MenuOutline } from '@vicons/ionicons5';

import { useStore } from '../store';
import Sider from '../views/Sider.vue';

const { t, locale } = useI18n();
const store = useStore();
const route = useRoute();
const message = useMessage();

const createRoute = (to: string, name: string): MenuOption => ({
  label: () => <RouterLink to={to}>{t(`header.${name}`)}</RouterLink>,
  key: to
});

const active = ref(false);

const darkMode: MenuOption = {
  label: () => (
    <NSwitch
      v-slots={{
        checked: () => 'Conflict',
        unchecked: () => 'Light'
      }}
      defaultValue={store.state.darkMode}
      onUpdateValue={value => {
        store.commit('setDarkMode', value);
        message.info(`Side of ${value ? 'Tairitsu' : 'Hikari'}`);
      }}
      style="margin: 6px;"
    />
  ),
  key: 'darkmode'
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
  createRoute('/about', 'about'),
  localeButton,
  darkMode
];

watch(
  () => route.path,
  () => {
    active.value = false;
  }
);
</script>

<template>
  <n-space
    class="navi-bar"
    justify="space-between"
    style="height: var(--header-height)"
  >
    <n-text class="logo-container">
      <img src="../assets/logo.png" alt="Mirror Logo" />
      <span>NJU Mirror</span>
    </n-text>

    <n-button-group style="height: 100%">
      <n-button
        text
        class="collapse-button"
        v-if="store.state.isMobile"
        @click="active = true"
      >
        <n-icon>
          <newspaper-outline />
        </n-icon>
      </n-button>
      <n-menu
        :value="route.path"
        :options="options"
        mode="horizontal"
        v-if="!store.state.isMobile"
      />
      <n-dropdown
        :options="options"
        placement="bottom-end"
        trigger="click"
        v-else
      >
        <n-button text class="collapse-button">
          <n-icon>
            <menu-outline />
          </n-icon>
        </n-button>
      </n-dropdown>
    </n-button-group>
  </n-space>
  <n-drawer
    placement="right"
    v-model:show="active"
    width="min(360px, 80%)"
    :native-scrollbar="false"
    v-if="store.state.isMobile"
  >
    <Sider />
  </n-drawer>
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
.n-menu .n-menu-item {
  height: calc(100% - 1px) !important;
}
</style>
