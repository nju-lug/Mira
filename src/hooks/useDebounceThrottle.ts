import { debounce, throttle } from 'lodash-es';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn<T> = T extends (...args: any) => any ? T : never;

export function useDebounce<T>(fn: Fn<T>, delay = 300) {
  const debounced = debounce(fn, delay);
  return debounced;
}

export function useThrottle<T>(fn: Fn<T>, delay = 300) {
  const throttled = throttle(fn, delay);
  return throttled;
}
