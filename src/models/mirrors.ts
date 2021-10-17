import axios from 'axios';
import moment from 'moment';

const serverPrefix = 'configs/';

export interface SyncEntry {
  name: string,
  status?: string,
  path?: string,
  route?: string,
  lastUpdate?: string,
  nextUpdate?: string,
  size?: string,
}

interface RawEntry {
  name: string,
  is_master: boolean,
  status: 'proxy' | 'cache' | 'success' | 'failed' | 'syncing',
  last_update: string,
  last_update_ts: number,
  last_started: string,
  last_started_ts: number,
  last_ended: string,
  last_ended_ts: number,
  next_schedule: string,
  next_schedule_ts: number,
  upstream: string,
  size: string,
}

interface AdditionEntry extends SyncEntry {
  inherit: string | null,
}

export async function fetchEntries(): Promise<SyncEntry[]> {
  const res1 = await axios.get(serverPrefix + 'tunasync.json');
  const res2 = await axios.get(serverPrefix + 'addition.json');
  const data = res1.data as RawEntry[];

  const entries = data.map(value => ({
    name: value.name,
    status: value.status,
    path: '/' + value.name,
    lastUpdate: value.last_update_ts > 0 ? moment.unix(value.last_update_ts).fromNow() : '-',
    nextUpdate: value.next_schedule_ts > 0 ? moment.unix(value.next_schedule_ts).fromNow() : '-',
    size: value.size == 'unknown' ? '-' : value.size,
  }) as SyncEntry);

  const addition = res2.data as AdditionEntry[];
  const addEntries = [];
  for (const entry of addition) {
    const o = entries.findIndex(value => value.name == entry.name);
    if (o != -1) {
      entries[o] = {...entries[o], ...entry};
      continue;
    }
    const parent = entries.find(value => entry.inherit == value.name);
    addEntries.push(({
      name: entry.name,
      status: entry.status || parent?.status || 'unknown',
      path: entry.path,
      route: entry.route,
      lastUpdate: entry.lastUpdate || parent?.lastUpdate || '-',
      nextUpdate: entry.nextUpdate || parent?.nextUpdate || '-',
      size: entry.size || '-',
    }) as SyncEntry);
  }
  return [...entries, ...addEntries];
}
