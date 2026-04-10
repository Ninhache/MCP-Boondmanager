/**
 * Helper types to extract attributes from generated Boond schemas.
 * These allow tools to use strongly-typed API responses while keeping
 * backward compatibility with the generic JsonApiResponse type.
 */

import type {
  SchemasAbsencesReportsSearchJson,
  SchemasAbsencesSearchJson,
  SchemasAccountsSearchJson,
  SchemasActionsSearchJson,
  SchemasAdvantagesProfileJson,
  SchemasAgenciesSearchJson,
  SchemasAlertsSearchJson,
  SchemasBankingTransactionsSearchJson,
  SchemasBillingDetailsSearchJson,
  SchemasBusinessUnitsSearchJson,
  SchemasCalendarsSearchJson,
  SchemasCandidatesSearchJson,
  SchemasCompaniesSearchJson,
  SchemasContactsSearchJson,
  SchemasContractsProfileJson,
  SchemasDashboardsSearchJson,
  SchemasDeliveriesProfileJson,
  SchemasDocumentsProfileJson,
  SchemasExpensesReportsSearchJson,
  SchemasExpensesSearchJson,
  SchemasFlagsSearchJson,
  SchemasInactivitiesProfileJson,
  SchemasInvoicesSearchJson,
  SchemasMarketplaceSearchJson,
  SchemasNotificationsSearchJson,
  SchemasOpportunitiesSearchJson,
  SchemasOrdersSearchJson,
  SchemasPaymentsSearchJson,
  SchemasPolesSearchJson,
  SchemasPositioningsSearchJson,
  SchemasProductsSearchJson,
  SchemasProjectsSearchJson,
  SchemasProviderInvoicesSearchJson,
  SchemasPurchasesSearchJson,
  SchemasResourcesSearchJson,
  SchemasRolesSearchJson,
  SchemasSavedsearchesSearchJson,
  SchemasTargetsProfileJson,
  SchemasTimesReportsSearchJson,
  SchemasTimesSearchJson,
  SchemasTodolistsSearchJson,
  SchemasValidationsSearchJson,
  SchemasWebhooksSearchJson,
} from "./boond-schemas.js";

/** Extract the attributes type from a generated search or profile schema */
type ExtractAttributes<T> = T extends { data: Array<infer Item> }
  ? Item extends { attributes?: infer A }
    ? Exclude<A, undefined>
    : never
  : T extends { data: { attributes?: infer A } }
    ? Exclude<A, undefined>
    : never;

// Core modules
export type ResourceAttributes = ExtractAttributes<SchemasResourcesSearchJson>;
export type CandidateAttributes = ExtractAttributes<SchemasCandidatesSearchJson>;
export type ProjectAttributes = ExtractAttributes<SchemasProjectsSearchJson>;
export type CompanyAttributes = ExtractAttributes<SchemasCompaniesSearchJson>;
export type OpportunityAttributes = ExtractAttributes<SchemasOpportunitiesSearchJson>;
export type AbsenceAttributes = ExtractAttributes<SchemasAbsencesSearchJson>;
export type ActionAttributes = ExtractAttributes<SchemasActionsSearchJson>;

// Commercial / financial
export type PositioningAttributes = ExtractAttributes<SchemasPositioningsSearchJson>;
export type PurchaseAttributes = ExtractAttributes<SchemasPurchasesSearchJson>;
export type InvoiceAttributes = ExtractAttributes<SchemasInvoicesSearchJson>;
export type OrderAttributes = ExtractAttributes<SchemasOrdersSearchJson>;
export type ExpenseAttributes = ExtractAttributes<SchemasExpensesSearchJson>;
export type ProductAttributes = ExtractAttributes<SchemasProductsSearchJson>;

// Organizational
export type AgencyAttributes = ExtractAttributes<SchemasAgenciesSearchJson>;
export type PoleAttributes = ExtractAttributes<SchemasPolesSearchJson>;
export type CalendarAttributes = ExtractAttributes<SchemasCalendarsSearchJson>;
export type DashboardAttributes = ExtractAttributes<SchemasDashboardsSearchJson>;

// Admin / system
export type NotificationAttributes = ExtractAttributes<SchemasNotificationsSearchJson>;
export type ValidationAttributes = ExtractAttributes<SchemasValidationsSearchJson>;
export type RoleAttributes = ExtractAttributes<SchemasRolesSearchJson>;

// Additional modules (phase 4)
export type TimeAttributes = ExtractAttributes<SchemasTimesSearchJson>;
export type PaymentAttributes = ExtractAttributes<SchemasPaymentsSearchJson>;
export type AccountAttributes = ExtractAttributes<SchemasAccountsSearchJson>;
export type ContactAttributes = ExtractAttributes<SchemasContactsSearchJson>;

// Phase 5: workflow report modules
export type AbsencesReportAttributes = ExtractAttributes<SchemasAbsencesReportsSearchJson>;
export type BusinessUnitAttributes = ExtractAttributes<SchemasBusinessUnitsSearchJson>;
export type ExpensesReportAttributes = ExtractAttributes<SchemasExpensesReportsSearchJson>;
export type BillingDetailAttributes = ExtractAttributes<SchemasBillingDetailsSearchJson>;
export type TimesReportAttributes = ExtractAttributes<SchemasTimesReportsSearchJson>;
export type ProviderInvoiceAttributes = ExtractAttributes<SchemasProviderInvoicesSearchJson>;
export type WebhookAttributes = ExtractAttributes<SchemasWebhooksSearchJson>;
export type DeliveryAttributes = ExtractAttributes<SchemasDeliveriesProfileJson>;
export type ContractAttributes = ExtractAttributes<SchemasContractsProfileJson>;
export type FlagAttributes = ExtractAttributes<SchemasFlagsSearchJson>;
export type InactivityAttributes = ExtractAttributes<SchemasInactivitiesProfileJson>;
export type AdvantageAttributes = ExtractAttributes<SchemasAdvantagesProfileJson>;
export type AlertAttributes = ExtractAttributes<SchemasAlertsSearchJson>;
export type BankingTransactionAttributes = ExtractAttributes<SchemasBankingTransactionsSearchJson>;
export type TargetAttributes = ExtractAttributes<SchemasTargetsProfileJson>;
export type MarketplaceAttributes = ExtractAttributes<SchemasMarketplaceSearchJson>;
export type DocumentAttributes = ExtractAttributes<SchemasDocumentsProfileJson>;
export type SavedSearchAttributes = ExtractAttributes<SchemasSavedsearchesSearchJson>;
export type TodolistAttributes = ExtractAttributes<SchemasTodolistsSearchJson>;

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
