import { useLoadingBar as useBaseLoadingBar } from 'naive-ui'
import { onMounted } from 'vue'

import { loadingRef, setLoadingRef } from '@/routes'

export function useLoadingBar() {
  const loadingBar = useBaseLoadingBar()
  onMounted(() => setLoadingRef(loadingBar))
  return [loadingRef, setLoadingRef] as const
}
