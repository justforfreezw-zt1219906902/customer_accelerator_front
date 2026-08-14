import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/app/configuration/environment', () => ({
  getRuntimeConfig: () => ({ apiBaseUrl: 'http://localhost:8080', demoDataSource: 'api' }),
}));

const pulse: import('../../src/types/accountApi').SignalPulseDto = {
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
import { compareDnaPortfolio, generateOutreachEmail, getAccount, getAccountSignals, getCommunicationDna, getSignalPulse, listAccounts } from '../../src/services/accountApi';

const mountRoute = async (path: string) => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(path);
  await router.isReady();
  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [router] } });
  await flushPromises();
  return wrapper;
};
const mountRouteWithRouter = async (path: string, settle = true) => {
  const router = createAppRouter(createMemoryHistory());
  await router.push(path);
  await router.isReady();
  const wrapper = mount(App, { attachTo: document.body, global: { plugins: [router] } });
  if (settle) await flushPromises();
  return { wrapper, router };
};
const deferred = <T>() => {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
};

describe('Phase 6D API-mode UI regressions', () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.unstubAllGlobals());

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

  it('keeps API Signal Pulse loading and failure exclusive of fixture content and retries', async () => {
    const loading = deferred<typeof pulse>();
    vi.mocked(getSignalPulse).mockImplementationOnce(() => loading.promise);
    const { wrapper } = await mountRouteWithRouter('/demo/signals', false);
    expect(wrapper.text()).toContain('Loading Signal Pulse');
    expect(wrapper.text()).not.toContain('42');
    expect(wrapper.text()).not.toContain('Oracle');
    loading.resolve(pulse);
    await flushPromises();
    vi.mocked(getSignalPulse).mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(pulse);
    const failed = await mountRoute('/demo/signals');
    expect(failed.text()).toContain('Signal Pulse unavailable');
    expect(failed.text()).not.toContain('42');
    await failed.get('button').trigger('click');
    await flushPromises();
    expect(getSignalPulse).toHaveBeenCalledTimes(2);
  });

  it('keeps New This Week informational and Hot exclusive to backend urgency', async () => {
    const wrapper = await mountRoute('/demo/signals');
    const metrics = wrapper.findAll('.pulse-page__metrics button');
    await metrics[1].trigger('click');
    expect(wrapper.text()).toContain('Hot API');
    expect(wrapper.text()).toContain('Cold API');
    await metrics[2].trigger('click');
    expect(wrapper.text()).toContain('Hot API');
    expect(wrapper.text()).not.toContain('Cold API');
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

  it('renders every backend comparison collection and rejects stale compare results', async () => {
    vi.mocked(compareDnaPortfolio).mockResolvedValueOnce({ selectedCount: 2, dominantTone: [{ value: 'tone-x', count: 2 }], sharedVocabulary: [{ value: 'shared-x', count: 2 }], uniqueVocabulary: [{ value: 'unique-x', count: 1 }], proofStyles: [{ value: 'proof-x', count: 2 }], ctaStyles: [{ value: 'cta-x', count: 2 }], doRules: [{ value: 'do-x', count: 2 }], dontRules: [{ value: 'dont-x', count: 2 }], signalTypes: [{ value: 'signal-x', count: 2 }], problemFraming: [{ accountId: 'uuid-a', accountName: 'A', value: 'problem-x' }] });
    const wrapper = await mountRoute('/demo/dna');
    const checkboxes = wrapper.findAll('[role="checkbox"]');
    await checkboxes[0].trigger('click'); await checkboxes[1].trigger('click'); await flushPromises();
    for (const value of ['tone-x', 'shared-x', 'unique-x', 'proof-x', 'cta-x', 'do-x', 'dont-x', 'signal-x', 'problem-x']) expect(wrapper.text()).toContain(value);

    const pending = deferred<Awaited<ReturnType<typeof compareDnaPortfolio>>>();
    vi.mocked(compareDnaPortfolio).mockImplementationOnce(() => pending.promise);
    await checkboxes[0].trigger('click'); await checkboxes[0].trigger('click');
    await flushPromises();
    await checkboxes[1].trigger('click');
    pending.resolve({ selectedCount: 2, dominantTone: [{ value: 'stale-x', count: 2 }], sharedVocabulary: [], uniqueVocabulary: [], proofStyles: [], ctaStyles: [], doRules: [], dontRules: [], signalTypes: [], problemFraming: [] });
    await flushPromises();
    expect(wrapper.text()).not.toContain('stale-x');
  });

  it('keeps DNA selection on compare failure without fixture output', async () => {
    vi.mocked(compareDnaPortfolio).mockRejectedValueOnce(new Error('offline'));
    const wrapper = await mountRoute('/demo/dna');
    const checkboxes = wrapper.findAll('[role="checkbox"]');
    await checkboxes[0].trigger('click'); await checkboxes[1].trigger('click'); await flushPromises();
    expect(wrapper.text()).toContain('Comparison is unavailable right now.');
    expect(wrapper.findAll('[role="checkbox"]')[0].attributes('aria-checked')).toBe('true');
  });

  it('keeps API Content Studio account context neutral when no active signal exists', async () => {
    const wrapper = await mountRoute('/demo/content-studio?account=uuid-a');
    expect(wrapper.text()).toContain('API Account');
    expect(wrapper.text()).toContain('No active anchor signal is available for this account.');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    expect(wrapper.find('[aria-label="First name"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('[your email]');
    for (const label of ['↻ Generate all parts', 'Regenerate']) expect(wrapper.findAll('button').filter((button) => button.text().includes(label)).every((button) => button.attributes('disabled') !== undefined)).toBe(true);
    expect(generateOutreachEmail).not.toHaveBeenCalled();
  });

  it('reloads Content Studio account context, preserves partial drafts, and renders backend traceability', async () => {
    vi.mocked(listAccounts).mockResolvedValue([{ id: 'uuid-a', name: 'Account A', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 1, analysis: null }, { id: 'uuid-b', name: 'Account B', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 1, analysis: null }]);
    vi.mocked(getAccount).mockImplementation(async (id) => ({ id, name: id === 'uuid-a' ? 'Account A' : 'Account B', domain: 'api.test', webUrl: 'https://api.test', industry: null, hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null }));
    vi.mocked(getAccountSignals).mockImplementation(async (id) => ({ summary: { total: 1, active: 1, byType: {} }, items: [{ id: `signal-${id}`, type: 'News', title: `Signal ${id}`, body: null, strength: 'high', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: true, isActive: true, scoreEligible: true, source: null }] }));
    vi.mocked(getCommunicationDna).mockResolvedValue(null);
    vi.mocked(generateOutreachEmail).mockResolvedValue({ generatedParts: { subject: 'generated subject' }, traceability: { anchorSignalId: 'signal-uuid-a', supportingSignalIds: [], communicationDnaUsed: false, analysisUsed: true } });
    const { wrapper, router } = await mountRouteWithRouter('/demo/content-studio?account=uuid-a');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    await wrapper.get('[aria-label="Subject line"]').setValue('manual subject');
    await wrapper.get('[aria-label="Opening"]').setValue('manual opening');
    await wrapper.get('[aria-label="Value"]').setValue('manual value');
    await wrapper.get('[aria-label="CTA"]').setValue('manual cta');
    expect(wrapper.text()).toContain('No generation trace available yet');
    await wrapper.findAll('button').find((button) => button.text() === 'Regenerate')!.trigger('click');
    await flushPromises();
    expect((wrapper.get('[aria-label="Subject line"]').element as HTMLInputElement).value).toBe('generated subject');
    expect((wrapper.get('[aria-label="Opening"]').element as HTMLTextAreaElement).value).toBe('manual opening');
    expect(wrapper.text()).toContain('Backend generation trace available');
    expect(wrapper.text()).toContain('Signal uuid-a');
    await router.push('/demo/content-studio?account=uuid-b'); await flushPromises();
    expect(wrapper.text()).toContain('Account B');
    expect((wrapper.get('[aria-label="Anchor Signal"]').element as HTMLSelectElement).value).toBe('signal-uuid-b');
    expect((wrapper.get('[aria-label="Subject line"]').element as HTMLInputElement).value).toBe('');
  });

  it('preserves every API outreach draft field after provider failure', async () => {
    vi.mocked(listAccounts).mockResolvedValue([{ id: 'uuid-a', name: 'Account A', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 1, analysis: null }]);
    vi.mocked(getAccount).mockResolvedValue({ id: 'uuid-a', name: 'Account A', domain: 'api.test', webUrl: 'https://api.test', industry: null, hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null });
    vi.mocked(getAccountSignals).mockResolvedValue({ summary: { total: 1, active: 1, byType: {} }, items: [{ id: 'active-signal', type: 'News', title: 'Active signal', body: null, strength: 'high', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: true, isActive: true, scoreEligible: true, source: null }] });
    vi.mocked(getCommunicationDna).mockResolvedValue(null);
    vi.mocked(generateOutreachEmail).mockRejectedValueOnce(new Error('provider unavailable'));
    const wrapper = await mountRoute('/demo/content-studio?account=uuid-a');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    await wrapper.get('[aria-label="Subject line"]').setValue('manual subject');
    await wrapper.get('[aria-label="Opening"]').setValue('manual opening');
    await wrapper.get('[aria-label="Value"]').setValue('manual value');
    await wrapper.get('[aria-label="CTA"]').setValue('manual cta');
    await wrapper.findAll('button').find((button) => button.text() === 'Regenerate')!.trigger('click');
    await flushPromises();
    expect((wrapper.get('[aria-label="Subject line"]').element as HTMLInputElement).value).toBe('manual subject');
    expect((wrapper.get('[aria-label="Opening"]').element as HTMLTextAreaElement).value).toBe('manual opening');
    expect((wrapper.get('[aria-label="Value"]').element as HTMLTextAreaElement).value).toBe('manual value');
    expect((wrapper.get('[aria-label="CTA"]').element as HTMLInputElement).value).toBe('manual cta');
    expect(wrapper.text()).toContain('Your draft was not changed');
  });

  it('copies the current API Outreach Email draft rather than fixture ad content', async () => {
    const writeText = vi.fn();
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    vi.mocked(listAccounts).mockResolvedValue([{ id: 'uuid-a', name: 'Account A', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 1, analysis: null }]);
    vi.mocked(getAccount).mockResolvedValue({ id: 'uuid-a', name: 'Account A', domain: 'api.test', webUrl: 'https://api.test', industry: null, hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null });
    vi.mocked(getAccountSignals).mockResolvedValue({ summary: { total: 1, active: 1, byType: {} }, items: [{ id: 'active-signal', type: 'News', title: 'Active signal', body: null, strength: 'high', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: true, isActive: true, scoreEligible: true, source: null }] });
    const wrapper = await mountRoute('/demo/content-studio?account=uuid-a');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    await wrapper.get('[aria-label="Opening"]').setValue('copy opening');
    await wrapper.get('[aria-label="Value"]').setValue('copy value');
    await wrapper.get('[aria-label="CTA"]').setValue('copy cta');
    await wrapper.get('[aria-label="Signature name"]').setValue('Copy Sender');
    await wrapper.find('.email-preview button').trigger('click');
    expect(writeText).toHaveBeenCalledOnce();
    const copied = writeText.mock.calls[0][0] as string;
    for (const value of ['copy opening', 'copy value', 'copy cta', 'Copy Sender']) expect(copied).toContain(value);
    expect(copied).not.toContain('BUILT FOR THE ENTERPRISE');
  });

  it('shows real API traceability only after successful outreach generation', async () => {
    vi.mocked(listAccounts).mockResolvedValue([{ id: 'uuid-a', name: 'Account A', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 2, analysis: null }]);
    vi.mocked(getAccount).mockResolvedValue({ id: 'uuid-a', name: 'Account A', domain: 'api.test', webUrl: 'https://api.test', industry: null, hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null });
    vi.mocked(getAccountSignals).mockResolvedValue({ summary: { total: 2, active: 2, byType: {} }, items: [{ id: 'active-signal', type: 'News', title: 'Anchor title', body: null, strength: 'high', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: true, isActive: true, scoreEligible: true, source: null }, { id: 'supporting-signal-id', type: 'Hiring', title: 'Supporting title', body: null, strength: 'medium', relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null, evidenceStatus: 'DERIVED', verified: true, isActive: true, scoreEligible: true, source: null }] });
    vi.mocked(generateOutreachEmail).mockResolvedValue({ generatedParts: { subject: 'generated subject' }, traceability: { anchorSignalId: 'active-signal', supportingSignalIds: ['supporting-signal-id'], communicationDnaUsed: true, analysisUsed: false } });
    const wrapper = await mountRoute('/demo/content-studio?account=uuid-a');
    await wrapper.findAll('.studio-asset-tabs button').find((button) => button.text() === 'Outreach Email')!.trigger('click');
    expect(wrapper.text()).toContain('No generation trace available yet');
    await wrapper.findAll('button').find((button) => button.text() === 'Regenerate')!.trigger('click');
    await flushPromises();
    expect(wrapper.text()).toContain('Backend generation trace available');
    await wrapper.find('.email-preview-column .studio-traceability').trigger('click');
    const trace = wrapper.find('.email-preview-column .studio-trace-detail').text();
    expect(trace).toContain('Anchor Signal: Anchor title');
    expect(trace).toContain('Supporting Signals: Supporting title');
    expect(trace).toContain('Communication DNA used: Yes');
    expect(trace).toContain('Account analysis used: No');
  });

  it('clears the selected-account loading state when query navigation returns to the selector', async () => {
    const pending = deferred<Awaited<ReturnType<typeof getAccount>>>();
    vi.mocked(getAccount).mockImplementationOnce(() => pending.promise);
    const { wrapper, router } = await mountRouteWithRouter('/demo/content-studio?account=uuid-a');
    expect(wrapper.text()).toContain('Loading account context');
    await router.push('/demo/content-studio'); await flushPromises();
    expect(wrapper.text()).toContain('Choose an account to activate');
    pending.resolve({ id: 'uuid-a', name: 'Late Account', domain: 'late.test', webUrl: 'https://late.test', industry: null, hq: null, employees: null, revenue: null, founded: null, description: null, lifecycle: 'Lead', analysis: null });
    await flushPromises();
    expect(wrapper.text()).not.toContain('Late Account');
  });
});
