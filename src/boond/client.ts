/**
 * HTTP client wrapper for the BoondManager REST API.
 * Supports Basic Auth and JWT App authentication modes.
 *
 * JWT implementation matches Pit.Portal.Boond and PBI-proxy:
 * - Header: X-Jwt-App-Boondmanager (normal) or X-Jwt-Client-Boondmanager (god)
 * - Payload: { userToken, appToken, time, mode } or { userToken, clientToken, time, mode }
 * - Signed with HMAC-SHA256
 */

import { createHmac } from "node:crypto";

function base64UrlEncode(input: string): string {
  return Buffer.from(input).toString("base64url");
}

/**
 * Generate a Boond JWT token signed with HMAC-SHA256.
 * Follows the exact format used in Pit.Portal.Boond/lib/boond-api.ts.
 */
function jwtEncode(payload: Record<string, unknown>, key: string): string {
  const header = { typ: "JWT", alg: "HS256" };
  const segments = [
    base64UrlEncode(JSON.stringify(header)),
    base64UrlEncode(JSON.stringify(payload)),
  ];
  const signingInput = segments.join(".");
  const signature = createHmac("sha256", key).update(signingInput).digest("base64url");
  return `${signingInput}.${signature}`;
}

export type JwtMode = "normal" | "god";

export interface BoondConfig {
  /** Base URL of the Boond API (e.g. https://ui.boondmanager.com/api) */
  baseUrl: string;
  /** Authentication mode */
  authMode: "basic" | "jwt";
  /** Basic Auth credentials */
  username?: string;
  password?: string;
  /** JWT Auth — user token (Mon compte > Configuration > Sécurité) */
  userToken?: string;
  /** JWT Auth — app token (from Boond OAuth install / signed request) */
  appToken?: string;
  /** JWT Auth — app key used to sign normal-mode JWTs */
  appKey?: string;
  /** JWT Auth — client token for god-mode (Admin > Espace développeur) */
  clientToken?: string;
  /** JWT Auth — signing key for god-mode JWTs */
  godClientToken?: string;
  /** JWT mode: "normal" for user-scoped, "god" for admin/elevated */
  jwtMode?: JwtMode;
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
      if (!this.config.userToken || !this.config.appToken || !this.config.appKey) {
        throw new Error("JWT Auth requires BOOND_USER_TOKEN, BOOND_APP_TOKEN, and BOOND_APP_KEY");
      }
      const mode = this.config.jwtMode ?? "normal";
      if (mode === "god" && (!this.config.clientToken || !this.config.godClientToken)) {
        throw new Error("JWT god mode requires BOOND_CLIENT_TOKEN and BOOND_GOD_CLIENT_TOKEN");
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
      const mode = this.config.jwtMode ?? "normal";

      if (mode === "god" && this.config.clientToken && this.config.godClientToken) {
        const payload = {
          userToken: this.config.userToken,
          clientToken: this.config.clientToken,
          time: Math.floor(Date.now() / 1000),
          mode: "god",
        };
        const token = jwtEncode(payload, this.config.godClientToken);
        headers["X-Jwt-Client-Boondmanager"] = token;
      } else if (this.config.appToken && this.config.appKey) {
        const payload = {
          userToken: this.config.userToken,
          appToken: this.config.appToken,
          time: Math.floor(Date.now() / 1000),
          mode: "normal",
        };
        const token = jwtEncode(payload, this.config.appKey);
        headers["X-Jwt-App-Boondmanager"] = token;
      }
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
