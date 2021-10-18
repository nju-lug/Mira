<script setup lang="tsx">
import { defineProps } from 'vue';
import { NCard, NButton, NRow, NIcon, NH3 } from 'naive-ui';
import {
  ArrowForwardCircleOutline,
  MaleOutline,
  SchoolOutline,
  CloudUploadOutline,
  BarChartOutline,
  ServerOutline,
  CodeSlashOutline,
  LogoGitlab,
  DocumentTextOutline,
  SpeedometerOutline,
  DesktopOutline,
  InformationCircleOutline
} from '@vicons/ionicons5';

import { CardItem } from '../models/cards';

const { entry } = defineProps<{
  entry: CardItem
}>();

function Icon({ name }: { name: string | undefined }) {
  switch (name) {
  case 'male': return <MaleOutline />;
  case 'school': return <SchoolOutline />;
  case 'upload': return <CloudUploadOutline />;
  case 'chart': return <BarChartOutline />;
  case 'server': return <ServerOutline />;
  case 'repo': return <CodeSlashOutline />;
  case 'gitlab': return <LogoGitlab />;
  case 'doc': return <DocumentTextOutline />;
  case 'speedometer': return <SpeedometerOutline />;
  case 'monitor': return <DesktopOutline />;
  default: return <ArrowForwardCircleOutline />;
  }
}
</script>

<template>
  <div class="card-container">
    <n-card content-style="padding: 24px;" hoverable>
      <n-h3>
        {{ entry.title }}
        <n-button tag="a" text v-if="entry.url" :href="entry.url" target="_black">
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
            <n-icon size="16px">
              <Icon :name="link.icon" />
            </n-icon>
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