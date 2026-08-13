import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { describe, expect, it } from 'vitest';
import App from '../../src/App.vue';
import { createAppRouter } from '../../src/router';

const mountStudio = async (url = '/demo/content-studio') => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(url);
  await router.isReady();
  const wrapper = mount(App, { global: { plugins: [router] } });
  await flushPromises();
  return { router, wrapper };
};

describe('TASK-MAINT-006 Stage A Content Studio', () => {
  it('renders the Company Preview with Oracle and exact five assets in foundation state', async () => {
    const { wrapper } = await mountStudio();
    expect(wrapper.get('h1').text()).toBe('Content Studio');
    expect(wrapper.text()).toContain('Oracle');
    expect(wrapper.findAll('.studio-account-card')).toHaveLength(6);
    expect(wrapper.findAll('.studio-account-card')).toHaveLength(6);
  });
  it('uses opaque account query state and resolves direct links', async () => {
    const { router, wrapper } = await mountStudio();
    await wrapper.get('[aria-label="Select Oracle"]').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe(
      '/demo/content-studio?account=demo-acc-001',
    );
    expect(wrapper.text()).toContain('Build context');
    expect(wrapper.findAll('option')).toHaveLength(10);
  });
  it('keeps invalid account queries inside Demo and supports local filtering', async () => {
    const { wrapper } = await mountStudio(
      '/demo/content-studio?account=not-real',
    );
    expect(wrapper.get('[role="alert"]').text()).toContain('Account not found');
    const selection = await mountStudio();
    await selection.wrapper
      .get('[aria-label="Search accounts"]')
      .setValue('Oracle');
    expect(selection.wrapper.findAll('.studio-account-card')).toHaveLength(1);
    await selection.wrapper
      .get('.studio-page__actions button')
      .trigger('click');
    expect(selection.wrapper.findAll('.studio-account-card')).toHaveLength(6);
  });
});
