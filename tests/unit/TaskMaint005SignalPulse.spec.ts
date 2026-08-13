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
  await router.push('/demo/signals');
  await router.isReady();
  const wrapper = mount(App, {
    attachTo: document.body,
    global: { plugins: [router] },
  });
  await flushPromises();
  return { router, wrapper };
};

describe('TASK-MAINT-005 Stage B Signal Pulse', () => {
  it('separates representative metrics from three curated urgency fixtures', () => {
    const pulse = demoAccountProvider.getSignalPulse();
    expect(pulse.representativeMetrics).toEqual({
      activeSignals: 42,
      newThisWeek: 2,
      hotAccounts: 3,
      goingCold: 129,
      marketPatterns: 3,
    });
    expect(pulse.accounts).toHaveLength(3);
    expect(
      pulse.accounts.find(({ name }) => name === 'Dell Technologies')
        ?.routability,
    ).toBe('representative_non_routable_fixture');
  });
  it('renders accessible local tabs and deterministic metric filters', async () => {
    const { wrapper } = await mountPage();
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(5);
    expect(wrapper.findAll('.signal-urgency-card')).toHaveLength(3);
    await wrapper.findAll('.pulse-page__metrics button')[1].trigger('click');
    expect(wrapper.findAll('.signal-urgency-card')).toHaveLength(2);
    await wrapper.findAll('.pulse-page__metrics button')[3].trigger('click');
    expect(wrapper.findAll('.signal-urgency-card')).toHaveLength(1);
    expect(wrapper.text()).toContain('Dell Technologies');
  });
  it('keeps Dell non-routable and approved identities opaque-routable', async () => {
    const { wrapper } = await mountPage();
    expect(
      wrapper.find('[data-routability="representative_non_routable_fixture"]')
        .element.tagName,
    ).toBe('ARTICLE');
    expect(
      wrapper
        .get('a[aria-label="Open Oracle account overview"]')
        .attributes('href'),
    ).toBe('/demo/accounts/demo-acc-001');
  });
  it('resets filters on persona changes and keeps Save Brief disabled', async () => {
    const { router, wrapper } = await mountPage();
    await wrapper.findAll('.pulse-page__metrics button')[3].trigger('click');
    await wrapper.get('#pulse-tab-Content').trigger('click');
    expect(wrapper.findAll('.signal-urgency-card')).toHaveLength(3);
    expect(wrapper.findAll('button[disabled]').length).toBeGreaterThan(0);
    await wrapper.find('.market-pattern-card__actions button').trigger('click');
    await vi.waitFor(() =>
      expect(router.currentRoute.value.path).toBe('/demo/content-studio'),
    );
  });
});
