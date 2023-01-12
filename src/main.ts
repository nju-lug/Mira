import { createApp } from 'vue';
import VueGtag from 'vue-gtag';

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import '@/assets/Markdown.css';

import { router } from '@/routes';
import { key, store } from '@/store';
import { i18n } from '@/i18n';

import App from '@/App.vue';

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(
  VueGtag,
  {
    config: {
      id: import.meta.env.VITE_GA
    }
  },
  router
);
app.use(i18n);

app.mount('#app');
