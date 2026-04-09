/**
 * Types for BoondManager JSON:API responses.
 * Boond follows the JSON:API spec: https://jsonapi.org/
 */

export interface JsonApiResource<TAttributes = Record<string, unknown>> {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: Record<string, JsonApiRelationship>;
}

export interface JsonApiRelationship {
  data: { id: string; type: string } | { id: string; type: string }[] | null;
}

export interface JsonApiResponse<TAttributes = Record<string, unknown>> {
  data: JsonApiResource<TAttributes> | JsonApiResource<TAttributes>[];
  included?: JsonApiResource[];
  meta?: {
    totals?: {
      rows?: number;
      pages?: number;
    };
    [key: string]: unknown;
  };
}

/** Common Boond resource attributes */
export interface ResourceAttributes {
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  phone?: string;
  state?: number;
  typeOf?: number;
}

export interface CandidateAttributes {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  state?: number;
  title?: string;
}

export interface ProjectAttributes {
  name: string;
  reference?: string;
  state?: number;
  startDate?: string;
  endDate?: string;
  typeOf?: number;
}

export interface CompanyAttributes {
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  country?: string;
  state?: number;
}
