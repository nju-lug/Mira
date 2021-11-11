import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store
} from 'vuex';
import { MobileWidth } from '../configs';
import { DocItem } from '../models/documents';
import { DownloadContent } from '../models/downloads';

export interface State {
  isMobile: boolean,
  darkMode: boolean,
  docItems: DocItem[],
  downloadContents: DownloadContent[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < MobileWidth,
    darkMode: sessionStorage.getItem('darkMode') == 'true',
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
    setDocs(state, items: DocItem[]) {
      state.docItems = items;
    },
    setDownloads(state, items: DownloadContent[]) {
      state.downloadContents = items;
    }
  }
});

export const useStore = () => {
  return baseUseStore(key);
};
