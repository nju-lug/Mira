<script setup lang="tsx">
import {
  onMounted,
  computed,
  ref,
  reactive
} from 'vue';
import { useRouter } from 'vue-router';
import {
  NDataTable,
  DataTableColumn,
  NButton,
  NTag,
  useMessage,
  NIcon,
  NInput,
  NSpace
} from 'naive-ui';
import {
  SearchOutline,
  HelpCircleOutline
} from '@vicons/ionicons5';

import { fetchEntries, SyncEntry } from '../models/mirrors';
import { useStore } from '../store';

const router = useRouter();
const message = useMessage();
const store = useStore();
const entries = ref([] as SyncEntry[]);

function RouteButton({ data }: { data: SyncEntry }) {
  const doc = store.state.docItems.find(value => value.name == data.name);
  return <>
    <NButton text onClick={() => {
      if (data.route) {
        router.push(data.route);
      } else {
        window.location.href = data.path || '/' + data.name;
      }
    }}>
      {data.name}
    </NButton>
    <NButton
      text
      v-show={doc}
      onClick={() => doc?.redirect ?
        window.location.href = doc.redirect :
        router.push('/help/' + doc?.name || '')
      }
    >
      <NIcon><HelpCircleOutline /></NIcon>
    </NButton>
  </>;
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
const extraColumns = computed(() => store.state.isMobile ? [] : [
  {
    title: 'Size',
    key: 'size',
    align: 'center'
  },
  {
    title: 'Last Update',
    key: 'lastUpdate',
    align: 'center'
  },
  {
    title: 'Next Update',
    key: 'nextUpdate',
    align: 'center'
  }
] as DataTableColumn<SyncEntry>[]);

const columns = reactive([
  {
    title: 'Mirror Name',
    key: 'name',
    align: 'left',
    render: data => <RouteButton data={data} />,
    filter: 'default',
    filterOptionValue: filter,
    renderFilterIcon: () => <NIcon><SearchOutline /></NIcon>,
    renderFilterMenu: () => <NSpace style="padding: 12px" vertical>
      <NInput placeholder="Search mirrors..." v-model:value={filter.value} />
    </NSpace>
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center',
    render: data => <StatusTag data={data} />
  },
] as DataTableColumn<SyncEntry>[]);

onMounted(() => fetchEntries().then(
  res => entries.value = res.sort(
    (a, b) => a.name.localeCompare(b.name)
  ),
  err => message.error(err.message)
));
</script>

<template>
  <n-data-table
    size="small"
    :columns="columns.concat(extraColumns)"
    :data="entries"
  />
</template>