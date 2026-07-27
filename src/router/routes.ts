import type { RouteRecordRaw } from 'vue-router';

export const routeNames = {
  landing: 'landing',
  whyMiGoto: 'why-mi-goto',
  imprint: 'imprint',
  dataProtection: 'data-protection',
  contact: 'contact',
  thankYou: 'thank-you',
  notFound: 'not-found',
} as const;

export type AppRouteName = (typeof routeNames)[keyof typeof routeNames];

export const routes = [
  {
    path: '/',
    component: () => import('../layouts/MarketingLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.landing,
        component: () => import('../pages/LandingPage.vue'),
        meta: { title: 'mi-goTo' },
      },
      {
        path: 'why-mi-goto',
        name: routeNames.whyMiGoto,
        component: () => import('../pages/WhyMiGotoPage.vue'),
        meta: { title: 'Why mi-goTo | mi-goTo' },
      },
      {
        path: 'contact',
        name: routeNames.contact,
        component: () => import('../pages/ContactPage.vue'),
        meta: { title: 'Contact | mi-goTo' },
      },
      {
        path: 'thank-you',
        name: routeNames.thankYou,
        component: () => import('../pages/ThankYouPage.vue'),
        meta: { title: 'Thank You | mi-goTo' },
      },
    ],
  },
  {
    path: '/imprint',
    component: () => import('../layouts/LegalLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.imprint,
        component: () => import('../pages/ImprintPage.vue'),
        meta: { title: 'Imprint | mi-goTo' },
      },
    ],
  },
  {
    path: '/data-protection',
    component: () => import('../layouts/LegalLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.dataProtection,
        component: () => import('../pages/DataProtectionPage.vue'),
        meta: { title: 'Data Protection | mi-goTo' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../layouts/MarketingLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.notFound,
        component: () => import('../pages/NotFoundPage.vue'),
        meta: { title: 'Page Not Found | mi-goTo' },
      },
    ],
  },
] satisfies RouteRecordRaw[];
