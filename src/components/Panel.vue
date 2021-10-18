<script setup lang="ts">
import { NCard, NTabs, NTabPane, NDivider } from 'naive-ui';

</script>

<template>
  <div class="panel-container">
    <n-card content-style="padding: 0;" :bordered="false">
      <n-divider title-placement="left">NEWS</n-divider>
      <n-tabs type="line" size="small" :tabs-padding="20" pane-style="padding: 20px;">
        <n-tab-pane name="Mirror">Something</n-tab-pane>
        <n-tab-pane name="LUG Jokes">LUG Jokes</n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<style scoped lang="less">
</style>