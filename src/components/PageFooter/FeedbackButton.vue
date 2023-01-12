<script setup lang="ts">
import {
  NButton,
  NSelect,
  NDivider,
  NH3,
  NButtonGroup,
  NModal,
  useMessage
} from 'naive-ui';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import reports from '@/assets/report.json';

import { useMutableRef, useNullableRef } from '@/hooks';
import NamedIcon from '@/components/NamedIcon.vue';

type RequestKey = keyof typeof reports;

const { t } = useI18n();
const message = useMessage();
const [show, setShow] = useMutableRef(false);
const [selected, , resetSelected] = useNullableRef<string>();

const options = (() => {
  const options = [];
  for (const key in reports) {
    options.push({ label: t(`report.${key}`), value: key });
  }
  return options;
})();

const selectedValue = computed(
  () => selected.value && reports[selected.value as RequestKey]
);

const onLinkClicked = (url: string) => {
  window.open(url);
  setShow(false);
  resetSelected();
  message.info(`${t('report.prompt.done')} ❤`);
};
</script>

<template>
  <NButton text @click="setShow(true)">
    <template #icon>
      <NamedIcon name="bug" :size="16" />
    </template>
    {{ t('footer.bug') }}
  </NButton>
  <NModal
    style="width: min(600px, 90%)"
    preset="card"
    size="huge"
    :title="t('report.title')"
    v-model:show="show"
    aria-modal
    bordered
  >
    <NH3 prefix="line">step.1 {{ t('report.prompt.type') }}</NH3>
    <NSelect
      :options="options"
      v-model:value="selected"
      :placeholder="t('report.prompt.type')"
    />
    <div v-if="selectedValue">
      <NDivider />
      <NH3 prefix="line">step.2 {{ t('report.prompt.link') }}</NH3>
      <NButtonGroup>
        <NButton
          v-for="(url, name) in selectedValue"
          :key="name"
          @click="onLinkClicked(url)"
        >
          <template #icon>
            <NamedIcon :name="name" :size="16" />
          </template>
          {{ t(`report.${name}`) }}
        </NButton>
      </NButtonGroup>
    </div>
  </NModal>
</template>
