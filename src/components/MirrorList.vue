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
  PaginationProps,
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

function RouteButton(data: SyncEntry) {
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
      v-show={doc != undefined}
      onClick={() => router.push('/help/' + doc?.route || '')}
    >
      <NIcon><HelpCircleOutline /></NIcon>
    </NButton>
  </>;
}

function StatusTag(data: SyncEntry) {
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
    render: data => RouteButton(data),
    filter: 'default',
    filterOptionValue: filter as any,
    renderFilterIcon: () => <NIcon><SearchOutline /></NIcon>,
    renderFilterMenu: () => <NSpace style="padding: 12px" vertical>
      <NInput placeholder="Search mirrors..." v-model:value={filter.value} />
    </NSpace>
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center',
    render: data => StatusTag(data)
  },
] as DataTableColumn<SyncEntry>[]);

const pagination: PaginationProps = {
  pageSlot: 7,
  pageSize: 20,
};

onMounted(() => {
  fetchEntries().then(
    res => entries.value = res.sort((a, b) => a.name.localeCompare(b.name)),
    err => message.error(err.message)
  );
});
</script>

<template>
  <n-data-table
    size="small"
    :columns="columns.concat(extraColumns)"
    :data="entries"
    :pagination="pagination"
  />
</template>