import dayjs from 'dayjs'; 
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function convertTimestamp(ts: number, format = 'YYYY.M.D') {
  return dayjs.unix(ts).format(format);
}

export function timeFromNow(ts: number) {
  return dayjs.unix(ts).fromNow();
}
