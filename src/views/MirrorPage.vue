<script setup lang="tsx">
import type { DataTableColumn } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { SyncEntry } from '@/models/mirrors'
import { CheckmarkOutline, Close, CloudDoneOutline, GlobeOutline, HelpCircleOutline, PauseOutline, SearchOutline } from '@vicons/ionicons5'
import { NCheckbox, NDataTable, NFlex, NH2, NIcon, NInput, useOsTheme } from 'naive-ui'
import { computed, h, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDebounce, usePromiseEffect } from '@/hooks'
import { fetchEntries } from '@/models/mirrors'
import { useStore } from '@/store'
import { timeFromNow } from '@/utils/time'

const { t, locale } = useI18n()
const router = useRouter()
const store = useStore()
const osTheme = useOsTheme()
const isDark = computed(() =>
  store.themeMode === 'system'
    ? osTheme.value === 'dark'
    : store.themeMode === 'dark',
)
const entries = shallowRef<SyncEntry[]>([])
const loading = ref(true)
const filter = ref('')
const searchInput = ref('')
const statusFilter = ref<string[]>([])
const onSearchInput = useDebounce((value: string) => filter.value = value)
const searchInputRef = ref<HTMLElement>()

function handleKeyDown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
    event.preventDefault()
    if (searchInputRef.value) {
      searchInputRef.value.focus();
      (searchInputRef.value as HTMLInputElement).select()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

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

function getAbsolutePath(path: string) {
  if (path.startsWith('http')) {
    return path
  }
  else if (path.startsWith('/')) {
    return window.location.href.replace(/\/$/, '') + path
  }
  return `${window.location.href.replace(/\/$/, '')}/${path}`
}

function renderHighlightedName(name: string, pattern: string): VNodeChild[] {
  if (!pattern)
    return [name]
  const lowerName = name.toLocaleLowerCase()
  const lowerPattern = pattern.toLocaleLowerCase()
  const parts: VNodeChild[] = []
  let cursor = 0
  while (true) {
    const matchIndex = lowerName.indexOf(lowerPattern, cursor)
    if (matchIndex === -1) {
      parts.push(name.slice(cursor))
      break
    }
    if (matchIndex > cursor)
      parts.push(name.slice(cursor, matchIndex))
    parts.push(h('mark', { class: 'name-highlight' }, name.slice(matchIndex, matchIndex + lowerPattern.length)))
    cursor = matchIndex + lowerPattern.length
  }
  return parts
}

function renderName(data: SyncEntry) {
  const doc = store.docItems.find(value => value.name === data.name)
  const docLink = doc
    ? h('a', {
        class: 'mirror-doc-link',
        href: getAbsolutePath(doc.redirect || `${window.location.href}${doc?.name}`),
        onClick: (event: MouseEvent) => {
          event.preventDefault()
          if (doc.redirect) {
            window.location.href = doc.redirect
          }
          else {
            router.push(`/help/${doc?.name}` || '')
          }
        },
      }, [h(HelpCircleOutline, { class: 'mirror-doc-icon' })])
    : undefined
  const linkHref = getAbsolutePath(data.route ? data.route : (data.path ? data.path : `/${data.name}`))
  return h('div', { class: 'mirror-name-cell' }, [
    h('a', {
      class: 'mirror-name-link',
      href: linkHref,
      onClick: (event: MouseEvent) => {
        event.preventDefault()
        if (data.route) {
          router.push(data.route)
        }
        else {
          window.location.href = data.path || `/${data.name}`
        }
      },
    }, renderHighlightedName(data.name, searchInput.value)),
    docLink,
  ])
}

const loadingIcon = h('div', {
  style: 'width: 14px; height: 14px;',
}, [h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '32',
  height: '32',
  viewBox: '0 0 24 24',
}, [
  h('path', {
    fill: 'currentColor',
    d: 'M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z',
  }, [
    h('animateTransform', {
      attributeName: 'transform',
      dur: '1s',
      repeatCount: 'indefinite',
      type: 'rotate',
      values: '0 12 12;360 12 12',
    }),
  ]),
])])

