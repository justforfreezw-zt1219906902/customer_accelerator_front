export interface RuntimeConfig {
  apiBaseUrl: string;
  appMode: string;
  ownerId?: string;
}

export class RuntimeConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RuntimeConfigurationError';
  }
}

const normalizeBaseUrl = (value: string | undefined): string => {
  const candidate = value?.trim();
  if (!candidate) {
    throw new RuntimeConfigurationError(
      'The API is not configured. Please try again later.',
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new RuntimeConfigurationError(
      'The API configuration is invalid. Please try again later.',
    );
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new RuntimeConfigurationError(
      'The API configuration is invalid. Please try again later.',
    );
  }

  return parsed.toString().replace(/\/+$/, '');
};

export const createRuntimeConfig = (
  environment: Record<string, string | undefined>,
): RuntimeConfig => {
  const ownerId = environment.VITE_HUBSPOT_OWNER_ID?.trim();

  return Object.freeze({
    apiBaseUrl: normalizeBaseUrl(environment.VITE_API_BASE_URL),
    appMode: environment.VITE_APP_MODE?.trim() || 'development',
    ...(ownerId ? { ownerId } : {}),
  });
};

export const getRuntimeConfig = (): RuntimeConfig =>
  createRuntimeConfig(import.meta.env);

// Preserved foundation export. Values are public and intentionally not logged.
export const publicEnvironment = Object.freeze({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  hubspotOwnerId: import.meta.env.VITE_HUBSPOT_OWNER_ID,
});
