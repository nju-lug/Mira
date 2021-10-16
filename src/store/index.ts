import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  Store
} from 'vuex';

export interface State {
  isMobile: boolean
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    isMobile: document.body.clientWidth < 750
  },
  mutations: {
    setWidth(state, width: number) {
      state.isMobile = width < 750;
    }
  }
});

export const useStore = () => {
  return baseUseStore(key);
};
