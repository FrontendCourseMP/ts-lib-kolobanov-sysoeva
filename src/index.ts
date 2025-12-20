export { HttpError } from './types/types.js';
export type { HttpClientConfig, RequestOptions, HttpMethod } from './types/types.js';

import { HttpClient } from './client.js';
import { HttpClientConfig } from './types/types.js';

export function createHttpClient(config: HttpClientConfig) {
  return new HttpClient(config);
}