import './baseStyles'; // global CSS styles

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './view/GameView.vue';

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
