import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createGtag } from 'vue-gtag'
import App from '@/App.vue'
import { i18n } from '@/i18n'
import { router } from '@/routes'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import '@/assets/Markdown.css'

const app = createApp(App)
const pinia = createPinia()
const gtag = createGtag({
  tagId: import.meta.env.VITE_GA,
})

app.use(pinia)
app.use(router)
app.use(gtag)
app.use(i18n)
app.mount('#app')
