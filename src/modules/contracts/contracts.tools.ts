import { Injectable } from "@nestjs/common";
import { Tool } from "@rekog/mcp-nest";
import { z } from "zod";
import type { BoondDetailResponse, ContractAttributes } from "../../generated/index.js";
import { handleBoondError } from "../../utils/error-handler.js";
import { formatDetail, toTextContent } from "../../utils/formatters.js";
import { executeDeleteTool, executeUpdateTool } from "../../utils/write-tool-helper.js";
import { BoondClient } from "../boond/index.js";

const CONTRACTS_CONFIG = {
  path: "/contracts",
  resourceType: "contract",
} as const;

@Injectable()
export class ContractsTools {
  constructor(private readonly boond: BoondClient) {}

  // ─── Read tools ─────────────────────────────────────────

  @Tool({
    name: "get_contract",
    description:
      "Récupère les détails d'un contrat de travail par son ID (dates, type, rémunération).",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
    }),
  })
  async getContract({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse<ContractAttributes>>(
        `/contracts/${id}`,
      );
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_contract_default",
    description:
      "Récupère le template par défaut pour créer un nouveau contrat de travail. " +
      "Utile pour connaître les champs attendus avant un create.",
    parameters: z.object({}),
  })
  async getContractDefault() {
    try {
      const data =
        await this.boond.get<BoondDetailResponse<ContractAttributes>>("/contracts/default");
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_contract_rights",
    description: "Récupère les permissions de l'utilisateur sur un contrat.",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
    }),
  })
  async getContractRights({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/contracts/${id}/rights`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_contract_advantages",
    description:
      "Récupère les avantages sociaux (tickets restaurant, mutuelle, etc.) liés à un contrat.",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
    }),
  })
  async getContractAdvantages({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/contracts/${id}/advantages`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "get_contract_tasks",
    description: "Récupère les tâches (to-do RH) associées à un contrat.",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
    }),
  })
  async getContractTasks({ id }: { id: number }) {
    try {
      const data = await this.boond.get<BoondDetailResponse>(`/contracts/${id}/tasks`);
      return { content: [toTextContent(formatDetail(data))] };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "download_contract",
    description: "Télécharge le contrat de travail au format fichier (PDF).",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
    }),
  })
  async downloadContract({ id }: { id: number }) {
    try {
      const data = await this.boond.get<unknown>(`/contracts/${id}/download`);
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Downloaded contract ${id}`,
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
    name: "create_contract",
    description:
      "Crée un nouveau contrat de travail pour un collaborateur. " +
      "Nécessite l'ID du collaborateur via relationships.resource.",
    parameters: z.object({
      resourceId: z.string().describe("ID du collaborateur (resource.data.id)"),
      startDate: z.string().optional().describe("Date de début du contrat (ISO 8601)"),
      endDate: z.string().optional().describe("Date de fin du contrat (ISO 8601)"),
      typeOf: z.number().optional().describe("Type de contrat (ref. Boond)"),
      title: z.string().optional().describe("Intitulé du contrat"),
      informationComments: z.string().optional().describe("Commentaire libre"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  })
  async createContract({
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
          type: "contract",
          attributes,
          relationships: {
            resource: { data: { id: resourceId, type: "resource" } },
          },
        },
      };
      const response = await this.boond.post<BoondDetailResponse>(CONTRACTS_CONFIG.path, body);
      const formatted = formatDetail(response);
      const id = response?.data?.id ?? "unknown";
      return {
        content: [
          toTextContent({
            success: true,
            message: `✓ Created contract with ID ${id}`,
            resource: formatted,
          }),
        ],
      };
    } catch (error) {
      return handleBoondError(error);
    }
  }

  @Tool({
    name: "update_contract",
    description: "Met à jour un contrat de travail existant.",
    parameters: z.object({
      id: z.number().describe("ID du contrat"),
      startDate: z.string().optional().describe("Nouvelle date de début"),
      endDate: z.string().optional().describe("Nouvelle date de fin"),
      typeOf: z.number().optional().describe("Nouveau type de contrat"),
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
  async updateContract({
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
    return executeUpdateTool(this.boond, CONTRACTS_CONFIG, id, attributes);
  }

  @Tool({
    name: "delete_contract",
    description:
      "⚠️ DESTRUCTIF — Supprime définitivement un contrat de travail. Opération irréversible.",
    parameters: z.object({
      id: z.number().describe("ID du contrat à supprimer"),
    }),
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: true,
    },
  })
  async deleteContract({ id }: { id: number }) {
    return executeDeleteTool(this.boond, CONTRACTS_CONFIG, id);
  }
}
