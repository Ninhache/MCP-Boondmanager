import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, DeliveryAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import {
  executeActionTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const DELIVERIES_CONFIG = {
  path: "/deliveries",
  resourceType: "delivery",
} as const;

@Injectable()
export class DeliveriesTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "get_delivery",
    description:
      "Récupère les détails d'un bon de livraison par son ID (dates, montants, état, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async getDelivery({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<DeliveryAttributes>>(
        `/deliveries/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_delivery_rights",
    description: "Récupère les permissions de l'utilisateur sur un bon de livraison.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async getDeliveryRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/deliveries/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_delivery_advantages",
    description:
      "Récupère les avantages (tickets restaurant, mutuelle, etc.) liés à un bon de livraison.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async getDeliveryAdvantages({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/deliveries/${id}/advantages`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_delivery_order_download",
    description:
      "Récupère les métadonnées du bon de commande associé au bon de livraison (URL, format).",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async getDeliveryOrderDownload({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(
        `/deliveries/${id}/delivery-order-download`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_delivery_tasks",
    description: "Récupère les tâches associées à un bon de livraison.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async getDeliveryTasks({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/deliveries/${id}/tasks`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "download_delivery",
    description: "Télécharge le bon de livraison au format fichier (PDF).",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
  })
  async downloadDelivery({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/deliveries/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded delivery ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  // ─── Write tools ────────────────────────────────────────

  @Tool({
    name: "create_delivery",
    description:
      "Crée un nouveau bon de livraison rattaché à un projet. " +
      "Le projet cible est obligatoire (relationships.project).",
    parameters: z.object({
      projectId: z.string().describe("ID du projet (relationships.project.data.id)"),
      startDate: z.string().optional().describe("Date de début (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin (ISO 8601)"),
      title: z.string().optional().describe("Intitulé du bon de livraison"),
      averageDailyPriceExcludingTax: z.number().optional().describe("TJM HT"),
      numberOfDaysInvoicedOrQuantity: z.number().optional().describe("Nombre de jours facturés"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createDelivery({
    projectId,
    startDate,
    endDate,
    title,
    averageDailyPriceExcludingTax,
    numberOfDaysInvoicedOrQuantity,
    informationComments,
  }: {
    projectId: string;
    startDate?: string;
    endDate?: string;
    title?: string;
    averageDailyPriceExcludingTax?: number;
    numberOfDaysInvoicedOrQuantity?: number;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (startDate !== undefined) attributes.startDate = startDate;
      if (endDate !== undefined) attributes.endDate = endDate;
      if (title !== undefined) attributes.title = title;
      if (averageDailyPriceExcludingTax !== undefined)
        attributes.averageDailyPriceExcludingTax = averageDailyPriceExcludingTax;
      if (numberOfDaysInvoicedOrQuantity !== undefined)
        attributes.numberOfDaysInvoicedOrQuantity = numberOfDaysInvoicedOrQuantity;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body = {
        data: {
          type: "delivery",
          attributes,
          relationships: {
            project: { data: { id: projectId, type: "project" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(DELIVERIES_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created delivery with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_delivery",
    description: "Met à jour un bon de livraison existant.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      title: z.string().optional().describe("Nouvel intitulé"),
      averageDailyPriceExcludingTax: z.number().optional().describe("Nouveau TJM HT"),
      numberOfDaysInvoicedOrQuantity: z
        .number()
        .optional()
        .describe("Nouveau nombre de jours facturés"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateDelivery({
    id,
    startDate,
    endDate,
    title,
    averageDailyPriceExcludingTax,
    numberOfDaysInvoicedOrQuantity,
    informationComments,
  }: {
    id: number;
    startDate?: string;
    endDate?: string;
    title?: string;
    averageDailyPriceExcludingTax?: number;
    numberOfDaysInvoicedOrQuantity?: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (startDate !== undefined) attributes.startDate = startDate;
    if (endDate !== undefined) attributes.endDate = endDate;
    if (title !== undefined) attributes.title = title;
    if (averageDailyPriceExcludingTax !== undefined)
      attributes.averageDailyPriceExcludingTax = averageDailyPriceExcludingTax;
    if (numberOfDaysInvoicedOrQuantity !== undefined)
      attributes.numberOfDaysInvoicedOrQuantity = numberOfDaysInvoicedOrQuantity;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, DELIVERIES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_delivery",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un bon de livraison. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDelivery({ id }: { id: number }) {
    return executeDeleteTool(this.boond, DELIVERIES_CONFIG, id);
  }

  // ─── Workflow action tools ──────────────────────────────

  @Tool({
    name: "send_delivery",
    description: "Envoie un bon de livraison par email aux destinataires configurés sur le projet.",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async sendDelivery({ id }: { id: number }) {
    return executeActionTool(this.boond, `/deliveries/${id}/send`, `Delivery ${id} sent`);
  }

  @Tool({
    name: "renew_delivery",
    description: "Renouvelle un bon de livraison (crée une copie pour la période suivante).",
    parameters: z.object({
      id: z.number().describe("ID du bon de livraison à renouveler"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async renewDelivery({ id }: { id: number }) {
    return executeActionTool(this.boond, `/deliveries/${id}/renew`, `Delivery ${id} renewed`);
  }
}
