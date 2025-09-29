import type { DocItem } from '@/models/documents'
import type { DownloadContent } from '@/models/downloads'
import type { NewsEntry } from '@/models/news'
import { defineStore } from 'pinia'
import { MobileWidth } from '@/configs'

export interface State {
  isMobile: boolean
  darkMode: boolean
  locale: 'zh' | 'en'
  newsEntries: NewsEntry[]
  docItems: DocItem[]
  downloadContents: DownloadContent[]
}

export const useStore = defineStore('main', {
  state: (): State => ({
    isMobile: document.body.clientWidth < MobileWidth,
    darkMode: sessionStorage.getItem('darkMode') === 'true',
    locale: 'zh',
    newsEntries: [],
    docItems: [],
    downloadContents: [],
  }),
  actions: {
    setWidth(width: number) {
      this.isMobile = width < MobileWidth
    },
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode
      sessionStorage.setItem('darkMode', darkMode.toString())
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