function renderStatusTag(data: SyncEntry) {
  let statusType: 'info' | 'success' | 'warning' | 'error' = 'warning'
  let statusTitle = data.status as string
  let statusIcon: VNodeChild | undefined
  switch (data.status) {
    case 'proxy':
      statusType = 'info'
      statusTitle = t('table.statusTitle.proxy')
      statusIcon = h(GlobeOutline)
      break
    case 'cache':
      statusType = 'success'
      statusTitle = t('table.statusTitle.cache')
      statusIcon = h(CloudDoneOutline)
      break
    case 'success':
      statusType = 'success'
      statusTitle = t('table.statusTitle.success')
      statusIcon = h(CheckmarkOutline)
      break
    case 'failed':
      statusType = 'error'
      statusTitle = t('table.statusTitle.failed')
      statusIcon = h(Close)
      break
    case 'syncing':
      statusType = 'info'
      statusTitle = t('table.statusTitle.syncing')
      statusIcon = loadingIcon
      break
    case 'paused':
      statusType = 'warning'
      statusTitle = t('table.statusTitle.paused')
      statusIcon = h(PauseOutline)
      break
  }

  return h('div', { class: 'status-tag-cell' }, [
    h('span', { class: `status-tag status-tag--${statusType}` }, [
      !store.isMobile && statusIcon
        ? h('span', { class: 'status-tag__icon' }, [statusIcon])
        : undefined,
      h('span', {}, statusTitle),
    ]),
  ])
}

function renderFilterMenu() {
  const labelsMap = {
    proxy: t('table.statusTitle.proxy'),
    cache: t('table.statusTitle.cache'),
    success: t('table.statusTitle.success'),
    failed: t('table.statusTitle.failed'),
    syncing: t('table.statusTitle.syncing'),
    paused: t('table.statusTitle.paused'),
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
    <NInput
      id="mirror-search-input"
      ref="searchInputRef"
      v-model:value="searchInput"
      :placeholder="t('table.searchText')"
      clearable
      style="max-width: 300px"
      @input="onSearchInput"
    >
      <template #prefix>
        <NIcon>
          <SearchOutline />
        </NIcon>
      </template>
    </NInput>
  </NH2>
  <div
    class="mirror-table-wrapper"
    :class="{ 'is-dark': isDark }"
    :style="{ '--mirror-primary': isDark ? '#a879db' : '#6f106e' }"
  >
    <NDataTable
      size="small"
      single-column
      :loading="loading"
      :columns="columns"
      :data="filteredEntries"
      :row-key="(row: SyncEntry) => row.name"
      max-height="100%"
    />
  </div>
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
.mirror-table-wrapper {
  min-height: 0;
  contain: content;
  will-change: contents;
}
</style>

<style lang="less">
.mirror-name-cell {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.mirror-name-link {
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--mirror-primary);
  }
}

.name-highlight {
  border-radius: 5px;
  display: inline-block;
  padding: 0 2px;
  color: #fff;
  background: var(--mirror-primary);
}

.mirror-doc-link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
    color: var(--mirror-primary);
  }
}

.mirror-doc-icon {
  width: 16px;
  height: 16px;
}

.status-tag-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 12px;
  line-height: 1;
  height: 20px;
  border: 1px solid transparent;
  white-space: nowrap;

  &__icon {
    display: inline-flex;
    width: 14px;
    height: 14px;

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &--warning {
    color: #de9c1e;
    background: rgba(240, 160, 32, 0.12);
    border-color: rgba(240, 160, 32, 0.3);
  }

  &--success {
    color: #18a058;
    background: rgba(24, 160, 88, 0.12);
    border-color: rgba(24, 160, 88, 0.3);
  }

  &--error {
    color: #d03050;
    background: rgba(208, 48, 80, 0.12);
    border-color: rgba(208, 48, 80, 0.3);
  }

  &--info {
    color: #2080f0;
    background: rgba(32, 128, 240, 0.12);
    border-color: rgba(32, 128, 240, 0.3);
  }
}

.is-dark .status-tag {
  border-color: transparent;

  &--warning {
    color: #f2c97d;
    background: rgba(242, 201, 125, 0.16);
  }

  &--success {
    color: #63e2b7;
    background: rgba(99, 226, 183, 0.16);
  }

  &--error {
    color: #e88080;
    background: rgba(232, 128, 128, 0.16);
  }

  &--info {
    color: #6cc2ff;
    background: rgba(108, 194, 255, 0.16);
  }
}
</style>
