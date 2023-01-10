<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NMenu, NSpace, NDivider, NInput } from 'naive-ui';

import { useStore } from '@/store';
import { MenuCaller } from '@/routes';

import SideLinks from '@/components/SideLinks.vue';

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
  <NSpace style="overflow-x: hidden; padding: 0" vertical v-else>
    <NDivider title-placement="left" style="margin-bottom: 12px">{{
      t('sider.entries')
    }}</NDivider>
    <NSpace vertical style="padding: 0 12px">
      <NInput :placeholder="t('sider.searchText')" @input="change" />
    </NSpace>
    <NMenu :options="options" :value="route.path" default-expand-all />
  </NSpace>
</template>
