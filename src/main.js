import { createApp } from 'vue'
import '@/style.css'
import '@/index.css'
import App from '@/App.vue'
import logger from '@/logger'
import router from '@/router'
import { createPinia } from 'pinia'
import { worker } from './mocks/browser'

logger.info('start app')

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
