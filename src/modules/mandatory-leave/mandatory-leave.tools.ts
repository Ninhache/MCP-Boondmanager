import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeListTool } from "../../utils/list-tool-helper.js";
import { executeCreateTool, executeDeleteTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const MANDATORY_LEAVE_CONFIG = {
  path: "/mandatory-leave",
  resourceType: "mandatoryleave",
} as const;

@Injectable()
export class MandatoryLeaveTools {
  constructor(private readonly boond: BoondClient) {}

  @Tool({
    name: "list_mandatory_leave",
    description: "Récupère la liste des congés obligatoires (fermeture entreprise, RTT imposés).",
    parameters: z.object({
      page: z.number().optional().describe("Numéro de page (défaut: 1)"),
      pageSize: z.number().optional().describe("Nombre de résultats par page (défaut: 25)"),
      keywords: z.string().optional().describe("Recherche par mots-clés"),
      fetchAll: z.boolean().optional().describe("Si true, récupère toutes les pages"),
    }),
  })
  async listMandatoryLeave({
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

    return executeListTool(
      this.boond,
      {
        path: MANDATORY_LEAVE_CONFIG.path,
        attributeKeys: ["startDate", "endDate", "title"],
      },
      { page, pageSize, fetchAll, extraParams },
    );
  }

  @Tool({
    name: "get_mandatory_leave",
    description: "Récupère les détails d'un congé obligatoire par son ID.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
    }),
  })
  async getMandatoryLeave({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/mandatory-leave/${id}`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_mandatory_leave_rights",
    description: "Récupère les permissions de l'utilisateur sur un congé obligatoire.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
    }),
  })
  async getMandatoryLeaveRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/mandatory-leave/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_mandatory_leave_resources",
    description: "Récupère la liste des collaborateurs concernés par un congé obligatoire.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
    }),
  })
  async getMandatoryLeaveResources({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/mandatory-leave/${id}/resources`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_mandatory_leave_information",
    description: "Récupère les informations détaillées d'un congé obligatoire.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
    }),
  })
  async getMandatoryLeaveInformation({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/mandatory-leave/${id}/information`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "create_mandatory_leave",
    description:
      "Crée un nouveau congé obligatoire (fermeture entreprise, RTT imposés). " +
      "Les attributes dépendent de la configuration Boond.",
    parameters: z.object({
      attributes: z
        .record(z.string(), z.unknown())
        .describe("Attributs du congé obligatoire (dates, titre, etc.)"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createMandatoryLeave({ attributes }: { attributes: Record<string, unknown> }) {
    return executeCreateTool(this.boond, MANDATORY_LEAVE_CONFIG, attributes);
  }

  @Tool({
    name: "update_mandatory_leave_resources",
    description: "Met à jour la liste des collaborateurs concernés par un congé obligatoire.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
      resources: z
        .record(z.string(), z.unknown())
        .describe("Liste des ressources à appliquer au congé"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateMandatoryLeaveResources({
    id,
    resources,
  }: {
    id: number;
    resources: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "mandatoryleave", attributes: resources } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/mandatory-leave/${id}/resources`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Resources updated for mandatory leave ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_mandatory_leave_information",
    description: "Met à jour les informations d'un congé obligatoire.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire"),
      information: z.record(z.string(), z.unknown()).describe("Informations à mettre à jour"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async updateMandatoryLeaveInformation({
    id,
    information,
  }: {
    id: number;
    information: Record<string, unknown>;
  }) {
    try {
      const body = { data: { type: "mandatoryleave", attributes: information } };
      const response = await this.boond.put<BoondDetailResponse>(
        `/mandatory-leave/${id}/information`,
        body,
      );
      const formatted = formatDetail(response);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Information updated for mandatory leave ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "delete_mandatory_leave",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un congé obligatoire. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du congé obligatoire à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteMandatoryLeave({ id }: { id: number }) {
    return executeDeleteTool(this.boond, MANDATORY_LEAVE_CONFIG, id);
  }
}
