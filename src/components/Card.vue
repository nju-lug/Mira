<script setup lang="tsx">
import { defineProps } from 'vue';
import { NCard, NButton, NRow, NIcon, NH3 } from 'naive-ui';
import { InformationCircleOutline } from '@vicons/ionicons5';

import { CardItem } from '../models/cards';

import NamedIcon from './common/NamedIcon.vue';

const { entry } = defineProps<{ entry: CardItem }>();
</script>

<template>
  <div class="card-container">
    <n-card content-style="padding: 24px;" hoverable>
      <n-h3>
        {{ entry.title }}
        <n-button
          tag="a"
          text
          v-if="entry.url"
          :href="entry.url"
          target="_black"
        >
          <template #icon>
            <n-icon size="16px">
              <information-circle-outline />
            </n-icon>
          </template>
        </n-button>
      </n-h3>
      <n-row v-for="(link, index) in entry.links" :key="index">
        <n-button text tag="a" :href="link.url" target="_blank">
          {{ link.title }}
          <template #icon>
            <NamedIcon :name="link.icon || 'unknown'" :size="16" />
          </template>
        </n-button>
      </n-row>
    </n-card>
  </div>
</template>

<style scoped lang="less">
.card-container {
  max-width: 100%;
  padding: 0 12px;
  text-align: center;
}

.n-row {
  padding: 4px 0;
}
</style>
