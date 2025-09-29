<script setup lang="tsx">
import type { DataTableColumn } from 'naive-ui'
import type { SyncEntry } from '@/models/mirrors'
import { CheckmarkOutline, CloseOutline, CloudDoneOutline, GlobeOutline, HelpCircleOutline, SearchOutline } from '@vicons/ionicons5'
import { NButton, NCheckbox, NDataTable, NFlex, NH2, NHighlight, NIcon, NInput, NTag, useThemeVars } from 'naive-ui'
import { computed, h, ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDebounce, usePromiseEffect } from '@/hooks'
import { fetchEntries } from '@/models/mirrors'
import { useStore } from '@/store'
import { timeFromNow } from '@/utils/time'

const { t, locale } = useI18n()
const router = useRouter()
const store = useStore()
const themeVars = useThemeVars()
const entries = shallowRef<SyncEntry[]>([])
const loading = ref(true)
const filter = ref('')
const searchInput = ref('')
const statusFilter = ref<string[]>([])
const onSearchInput = useDebounce((value: string) => filter.value = value)

usePromiseEffect(fetchEntries, (res) => {
  entries.value = res.sort((a, b) => a.name.localeCompare(b.name))
  loading.value = false
})

function filterByName(value: unknown, row: SyncEntry) {
  if (typeof value === 'string') {
    return row.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  }
  return false
}

const statusOptions = computed(() => {
  return [...new Set(entries.value.map(entry => entry.status))]
})

function renderLastUpdate(data: SyncEntry) {
  return data.lastUpdate ? timeFromNow(data.lastUpdate, locale.value as 'zh' | 'en') : '-'
}

function renderNextUpdate(data: SyncEntry) {
  return data.nextUpdate ? timeFromNow(data.nextUpdate, locale.value as 'zh' | 'en') : '-'
}

function renderName(data: SyncEntry) {
  const doc = store.docItems.find(value => value.name === data.name)
  const docButton = doc
    ? h(NButton, {
        text: true,
        onClick: () => {
          if (doc.redirect) {
            window.location.href = doc.redirect
          }
          else {
            router.push(`/help/${doc?.name}` || '')
          }
        },
      }, { default: () => h(NIcon, () => h(HelpCircleOutline)) })
    : undefined
  return h(NFlex, { align: 'center', inline: true, style: { gap: '4px' } }, {
    default: () => [
      h(NButton, {
        text: true,
        size: 'large',
        onClick: () => {
          if (data.route) {
            router.push(data.route)
          }
          else {
            window.location.href = data.path || `/${data.name}`
          }
        },
      }, { default: () => h(NHighlight, {
        text: data.name,
        patterns: [searchInput.value],
        highlightStyle: {
          borderRadius: themeVars.value.borderRadius,
          display: 'inline-block',
          color: themeVars.value.baseColor,
          background: themeVars.value.primaryColor,
          transition: `all .3s ${themeVars.value.cubicBezierEaseInOut}`,
        },
      }) }),
      docButton,
    ],
  })
}

const loadingIcon = h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '32',
  height: '32',
  viewBox: '0 0 24 24',
}, [
  h('g', { stroke: 'currentColor' }, [
    h('circle', {
      'cx': '12',
      'cy': '12',
      'r': '9.5',
      'fill': 'none',
      'stroke-linecap': 'round',
      'stroke-width': '2',
    }, [
      h('animate', {
        attributeName: 'stroke-dasharray',
        calcMode: 'spline',
        dur: '1.5s',
        keySplines: '0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1',
        keyTimes: '0;0.475;0.95;1',
        repeatCount: 'indefinite',
        values: '0 150;42 150;42 150;42 150',
      }),
      h('animate', {
        attributeName: 'stroke-dashoffset',
        calcMode: 'spline',
        dur: '1.5s',
        keySplines: '0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1',
        keyTimes: '0;0.475;0.95;1',
        repeatCount: 'indefinite',
        values: '0;-16;-59;-59',
      }),
    ]),
    h('animateTransform', {
      attributeName: 'transform',
      dur: '2s',
      repeatCount: 'indefinite',
      type: 'rotate',
      values: '0 12 12;360 12 12',
    }),
  ]),
])

