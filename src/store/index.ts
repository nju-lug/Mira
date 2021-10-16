import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store
} from 'vuex';

export interface State {
  isMobile: boolean,
  darkmode: boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < 750,
    darkmode: sessionStorage.getItem('darkmode') == 'true'
  },
  mutations: {
    setWidth(state, width: number) {
      state.isMobile = width < 750;
    },
    setDarkmode(state, darkmode: boolean) {
      state.darkmode = darkmode;
      sessionStorage.setItem('darkmode', darkmode.toString());
    }
  }
});

export const useStore = () => {
  return baseUseStore(key);
};
