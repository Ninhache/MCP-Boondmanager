/**
 * Formatters to transform verbose JSON:API responses into
 * concise payloads that are token-efficient for LLMs.
 */

import type { BoondDetailResponse, BoondListResponse } from "../generated/helpers.js";

/** Spec for resolving a relationship into inline attributes. */
export interface RelationshipSpec {
  /** Name of the relationship key in the JSON:API resource */
  name: string;
  /** Attributes to extract from the resolved included resource */
  attributeKeys: string[];
}

interface JsonApiItem {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, unknown>;
}

/**
 * Resolve a to-one relationship from the `included` section.
 * Returns null for to-many (array) relationships or if unresolvable.
 */
export function resolveRelationship(
  included: Array<{ id: string; type: string; attributes: Record<string, unknown> }> | undefined,
  resource: JsonApiItem,
  spec: RelationshipSpec,
): Record<string, unknown> | null {
  const rel = resource.relationships?.[spec.name] as
    | { data: { id: string; type: string } | Array<{ id: string; type: string }> | null }
    | undefined;

  if (!rel?.data || !included?.length) return null;
  if (Array.isArray(rel.data)) return null;

  const relData = rel.data;
  const found = included.find((r) => r.id === relData.id && r.type === relData.type);
  if (!found) return null;

  const result: Record<string, unknown> = {};
  for (const key of spec.attributeKeys) {
    if (key in found.attributes) {
      result[key] = found.attributes[key];
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}

/**
 * Extract a flat summary from a JSON:API resource item.
 */
function flattenResource(resource: JsonApiItem, attributeKeys?: string[]): Record<string, unknown> {
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
  response: BoondListResponse,
  attributeKeys?: string[],
): { total: number | null; page_count: number | null; items: Record<string, unknown>[] } {
  const items = Array.isArray(response.data) ? response.data : [response.data];

  return {
    total: response.meta?.totals?.rows ?? null,
    page_count: response.meta?.totals?.pages ?? null,
    items: items.map((r) => flattenResource(r as JsonApiItem, attributeKeys)),
  };
}

/**
 * Format a single JSON:API resource response.
 * Optionally resolves relationships from the `included` section.
 */
export function formatDetail(
  response: BoondDetailResponse,
  options?: {
    attributeKeys?: string[];
    relationships?: RelationshipSpec[];
  },
): Record<string, unknown> {
  const data = response.data;
  const resource = (Array.isArray(data) ? data[0] : data) as JsonApiItem | undefined;
  if (!resource) return {};

  const result = flattenResource(resource, options?.attributeKeys);

  if (options?.relationships) {
    for (const spec of options.relationships) {
      const resolved = resolveRelationship(response.included, resource, spec);
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
