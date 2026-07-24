import { createRouter, createWebHistory } from 'vue-router';

import FoundationPlaceholderPage from '../pages/FoundationPlaceholderPage.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FoundationPlaceholder',
      component: FoundationPlaceholderPage,
    },
  ],
});
