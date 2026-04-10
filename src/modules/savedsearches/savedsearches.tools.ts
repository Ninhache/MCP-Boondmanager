import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, SavedSearchAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const SAVEDSEARCHES_CONFIG = {
  path: "/savedsearches",
  resourceType: "savedsearch",
} as const;

@Injectable()
export class SavedSearchesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_savedsearches",
    description:
      "Récupère la liste des recherches sauvegardées de l'utilisateur. " +
      "Exemples : « mes recherches sauvegardées », « quels filtres j'ai enregistrés ? »",
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
  async listSavedSearches({
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

    return executeListTool<SavedSearchAttributes>(
      this.boond,
      {
        path: SAVEDSEARCHES_CONFIG.path,
        attributeKeys: ["name", "entity"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_savedsearch",
    description: "Récupère les détails d'une recherche sauvegardée par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la recherche sauvegardée"),
    }),
  })
  async getSavedSearch({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<SavedSearchAttributes>>(
        `/savedsearches/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_savedsearch",
    description: "Crée une nouvelle recherche sauvegardée (filtres + nom + entité cible).",
    parameters: z.object({
      name: z.string().describe("Nom de la recherche sauvegardée"),
      entity: z
        .string()
        .describe("Entité cible (ex: 'candidate', 'resource', 'project', 'opportunity')"),
      filters: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Filtres JSON à appliquer lors de l'exécution de la recherche"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createSavedSearch({
    name,
    entity,
    filters,
  }: {
    name: string;
    entity: string;
    filters?: Record<string, unknown>;
  }) {
    const attributes: Record<string, unknown> = { name, entity };
    if (filters !== undefined) attributes.filters = filters;
    return executeCreateTool(this.boond, SAVEDSEARCHES_CONFIG, attributes);
  }

  @Tool({
    name: "update_savedsearch",
    description: "Met à jour une recherche sauvegardée existante.",
    parameters: z.object({
      id: z.number().describe("ID de la recherche sauvegardée"),
      name: z.string().optional().describe("Nouveau nom"),
      filters: z
        .record(z.string(), z.unknown())
        .optional()
        .describe("Nouveaux filtres (remplace l'existant)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateSavedSearch({
    id,
    name,
    filters,
  }: {
    id: number;
    name?: string;
    filters?: Record<string, unknown>;
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (filters !== undefined) attributes.filters = filters;
    return executeUpdateTool(this.boond, SAVEDSEARCHES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_savedsearch",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une recherche sauvegardée. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la recherche à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteSavedSearch({ id }: { id: number }) {
    return executeDeleteTool(this.boond, SAVEDSEARCHES_CONFIG, id);
  }
}
