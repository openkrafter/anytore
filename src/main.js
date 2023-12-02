import { createApp } from 'vue'
import '@/style.css'
import '@/index.css'
import App from '@/App.vue'
import logger from '@/logger'
import router from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { worker } from './mocks/browser'

logger.info('start app')

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const app = createApp(App)
app.use(router)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
