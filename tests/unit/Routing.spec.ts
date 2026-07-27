import { mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RouteLocationNormalized } from 'vue-router';

import { defaultFooterContent } from '../../src/content/footer/defaultFooterContent';
import { defaultHeaderContent } from '../../src/content/header/defaultHeaderContent';
import MarketingLayout from '../../src/layouts/MarketingLayout.vue';
import { applyRouteAccessibility, createAppRouter } from '../../src/router';
import { routeNames } from '../../src/router/routes';
import { appScrollBehavior } from '../../src/router/scrollBehavior';

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn());
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('Phase 5 routing infrastructure', () => {
  it('registers every approved route name and the unknown-route fallback', () => {
    const router = createAppRouter(createMemoryHistory());
    const expectedRoutes = [
      ['/', routeNames.landing],
      ['/why-mi-goto', routeNames.whyMiGoto],
      ['/imprint', routeNames.imprint],
      ['/data-protection', routeNames.dataProtection],
      ['/contact', routeNames.contact],
      ['/thank-you', routeNames.thankYou],
      ['/missing-route', routeNames.notFound],
    ] as const;

    for (const [path, name] of expectedRoutes) {
      expect(router.resolve(path).name).toBe(name);
    }
  });

  it('preserves approved Header and Footer destinations', () => {
    expect(
      Object.fromEntries(
        defaultHeaderContent.navigation.map((item) => [item.label, item.href]),
      ),
    ).toEqual({
      'THE PROBLEM': '/#problem',
      'THE SOLUTION': '/#solution',
      PACKAGES: '/#packages',
      CONTACT: '/contact',
    });
    expect(defaultHeaderContent.strategyDiscussionHref).toBe('/contact');

    const footerDestinations = Object.fromEntries(
      defaultFooterContent.groups
        .flatMap((group) => group.links)
        .map((item) => [item.label, item.href]),
    );
    expect(footerDestinations).toMatchObject({
      'The problem': '/#problem',
      Solutions: '/#solution',
      Packages: '/#packages',
      Contact: '/contact',
      Imprint: '/imprint',
      'Data protection': '/data-protection',
      'hello@mi-goto.com': 'mailto:hello@mi-goto.com',
    });
    expect(footerDestinations.LinkedIn).toBeUndefined();
  });

  it('uses one shared Navbar and Footer and performs SPA navigation', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/why-mi-goto');
    await router.isReady();

    const wrapper = mount(MarketingLayout, {
      global: { plugins: [router] },
      slots: { default: '<h1 data-page-heading>Test page</h1>' },
    });

    expect(wrapper.findAll('.app-navbar')).toHaveLength(1);
    expect(wrapper.findAll('.app-footer')).toHaveLength(1);

    await wrapper.get('a[href="/contact"]').trigger('click');
    await vi.waitFor(() => {
      expect(router.currentRoute.value.name).toBe(routeNames.contact);
    });

    await wrapper.get('.app-footer a[href="/imprint"]').trigger('click');
    await vi.waitFor(() => {
      expect(router.currentRoute.value.name).toBe(routeNames.imprint);
    });
  });

  it('resolves same-page and cross-route anchors to Landing targets', () => {
    const router = createAppRouter(createMemoryHistory());

    expect(router.resolve('/#problem')).toMatchObject({
      name: routeNames.landing,
      hash: '#problem',
    });
    expect(router.resolve('/#solution')).toMatchObject({
      name: routeNames.landing,
      hash: '#solution',
    });
    expect(router.resolve('/#packages')).toMatchObject({
      name: routeNames.landing,
      hash: '#packages',
    });
  });

  it('updates the page title and focuses the approved target', async () => {
    document.body.innerHTML =
      '<main><section id="problem"><h2>Problem heading</h2></section></main>';
    const router = createAppRouter(createMemoryHistory());
    const route = router.resolve('/#problem');

    await applyRouteAccessibility(route);

    expect(document.title).toBe('mi-goTo');
    expect(document.activeElement?.textContent).toBe('Problem heading');
  });

  it('restores saved positions and respects reduced motion for anchors', async () => {
    document.body.innerHTML = '<section id="problem"></section>';
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const router = createAppRouter(createMemoryHistory());
    const from = router.resolve('/contact');
    const to = router.resolve('/#problem');
    const saved = { left: 10, top: 20 };

    await expect(
      appScrollBehavior(
        to as RouteLocationNormalized,
        from as RouteLocationNormalized,
        saved,
      ),
    ).resolves.toEqual(saved);
    await expect(
      appScrollBehavior(
        to as RouteLocationNormalized,
        from as RouteLocationNormalized,
        null,
      ),
    ).resolves.toMatchObject({
      el: '#problem',
      top: 0,
      behavior: 'auto',
    });
  });
});
