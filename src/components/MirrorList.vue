<script setup lang="tsx">
import { onMounted, ref } from '@vue/runtime-core';
import { fetchEntries, SyncEntry } from '../models/mirrors';
import {
  NDataTable,
  DataTableColumn,
  NButton,
  NTag,
  PaginationProps,
  useMessage
} from 'naive-ui';
import { useRouter } from 'vue-router';

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

const columns: DataTableColumn<SyncEntry>[] = [
  {
    title: 'Mirror Name',
    key: 'name',
    align: 'left',
    render: (data) => RouteButton(data),
    defaultSortOrder: 'descend',
    sorter: (row1, row2) => row2.name.localeCompare(row1.name)
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
];

const pagination: PaginationProps = {
  pageSize: 20,
};

onMounted(() => fetchEntries().then(
  res => entries.value = res,
  err => message.error(err.message),
));

</script>

<template>
  <n-data-table size="small" :columns="columns" :data="entries" :pagination="pagination" />
</template>

<style scoped lang="less">
</style>