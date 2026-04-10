import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, InactivityAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const INACTIVITIES_CONFIG = {
  path: "/inactivities",
  resourceType: "inactivity",
} as const;

@Injectable()
export class InactivitiesTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_inactivity",
    description: "Récupère les détails d'une période d'inactivité (non-facturable) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de l'inactivité"),
    }),
  })
  async getInactivity({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<InactivityAttributes>>(
        `/inactivities/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_inactivity_default",
    description:
      "Récupère le template par défaut pour créer une nouvelle inactivité. " +
      "Utile pour connaître les champs attendus.",
    parameters: z.object({}),
  })
  async getInactivityDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<InactivityAttributes>>("/inactivities/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_inactivity_rights",
    description: "Récupère les permissions de l'utilisateur sur une inactivité.",
    parameters: z.object({
      id: z.number().describe("ID de l'inactivité"),
    }),
  })
  async getInactivityRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/inactivities/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_inactivity",
    description:
      "Crée une nouvelle période d'inactivité (non-facturable) pour un collaborateur. " +
      "Nécessite l'ID du collaborateur via relationships.resource.",
    parameters: z.object({
      resourceId: z.string().describe("ID du collaborateur (resource.data.id)"),
      startDate: z.string().optional().describe("Date de début (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin (ISO 8601)"),
      typeOf: z.number().optional().describe("Type d'inactivité (ref. Boond)"),
      title: z.string().optional().describe("Intitulé"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createInactivity({
    resourceId,
    startDate,
    endDate,
    typeOf,
    title,
    informationComments,
  }: {
    resourceId: string;
    startDate?: string;
    endDate?: string;
    typeOf?: number;
    title?: string;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (startDate !== undefined) attributes.startDate = startDate;
      if (endDate !== undefined) attributes.endDate = endDate;
      if (typeOf !== undefined) attributes.typeOf = typeOf;
      if (title !== undefined) attributes.title = title;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body = {
        data: {
          type: "inactivity",
          attributes,
          relationships: {
            resource: { data: { id: resourceId, type: "resource" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(INACTIVITIES_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created inactivity with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_inactivity",
    description: "Met à jour une période d'inactivité existante.",
    parameters: z.object({
      id: z.number().describe("ID de l'inactivité"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      typeOf: z.number().optional().describe("Nouveau type"),
      title: z.string().optional().describe("Nouvel intitulé"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateInactivity({
    id,
    startDate,
    endDate,
    typeOf,
    title,
    informationComments,
  }: {
    id: number;
    startDate?: string;
    endDate?: string;
    typeOf?: number;
    title?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (startDate !== undefined) attributes.startDate = startDate;
    if (endDate !== undefined) attributes.endDate = endDate;
    if (typeOf !== undefined) attributes.typeOf = typeOf;
    if (title !== undefined) attributes.title = title;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, INACTIVITIES_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_inactivity",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une période d'inactivité. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de l'inactivité à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteInactivity({ id }: { id: number }) {
    return executeDeleteTool(this.boond, INACTIVITIES_CONFIG, id);
  }
}
