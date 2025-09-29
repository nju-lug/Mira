<script setup lang="tsx">
import type { DataTableColumn } from 'naive-ui'
import type { SyncEntry } from '@/models/mirrors'
import { HelpCircleOutline, SearchOutline } from '@vicons/ionicons5'
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
  const allStatuses = [...new Set(entries.value.map(entry => entry.status))]
  return allStatuses.map(status => ({
    label: status,
    value: status,
  }))
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

function renderStatusTag(data: SyncEntry) {
  let status: 'info' | 'success' | 'error' = 'info'
  switch (data.status) {
    case 'cache':
    case 'proxy':
    case 'success':
      status = 'success'
      break
    case 'failed':
      status = 'error'
      break
    case 'syncing':
      status = 'info'
      break
  }
  return h(NTag, { type: status }, { default: () => data.status })
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
      renderFilterMenu: () => {
        return h('div', { style: { padding: '8px' } }, [
          ...statusOptions.value.map(option =>
            h('div', { style: { marginBottom: '4px' } }, [
              h(NCheckbox, {
                checked: statusFilter.value.includes(option.value as string),
                onUpdateChecked: (checked: boolean) => {
                  if (checked) {
                    statusFilter.value = [...statusFilter.value, option.value as string]
                  }
                  else {
                    statusFilter.value = statusFilter.value.filter((v: string) => v !== option.value as string)
                  }
                },
              }, () => option.label),
            ]),
          ),
        ])
      },
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
    <NInput v-model:value="searchInput" :placeholder="t('table.searchText')" clearable @input="onSearchInput">
      <template #prefix>
        <NIcon>
          <SearchOutline />
        </NIcon>
      </template>
    </NInput>
  </NH2>
  <NDataTable
    size="small"
    :loading="loading"
    :columns="columns"
    :data="filteredEntries"
    :row-key="(row: SyncEntry) => row.name"
    max-height="calc(100vh - 12.125rem)"
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
