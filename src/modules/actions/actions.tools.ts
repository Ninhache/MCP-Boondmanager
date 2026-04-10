import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { ActionAttributes, BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const ACTIONS_WRITE_CONFIG = { path: "/actions", resourceType: "action" } as const;

@Injectable()
export class ActionsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_actions",
    description:
      "Récupère la liste paginée des actions commerciales. " +
      "Exemples : « quelles sont les actions récentes ? », « liste les actions en cours »",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
      fetchAll: z
        .boolean()
        .optional()
        .describe(
          "Si true, récupère toutes les pages jusqu'à la limite de sécurité (ignore page/pageSize)",
        ),
    }),
  })
  async listActions({
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

    return executeListTool<ActionAttributes>(
      this.boond,
      {
        path: "/actions",
        attributeKeys: ["name", "state", "startDate", "endDate", "typeOf"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_action",
    description: "Récupère les informations détaillées d'une action commerciale par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'action commerciale dans Boond"),
    }),
  })
  async getAction({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ActionAttributes>>(`/actions/${id}`);
      const formatted = formatDetail(data);
      return { content: [toTextContent(formatted)] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_action",
    description:
      "Crée une nouvelle action commerciale dans BoondManager. " +
      "Exemples : « crée une action de rappel pour demain », « log une action commerciale ».",
    parameters: z.object({
      title: z.string().describe("Titre de l'action"),
      typeOf: z.number().describe("Type d'action (code numérique Boond)"),
      comment: z.string().optional().describe("Commentaire / description"),
      date: z.string().optional().describe("Date de l'action (ISO 8601)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createAction({
    title,
    typeOf,
    comment,
    date,
  }: {
    title: string;
    typeOf: number;
    comment?: string;
    date?: string;
  }) {
    const attributes: Record<string, unknown> = { title, typeOf };
    if (comment !== undefined) attributes.comment = comment;
    if (date !== undefined) attributes.date = date;

    return executeCreateTool(this.boond, ACTIONS_WRITE_CONFIG, attributes);
  }

  @Tool({
    name: "update_action",
    description:
      "Met à jour une action commerciale existante. " + "Seuls les champs fournis seront modifiés.",
    parameters: z.object({
      id: z.number().describe("ID de l'action à modifier"),
      title: z.string().optional().describe("Nouveau titre"),
      comment: z.string().optional().describe("Nouveau commentaire"),
      date: z.string().optional().describe("Nouvelle date (ISO 8601)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateAction({
    id,
    title,
    comment,
    date,
  }: {
    id: number;
    title?: string;
    comment?: string;
    date?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (comment !== undefined) attributes.comment = comment;
    if (date !== undefined) attributes.date = date;

    return executeUpdateTool(this.boond, ACTIONS_WRITE_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_action",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une action commerciale. " +
      "Cette opération est irréversible. Confirmer avant d'utiliser.",
    parameters: z.object({
      id: z.number().describe("ID de l'action à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteAction({ id }: { id: number }) {
    return executeDeleteTool(this.boond, ACTIONS_WRITE_CONFIG, id);
  }
}
