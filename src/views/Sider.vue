<script setup lang="tsx">
import { computed, ref, onMounted } from 'vue';
import {
  MenuOption,
  NMenu,
  NSpace,
  NDivider,
  NInput, useMessage
} from 'naive-ui';
import { useRoute } from 'vue-router';

import { useStore, State } from '../store';
import { fetchDocs } from '../models/documents';
import SideLinks from '../components/SideLinks.vue';

const route = useRoute();
const store = useStore();
const message = useMessage();

const filter = ref('');
const options = computed(() => {
  const sider = route.meta?.sider as ((state: State, filter: string) => MenuOption[]) | undefined;
  return sider == undefined ? undefined : sider(store.state, filter.value);
});

function changeText(value: string) {
  filter.value = value;
}

onMounted(() => fetchDocs().then(
  res => store.commit('setDocs', res),
  err => message.error(err.message)
));
</script>

<template>
  <SideLinks v-if="!options" />
  <n-space style="overflow-x: hidden; padding: 0" vertical v-else>
    <n-divider title-placement="left">ENTRIES</n-divider>
    <n-space vertical style="padding: 0 12px">
      <n-input placeholder="Search entries..." @input="changeText" />
    </n-space>
    <n-menu :options="options" :value="route.path" />
  </n-space>
</template>