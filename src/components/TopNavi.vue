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

import { useStore } from '@/store';

import SiderView from '@/views/SiderView.vue';

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
  <NSpace
    class="navi-bar"
    justify="space-between"
    style="height: var(--header-height)"
  >
    <NText class="logo-container">
      <img src="@/assets/logo.png" alt="Mirror Logo" />
      <span>NJU Mirror</span>
    </NText>

    <NButtonGroup style="height: 100%">
      <NButton
        text
        class="collapse-button"
        v-if="store.state.isMobile"
        @click="active = true"
      >
        <NIcon>
          <NewspaperOutline />
        </NIcon>
      </NButton>
      <NMenu
        :value="route.path"
        :options="options"
        mode="horizontal"
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
    <SiderView />
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
