import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store
} from 'vuex';

export interface State {
  isMobile: boolean,
  darkMode: boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < 750,
    darkMode: sessionStorage.getItem('darkMode') == 'true'
  },
  mutations: {
    setWidth(state, width: number) {
      state.isMobile = width < 750;
    },
    setDarkMode(state, darkMode: boolean) {
      state.darkMode = darkMode;
      sessionStorage.setItem('darkMode', darkMode.toString());
    }
  }
});

export const useStore = () => {
  return baseUseStore(key);
};
