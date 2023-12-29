import './assets/css/cards.css'
import './assets/css/main.scss'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
