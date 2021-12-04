<script setup lang="ts">
import { NH1, NH2, NP, NLayout } from 'naive-ui';
</script>

<template>
  <n-h2 prefix="bar">About</n-h2>
  <n-layout>
    <div class="about-content">
      <img class="about-logo" src="../assets/logo.png" alt="Mirror Logo" />
      <n-h1 class="title">NJU Mirror</n-h1>
      <n-p class="about-text">Created by NJU LUG</n-p>
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
  }

  .title {
    line-height: 1;
    font-size: 64px;
    margin-bottom: 18px !important;
  }
}
</style>