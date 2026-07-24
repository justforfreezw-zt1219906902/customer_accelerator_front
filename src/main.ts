import { createApp } from 'vue';

import App from './App.vue';
import { publicEnvironment } from './app/configuration/environment';
import './design-system/theme/index.css';
import { router } from './router';

void publicEnvironment;

createApp(App).use(router).mount('#app');
