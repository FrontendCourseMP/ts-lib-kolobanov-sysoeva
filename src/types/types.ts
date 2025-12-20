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
  params: Record<string, string | number>;
}

/** Типизация ошибок HTTP */

export class HttpError extends Error {
  status: number;
  statusText: string;
  url: string;

  constructor(status: number, statusText: string, url: string) {
    super(`Request failed with status ${status}: ${statusText}`);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}