function renderStatusTag(data: SyncEntry) {
  let statusType: 'info' | 'success' | 'warning' | 'error' = 'info'
  let statusTitle = data.status as string
  let statusIcon = loadingIcon
  let statusIconSize = '18'
  switch (data.status) {
    case 'proxy':
      statusType = 'warning'
      statusTitle = t('table.statusTitle.proxy')
      statusIcon = h(GlobeOutline)
      statusIconSize = '16'
      break
    case 'cache':
      statusType = 'warning'
      statusTitle = t('table.statusTitle.cache')
      statusIcon = h(CloudDoneOutline)
      statusIconSize = '16'
      break
    case 'success':
      statusType = 'success'
      statusTitle = t('table.statusTitle.success')
      statusIcon = h(CheckmarkOutline)
      statusIconSize = '18'
      break
    case 'failed':
      statusType = 'error'
      statusTitle = t('table.statusTitle.failed')
      statusIcon = h(CloseOutline)
      statusIconSize = '20'
      break
    case 'syncing':
      statusType = 'info'
      statusTitle = t('table.statusTitle.syncing')
      statusIcon = loadingIcon
      statusIconSize = '18'
      break
  }

  return h(NTag, {
    type: statusType,
    bordered: !store.darkMode,
    style: { borderRadius: '5px' },
  }, {
    icon: () => !store.isMobile ? h(NIcon, { size: statusIconSize }, () => statusIcon) : undefined,
    default: () => statusTitle,
  })
}

function renderFilterMenu() {
  const labelsMap = {
    proxy: t('table.statusTitle.proxy'),
    cache: t('table.statusTitle.cache'),
    success: t('table.statusTitle.success'),
    failed: t('table.statusTitle.failed'),
    syncing: t('table.statusTitle.syncing'),
  }
  return h(NFlex, { vertical: true, style: { padding: '8px' } }, { default: () => [
    ...statusOptions.value.map(option =>
      h(NCheckbox, {
        focusable: false,
        checked: statusFilter.value.includes(option as string),
        onUpdateChecked: (checked: boolean) => {
          if (checked) {
            statusFilter.value = [...statusFilter.value, option as string]
          }
          else {
            statusFilter.value = statusFilter.value.filter((v: string) => v !== option as string)
          }
        },
      }, {
        default: () => labelsMap[option as keyof typeof labelsMap] || option,
      }),
    ),
  ] })
}

const columns = computed(() => {
  const baseColumns: DataTableColumn<SyncEntry>[] = [
    {
      title: t('table.name'),
      key: 'name',
      align: 'left',
      render: renderName,
      filter: filterByName,
      filterOptionValue: filter.value,
      sorter: (row1, row2) => row1.name.localeCompare(row2.name),
    },
    {
      title: t('table.status'),
      key: 'status',
      align: 'center',
      render: renderStatusTag,
      filter: (value: string | number, row: SyncEntry) => {
        value = `${value}`
        if (!value || value.length === 0)
          return true
        return value.includes(row.status as string)
      },
      filterMultiple: true,
      renderFilterMenu,
    },
  ]

  if (!store.isMobile) {
    baseColumns.push(
      {
        title: t('table.size'),
        key: 'size',
        align: 'center',
      },
      {
        title: t('table.lastUpdate'),
        key: 'lastUpdate',
        align: 'center',
        render: renderLastUpdate,
      },
      {
        title: t('table.nextUpdate'),
        key: 'nextUpdate',
        align: 'center',
        render: renderNextUpdate,
      },
    )
  }

  return baseColumns
})

const filteredEntries = computed(() => {
  let result = entries.value
  if (filter.value) {
    result = result.filter(entry =>
      entry.name.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()),
    )
  }
  if (statusFilter.value.length > 0) {
    result = result.filter(entry => statusFilter.value.includes(entry.status as string))
  }
  return result
})
</script>

<template>
  <NH2 prefix="bar">
    <span>{{ t('header.mirrors') }}</span>
    <NInput v-model:value="searchInput" :placeholder="t('table.searchText')" clearable style="max-width: 300px" @input="onSearchInput">
      <template #prefix>
        <NIcon>
          <SearchOutline />
        </NIcon>
      </template>
    </NInput>
  </NH2>
  <NDataTable
    size="small"
    single-column
    :loading="loading"
    :columns="columns"
    :data="filteredEntries"
    :row-key="(row: SyncEntry) => row.name"
    :max-height="!store.isMobile ? 'calc(100vh - 12.125rem)' : 'calc(100vh - 12.125rem + 24px)'"
    virtual-scroll
  />
</template>

<style scoped lang="less">
.n-h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .n-input {
    width: max(30%, 200px);
  }
}
</style>
