import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import LoadingBar from '@/common/LoadingBar.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('loading-bar', LoadingBar)

app.mount('#app')
