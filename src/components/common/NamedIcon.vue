<script setup lang="tsx">
import { defineProps, Component } from 'vue';
import {
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
  ArrowForwardCircleOutline
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';

const icons: Record<string, Component> = {
  'male': <MaleOutline />,
  'school': <SchoolOutline />,
  'upload': <CloudUploadOutline />,
  'chart': <BarChartOutline />,
  'server': <ServerOutline />,
  'repo': <CodeSlashOutline />,
  'gitlab': <LogoGitlab />,
  'doc': <DocumentTextOutline />,
  'speedometer': <SpeedometerOutline />,
  'monitor': <DesktopOutline />,
  'unknown': <ArrowForwardCircleOutline />
};

const { name, size } = defineProps<{ name: string, size: number }>();

const MyIcon = () => icons[name] || <ArrowForwardCircleOutline />;
</script>

<template>
  <n-icon :size="size">
    <MyIcon />
  </n-icon>
</template>