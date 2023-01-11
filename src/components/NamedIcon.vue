<script setup lang="tsx">
import { VNode, computed } from 'vue';
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
  ArrowForwardCircleOutline,
  LogoGithub,
  MailOutline,
  CodeOutline,
  BugOutline,
  HelpCircleOutline
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';

const icons: Record<string, () => VNode> = {
  male: () => <MaleOutline />,
  school: () => <SchoolOutline />,
  upload: () => <CloudUploadOutline />,
  chart: () => <BarChartOutline />,
  server: () => <ServerOutline />,
  repo: () => <CodeSlashOutline />,
  github: () => <LogoGithub />,
  gitlab: () => <LogoGitlab />,
  mail: () => <MailOutline />,
  doc: () => <DocumentTextOutline />,
  speedometer: () => <SpeedometerOutline />,
  monitor: () => <DesktopOutline />,
  code: () => <CodeOutline />,
  bug: () => <BugOutline />,
  unknown: () => <ArrowForwardCircleOutline />,
  fallback: () => <HelpCircleOutline />
};

const props = defineProps<{ name: string; size: number }>();

const MyIcon = computed(() => icons[props.name] ?? icons.unknown);
</script>

<template>
  <NIcon :size="size">
    <MyIcon />
  </NIcon>
</template>
