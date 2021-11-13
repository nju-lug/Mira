import { ServerPrefix } from '../configs';
import { get } from '../utils/network';
import { timeFromNow } from '../utils/time';

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
  const [data, addition] = await Promise.all([
    get<RawEntry[]>(ServerPrefix + 'tunasync.json'),
    get<AdditionEntry[]>(ServerPrefix + 'addition.json')
  ]);

  const entries = data.map(value => ({
    name: value.name,
    status: value.status,
    path: '/' + value.name,
    lastUpdate: value.last_update_ts > 0 ?
      timeFromNow(value.last_update_ts) : '-',
    nextUpdate: value.next_schedule_ts > 0 ?
      timeFromNow(value.next_schedule_ts) : '-',
    size: value.size == 'unknown' ? '-' : value.size,
  }) as SyncEntry);

  const addEntries = [];
  for (const entry of addition) {
    const o = entries.findIndex(value => value.name == entry.name);
    if (o != -1) {
      entries[o] = { ...entries[o], ...entry };
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
