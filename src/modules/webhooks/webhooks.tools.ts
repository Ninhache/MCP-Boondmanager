import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, WebhookAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import {
  executeCreateTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const WEBHOOKS_CONFIG = {
  path: "/webhooks",
  resourceType: "webhook",
} as const;

const WEBHOOK_EVENT_TYPES = ["create", "update", "delete"] as const;

const webhookEventSchema = z.object({
  type: z.enum(WEBHOOK_EVENT_TYPES).describe("Type d'événement déclencheur"),
  entity: z
    .string()
    .describe(
      "Entité concernée (ex: candidate, resource, project, invoice, opportunity, action, ...)",
    ),
});

@Injectable()
export class WebhooksTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_webhooks",
    description:
      "Récupère la liste des webhooks configurés pour les automations externes. " +
      "Exemples : « liste les webhooks », « quels webhooks sont actifs ? »",
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
  async listWebhooks({
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

    return executeListTool<WebhookAttributes>(
      this.boond,
      {
        path: WEBHOOKS_CONFIG.path,
        attributeKeys: ["name", "url", "description"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_webhook",
    description: "Récupère les détails d'un webhook par son ID (URL, événements, description).",
    parameters: z.object({
      id: z.number().describe("ID du webhook"),
    }),
  })
  async getWebhook({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<WebhookAttributes>>(`/webhooks/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_webhook",
    description:
      "Crée un nouveau webhook pour déclencher une automation externe sur un événement Boond " +
      "(ex: notifier un service externe quand une facture est créée).",
    parameters: z.object({
      name: z.string().describe("Nom du webhook"),
      url: z.string().describe("URL appelée par Boond lors du déclenchement"),
      description: z.string().optional().describe("Description du webhook"),
      events: z
        .array(webhookEventSchema)
        .optional()
        .describe("Liste des événements qui déclenchent ce webhook"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createWebhook({
    name,
    url,
    description,
    events,
  }: {
    name: string;
    url: string;
    description?: string;
    events?: { type: (typeof WEBHOOK_EVENT_TYPES)[number]; entity: string }[];
  }) {
    const attributes: Record<string, unknown> = { name, url };
    if (description !== undefined) attributes.description = description;
    if (events !== undefined) attributes.events = events;
    return executeCreateTool(this.boond, WEBHOOKS_CONFIG, attributes);
  }

  @Tool({
    name: "update_webhook",
    description: "Met à jour un webhook existant (URL, événements, description).",
    parameters: z.object({
      id: z.number().describe("ID du webhook"),
      name: z.string().optional().describe("Nouveau nom"),
      url: z.string().optional().describe("Nouvelle URL"),
      description: z.string().optional().describe("Nouvelle description"),
      events: z
        .array(webhookEventSchema)
        .optional()
        .describe("Nouvelle liste d'événements (remplace l'existante)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateWebhook({
    id,
    name,
    url,
    description,
    events,
  }: {
    id: number;
    name?: string;
    url?: string;
    description?: string;
    events?: { type: (typeof WEBHOOK_EVENT_TYPES)[number]; entity: string }[];
  }) {
    const attributes: Record<string, unknown> = {};
    if (name !== undefined) attributes.name = name;
    if (url !== undefined) attributes.url = url;
    if (description !== undefined) attributes.description = description;
    if (events !== undefined) attributes.events = events;
    return executeUpdateTool(this.boond, WEBHOOKS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_webhook",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un webhook. Les automations associées cesseront.",
    parameters: z.object({
      id: z.number().describe("ID du webhook à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteWebhook({ id }: { id: number }) {
    return executeDeleteTool(this.boond, WEBHOOKS_CONFIG, id);
  }
}
