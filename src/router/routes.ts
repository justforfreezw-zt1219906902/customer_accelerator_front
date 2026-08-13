import type { RouteRecordRaw } from 'vue-router';

export const routeNames = {
  landing: 'landing',
  whyMiGoto: 'why-mi-goto',
  imprint: 'imprint',
  dataProtection: 'data-protection',
  contact: 'contact',
  thankYou: 'thank-you',
  notFound: 'NotFound',
  demoDiscovery: 'DemoDiscovery',
  demoAccountOverview: 'DemoAccountOverview',
  demoAccountDna: 'DemoAccountDna',
  demoSignals: 'DemoSignals',
  demoDna: 'DemoDna',
  demoContentStudio: 'DemoContentStudio',
} as const;

export type AppRouteName = (typeof routeNames)[keyof typeof routeNames];

export const routes = [
  {
    path: '/demo',
    component: () => import('../layouts/DemoLayout.vue'),
    meta: {
      title: 'mi-goTo Intelligence',
      productTitle: 'Account Discovery',
      robots: 'noindex, nofollow',
    },
    children: [
      {
        path: '',
        name: routeNames.demoDiscovery,
        component: () => import('../pages/demo/AccountDiscoveryPage.vue'),
        meta: {
          title: 'Account Discovery | mi-goTo',
          productTitle: 'Account Discovery',
          robots: 'noindex, nofollow',
        },
      },
      {
        path: 'accounts/:accountId',
        name: routeNames.demoAccountOverview,
        component: () => import('../pages/demo/AccountOverviewPage.vue'),
        meta: {
          title: 'Account Overview | mi-goTo',
          productTitle: 'Account Overview',
          robots: 'noindex, nofollow',
        },
      },
      {
        path: 'accounts/:accountId/dna',
        name: routeNames.demoAccountDna,
        component: () => import('../pages/demo/AccountDnaPage.vue'),
        meta: {
          title: 'Account DNA | mi-goTo',
          productTitle: 'Account DNA',
          robots: 'noindex, nofollow',
        },
      },
      {
        path: 'signals',
        name: routeNames.demoSignals,
        component: () => import('../pages/demo/SignalPulsePage.vue'),
        meta: {
          title: 'Signal Pulse | mi-goTo',
          productTitle: 'Signal Pulse',
          robots: 'noindex, nofollow',
        },
      },
      {
        path: 'dna',
        name: routeNames.demoDna,
        component: () => import('../pages/demo/DnaPortfolioPage.vue'),
        meta: {
          title: 'DNA Portfolio | mi-goTo',
          productTitle: 'Communication DNA',
          robots: 'noindex, nofollow',
        },
      },
      {
        path: 'content-studio',
        name: routeNames.demoContentStudio,
        component: () => import('../pages/demo/ContentStudioPage.vue'),
        meta: {
          title: 'Content Studio | mi-goTo',
          productTitle: 'Content Studio',
          robots: 'noindex, nofollow',
        },
      },
    ],
  },
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
    ],
  },
  {
    path: '/thank-you',
    component: () => import('../layouts/ContactLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.thankYou,
        component: () => import('../pages/ThankYouPage.vue'),
        meta: { title: 'Thank You | mi-goTo' },
      },
    ],
  },
  {
    path: '/why-mi-goto',
    component: () => import('../layouts/WhyLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.whyMiGoto,
        component: () => import('../pages/WhyMiGotoPage.vue'),
        meta: { title: 'Why mi-goTo | mi-goTo' },
      },
    ],
  },
  {
    path: '/contact',
    component: () => import('../layouts/ContactLayout.vue'),
    children: [
      {
        path: '',
        name: routeNames.contact,
        component: () => import('../pages/ContactPage.vue'),
        meta: { title: 'Contact | mi-goTo' },
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
        meta: { title: 'Page not found | mi-goTo' },
      },
    ],
  },
] satisfies RouteRecordRaw[];
