export const DEFAULT_PAGE_SIZE = "25";

/**
 * Max items to fetch across all pages when fetchAll is true.
 * Prevents blowing up the LLM context with huge datasets.
 * Configurable via BOOND_MAX_RESULTS env var.
 */
function parseMaxResults(): number {
  const raw = process.env.BOOND_MAX_RESULTS;
  if (!raw) return 500;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid BOOND_MAX_RESULTS "${raw}": must be a positive integer`);
  }
  return parsed;
}

export const MAX_FETCH_ALL_RESULTS = parseMaxResults();
