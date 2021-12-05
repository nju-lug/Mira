<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NMenu, NSpace, NDivider, NInput } from 'naive-ui';

import { useStore } from '../store';
import { MenuCaller } from '../routes';

import SideLinks from '../components/SideLinks.vue';

const route = useRoute();
const store = useStore();
const { t } = useI18n();
const filter = ref('');
const options = computed(() => {
  const sider = route.meta?.sider as MenuCaller | undefined;
  return sider == undefined ? undefined : sider(store.state, filter.value);
});

function change(value: string) {
  filter.value = value;
}
</script>

<template>
  <SideLinks v-if="!options" />
  <n-space style="overflow-x: hidden; padding: 0" vertical v-else>
    <n-divider title-placement="left" style="margin-bottom: 12px">{{
      t('sider.entries')
    }}</n-divider>
    <n-space vertical style="padding: 0 12px">
      <n-input :placeholder="t('sider.searchText')" @input="change" />
    </n-space>
    <n-menu :options="options" :value="route.path" default-expand-all />
  </n-space>
</template>
