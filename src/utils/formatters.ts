/**
 * Formatters to transform verbose JSON:API responses into
 * concise payloads that are token-efficient for LLMs.
 */

import type { JsonApiResource, JsonApiResponse } from "../boond/types.js";

/**
 * Extract a flat summary from a JSON:API resource.
 * Merges id + selected attributes into a plain object.
 */
function flattenResource(
  resource: JsonApiResource,
  attributeKeys?: string[],
): Record<string, unknown> {
  const result: Record<string, unknown> = { id: resource.id, type: resource.type };

  if (attributeKeys) {
    for (const key of attributeKeys) {
      if (key in resource.attributes) {
        result[key] = resource.attributes[key];
      }
    }
  } else {
    Object.assign(result, resource.attributes);
  }

  return result;
}

/**
 * Format a JSON:API list response into a concise structure.
 */
export function formatList(
  response: JsonApiResponse,
  attributeKeys?: string[],
): { total: number | null; page_count: number | null; items: Record<string, unknown>[] } {
  const items = Array.isArray(response.data) ? response.data : [response.data];

  return {
    total: response.meta?.totals?.rows ?? null,
    page_count: response.meta?.totals?.pages ?? null,
    items: items.map((r) => flattenResource(r, attributeKeys)),
  };
}

/**
 * Format a single JSON:API resource response.
 */
export function formatDetail(response: JsonApiResponse): Record<string, unknown> {
  const resource = Array.isArray(response.data) ? response.data[0] : response.data;
  if (!resource) return {};
  return flattenResource(resource);
}

/**
 * Serialize any value to a text content block for MCP tool responses.
 */
export function toTextContent(data: unknown): { type: "text"; text: string } {
  return { type: "text" as const, text: JSON.stringify(data, null, 2) };
}
