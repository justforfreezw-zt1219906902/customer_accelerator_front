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
const mountPage = async () => {
  const router = createAppRouter(createMemoryHistory());
  await router.push('/demo/dna');
  await router.isReady();
  const wrapper = mount(App, {
    attachTo: document.body,
    global: { plugins: [router] },
  });
  await flushPromises();
  return { router, wrapper };
};

describe('TASK-MAINT-005 Stage C DNA Portfolio', () => {
  it('keeps representative counts separate from six curated profiles', () => {
    const portfolio = demoAccountProvider.getDnaPortfolio();
    expect(
      portfolio.representativeTierCounts.map(({ label }) => label),
    ).toEqual([
      'All (140)',
      'Focus Accounts (8)',
      'Tier 1 (2)',
      'Tier 2 (130)',
    ]);
    expect(portfolio.representativeIndustryCounts).toHaveLength(19);
    expect(portfolio.profiles).toHaveLength(6);
    expect(portfolio.profiles[0].accountId).toBe('demo-acc-001');
  });
  it('filters locally and resets Industry when Tier changes', async () => {
    const { wrapper } = await mountPage();
    expect(wrapper.findAll('.dna-portfolio-card')).toHaveLength(6);
    await wrapper
      .get('button[aria-pressed][type="button"]:nth-of-type(1)')
      .trigger('click');
    const industry = wrapper.findAll('.portfolio-page__filters')[1];
    await industry
      .findAll('button')
      .find((button) => button.text().startsWith('Technology'))!
      .trigger('click');
    expect(wrapper.findAll('.dna-portfolio-card')).toHaveLength(1);
    const tier = wrapper.findAll('.portfolio-page__filters')[0];
    await tier
      .findAll('button')
      .find((button) => button.text().startsWith('Tier 1'))!
      .trigger('click');
    expect(industry.find('button[aria-pressed="true"]').text()).toBe(
      'All (140)',
    );
    expect(wrapper.findAll('.dna-portfolio-card')).toHaveLength(2);
  });
  it('supports individual and all-visible selection with thresholded analysis', async () => {
    const { wrapper } = await mountPage();
    expect(wrapper.find('.portfolio-page__analysis').exists()).toBe(false);
    await wrapper.get('button[aria-label="Select Oracle"]').trigger('click');
    expect(wrapper.find('.portfolio-page__analysis').exists()).toBe(true);
    expect(wrapper.text()).toContain('Dominant tone');
    expect(wrapper.text()).toContain('Shared vocabulary');
    expect(wrapper.text()).toContain('Proof style');
    expect(wrapper.text()).toContain('CTA style');
    expect(
      wrapper.findAll('.portfolio-page__analysis button[disabled]'),
    ).toHaveLength(2);
    await wrapper.get('.portfolio-page__selection button').trigger('click');
    expect(wrapper.get('.portfolio-page__selection button').text()).toBe(
      'Deselect All Visible',
    );
    await wrapper.get('.portfolio-page__selection button').trigger('click');
    expect(wrapper.get('.portfolio-page__selection button').text()).toBe(
      'Select All Visible',
    );
  });
  it('routes View Full DNA with an opaque account ID', async () => {
    const { router, wrapper } = await mountPage();
    await wrapper
      .findAll('.dna-portfolio-card footer button')[0]
      .trigger('click');
    await vi.waitFor(() =>
      expect(router.currentRoute.value.path).toBe(
        '/demo/accounts/demo-acc-001/dna',
      ),
    );
  });
});
