<script setup lang="tsx">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  NH2,
  NDataTable,
  DataTableColumn,
  NButton,
  NTag,
  NIcon,
  NInput,
  NSpace
} from 'naive-ui';
import { SearchOutline, HelpCircleOutline } from '@vicons/ionicons5';

import { fetchEntries, SyncEntry } from '@/models/mirrors';
import { useStore } from '@/store';
import { timeFromNow } from '@/utils/time';
import { useMutableRef, useDebounce, usePromiseEffect } from '@/hooks';

const { t, locale } = useI18n();
const router = useRouter();
const store = useStore();
const [entries, setEntries] = useMutableRef([] as SyncEntry[]);
const [loading, setLoading] = useMutableRef(true);
const [filter, setFilter] = useMutableRef('');
const onInput = useDebounce(setFilter);

usePromiseEffect(fetchEntries, res => {
  setEntries(res.sort((a, b) => a.name.localeCompare(b.name)));
  setLoading(false);
});

function RouteButton({ data }: { data: SyncEntry }) {
  const doc = store.state.docItems.find(value => value.name == data.name);
  return (
    <>
      <NButton
        text
        onClick={() => {
          if (data.route) {
            router.push(data.route);
          } else {
            window.location.href = data.path || '/' + data.name;
          }
        }}
      >
        {data.name}
      </NButton>
      <NButton
        text
        v-show={doc}
        onClick={() =>
          doc?.redirect
            ? (window.location.href = doc.redirect)
            : router.push('/help/' + doc?.name || '')
        }
      >
        <NIcon>
          <HelpCircleOutline />
        </NIcon>
      </NButton>
    </>
  );
}

function StatusTag({ data }: { data: SyncEntry }) {
  let status: 'info' | 'success' | 'error' = 'info';
  switch (data.status) {
    case 'cache':
    case 'proxy':
    case 'success':
      status = 'success';
      break;
    case 'failed':
      status = 'error';
      break;
    case 'syncing':
      status = 'info';
      break;
  }
  return <NTag type={status}>{data.status}</NTag>;
}

const extraColumns = computed(() =>
  store.state.isMobile
    ? []
    : ([
        {
          title: t('table.size'),
          key: 'size',
          align: 'center'
        },
        {
          title: t('table.lastUpdate'),
          key: 'lastUpdate',
          align: 'center',
          render: data =>
            data.lastUpdate
              ? timeFromNow(data.lastUpdate, locale.value as 'zh' | 'en')
              : '-'
        },
        {
          title: t('table.nextUpdate'),
          key: 'nextUpdate',
          align: 'center',
          render: data =>
            data.nextUpdate
              ? timeFromNow(data.nextUpdate, locale.value as 'zh' | 'en')
              : '-'
        }
      ] as DataTableColumn<SyncEntry>[])
);

const columns = computed(() =>
  reactive([
    {
      title: t('table.name'),
      key: 'name',
      align: 'left',
      render: data => <RouteButton data={data} />,
      filter: (value, row) =>
        row.name
          .toLocaleLowerCase()
          .includes((value as string).toLocaleLowerCase()),
      filterOptionValue: filter
    },
    {
      title: t('table.status'),
      key: 'status',
      align: 'center',
      render: data => <StatusTag data={data} />
    }
  ] as DataTableColumn<SyncEntry>[])
);
</script>

<template>
  <NH2 prefix="bar">
    <span>{{ t('header.mirrors') }}</span>
    <NInput :placeholder="t('table.searchText')" @input="onInput">
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
      :columns="columns.concat(extraColumns)"
      :data="entries"
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
