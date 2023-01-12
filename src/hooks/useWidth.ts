import { useStore } from '@/store';
import { computed, nextTick, onBeforeUnmount, Ref } from 'vue';

import { useThrottle } from './useDebounceThrottle';
import { useNullableRef } from './useRef';

export function useWidthObserver<T extends HTMLElement>(el: Ref<T | null>) {
  const [observer, setObserver] = useNullableRef<ResizeObserver>();
  const store = useStore();
  const setWidth = useThrottle((width: number) => {
    store.commit('setWidth', width);
  }, 100);

  nextTick(() => {
    if (el.value) {
      setObserver(
        new ResizeObserver(width => {
          const newWidth = width[0].contentBoxSize[0].inlineSize;
          setWidth(newWidth);
        })
      );
      observer.value?.observe(el.value, { box: 'content-box' });
    }
  });

  onBeforeUnmount(() => observer.value?.disconnect());

  return { observer } as const;
}

export function useWidth() {
  const store = useStore();
  const isMobile = computed(() => store.state.isMobile);
  return { isMobile } as const;
}
