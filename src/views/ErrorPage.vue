<script setup lang="ts">
import { ArrowBackOutline, HomeOutline, LogoGithub } from '@vicons/ionicons5'
import { NButton, NButtonGroup, NH2, NIcon, NResult } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

function issue() {
  return window.open('https://github.com/iori2333/NJU-Mirror-Frontend/issues')
}
</script>

<template>
  <NH2 prefix="bar">
    {{ t('header.error') }}
  </NH2>
  <NResult
    size="huge"
    status="404"
    title="404 Not Found"
    :description="t('error.description')"
  >
    <template #footer>
      <NButtonGroup>
        <NButton type="primary" @click="router.back()">
          <template #icon>
            <NIcon size="16px">
              <ArrowBackOutline />
            </NIcon>
          </template>
          {{ t('error.back') }}
        </NButton>
        <NButton @click="router.push('/')">
          <template #icon>
            <NIcon size="16px">
              <HomeOutline />
            </NIcon>
          </template>
          {{ t('error.home') }}
        </NButton>
        <NButton @click="issue">
          <template #icon>
            <NIcon size="16px">
              <LogoGithub />
            </NIcon>
          </template>
          {{ t('error.bug') }}
        </NButton>
      </NButtonGroup>
    </template>
  </NResult>
</template>
