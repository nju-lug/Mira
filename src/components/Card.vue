<script setup lang="ts">
import { NCard, NTabs, NTabPane, NRow } from 'naive-ui';
</script>

<template>
  <p class="cards-container">
    <n-card content-style="padding: 12px;">
      <n-tabs type="line" size="small" :tabs-padding="20" pane-style="padding: 20px;">
        <n-tab-pane name="News">News</n-tab-pane>
        <n-tab-pane name="LUG Jokes">LUG Jokes</n-tab-pane>
      </n-tabs>
    </n-card>
  </p>
</template>

<style scoped lang="less">
.cards-container {
  padding: 0 12px;
}
</style>