import { describe, expect, it } from 'vitest';

import {
  createRuntimeConfig,
  RuntimeConfigurationError,
} from '../../src/app/configuration/environment';

describe('runtime configuration', () => {
  it('normalizes the API URL and omits a blank owner', () => {
    expect(
      createRuntimeConfig({
        VITE_API_BASE_URL: 'http://localhost:8080///',
        VITE_HUBSPOT_OWNER_ID: ' ',
        VITE_APP_MODE: 'development',
      }),
    ).toEqual({
      apiBaseUrl: 'http://localhost:8080',
      appMode: 'development',
    });
  });

  it('keeps a configured owner and never treats it as a form value', () => {
    expect(
      createRuntimeConfig({
        VITE_API_BASE_URL: 'https://api.example.test/',
        VITE_HUBSPOT_OWNER_ID: '90579791',
      }),
    ).toEqual({
      apiBaseUrl: 'https://api.example.test',
      appMode: 'development',
      ownerId: '90579791',
    });
  });

  it('fails safely for missing or unsafe base URLs', () => {
    expect(() => createRuntimeConfig({})).toThrow(RuntimeConfigurationError);
    expect(() =>
      createRuntimeConfig({ VITE_API_BASE_URL: 'file:///tmp/api' }),
    ).toThrow(RuntimeConfigurationError);
  });
});
