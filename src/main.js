import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import apiService from './api/apiService'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$axios = apiService.axiosInstance
app.config.globalProperties.$apiService = apiService
app.mount('#app')
