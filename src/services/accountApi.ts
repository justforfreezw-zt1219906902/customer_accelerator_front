import { getRuntimeConfig } from '../app/configuration/environment';
import { requestJson } from './httpClient';
import { ApiRequestError, apiErrorMessages } from '../utils/apiErrors';
import type {
  AccountDetailDto,
  AccountListDto,
  AccountSignalDto,
  CommunicationDnaDto,
} from '../types/accountApi';

const obj = (v: unknown): Record<string, unknown> => {
  if (!v || typeof v !== 'object' || Array.isArray(v))
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  return v as Record<string, unknown>;
};
const str = (v: unknown, nullable = false): string | null => {
  if (typeof v === 'string') return v;
  if (nullable && v === null) return null;
  throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
};
const num = (v: unknown, nullable = false): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (nullable && v === null) return null;
  throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
};
const count = (v: unknown): number => {
  if (typeof v !== 'number' || !Number.isFinite(v) || !Number.isInteger(v) || v < 0)
    throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  return v;
};
const bool = (v: unknown): boolean => {
  if (typeof v !== 'boolean')
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  return v;
};
const status = (v: unknown): string => {
  const value = str(v)!;
  if (!['SOURCE_BACKED', 'DERIVED', 'INSUFFICIENT_DATA'].includes(value))
    throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  return value;
};
const source = (v: unknown) => {
  const x = obj(v);
  return { name: str(x.name, true), type: str(x.type, true), url: str(x.url, true) };
};
const sources = (v: unknown) => {
  if (!Array.isArray(v)) throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  return v.map(source);
};
const style = (v: unknown) => {
  const x = obj(v);
  return { primary: str(x.primary, true), secondary: str(x.secondary, true), description: str(x.description, true), status: status(x.status), sources: sources(x.sources) };
};
const stringArray = (v: unknown) => {
  if (!Array.isArray(v) || v.some((item) => typeof item !== 'string'))
    throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  return v as string[];
};
const vocabulary = (v: unknown) => {
  const x = obj(v);
  if (!Array.isArray(x.terms)) throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  return {
    status: status(x.status),
    terms: x.terms.map((item) => {
      const t = obj(item);
      return { term: str(t.term)!, context: str(t.context, true), frequency: str(t.frequency, true), sources: sources(t.sources) };
    }),
  };
};
const communicationDna = (v: unknown): CommunicationDnaDto => {
  const x = obj(v);
  if (!Array.isArray(x.valuePropositions) || !Array.isArray(x.recurringPhrases))
    throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  const problem = obj(x.problemFraming);
  const cta = obj(x.ctaPatterns);
  return {
    id: str(x.id)!, accountId: str(x.accountId)!, tone: style(x.tone), vocabulary: vocabulary(x.vocabulary),
    valuePropositions: x.valuePropositions.map((item) => { const p = obj(item); return { quote: str(p.quote)!, status: status(p.status), sources: sources(p.sources) }; }),
    problemFraming: { description: str(problem.description, true), quote: str(problem.quote, true), status: status(problem.status), sources: sources(problem.sources) },
    proofStyle: style(x.proofStyle),
    ctaPatterns: { style: str(cta.style, true), description: str(cta.description, true), examples: stringArray(cta.examples), status: status(cta.status), sources: sources(cta.sources) },
    recurringPhrases: x.recurringPhrases.map((item) => { const p = obj(item); return { quote: str(p.quote)!, description: str(p.description, true), status: status(p.status), sources: sources(p.sources) }; }),
    doRules: stringArray(x.doRules), dontRules: stringArray(x.dontRules), buyingSignalSources: sources(x.buyingSignalSources), createdAt: str(x.createdAt)!,
  };
};
const analysis = (v: unknown): AccountListDto['analysis'] => {
  if (v === null) return null;
  const a = obj(v);
  return {
    icpScore: num(a.icpScore)!,
    icpFit: str(a.icpFit)!,
    signalScore: num(a.signalScore)!,
    resonanceScore: num(a.resonanceScore)!,
    tier: str(a.tier)!,
    nextBestAction: str(a.nextBestAction, true),
  };
};
const listItem = (v: unknown): AccountListDto => {
  const a = obj(v);
  const parsedAnalysis = analysis(a.analysis);
  return {
    id: str(a.id)!,
    name: str(a.name)!,
    industry: str(a.industry, true),
    hq: str(a.hq, true),
    lifecycle: str(a.lifecycle)!,
    analysis: parsedAnalysis,
    activeSignalCount: count(a.activeSignalCount),
  };
};
const detail = (v: unknown): AccountDetailDto => {
  const a = obj(v);
  const base = listItem(a);
  const revenue =
    a.revenue === null
      ? null
      : (() => {
          const r = obj(a.revenue);
          return {
            amountM: num(r.amountM, true),
            currency: str(r.currency, true),
          };
        })();
  let next = null;
  if (a.analysis !== null) {
    const x = obj(a.analysis);
    const n =
      x.nextBestAction === null
        ? null
        : (() => {
            const q = obj(x.nextBestAction);
            return {
              action: str(q.action)!,
              rationale: str(q.rationale, true),
              timeWindow: str(q.timeWindow, true),
              priority: str(q.priority, true),
            };
          })();
    next = {
      ...analysis(a.analysis)!,
      whyThisAccount: str(x.whyThisAccount, true),
      whyNow: str(x.whyNow, true),
      nextBestAction: n,
    };
  }
  return {
    ...base,
    domain: str(a.domain)!,
    webUrl: str(a.webUrl)!,
    employees: num(a.employees, true),
    revenue,
    founded: num(a.founded, true),
    description: str(a.description, true),
    analysis: next,
  };
};
const parseSignal = (v: unknown): AccountSignalDto => {
  const s = obj(v);
  const source =
    s.source === null
      ? null
      : (() => {
          const x = obj(s.source);
          return {
            name: str(x.name, true),
            type: str(x.type, true),
            url: str(x.url)!,
          };
        })();
  const evidence = str(s.evidenceStatus)!;
  if (!['SOURCE_BACKED', 'DERIVED', 'INSUFFICIENT_DATA'].includes(evidence))
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  return {
    id: str(s.id)!,
    type: str(s.type)!,
    title: str(s.title)!,
    body: str(s.body, true),
    strength: str(s.strength)!,
    relevance: str(s.relevance, true),
    signalDate: str(s.signalDate, true),
    signalDateRaw: str(s.signalDateRaw, true),
    freshnessLabel: str(s.freshnessLabel, true),
    evidenceStatus: evidence,
    verified: bool(s.verified),
    isActive: bool(s.isActive),
    scoreEligible: bool(s.scoreEligible),
    source,
  };
};
const get = async (path: string, signal?: AbortSignal) =>
  requestJson({
    baseUrl: getRuntimeConfig().apiBaseUrl,
    path,
    method: 'GET',
    signal,
  });
