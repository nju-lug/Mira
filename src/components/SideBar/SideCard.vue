<script setup lang="ts">
import { NCard, NButton, NRow, NIcon, NH3 } from 'naive-ui';
import { InformationCircleOutline } from '@vicons/ionicons5';

import { CardItem } from '@/models/cards';

import NamedIcon from '@/components/NamedIcon.vue';

defineProps<{ entry: CardItem }>();
</script>

<template>
  <div class="card-container">
    <NCard content-style="padding: 24px;" hoverable>
      <NH3>
        {{ entry.title }}
        <NButton
          tag="a"
          text
          v-if="entry.url"
          :href="entry.url"
          target="_black"
        >
          <template #icon>
            <NIcon size="16px">
              <InformationCircleOutline />
            </NIcon>
          </template>
        </NButton>
      </NH3>
      <NRow v-for="(link, index) in entry.links" :key="index">
        <NButton text tag="a" :href="link.url" target="_blank">
          {{ link.title }}
          <template #icon>
            <NamedIcon :name="link.icon || 'unknown'" :size="16" />
          </template>
        </NButton>
      </NRow>
    </NCard>
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
