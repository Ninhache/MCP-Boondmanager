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
  let page = 1;
  let total: number | null = null;
  let truncated = false;

  while (allItems.length < maxResults) {
    const params: Record<string, string> = {
      ...baseParams,
      page: String(page),
      maxResults: String(pageSize),
    };

    const response = await client.get<BoondListResponse<TAttributes>>(path, params);

    if (total === null) {
      total = response.meta?.totals?.rows ?? null;
    }

    const items = Array.isArray(response.data) ? response.data : [response.data];
    if (items.length === 0) break;

    // Cap at maxResults
    const remaining = maxResults - allItems.length;
    if (items.length > remaining) {
      allItems.push(...items.slice(0, remaining));
      truncated = true;
      break;
    }

    allItems.push(...items);
    page++;

    // Last page reached (fewer items than requested)
    if (items.length < pageSize) break;
  }

  // If we hit the cap but there's more data on the server
  if (total !== null && allItems.length < total && !truncated) {
    truncated = allItems.length < total;
  }

  return {
    items: allItems,
    total,
    truncated,
    pagesFetched: page - (truncated ? 0 : 1),
  };
}
