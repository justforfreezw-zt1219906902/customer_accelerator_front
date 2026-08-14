import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/app/configuration/environment', () => ({
  getRuntimeConfig: () => ({ apiBaseUrl: 'http://localhost:8080', demoDataSource: 'api' }),
}));

const pulse = {
  metrics: { activeSignals: 7, newThisWeek: 2, hotAccounts: 1, goingCold: 3 },
  accounts: [
    { accountId: 'uuid-hot', name: 'Hot API', industry: null, tier: null, urgency: 'hot', activeSignalCount: 2, highActiveSignalCount: 1, latestActiveSignalDate: null, nextBestAction: null, signals: [] },
    { accountId: 'uuid-cold', name: 'Cold API', industry: 'Technology', tier: 'Tier 2', urgency: 'cold', activeSignalCount: 0, highActiveSignalCount: 0, latestActiveSignalDate: null, nextBestAction: null, signals: [] },
  ],
};
const portfolio = {
  summary: { totalProfiles: 2, byTier: { 'Tier 1': 1 }, byIndustry: { Technology: 2 } },
  items: [
    { accountId: 'uuid-a', name: 'A', industry: 'Technology', tier: 'Tier 1', activeSignalCount: 1, tone: null, vocabulary: [], problemFraming: null, proofStyle: null, ctaStyle: null, doRules: [], dontRules: [], signalTypes: [] },
    { accountId: 'uuid-b', name: 'B', industry: 'Technology', tier: 'Tier 1', activeSignalCount: 0, tone: null, vocabulary: [], problemFraming: null, proofStyle: null, ctaStyle: null, doRules: [], dontRules: [], signalTypes: [] },
  ],
};

vi.mock('../../src/services/accountApi', () => ({
  getSignalPulse: vi.fn(async () => pulse),
  getDnaPortfolio: vi.fn(async () => portfolio),
  compareDnaPortfolio: vi.fn(async () => ({ selectedCount: 2, dominantTone: [{ value: 'Technical', count: 2 }], sharedVocabulary: [], uniqueVocabulary: [], proofStyles: [], ctaStyles: [], doRules: [], dontRules: [], signalTypes: [], problemFraming: [] })),
  listAccounts: vi.fn(async () => [{ id: 'uuid-a', name: 'API Account', industry: 'Technology', hq: null, lifecycle: 'Lead', activeSignalCount: 0, analysis: null }]),
  getAccount: vi.fn(async () => ({ id: 'uuid-a', name: 'API Account', domain: 'api.test', webUrl: 'https://api.test', industry: 'Technology', hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null })),
  getAccountSignals: vi.fn(async () => ({ summary: { total: 0, active: 0, byType: {} }, items: [] })),
  getCommunicationDna: vi.fn(async () => null),
  generateOutreachEmail: vi.fn(),
}));

import App from '../../src/App.vue';
import { createAppRouter } from '../../src/router';
import { compareDnaPortfolio } from '../../src/services/accountApi';

const mountRoute = async (path: string) => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(path);
  await router.isReady();
  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [router] } });
  await flushPromises();
  return wrapper;
};

describe('Phase 6D API-mode UI regressions', () => {
  beforeEach(() => vi.clearAllMocks());

  it('uses backend Signal Pulse metrics and urgency filters without fixture patterns', async () => {
    const wrapper = await mountRoute('/demo/signals');
    expect(wrapper.text()).toContain('7');
    expect(wrapper.text()).toContain('Hot API');
    expect(wrapper.text()).not.toContain('Market Patterns');
    const coldMetric = wrapper.findAll('.pulse-page__metrics button')[3];
    await coldMetric.trigger('click');
    expect(wrapper.text()).toContain('Cold API');
    expect(wrapper.text()).not.toContain('Hot API');
  });

  it('starts DNA selection empty and compares only after two UUID selections', async () => {
    const wrapper = await mountRoute('/demo/dna');
    expect(wrapper.text()).toContain('Select at least two accounts to compare.');
    const checkboxes = wrapper.findAll('[role="checkbox"]');
    expect(checkboxes).toHaveLength(2);
    await checkboxes[0].trigger('click');
    expect(compareDnaPortfolio).not.toHaveBeenCalled();
    await checkboxes[1].trigger('click');
    await flushPromises();
    expect(compareDnaPortfolio).toHaveBeenCalledWith(['uuid-a', 'uuid-b']);
    expect(wrapper.text()).toContain('Technical');
  });

  it('keeps API Content Studio account context neutral when no active signal exists', async () => {
    const wrapper = await mountRoute('/demo/content-studio?account=uuid-a');
    expect(wrapper.text()).toContain('API Account');
    expect(wrapper.text()).toContain('No active anchor signal is available for this account.');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    expect(wrapper.find('[aria-label="First name"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('[your email]');
  });
});
