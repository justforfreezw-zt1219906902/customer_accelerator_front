import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import App from '../../src/App.vue';
import { demoAccountProvider } from '../../src/demo/demoAccountProvider';
import { createAppRouter } from '../../src/router';

beforeEach(() => vi.stubGlobal('scrollTo', vi.fn()));
afterEach(() => {
  document.body.innerHTML = '';
});

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

describe('TASK-MAINT-004 Account Discovery and Overview', () => {
  it('uses stable opaque fixture IDs and separates Discovery records from the overview reference', () => {
    expect(demoAccountProvider.listAccounts()).toHaveLength(7);
    expect(demoAccountProvider.listDiscoveryAccounts()).toHaveLength(6);
    expect(
      demoAccountProvider
        .listAccounts()
        .every(({ id }) => /^demo-acc-\d{3}$/.test(id)),
    ).toBe(true);
    expect(demoAccountProvider.findAccountById('demo-acc-001')?.name).toBe(
      'Oracle',
    );
  });

  it('searches exact account attributes and combines search with filters', async () => {
    const { wrapper } = await mountRoute('/demo');
    expect(wrapper.findAll('.account-row')).toHaveLength(6);
    await wrapper.get('input[type="search"]').setValue('oracle');
    expect(wrapper.findAll('.account-row')).toHaveLength(1);
    await wrapper.get('select').setValue('Focus Accounts');
    expect(wrapper.findAll('.account-row')).toHaveLength(1);
    expect(wrapper.text()).toContain('Oracle');
    await wrapper.findAll('select')[1].setValue('Energy Tech');
    expect(wrapper.findAll('.account-row')).toHaveLength(0);
  });

  it('renders disabled Add Account and routes account selection', async () => {
    const { router, wrapper } = await mountRoute('/demo');
    const addAccount = wrapper.get('.discovery-page__header button');
    expect(addAccount.text()).toContain('Add Account');
    expect(addAccount.attributes('disabled')).toBeDefined();
    const accountLink = wrapper.get(
      'a[aria-label="Open Oracle account overview"]',
    );
    expect(accountLink.attributes('href')).toBe('/demo/accounts/demo-acc-001');
    await router.push(accountLink.attributes('href')!);
    expect(router.currentRoute.value.path).toBe('/demo/accounts/demo-acc-001');
  });

  it('renders the formal Oracle overview and approved later-route navigation', async () => {
    const { router, wrapper } = await mountRoute('/demo/accounts/demo-acc-001');
    expect(wrapper.get('[data-page-heading]').text()).toContain('Oracle');
    expect(wrapper.text()).toContain('WHY THIS ACCOUNT');
    expect(wrapper.findAll('.overview-page__signal')).toHaveLength(4);
    expect(wrapper.findAll('.overview-page__signal a')).toHaveLength(0);
    await router.push('/demo/accounts/demo-acc-001/dna');
    expect(router.currentRoute.value.path).toBe(
      '/demo/accounts/demo-acc-001/dna',
    );
  });

  it('keeps invalid accounts in Product chrome and exposes the implemented DNA route', async () => {
    const missing = await mountRoute('/demo/accounts/missing');
    expect(missing.wrapper.get('h1').text()).toBe('Account not found');
    missing.wrapper.unmount();
    const dna = await mountRoute('/demo/accounts/demo-acc-001/dna');
    expect(dna.wrapper.find('.dna-page').exists()).toBe(true);
    expect(dna.wrapper.find('.overview-page').exists()).toBe(false);
  });
});
