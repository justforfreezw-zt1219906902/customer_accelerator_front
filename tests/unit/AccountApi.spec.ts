import { afterEach, describe, expect, it, vi } from 'vitest';
import { listAccounts, getAccountSignals, getCommunicationDna } from '../../src/services/accountApi';
import { ApiRequestError } from '../../src/utils/apiErrors';

afterEach(() => vi.restoreAllMocks());

describe('Account Intelligence API contract boundary', () => {
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

  it.each([undefined, -1, 1.5])('rejects invalid activeSignalCount %s', async (value) => {
    const item = { id: 'a', name: 'A', industry: null, hq: null, lifecycle: 'Lead', analysis: null, ...(value === undefined ? {} : { activeSignalCount: value }) };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ items: [item] }), { status: 200 })));
    await expect(listAccounts()).rejects.toMatchObject({ category: 'contract_error' });
  });
});
