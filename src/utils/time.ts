import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

export function convertTimestamp(
  ts: number,
  locale: string,
  format = 'YYYY.M.D'
) {
  return dayjs.unix(ts).locale(locale).format(format);
}

export function timeFromNow(ts: number, locale: string) {
  return ts <= 0 ? '-' : dayjs.unix(ts).locale(locale).fromNow();
}
