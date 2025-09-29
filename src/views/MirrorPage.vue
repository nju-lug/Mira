<script setup lang="tsx">
import type { DataTableColumn } from 'naive-ui'
import type { SyncEntry } from '@/models/mirrors'
import { HelpCircleOutline, SearchOutline } from '@vicons/ionicons5'
import { NButton, NDataTable, NH2, NIcon, NInput, NSpace, NTag } from 'naive-ui'
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
const entries = shallowRef<SyncEntry[]>([])
const loading = ref(true)
const filter = ref('')
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

function renderLastUpdate(data: SyncEntry) {
  return data.lastUpdate ? timeFromNow(data.lastUpdate, locale.value as 'zh' | 'en') : '-'
}

function renderNextUpdate(data: SyncEntry) {
  return data.nextUpdate ? timeFromNow(data.nextUpdate, locale.value as 'zh' | 'en') : '-'
}

function renderRouteButton(data: SyncEntry) {
  const doc = store.docItems.find(value => value.name === data.name)
  return [
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
    }, () => data.name),
    doc
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
        }, () => h(NIcon, () => h(HelpCircleOutline)))
      : null,
  ]
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
  return h(NTag, { type: status }, () => data.status)
}

const columns = computed(() => {
  const baseColumns: DataTableColumn<SyncEntry>[] = [
    {
      title: t('table.name'),
      key: 'name',
      align: 'left',
      render: renderRouteButton,
      filter: filterByName,
      filterOptionValue: filter.value,
    },
    {
      title: t('table.status'),
      key: 'status',
      align: 'center',
      render: renderStatusTag,
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
  if (!filter.value)
    return entries.value
  return entries.value.filter(entry =>
    entry.name.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase()),
  )
})
</script>

<template>
  <NH2 prefix="bar">
    <span>{{ t('header.mirrors') }}</span>
    <NInput :placeholder="t('table.searchText')" @input="onSearchInput">
      <template #prefix>
        <NIcon>
          <SearchOutline />
        </NIcon>
      </template>
    </NInput>
  </NH2>
  <NSpace vertical>
    <NDataTable
      size="small"
      :loading="loading"
      :columns="columns"
      :data="filteredEntries"
      :row-key="(row: SyncEntry) => row.name"
      max-height="calc(100vh - 12.125rem)"
      virtual-scroll
    />
  </NSpace>
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
