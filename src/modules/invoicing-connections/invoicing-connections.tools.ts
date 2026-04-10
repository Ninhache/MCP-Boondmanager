import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, InvoicingConnectionAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const INVOICING_CONNECTIONS_CONFIG = {
  path: "/invoicing-connections",
  resourceType: "invoicingconnection",
} as const;

@Injectable()
export class InvoicingConnectionsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_invoicing_connections",
    description:
      "Récupère la liste des connecteurs de facturation externes configurés " +
      "(intégrations avec des systèmes comptables tiers).",
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
  async listInvoicingConnections({
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

    return executeListTool<InvoicingConnectionAttributes>(
      this.boond,
      {
        path: INVOICING_CONNECTIONS_CONFIG.path,
        attributeKeys: ["name", "typeOf", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_invoicing_connection",
    description: "Récupère les détails d'un connecteur de facturation par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du connecteur"),
    }),
  })
  async getInvoicingConnection({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<InvoicingConnectionAttributes>>(
        `/invoicing-connections/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_invoicing_connection",
    description:
      "Crée un nouveau connecteur de facturation externe. " +
      "Les paramètres dépendent du type de connecteur.",
    parameters: z.object({
      name: z.string().describe("Nom du connecteur"),
      typeOf: z.number().optional().describe("Type de connecteur (ref. Boond)"),
      configuration: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Configuration JSON du connecteur"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createInvoicingConnection({
    name,
    typeOf,
    configuration,
  }: {
    name: string;
    typeOf?: number;
    configuration?: Record<string, unknown>;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (typeOf !== undefined) attributes.typeOf = typeOf;
    if (configuration !== undefined) attributes.configuration = configuration;
    return executeCreateTool(this.boond, INVOICING_CONNECTIONS_CONFIG, attributes);
  }

  @Tool({
    name: "update_invoicing_connection",
    description: "Met à jour un connecteur de facturation existant.",
    parameters: z.object({
      id: z.number().describe("ID du connecteur"),
      name: z.string().optional().describe("Nouveau nom"),
      configuration: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Nouvelle configuration (remplace l'existante)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateInvoicingConnection({
    id,
    name,
    configuration,
  }: {
    id: number;
    name?: string;
    configuration?: Record<string, unknown>;
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (configuration !== undefined) attributes.configuration = configuration;
    return executeUpdateTool(this.boond, INVOICING_CONNECTIONS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_invoicing_connection",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un connecteur de facturation. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du connecteur à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteInvoicingConnection({ id }: { id: number }) {
    return executeDeleteTool(this.boond, INVOICING_CONNECTIONS_CONFIG, id);
  }
}
