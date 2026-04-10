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
import { type RetryOptions, withRetry } from "../../utils/retry.js";

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
  /**
   * When the API responds with 429 Too Many Requests and a Retry-After
   * header, this field is set to the parsed delay in milliseconds.
   * `withRetry` reads this field to honour the server's requested backoff.
   */
  retryAfterMs?: number;

  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`Boond API error ${status} (${statusText}): ${body}`);
    this.name = "BoondApiError";
  }
}

/**
 * Determine whether a Boond API error is transient and worth retrying.
 *
 * Retryable:
 *   - 429 Too Many Requests (rate-limited — honour Retry-After)
 *   - 502, 503, 504 (gateway / upstream errors)
 *   - Network errors (no HTTP status — `fetch` threw before a response)
 *
 * Not retryable:
 *   - Other 4xx (client errors — retrying won't help)
 *   - Other 5xx (service errors not expected to be transient)
 */
export function shouldRetryBoondError(error: unknown): boolean {
  if (error instanceof BoondApiError) {
    const { status } = error;
    return status === 429 || status === 502 || status === 503 || status === 504;
  }
  // Non-BoondApiError means fetch threw (network failure) — retryable.
  return true;
}

/**
 * Parse BOOND_MAX_RETRIES from the environment.
 * Falls back to 3. Throws if the value is present but not a positive integer.
 */
function parseMaxRetries(): number {
  const raw = process.env.BOOND_MAX_RETRIES;
  if (!raw) return 3;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid BOOND_MAX_RETRIES "${raw}": must be a positive integer`);
  }
  return parsed;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: parseMaxRetries(),
  shouldRetry: shouldRetryBoondError,
};

/**
 * Parse the value of a `Retry-After` HTTP header into milliseconds.
 *
 * Accepts two formats defined by RFC 7231:
 *   - Delay-seconds: a non-negative integer (e.g. "60")
 *   - HTTP-date:     an RFC 1123 date string (e.g. "Wed, 21 Oct 2025 07:28:00 GMT")
 *
 * Returns undefined if the value cannot be parsed.
 */
function parseRetryAfterMs(value: string): number | undefined {
  const trimmed = value.trim();

  // Delay-seconds format: pure integer string.
  if (/^\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10) * 1000;
  }

  // HTTP-date format: parse via Date.
  const date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) {
    const delayMs = date.getTime() - Date.now();
    return delayMs > 0 ? delayMs : 0;
  }

  return undefined;
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

  /**
   * Execute a single HTTP request against the Boond API, throwing
   * `BoondApiError` on non-2xx responses.
   *
   * On 429 responses the `Retry-After` header is parsed (seconds or
   * HTTP-date) and attached to the error so `withRetry` can honour it.
   */
  private async rawRequest<T>(
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
      const apiError = new BoondApiError(res.status, res.statusText, body);

      // Parse Retry-After on 429 so the retry loop can honour the server's
      // requested backoff instead of using the computed exponential delay.
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        if (retryAfter !== null) {
          apiError.retryAfterMs = parseRetryAfterMs(retryAfter);
        }
      }

      throw apiError;
    }

    // Handle empty body responses (DELETE 204, etc.)
    if (res.status === 204 || res.headers.get("content-length") === "0") {
      return undefined as T;
    }
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return undefined as T;
    }

    return res.json() as Promise<T>;
  }

  private async request<T>(
    method: string,
    path: string,
    options?: {
      params?: Record<string, string>;
      body?: unknown;
    },
  ): Promise<T> {
    return withRetry(() => this.rawRequest<T>(method, path, options), DEFAULT_RETRY_OPTIONS);
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
