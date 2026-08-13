import { getRuntimeConfig } from '../app/configuration/environment';
import { requestJson } from './httpClient';
import type {
  AccountDetailDto,
  AccountListDto,
  AccountSignalDto,
  CommunicationDnaDto,
} from '../types/accountApi';

const record = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object') throw new Error('contract_error');
  return value as Record<string, unknown>;
};
const requiredString = (value: unknown): string => {
  if (typeof value !== 'string') throw new Error('contract_error');
  return value;
};
const request = async (path: string, signal?: AbortSignal) =>
  requestJson({
    baseUrl: getRuntimeConfig().apiBaseUrl,
    path,
    method: 'GET',
    signal,
  });
const parseList = (value: unknown): AccountListDto[] => {
  const items = record(value).items;
  if (!Array.isArray(items)) throw new Error('contract_error');
  return items.map((raw) => {
    const item = record(raw);
    return {
      id: requiredString(item.id),
      name: requiredString(item.name),
      industry: typeof item.industry === 'string' ? item.industry : null,
      hq: typeof item.hq === 'string' ? item.hq : null,
      lifecycle: requiredString(item.lifecycle),
      analysis:
        item.analysis === null
          ? null
          : (item.analysis as AccountListDto['analysis']),
      activeSignalCount:
        typeof item.activeSignalCount === 'number' ? item.activeSignalCount : 0,
    };
  });
};
export const listAccounts = async (signal?: AbortSignal) =>
  parseList(await request('/api/accounts', signal));
export const getAccount = async (id: string, signal?: AbortSignal) =>
  record(
    await request(`/api/accounts/${encodeURIComponent(id)}`, signal),
  ) as unknown as AccountDetailDto;
export const getAccountSignals = async (id: string, signal?: AbortSignal) => {
  const value = record(
    await request(`/api/accounts/${encodeURIComponent(id)}/signals`, signal),
  );
  if (!Array.isArray(value.items) || !value.summary)
    throw new Error('contract_error');
  return {
    summary: value.summary as {
      total: number;
      active: number;
      byType: Record<string, number>;
    },
    items: value.items as AccountSignalDto[],
  };
};
export const getCommunicationDna = async (id: string, signal?: AbortSignal) => {
  const value = record(
    await request(
      `/api/accounts/${encodeURIComponent(id)}/communication-dna`,
      signal,
    ),
  );
  if (!('data' in value)) throw new Error('contract_error');
  return value.data as CommunicationDnaDto | null;
};
