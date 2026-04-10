import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, GroupmentAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import {
  executeActionTool,
  executeDeleteTool,
  executeUpdateTool,
} from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const GROUPMENTS_CONFIG = {
  path: "/groupments",
  resourceType: "groupment",
} as const;

@Injectable()
export class GroupmentsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_groupment",
    description: "Récupère les détails d'un regroupement de livraisons (groupment) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du groupment"),
    }),
  })
  async getGroupment({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<GroupmentAttributes>>(
        `/groupments/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_groupment_default",
    description: "Récupère le template par défaut pour créer un nouveau groupment.",
    parameters: z.object({}),
  })
  async getGroupmentDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<GroupmentAttributes>>("/groupments/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_groupment_rights",
    description: "Récupère les permissions de l'utilisateur sur un groupment.",
    parameters: z.object({
      id: z.number().describe("ID du groupment"),
    }),
  })
  async getGroupmentRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/groupments/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_groupment",
    description:
      "Crée un nouveau regroupement de livraisons. " +
      "Nécessite un project parent (relationships.project).",
    parameters: z.object({
      projectId: z.string().describe("ID du projet parent"),
      title: z.string().optional().describe("Intitulé"),
      startDate: z.string().optional().describe("Date de début (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin (ISO 8601)"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createGroupment({
    projectId,
    title,
    startDate,
    endDate,
    informationComments,
  }: {
    projectId: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (title !== undefined) attributes.title = title;
      if (startDate !== undefined) attributes.startDate = startDate;
      if (endDate !== undefined) attributes.endDate = endDate;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body = {
        data: {
          type: "groupment",
          attributes,
          relationships: {
            project: { data: { id: projectId, type: "project" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(GROUPMENTS_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created groupment with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_groupment",
    description: "Met à jour un groupment existant.",
    parameters: z.object({
      id: z.number().describe("ID du groupment"),
      title: z.string().optional().describe("Nouvel intitulé"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateGroupment({
    id,
    title,
    startDate,
    endDate,
    informationComments,
  }: {
    id: number;
    title?: string;
    startDate?: string;
    endDate?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (startDate !== undefined) attributes.startDate = startDate;
    if (endDate !== undefined) attributes.endDate = endDate;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, GROUPMENTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_groupment",
    description: "⚠️ DESTRUCTIF — Supprime définitivement un groupment. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du groupment à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteGroupment({ id }: { id: number }) {
    return executeDeleteTool(this.boond, GROUPMENTS_CONFIG, id);
  }

  @Tool({
    name: "duplicate_groupment",
    description: "Duplique un groupment existant.",
    parameters: z.object({
      sourceId: z.number().describe("ID du groupment source à dupliquer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async duplicateGroupment({ sourceId }: { sourceId: number }) {
    return executeActionTool(
      this.boond,
      "/groupments/duplicate",
      `Groupment ${sourceId} duplicated`,
      { data: { attributes: { id: sourceId } } },
    );
  }
}
