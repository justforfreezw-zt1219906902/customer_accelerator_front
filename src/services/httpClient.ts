import type { ApiErrorResponse } from '../types/api';
import { ApiRequestError, apiErrorMessages } from '../utils/apiErrors';

export type FetchImplementation = typeof fetch;

export interface JsonRequestOptions {
  baseUrl: string;
  path: string;
  method: 'GET' | 'POST';
  body?: unknown;
  signal?: AbortSignal;
  fetcher?: FetchImplementation;
}

const parseJson = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
};

const isApiErrorResponse = (value: unknown): value is ApiErrorResponse =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Record<string, unknown>).error === 'string';

export const requestJson = async ({
  baseUrl,
  path,
  method,
  body,
  signal,
  fetcher = fetch,
}: JsonRequestOptions): Promise<unknown> => {
  let response: Response;

  try {
    response = await fetcher(`${baseUrl}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiRequestError('cancelled', apiErrorMessages.cancelled);
    }
    throw new ApiRequestError('network_error', apiErrorMessages.network_error);
  }

  const payload = await parseJson(response);
  if (response.ok) return payload;

  const backendMessage = isApiErrorResponse(payload)
    ? payload.error
    : undefined;

  if (response.status === 400) {
    throw new ApiRequestError(
      'validation_error',
      apiErrorMessages.validation_error,
      response.status,
    );
  }
  if (response.status === 404) {
    throw new ApiRequestError(
      'unexpected_response',
      'The requested account was not found.',
      response.status,
    );
  }
  if (response.status === 500) {
    throw new ApiRequestError(
      'server_error',
      apiErrorMessages.server_error,
      response.status,
    );
  }
  if (response.status === 502) {
    throw new ApiRequestError(
      'upstream_service_error',
      apiErrorMessages.upstream_service_error,
      response.status,
    );
  }

  void backendMessage;
  throw new ApiRequestError(
    'unexpected_response',
    apiErrorMessages.unexpected_response,
    response.status,
  );
};
