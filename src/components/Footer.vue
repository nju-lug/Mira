<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  NH2,
  NP,
  NSpace,
  NDropdown,
  NButton,
  NButtonGroup,
  NIcon,
  MenuOption
} from 'naive-ui';
import { BugOutline, CodeOutline, MaleOutline } from '@vicons/ionicons5';

const { t } = useI18n();
const reports = [
  {
    label: 'Via Mail',
    key: 'mailto:git+nju-lug-mira-3921-issue-@yaoge123.cn'
  },
  {
    label: 'Via GitHub',
    key: 'https://github.com/iori2333/NJU-Mirror-Frontend/issues'
  },
  {
    label: 'Via NJU Git',
    key: 'https://git.nju.edu.cn/nju-lug/'
  }
] as MenuOption[];

function handleSelect(key: string) {
  window.open(key);
}
</script>

<template>
  <n-h2 prefix="bar">{{ t('mirror') }}</n-h2>
  <n-space justify="space-between">
    <div>
      <n-p class="footer-text">{{
        t('footer.maintainer', { name: '@yaoge123' })
      }}</n-p>
      <n-p class="footer-text">{{
        t('footer.developer', { name: 'Iori@LinuxUserGroup' })
      }}</n-p>
      <n-p class="footer-text">{{ t('footer.special') }}</n-p>
    </div>
    <n-button-group vertical>
      <n-dropdown
        trigger="click"
        @select="handleSelect"
        placement="left-start"
        :options="reports"
      >
        <n-button text>
          <template #icon>
            <n-icon size="16">
              <bug-outline />
            </n-icon>
          </template>
          {{ t('footer.bug') }}
        </n-button>
      </n-dropdown>
      <n-button text @click="handleSelect('https://github.com/iori2333/Mira')">
        <template #icon>
          <n-icon size="16">
            <code-outline />
          </n-icon>
        </template>
        {{ t('footer.source') }}
      </n-button>
      <n-button text @click="handleSelect('https://git.nju.edu.cn/nju-lug')">
        <template #icon>
          <n-icon size="16">
            <male-outline />
          </n-icon>
        </template>
        {{ t('footer.lug') }}
      </n-button>
    </n-button-group>
  </n-space>
  <n-p>人工微结构科学与技术协同创新中心 苏ICP备10085945-1号 南信备568号</n-p>
</template>

<style scoped lang="less">
.footer-text {
  font-size: 16px;
  margin: 4px 0;
}
</style>
