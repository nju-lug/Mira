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
  <NH2 prefix="bar">{{ t('mirror') }}</NH2>
  <NSpace justify="space-between">
    <div>
      <NP class="footer-text">{{
        t('footer.maintainer', { name: '@yaoge123' })
      }}</NP>
      <NP class="footer-text">{{
        t('footer.developer', { name: 'Iori@LinuxUserGroup' })
      }}</NP>
      <NP class="footer-text">{{ t('footer.special') }}</NP>
    </div>
    <NButtonGroup vertical>
      <NDropdown
        trigger="click"
        @select="handleSelect"
        placement="left-start"
        :options="reports"
      >
        <NButton text>
          <template #icon>
            <NIcon size="16">
              <BugOutline />
            </NIcon>
          </template>
          {{ t('footer.bug') }}
        </NButton>
      </NDropdown>
      <NButton text @click="handleSelect('https://github.com/iori2333/Mira')">
        <template #icon>
          <NIcon size="16">
            <CodeOutline />
          </NIcon>
        </template>
        {{ t('footer.source') }}
      </NButton>
      <NButton text @click="handleSelect('https://git.nju.edu.cn/nju-lug')">
        <template #icon>
          <NIcon size="16">
            <MaleOutline />
          </NIcon>
        </template>
        {{ t('footer.lug') }}
      </NButton>
    </NButtonGroup>
  </NSpace>
  <NP>人工微结构科学与技术协同创新中心 苏ICP备10085945-1号 南信备568号</NP>
</template>

<style scoped lang="less">
.footer-text {
  font-size: 16px;
  margin: 4px 0;
}
</style>
