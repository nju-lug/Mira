import { createApp } from 'vue';

import App from './App.vue';
import { router } from './routes';
import { key, store } from './store';
import VueGtag from 'vue-gtag';

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import './assets/Markdown.css';

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(VueGtag, {
  config: {
    id: import.meta.env.VITE_GA,
  },
}, router);

app.mount('#app');
