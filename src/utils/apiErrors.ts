import type { ApiErrorCategory } from '../types/api';

export class ApiRequestError extends Error {
  constructor(
    public readonly category: ApiErrorCategory,
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

export const apiErrorMessages: Record<ApiErrorCategory, string> = {
  validation_error:
    'Please review your details and correct the highlighted information.',
  network_error:
    'We could not reach the submission service. Please check your connection and try again.',
  timeout_error:
    'The request took too long. Please confirm the result before trying again.',
  cancelled: 'The submission was cancelled.',
  server_error:
    'The service is temporarily unavailable. Please try again later.',
  upstream_service_error:
    'We cannot accept the submission right now. Please try again later.',
  unexpected_response:
    'We could not confirm the submission. Please try again later.',
  configuration_error:
    'The submission service is not configured. Please contact us by email.',
};

export const toApiRequestError = (error: unknown): ApiRequestError => {
  if (error instanceof ApiRequestError) return error;
  if (error instanceof DOMException && error.name === 'AbortError') {
    return new ApiRequestError('cancelled', apiErrorMessages.cancelled);
  }
  return new ApiRequestError('network_error', apiErrorMessages.network_error);
};
