import { ref, UnwrapRef } from 'vue';

export function useMutableRef<T>(value: T) {
  const r = ref(value);
  const change = (v: UnwrapRef<T>) => {
    r.value = v;
  };
  return [r, change] as const;
}
