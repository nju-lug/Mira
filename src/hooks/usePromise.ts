import { useMessage } from 'naive-ui';
import { onMounted, watchEffect } from 'vue';

export function usePromiseEffect<T>(
  fn: () => Promise<T>,
  onFulfilled?: (res: T) => void
) {
  const message = useMessage();
  onMounted(() =>
    fn().then(
      res => onFulfilled?.(res),
      err => message.error(err.message)
    )
  );
}

export function usePromiseWatch<T>(
  fn: () => Promise<T>,
  onFulfilled?: (res: T) => void
) {
  const message = useMessage();
  watchEffect(() =>
    fn().then(
      res => onFulfilled?.(res),
      err => message.error(err.message)
    )
  );
}
