import { nextTick } from 'vue';
import type { RouterScrollBehavior } from 'vue-router';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const waitForRouteRender = async () => {
  await nextTick();
  await new Promise<void>((resolve) => {
    if (typeof window === 'undefined' || !window.requestAnimationFrame) {
      resolve();
      return;
    }
    window.requestAnimationFrame(() => resolve());
  });
};

export const appScrollBehavior: RouterScrollBehavior = async (
  to,
  _from,
  savedPosition,
) => {
  if (savedPosition) return savedPosition;

  if (to.hash) {
    await waitForRouteRender();
    if (document.querySelector(to.hash)) {
      return {
        el: to.hash,
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      };
    }
  }

  return { left: 0, top: 0 };
};
