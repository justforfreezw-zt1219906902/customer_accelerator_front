import { describe, expect, it, vi } from 'vitest';

import {
  LEAD_CONTRACT_ID,
  LEAD_ENDPOINT,
  mapLeadRequest,
  submitLead,
} from '../../src/services/leadApi';
import type { RuntimeConfig } from '../../src/app/configuration/environment';
import { ApiRequestError } from '../../src/utils/apiErrors';

const values = {
  firstName: ' Ada ',
  familyName: ' Lovelace ',
  company: ' Analytical Engines ',
  workEmail: ' ada@example.com ',
};

const config: RuntimeConfig = {
  apiBaseUrl: 'http://localhost:8080',
  appMode: 'development',
  ownerId: '90579791',
};

const jsonResponse = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

describe('API-CONTRACT-R1 lead service', () => {
  it('maps only confirmed fields and handles optional owner', () => {
    expect(LEAD_CONTRACT_ID).toBe('API-CONTRACT-R1');
    expect(LEAD_ENDPOINT).toBe('/api/lead');
    expect(mapLeadRequest(values, '90579791')).toEqual({
      firstName: 'Ada',
      familyName: 'Lovelace',
      company: 'Analytical Engines',
      workEmail: 'ada@example.com',
      owner: '90579791',
    });
    expect(mapLeadRequest(values, ' ')).toEqual({
      firstName: 'Ada',
      familyName: 'Lovelace',
      company: 'Analytical Engines',
      workEmail: 'ada@example.com',
    });
  });

  it('posts exact JSON and validates the confirmed success response', async () => {
    const fetcher = vi.fn(async () =>
      jsonResponse({
        message: 'lead submitted successfully',
        hubspot_contact_id: '796484549850',
      }),
    );

    await expect(submitLead(values, { config, fetcher })).resolves.toEqual({
      message: 'lead submitted successfully',
      hubspot_contact_id: '796484549850',
    });

    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, init] = fetcher.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('http://localhost:8080/api/lead');
    expect(init).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(JSON.parse(init.body as string)).toEqual({
      firstName: 'Ada',
      familyName: 'Lovelace',
      company: 'Analytical Engines',
      workEmail: 'ada@example.com',
      owner: '90579791',
    });
    expect(init.body).not.toContain('website');
    expect(init.body).not.toContain('phone');
    expect(init.body).not.toContain('message');
  });

  it.each([
    [400, 'validation_error'],
    [500, 'server_error'],
    [502, 'upstream_service_error'],
    [418, 'unexpected_response'],
  ] as const)('maps HTTP %i to %s', async (status, category) => {
    const fetcher = vi.fn(async () =>
      jsonResponse({ error: 'backend detail' }, status),
    );
    await expect(submitLead(values, { config, fetcher })).rejects.toMatchObject(
      {
        category,
        status,
      },
    );
  });

  it('handles malformed, empty, and invalid 200 responses safely', async () => {
    for (const response of [
      new Response('{', { status: 200 }),
      new Response(null, { status: 200 }),
      jsonResponse({ message: 'lead submitted successfully' }),
    ]) {
      const fetcher = vi.fn(async () => response);
      await expect(
        submitLead(values, { config, fetcher }),
      ).rejects.toMatchObject({
        category: 'unexpected_response',
      });
    }
  });

  it('maps network failure and explicit cancellation without retrying', async () => {
    const networkFetcher = vi.fn(async () => {
      throw new TypeError('network failed');
    });
    await expect(
      submitLead(values, { config, fetcher: networkFetcher }),
    ).rejects.toMatchObject({ category: 'network_error' });
    expect(networkFetcher).toHaveBeenCalledTimes(1);

    const controller = new AbortController();
    const cancelledFetcher = vi.fn(
      async (_input: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          );
        }),
    );
    const pending = submitLead(values, {
      config,
      fetcher: cancelledFetcher,
      signal: controller.signal,
    });
    controller.abort();
    await expect(pending).rejects.toMatchObject({ category: 'cancelled' });
    expect(cancelledFetcher).toHaveBeenCalledTimes(1);
  });

  it('provides a stable timeout category without inventing a timer', () => {
    const error = new ApiRequestError(
      'timeout_error',
      'The request took too long.',
    );
    expect(error.category).toBe('timeout_error');
  });
});
