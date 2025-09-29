<script setup lang="tsx">
import type { VNode } from 'vue'
import {
  ArrowForwardCircleOutline,
  BarChartOutline,
  BookOutline,
  BugOutline,
  CalculatorOutline,
  CloudUploadOutline,
  CodeOutline,
  DesktopOutline,
  DocumentTextOutline,
  HelpCircleOutline,
  LockClosedOutline,
  LogoGithub,
  LogoGitlab,
  MailOutline,
  MaleOutline,
  SchoolOutline,
  ServerOutline,
  SpeedometerOutline,
  Timer,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps<{ name: string, size: number }>()

const icons: Record<string, () => VNode> = {
  male: () => <MaleOutline />,
  school: () => <SchoolOutline />,
  upload: () => <CloudUploadOutline />,
  chart: () => <BarChartOutline />,
  server: () => <CalculatorOutline />,
  repo: () => <ServerOutline />,
  github: () => <LogoGithub />,
  gitlab: () => <LogoGitlab />,
  mail: () => <MailOutline />,
  doc: () => <DocumentTextOutline />,
  speedometer: () => <SpeedometerOutline />,
  monitor: () => <DesktopOutline />,
  code: () => <CodeOutline />,
  bug: () => <BugOutline />,
  unknown: () => <ArrowForwardCircleOutline />,
  fallback: () => <HelpCircleOutline />,
  bit: () => <LockClosedOutline />,
  time: () => <Timer />,
  document: () => <BookOutline />,
}

const MyIcon = computed(() => icons[props.name] ?? icons.unknown)
</script>

<template>
  <NIcon :size="size">
    <MyIcon />
  </NIcon>
</template>
