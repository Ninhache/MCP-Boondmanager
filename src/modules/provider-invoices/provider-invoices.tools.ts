import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ProviderInvoiceAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const PROVIDER_INVOICES_CONFIG = {
  path: "/provider-invoices",
  resourceType: "providerinvoice",
} as const;

@Injectable()
export class ProviderInvoicesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_provider_invoices",
    description:
      "Récupère la liste paginée des factures fournisseurs (accounts payable). " +
      "Exemples : « liste les factures fournisseurs », « quelles factures à payer ? »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
      fetchAll: z
        .boolean()
        .optional()
        .describe("Si true, récupère toutes les pages jusqu'à la limite de sécurité"),
    }),
  })
  async listProviderInvoices({
    page,
    pageSize,
    keywords,
    fetchAll,
  }: {
    page?: number;
    pageSize?: number;
    keywords?: string;
    fetchAll?: boolean;
  }) {
    const extraParams: Record<string, string> = {};
    if (keywords) extraParams.keywords = keywords;

    return executeListTool<ProviderInvoiceAttributes>(
      this.boond,
      {
        path: PROVIDER_INVOICES_CONFIG.path,
        attributeKeys: ["date", "reference", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_provider_invoice",
    description: "Récupère les détails d'une facture fournisseur par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la facture fournisseur"),
    }),
  })
  async getProviderInvoice({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ProviderInvoiceAttributes>>(
        `/provider-invoices/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_provider_invoice_default",
    description: "Récupère le template par défaut pour créer une nouvelle facture fournisseur.",
    parameters: z.object({}),
  })
  async getProviderInvoiceDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<ProviderInvoiceAttributes>>(
        "/provider-invoices/default",
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_provider_invoice_rights",
    description: "Récupère les permissions de l'utilisateur sur une facture fournisseur.",
    parameters: z.object({
      id: z.number().describe("ID de la facture fournisseur"),
    }),
  })
  async getProviderInvoiceRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/provider-invoices/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_provider_invoice_activity_expenses",
    description:
      "Récupère les frais d'activité (activity-expenses) liés à une facture fournisseur.",
    parameters: z.object({
      id: z.number().describe("ID de la facture fournisseur"),
    }),
  })
  async getProviderInvoiceActivityExpenses({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/provider-invoices/${id}/activity-expenses`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_provider_invoice",
    description: "Crée une nouvelle facture fournisseur.",
    parameters: z.object({
      reference: z.string().describe("Référence de la facture"),
      date: z.string().optional().describe("Date de la facture (ISO 8601)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createProviderInvoice({ reference, date }: { reference: string; date?: string }) {
    const attributes: Record<string, unknown> = { reference };
    if (date !== undefined) attributes.date = date;
    return executeCreateTool(this.boond, PROVIDER_INVOICES_CONFIG, attributes);
  }

  @Tool({
    name: "update_provider_invoice",
    description: "Met à jour une facture fournisseur existante.",
    parameters: z.object({
      id: z.number().describe("ID de la facture"),
      reference: z.string().optional().describe("Nouvelle référence"),
      date: z.string().optional().describe("Nouvelle date"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateProviderInvoice({
    id,
    reference,
    date,
  }: {
    id: number;
    reference?: string;
    date?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (reference !== undefined) attributes.reference = reference;
    if (date !== undefined) attributes.date = date;
    return executeUpdateTool(this.boond, PROVIDER_INVOICES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_provider_invoice",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une facture fournisseur. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la facture à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteProviderInvoice({ id }: { id: number }) {
    return executeDeleteTool(this.boond, PROVIDER_INVOICES_CONFIG, id);
  }
}
