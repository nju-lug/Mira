<script setup lang="ts">
import { NH2, NResult, NButton, NIcon, NButtonGroup } from 'naive-ui';
import { ArrowBackOutline, HomeOutline, LogoGithub } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

const router = useRouter();

const issue = () => window.open('https://github.com/iori2333/NJU-Mirror-Frontend/issues');
</script>

<template>
  <n-h2 prefix="bar">Error</n-h2>
  <n-result size="huge" status="404" title="404 Not Found" description="Where...am I?">
    <template #footer>
      <n-button-group>
        <n-button type="primary" @click="router.back()">
          <template #icon>
            <n-icon size="16px">
              <arrow-back-outline />
            </n-icon>
          </template>
          Go Back
        </n-button>
        <n-button @click="router.push('/')">
          <template #icon>
            <n-icon size="16px">
              <home-outline />
            </n-icon>
          </template>
          Home
        </n-button>
        <n-button @click="issue">
          <template #icon>
            <n-icon size="16px">
              <logo-github />
            </n-icon>
          </template>
          Report Bugs
        </n-button>
      </n-button-group>
    </template>
  </n-result>
</template>