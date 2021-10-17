<script setup lang="tsx">
import { onMounted, ref, reactive } from '@vue/runtime-core';
import { fetchEntries, SyncEntry } from '../models/mirrors';
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
import { useRouter } from 'vue-router';
import { SearchOutline } from '@vicons/ionicons5';

const router = useRouter();
const message = useMessage();
let entries = ref([] as SyncEntry[]);

function RouteButton(data: SyncEntry) {
  return <NButton text onClick={
    () => {
      if (data.route) {
        router.push(data.route);
      } else {
        window.location.href = data.path || '/' + data.name;
      }
    }
  }>{data.name}</NButton>;
}

function StatusTag(data: SyncEntry) {
  let status: 'info' | 'success' | 'error' = 'info';
  switch (data.status) {
  case 'cache':
  case 'proxy':
  case 'success': status = 'success'; break;
  case 'failed': status = 'error'; break;
  case 'syncing': status = 'info'; break;
  }
  return <NTag type={status}>{data.status}</NTag>;
}

const filter = ref<string | null>(null);

const columns: DataTableColumn<SyncEntry>[] = reactive([
  {
    title: 'Mirror Name',
    key: 'name',
    align: 'left',
    render: (data) => RouteButton(data),
    filter: 'default',
    filterOptionValue: filter,
    renderFilterIcon: () => <NIcon><SearchOutline /></NIcon>,
    renderFilterMenu: () => <NSpace style="padding: 12px" vertical>
      <NInput placeholder="Search mirrors..." v-model:value={filter.value}/>
    </NSpace>
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center',
    render: (data) => StatusTag(data)
  },
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
]);

const pagination: PaginationProps = {
  pageSize: 20,
};

onMounted(() => fetchEntries().then(
  res => entries.value = res.sort((a, b) => a.name.localeCompare(b.name)),
  err => message.error(err.message),
));

</script>

<template>
  <n-data-table size="small" :columns="columns" :data="entries" :pagination="pagination" />
</template>

<style scoped lang="less">
</style>