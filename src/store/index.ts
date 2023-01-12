import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { MobileWidth } from '@/configs';
import { DocItem } from '@/models/documents';
import { DownloadContent } from '@/models/downloads';
import { NewsEntry } from '@/models/news';

export interface State {
  isMobile: boolean;
  darkMode: boolean;
  locale: 'zh' | 'en';
  newsEntries: NewsEntry[];
  docItems: DocItem[];
  downloadContents: DownloadContent[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < MobileWidth,
    darkMode: sessionStorage.getItem('darkMode') == 'true',
    locale: 'zh',
    newsEntries: [],
    docItems: [],
    downloadContents: []
  },
  mutations: {
    setWidth(state, width: number) {
      state.isMobile = width < MobileWidth;
    },
    setDarkMode(state, darkMode: boolean) {
      state.darkMode = darkMode;
      sessionStorage.setItem('darkMode', darkMode.toString());
    },
    setNews(state, entries: NewsEntry[]) {
      state.newsEntries = entries;
    },
    setDocs(state, items: DocItem[]) {
      state.docItems = items;
    },
    setDownloads(state, items: DownloadContent[]) {
      state.downloadContents = items;
    },
    setLocale(state, locale: 'zh' | 'en') {
      state.locale = locale;
    }
  }
});

export const useStore = () => {
  return baseUseStore(key);
};
