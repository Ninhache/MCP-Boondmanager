import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, TechnicalDataAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const TECHNICAL_DATAS_CONFIG = {
  path: "/technical-datas",
  resourceType: "technicaldata",
} as const;

@Injectable()
export class TechnicalDatasTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "get_technical_data",
    description: "Récupère les détails d'une donnée technique (CV, dossier) par son ID.",
    parameters: z.object({
      id: z.number().describe("ID de la donnée technique"),
    }),
  })
  async getTechnicalData({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<TechnicalDataAttributes>>(
        `/technical-datas/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_technical_data_default",
    description: "Récupère le template par défaut pour créer une nouvelle donnée technique.",
    parameters: z.object({}),
  })
  async getTechnicalDataDefault() {
    try {
      const data = await this.boond.get<BoondDetailResponse<TechnicalDataAttributes>>(
        "/technical-datas/default",
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_technical_data_visitor_access",
    description: "Récupère l'URL d'accès visiteur (partage public) d'une donnée technique.",
    parameters: z.object({}),
  })
  async getTechnicalDataVisitorAccess() {
    try {
      const data = await this.boond.get<BoondDetailResponse>("/technical-datas/visitor-access");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "download_technical_data",
    description: "Télécharge une donnée technique au format fichier (ex: CV en PDF).",
    parameters: z.object({
      id: z.number().describe("ID de la donnée technique"),
    }),
  })
  async downloadTechnicalData({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/technical-datas/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded technical data ${id}`,
            data,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_technical_data",
    description:
      "Crée une nouvelle donnée technique (CV, dossier) pour un collaborateur ou candidat.",
    parameters: z.object({
      resourceId: z
        .string()
        .optional()
        .describe("ID du collaborateur parent (relationships.resource.data.id)"),
      candidateId: z
        .string()
        .optional()
        .describe("ID du candidat parent (relationships.candidate.data.id)"),
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
  async createTechnicalData({
    resourceId,
    candidateId,
    title,
    informationComments,
  }: {
    resourceId?: string;
    candidateId?: string;
    title?: string;
    informationComments?: string;
  }) {
    try {
      const attributes: Record<string, unknown> = {};
      if (title !== undefined) attributes.title = title;
      if (informationComments !== undefined) attributes.informationComments = informationComments;

      const relationships: Record<string, unknown> = {};
      if (resourceId) relationships.resource = { data: { id: resourceId, type: "resource" } };
      if (candidateId) relationships.candidate = { data: { id: candidateId, type: "candidate" } };

      const body: Record<string, unknown> = {
        data: {
          type: "technicaldata",
          attributes,
          ...(Object.keys(relationships).length > 0 && { relationships }),
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(
        TECHNICAL_DATAS_CONFIG.path,
        body,
      );
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created technical data with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_technical_data",
    description: "Met à jour une donnée technique existante.",
    parameters: z.object({
      id: z.number().describe("ID de la donnée technique"),
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
  async updateTechnicalData({
    id,
    title,
    informationComments,
  }: {
    id: number;
    title?: string;
    informationComments?: string;
  }) {
    const attributes: Record<string, unknown> = {};
    if (title !== undefined) attributes.title = title;
    if (informationComments !== undefined) attributes.informationComments = informationComments;
    return executeUpdateTool(this.boond, TECHNICAL_DATAS_CONFIG, id, attributes);
  }

  @Tool({
    name: "apply_technical_data_resume",
    description:
      "Applique le contenu d'un CV (resume) à une donnée technique (fait typiquement partie " +
      "du workflow d'import de CV pour parser et appliquer les infos au candidat).",
    parameters: z.object({
      id: z.number().describe("ID de la donnée technique"),
      resume: z.record(z.string(), z.unknown()).describe("Payload resume à appliquer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async applyTechnicalDataResume({ id, resume }: { id: number; resume: Record<string, unknown> }) {
    try {
      const body = { data: { type: "technicaldata", attributes: resume } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/technical-datas/${id}/applyresume`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resume applied to technical data ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_technical_data",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement une donnée technique. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID de la donnée technique à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteTechnicalData({ id }: { id: number }) {
    return executeDeleteTool(this.boond, TECHNICAL_DATAS_CONFIG, id);
  }
}
