import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App.vue';
import { demoAccountProvider } from '../../src/demo/demoAccountProvider';
import { applyRouteAccessibility, createAppRouter } from '../../src/router';
import { routeNames } from '../../src/router/routes';

afterEach(() => {
  document.body.innerHTML = '';
  document.head.querySelector('meta[name="robots"]')?.remove();
});

beforeEach(() => vi.stubGlobal('scrollTo', vi.fn()));

const mountRoute = async (path: string) => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(path);
  await router.isReady();
  const wrapper = mount(App, {
    attachTo: document.body,
    global: { plugins: [router] },
  });
  await flushPromises();
  return { router, wrapper };
};

describe('TASK-MAINT-003 Demo foundation', () => {
  it('registers the approved Demo route contract without excluded routes', () => {
    const router = createAppRouter(createMemoryHistory());
    expect(router.resolve('/demo').name).toBe(routeNames.demoDiscovery);
    expect(router.resolve('/demo/accounts/demo-acc-001').name).toBe(
      routeNames.demoAccountOverview,
    );
    expect(router.resolve('/demo/accounts/demo-acc-001/dna').name).toBe(
      routeNames.demoAccountDna,
    );
    expect(router.resolve('/demo/signals').name).toBe(routeNames.demoSignals);
    expect(router.resolve('/demo/dna').name).toBe(routeNames.demoDna);
    expect(router.resolve('/demo/content-studio').name).toBe(
      routeNames.demoContentStudio,
    );
    expect(router.resolve('/demo/campaigns').name).toBe(routeNames.notFound);
    expect(router.resolve('/app/company-1').name).toBe(routeNames.notFound);
  });

  it('uses opaque fixture IDs and supports valid and missing lookup', () => {
    expect(
      demoAccountProvider
        .listAccounts()
        .every((account) => /^demo-acc-\d{3}$/.test(account.id)),
    ).toBe(true);
    expect(
      demoAccountProvider.findAccountById('demo-acc-001')?.name,
    ).toBeTruthy();
    expect(demoAccountProvider.findAccountById('missing')).toBeUndefined();
  });

  it('keeps an invalid account inside the Demo shell', async () => {
    const { wrapper } = await mountRoute('/demo/accounts/missing');
    expect(wrapper.find('.demo-layout').exists()).toBe(true);
    expect(wrapper.get('h1').text()).toBe('Account not found');
    expect(
      wrapper
        .findAll('a[href="/demo"]')
        .some((link) => link.text().includes('Return to Account Discovery')),
    ).toBe(true);
  });

  it('renders shell navigation and keeps future items disabled', async () => {
    const { wrapper } = await mountRoute('/demo');
    expect(wrapper.find('nav[aria-label="Product navigation"]').exists()).toBe(
      true,
    );
    expect(wrapper.get('[aria-current="page"]').text()).toContain(
      'Account Discovery',
    );
    expect(wrapper.findAll('[aria-disabled="true"]')).toHaveLength(4);
    expect(wrapper.find('a[href="/demo/campaigns"]').exists()).toBe(false);
    expect(wrapper.get('.app-brand-logo').attributes('href')).toBe('/demo');
  });

  it('applies Demo robots metadata and restores Marketing indexing', async () => {
    const { router } = await mountRoute('/demo');
    await applyRouteAccessibility(router.currentRoute.value);
    expect(
      document.head
        .querySelector('meta[name="robots"]')
        ?.getAttribute('content'),
    ).toBe('noindex, nofollow');
    await router.push('/');
    await flushPromises();
    await applyRouteAccessibility(router.currentRoute.value);
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('opens and closes the mobile drawer with controls, backdrop and Escape', async () => {
    const { wrapper } = await mountRoute('/demo');
    await wrapper
      .get('button[aria-label="Open product navigation"]')
      .trigger('click');
    expect(wrapper.get('.demo-layout__sidebar').classes()).toContain('is-open');
    await wrapper.get('.demo-layout__backdrop').trigger('click');
    expect(wrapper.get('.demo-layout__sidebar').classes()).not.toContain(
      'is-open',
    );
    await wrapper
      .get('button[aria-label="Open product navigation"]')
      .trigger('click');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await flushPromises();
    expect(wrapper.get('.demo-layout__sidebar').classes()).not.toContain(
      'is-open',
    );
  });
});
