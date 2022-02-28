<script setup lang="tsx">
import { onMounted, computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  NH2,
  NDataTable,
  DataTableColumn,
  NButton,
  NTag,
  useMessage,
  NIcon,
  NInput,
  NSpace
} from 'naive-ui';
import { SearchOutline, HelpCircleOutline } from '@vicons/ionicons5';

import { fetchEntries, SyncEntry } from '../models/mirrors';
import { useStore } from '../store';
import { timeFromNow } from '../utils/time';

const { t, locale } = useI18n();
const router = useRouter();
const message = useMessage();
const store = useStore();
const entries = ref([] as SyncEntry[]);

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

const filter = ref('');
const loading = ref(true);
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

const name = computed(() => t('table.name'));
const status = computed(() => t('table.status'));
const columns = reactive([
  {
    title: name as unknown,
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
    title: status as unknown,
    key: 'status',
    align: 'center',
    render: data => <StatusTag data={data} />
  }
] as DataTableColumn<SyncEntry>[]);

onMounted(() =>
  fetchEntries().then(
    res => {
      entries.value = res.sort((a, b) => a.name.localeCompare(b.name));
      loading.value = false;
    },
    err => message.error(err.message)
  )
);
</script>

<template>
  <n-h2 prefix="bar">
    <span>{{ t('header.mirrors') }}</span>
    <n-input :placeholder="t('table.searchText')" v-model:value="filter">
      <template #prefix>
        <n-icon>
          <SearchOutline />
        </n-icon>
      </template>
    </n-input>
  </n-h2>
  <n-space vertical>
    <n-data-table
      size="small"
      :loading="loading"
      :columns="columns.concat(extraColumns)"
      :data="entries"
      max-height="calc(100vh - 12.125rem)"
      virtual-scroll
    />
  </n-space>
</template>

<style scoped lang="less">
.n-h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .n-input {
    width: 30%;
  }
}
</style>
