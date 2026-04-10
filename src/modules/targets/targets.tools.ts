import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, TargetAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const TARGETS_CONFIG = {
  path: "/targets",
  resourceType: "target",
} as const;

@Injectable()
export class TargetsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_target",
    description:
      "Récupère les détails d'un objectif commercial par son ID (période, montant cible, réalisé).",
    parameters: z.object({
      id: z.number().describe("ID de l'objectif"),
    }),
  })
  async getTarget({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<TargetAttributes>>(`/targets/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_target",
    description:
      "Crée un nouvel objectif commercial. " +
      "Nécessite généralement une relation avec un collaborateur ou une BU.",
    parameters: z.object({
      resourceId: z
        .string()
        .optional()
        .describe("ID du collaborateur cible (relationships.resource.data.id)"),
      title: z.string().optional().describe("Intitulé de l'objectif"),
      startDate: z.string().optional().describe("Date de début (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin (ISO 8601)"),
      amount: z.number().optional().describe("Montant cible"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createTarget({
    resourceId,
    title,
    startDate,
    endDate,
    amount,
    informationComments,
  }: {
    resourceId?: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    amount?: number;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (title !== undefined) attributes.title = title;
      if (startDate !== undefined) attributes.startDate = startDate;
      if (endDate !== undefined) attributes.endDate = endDate;
      if (amount !== undefined) attributes.amount = amount;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body: Record<string, unknown> = {
        data: {
          type: "target",
          attributes,
          ...(resourceId && {
            relationships: {
              resource: { data: { id: resourceId, type: "resource" } },
            },
          }),
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(TARGETS_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created target with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_target",
    description: "Met à jour un objectif commercial existant.",
    parameters: z.object({
      id: z.number().describe("ID de l'objectif"),
      title: z.string().optional().describe("Nouvel intitulé"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      amount: z.number().optional().describe("Nouveau montant cible"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateTarget({
    id,
    title,
    startDate,
    endDate,
    amount,
    informationComments,
  }: {
    id: number;
    title?: string;
    startDate?: string;
    endDate?: string;
    amount?: number;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (startDate !== undefined) attributes.startDate = startDate;
    if (endDate !== undefined) attributes.endDate = endDate;
    if (amount !== undefined) attributes.amount = amount;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, TARGETS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_target",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un objectif commercial. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de l'objectif à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteTarget({ id }: { id: number }) {
    return executeDeleteTool(this.boond, TARGETS_CONFIG, id);
  }
}
