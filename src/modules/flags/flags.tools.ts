import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, FlagAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const FLAGS_CONFIG = {
  path: "/flags",
  resourceType: "flag",
} as const;

@Injectable()
export class FlagsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_flags",
    description:
      "Récupère la liste paginée des tags/flags personnalisables. " +
      "Exemples : « liste les tags », « quels flags existent ? »",
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
  async listFlags({
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

    return executeListTool<FlagAttributes>(
      this.boond,
      {
        path: FLAGS_CONFIG.path,
        attributeKeys: ["name"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_flag",
    description: "Récupère les détails d'un flag/tag par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du flag"),
    }),
  })
  async getFlag({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<FlagAttributes>>(`/flags/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_flag",
    description: "Crée un nouveau flag/tag personnalisable.",
    parameters: z.object({
      name: z.string().describe("Nom du flag"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createFlag({ name }: { name: string }) {
    return executeCreateTool(this.boond, FLAGS_CONFIG, { name });
  }

  @Tool({
    name: "update_flag",
    description: "Met à jour un flag/tag existant.",
    parameters: z.object({
      id: z.number().describe("ID du flag"),
      name: z.string().optional().describe("Nouveau nom"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateFlag({ id, name }: { id: number; name?: string }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    return executeUpdateTool(this.boond, FLAGS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_flag",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un flag/tag. Les ressources taggées perdront ce tag.",
    parameters: z.object({
      id: z.number().describe("ID du flag à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteFlag({ id }: { id: number }) {
    return executeDeleteTool(this.boond, FLAGS_CONFIG, id);
  }
}
