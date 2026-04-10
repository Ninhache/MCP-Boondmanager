import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ThreadAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const THREADS_CONFIG = {
  path: "/threads",
  resourceType: "thread",
} as const;

@Injectable()
export class ThreadsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_threads",
    description:
      "Récupère la liste des fils de discussion / commentaires. " +
      "Exemples : « liste les threads », « quels commentaires récents ? »",
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
  async listThreads({
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

    return executeListTool<ThreadAttributes>(
      this.boond,
      {
        path: THREADS_CONFIG.path,
        attributeKeys: ["title", "creationDate"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_thread",
    description: "Récupère les détails d'un fil de discussion par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du fil de discussion"),
    }),
  })
  async getThread({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ThreadAttributes>>(`/threads/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_threads_default",
    description: "Récupère le template par défaut pour créer un nouveau fil de discussion.",
    parameters: z.object({}),
  })
  async getThreadsDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<ThreadAttributes>>("/threads/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_thread",
    description: "Crée un nouveau fil de discussion (titre + message initial).",
    parameters: z.object({
      title: z.string().describe("Titre du fil"),
      message: z.string().optional().describe("Message initial"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createThread({ title, message }: { title: string; message?: string }) {
    const attributes: Record<string, unknown> = { title };
    if (message !== undefined) attributes.message = message;
    return executeCreateTool(this.boond, THREADS_CONFIG, attributes);
  }

  @Tool({
    name: "update_thread",
    description: "Met à jour un fil de discussion existant.",
    parameters: z.object({
      id: z.number().describe("ID du fil"),
      title: z.string().optional().describe("Nouveau titre"),
      message: z.string().optional().describe("Nouveau message"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateThread({ id, title, message }: { id: number; title?: string; message?: string }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (message !== undefined) attributes.message = message;
    return executeUpdateTool(this.boond, THREADS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_thread",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un fil de discussion. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du fil à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteThread({ id }: { id: number }) {
    return executeDeleteTool(this.boond, THREADS_CONFIG, id);
  }
}
