import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, BusinessUnitAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const BUSINESS_UNITS_CONFIG = {
  path: "/business-units",
  resourceType: "businessunit",
} as const;

@Injectable()
export class BusinessUnitsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_business_units",
    description:
      "Récupère la liste paginée des business units (centres de profit). " +
      "Exemples : « liste les BU », « quels sont nos centres de profit ? »",
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
  async listBusinessUnits({
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

    return executeListTool<BusinessUnitAttributes>(
      this.boond,
      {
        path: BUSINESS_UNITS_CONFIG.path,
        attributeKeys: ["name"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_business_unit",
    description: "Récupère les détails d'une business unit par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la business unit"),
    }),
  })
  async getBusinessUnit({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<BusinessUnitAttributes>>(
        `/business-units/${id}`,
      );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_business_unit_default",
    description:
      "Récupère le template par défaut pour créer une nouvelle business unit. " +
      "Utile pour connaître les champs avant un create.",
    parameters: z.object({}),
  })
  async getBusinessUnitDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<BusinessUnitAttributes>>(
          "/business-units/default",
        );
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_business_unit",
    description: "Crée une nouvelle business unit (centre de profit).",
    parameters: z.object({
      name: z.string().describe("Nom de la business unit"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createBusinessUnit({ name }: { name: string }) {
    return executeCreateTool(this.boond, BUSINESS_UNITS_CONFIG, { name });
  }

  @Tool({
    name: "update_business_unit",
    description: "Met à jour le nom d'une business unit existante.",
    parameters: z.object({
      id: z.number().describe("ID de la business unit"),
      name: z.string().optional().describe("Nouveau nom"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateBusinessUnit({ id, name }: { id: number; name?: string }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;

    return executeUpdateTool(this.boond, BUSINESS_UNITS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_business_unit",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une business unit. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la business unit à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteBusinessUnit({ id }: { id: number }) {
    return executeDeleteTool(this.boond, BUSINESS_UNITS_CONFIG, id);
  }
}
