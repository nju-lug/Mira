<script setup lang="ts">
import { NButton, NButtonGroup, NH2, NP, NSpace } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import NamedIcon from '@/components/NamedIcon.vue'
import FeedbackButton from './FeedbackButton.vue'

const { t } = useI18n()

function handleSelect(key: string) {
  window.open(key)
}
</script>

<template>
  <NH2 prefix="bar">
    {{ t('mirror') }}
  </NH2>
  <NSpace justify="space-around">
    <div>
      <NP class="footer-text">
        <a href="https://www.yaoge123.com/" target="_blank">
          {{
            t('footer.maintainer', { name: '@yaoge123' })
          }}
        </a>
      </NP>
      <NP class="footer-text">
        <a href="https://github.com/nju-lug/" target="_blank">
          {{
            t('footer.developer', { name: 'Iori@LinuxUserGroup' })
          }}
        </a>
      </NP>
      <NP class="footer-text">
        <a href="https://sci.nju.edu.cn" target="_blank">
          {{ t('footer.site') }}
        </a>
      </NP>
    </div>
    <NButtonGroup vertical>
      <FeedbackButton />
      <NButton text @click="handleSelect('https://github.com/nju-lug/Mira')">
        <template #icon>
          <NamedIcon name="code" :size="16" />
        </template>
        {{ t('footer.source') }}
      </NButton>
      <NButton text @click="handleSelect('https://github.com/nju-lug')">
        <template #icon>
          <NamedIcon name="male" :size="16" />
        </template>
        {{ t('footer.lug') }}
      </NButton>
    </NButtonGroup>
  </NSpace>
  <NP>
    <NSpace justify="space-evenly">
      <span><a href="https://cicam.nju.edu.cn" target="_blank">{{ t('footer.center') }}</a></span>
      <span><a href="https://beian.miit.gov.cn" target="_blank">苏ICP备10085945-1号.</a></span>
      <span>南信备568号</span>
    </NSpace>
  </NP>
</template>

<style scoped lang="less">
.footer-text {
  font-size: 16px;
  margin: 4px 0;
}
</style>
