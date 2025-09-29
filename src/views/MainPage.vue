<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { NBackTop, NDivider, NLayout, NLayoutHeader, NLayoutSider } from 'naive-ui'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import PageFooter from '@/components/PageFooter'
import SideBar from '@/components/SideBar'
import TopNavi from '@/components/TopNavi'
import { useElementRef, useLoadingBar, usePromiseEffect, useWidth, useWidthObserver } from '@/hooks'

import { fetchDocs } from '@/models/documents'
import { fetchNewsList } from '@/models/news'
import { useStore } from '@/store'

const store = useStore()
const { isMobile } = useWidth()
const boxRef = useElementRef<ComponentPublicInstance>()
const el = computed(() => boxRef.value?.$el)

useWidthObserver(el)
useLoadingBar()
usePromiseEffect(fetchDocs, res => store.setDocs(res))
usePromiseEffect(fetchNewsList, res => store.setNews(res))
</script>

<template>
  <NLayout position="absolute">
    <NLayoutHeader style="height: var(--header-height)">
      <TopNavi />
    </NLayoutHeader>
    <NLayout
      ref="boxRef"
      position="absolute"
      sider-placement="left"
      style="top: var(--header-height)"
      has-sider
    >
      <NLayoutSider
        v-if="!isMobile"
        :native-scrollbar="false"
        :collapsed-width="0"
        width="320px"
        collapse-mode="transform"
        bordered
        show-trigger="bar"
      >
        <SideBar />
      </NLayoutSider>
      <NLayout
        :native-scrollbar="false"
        :content-style="{
          display: 'flex',
          flexDirection: 'column',
          padding: !store.isMobile ? '24px' : '10px' }"
      >
        <RouterView />
        <NBackTop :right="50" style="z-index: 500" />
        <NDivider style="margin-bottom: 0" />
        <PageFooter />
      </NLayout>
    </NLayout>
  </NLayout>
</template>
