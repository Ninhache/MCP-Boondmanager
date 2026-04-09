/**
 * HTTP client wrapper for the BoondManager REST API.
 * Supports Basic Auth and JWT authentication modes.
 */

export interface BoondConfig {
  /** Base URL of the Boond API (e.g. https://ui.boondmanager.com/api) */
  baseUrl: string;
  /** Authentication mode */
  authMode: "basic" | "jwt";
  /** Basic Auth credentials */
  username?: string;
  password?: string;
  /** JWT Auth tokens */
  userToken?: string;
  clientToken?: string;
  clientKey?: string;
}

export class BoondApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Boond API error ${status} (${statusText}): ${body}`);
    this.name = "BoondApiError";
  }
}

export class BoondClient {
  private readonly config: BoondConfig;

  constructor(config: BoondConfig) {
    this.config = config;
    this.validateConfig();
  }

  private validateConfig(): void {
    if (this.config.authMode === "basic") {
      if (!this.config.username || !this.config.password) {
        throw new Error("Basic Auth requires BOOND_USERNAME and BOOND_PASSWORD");
      }
    } else if (this.config.authMode === "jwt") {
      if (!this.config.userToken || !this.config.clientToken || !this.config.clientKey) {
        throw new Error(
          "JWT Auth requires BOOND_USER_TOKEN, BOOND_CLIENT_TOKEN, and BOOND_CLIENT_KEY",
        );
      }
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.config.authMode === "basic") {
      const credentials = Buffer.from(`${this.config.username}:${this.config.password}`).toString(
        "base64",
      );
      headers.Authorization = `Basic ${credentials}`;
    } else if (this.config.authMode === "jwt") {
      // JWT generation would go here — for now we support passing a pre-generated token
      // via userToken as a bearer token placeholder
      headers.Authorization = `Bearer ${this.config.userToken}`;
    }

    return headers;
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.config.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  }

  private async request<T>(
    method: string,
    path: string,
    options?: {
      params?: Record<string, string>;
      body?: unknown;
    },
  ): Promise<T> {
    const url = this.buildUrl(path, options?.params);

    const init: RequestInit = {
      method,
      headers: this.getHeaders(),
    };

    if (options?.body) {
      init.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, init);

    if (!res.ok) {
      const body = await res.text();
      throw new BoondApiError(res.status, res.statusText, body);
    }

    return res.json() as Promise<T>;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>("GET", path, { params });
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, { body });
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("PUT", path, { body });
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("PATCH", path, { body });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}
