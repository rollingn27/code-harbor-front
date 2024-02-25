import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import LoadingBar from '@/components/common/LoadingBar.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  iconfont: 'mdi'
})
app.use(createPinia())
app.use(router)
app.component('loading-bar', LoadingBar)
app.component('loading-spinner', LoadingSpinner)
app.use(vuetify)
app.mount('#app')
