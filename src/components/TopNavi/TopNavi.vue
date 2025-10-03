<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { AppsOutline, NewspaperOutline } from '@vicons/ionicons5'
import { NButton, NDrawer, NDropdown, NIcon, NSpace, NText, useMessage } from 'naive-ui'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import logo from '@/assets/nju.png'
import SideBar from '@/components/SideBar'
import { useMutableRef } from '@/hooks'
import { useStore } from '@/store'
import SelectLocale from './components/SelectLocale.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'

const { t } = useI18n()
const message = useMessage()
const store = useStore()
const route = useRoute()
const router = useRouter()
const [active, setActive] = useMutableRef(false)

function createRoute(to: string, name: string): DropdownOption {
  return {
    label: t(`header.${name}`),
    key: to,
    props: { onClick: () => {
      router.push(to)
    } },
  }
}

const options = computed<DropdownOption[]>(() => [
  createRoute('/', 'mirrors'),
  createRoute('/download', 'downloads'),
  createRoute('/help', 'help'),
  createRoute('/news', 'news'),
  createRoute('/about', 'about'),
])

function isActiveRoute(key: string): boolean {
  if (key === 'locale')
    return false
  if (key === '/')
    return route.path === '/'
  return route.path.startsWith(key)
}

function handleLogoButtonClick() {
  if (route.path === '/')
    return message.info(t('header.homeTips'))
  router.push('/')
}

watch(
  () => route.path,
  () => setActive(false),
)
</script>

<template>
  <NSpace
    class="nav-bar"
    justify="space-between"
    style="height: var(--header-height)"
  >
    <NText class="logo-container" @click="handleLogoButtonClick">
      <img :src="logo" alt="Mirror Logo">
      <span>NJU Mirror</span>
    </NText>

    <NSpace
      v-if="!store.isMobile"
      class="nav-mid"
      align="center"
      size="large"
    >
      <NButton
        v-for="item in options"
        :key="item.key"
        :type="isActiveRoute(item.key as string) ? 'primary' : undefined"
        quaternary
        size="small"
        :focusable="false"
        v-bind="item?.props as any"
      >
        {{ item.label }}
      </NButton>
    </NSpace>

    <NSpace class="nav-end" align="center">
      <SelectLocale />
      <ThemeSwitch />

      <NButton
        v-if="store.isMobile"
        quaternary
        size="medium"
        :style="{ padding: '0 8px' }"
        :focusable="false"
        @click="setActive(true)"
      >
        <NIcon :size="18">
          <NewspaperOutline />
        </NIcon>
      </NButton>

      <NDropdown
        v-if="store.isMobile"
        :options="options"
        trigger="click"
      >
        <NButton
          quaternary
          size="medium"
          :style="{ padding: '0 8px' }"
          :focusable="false"
        >
          <NIcon :size="18">
            <AppsOutline />
          </NIcon>
        </NButton>
      </NDropdown>
    </NSpace>
  </NSpace>

  <NDrawer
    v-if="store.isMobile"
    v-model:show="active"
    placement="right"
    width="min(360px, 80%)"
    :native-scrollbar="false"
  >
    <SideBar />
  </NDrawer>
</template>

<style scoped lang="less">
.nav-bar {
  background-color: rgba(216, 216, 216, 0.13);
}

.nav-mid {
  height: 100%;
  display: flex;
}

.nav-end {
  height: 100%;
  display: flex;
  margin-right: 24px;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
}

.logo-container {
  height: var(--header-height);
  display: flex;
  justify-content: left;
  padding-left: 16px;
  align-items: center;
  user-select: none;
  cursor: pointer;

  span {
    padding: 0 10px;
    font-size: large;
  }

  img {
    height: 35px;
    width: 35px;
  }
}
</style>
