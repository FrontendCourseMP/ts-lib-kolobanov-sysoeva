export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

// Сам запрос
export interface HttpClientConfig {
  baseURL: string;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  timeout: number;
}

// 
export interface RequestOptions {
  headers: Record<string, string>;
  retries: number;
  params: Record<string, string | number>;
  timeout: number;
}

/** Типизация ошибок HTTP */

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response?: any,
    public url?: string
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'HttpError';
  }

  /** Ошибки по кодам 400 и 500 */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }
}