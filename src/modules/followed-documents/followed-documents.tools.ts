import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, FollowedDocumentAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const FOLLOWED_DOCUMENTS_CONFIG = {
  path: "/followed-documents",
  resourceType: "followeddocument",
} as const;

@Injectable()
export class FollowedDocumentsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_followed_document",
    description: "Récupère les détails d'un document suivi (dossier collaborateur) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du document suivi"),
    }),
  })
  async getFollowedDocument({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<FollowedDocumentAttributes>>(
        `/followed-documents/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_followed_document_default",
    description: "Récupère le template par défaut pour créer un nouveau document suivi.",
    parameters: z.object({}),
  })
  async getFollowedDocumentDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<FollowedDocumentAttributes>>(
        "/followed-documents/default",
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_followed_document_rights",
    description: "Récupère les permissions de l'utilisateur sur un document suivi.",
    parameters: z.object({
      id: z.number().describe("ID du document suivi"),
    }),
  })
  async getFollowedDocumentRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/followed-documents/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_followed_document",
    description:
      "Crée un nouveau document suivi (fiche RH rattachée à un collaborateur). " +
      "Nécessite l'ID du collaborateur via relationships.resource.",
    parameters: z.object({
      resourceId: z.string().describe("ID du collaborateur (resource.data.id)"),
      title: z.string().optional().describe("Intitulé du document"),
      typeOf: z.number().optional().describe("Type de document (ref. Boond)"),
      date: z.string().optional().describe("Date (ISO 8601)"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createFollowedDocument({
    resourceId,
    title,
    typeOf,
    date,
    informationComments,
  }: {
    resourceId: string;
    title?: string;
    typeOf?: number;
    date?: string;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (title !== undefined) attributes.title = title;
      if (typeOf !== undefined) attributes.typeOf = typeOf;
      if (date !== undefined) attributes.date = date;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const body = {
        data: {
          type: "followeddocument",
          attributes,
          relationships: {
            resource: { data: { id: resourceId, type: "resource" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(
        FOLLOWED_DOCUMENTS_CONFIG.path,
        body,
      );
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created followed document with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_followed_document",
    description: "Met à jour un document suivi existant.",
    parameters: z.object({
      id: z.number().describe("ID du document suivi"),
      title: z.string().optional().describe("Nouvel intitulé"),
      typeOf: z.number().optional().describe("Nouveau type"),
      date: z.string().optional().describe("Nouvelle date"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateFollowedDocument({
    id,
    title,
    typeOf,
    date,
    informationComments,
  }: {
    id: number;
    title?: string;
    typeOf?: number;
    date?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (typeOf !== undefined) attributes.typeOf = typeOf;
    if (date !== undefined) attributes.date = date;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, FOLLOWED_DOCUMENTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_followed_document",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un document suivi. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du document suivi à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteFollowedDocument({ id }: { id: number }) {
    return executeDeleteTool(this.boond, FOLLOWED_DOCUMENTS_CONFIG, id);
  }
}
