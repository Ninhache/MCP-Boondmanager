/**
 * Pagination helper for Boond API list endpoints.
 * Fetches all pages up to a safety limit to prevent LLM context overflow.
 */

import type { BoondListResponse } from "../generated/helpers.js";
import type { BoondClient } from "../modules/boond/boond.client.js";
import { MAX_FETCH_ALL_RESULTS } from "./constants.js";

export interface FetchAllOptions {
  /** Items per page (default 100, capped at Boond's server limit) */
  pageSize?: number;
  /** Max total items to fetch across all pages (default MAX_FETCH_ALL_RESULTS) */
  maxResults?: number;
}

export interface FetchAllResult<T> {
  items: T[];
  total: number | null;
  truncated: boolean;
  pagesFetched: number;
}

/**
 * Fetch all pages of a Boond list endpoint, up to a safety cap.
 * Stops early if maxResults is reached or if fewer items than page size are returned.
 * Only supports list endpoints (response.data must be an array).
 */
export async function fetchAllPages<TAttributes = Record<string, unknown>>(
  client: BoondClient,
  path: string,
  baseParams: Record<string, string> = {},
  options: FetchAllOptions = {},
): Promise<FetchAllResult<BoondListResponse<TAttributes>["data"][number]>> {
  const pageSize = options.pageSize ?? 100;
  const maxResults = options.maxResults ?? MAX_FETCH_ALL_RESULTS;

  const allItems: Array<BoondListResponse<TAttributes>["data"][number]> = [];
  let currentPage = 0;
  let total: number | null = null;
  let truncated = false;

  while (allItems.length < maxResults) {
    currentPage++;
    const params: Record<string, string> = {
      ...baseParams,
      page: String(currentPage),
      maxResults: String(pageSize),
    };

    const response = await client.get<BoondListResponse<TAttributes>>(path, params);

    if (total === null) {
      total = response.meta?.totals?.rows ?? null;
    }

    // Guard: fetchAllPages is designed for list endpoints — reject non-array responses
    if (!Array.isArray(response.data)) {
      throw new Error(
        `fetchAllPages expected array response from ${path}, got ${typeof response.data}`,
      );
    }

    const items = response.data;
    if (items.length === 0) break;

    // Cap at maxResults — truncate mid-page if necessary
    const remaining = maxResults - allItems.length;
    if (items.length > remaining) {
      allItems.push(...items.slice(0, remaining));
      truncated = true;
      break;
    }

    allItems.push(...items);

    // Last page reached (fewer items than requested)
    if (items.length < pageSize) break;
  }

  // Server had more data than we fetched → mark as truncated
  if (!truncated && total !== null && allItems.length < total) {
    truncated = true;
  }

  return {
    items: allItems,
    total,
    truncated,
    pagesFetched: currentPage,
  };
}
