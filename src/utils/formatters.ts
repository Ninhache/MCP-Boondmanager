/**
 * Formatters to transform verbose JSON:API responses into
 * concise payloads that are token-efficient for LLMs.
 */

import type { JsonApiResource, JsonApiResponse } from "../modules/boond/boond.types.js";

/** Spec for resolving a relationship into inline attributes. */
export interface RelationshipSpec {
  /** Name of the relationship key in the JSON:API resource */
  name: string;
  /** Attributes to extract from the resolved included resource */
  attributeKeys: string[];
}

/**
 * Resolve a to-one relationship from the `included` section of a JSON:API response.
 * Only handles to-one relationships. Returns null for to-many (array) relationships.
 */
export function resolveRelationship(
  response: JsonApiResponse,
  resource: JsonApiResource,
  spec: RelationshipSpec,
): Record<string, unknown> | null {
  const rel = resource.relationships?.[spec.name];
  if (!rel?.data || !response.included?.length) return null;

  // Only handle to-one relationships; to-many are not supported
  if (Array.isArray(rel.data)) return null;
  const relData = rel.data;

  const included = response.included.find((r) => r.id === relData.id && r.type === relData.type);
  if (!included) return null;

  const result: Record<string, unknown> = {};
  for (const key of spec.attributeKeys) {
    if (key in included.attributes) {
      result[key] = included.attributes[key];
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

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
 * Optionally resolves relationships from the `included` section.
 */
export function formatDetail(
  response: JsonApiResponse,
  options?: {
    attributeKeys?: string[];
    relationships?: RelationshipSpec[];
  },
): Record<string, unknown> {
  const resource = Array.isArray(response.data) ? response.data[0] : response.data;
  if (!resource) return {};

  const result = flattenResource(resource, options?.attributeKeys);

  if (options?.relationships) {
    for (const spec of options.relationships) {
      const resolved = resolveRelationship(response, resource, spec);
      if (resolved) {
        result[spec.name] = resolved;
      }
    }
  }

  return result;
}

/**
 * Serialize any value to a text content block for MCP tool responses.
 */
export function toTextContent(data: unknown): { type: "text"; text: string } {
  return { type: "text" as const, text: JSON.stringify(data, null, 2) };
}
