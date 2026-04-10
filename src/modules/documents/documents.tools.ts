import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, DocumentAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const DOCUMENTS_CONFIG = {
  path: "/documents",
  resourceType: "document",
} as const;

@Injectable()
export class DocumentsTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_document",
    description:
      "Récupère les métadonnées d'un document (nom, type, parent, permissions) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du document"),
    }),
  })
  async getDocument({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<DocumentAttributes>>(
        `/documents/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_documents_viewer",
    description:
      "Récupère l'URL du viewer d'un document (prévisualisation inline). " +
      "Paramètres passés en query string (ex: id du document).",
    parameters: z.object({
      documentId: z
        .string()
        .optional()
        .describe("ID du document à prévisualiser (paramètre de query)"),
    }),
  })
  async getDocumentsViewer({ documentId }: { documentId?: string }) {
    try {
      const params = documentId ? `?id=${encodeURIComponent(documentId)}` : "";
      const data = await this.boond.get<BoondDetailResponse>(`/documents/viewer${params}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_document",
    description: "Met à jour les métadonnées d'un document (nom, description, etc.).",
    parameters: z.object({
      id: z.number().describe("ID du document"),
      name: z.string().optional().describe("Nouveau nom du document"),
      informationComments: z.string().optional().describe("Nouveau commentaire"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateDocument({
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
    return executeUpdateTool(this.boond, DOCUMENTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_document",
    description: "⚠️ DESTRUCTIF — Supprime définitivement un document. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du document à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteDocument({ id }: { id: number }) {
    return executeDeleteTool(this.boond, DOCUMENTS_CONFIG, id);
  }
}
