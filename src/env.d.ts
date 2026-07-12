/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  /**
   * Google Analytics User-Id
   */
  readonly VITE_GA: string
}

// View Transition API
interface ViewTransition {
  readonly ready: Promise<void>
  readonly transitionDirection: 'forward' | 'back'
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}
