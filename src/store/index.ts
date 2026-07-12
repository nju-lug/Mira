import type { DocItem } from '@/models/documents'
import type { DownloadContent } from '@/models/downloads'
import type { NewsEntry } from '@/models/news'
import { defineStore } from 'pinia'
import { MobileWidth } from '@/configs'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface State {
  isMobile: boolean
  themeMode: ThemeMode
  _tx: number
  _ty: number
  locale: 'zh' | 'en'
  newsEntries: NewsEntry[]
  docItems: DocItem[]
  downloadContents: DownloadContent[]
}

function getInitialThemeMode(): ThemeMode {
  const stored = sessionStorage.getItem('themeMode')
  if (stored === 'light' || stored === 'dark' || stored === 'system')
    return stored
  const legacy = sessionStorage.getItem('darkMode')
  if (legacy !== null)
    return legacy === 'true' ? 'dark' : 'light'
  return 'system'
}

export const useStore = defineStore('main', {
  state: (): State => ({
    isMobile: document.body.clientWidth < MobileWidth,
    themeMode: getInitialThemeMode(),
    _tx: 0,
    _ty: 0,
    locale: 'zh',
    newsEntries: [],
    docItems: [],
    downloadContents: [],
  }),
  actions: {
    setWidth(width: number) {
      this.isMobile = width < MobileWidth
    },
    setThemeMode(mode: ThemeMode, x = 0, y = 0) {
      this._tx = x
      this._ty = y
      this.themeMode = mode
      sessionStorage.setItem('themeMode', mode)
    },
    setNews(entries: NewsEntry[]) {
      this.newsEntries = entries
    },
    setDocs(items: DocItem[]) {
      this.docItems = items
    },
    setDownloads(items: DownloadContent[]) {
      this.downloadContents = items
    },
    setLocale(locale: 'zh' | 'en') {
      this.locale = locale
    },
  },
})
