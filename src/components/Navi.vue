<script setup lang="tsx">
import {
  MenuOption,
  NMenu,
  NRow,
  NCol,
  NText,
  NDropdown,
  NButton,
  NIcon,
  NSwitch,
  useMessage
} from 'naive-ui';
import { h } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { CashOutline as CashIcon } from '@vicons/ionicons5';

import { useStore } from '../store';

const store = useStore();
const route = useRoute();
const message = useMessage();

const createRoute = (to: string, name: string): MenuOption => ({
  label: () => h(RouterLink, { to }, { default: () => name }),
  key: to
});

const darkmode: MenuOption = {
  label: () => <NSwitch
    v-slots={{
      checked: () => 'Conflict',
      unchecked: () => 'Light'
    }}
    defaultValue={store.state.darkmode}
    onUpdateValue={(value) => {
      store.commit('setDarkmode', value);
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
  darkmode
];
</script>

<template>
  <n-row class="navi-bar" style="height: 60px;">
    <n-col span="8">
      <n-text class="logo-container">
        <img src="../assets/logo.png" />
        <span>NJU Mirror</span>
      </n-text>
    </n-col>
    <n-col span="16">
      <n-menu
        :value="route.path"
        :options="options"
        mode="horizontal"
        v-if="!store.state.isMobile"
      />
      <n-dropdown :options="options" placement="bottom-end" v-else>
        <n-button text class="collapse-button">
          <n-icon>
            <cash-icon />
          </n-icon>
        </n-button>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<style scoped lang="less">
.navi-bar {
  background-color: rgba(216, 216, 216, 0.13);
}
.n-menu {
  text-align: center;
  float: right;
  padding-right: 24px;
  --item-height: 60px !important;
}

.collapse-button {
  font-size: 24px;
  height: 100%;
  float: right;
  padding-right: 24px;
}

.logo-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: left;
  padding-left: 24px;
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