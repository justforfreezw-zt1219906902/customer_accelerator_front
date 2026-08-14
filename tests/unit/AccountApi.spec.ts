import { afterEach, describe, expect, it, vi } from 'vitest';
import { listAccounts, getAccount, getAccountSignals, getCommunicationDna, getSignalPulse, getDnaPortfolio, compareDnaPortfolio, generateOutreachEmail } from '../../src/services/accountApi';
import { ApiRequestError } from '../../src/utils/apiErrors';
import type { OutreachEmailGenerationRequest } from '../../src/types/accountApi';

afterEach(() => vi.restoreAllMocks());

describe('Account Intelligence API contract boundary', () => {
  const signalPulse = () => ({ metrics: { activeSignals: 0, newThisWeek: 0, hotAccounts: 0, goingCold: 0 }, accounts: [{ accountId: 'acc-1', name: 'A', industry: null, tier: null, urgency: 'cold', activeSignalCount: 0, highActiveSignalCount: 0, latestActiveSignalDate: null, nextBestAction: null, signals: [] }] });
  const dnaPortfolio = () => ({ summary: { totalProfiles: 0, byTier: {}, byIndustry: {} }, items: [{ accountId: 'acc-1', name: 'A', industry: null, tier: null, activeSignalCount: 0, tone: null, vocabulary: [], problemFraming: null, proofStyle: null, ctaStyle: null, doRules: [], dontRules: [], signalTypes: [] }] });
  const dnaCompare = () => ({ selectedCount: 2, dominantTone: [], sharedVocabulary: [], uniqueVocabulary: [], proofStyles: [], ctaStyles: [], doRules: [], dontRules: [], signalTypes: [], problemFraming: [{ accountId: 'acc-1', accountName: 'A', value: null }] });
  const dna = () => ({ data: { id: 'dna-1', accountId: 'acc-1', tone: { primary: null, secondary: null, description: null, status: 'INSUFFICIENT_DATA', sources: [] }, vocabulary: { status: 'DERIVED', terms: [] }, valuePropositions: [], problemFraming: { description: null, quote: null, status: 'INSUFFICIENT_DATA', sources: [] }, proofStyle: { primary: null, secondary: null, description: null, status: 'INSUFFICIENT_DATA', sources: [] }, ctaPatterns: { style: null, description: null, examples: [], status: 'INSUFFICIENT_DATA', sources: [] }, recurringPhrases: [], doRules: [], dontRules: [], buyingSignalSources: [], createdAt: '2026-01-01' } });

  it('accepts nullable and empty Communication DNA collections', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(dna()), { status: 200 })));
    await expect(getCommunicationDna('acc-1')).resolves.toMatchObject({ accountId: 'acc-1', valuePropositions: [] });
  });

  it.each([
    ['tone', (x: unknown) => ((x as { data: Record<string, unknown> }).data.tone = 'bad')],
    ['unknown status', (x: unknown) => ((((x as { data: Record<string, unknown> }).data.tone) as Record<string, unknown>).status = 'UNKNOWN')],
    ['malformed source', (x: unknown) => ((((x as { data: Record<string, unknown> }).data.tone) as Record<string, unknown>).sources = [{ url: 4 }])],
    ['bad rules', (x: unknown) => ((x as { data: Record<string, unknown> }).data.doRules = ['ok', 2])],
    ['bad CTA examples', (x: unknown) => ((((x as { data: Record<string, unknown> }).data.ctaPatterns) as Record<string, unknown>).examples = [3])],
    ['missing createdAt', (x: unknown) => delete (x as { data: Record<string, unknown> }).data.createdAt],
  ])('rejects malformed DNA: %s', async (_name, mutate) => {
    const payload = dna();
    mutate(payload);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), { status: 200 })));
    await expect(getCommunicationDna('acc-1')).rejects.toMatchObject({ category: 'contract_error' });
  });
  it('maps a valid account list without adding fields', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({
        items: [{ id: 'demo-acc-001', name: 'Oracle', industry: null, hq: null,
          lifecycle: 'Customer', activeSignalCount: 2,
          analysis: { icpScore: 91, icpFit: 'HIGH', signalScore: 88, resonanceScore: 79,
            tier: 'Focus Accounts', nextBestAction: null } }],
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
    ));
    await expect(listAccounts()).resolves.toMatchObject([{ id: 'demo-acc-001', name: 'Oracle' }]);
  });

  it('accepts an unanalyzed account detail without activeSignalCount', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      id: 'detail-1', name: 'Unanalyzed Account', domain: 'unanalyzed.example',
      webUrl: 'https://unanalyzed.example', industry: 'Retail', hq: 'Hamburg',
      employees: null, revenue: null, founded: null, description: null,
      lifecycle: 'Lead', analysis: null,
    }), { status: 200 })));
    await expect(getAccount('detail-1')).resolves.toMatchObject({
      id: 'detail-1', name: 'Unanalyzed Account', analysis: null,
    });
  });

  it('accepts an analyzed account detail without activeSignalCount', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({
      id: 'detail-2', name: 'Analyzed Account', domain: 'analyzed.example',
      webUrl: 'https://analyzed.example', industry: 'Technology', hq: 'Austin',
      employees: 12, revenue: { amountM: 4, currency: 'USD' }, founded: 2020,
      description: 'Analyzed demo account', lifecycle: 'Customer', analysis: {
        icpScore: 91, icpFit: 'High', signalScore: 88, resonanceScore: 79,
        tier: 'Focus Accounts', whyThisAccount: 'Strong fit', whyNow: 'Active need',
        nextBestAction: { action: 'Prepare outreach', rationale: null, timeWindow: null, priority: null },
      },
    }), { status: 200 })));
    await expect(getAccount('detail-2')).resolves.toMatchObject({
      id: 'detail-2', analysis: { icpScore: 91, nextBestAction: { action: 'Prepare outreach' } },
    });
  });

  it('rejects malformed payloads as contract errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [{ id: 'missing-fields' }] }), { status: 200 }),
    ));
    await expect(listAccounts()).rejects.toMatchObject({ category: 'contract_error' } satisfies Partial<ApiRequestError>);
  });

  it('preserves signal nullability and summary from the contract', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ summary: { total: 1, active: 1, byType: { hiring: 1 } }, items: [{
        id: 'sig-1', type: 'hiring', title: 'Hiring', body: null, strength: 'high',
        relevance: null, signalDate: null, signalDateRaw: null, freshnessLabel: null,
        evidenceStatus: 'INSUFFICIENT_DATA', verified: false, isActive: true,
        scoreEligible: false, source: null,
      }] }), { status: 200 }),
    ));
    await expect(getAccountSignals('demo-acc-001')).resolves.toMatchObject({ summary: { active: 1 } });
  });

  it.each([-1, 1.5, '2'])('rejects invalid byType counts: %s', async (count) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ summary: { total: 1, active: 1, byType: { hiring: count } }, items: [] }), { status: 200 })));
    await expect(getAccountSignals('demo-acc-001')).rejects.toMatchObject({ category: 'contract_error' });
  });

  it.each([
    ['total', { total: -1, active: 0, byType: {} }],
    ['active', { total: 0, active: 1.5, byType: {} }],
  ])('rejects invalid summary %s count', async (_name, summary) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ summary, items: [] }), { status: 200 })));
    await expect(getAccountSignals('demo-acc-001')).rejects.toMatchObject({ category: 'contract_error' });
  });

  it('accepts an activeSignalCount of zero', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [{
      id: 'a', name: 'A', industry: null, hq: null, lifecycle: 'Lead', activeSignalCount: 0, analysis: null,
    }] }), { status: 200 })));
    await expect(listAccounts()).resolves.toMatchObject([{ id: 'a', activeSignalCount: 0 }]);
  });

  it('parses Signal Pulse and nullable fields from raw JSON', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(signalPulse()), { status: 200 })));
    await expect(getSignalPulse()).resolves.toMatchObject({ accounts: [{ activeSignalCount: 0, industry: null, latestActiveSignalDate: null }] });
  });

  it.each([
    ['negative metric', { ...signalPulse(), metrics: { activeSignals: -1, newThisWeek: 0, hotAccounts: 0, goingCold: 0 } }],
    ['invalid urgency', { ...signalPulse(), accounts: [{ ...signalPulse().accounts[0], urgency: 'unknown' }] }],
  ])('rejects malformed Signal Pulse: %s', async (_name, payload) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(payload), { status: 200 })));
    await expect(getSignalPulse()).rejects.toMatchObject({ category: 'contract_error' });
  });

  it('parses DNA portfolio and complete compare payloads', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(dnaPortfolio()), { status: 200 })).mockResolvedValueOnce(new Response(JSON.stringify(dnaCompare()), { status: 200 })));
    await expect(getDnaPortfolio()).resolves.toMatchObject({ items: [{ tone: null, proofStyle: null }] });
    await expect(compareDnaPortfolio(['acc-1', 'acc-2'])).resolves.toMatchObject({ problemFraming: [{ value: null }] });
  });

  it('requires exactly the requested non-empty outreach parts', async () => {
    const request: OutreachEmailGenerationRequest = { persona: 'marketing', anchorSignalId: 'sig-1', parts: ['subject'], currentDraft: { subject: '', opening: '', value: '', cta: '' } };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ generatedParts: { subject: 'new subject', opening: 'unexpected' }, traceability: { anchorSignalId: 'sig-1', supportingSignalIds: [], communicationDnaUsed: false, analysisUsed: false } }), { status: 200 })));
    await expect(generateOutreachEmail('acc-1', request)).rejects.toMatchObject({ category: 'contract_error' });
  });

  it.each([undefined, -1, 1.5])('rejects invalid activeSignalCount %s', async (value) => {
    const item = { id: 'a', name: 'A', industry: null, hq: null, lifecycle: 'Lead', analysis: null, ...(value === undefined ? {} : { activeSignalCount: value }) };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [item] }), { status: 200 })));
    await expect(listAccounts()).rejects.toMatchObject({ category: 'contract_error' });
  });
});
