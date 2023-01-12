<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NMenu, NSpace, NDivider, NInput } from 'naive-ui';

import { useStore } from '@/store';
import { MenuCaller } from '@/routes';
import { useDebounce, useMutableRef } from '@/hooks';

import SideLinks from './SideLinks.vue';

const route = useRoute();
const store = useStore();
const { t } = useI18n();
const [filter, setFilter] = useMutableRef('');

const options = computed(() => {
  const sider = route.meta?.sider as MenuCaller | undefined;
  return sider?.(store.state, filter.value);
});

const onInput = useDebounce(setFilter);
</script>

<template>
  <SideLinks v-if="!options" />
  <NSpace style="overflow-x: hidden; padding: 0" vertical v-else>
    <NDivider title-placement="left" style="margin-bottom: 12px">{{
      t('sider.entries')
    }}</NDivider>
    <NSpace vertical style="padding: 0 12px">
      <NInput :placeholder="t('sider.searchText')" @input="onInput" />
    </NSpace>
    <NMenu :options="options" :value="route.path" />
  </NSpace>
</template>
