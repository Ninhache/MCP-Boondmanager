/**
 * Helper types to extract attributes from generated Boond schemas.
 * These allow tools to use strongly-typed API responses while keeping
 * backward compatibility with the generic JsonApiResponse type.
 */

import type {
  SchemasAbsencesSearchJson,
  SchemasActionsSearchJson,
  SchemasCandidatesSearchJson,
  SchemasCompaniesSearchJson,
  SchemasOpportunitiesSearchJson,
  SchemasProjectsSearchJson,
  SchemasResourcesSearchJson,
} from "./boond-schemas.js";

/** Extract the attributes type from a generated search schema */
type ExtractAttributes<T> = T extends { data: Array<infer Item> }
  ? Item extends { attributes: infer A }
    ? A
    : never
  : T extends { data: { attributes: infer A } }
    ? A
    : never;

export type ResourceAttributes = ExtractAttributes<SchemasResourcesSearchJson>;
export type CandidateAttributes = ExtractAttributes<SchemasCandidatesSearchJson>;
export type ProjectAttributes = ExtractAttributes<SchemasProjectsSearchJson>;
export type CompanyAttributes = ExtractAttributes<SchemasCompaniesSearchJson>;
export type OpportunityAttributes = ExtractAttributes<SchemasOpportunitiesSearchJson>;
export type AbsenceAttributes = ExtractAttributes<SchemasAbsencesSearchJson>;
export type ActionAttributes = ExtractAttributes<SchemasActionsSearchJson>;

/**
 * Generic typed Boond list response.
 * Use with BoondClient.get<BoondListResponse<ResourceAttributes>>("/resources")
 */
export interface BoondListResponse<TAttributes = Record<string, unknown>> {
  data: Array<{
    id: string;
    type: string;
    attributes: TAttributes;
    relationships?: Record<string, unknown>;
  }>;
  included?: Array<{
    id: string;
    type: string;
    attributes: Record<string, unknown>;
  }>;
  meta?: {
    totals?: {
      rows?: number;
      pages?: number;
    };
    [key: string]: unknown;
  };
}

/**
 * Generic typed Boond detail response.
 */
export interface BoondDetailResponse<TAttributes = Record<string, unknown>> {
  data: {
    id: string;
    type: string;
    attributes: TAttributes;
    relationships?: Record<string, unknown>;
  };
  included?: Array<{
    id: string;
    type: string;
    attributes: Record<string, unknown>;
  }>;
  meta?: Record<string, unknown>;
}
