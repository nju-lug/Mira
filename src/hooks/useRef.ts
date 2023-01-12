import { ref, UnwrapRef, ComponentPublicInstance } from 'vue';

export function useMutableRef<T>(value: T) {
  const r = ref(value);
  const change = (v: UnwrapRef<T>) => {
    r.value = v;
  };
  return [r, change] as const;
}

export function useNullableRef<T>(value?: T) {
  const [r, set] = useMutableRef(value ?? null);
  const reset = () => set(null);
  return [r, set, reset] as const;
}

export function useElementRef<
  T extends ComponentPublicInstance | HTMLElement
>() {
  const r = ref<T | null>(null);
  return r;
}
