/**
 * Generic retry utility with exponential backoff.
 *
 * Supports pluggable retry predicates and per-error delay overrides
 * (e.g. Retry-After from HTTP 429 responses).
 */

export interface RetryOptions {
  /** Maximum number of retry attempts after the first failure. Default: 3 */
  maxRetries?: number;
  /** Initial delay in milliseconds before the first retry. Default: 1000 */
  initialDelayMs?: number;
  /** Maximum delay cap in milliseconds. Default: 30000 */
  maxDelayMs?: number;
  /**
   * Predicate controlling whether a given error is retryable.
   * Return true to retry, false to rethrow immediately.
   * Default: always retry.
   */
  shouldRetry?: (error: unknown) => boolean;
  /**
   * Called before each sleep, after shouldRetry returns true.
   * Useful for logging / telemetry.
   *
   * @param attempt - 1-based attempt number that just failed
   * @param delayMs - how long (ms) we will sleep before the next attempt
   * @param error   - the error that triggered the retry
   */
  onRetry?: (attempt: number, delayMs: number, error: unknown) => void;
}

/**
 * Errors that carry an explicit Retry-After delay should implement this
 * interface. `withRetry` checks for `retryAfterMs` on the thrown error and
 * uses it in place of the computed exponential delay when present.
 */
export interface RetryableError {
  retryAfterMs?: number;
}

/**
 * Execute `fn`, retrying on retryable errors with exponential backoff.
 *
 * Delay formula: `Math.min(initialDelayMs * 2^attempt, maxDelayMs)`
 * If the thrown error has a `retryAfterMs` property, that value overrides
 * the computed delay.
 *
 * @param fn      - async factory to invoke (and retry)
 * @param options - retry configuration
 * @returns the resolved value of `fn` on success
 * @throws the last error after all retries are exhausted, or the first
 *         non-retryable error immediately
 */
export async function withRetry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T> {
  const maxRetries = options?.maxRetries ?? 3;
  const initialDelayMs = options?.initialDelayMs ?? 1000;
  const maxDelayMs = options?.maxDelayMs ?? 30000;
  const shouldRetry = options?.shouldRetry ?? (() => true);
  const onRetry = options?.onRetry;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Never retry on the last attempt or if the predicate says no.
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Prefer an explicit Retry-After delay embedded on the error.
      const errObj = error !== null && typeof error === "object" ? error : null;
      const retryAfterMs =
        errObj !== null &&
        "retryAfterMs" in errObj &&
        typeof (errObj as RetryableError).retryAfterMs === "number"
          ? (errObj as RetryableError).retryAfterMs
          : undefined;

      const computedDelay = Math.min(initialDelayMs * 2 ** attempt, maxDelayMs);
      const delayMs = retryAfterMs !== undefined ? retryAfterMs : computedDelay;

      onRetry?.(attempt + 1, delayMs, error);

      await sleep(delayMs);
    }
  }

  // Unreachable — the loop always throws before exhausting attempts,
  // but TypeScript needs this to satisfy the return type.
  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
