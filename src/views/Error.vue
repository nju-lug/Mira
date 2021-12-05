<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NH2, NResult, NButton, NIcon, NButtonGroup } from 'naive-ui';
import { ArrowBackOutline, HomeOutline, LogoGithub } from '@vicons/ionicons5';

const { t } = useI18n();
const router = useRouter();

const issue = () => window.open('https://github.com/iori2333/NJU-Mirror-Frontend/issues');
</script>

<template>
  <n-h2 prefix="bar">{{ t('header.error') }}</n-h2>
  <n-result size="huge" status="404" title="404 Not Found" :description="t('error.description')">
    <template #footer>
      <n-button-group>
        <n-button type="primary" @click="router.back()">
          <template #icon>
            <n-icon size="16px">
              <arrow-back-outline />
            </n-icon>
          </template>
          {{ t('error.back') }}
        </n-button>
        <n-button @click="router.push('/')">
          <template #icon>
            <n-icon size="16px">
              <home-outline />
            </n-icon>
          </template>
          {{ t('error.home') }}
        </n-button>
        <n-button @click="issue">
          <template #icon>
            <n-icon size="16px">
              <logo-github />
            </n-icon>
          </template>
          {{ t('error.bug') }}
        </n-button>
      </n-button-group>
    </template>
  </n-result>
</template>