export const listAccounts = async (signal?: AbortSignal) => {
  const x = obj(await get('/api/accounts', signal));
  if (!Array.isArray(x.items))
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  return x.items.map(listItem);
};
export const getAccount = async (id: string, signal?: AbortSignal) =>
  detail(await get(`/api/accounts/${encodeURIComponent(id)}`, signal));
export const getAccountSignals = async (id: string, signal?: AbortSignal) => {
  const x = obj(
    await get(`/api/accounts/${encodeURIComponent(id)}/signals`, signal),
  );
  const s = obj(x.summary);
  const byType = obj(s.byType);
  if (Object.values(byType).some((value) => typeof value !== 'number' || !Number.isInteger(value) || value < 0))
    throw new ApiRequestError('contract_error', apiErrorMessages.contract_error);
  const total = count(s.total);
  const active = count(s.active);
  if (!Array.isArray(x.items))
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  return {
    summary: {
      total,
      active,
      byType: byType as Record<string, number>,
    },
    items: x.items.map(parseSignal),
  };
};
export const getCommunicationDna = async (id: string, signal?: AbortSignal) => {
  const x = obj(
    await get(
      `/api/accounts/${encodeURIComponent(id)}/communication-dna`,
      signal,
    ),
  );
  if (!('data' in x))
    throw new ApiRequestError(
      'contract_error',
      apiErrorMessages.contract_error,
    );
  if (x.data === null) return null;
  return communicationDna(x.data);
};
