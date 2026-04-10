export const DEFAULT_PAGE_SIZE = "25";

/**
 * Max items to fetch across all pages when fetchAll is true.
 * Prevents blowing up the LLM context with huge datasets.
 * Configurable via BOOND_MAX_RESULTS env var.
 */
export const MAX_FETCH_ALL_RESULTS = Number(process.env.BOOND_MAX_RESULTS ?? 500);
