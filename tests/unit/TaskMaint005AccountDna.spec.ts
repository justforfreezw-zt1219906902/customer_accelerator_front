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

describe('TASK-MAINT-005 Page 15 Account DNA', () => {
  it('provides the approved Oracle fixture with fourteen signal sources', () => {
    const dna = demoAccountProvider.findCommunicationDna('demo-acc-001');
    expect(dna?.accountId).toBe('demo-acc-001');
    expect(dna?.buyingSignalSources).toHaveLength(14);
    expect(
      dna?.buyingSignalSources.every(
        ({ url }) => Boolean(url) && url!.startsWith('https://'),
      ),
    ).toBe(true);
  });

  it('renders source-backed evidence and safe source links', async () => {
    const { wrapper } = await mountRoute('/demo/accounts/demo-acc-001/dna');
    expect(wrapper.get('[data-page-heading]').text()).toContain('Oracle');
    expect(wrapper.text()).toContain('SOURCE_BACKED');
    expect(wrapper.text()).toContain('DERIVED');
    const links = wrapper.findAll('a[target="_blank"]');
    expect(links.length).toBeGreaterThanOrEqual(14);
    expect(
      links.every((link) => link.attributes('rel') === 'noopener noreferrer'),
    ).toBe(true);
    expect(wrapper.get('.dna-page__actions button[disabled]').text()).toContain(
      'Export DNA Report',
    );
  });

  it('routes Generate Mirrored Content and Back with opaque account identity', async () => {
    const { router, wrapper } = await mountRoute(
      '/demo/accounts/demo-acc-001/dna',
    );
    await wrapper.findAll('.dna-page__actions button')[0].trigger('click');
    await flushPromises();
    await router.isReady();
    await vi.waitFor(() =>
      expect(router.currentRoute.value.fullPath).toBe(
        '/demo/content-studio?account=demo-acc-001',
      ),
    );
    await router.push('/demo/accounts/demo-acc-001/dna');
    await flushPromises();
    await vi.waitFor(() =>
      expect(wrapper.find('.dna-page__actions').exists()).toBe(true),
    );
    await wrapper.findAll('.dna-page__actions button')[2].trigger('click');
    await vi.waitFor(() =>
      expect(router.currentRoute.value.path).toBe(
        '/demo/accounts/demo-acc-001',
      ),
    );
  });

  it('keeps invalid routes in Product chrome and marks missing DNA as insufficient', async () => {
    const invalid = await mountRoute('/demo/accounts/not-real/dna');
    expect(invalid.wrapper.get('h1').text()).toBe('Account not found');
    expect(invalid.wrapper.find('.demo-layout').exists()).toBe(true);
    invalid.wrapper.unmount();

    const insufficient = await mountRoute('/demo/accounts/demo-acc-002/dna');
    expect(insufficient.wrapper.text()).toContain('INSUFFICIENT_DATA');
    expect(insufficient.wrapper.text()).toContain(
      'Communication DNA is not available',
    );
  });
});
