import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/app/configuration/environment', () => ({
  getRuntimeConfig: () => ({ apiBaseUrl: 'http://localhost:8080', demoDataSource: 'api' }),
}));
vi.mock('../../src/services/accountApi', () => ({
  getAccount: vi.fn(async () => ({
    id: 'api-1', name: 'API Account', industry: null, hq: null, lifecycle: 'Lead',
    domain: 'example.com', webUrl: 'https://example.com', employees: null, revenue: null,
    founded: null, description: null, analysis: null,
  })),
  getAccountSignals: vi.fn(async () => ({
    summary: { total: 4, active: 3, byType: { 'Job Posting': 2, 'Custom Intent Signal': 1, 'News & Events': 1 } },
    items: [
      ['Job Posting', 'Job one'], ['Job Posting', 'Job two'],
      ['Custom Intent Signal', 'Custom signal'], ['News & Events', 'News signal'],
    ].map(([type, title], index) => ({ id: `s-${index}`, type, title, body: null, strength: 'high', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: false, isActive: true, scoreEligible: false, source: null })),
  })),
  getCommunicationDna: vi.fn(async () => ({
    id: 'dna-1', accountId: 'api-1', tone: { primary: null, secondary: null, description: null, status: 'DERIVED', sources: [] },
    vocabulary: { status: 'DERIVED', terms: [{ term: 'precision', context: null, frequency: 'frequent', sources: [] }] },
    valuePropositions: [], problemFraming: { description: null, quote: null, status: 'DERIVED', sources: [] },
    proofStyle: { primary: null, secondary: null, description: null, status: 'DERIVED', sources: [] },
    ctaPatterns: { style: null, description: null, examples: [], status: 'DERIVED', sources: [] }, recurringPhrases: [],
    doRules: ['Lead with technical precision'], dontRules: ['Avoid vague claims'],
    buyingSignalSources: [{ name: 'Demo Careers', type: 'Career Page', url: 'https://example.com/careers' }, { name: 'Demo Newsroom', type: 'News', url: 'https://example.com/news' }], createdAt: '2026-01-01',
  })),
}));

import App from '../../src/App.vue';
import { createAppRouter } from '../../src/router';
import { getCommunicationDna } from '../../src/services/accountApi';

beforeEach(() => vi.stubGlobal('scrollTo', vi.fn()));
afterEach(() => document.body.innerHTML = '');

const mountRoute = async (path: string) => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(path); await router.isReady();
  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [router] } });
  await flushPromises();
  return wrapper;
};

describe('API-mode Account Intelligence focused regressions', () => {
  it('renders dynamic signal tabs and filters arbitrary signal types', async () => {
    const wrapper = await mountRoute('/demo/accounts/api-1');
    expect(wrapper.text()).toContain('All (4)');
    expect(wrapper.text()).toContain('Job Posting (2)');
    expect(wrapper.text()).toContain('Custom Intent Signal (1)');
    expect(wrapper.text()).toContain('News & Events (1)');
    const customTab = wrapper.findAll('button').find((button) => button.text().startsWith('Custom Intent Signal'));
    expect(customTab).toBeDefined();
    await customTab!.trigger('click');
    expect(wrapper.text()).toContain('Custom signal');
    expect(wrapper.text()).not.toContain('Job one');
    expect(wrapper.text()).not.toContain('News signal');
  });

  it('renders neutral API analysis absence without evidence-status wording', async () => {
    const wrapper = await mountRoute('/demo/accounts/api-1');
    expect(wrapper.text()).toContain('Not available');
    expect(wrapper.text()).toContain('—');
    expect(wrapper.text()).not.toContain('INSUFFICIENT DATA');
  });

  it('renders DNA empty states, rules, dynamic sources and unknown frequency', async () => {
    const wrapper = await mountRoute('/demo/accounts/api-1/dna');
    expect(wrapper.text()).toContain('No value propositions available.');
    expect(wrapper.text()).toContain('No recurring phrases available.');
    expect(wrapper.text()).toContain('Not available');
    expect(wrapper.text()).toContain('frequent');
    expect(wrapper.text()).toContain('Lead with technical precision');
    expect(wrapper.text()).toContain('Avoid vague claims');
    expect(wrapper.text()).toContain('2 sources used in the account signal analysis');
    expect(wrapper.text()).not.toContain('14 verified sources');
  });

  it('renders an existing account with no Communication DNA as a normal empty state', async () => {
    vi.mocked(getCommunicationDna).mockResolvedValueOnce(null);
    const wrapper = await mountRoute('/demo/accounts/api-1/dna');
    expect(wrapper.text()).toContain('API Account');
    expect(wrapper.text()).toContain('No Communication DNA is available for this account.');
    expect(wrapper.text()).not.toContain('Communication DNA is unavailable right now.');
  });
});
