/**
 * Shared helper for paginated list tools.
 * Handles both single-page and fetchAll modes with consistent formatting.
 */

import type { BoondListResponse } from "../generated/helpers.js";
import type { BoondClient } from "../modules/boond/boond.client.js";
import { DEFAULT_PAGE_SIZE } from "./constants.js";
import { handleBoondError } from "./error-handler.js";
import { formatList, toTextContent } from "./formatters.js";
import { fetchAllPages } from "./pagination.js";

export interface ListToolParams {
  page?: number;
  pageSize?: number;
  fetchAll?: boolean;
  /** Extra query params (e.g. keywords, filters) */
  extraParams?: Record<string, string>;
}

export interface ListToolConfig {
  path: string;
  /**
   * Attribute keys to include in the formatted output.
   * Kept as string[] (not `keyof T`) because Boond schemas are sometimes incomplete —
   * runtime responses may contain attributes not declared in the JSON schema.
   */
  attributeKeys: string[];
}

/**
 * Execute a paginated list request against Boond and return an MCP tool response.
 * Handles both single-page (default) and fetchAll mode.
 */
export async function executeListTool<TAttributes extends Record<string, unknown>>(
  client: BoondClient,
  config: ListToolConfig,
  params: ListToolParams,
): Promise<{ content: { type: "text"; text: string }[]; isError?: true }> {
  const baseParams = { ...(params.extraParams ?? {}) };

  try {
    if (params.fetchAll) {
      const result = await fetchAllPages<TAttributes>(client, config.path, baseParams);
      const formatted = {
        total: result.total,
        fetched: result.items.length,
        truncated: result.truncated,
        items: result.items.map((r) => {
          const item: Record<string, unknown> = { id: r.id, type: r.type };
          for (const key of config.attributeKeys) {
            item[key] = r.attributes[key];
          }
          return item;
        }),
      };
      return { content: [toTextContent(formatted)] };
    }

    const queryParams: Record<string, string> = {
      ...baseParams,
      maxResults: String(params.pageSize ?? DEFAULT_PAGE_SIZE),
    };
    if (params.page != null) queryParams.page = String(params.page);

    const data = await client.get<BoondListResponse<TAttributes>>(config.path, queryParams);
    const formatted = formatList(data, config.attributeKeys);
    return { content: [toTextContent(formatted)] };
  } catch (error) {
    return handleBoondError(error);
  }
}
