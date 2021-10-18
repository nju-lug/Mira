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
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { NewspaperOutline, MenuOutline } from '@vicons/ionicons5';

import { useStore } from '../store';
import Sider from './Sider.vue';

const store = useStore();
const route = useRoute();
const message = useMessage();

const createRoute = (to: string, name: string): MenuOption => ({
  label: () => <RouterLink to={to}>{name}</RouterLink>,
  key: to
});

const active = ref(false);
const activate = () => { active.value = true; };
const darkMode: MenuOption = {
  label: () => <NSwitch
    v-slots={{
      checked: () => 'Conflict',
      unchecked: () => 'Light'
    }}
    defaultValue={store.state.darkMode}
    onUpdateValue={value => {
      store.commit('setDarkMode', value);
      message.info(`Side of ${value ? 'Tairitsu' : 'Hikari'}`);
    }}
  />,
  key: 'darkmode'
};

const options = [
  createRoute('/', 'Mirrors'),
  createRoute('/download', 'Downloads'),
  createRoute('/help', 'Help'),
  createRoute('/about', 'About'),
  darkMode
];
</script>

<template>
  <n-space class="navi-bar" justify="space-between" style="height: var(--header-height);">
    <n-text class="logo-container">
      <img src="../assets/logo.png" alt="Mirror Logo" />
      <span>NJU Mirror</span>
    </n-text>

    <n-button-group style="height: 100%;">
      <n-button text class="collapse-button" @click="activate" v-if="store.state.isMobile">
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
      <n-dropdown :options="options" placement="bottom-end" trigger="click" v-else>
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
    width="360"
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
  --item-height: var(--header-height) !important;
}

.collapse-button {
  font-size: 24px;
  height: 100%;
  padding-right: 16px;
}

.logo-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  padding-left: 16px;
  align-items: center;

  span {
    padding: 0 15px;
    font-size: large;
  }

  img {
    height: 40px;
    width: 40px;
  }
}
</style>