import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ConditionalFieldAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const CONDITIONAL_FIELDS_CONFIG = {
  path: "/conditional-fields",
  resourceType: "conditionalfield",
} as const;

@Injectable()
export class ConditionalFieldsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_conditional_fields",
    description:
      "Récupère la liste des champs conditionnels personnalisés configurés. " +
      "Exemples : « liste les champs conditionnels », « quels champs custom ? »",
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
  async listConditionalFields({
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

    return executeListTool<ConditionalFieldAttributes>(
      this.boond,
      {
        path: CONDITIONAL_FIELDS_CONFIG.path,
        attributeKeys: ["name", "entity"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_conditional_field",
    description: "Récupère les détails d'un champ conditionnel par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du champ conditionnel"),
    }),
  })
  async getConditionalField({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ConditionalFieldAttributes>>(
        `/conditional-fields/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_conditional_field_default",
    description: "Récupère le template par défaut pour créer un nouveau champ conditionnel.",
    parameters: z.object({}),
  })
  async getConditionalFieldDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<ConditionalFieldAttributes>>(
        "/conditional-fields/default",
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_conditional_field",
    description:
      "Crée un nouveau champ conditionnel personnalisé. " +
      "Utiliser get_conditional_field_default pour connaître la structure attendue.",
    parameters: z.object({
      name: z.string().describe("Nom du champ"),
      entity: z
        .string()
        .optional()
        .describe("Entité cible (ex: 'candidate', 'resource', 'project')"),
      configuration: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Configuration JSON du champ (types, valeurs, conditions, etc.)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createConditionalField({
    name,
    entity,
    configuration,
  }: {
    name: string;
    entity?: string;
    configuration?: Record<string, unknown>;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (entity !== undefined) attributes.entity = entity;
    if (configuration !== undefined) attributes.configuration = configuration;
    return executeCreateTool(this.boond, CONDITIONAL_FIELDS_CONFIG, attributes);
  }

  @Tool({
    name: "update_conditional_field",
    description: "Met à jour un champ conditionnel existant.",
    parameters: z.object({
      id: z.number().describe("ID du champ conditionnel"),
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
  async updateConditionalField({
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
    return executeUpdateTool(this.boond, CONDITIONAL_FIELDS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_conditional_field",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un champ conditionnel. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du champ à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteConditionalField({ id }: { id: number }) {
    return executeDeleteTool(this.boond, CONDITIONAL_FIELDS_CONFIG, id);
  }
}
