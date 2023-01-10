<script setup lang="tsx">
import { defineProps, VNode } from 'vue';
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

const icons: Record<string, VNode> = {
  male: <MaleOutline />,
  school: <SchoolOutline />,
  upload: <CloudUploadOutline />,
  chart: <BarChartOutline />,
  server: <ServerOutline />,
  repo: <CodeSlashOutline />,
  gitlab: <LogoGitlab />,
  doc: <DocumentTextOutline />,
  speedometer: <SpeedometerOutline />,
  monitor: <DesktopOutline />,
  unknown: <ArrowForwardCircleOutline />
};

const props = defineProps<{ name: string; size: number }>();

const MyIcon = () => icons[props.name] || <ArrowForwardCircleOutline />;
</script>

<template>
  <NIcon :size="size">
    <MyIcon />
  </NIcon>
</template>
