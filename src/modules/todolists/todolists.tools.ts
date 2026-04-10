import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, TodolistAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const TODOLISTS_CONFIG = {
  path: "/todolists",
  resourceType: "todolist",
} as const;

@Injectable()
export class TodolistsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_todolists",
    description:
      "Récupère la liste des to-do lists. " +
      "Exemples : « liste mes to-do lists », « quelles listes de tâches ? »",
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
  async listTodolists({
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

    return executeListTool<TodolistAttributes>(
      this.boond,
      {
        path: TODOLISTS_CONFIG.path,
        attributeKeys: ["name", "state"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_todolist",
    description: "Récupère les détails d'une to-do list par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la to-do list"),
    }),
  })
  async getTodolist({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<TodolistAttributes>>(
        `/todolists/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_todolist",
    description: "Crée une nouvelle to-do list.",
    parameters: z.object({
      name: z.string().describe("Nom de la to-do list"),
      informationComments: z.string().optional().describe("Description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createTodolist({
    name,
    informationComments,
  }: {
    name: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = { name };
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeCreateTool(this.boond, TODOLISTS_CONFIG, attributes);
  }

  @Tool({
    name: "update_todolist",
    description: "Met à jour une to-do list existante.",
    parameters: z.object({
      id: z.number().describe("ID de la to-do list"),
      name: z.string().optional().describe("Nouveau nom"),
      informationComments: z.string().optional().describe("Nouvelle description"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateTodolist({
    id,
    name,
    informationComments,
  }: {
    id: number;
    name?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, TODOLISTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_todolist",
    description: "⚠️ DESTRUCTIF — Supprime définitivement une to-do list. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la to-do list à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteTodolist({ id }: { id: number }) {
    return executeDeleteTool(this.boond, TODOLISTS_CONFIG, id);
  }
}
