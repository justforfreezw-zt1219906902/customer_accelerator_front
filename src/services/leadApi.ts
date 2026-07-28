import {
  getRuntimeConfig,
  RuntimeConfigurationError,
  type RuntimeConfig,
} from '../app/configuration/environment';
import type { RequestOptions } from '../types/api';
import type {
  LeadFormValues,
  LeadRequest,
  LeadSuccessResponse,
} from '../types/lead';
import {
  ApiRequestError,
  apiErrorMessages,
  toApiRequestError,
} from '../utils/apiErrors';
import { requestJson, type FetchImplementation } from './httpClient';

export const LEAD_CONTRACT_ID = 'API-CONTRACT-R1';
export const LEAD_ENDPOINT = '/api/lead';

export interface SubmitLeadOptions extends RequestOptions {
  config?: RuntimeConfig;
  fetcher?: FetchImplementation;
}

export const mapLeadRequest = (
  values: LeadFormValues,
  ownerId?: string,
): LeadRequest => {
  const owner = ownerId?.trim();
  return {
    firstName: values.firstName.trim(),
    familyName: values.familyName.trim(),
    company: values.company.trim(),
    workEmail: values.workEmail.trim(),
    ...(owner ? { owner } : {}),
  };
};

const isLeadSuccessResponse = (
  value: unknown,
): value is LeadSuccessResponse => {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.message === 'string' &&
    record.message === 'lead submitted successfully' &&
    typeof record.hubspot_contact_id === 'string' &&
    record.hubspot_contact_id.length > 0
  );
};

export const submitLead = async (
  values: LeadFormValues,
  options: SubmitLeadOptions = {},
): Promise<LeadSuccessResponse> => {
  let config: RuntimeConfig;
  try {
    config = options.config ?? getRuntimeConfig();
  } catch (error) {
    if (error instanceof RuntimeConfigurationError) {
      throw new ApiRequestError(
        'configuration_error',
        apiErrorMessages.configuration_error,
      );
    }
    throw toApiRequestError(error);
  }

  const payload = mapLeadRequest(values, config.ownerId);
  const response = await requestJson({
    baseUrl: config.apiBaseUrl,
    path: LEAD_ENDPOINT,
    method: 'POST',
    body: payload,
    signal: options.signal,
    fetcher: options.fetcher,
  });

  if (!isLeadSuccessResponse(response)) {
    throw new ApiRequestError(
      'unexpected_response',
      apiErrorMessages.unexpected_response,
      200,
    );
  }

  return response;
};
