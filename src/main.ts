import { createApp } from 'vue';

import App from './App.vue';
import { router } from './routes';
import { key, store } from './store';

import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

const app = createApp(App);

app.use(store, key);
app.use(router);

app.mount('#app');
