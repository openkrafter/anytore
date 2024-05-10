import { createApp } from 'vue'
import '@/style.css'
import '@/index.css'
import App from '@/App.vue'
import logger from '@/logger'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { worker } from './mocks/browser'
import axios from 'axios'

logger.info('start app')

axios.defaults.baseURL = import.meta.env.VITE_ANYTORE_BACKEND_SERVER
axios.defaults.timeout = 1000

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const app = createApp(App)
app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
