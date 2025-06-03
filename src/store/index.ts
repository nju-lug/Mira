import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import type { DocItem } from '@/models/documents'
import type { DownloadContent } from '@/models/downloads'
import type { NewsEntry } from '@/models/news'
import { useStore as baseUseStore, createStore } from 'vuex'
import { MobileWidth } from '@/configs'

export interface State {
  isMobile: boolean
  darkMode: boolean
  locale: 'zh' | 'en'
  newsEntries: NewsEntry[]
  docItems: DocItem[]
  downloadContents: DownloadContent[]
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < MobileWidth,
    darkMode: sessionStorage.getItem('darkMode') === 'true',
    locale: 'zh',
    newsEntries: [],
    docItems: [],
    downloadContents: [],
  },
  mutations: {
    setWidth(state, width: number) {
      state.isMobile = width < MobileWidth
    },
    setDarkMode(state, darkMode: boolean) {
      state.darkMode = darkMode
      sessionStorage.setItem('darkMode', darkMode.toString())
    },
    setNews(state, entries: NewsEntry[]) {
      state.newsEntries = entries
    },
    setDocs(state, items: DocItem[]) {
      state.docItems = items
    },
    setDownloads(state, items: DownloadContent[]) {
      state.downloadContents = items
    },
    setLocale(state, locale: 'zh' | 'en') {
      state.locale = locale
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
