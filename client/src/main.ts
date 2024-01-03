import './baseStyles'; // global CSS styles

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { initMSW } from './mocks/mswWorker';
import App from './view/GameView.vue';

await initMSW(import.meta.env.VITE_MSW)
const app = createApp(App)

app.use(createPinia())
app.mount('#app')

