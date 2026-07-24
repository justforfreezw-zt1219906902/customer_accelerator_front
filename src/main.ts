import { createApp } from 'vue';

import App from './App.vue';
import { publicEnvironment } from './app/configuration/environment';
import { router } from './router';
import './assets/base.css';

void publicEnvironment;

createApp(App).use(router).mount('#app');
