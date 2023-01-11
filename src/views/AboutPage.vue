<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NH1, NH2, NP, NLayout, useMessage } from 'naive-ui';

import logo from '@/assets/shamiko.jpg';
import logoAlt from '@/assets/shamiko-alt.jpg';

const message = useMessage();
const { t } = useI18n();
const hit = ref(0);
const logoUrl = computed(() => {
  if (hit.value >= 10) {
    message.error('これで勝ったと思うなよ―――！！');
    return logoAlt;
  } else {
    return logo;
  }
});
</script>

<template>
  <NH2 prefix="bar">{{ t('header.about') }}</NH2>
  <NLayout class="about-content">
    <img class="about-logo" :src="logoUrl" alt="Mirror Logo" @click="hit++" />
    <NH1 class="title">Shamiko</NH1>
    <NP class="about-text">こっっ…これで勝ったと思うなよ―――！！</NP>
  </NLayout>
</template>

<style scoped lang="less">
.about-content {
  text-align: center;
  justify-content: center;

  .about-text {
    font-size: 16px;
    margin: 4px 0;
  }

  .about-logo {
    border-radius: 24px;
    height: 240px;
    width: 240px;
    margin: 24px;
    align-self: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:active {
      transform: scale(0.9);
    }
  }

  .title {
    line-height: 1;
    font-size: 64px;
  }
}
</style>
