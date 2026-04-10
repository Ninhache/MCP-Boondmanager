import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BillingDetailAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeActionTool,
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const BILLING_DETAILS_CONFIG = {
  path: "/billing-details",
  resourceType: "billingdetail",
} as const;

@Injectable()
export class BillingDetailsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_billing_details",
    description:
      "Récupère la liste paginée des détails de facturation (lignes facturables). " +
      "Exemples : « liste les lignes de facturation », « qu'est-ce qui est facturable ? »",
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
  async listBillingDetails({
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

    return executeListTool<BillingDetailAttributes>(
      this.boond,
      {
        path: BILLING_DETAILS_CONFIG.path,
        attributeKeys: ["name", "contact", "address1"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_billing_detail",
    description: "Récupère les détails d'une ligne de facturation par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la ligne de facturation"),
    }),
  })
  async getBillingDetail({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<BillingDetailAttributes>>(
        `/billing-details/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_billing_detail",
    description: "Crée une nouvelle ligne de facturation.",
    parameters: z.object({
      name: z.string().describe("Nom / identification"),
      contact: z.string().optional().describe("Contact associé"),
      address1: z.string().optional().describe("Ligne d'adresse 1"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createBillingDetail({
    name,
    contact,
    address1,
  }: {
    name: string;
    contact?: string;
    address1?: string;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (contact !== undefined) attributes.contact = contact;
    if (address1 !== undefined) attributes.address1 = address1;

    return executeCreateTool(this.boond, BILLING_DETAILS_CONFIG, attributes);
  }

  @Tool({
    name: "update_billing_detail",
    description: "Met à jour une ligne de facturation existante.",
    parameters: z.object({
      id: z.number().describe("ID de la ligne"),
      name: z.string().optional().describe("Nouveau nom"),
      contact: z.string().optional().describe("Nouveau contact"),
      address1: z.string().optional().describe("Nouvelle adresse ligne 1"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateBillingDetail({
    id,
    name,
    contact,
    address1,
  }: {
    id: number;
    name?: string;
    contact?: string;
    address1?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (contact !== undefined) attributes.contact = contact;
    if (address1 !== undefined) attributes.address1 = address1;

    return executeUpdateTool(this.boond, BILLING_DETAILS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_billing_detail",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une ligne de facturation. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la ligne à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteBillingDetail({ id }: { id: number }) {
    return executeDeleteTool(this.boond, BILLING_DETAILS_CONFIG, id);
  }

  @Tool({
    name: "analyze_billing_details",
    description:
      "Lance une analyse globale des détails de facturation. " +
      "Endpoint spécial qui déclenche un job d'analyse asynchrone côté Boond.",
    parameters: z.object({}),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async analyzeBillingDetails() {
    return executeActionTool(
      this.boond,
      "/billing-details/analyze",
      "Billing details analysis started",
    );
  }
}
