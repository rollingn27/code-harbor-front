import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import LoadingBar from '@/components/common/LoadingBar.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import CodeHarborHeader from '@/components/common/CodeHarborHeader.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('loading-bar', LoadingBar)
app.component('loading-spinner', LoadingSpinner)
app.component('code-harbor-header', CodeHarborHeader)

app.mount('#app')
