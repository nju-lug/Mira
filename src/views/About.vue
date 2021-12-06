<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NH1, NH2, NP, NLayout } from 'naive-ui';

const { t } = useI18n();
</script>

<template>
  <n-h2 prefix="bar">{{ t('header.about') }}</n-h2>
  <n-layout>
    <div class="about-content">
      <img
        class="about-logo"
        src="../assets/index-logo.jpg"
        alt="Mirror Logo"
      />
      <n-h1 class="title">NJU Mirror</n-h1>
      <n-p class="about-text"
        >A refreshed version of Nanjing University Mirror frontend</n-p
      >
      <n-p class="about-text">Based on Vue3 + NaiveUI</n-p>
      <n-p class="about-text">Created by Iori</n-p>
    </div>
  </n-layout>
</template>

<style scoped lang="less">
.about-content {
  display: flex;
  flex-direction: column;
  position: relative;
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
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.2);
  }

  .title {
    line-height: 1;
    font-size: 64px;
    margin-bottom: 18px !important;
  }
}
</style>
