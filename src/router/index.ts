import { nextTick } from 'vue';
import {
  createRouter,
  createWebHistory,
  type Router,
  type RouterHistory,
  type RouteLocationNormalized,
} from 'vue-router';

import { routes } from './routes';
import { appScrollBehavior, waitForRouteRender } from './scrollBehavior';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}

const focusElement = (element: HTMLElement) => {
  if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
  element.focus({ preventScroll: true });
};

type AccessibleRoute = Pick<RouteLocationNormalized, 'hash' | 'meta'>;

export const applyRouteAccessibility = async (to: AccessibleRoute) => {
  document.title = to.meta.title || 'mi-goTo';
  await nextTick();
  await waitForRouteRender();

  if (to.hash) {
    const target = document.querySelector<HTMLElement>(to.hash);
    if (target) {
      focusElement(target.querySelector<HTMLElement>('h1, h2, h3') ?? target);
      return;
    }
  }

  const pageHeading =
    document.querySelector<HTMLElement>('[data-page-heading]') ??
    document.querySelector<HTMLElement>('main');
  if (pageHeading) focusElement(pageHeading);
};

export const createAppRouter = (
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
): Router => {
  const appRouter = createRouter({
    history,
    routes,
    scrollBehavior: appScrollBehavior,
  });

  appRouter.afterEach((to) => {
    void applyRouteAccessibility(to);
  });

  return appRouter;
};

export const router = createAppRouter();
