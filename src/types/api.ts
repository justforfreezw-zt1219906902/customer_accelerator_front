export type ApiErrorCategory =
  | 'validation_error'
  | 'network_error'
  | 'timeout_error'
  | 'cancelled'
  | 'server_error'
  | 'upstream_service_error'
  | 'unexpected_response'
  | 'configuration_error';

export interface ApiErrorResponse {
  error: string;
}

export type RequestState = 'idle' | 'submitting' | 'succeeded' | 'failed';

export interface RequestOptions {
  signal?: AbortSignal;
}
