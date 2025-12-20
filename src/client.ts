import {
  HttpClientConfig,
  HttpMethod,
  HttpError,
  RequestOptions,
} from './types/types.ts';

export class HttpClient {
  private readonly config: {
    baseURL: string;
    retries: number;
    retryDelay: number;
    headers: Record<string, string>;
    timeout: number;
  };

  constructor(userConfig: HttpClientConfig = {}) {
    this.config = {
      baseURL: userConfig.baseURL?.replace(/\/+$/, '') || '',
      retries: userConfig.retries ?? 0,
      retryDelay: userConfig.retryDelay ?? 500,
      headers: userConfig.headers ?? {},
      timeout: userConfig.timeout ?? 10_000,
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const url = this.config.baseURL ? `${this.config.baseURL}/${path.replace(/^\/+/, '')}` : path;

    if (!params || Object.keys(params).length === 0) return url;

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, String(value));
    }

    return `${url}?${searchParams.toString()}`;
  }

  private async request<T = any>(
    method: HttpMethod,
    url: string,
    options: {
      headers?: Record<string, string>;
      body?: any;
      params?: Record<string, string | number | boolean>;
    } = {}
  ): Promise<T> {
    const fullUrl = this.buildUrl(url, options.params);
    const headers = { ...this.config.headers, ...options.headers };

    let lastError: unknown = null;

    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      try {
        const fetchOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          signal: controller.signal,
        };

        if (options.body !== undefined) {
          fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(fullUrl, fetchOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new HttpError(response.status, response.statusText, fullUrl);
        }

        const data: T = await response.json();
        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        lastError = error;

        if (
          attempt < this.config.retries &&
          (error instanceof TypeError ||
            (error instanceof HttpError && error.status >= 500))
        ) {
          await new Promise((r) => setTimeout(r, this.config.retryDelay * (attempt + 1)));
          continue;
        }

        throw error;
      }
    }

    throw lastError;
  }

  // --- Public API ---

  get<T = any>(url: string, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('GET', url, options);
  }

  post<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('POST', url, { ...options, body: data });
  }

  put<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('PUT', url, { ...options, body: data });
  }

  patch<T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>('PATCH', url, { ...options, body: data });
  }
}